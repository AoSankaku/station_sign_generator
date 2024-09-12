export { onBeforeRoute }

import { modifyUrl } from 'vike/modifyUrl'
import type { Url } from 'vike/types'
import { languages } from '../i18n/configs'

interface PageContext {
  urlParsed: Url;
  response?: {
    statusCode?: number;
    headers?: Record<string, string>;
  };
}

function onBeforeRoute(pageContext: PageContext) {
  const { urlWithoutLocale, locale } = extractLocale(pageContext.urlParsed)

  return {
    pageContext: {
      // Make `locale` available as `pageContext.locale`
      locale,
      // Vike's router will use pageContext.urlLogical instead of pageContext.urlOriginal
      urlLogical: urlWithoutLocale
    }
  }
}

function extractLocale(url: Url) {
  const { pathname } = url
  const locale = languages.includes(pathname.split("/")[1]) ? pathname.split("/")[1] : ""

  // Determine the locale, for example:
  //  /en-US/film/42 => en-US
  //  /de-DE/film/42 => de-DE
  // const locale = /* ... */

  // Remove the locale, for example:
  //  /en-US/film/42 => /film/42
  //  /de-DE/film/42 => /film/42
  const pathnameWithoutLocale = "/"

  // Reconstruct full URL
  const urlWithoutLocale = modifyUrl(url.href, { pathname: pathnameWithoutLocale })

  return { locale, urlWithoutLocale }
}