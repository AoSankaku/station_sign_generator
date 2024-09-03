
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import ogpImage from '/src/assets/images/ogp.png'

const Head = () => {
  const { t, i18n } = useTranslation()
  return (
    <Helmet
      title={t("meta.title")}
      meta={[
        { name: 'description', content: t("meta.description") },
        { property: 'og:url', content: document.URL },
        { property: 'og:type', content: "website" },
        { property: 'og:title', content: t("meta.ttile") },
        { property: 'og:description', content: t("meta.description") },
        { property: 'og:image', content: ogpImage },
        { property: 'og:site_name', content: t("meta.title") },
        { name: 'twitter:card', content: "summary_large_image" },
        { name: 'twitter:site', content: "@Ao_Sankaku" },
      ]}
      htmlAttributes={{ lang: i18n.language }}
    />
  )
}

export default Head