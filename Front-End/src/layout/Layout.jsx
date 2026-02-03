import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

export default function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <TopBar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
