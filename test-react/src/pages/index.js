import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountsRoutes from './accounts';
import Home from './Home';

export default function Root() {
    return (
        <Routes>
            <Route path="accounts/*" element={<AccountsRoutes />} />
            <Route path="/" element={<Home />} />
        </Routes>
    );
}
