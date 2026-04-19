/**
 * MainContainer Component
 * Contenedor principal con SideNav y TopNav
 */

import React from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';

const MainContainer = ({ children, title = 'Aula Orgánica' }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* SideNav */}
      <SideNav />

      {/* TopNav */}
      <TopNav title={title} />

      {/* Main Content */}
      <main className="flex-1 pt-20 md:pt-8 md:ml-72 pb-8 px-6 md:px-10 lg:px-12 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default MainContainer;
