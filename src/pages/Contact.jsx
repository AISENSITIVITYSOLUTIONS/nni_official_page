const contactImageBase =
  'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/645635180d328149c2379178_Frame%201726'

const contactImage =
  'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/645635180d328149c2379178_Frame%201726.png'

const contactImageSrcSet = [
  `${contactImageBase}-p-500.png 500w`,
  `${contactImageBase}-p-800.png 800w`,
  `${contactImageBase}-p-1080.png 1080w`,
  `${contactImageBase}-p-1600.png 1600w`,
  `${contactImageBase}-p-2000.png 2000w`,
  `${contactImageBase}-p-2600.png 2600w`,
  `${contactImage} 2880w`,
].join(', ')

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="contact-hero">
        <div className="contact-copy">
          <p className="eyebrow">Contacto</p>
          <h1>Contacto</h1>
          <p>
            Escríbenos para conversar sobre tus proyectos de inteligencia
            artificial, ciencia de datos, automatización o análisis estratégico.
          </p>
          <div className="contact-direct">
            <a href="tel:+525537141345">+52 (55) 3714 1345</a>
            <a href="mailto:fdealbam@nni.ai">fdealbam@nni.ai</a>
          </div>
        </div>

        <div className="contact-visual">
          <img
            src={contactImage}
            srcSet={contactImageSrcSet}
            sizes="(max-width: 980px) calc(100vw - 56px), 520px"
            alt="Imagen principal de contacto de Neural Network Initiative"
          />
        </div>
      </div>

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
            placeholder="Compártenos el contexto, objetivo o necesidad principal."
            rows="7"
          />
        </label>

        <button className="primary-button" type="submit">
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}
