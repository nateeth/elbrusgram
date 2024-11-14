import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import ChatwsProvider from './store/chatws/ChatwsProvider';

const container = document.getElementById('root');

if (container)
{createRoot(container).render(
  <Provider store={store}>
    <ChatwsProvider>
    <App />
    </ChatwsProvider>
  </Provider>,
);
} else {console.error('Root element not found')}

