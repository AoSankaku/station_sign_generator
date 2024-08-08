import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material'
import { Rect, Layer, Stage } from 'react-konva'
import styled from 'styled-components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignWrapper>
        <Stage width={100} height={100}>
          <Layer>
            <Rect fill='white' x={0} y={0} width={100} height={100} />
            <Rect fill='red' x={2} y={2} width={60} height={30} />
          </Layer>
        </Stage>
      </SignWrapper>
      <Button variant="contained">unchiburi</Button>
    </>
  )
}

const SignWrapper = styled.div`
width: 100%;
background: blue;
`

export default App
