import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, FileText, Volume2, VolumeX } from 'lucide-react'
import { drawFaceMesh, initFp3d } from '../utils/fp3d'
import { useLanguage } from '../i18n/language'
import ProductFlipCard from '../components/products/ProductFlipCard'
import { productVisuals, products, statusTone } from '../data/products'
import './ProductCards.css'

const featuredProduct = products.find((product) => product.name === 'FaceR')
const productCards = products.filter((product) => product.name !== 'FaceR')

const productCopy = {
  es: {
    eyebrow: 'Productos y experiencias',
    title: 'Proyectos que muestran cómo NNI convierte ideas en sistemas.',
    lead:
      'Esta sección reúne productos, prototipos, sitios y experiencias desarrolladas por NNI. No son piezas aisladas: muestran capacidades acumuladas en diseño, IA aplicada, datos, seguridad, comercio, reputación digital y operación.',
    featuredLabel: 'Producto estrella',
    featuredText:
      'FaceR es la experiencia insignia de NNI para seguridad institucional: identidad documental, reconocimiento facial, QR seguro y trazabilidad de accesos en una narrativa visual clara, confiable y lista para demostración.',
    featuredMetrics: ['Identidad documental', 'Biometría facial', 'QR seguro', 'Trazabilidad'],
    featuredCta: 'Ver producto estrella',
    panelTitle: 'Acceso seguro con identidad verificable',
    panelSmall: 'Video demostrativo integrado en la ficha de producto.',
    soundOn: 'Sonido activado',
    soundOff: 'Activar sonido',
    solution: 'Solución',
    users: 'Usuarios',
    cardCta: 'Ver experiencia',
    stack: 'Tecnologías',
    backLabel: 'Ficha técnica',
    flipFront: 'Girar ficha',
    flipBack: 'Volver al anverso',
    portfolioCta: 'Ver portafolio de presentación',
  },
  en: {
    eyebrow: 'Products and experience',
    title: 'Projects that show how NNI turns ideas into systems.',
    lead:
      'This section brings together products, prototypes, sites and experiences developed by NNI. They are not isolated pieces: they show accumulated capabilities in design, applied AI, data, security, commerce, digital reputation and operations.',
    featuredLabel: 'Featured product',
    featuredText:
      'FaceR is NNI’s flagship experience for institutional security: document identity, facial recognition, secure QR and access traceability in a clear, trustworthy and demo-ready visual narrative.',
    featuredMetrics: ['Document identity', 'Facial biometrics', 'Secure QR', 'Traceability'],
    featuredCta: 'View featured product',
    panelTitle: 'Secure access with verifiable identity',
    panelSmall: 'Demo video integrated into the product card.',
    soundOn: 'Sound on',
    soundOff: 'Turn sound on',
    solution: 'Solution',
    users: 'Users',
    cardCta: 'View experience',
    stack: 'Technologies',
    backLabel: 'Technical sheet',
    flipFront: 'Flip card',
    flipBack: 'Back to front',
    portfolioCta: 'View presentation portfolio',
  },
}

export default function Products() {
  const { language } = useLanguage()
  const copy = productCopy[language]
  const featuredPanelRef = useRef(null)
  const faceMeshRef = useRef(null)
  const videoRef = useRef(null)
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    const panel = initFp3d(featuredPanelRef.current, { maxTilt: 7, glareMax: 0.42 })
    const mesh = drawFaceMesh(faceMeshRef.current, { accent: '#94f2ff' })
    return () => {
      panel.destroy()
      mesh.destroy()
    }
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return

    const nextSoundState = !soundEnabled
    video.muted = !nextSoundState
    video.volume = nextSoundState ? 0.85 : 0
    setSoundEnabled(nextSoundState)

    if (nextSoundState) {
      video.play().catch(() => {
        video.muted = true
        setSoundEnabled(false)
      })
    }
  }

  return (
    <section className="page products-page">
      <div className="page-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
        <Link className="secondary-button" to="/portafolio">
          <FileText size={17} /> {copy.portfolioCta}
        </Link>
      </div>

      {featuredProduct && (
        <article className="featured-product-card">
          <div className="featured-product-copy">
            <div className="product-card-top">
              <span>{copy.featuredLabel}</span>
              <strong>{featuredProduct.status[language]}</strong>
            </div>
            <h2>{featuredProduct.name}</h2>
            <p>{copy.featuredText}</p>
            <div className="featured-product-metrics">
              {copy.featuredMetrics.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <a className="primary-button" href={featuredProduct.href} rel="noreferrer" target="_blank">
              {copy.featuredCta} <ExternalLink size={17} />
            </a>
          </div>
          <div className="featured-product-panel facer-motion-card" ref={featuredPanelRef} tabIndex={0}>
            <div className="fp3d-glare" aria-hidden="true" />
            <div className="facer-panel-inner">
              <div className="facer-video-shell">
                <video
                  ref={videoRef}
                  src="/videos/facer-product-demo.mp4"
                  poster="/favicon.svg"
                  muted={!soundEnabled}
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                />
                <canvas ref={faceMeshRef} aria-hidden="true" />
                <div className="facer-video-shade" />
              </div>
              <div className="facer-panel-copy">
                <span>FaceR</span>
                <strong>{copy.panelTitle}</strong>
                <small>{copy.panelSmall}</small>
                <button className="sound-toggle" type="button" onClick={toggleSound}>
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  {soundEnabled ? copy.soundOn : copy.soundOff}
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      <div className="pcards">
        {productCards.map((product, index) => (
          <ProductFlipCard
            key={product.name}
            product={product}
            visual={productVisuals[product.name] ?? productVisuals.EasyMeet}
            index={index}
            tone={statusTone(product.status)}
            language={language}
            copy={copy}
          />
        ))}
      </div>
    </section>
  )
}
