/**
 * StudentSelector Component
 * Componente para seleccionar un estudiante del formulario PACI
 */

import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Spinner } from '../ui';

const StudentSelector = ({
  selectedStudent,
  onSelectStudent,
  students = [],
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nee?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Selected Student Display */}
      {selectedStudent ? (
        <Card variant="outlined">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{selectedStudent.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                NEE: <span className="font-medium">{selectedStudent.nee}</span>
              </p>
            </div>
            <button
              onClick={() => {
                onSelectStudent(null);
                setSearchTerm('');
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </Card>
      ) : (
        <>
          {/* Search Input */}
          <div className="relative">
            <Input
              label="Buscar Estudiante"
              type="text"
              placeholder="Escribe el nombre o NEE..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              icon="search"
            />
          </div>

          {/* Dropdown List */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-64 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <Spinner size="sm" />
                </div>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => {
                      onSelectStudent(student);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      NEE: {student.nee} • Actualizado: {student.lastUpdated}
                    </p>
                  </button>
                ))
              ) : searchTerm.length > 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No se encontraron estudiantes
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Empieza a escribir para buscar
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentSelector;
