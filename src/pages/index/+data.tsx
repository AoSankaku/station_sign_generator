import { useConfig } from "vike-react/useConfig";
import i18n from "../../i18n/configs";
import ogp from "../../assets/images/ogp.png"
import favicon from "/favicon.ico"
import base from "../../../vite.config"

export interface Data {
  locale: string;
}

export const data = (pageContext: { locale: string }) => {

  const locale = pageContext.locale;

  const baseUrl = "https://aosankaku.github.io"
  const baseName = base.base
  const ogUrl = baseUrl + baseName + locale
  console.dir(baseName)

  const config = useConfig()

  console.log(`locale: ${typeof (locale)}: ${locale}`)
  locale === "" ? i18n.changeLanguage("ja") : i18n.changeLanguage(locale as string)
  config({
    title: i18n.t("meta.title"),
    description: i18n.t("meta.description"),
    lang: i18n.language,
    image: ogp,
    favicon: favicon,
    Head: <>
      <meta name="og:type" content="website" />
      <meta name="og:url" content={ogUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Ao_Sankaku" />
    </>
  })

  /*
  title={t("meta.title")}
  meta={[
    { name: 'description', content: t("meta.description") },
    { property: 'og:url', content: url },
    { property: 'og:type', content: "website" },
    { property: 'og:title', content: t("meta.title") },
    { property: 'og:description', content: t("meta.description") },
    { property: 'og:image', content: ogpImageUrl },
    { property: 'og:site_name', content: t("meta.title") },
    { name: 'twitter:card', content: "summary_large_image" },
    { name: 'twitter:site', content: "@Ao_Sankaku" },
  ]}
  htmlAttributes={{ lang: i18n.language }}
  */

  const data: Data = {
    locale: locale
  }
  return data;
}