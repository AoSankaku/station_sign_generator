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
    image: baseName + ogp,
    favicon: favicon,
    Head: <>
      <meta name="og:type" content="website" />
      <meta name="og:url" content={ogUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Ao_Sankaku" />
    </>
  })

  const data: Data = {
    locale: locale
  }
  return data;
}