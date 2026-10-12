import badgeLarge from '../../assets/nni-badge.webp'
import badgeSmall from '../../assets/nni-badge-128.webp'
import './NniBadge.css'

// Logotipo oficial de Neural Network Initiative con anillos orbitales animados y profundidad 3D.
export default function NniBadge({ size = 56, alt = 'Neural Network Initiative', large = false }) {
  return (
    <span className={large ? 'nni-badge is-large' : 'nni-badge'} style={{ '--size': `${size}px` }}>
      <span className="nni-badge-body">
        <svg className="nni-badge-orbits" viewBox="0 0 100 100" aria-hidden="true">
          <circle className="orbit orbit-a" cx="50" cy="50" r="49" pathLength="100" />
          <circle className="orbit orbit-b" cx="50" cy="50" r="46.5" pathLength="100" />
        </svg>
        <img
          src={large ? badgeLarge : badgeSmall}
          srcSet={large ? undefined : `${badgeSmall} 1x, ${badgeLarge} 2x`}
          width={size}
          height={size}
          alt={alt}
          decoding="async"
          draggable="false"
        />
        <span className="nni-badge-gloss" aria-hidden="true" />
      </span>
    </span>
  )
}
