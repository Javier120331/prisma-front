/**
 * FileUpload Component
 * Componente para subir archivos con drag & drop
 */

import React, { useState, useRef } from 'react';
import Alert from './Alert';

const FileUpload = ({
  accept = '.pdf,.docx,.doc',
  maxSize = 10 * 1024 * 1024, // 10MB por defecto
  multiple = false,
  onChange = () => {},
  label = 'Subir archivo',
  description = 'Arrastra aquí o haz clic para seleccionar',
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateFiles = (fileList) => {
    setError(null);
    const newFiles = Array.from(fileList);
    const validFiles = [];

    newFiles.forEach((file) => {
      // Validar tipo de archivo
      const allowedTypes = accept.split(',').map(t => t.trim());
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.some(type => fileExtension.includes(type.replace('*', '')))) {
        setError(`Archivo "${file.name}" no permitido. Solo: ${accept}`);
        return;
      }

      // Validar tamaño
      if (file.size > maxSize) {
        setError(`Archivo "${file.name}" demasiado grande. Máximo: ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      onChange(updatedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const { files: droppedFiles } = e.dataTransfer;
    validateFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const { files: selectedFiles } = e.target;
    validateFiles(selectedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div className={className}>
      {/* Label */}
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-300
          ${isDragging 
            ? 'border-primary-500 bg-primary-50/50' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          <span className="material-symbols-outlined text-4xl text-gray-400">
            cloud_upload
          </span>
          <p className="text-sm font-medium text-gray-900">{description}</p>
          <p className="text-xs text-gray-500">
            Formatos permitidos: {accept}
          </p>
          <p className="text-xs text-gray-500">
            Tamaño máximo: {(maxSize / 1024 / 1024).toFixed(1)}MB
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="error" className="mt-3">
          {error}
        </Alert>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold text-gray-600 uppercase">
            Archivos ({files.length})
          </p>
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-2 flex-1">
                <span className="material-symbols-outlined text-gray-400">
                  {file.name.endsWith('.pdf') ? 'picture_as_pdf' : 'description'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-1 text-gray-400 hover:text-error hover:bg-error/10 rounded transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
