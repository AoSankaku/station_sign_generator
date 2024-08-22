import { ChangeEvent } from 'react';
import { Button, TextField, IconButton, Slider, Box, Grid, List, ListItem, Switch, ListSubheader, Stack } from '@mui/material'
import { Delete, Cached } from '@mui/icons-material';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StraightenIcon from '@mui/icons-material/Straighten';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SketchPicker } from 'react-color'
import DirectInputStationProps from '../signs/DirectInputStationProps';
import { useTranslation } from "react-i18next"
import styled from 'styled-components';
import { v7 as uuidv7 } from 'uuid'

interface DirectInputStationPropsWithHandleChange extends DirectInputStationProps {
  //for update
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DirectInput: React.FC<DirectInputStationPropsWithHandleChange> = (props) => {

  const { t } = useTranslation()

  const handleSwap = () => {
    const target = {
      leftStationName: props.rightStationName,
      leftStationNameFurigana: props.rightStationNameFurigana,
      leftStationNameEnglish: props.rightStationNameEnglish,
      leftStationNumber: props.rightStationNumber,
      rightStationName: props.leftStationName,
      rightStationNameFurigana: props.leftStationNameFurigana,
      rightStationNameEnglish: props.leftStationNameEnglish,
      rightStationNumber: props.leftStationNumber,
    };

    Object.entries(target).forEach(([key, value]) => {
      console.dir(`setting ${key} to ${value}`)
      props.onChange({
        target: {
          name: key,
          value: value || '',
        },
      } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    });
  };

  const handleColorChange = (name: string, color: string) => {
    props.onChange({
      target: {
        name: name,
        value: color
      }
    } as ChangeEvent<HTMLInputElement>)
  }

  const updateCurrentData = (name: string, value: any) => {
    props.onChange({
      target: {
        name: name,
        value: value,
      }
    } as ChangeEvent<HTMLInputElement>)
  }

  const basicGridStyle = {
  }

  return (
    <>
      <Box sx={{ width: '100%', padding: '25px', alignContent: 'center' }}>
        <Grid container direction="row" spacing={2} rowSpacing={6} style={basicGridStyle}>
          <Grid item xs={12} sm="auto" sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Button variant="contained" onClick={handleSwap}><Cached style={{ marginRight: '10px' }} />{t("input.direct.swaplr")}</Button>
          </Grid>
          <Grid item xs={1} sm={1} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
            <StraightenIcon />
          </Grid>
          <Grid item xs={11} sm>
            <Slider defaultValue={props.ratio} valueLabelDisplay='on' step={0.5} marks min={2.5} max={8} style={{ width: "100%" }} onChange={(_, v) => updateCurrentData("ratio", v as number)} />
          </Grid>
        </Grid>
      </Box>
      <Grid container direction="row" style={{ ...basicGridStyle, justifyContent: 'center' }} spacing={2}>
        <Grid item xs={10} md={3}>
          <Stack spacing={3}>
            <InputHead><KeyboardDoubleArrowLeftIcon />{t("input.direct.input-left")}</InputHead>
            <TextField name="leftStationName" label={t("input.direct.lstation")} variant="outlined" value={props.leftStationName} onChange={props.onChange} />
            <TextField name="leftStationNameFurigana" label={t("input.direct.lread")} variant="outlined" value={props.leftStationNameFurigana} onChange={props.onChange} />
            <TextField name="leftStationNameEnglish" label={t("input.direct.len")} variant="outlined" value={props.leftStationNameEnglish} onChange={props.onChange} />
            <TextField name="leftStationNumber" label={t("input.direct.lnum")} variant="outlined" value={props.leftStationNumber} onChange={props.onChange} />
          </Stack>
        </Grid>
        <Grid item xs={10} md={3}>
          <Stack spacing={3}>
            <InputHead><DirectionsRailwayIcon />{t("input.direct.input-current")}</InputHead>
            <TextField name="stationName" label={t("input.direct.station")} variant="outlined" value={props.stationName} onChange={props.onChange} />
            <TextField name="stationNameFurigana" label={t("input.direct.read")} variant="outlined" value={props.stationNameFurigana} onChange={props.onChange} />
            <TextField name="stationNameEnglish" label={t("input.direct.en")} variant="outlined" value={props.stationNameEnglish} onChange={props.onChange} />
            <TextField name="stationNameChinese" label={t("input.direct.ch")} variant="outlined" value={props.stationNameChinese} onChange={props.onChange} />
            <TextField name="stationNameKorean" label={t("input.direct.kp")} variant="outlined" value={props.stationNameKorean} onChange={props.onChange} />
            <TextField name="stationNumber" label={t("input.direct.num")} variant="outlined" value={props.stationNumber} onChange={props.onChange} />
            <TextField name="stationThreeLetterCode" label={t("input.direct.trc")} variant="outlined" value={props.stationThreeLetterCode} onChange={props.onChange} />
            <TextField name="stationNote" label={t("input.direct.note")} variant="outlined" value={props.stationNote} onChange={props.onChange} />
          </Stack>
        </Grid>
        <Grid item xs={10} md={3}>
          <Stack spacing={3}>
            <InputHead>{t("input.direct.input-right")}<KeyboardDoubleArrowRightIcon /></InputHead>
            <TextField name="rightStationName" label={t("input.direct.rstation")} variant="outlined" value={props.rightStationName} onChange={props.onChange} />
            <TextField name="rightStationNameFurigana" label={t("input.direct.rread")} variant="outlined" value={props.rightStationNameFurigana} onChange={props.onChange} />
            <TextField name="rightStationNameEnglish" label={t("input.direct.ren")} variant="outlined" value={props.rightStationNameEnglish} onChange={props.onChange} />
            <TextField name="rightStationNumber" label={t("input.direct.rnum")} variant="outlined" value={props.rightStationNumber} onChange={props.onChange} />
          </Stack>
        </Grid>
      </Grid>
      <>
        <IconButton aria-label="left" size="large" onClick={() => updateCurrentData("direction", "left")}>
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="both" size="large" onClick={() => updateCurrentData("direction", "both")}>
          <SwapHorizontalCircleIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="right" size="large" onClick={() => updateCurrentData("direction", "right")}>
          <ArrowForwardIcon fontSize="inherit" />
        </IconButton>
      </>
      <Box sx={{ flexGrow: 1, maxWidth: 150 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button variant='contained' onClick={() => {
              updateCurrentData("stationArea", props.stationArea ? [
                ...props.stationArea,
                {
                  id: uuidv7(),
                  name: "",
                  isWhite: true,
                }
              ] : undefined)
            }}>追加</Button>
            <List subheader={<ListSubheader>{t("input.direct.area")}</ListSubheader>}>
              {props.stationArea?.map((e) => {
                return (
                  <ListItem
                    key={e.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label='delete' onClick={() => {
                        updateCurrentData("stationArea", props.stationArea?.filter(c => c.id !== e.id))
                      }}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <TextField label={t("input.direct.area-name")} variant='standard' value={e.name} onChange={(i) => {
                      const nextStationArea = props.stationArea?.map((c) => {
                        if (e.id === c.id) {
                          return ({
                            id: c.id,
                            name: i.target.value,
                            isWhite: c.isWhite,
                          });
                        } else {
                          return c;
                        }
                      })
                      updateCurrentData("stationArea", nextStationArea)
                    }} />
                    <Switch
                      checked={e.isWhite}
                      onChange={() => {
                        const nextStationArea = props.stationArea?.map((c) => {
                          if (e.id === c.id) {
                            return ({
                              id: c.id,
                              name: c.name,
                              isWhite: !c.isWhite,
                            });
                          } else {
                            return c;
                          }
                        })
                        updateCurrentData("stationArea", nextStationArea)
                      }}
                    />
                  </ListItem>
                )
              })}
            </List>
          </Grid>
        </Grid>
      </Box>
      <SketchPicker color={props.baseColor} onChange={(color) => { handleColorChange("baseColor", color.hex) }} />
      <SketchPicker color={props.lineColor} onChange={(color) => { handleColorChange("lineColor", color.hex) }} />
      <TextField fullWidth multiline variant="outlined" value={JSON.stringify(props, null, 2)} />
    </>
  )
}

const InputHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  font-weight: 700;
  padding-top: 30px;
`

export default DirectInput