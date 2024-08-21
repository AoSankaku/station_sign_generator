import { useTranslation } from "react-i18next"
import { AppBar } from "@mui/material";
import styled from "styled-components";
import TrainIcon from '@mui/icons-material/Train';

const Header = () => {
  const { t } = useTranslation();
  return (
    <AppBar>
      <HeaderText>
        <TrainIcon sx={{ display: 'flex', mr: 1 }} />{t("header.title")}
      </HeaderText>
    </AppBar>
  )
}

const HeaderText = styled.h1`
  font-size: 16px;
  padding: 10px;
  display: flex;
  align-content: center;
`

export default Header