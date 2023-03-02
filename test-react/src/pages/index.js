import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountsRoutes from './accounts';
import Home from './Home';
import LoginRequiredPage from 'utils/LoginrequiredPage';

export default function Root() {
    return (
        <Routes>
            <Route path="accounts/*" element={<AccountsRoutes />} />
            <Route element={<LoginRequiredPage />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}
