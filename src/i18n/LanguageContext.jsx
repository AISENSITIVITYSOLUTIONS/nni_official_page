import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './language'

const meta = {
  es: {
    title: 'Neural Network Initiative | IA institucional, ciencia de datos y automatización estratégica',
    description:
      'Consultora especializada en inteligencia artificial, ciencia de datos, automatización y análisis estratégico para empresas, gobiernos, universidades y organizaciones.',
  },
  en: {
    title: 'Neural Network Initiative | Institutional AI, data science and strategic automation',
    description:
      'Consulting firm specialized in artificial intelligence, data science, automation and strategic analysis for companies, governments, universities and organizations.',
  },
}

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'es'
  const saved = window.localStorage.getItem('nni-language')
  if (saved === 'en' || saved === 'es') return saved
  return window.navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem('nni-language', language)
    document.documentElement.lang = language
    document.title = meta[language].title

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', meta[language].description)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')

    if (ogTitle) ogTitle.setAttribute('content', meta[language].title)
    if (ogDescription) ogDescription.setAttribute('content', meta[language].description)
    if (twitterTitle) twitterTitle.setAttribute('content', meta[language].title)
    if (twitterDescription) twitterDescription.setAttribute('content', meta[language].description)
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      isEnglish: language === 'en',
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
