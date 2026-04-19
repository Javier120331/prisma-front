/**
 * DashboardPage
 * Página principal del docente
 */

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MainContainer, Card } from '../components';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <MainContainer title="Escritorio">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="font-headline text-5xl md:text-6xl text-on-surface tracking-tight max-w-4xl">
            Buen día, <span className="text-primary italic font-signature">{user?.nombre || 'Docente'}</span>.<br />
            Tu aula florece hoy.
          </h1>
        </header>

        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-md border border-outline-variant/15">
          <p className="text-sm text-on-surface-variant">
            Los componentes del dashboard (métricas, gráficos, etc.) se agregarán en los siguientes commits
          </p>
        </div>
      </div>
    </MainContainer>
  );
};

export default DashboardPage;
