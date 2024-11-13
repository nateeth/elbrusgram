import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('root');

if (container)
{createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
} else {console.error('Root element not found')}

