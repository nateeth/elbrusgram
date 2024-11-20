import { createContext } from 'react';


export type groupDataType = {
  title: string,
          description: string;
          chatflag: boolean;
          ownerid: number;
          users: string[];
}
type ChatwsContextType = {
  sendData: (text: string, groupId: string | undefined) => void;
  sendDataDraw: (text: string) => void;
  sendGroupData(groupData: groupDataType): void;
}

const ChatwsContext = createContext<ChatwsContextType>({
  sendData: () => {},
  sendDataDraw: () => {},
  sendGroupData: () => {},
});

export default ChatwsContext;
