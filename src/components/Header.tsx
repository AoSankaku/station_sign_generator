import { useTranslation } from "react-i18next"
import { AppBar, Container, IconButton, Tooltip, Box, Menu, Typography, MenuItem } from "@mui/material";
import { Share } from "@mui/icons-material";
import TrainIcon from '@mui/icons-material/Train';
import { JP, US } from "country-flag-icons/react/3x2";
import { ReactElement, useEffect, useState } from "react";
import { BsTwitter, BsCopy } from "react-icons/bs";
import { SiMisskey, SiDiscord, SiMastodon, SiLine, SiX, SiReddit } from "react-icons/si";

const Header = () => {
  const { t, i18n } = useTranslation();
  type lang = {
    langName: string,
    lang: string,
    flag: ReactElement,
  }
  const langs: lang[] = [
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
  type shareOption = {
    name: string,
    link: string | Function,
    icon: ReactElement,
    id: number,
  }
  const shareOptions: shareOption[] = [
    {
      name: t("header.tooltip.share-options.copy"),
      link: "",
      icon: <BsCopy />,
      id: 201,
    },
    {
      name: t("header.tooltip.share-options.twitter"),
      link: "",
      icon: <BsTwitter />,
      id: 1,
    },
    {
      name: t("header.tooltip.share-options.x"),
      link: "",
      icon: <SiX />,
      id: 2,
    },
    {
      name: t("header.tooltip.share-options.discord"),
      link: "",
      icon: <SiDiscord />,
      id: 11,
    },
    {
      name: t("header.tooltip.share-options.reddit"),
      link: "",
      icon: <SiReddit />,
      id: 12,
    },
    {
      name: t("header.tooltip.share-options.misskey"),
      link: "",
      icon: <SiMisskey />,
      id: 21,
    },
    {
      name: t("header.tooltip.share-options.mastodon"),
      link: "",
      icon: <SiMastodon />,
      id: 22,
    },
    {
      name: t("header.tooltip.share-options.line"),
      link: "",
      icon: <SiLine />,
      id: 101,
    },
  ]
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
      <Container maxWidth="xl" style={{ display: 'flex', alignItems: 'center', height: '64px' }} sx={{ padding: { xs: '0', sm: '0 24px' } }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', padding: { xs: '8px', sm: '0' } }}>
          <TrainIcon sx={{ display: 'flex', mr: 1 }} />
          <Typography variant="h1" sx={{ fontSize: { xs: '14px', sm: '16px' }, padding: { xs: '4px', sm: '10px' }, whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>
            {t("header.title")}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Tooltip title={t("header.tooltip.lang")}>
            <IconButton sx={{ width: { xs: '40px', sm: '2em' } }} onClick={handleOpenLangMenu}>
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
            disableScrollLock={true}
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
            <IconButton sx={{ width: { xs: '40px', sm: '2em' } }} onClick={handleOpenShareMenu}>
              <Share />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElShare}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElShare)}
            onClose={handleCloseShareMenu}
            disableScrollLock={true}
          >
            {shareOptions.map((e) => (
              <MenuItem key={e.id} style={{ display: 'flex', gap: '10px' }} onClick={() => {
                handleCloseLangMenu();
              }}>
                {e.icon}<Typography textAlign="center">{e.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header