import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import config from './courses.config.json'
import './CoursesExperience.css'

function useHeaderOffset(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    const header = document.querySelector('.site-header')
    if (!root || !header) return undefined

    const update = () => {
      root.style.setProperty('--nc-header-offset', `${Math.ceil(header.getBoundingClientRect().bottom) + 24}px`)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(header)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [rootRef])
}

function useEvidenceTour(sectionRef) {
  const tour = config.interactive3d.tour
  const [stageId, setStageId] = useState(config.interactive3d.initialStageId)
  const [playback, setPlayback] = useState('idle')
  const timing = useRef({ elapsed: 0, started: 0, playback: 'idle' })

  const pause = useCallback(() => {
    const clock = timing.current
    if (clock.playback !== 'playing') return
    clock.elapsed = Math.min(tour.durationMs, clock.elapsed + performance.now() - clock.started)
    clock.playback = 'paused'
    setPlayback('paused')
  }, [tour.durationMs])

  const toggle = () => {
    if (timing.current.playback === 'playing') {
      pause()
      return
    }
    const clock = timing.current
    if (clock.elapsed >= tour.durationMs) clock.elapsed = 0
    const entry = tour.timeline.find((item) => clock.elapsed < item.endMs)
    setStageId(entry?.stageId ?? tour.timeline[0].stageId)
    clock.started = performance.now()
    clock.playback = 'playing'
    setPlayback('playing')
  }

  const select = (id) => {
    timing.current.playback = 'idle'
    timing.current.elapsed = 0
    setPlayback('idle')
    setStageId(id)
  }

  useEffect(() => {
    if (playback !== 'playing') return undefined
    const timer = window.setInterval(() => {
      const clock = timing.current
      if (clock.playback !== 'playing') return
      const elapsed = clock.elapsed + performance.now() - clock.started
      const entry = tour.timeline.find((item) => elapsed < item.endMs) ?? tour.timeline.at(-1)
      setStageId(entry.stageId)
      if (elapsed >= tour.durationMs) {
        clock.elapsed = tour.durationMs
        clock.playback = 'finished'
        setPlayback('finished')
      }
    }, 100)
    return () => window.clearInterval(timer)
  }, [playback, tour])

  useEffect(() => {
    const visibility = () => {
      if (document.hidden) pause()
    }
    document.addEventListener('visibilitychange', visibility)
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) pause()
    })
    if (sectionRef.current) observer.observe(sectionRef.current)
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    preference.addEventListener('change', pause)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      preference.removeEventListener('change', pause)
    }
  }, [pause, sectionRef])

  return { stageId, playback, select, toggle }
}

function EvidenceScene({ stageId }) {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)
  const viewerRef = useRef(null)
  const stageRef = useRef(stageId)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    stageRef.current = stageId
    viewerRef.current?.setStage(stageId)
  }, [stageId])

  useEffect(() => {
    let cancelled = false
    let loading = false
    const host = hostRef.current
    const canvas = canvasRef.current
    const load = async () => {
      if (loading || cancelled) return
      loading = true
      try {
        const { createEvidenceScene } = await import('./evidenceScene')
        if (cancelled) return
        const viewer = await createEvidenceScene({
          host,
          canvas,
          config: config.interactive3d,
          initialStageId: stageRef.current,
          onFailure: () => {
            if (!cancelled) setReady(false)
          },
        })
        if (cancelled) {
          viewer.dispose()
          return
        }
        viewerRef.current = viewer
        viewer.setStage(stageRef.current)
        setReady(true)
      } catch {
        // The semantic stages remain usable if the optional 3D cannot load.
        if (!cancelled) setReady(false)
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect()
        void load()
      }
    }, { rootMargin: '160px' })
    observer.observe(host)
    return () => {
      cancelled = true
      observer.disconnect()
      viewerRef.current?.dispose()
      viewerRef.current = null
    }
  }, [])

  return (
    <div className="nc-scene" ref={hostRef} role="img" aria-label={config.interactive3d.accessibleDescription}>
      <canvas ref={canvasRef} hidden={!ready} aria-hidden="true" />
      <ol className="nc-fallback" hidden={ready}>
        {config.interactive3d.stages.map((stage) => (
          <li key={stage.id} className={stage.id === stageId ? 'is-active' : undefined}>
            <small>{String(stage.order).padStart(2, '0')} · {stage.label.toUpperCase()}</small>
            {stage.fallbackText}
          </li>
        ))}
      </ol>
    </div>
  )
}

