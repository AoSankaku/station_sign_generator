import { languages } from "../../../i18n/configs"

export { onBeforePrerenderStart }

const onBeforePrerenderStart = () => {
  const rawLang = languages
  const langList = rawLang.filter((e) => e !== "ja")
  const langUrls = langList.map(e => '/' + e)
  return langUrls
}