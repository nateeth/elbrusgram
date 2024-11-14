import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ChatwsContext from './chatwsContext';
import { useAppDispatch, useAppSelector } from '../hook';




type ChatwsProviderProps = {
  children: JSX.Element;
};

export default function ChatwsProvider({ children }: ChatwsProviderProps): JSX.Element {
  const {role} = useAppSelector((state) => state.auth);
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function socketInit(): void {
      if (role === 'guest') {
        const socket = new WebSocket('http://localhost:3000');
        socket.onopen = () => {
          console.log('Соединение открыто');
        };
        socket.onclose = () => {
          console.log('Сокет закрылся');
          setTimeout(socketInit, 3000);
        };
        socket.onerror = console.error;
        socket.onmessage = (message) => {
          const action = (JSON.parse(message.data as string));
          console.log(`Получено сообщение:`, action);
          dispatch(action);
        };
        socketRef.current = socket;
      }
    }
    socketInit();
  }, [role, dispatch]);

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
