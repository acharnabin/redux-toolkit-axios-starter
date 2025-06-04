import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#007bff', color: 'white', padding: '1rem', textAlign: 'center' }}>
        <h1>My App</h1>
      </header>

      <main style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Outlet/>
      </main>

      <footer style={{ backgroundColor: '#f1f1f1', padding: '1rem', textAlign: 'center' }}>
        © 2025 My App. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