function ProgramCard({ program, onInquiry }) {
  const metadata = program.metadata
  const isTeam = program.cardVariant === 'full-width'
  const description = (
    <>
      <h3>{program.title}</h3>
      <p className="nc-course-description">{program.description}</p>
    </>
  )
  const details = (
    <>
      <div className="nc-course-meta" aria-label="Duración y modalidad">
        <span>{metadata.hoursLabel}</span>
        <span>{metadata.durationLabel}</span>
        <span>{metadata.modality}</span>
      </div>
      <p className="nc-course-start">{program.startLabel}</p>
      <p className="nc-output"><span>{config.catalog.deliverableLabel}</span>{program.deliverable}</p>
      <details id={program.cta.targetId}>
        <summary>{program.cta.label}</summary>
        <div className="nc-course-detail">
          <p><strong>Para:</strong> {program.audience}</p>
          <ul>{program.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
          <p><strong>Periodicidad:</strong> {metadata.periodicity}</p>
          <a className="nc-link" href={program.inquiryCta.href} onClick={() => onInquiry(program.title)}>
            {program.inquiryCta.label}<ArrowRight aria-hidden="true" />
          </a>
        </div>
      </details>
    </>
  )
  return (
    <article className={`nc-course${isTeam ? ' nc-team' : ''}`} data-program-id={program.id}>
      <div className="nc-course-top">
        <span className="nc-course-type">{program.category}</span>
        <span className="nc-course-index">{String(program.order).padStart(2, '0')} / 07</span>
      </div>
      {isTeam ? <><div>{description}</div><div>{details}</div></> : <>{description}{details}</>}
    </article>
  )
}

export default function CoursesExperience() {
  const rootRef = useRef(null)
  const featuredRef = useRef(null)
  const planRef = useRef(null)
  const [selectedProgram, setSelectedProgram] = useState('')
  const { stageId, playback, select, toggle } = useEvidenceTour(featuredRef)
  useHeaderOffset(rootRef)
  const featured = config.featuredProgram
  const stage = config.interactive3d.stages.find((item) => item.id === stageId)
  const tourLabel = playback === 'playing' ? config.interactive3d.tour.pauseLabel
    : playback === 'paused' ? config.interactive3d.tour.resumeLabel : config.interactive3d.tour.label

  const handleSectionLink = (event) => {
    const anchor = event.target.closest('a[href^="#"]')
    if (!anchor || !event.currentTarget.contains(anchor)) return
    const target = rootRef.current.querySelector(anchor.getAttribute('href'))
    if (!target) return
    event.preventDefault()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' })
  }

  return (
    <section id="nni-courses" ref={rootRef} aria-labelledby="nc-feature-title" onClick={handleSectionLink}>
      <div className="nc-wrap">
        <nav className="nc-section-nav" aria-label="Contenido de Cursos">
          {config.sectionNavigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <section id={featured.anchor} ref={featuredRef} aria-labelledby="nc-feature-title">
          <div className="nc-hero">
            <EvidenceScene stageId={stageId} />
            <div className="nc-hero-copy">
              <p className="nc-eyebrow">{featured.eyebrow}</p>
              <h1 id="nc-feature-title">{featured.titleLines[0]}<br />{featured.titleLines[1]}<br /><span className="nc-serif">{featured.titleLines[2]}</span></h1>
              <p className="nc-promise">{config.header.titleLines[0]}<br />{config.header.titleLines[1]}</p>
              <p className="nc-hero-desc">{featured.description}</p>
              <div className="nc-actions">
                <a className="nc-action nc-primary" href={featured.cta.href} onClick={() => { planRef.current.open = true }}>
                  {featured.cta.label}<ArrowDown aria-hidden="true" />
                </a>
                <a className="nc-link" href={featured.secondaryCta.href}>{featured.secondaryCta.label}<ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
            <div className="nc-scene-caption" aria-live="polite" aria-atomic="true">
              <strong>{stage.headline}</strong><span>{stage.description}</span>
            </div>
          </div>
          <dl className="nc-specs">
            {featured.visibleMetadata.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>
          <div className="nc-stages">
            <div className="nc-segments" role="group" aria-label="Etapas del análisis">
              {config.interactive3d.stages.map((item) => (
                <button key={item.id} type="button" aria-pressed={item.id === stageId} onClick={() => select(item.id)}>
                  <span>{String(item.order).padStart(2, '0')}</span>{item.label}
                </button>
              ))}
            </div>
            <div className="nc-stage-side">
              <button type="button" className="nc-tour-control" onClick={toggle} aria-pressed={playback === 'playing'}>
                {playback === 'playing' ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}<span>{tourLabel}</span>
              </button>
              <span>{config.interactive3d.disclaimer}</span>
            </div>
          </div>
          <details className="nc-detail" id={featured.academicPlan.id} ref={planRef}>
            <summary><span>{featured.academicPlan.title}<small>{featured.academicPlan.subtitle}</small></span></summary>
            <p className="nc-plan-intro">{featured.academicPlan.description}</p>
            <div className="nc-modules">
              {featured.academicPlan.modules.map((module) => (
                <div className="nc-module" key={module.id}>
                  <small>{String(module.order).padStart(2, '0')} · {module.hours} HORAS</small>
                  <h3>{module.title}</h3><p>{module.description}</p>
                </div>
              ))}
            </div>
            <div className="nc-academic-foot"><p><strong>{featured.deliverable.label}:</strong> {featured.deliverable.title}.</p><p>{featured.academicPlan.note}</p></div>
          </details>
        </section>
        <section className="nc-catalog" id={config.catalog.id} aria-labelledby="nc-catalog-title">
          <div className="nc-section-head">
            <div><p className="nc-eyebrow">{config.catalog.eyebrow}</p><h2 id="nc-catalog-title">{config.catalog.titleLines[0]}<br /><span className="nc-serif">{config.catalog.titleLines[1]}</span></h2></div>
            <p>{config.catalog.lead}</p>
          </div>
          <div className="nc-course-grid">{config.programs.map((program) => <ProgramCard key={program.id} program={program} onInquiry={setSelectedProgram} />)}</div>
        </section>
        <section className="nc-method" id={config.methodology.id} aria-labelledby="nc-method-title">
          <div><p className="nc-eyebrow">{config.methodology.eyebrow}</p><h2 id="nc-method-title">{config.methodology.titleLines[0]}<br /><span className="nc-serif">{config.methodology.titleLines[1]}</span></h2><p>{config.methodology.description}</p></div>
          <ol>{config.methodology.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </section>
        <section className="nc-close" id={config.contact.id} aria-labelledby="nc-consulta-title">
          <div><h2 id="nc-consulta-title">{config.contact.title}</h2><p className="nc-inquiry" aria-live="polite">{selectedProgram ? config.contact.selectedProgramTemplate.replace('{programTitle}', selectedProgram) : config.contact.description}</p></div>
          <a className="nc-action nc-primary" href={config.contact.cta.href} target={config.contact.cta.target} rel={config.contact.cta.rel} aria-label={config.contact.cta.accessibleLabel}>
            {config.contact.cta.label}<ArrowUpRight aria-hidden="true" />
          </a>
        </section>
        <p className="nc-note">{config.editorialRules.reviewNotice}</p>
      </div>
    </section>
  )
}
