import { DoubleArrow } from "@mui/icons-material"
import { Grid, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"

const Footer = () => {
  const linkContents = [
    {
      name: "Website",
      link: "https://aosankaku.github.io"
    },
    {
      name: "Twitter (Formerly X)",
      link: "https://twitter.com/@ao_sankaku"
    },
    {
      name: "Misskey (misskey.systems)",
      link: "https://misskey.systems/@ao_sankaku"
    },
    {
      name: "Misskey (yumk.xyz)",
      link: "https://yumk.xyz/@ao_sankaku"
    }
  ]
  const devContents = [
    {
      name: "Github Repository",
      link: "https://github.com/AoSankaku/station_sign_generator"
    },
    {
      name: "Issues (Bug Reports & Feature Requests)",
      link: "https://github.com/AoSankaku/station_sign_generator/issues"
    }
  ]
  return (
    <>
      <Grid container spacing={2} style={{ padding: '10px' }}>
        <Grid item xs={12} style={{ textAlign: 'center', margin: '10px' }}>
          <Typography>
            {`Copyright 2024 Blue Triangle (Under MIT License)\nFree to copy, modify, and/or redistribute!`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">
            {`Links`}
          </Typography>
          <List>
            {linkContents.map((e) => {
              return (
                <ListItem key={e.link}>
                  <ListItemIcon>
                    <DoubleArrow />
                  </ListItemIcon>
                  <Link underline="none" href={e.link}>
                    <ListItemText primary={e.name} />
                  </Link>
                </ListItem>
              )
            })}
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">
            {`Development Resources`}
          </Typography>
          <List>
            {devContents.map((e) => {
              return (
                <ListItem key={e.link}>
                  <Link underline="none" href={e.link}>
                    <ListItemIcon>
                      <DoubleArrow />
                    </ListItemIcon>
                    <ListItemText primary={e.name} />
                  </Link>
                </ListItem>
              )
            })}
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export default Footer