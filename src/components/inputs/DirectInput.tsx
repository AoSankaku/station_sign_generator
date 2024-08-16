import { ChangeEvent } from 'react';
import { Button, TextField, IconButton, Slider, Box, Grid, List, ListItem, Switch, ListSubheader } from '@mui/material'
import { Delete, Cached } from '@mui/icons-material';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SketchPicker } from 'react-color'
import DirectInputStationProps, { Direction } from '../signs/DirectInputStationProps';

interface DirectInputStationPropsWithHandleChange extends DirectInputStationProps {
  //for update
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DirectInput: React.FC<DirectInputStationPropsWithHandleChange> = (props) => {

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


  const handleDirectionChange = (direction: Direction) => {
    props.onChange({
      target: {
        name: 'direction',
        value: direction
      }
    } as ChangeEvent<HTMLInputElement>)
  }

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

  return (
    <>
      <Button variant="contained" onClick={handleSwap}><Cached />swap left and right</Button>
      <Slider defaultValue={props.ratio} valueLabelDisplay='auto' step={0.5} marks min={2.5} max={8} style={{ width: "200px" }} onChange={(_, v) => updateCurrentData("ratio", v as number)} />
      <TextField name="leftStationName" label="左駅名" variant="outlined" value={props.leftStationName} onChange={props.onChange} />
      <TextField name="leftStationNameFurigana" label="左駅名（よみがな）" variant="outlined" value={props.leftStationNameFurigana} onChange={props.onChange} />
      <TextField name="leftStationNameEnglish" label="左駅名（英語）" variant="outlined" value={props.leftStationNameEnglish} onChange={props.onChange} />
      <TextField name="leftStationNumber" label="左駅ナンバリング" variant="outlined" value={props.leftStationNumber} onChange={props.onChange} />
      <TextField name="stationName" label="駅名" variant="outlined" value={props.stationName} onChange={props.onChange} />
      <TextField name="stationNameFurigana" label="駅名（ふりがな）" variant="outlined" value={props.stationNameFurigana} onChange={props.onChange} />
      <TextField name="stationNameEnglish" label="駅名（英語）" variant="outlined" value={props.stationNameEnglish} onChange={props.onChange} />
      <TextField name="stationNameChinese" label="駅名（繁体中文）" variant="outlined" value={props.stationNameChinese} onChange={props.onChange} />
      <TextField name="stationNameKorean" label="駅名（한국어）" variant="outlined" value={props.stationNameKorean} onChange={props.onChange} />
      <TextField name="stationNumber" label="駅ナンバリング" variant="outlined" value={props.stationNumber} onChange={props.onChange} />
      <TextField name="stationThreeLetterCode" label="スリーレターコード" variant="outlined" value={props.stationThreeLetterCode} onChange={props.onChange} />
      <TextField name="stationNote" label="駅補足" variant="outlined" value={props.stationNote} onChange={props.onChange} />
      <TextField name="rightStationName" label="右駅名" variant="outlined" value={props.rightStationName} onChange={props.onChange} />
      <TextField name="rightStationNameFurigana" label="右駅名（ふりがな）" variant="outlined" value={props.rightStationNameFurigana} onChange={props.onChange} />
      <TextField name="rightStationNameEnglish" label="右駅名（英語）" variant="outlined" value={props.rightStationNameEnglish} onChange={props.onChange} />
      <TextField name="rightStationNumber" label="右駅ナンバリング" variant="outlined" value={props.rightStationNumber} onChange={props.onChange} />
      <>
        <IconButton aria-label="left" size="large" onClick={() => handleDirectionChange("left")}>
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="both" size="large" onClick={() => handleDirectionChange("both")}>
          <SwapHorizontalCircleIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="right" size="large" onClick={() => handleDirectionChange("right")}>
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
                  id: Date.now() - 1723600000000,
                  name: "",
                  isWhite: true,
                }
              ] : undefined)
            }}>追加</Button>
            <List subheader={<ListSubheader>特定都区市内</ListSubheader>}>
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
                    <TextField label="名称" variant='standard' value={e.name} onChange={(i) => {
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

export default DirectInput