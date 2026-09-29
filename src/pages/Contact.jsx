const projectTypes = [
  'Diagnóstico de IA y datos',
  'Dashboard o visualización',
  'Automatización de procesos',
  'Producto digital o app',
  'Seguridad institucional',
  'Capacitación para equipos',
]

export default function Contact() {
  return (
    <section className="page contact-page">
      <div className="page-hero">
        <p className="eyebrow">Contacto</p>
        <h1>Conversemos sobre el problema que necesita inteligencia aplicada.</h1>
        <p>
          Escríbenos si buscas ordenar datos, automatizar procesos, construir un
          producto digital, diseñar un tablero o formar equipos capaces de usar IA con
          criterio. Respondemos normalmente dentro de uno a dos días hábiles.
        </p>
        <div className="contact-direct">
          <a href="tel:+525537141345">+52 (55) 3714 1345</a>
          <a href="mailto:fdealbam@nni.ai">fdealbam@nni.ai</a>
        </div>
      </div>

      <div className="contact-layout">
        <aside className="contact-aside">
          <p className="eyebrow">Podemos ayudarte con</p>
          <div className="tag-list">
            {projectTypes.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p>
            Para acelerar la conversación, incluye contexto, objetivo, datos disponibles,
            usuarios esperados y fecha tentativa de implementación.
          </p>
        </aside>

        <form
          className="contact-form"
          action="mailto:fdealbam@nni.ai"
          method="post"
          encType="text/plain"
        >
          <div className="contact-form-header">
            <p className="eyebrow">Mensaje</p>
            <h2>Cuéntanos sobre tu proyecto</h2>
          </div>

          <div className="form-row">
            <label>
              <span>Nombre</span>
              <input name="Nombre" placeholder="Tu nombre" required type="text" />
            </label>
            <label>
              <span>Email</span>
              <input name="Email" placeholder="correo@empresa.com" required type="email" />
            </label>
          </div>

          <label>
            <span>Mensaje</span>
            <textarea
              name="Mensaje"
              placeholder="Describe la necesidad, el tipo de datos o proceso y el resultado que buscas."
              required
              rows="7"
            />
          </label>

          <button className="primary-button" type="submit">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  )
}
