import { useTranslation } from "react-i18next"
import { AppBar, Container, IconButton, Tooltip, Box, Menu, Typography, MenuItem } from "@mui/material";
import { Share } from "@mui/icons-material";
import styled from "styled-components";
import TrainIcon from '@mui/icons-material/Train';
import { JP, US } from "country-flag-icons/react/3x2";
import { useEffect, useState } from "react";

const Header = () => {
  const { t, i18n } = useTranslation();
  const langs = [
    {
      langName: '日本語',
      lang: 'ja',
      flag: <JP style={{ width: '2em' }} />
    },
    {
      langName: 'English',
      lang: 'en',
      flag: <US style={{ width: '2em' }} />
    },
  ];
  const [url, setUrl] = useState("https://example.com");

  // For menu
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
  const [anchorElShare, setAnchorElShare] = useState<null | HTMLElement>(null);

  const handleOpenLangMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(e.currentTarget);
  }

  const handleOpenShareMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElShare(e.currentTarget);
  }

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleCloseShareMenu = () => {
    setAnchorElShare(null);
  };



  useEffect(() => {
    setUrl(document.URL)
  })

  interface FlagProps {
    country: 'ja' | 'en';
  }

  const Flag: React.FC<FlagProps> = ({ country }) => {
    switch (country) {
      case 'ja': return <JP />;
      case 'en': return <US />;
      default: throw new Error("Language not recognized... how did you caused this error?");
    }
  }

  return (
    <AppBar>
      <Container maxWidth="xl" style={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <HeaderText>
            <TrainIcon sx={{ display: 'flex', mr: 1 }} />{t("header.title")}
          </HeaderText>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={t("header.tooltip.lang")}>
            <IconButton style={{ width: '2em' }} onClick={handleOpenLangMenu}>
              <Flag country={(i18n.language === 'ja' || i18n.language === 'en') ? i18n.language : 'en'} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElLang}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
          >
            {langs.map((e) => (
              <MenuItem key={e.lang} style={{ display: 'flex', gap: '10px' }} onClick={() => {
                i18n.changeLanguage(e.lang);
                handleCloseLangMenu();
              }}>
                {e.flag}<Typography textAlign="center">{e.langName}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title={t("header.tooltip.share")}>
            <IconButton onClick={() => { }}>
              <Share />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
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