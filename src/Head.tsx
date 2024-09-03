
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const Head = () => {
  const { t, i18n } = useTranslation()
  return (
    <Helmet
      title={t("meta.title")}
      meta={[
        { name: 'description', content: t("meta.description") }
      ]}
      htmlAttributes={{ lang: i18n.language }}
    />
  )
}

export default Head