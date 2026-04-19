/**
 * PACIPage
 * Página de formulario PACI (Plan de Adaptación Curricular Individualizado)
 */

import { useState, useEffect } from 'react';
import MainContainer from '../components/layout/MainContainer';
import { Card, Button, Input, Alert, Badge } from '../components/ui';
import { FormSection, StudentSelector } from '../components/form';

const PACIPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    diagnostico: '',
    fortalezas: '',
    dificultades: '',
    adaptaciones: '',
    recursos: '',
    evaluacion: '',
  });
  const [students, setStudents] = useState([
    { id: 1, name: 'Pablo Rodríguez', nee: 'Dislexia', lastUpdated: '2025-04-15' },
    { id: 2, name: 'María García', nee: 'Discalculia', lastUpdated: '2025-04-14' },
    { id: 3, name: 'Juan López', nee: 'TDAH', lastUpdated: '2025-04-12' },
    { id: 4, name: 'Sofia Martínez', nee: 'Altas Capacidades', lastUpdated: '2025-04-10' },
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      alert('Selecciona un estudiante primero');
      return;
    }

    try {
      setIsSaving(true);
      // En producción: await paciService.savePACI(selectedStudent.id, formData);
      
      // Simulación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('PACI guardado correctamente');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainContainer>
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-headline">
            Plan PACI
          </h1>
          <p className="text-gray-600 mt-2 font-body">
            Crea y gestiona Planes de Adaptación Curricular Individualizados para tus estudiantes
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <Alert variant="success">
            ✓ {successMessage}
          </Alert>
        )}

        {/* Main Form */}
        <form onSubmit={handleSaveForm} className="space-y-8">
          {/* Student Selection */}
          <FormSection
            title="1. Selecciona el Estudiante"
            description="Elige el estudiante para el cual deseas crear o editar su PACI"
            icon="person"
          >
            <StudentSelector
              selectedStudent={selectedStudent}
              onSelectStudent={setSelectedStudent}
              students={students}
            />
          </FormSection>

          {selectedStudent && (
            <>
              {/* Student Info Display */}
              <Card variant="flat">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Nombre</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">NEE</p>
                    <Badge variant="info">{selectedStudent.nee}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Actualizado</p>
                    <p className="text-sm text-gray-900">{selectedStudent.lastUpdated}</p>
                  </div>
                </div>
              </Card>

              {/* Diagnóstico */}
              <FormSection
                title="2. Diagnóstico"
                description="Información del diagnóstico del estudiante"
                icon="assessment"
              >
                <textarea
                  name="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleInputChange}
                  placeholder="Describe el diagnóstico del estudiante..."
                  className="w-full p-3 border border-gray-300 rounded-lg font-body text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-24"
                />
              </FormSection>

              {/* Fortalezas y Dificultades */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fortalezas */}
                <FormSection
                  title="3. Fortalezas"
                  description="Capacidades y fortalezas del estudiante"
                  icon="thumb_up"
                >
                  <textarea
                    name="fortalezas"
                    value={formData.fortalezas}
                    onChange={handleInputChange}
                    placeholder="¿Cuáles son las fortalezas?"
                    className="w-full p-3 border border-gray-300 rounded-lg font-body text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-24"
                  />
                </FormSection>

                {/* Dificultades */}
                <FormSection
                  title="4. Dificultades"
                  description="Áreas de dificultad a trabajar"
                  icon="priority_high"
                >
                  <textarea
                    name="dificultades"
                    value={formData.dificultades}
                    onChange={handleInputChange}
                    placeholder="¿Cuáles son las dificultades?"
                    className="w-full p-3 border border-gray-300 rounded-lg font-body text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-24"
                  />
                </FormSection>
              </div>

              {/* Adaptaciones */}
              <FormSection
                title="5. Adaptaciones Curriculares"
                description="Define las adaptaciones a implementar"
                icon="tune"
              >
                <textarea
                  name="adaptaciones"
                  value={formData.adaptaciones}
                  onChange={handleInputChange}
                  placeholder="Describe las adaptaciones curriculares..."
                  className="w-full p-3 border border-gray-300 rounded-lg font-body text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-32"
                />
              </FormSection>

              {/* Recursos */}
              <FormSection
                title="6. Recursos y Apoyos"
                description="Materiales, tecnología y apoyos necesarios"
                icon="build"
              >
                <textarea
                  name="recursos"
                  value={formData.recursos}
                  onChange={handleInputChange}
                  placeholder="¿Qué recursos se necesitan?"
                  className="w-full p-3 border border-gray-300 rounded-lg font-body text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-24"
                />
              </FormSection>

              {/* Evaluación */}
              <FormSection
                title="7. Plan de Evaluación"
                description="Cómo se evaluará el progreso del estudiante"
                icon="check_circle"
              >
                <textarea
                  name="evaluacion"
                  value={formData.evaluacion}
                  onChange={handleInputChange}
                  placeholder="¿Cómo se evaluará el progreso?"
                  className="w-full p-3 border border-gray-300 rounded-lg font-body text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-24"
                />
              </FormSection>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? 'Guardando...' : '💾 Guardar PACI'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                >
                  📄 Generar PDF
                </Button>
              </div>
            </>
          )}
        </form>

        {/* Spacing bottom */}
        <div className="pb-8"></div>
      </div>
    </MainContainer>
  );
};

export default PACIPage;
