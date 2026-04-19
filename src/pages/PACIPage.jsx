/**
 * PACIPage
 * Página de formulario PACI
 */

import React from 'react';
import { MainContainer, Card } from '../components';

const PACIPage = () => {
  return (
    <MainContainer title="Formulario PACI">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="font-headline text-4xl text-on-surface tracking-tight">
            Formulario PACI
          </h1>
          <p className="text-on-surface-variant mt-2">Gestión de adaptaciones curriculares</p>
        </header>

        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-md border border-outline-variant/15">
          <p className="text-sm text-on-surface-variant">
            Los componentes del formulario PACI se agregarán en los siguientes commits
          </p>
        </div>
      </div>
    </MainContainer>
  );
};

export default PACIPage;
