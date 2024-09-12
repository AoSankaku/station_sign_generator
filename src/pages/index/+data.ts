import { useConfig } from "vike-react/useConfig";
import i18n from "../../i18n/configs";

export interface Data {
  locale: string;
}

export const data = (pageContext: { locale: string }) => {
  const locale = pageContext.locale;
  const c = useConfig()
  console.log(`locale: ${typeof (locale)}: ${locale}`)
  locale === "" ? i18n.changeLanguage("ja") : i18n.changeLanguage(locale as string)
  c({
    title: i18n.t("meta.title")
  })

  const data: Data = {
    locale: locale
  }
  return data;
}