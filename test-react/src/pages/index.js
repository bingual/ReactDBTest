import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountsRoutes from './accounts';
import Home from './Home';
import LoginRequiredPage from 'utils/LoginrequiredPage';
import AppLayout from 'components/AppLayout';

export default function Root() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="accounts/*" element={<AccountsRoutes />} />
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}
