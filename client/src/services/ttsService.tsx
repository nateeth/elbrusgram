import {Button} from '@mui/material'
import { useTts } from 'tts-react'
import type { TTSHookProps } from 'tts-react'

interface CustomProps extends TTSHookProps {
  highlight?: boolean
}

export const CustomTTSComponent = ({ children, highlight = false }: CustomProps) => {
  const { ttsChildren, state, play, stop, pause } = useTts({
    lang: 'ru-RU',
    children,
    markTextAsSpoken: highlight,
  });

  return (
    <div>
      <>
        <Button disabled={state.isPlaying} onClick={play}>
          ▶
        </Button>
        <Button disabled={!state.isPlaying} onClick={pause}>
          ⏸
        </Button>
        <Button onClick={stop}>⏹</Button>
      </>
      {ttsChildren}
    </div>
  );
}