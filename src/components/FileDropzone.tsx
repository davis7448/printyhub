'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps {
  onFileSelect: (file: File | null) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  placeholder?: string;
  error?: string;
}

export default function FileDropzone({
  onFileSelect,
  accept = {
    'application/pdf': ['.pdf'],
    'image/*': ['.png', '.jpg', '.jpeg', '.gif']
  },
  maxSize = 10 * 1024 * 1024, // 10MB
  placeholder = "Arrastra tu archivo aquí o haz clic para seleccionar",
  error
}: FileDropzoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false
  });

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors focus-ring ${
          isDragActive
            ? 'border-printy-military bg-printy-military/10'
            : error
            ? 'border-red-500 bg-red-50'
            : 'border-printy-stone hover:border-printy-military hover:bg-printy-smoke/50'
        }`}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div className="space-y-2">
            <div className="text-printy-military font-body-sm">
              Archivo seleccionado: {selectedFile.name}
            </div>
            <div className="text-printy-carbon font-body-sm">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        ) : (
          <div>
            <div className="text-printy-carbon font-body mb-2">
              {isDragActive ? 'Suelta el archivo aquí' : placeholder}
            </div>
            <div className="text-printy-carbon font-body-sm">
              PDF, PNG, JPG hasta 10MB
            </div>
          </div>
        )}
      </div>

      {selectedFile && (
        <button
          type="button"
          onClick={removeFile}
          className="text-printy-military font-body-sm hover:underline focus-ring"
        >
          Remover archivo
        </button>
      )}

      {error && (
        <p className="text-red-600 font-body-sm">{error}</p>
      )}
    </div>
  );
}