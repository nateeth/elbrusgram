
import { useEffect } from 'react';
import type { TTSHookProps } from 'tts-react'

interface CustomProps extends TTSHookProps {
  highlight?: boolean
}

export const CustomTTSComponent = ({ text, highlight }: { text: string; highlight: boolean }) => {
  useEffect(() => {
    if (text) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (highlight) {
        
      }

      synth.speak(utterance);
    }
  }, [text, highlight]);

  return null
} 