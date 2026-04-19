/**
 * PACIPage
 * Página de formulario PACI (Plan de Adaptación Curricular Individualizado)
 * Permite: 1) Subir archivo PACI existente, 2) Completar formulario en línea
 * Protege datos sensibles de menores: muestra iniciales
 */

import { useState, useEffect } from 'react';
import MainContainer from '../components/layout/MainContainer';
import { Card, Button, Input, Alert, Badge, Avatar, FileUpload, TextArea } from '../components/ui';
import { FormSection, StudentSelector } from '../components/form';
import { anonymizeName } from '../utils/privacyUtils';

const PACIPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mode, setMode] = useState('form'); // 'upload' o 'form'
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSavingFile, setIsSavingFile] = useState(false);
  
  const [formData, setFormData] = useState({
    // Datos del estudiante
    nombreEstudiante: '',
    rut: '',
    nivel: '',
    nee: '',
    fechaNacimiento: '',
    
    // Datos generales PACI
    docente: 'Docente Demo',
    especialistaNombre: '',
    especialistaCargo: '',
    especialistas: [], // Array de {nombre, cargo}
    fechaInicio: '',
    fechaTermino: '',
    
    // Diagnóstico
    diagnostico: '',
    institucionDiagnostica: '',
    
    // Fortalezas
    fortalezas: '',
    
    // Dificultades
    dificultades: '',
    
    // Adaptaciones
    adaptacionesObjetivos: '',
    adaptacionesContenidos: '',
    adaptacionesMetodologia: '',
    adaptacionesEvaluacion: '',
    
    // Recursos
    recursosMateria: '',
    recursosHumanos: '',
    recursosEspecializados: '',
    
    // Evaluación y seguimiento
    criteriosEvaluacion: '',
    seguimiento: '',
    proyecciones: '',
    
    // Observaciones
    observaciones: '',
  });

  const [students, setStudents] = useState([
    { id: 1, name: 'Pablo Rodríguez', nee: 'Dislexia', nivel: '3° Básico', lastUpdated: '2025-04-15', rut: '25.123.456-7' },
    { id: 2, name: 'María García', nee: 'Discalculia', nivel: '5° Básico', lastUpdated: '2025-04-14', rut: '24.654.321-2' },
    { id: 3, name: 'Juan López', nee: 'TDAH', nivel: '4° Básico', lastUpdated: '2025-04-12', rut: '26.789.012-5' },
    { id: 4, name: 'Sofia Martínez', nee: 'Altas Capacidades', nivel: '6° Básico', lastUpdated: '2025-04-10', rut: '25.456.789-3' },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(null);
  };

  const handleAddSpecialist = () => {
    if (formData.especialistaNombre.trim() && formData.especialistaCargo.trim()) {
      setFormData(prev => ({
        ...prev,
        especialistas: [...prev.especialistas, {
          nombre: formData.especialistaNombre.trim(),
          cargo: formData.especialistaCargo.trim(),
        }],
        especialistaNombre: '', // Limpiar campos
        especialistaCargo: '',
      }));
    }
  };

  const handleRemoveSpecialist = (index) => {
    setFormData(prev => ({
      ...prev,
      especialistas: prev.especialistas.filter((_, i) => i !== index),
    }));
  };

  const handleFileUpload = async (files) => {
    // Validar que hay datos del estudiante
    if (!selectedStudent && (!formData.nombreEstudiante.trim() || !formData.rut.trim())) {
      setErrorMessage('Selecciona un estudiante existente o ingresa el nombre y RUT del nuevo estudiante');
      return;
    }

    try {
      setIsSavingFile(true);
      // Simulación de carga
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUploadedFiles(prev => [...prev, ...files]);
      setSuccessMessage(`${files.length} archivo(s) subido(s) correctamente`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage('Error al subir archivo');
      console.error('Error:', error);
    } finally {
      setIsSavingFile(false);
    }
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    
    // Validaciones: o bien seleccionó un estudiante, o ingresó nombre y RUT
    if (!selectedStudent && (!formData.nombreEstudiante.trim() || !formData.rut.trim())) {
      setErrorMessage('Selecciona un estudiante existente o ingresa el nombre y RUT del nuevo estudiante');
      return;
    }

    // Validaciones básicas del PACI
    if (!formData.diagnostico.trim()) {
      setErrorMessage('El diagnóstico es obligatorio');
      return;
    }

    if (!formData.fortalezas.trim()) {
      setErrorMessage('Las fortalezas son obligatorias');
      return;
    }

    try {
      setIsSaving(true);
      // En producción: await paciService.savePACI(formData);
      // Si selectedStudent existe, actualizar. Si no, crear nuevo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('✓ PACI guardado correctamente');
      // Limpiar formulario
      setTimeout(() => {
        setSuccessMessage(null);
        setFormData(prev => ({
          ...prev,
          nombreEstudiante: '',
          rut: '',
          nivel: '',
          nee: '',
          fechaNacimiento: '',
          docente: 'Docente Demo',
          especialistaNombre: '',
          especialistaCargo: '',
          especialistas: [],
          fechaInicio: '',
          fechaTermino: '',
          diagnostico: '',
          institucionDiagnostica: '',
          fortalezas: '',
          dificultades: '',
          adaptacionesObjetivos: '',
          adaptacionesContenidos: '',
          adaptacionesMetodologia: '',
          adaptacionesEvaluacion: '',
          recursosMateria: '',
          recursosHumanos: '',
          recursosEspecializados: '',
          criteriosEvaluacion: '',
          seguimiento: '',
          proyecciones: '',
          observaciones: '',
        }));
        setSelectedStudent(null);
      }, 2000);
    } catch (error) {
      setErrorMessage('Error al guardar el PACI');
      console.error('Error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainContainer>
      <div className="max-w-5xl mx-auto space-y-8 py-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-headline">
            Plan PACI
          </h1>
          <p className="text-gray-600 mt-2 font-body">
            Crear PACI nuevo o editar uno existente • Decreto 83 • Subir archivo o completar formulario
          </p>
        </div>

        {/* Messages */}
        {successMessage && (
          <Alert variant="success">{successMessage}</Alert>
        )}
        {errorMessage && (
          <Alert variant="error">{errorMessage}</Alert>
        )}

        {/* Optional: Select existing student */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">¿Editar estudiante existente?</p>
              <p className="text-sm text-gray-600 mt-1">O completa un PACI nuevo ingresando los datos del estudiante</p>
            </div>
            <div className="w-64">
              <StudentSelector
                selectedStudent={selectedStudent}
                onSelectStudent={(student) => {
                  setSelectedStudent(student);
                  if (student) {
                    setFormData(prev => ({
                      ...prev,
                      nombreEstudiante: student.name,
                      rut: student.rut,
                      nivel: student.nivel,
                      nee: student.nee,
                    }));
                  }
                }}
                students={students}
              />
            </div>
          </div>
        </Card>

        {/* Student Info Card - Only if student selected */}
        {selectedStudent && (
          <Card variant="flat">
            {(() => {
              const anonData = anonymizeName(selectedStudent.name, selectedStudent.nivel);
              return (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Estudiante</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar name={selectedStudent.name} size="sm" />
                      <div>
                        <p className="font-semibold text-gray-900">{anonData.display}</p>
                        <p className="text-xs text-gray-500">{anonData.nivel}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">NEE</p>
                    <Badge variant="info" className="mt-2">{selectedStudent.nee}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">RUT</p>
                    <p className="text-sm font-mono text-gray-900 mt-2">{selectedStudent.rut}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase font-semibold">Actualizado</p>
                    <p className="text-sm text-gray-900 mt-2">{selectedStudent.lastUpdated}</p>
                  </div>
                </div>
              );
            })()}
          </Card>
        )}

        {/* Main Form - No longer requires student selection */}

            {/* Mode Selection Tabs */}
            <Card>
              <div className="flex gap-2 border-b border-gray-200 mb-6">
                <button
                  onClick={() => setMode('upload')}
                  className={`px-4 py-3 font-medium border-b-2 transition-all ${
                    mode === 'upload'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="material-symbols-outlined inline mr-2">cloud_upload</span>
                  Subir Archivo
                </button>
                <button
                  onClick={() => setMode('form')}
                  className={`px-4 py-3 font-medium border-b-2 transition-all ${
                    mode === 'form'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="material-symbols-outlined inline mr-2">edit</span>
                  Completar Formulario
                </button>
              </div>

            {/* UPLOAD MODE */}
              {mode === 'upload' && (
                <div className="space-y-6">
                  {/* Datos del Estudiante - para nuevo estudiante */}
                  {!selectedStudent && (
                    <FormSection
                      title="Datos del Estudiante"
                      description="Completa información del nuevo estudiante"
                      icon="person"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Nombre del Estudiante"
                          name="nombreEstudiante"
                          placeholder="Nombre completo"
                          value={formData.nombreEstudiante}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="RUT"
                          name="rut"
                          placeholder="XX.XXX.XXX-X"
                          value={formData.rut}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="Nivel Educativo"
                          name="nivel"
                          placeholder="Ej: 3° Básico"
                          value={formData.nivel}
                          onChange={handleInputChange}
                        />
                        <Input
                          label="Necesidad Educativa Especial (NEE)"
                          name="nee"
                          placeholder="Ej: Dislexia"
                          value={formData.nee}
                          onChange={handleInputChange}
                        />
                      </div>
                    </FormSection>
                  )}

                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Sube un PACI ya completado en formato PDF o DOCX
                    </p>
                    <FileUpload
                      accept=".pdf,.docx,.doc"
                      maxSize={15 * 1024 * 1024}
                      onChange={handleFileUpload}
                      label="Selecciona archivo PACI"
                      description="Arrastra tu archivo aquí o haz clic"
                    />
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Archivos cargados ({uploadedFiles.length})
                      </p>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-200">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-primary-600">
                                {file.name.endsWith('.pdf') ? 'picture_as_pdf' : 'description'}
                              </span>
                              <div>
                                <p className="font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                              </div>
                            </div>
                            <Badge variant="success">Cargado</Badge>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-3">
                        <Button
                          variant="primary"
                          className="flex-1"
                          loading={isSavingFile}
                        >
                          Guardar Archivo PACI
                        </Button>
                        <Button variant="secondary" className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* FORM MODE */}
              {mode === 'form' && (
                <form onSubmit={handleSaveForm} className="space-y-6">
                  {/* Datos del Estudiante - para nuevo estudiante */}
                  {!selectedStudent && (
                    <FormSection
                      title="Datos del Estudiante"
                      description="Completa información del nuevo estudiante"
                      icon="person"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Nombre del Estudiante"
                          name="nombreEstudiante"
                          placeholder="Nombre completo"
                          value={formData.nombreEstudiante}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="RUT"
                          name="rut"
                          placeholder="XX.XXX.XXX-X"
                          value={formData.rut}
                          onChange={handleInputChange}
                          required
                        />
                        <Input
                          label="Nivel Educativo"
                          name="nivel"
                          placeholder="Ej: 3° Básico"
                          value={formData.nivel}
                          onChange={handleInputChange}
                        />
                        <Input
                          label="Necesidad Educativa Especial (NEE)"
                          name="nee"
                          placeholder="Ej: Dislexia"
                          value={formData.nee}
                          onChange={handleInputChange}
                        />
                      </div>
                    </FormSection>
                  )}
                  {/* Datos Generales del PACI */}
                  <FormSection
                    title="Información General del PACI"
                    description="Información del plan de adaptación"
                    icon="info"
                  >
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Fecha de Nacimiento"
                          name="fechaNacimiento"
                          type="date"
                          value={formData.fechaNacimiento}
                          onChange={handleInputChange}
                        />
                        <Input
                          label="Docente Responsable"
                          name="docente"
                          value={formData.docente}
                          onChange={handleInputChange}
                        />
                        <Input
                          label="Institución Diagnóstica"
                          name="institucionDiagnostica"
                          placeholder="Centro de salud, clínica, etc."
                          value={formData.institucionDiagnostica}
                          onChange={handleInputChange}
                        />
                        <Input
                          label="Fecha de Inicio"
                          name="fechaInicio"
                          type="date"
                          value={formData.fechaInicio}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Sección de Especialistas */}
                      <div className="border-t pt-6">
                        <p className="text-sm font-semibold text-gray-900 mb-3">Profesionales Responsables</p>
                        <p className="text-xs text-gray-600 mb-4">Agrega psicopedagogos, fonoaudiólogos, educadores diferenciales, etc. (sin incluir al docente)</p>
                        
                        {/* Inputs para agregar especialista */}
                        <div className="flex gap-2 mb-4">
                          <Input
                            label=""
                            name="especialistaNombre"
                            placeholder="Nombre del profesional"
                            value={formData.especialistaNombre}
                            onChange={handleInputChange}
                            className="flex-1"
                          />
                          <Input
                            label=""
                            name="especialistaCargo"
                            placeholder="Cargo (ej: Psicopedagoga)"
                            value={formData.especialistaCargo}
                            onChange={handleInputChange}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleAddSpecialist}
                            className="mt-0 h-10"
                            disabled={!formData.especialistaNombre.trim() || !formData.especialistaCargo.trim()}
                          >
                            <span className="material-symbols-outlined">add</span>
                          </Button>
                        </div>

                        {/* Lista de especialistas agregados */}
                        {formData.especialistas.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-600 uppercase">Profesionales agregados ({formData.especialistas.length})</p>
                            {formData.especialistas.map((specialist, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-200"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="material-symbols-outlined text-primary-600 text-sm">person</span>
                                  <div>
                                    <p className="font-medium text-gray-900">{specialist.nombre}</p>
                                    <p className="text-xs text-gray-600">{specialist.cargo}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveSpecialist(idx)}
                                  className="p-1 text-gray-400 hover:text-error hover:bg-error/10 rounded transition-colors"
                                >
                                  <span className="material-symbols-outlined text-lg">close</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <Input
                          label="Fecha de Término"
                          name="fechaTermino"
                          type="date"
                          value={formData.fechaTermino}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </FormSection>

                  {/* Diagnóstico */}
                  <FormSection
                    title="Diagnóstico"
                    description="Información diagnóstica del estudiante"
                    icon="assessment"
                  >
                    <div className="space-y-4">
                      <TextArea
                        label="Diagnóstico"
                        name="diagnostico"
                        value={formData.diagnostico}
                        onChange={(value) => setFormData({ ...formData, diagnostico: value })}
                        placeholder="Describe el diagnóstico del estudiante..."
                        rows={5}
                        required
                        helper="Información de la evaluación diagnóstica realizada"
                      />
                    </div>
                  </FormSection>

                  {/* Fortalezas y Dificultades */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSection
                      title="Fortalezas"
                      description="Capacidades y fortalezas"
                      icon="thumb_up"
                    >
                      <TextArea
                        name="fortalezas"
                        value={formData.fortalezas}
                        onChange={(value) => setFormData({ ...formData, fortalezas: value })}
                        placeholder="Describe las fortalezas del estudiante..."
                        rows={4}
                        required
                      />
                    </FormSection>

                    <FormSection
                      title="Dificultades"
                      description="Necesidades de apoyo"
                      icon="thumb_down"
                    >
                      <TextArea
                        name="dificultades"
                        value={formData.dificultades}
                        onChange={(value) => setFormData({ ...formData, dificultades: value })}
                        placeholder="Describe las dificultades del estudiante..."
                        rows={4}
                        required
                      />
                    </FormSection>
                  </div>

                  {/* Adaptaciones */}
                  <FormSection
                    title="Adaptaciones Curriculares"
                    description="Especifica las adaptaciones en cada aspecto"
                    icon="tune"
                  >
                    <div className="space-y-4">
                      <TextArea
                        label="Adaptaciones en Objetivos"
                        name="adaptacionesObjetivos"
                        value={formData.adaptacionesObjetivos}
                        onChange={(value) => setFormData({ ...formData, adaptacionesObjetivos: value })}
                        placeholder="Objetivos adaptados..."
                        rows={3}
                      />
                      <TextArea
                        label="Adaptaciones en Contenidos"
                        name="adaptacionesContenidos"
                        value={formData.adaptacionesContenidos}
                        onChange={(value) => setFormData({ ...formData, adaptacionesContenidos: value })}
                        placeholder="Contenidos modificados..."
                        rows={3}
                      />
                      <TextArea
                        label="Adaptaciones en Metodología"
                        name="adaptacionesMetodologia"
                        value={formData.adaptacionesMetodologia}
                        onChange={(value) => setFormData({ ...formData, adaptacionesMetodologia: value })}
                        placeholder="Estrategias y metodologías..."
                        rows={3}
                      />
                      <TextArea
                        label="Adaptaciones en Evaluación"
                        name="adaptacionesEvaluacion"
                        value={formData.adaptacionesEvaluacion}
                        onChange={(value) => setFormData({ ...formData, adaptacionesEvaluacion: value })}
                        placeholder="Criterios y procedimientos de evaluación adaptados..."
                        rows={3}
                      />
                    </div>
                  </FormSection>

                  {/* Recursos */}
                  <FormSection
                    title="Recursos Necesarios"
                    description="Especifica los recursos requeridos"
                    icon="build"
                  >
                    <div className="space-y-4">
                      <TextArea
                        label="Recursos Materiales"
                        name="recursosMateria"
                        value={formData.recursosMateria}
                        onChange={(value) => setFormData({ ...formData, recursosMateria: value })}
                        placeholder="Materiales, tecnología, etc."
                        rows={3}
                      />
                      <TextArea
                        label="Recursos Humanos"
                        name="recursosHumanos"
                        value={formData.recursosHumanos}
                        onChange={(value) => setFormData({ ...formData, recursosHumanos: value })}
                        placeholder="Personal, especialistas, asistentes..."
                        rows={3}
                      />
                      <TextArea
                        label="Apoyos Especializados"
                        name="recursosEspecializados"
                        value={formData.recursosEspecializados}
                        onChange={(value) => setFormData({ ...formData, recursosEspecializados: value })}
                        placeholder="Terapias, programas especiales..."
                        rows={3}
                      />
                    </div>
                  </FormSection>

                  {/* Evaluación y Seguimiento */}
                  <FormSection
                    title="Evaluación y Seguimiento"
                    description="Criterios de evaluación y proyecciones"
                    icon="check_circle"
                  >
                    <div className="space-y-4">
                      <TextArea
                        label="Criterios de Evaluación"
                        name="criteriosEvaluacion"
                        value={formData.criteriosEvaluacion}
                        onChange={(value) => setFormData({ ...formData, criteriosEvaluacion: value })}
                        placeholder="Cómo se evaluará el progreso..."
                        rows={3}
                      />
                      <TextArea
                        label="Plan de Seguimiento"
                        name="seguimiento"
                        value={formData.seguimiento}
                        onChange={(value) => setFormData({ ...formData, seguimiento: value })}
                        placeholder="Periodicidad y responsables del seguimiento..."
                        rows={3}
                      />
                      <TextArea
                        label="Proyecciones"
                        name="proyecciones"
                        value={formData.proyecciones}
                        onChange={(value) => setFormData({ ...formData, proyecciones: value })}
                        placeholder="Expectativas y metas futuras..."
                        rows={3}
                      />
                    </div>
                  </FormSection>

                  {/* Observaciones */}
                  <FormSection
                    title="Observaciones Adicionales"
                    description="Notas importantes sobre el PACI"
                    icon="comment"
                  >
                    <TextArea
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={(value) => setFormData({ ...formData, observaciones: value })}
                      placeholder="Observaciones relevantes..."
                      rows={4}
                    />
                  </FormSection>

                  {/* Botones de Acción */}
                  <div className="flex gap-3 pt-6 border-t">
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1"
                      loading={isSaving}
                    >
                      <span className="material-symbols-outlined inline mr-2">save</span>
                      Guardar PACI
                    </Button>
                    <Button type="button" variant="secondary" className="flex-1">
                      <span className="material-symbols-outlined inline mr-2">download</span>
                      Descargar PDF
                    </Button>
                  </div>
                </form>
              )}
            </Card>
        )}
      </div>
    </MainContainer>
  );
};

export default PACIPage;
