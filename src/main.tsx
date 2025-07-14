import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css';
import AuthPage from './pages/AuthPage.tsx';
import HomePage from './pages/HomePage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>,
);
