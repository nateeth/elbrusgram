import { useCallback, useEffect, useMemo, useRef } from 'react';
import ChatwsContext from './chatwsContext';
import { useAppDispatch, useAppSelector } from '../../providers/hooks';
import { UserStatusEnum } from '../../../schemas/authSchema';

type ChatwsProviderProps = {
  children: JSX.Element;
};

export default function ChatwsProvider({ children }: ChatwsProviderProps): JSX.Element {
  const status = useAppSelector((state) => state.auth.user.status);
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function socketInit(): void {
      if (status === UserStatusEnum.logged) {
        const socket = new WebSocket('ws://localhost:3000/socket');
        socket.onopen = () => {
          console.log('Соединение открыто');
        };
        socket.onclose = () => {
          console.log('Сокет закрылся');
          setTimeout(socketInit, 3000);
        };
        socket.onerror = console.error;
        socket.onmessage = (message) => {
          const action = JSON.parse(message.data as string);
          console.log(`Получено сообщение:`, action);
          dispatch(action);
        };
        socketRef.current = socket;
      }
    }
    socketInit();
  }, [status]);

  const sendData = useCallback((text: string) => {
    const socket = socketRef.current;
    if (!socket) return;
    const action = {
      type: 'NEW_MESSAGE',
      payload: text,
    };
    socket.send(JSON.stringify(action));
  }, []);

  const contextData = useMemo(() => ({ sendData }), []);

  return <ChatwsContext.Provider value={contextData}>{children}</ChatwsContext.Provider>;
}
