import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully prevent unhandled promise rejections from crashing runtime
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    if (
      reason &&
      (reason.code === 403 ||
        reason.status === 403 ||
        reason.httpStatus === 200 ||
        reason.code === 'unavailable' ||
        reason.code === 'failed-precondition' ||
        (typeof reason.message === 'string' && reason.message.includes('Could not reach Cloud Firestore backend')))
    ) {
      event.preventDefault();
      console.warn('Handled background network/Firestore status notice:', reason);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

