import { createContext } from 'react';

const ChatwsContext = createContext<{
  sendData: (text: string) => void;
  sendDataDraw: (text: string) => void;
}>({
  sendData: () => {},
  sendDataDraw: () => {},
});

export default ChatwsContext;
