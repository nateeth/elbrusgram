import { createContext } from 'react';

const ChatwsContext = createContext<{
  sendData: (text: string, groupId: number) => void;
  editMessage: (messageId: number, newText: string, groupId: number) => void;
}>({
  sendData: () => {},
  editMessage: () => {},
});

export default ChatwsContext;
