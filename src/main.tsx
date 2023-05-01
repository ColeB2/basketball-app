import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// if (process.env.NODE_ENV === 'development') {
//     const { worker } = await import('./mocks/browser');
//     // import { worker } from './mocks/browser.tsx'
//     worker.start();
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
