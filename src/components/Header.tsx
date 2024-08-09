import { useTranslation } from "react-i18next"

const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <p>{t("header.title")}</p>
    </header>
  )
}

export default Header