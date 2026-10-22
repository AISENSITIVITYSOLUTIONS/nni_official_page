import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { initFp3d } from '../../utils/fp3d'

/**
 * Sigilo geométrico propio de cada ficha: anillo, arco de acento y
 * las iniciales del producto. Se dibuja con SVG inline, en el color
 * de acento de la ficha, para no depender de imágenes externas.
 */
function ProductSigil({ name }) {
  const words = name
    .replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
  // Dos palabras → iniciales; una palabra → inicial + primera mayúscula interna (AllAIs → AA, InQilinos → IQ)
  const initials =
    words.length >= 2
      ? words.slice(0, 2).map((w) => w[0].toUpperCase()).join('')
      : (words[0] ?? name).slice(0, 1).toUpperCase() + ((words[0] ?? '').slice(1).match(/[A-Z]/)?.[0] ?? (words[0] ?? '').slice(1, 2).toUpperCase())

  // Longitud del arco según el nombre (determinista, para variar entre fichas)
  const seed = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const sweep = 110 + (seed % 140)
  const r = 26
  const circumference = 2 * Math.PI * r
  const dash = (sweep / 360) * circumference

  return (
    <svg className="pcard-sigil" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r={r} className="pcard-sigil-ring" />
      <circle
        cx="32"
        cy="32"
        r={r}
        className="pcard-sigil-arc"
        strokeDasharray={`${dash} ${circumference - dash}`}
        transform={`rotate(${(seed * 7) % 360} 32 32)`}
      />
      <rect x="20" y="20" width="24" height="24" className="pcard-sigil-square" transform="rotate(45 32 32)" />
      <text x="32" y="36.5" textAnchor="middle" className="pcard-sigil-text">
        {initials}
      </text>
    </svg>
  )
}

export default function ProductFlipCard({ product, visual, index, tone, language, copy }) {
  const sceneRef = useRef(null)
  const [flipped, setFlipped] = useState(false)
  const backId = useId()

  useEffect(() => {
    const motion = initFp3d(sceneRef.current, { maxTilt: 5, glareMax: 0.28, gyro: false })
    return () => motion.destroy()
  }, [])

  const toggle = () => setFlipped((value) => !value)

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle()
    }
    if (event.key === 'Escape' && flipped) setFlipped(false)
  }

  // Los enlaces del reverso no deben girar la ficha al pulsarlos.
  const stop = (event) => event.stopPropagation()

  return (
    <article
      className={`pcard-scene${flipped ? ' is-flipped' : ''}`}
      data-product={visual.slug}
      ref={sceneRef}
      style={{ '--accent': visual.accent, '--accentGlow': visual.glow, '--delay': `${index * 80}ms` }}
    >
      <div
        className="pcard-flip"
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-controls={backId}
        aria-label={`${product.name} — ${flipped ? copy.flipBack : copy.flipFront}`}
        onClick={toggle}
        onKeyDown={onKeyDown}
      >
        {/* ───────────── Anverso ───────────── */}
        <section className="pcard-face pcard-front" aria-hidden={flipped}>
          <div className="pcard-glare" aria-hidden="true" />
          <div className="pcard-aura" aria-hidden="true" />
          <i className="pcard-mark pcard-mark-tl" aria-hidden="true" />
          <i className="pcard-mark pcard-mark-br" aria-hidden="true" />

          <header className="pcard-head">
            <span className="pcard-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="pcard-category">{product.category[language]}</span>
            <span className={`pcard-status is-${tone}`}>
              <i aria-hidden="true" />
              {product.status[language]}
            </span>
          </header>

          <div className="pcard-identity">
            <ProductSigil name={product.name} />
            <h2 className="pcard-name">{product.name}</h2>
          </div>

          <p className="pcard-problem">{product.problem[language]}</p>

          <ul className="pcard-tags" aria-label={copy.stack}>
            {product.tech[language].map((tag) => (
              <li className="pcard-tag" key={tag}>
                <span>{tag}</span>
              </li>
            ))}
          </ul>

          <span className="pcard-watermark" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>

          <footer className="pcard-foot">
            <span className="pcard-hint">
              <RefreshCw size={14} aria-hidden="true" />
              {copy.flipFront}
            </span>
          </footer>
        </section>

        {/* ───────────── Reverso ───────────── */}
        <section className="pcard-face pcard-back" id={backId} aria-hidden={!flipped}>
          <div className="pcard-aura" aria-hidden="true" />
          <i className="pcard-mark pcard-mark-tl" aria-hidden="true" />
          <i className="pcard-mark pcard-mark-br" aria-hidden="true" />

          <header className="pcard-head">
            <span className="pcard-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="pcard-category">{product.name}</span>
            <span className="pcard-back-label">{copy.backLabel}</span>
          </header>

          <dl className="pcard-facts">
            <div>
              <dt>{copy.solution}</dt>
              <dd>{product.solution[language]}</dd>
            </div>
            <div>
              <dt>{copy.users}</dt>
              <dd>{product.users[language]}</dd>
            </div>
          </dl>

          <blockquote className="pcard-value">{product.value[language]}</blockquote>

          <footer className="pcard-actions">
            {product.interest && (
              <Link
                className="pcard-primary"
                to={`/interes?origen=${product.interest.origen}`}
                onClick={stop}
                tabIndex={flipped ? 0 : -1}
              >
                {product.interest[language]} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
            {product.href && (
              <a
                className="pcard-link"
                href={product.href}
                rel="noreferrer"
                target="_blank"
                onClick={stop}
                tabIndex={flipped ? 0 : -1}
              >
                {product.linkLabel?.[language] ?? copy.cardCta} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            <span className="pcard-hint">
              <RefreshCw size={14} aria-hidden="true" />
              {copy.flipBack}
            </span>
          </footer>
        </section>
      </div>
    </article>
  )
}
