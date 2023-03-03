import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import Root from 'pages';
import { AppProvider } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AppProvider>
            <Root />
        </AppProvider>
    </BrowserRouter>,
);

reportWebVitals();
