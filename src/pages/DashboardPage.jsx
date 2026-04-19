/**
 * DashboardPage
 * Página principal del docente
 */

import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-headline text-4xl text-on-surface mb-2">
          Bienvenido, {user?.nombre || 'Docente'}
        </h1>
        <p className="text-on-surface-variant mb-8">Dashboard - En desarrollo</p>
        
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-md">
          <p className="text-sm text-on-surface-variant">
            Los componentes del dashboard se agregarán en los siguientes commits
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
