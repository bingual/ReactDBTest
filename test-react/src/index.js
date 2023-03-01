import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import Signup from 'pages/accounts/Signup';
import { BrowserRouter } from 'react-router-dom';
import Root from 'pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>,
);

reportWebVitals();
