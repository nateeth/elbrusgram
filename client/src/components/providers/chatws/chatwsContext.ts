import { createContext } from 'react';

const ChatwsContext = createContext<{
  sendData: (text: string) => void;
}>({
  sendData: () => {},
});

export default ChatwsContext;
