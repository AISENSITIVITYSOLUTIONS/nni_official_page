import { useEffect } from 'react'

const productsUrl = 'https://facer-webpage.web.app/'

export default function Products() {
  useEffect(() => {
    window.location.href = productsUrl
  }, [])

  return (
    <section className="page-section">
      <p className="eyebrow">Productos</p>
      <h1>Redirigiendo</h1>
      <p>
        Te estamos enviando a la pagina de productos. Si no abre
        automaticamente, visita <a href={productsUrl}>este enlace</a>.
      </p>
    </section>
  )
}
