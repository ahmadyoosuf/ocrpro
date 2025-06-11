"use client";
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentArrowUpIcon, DocumentTextIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  onFileSelected: (file: File) => void;
}

export default function FileUpload({ onFileSelected }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'pdf' | 'image' | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        setFileName(file.name);
        onFileSelected(file);

        if (file.type.startsWith('image/')) {
          setFileType('image');
          const reader = new FileReader();
          reader.onloadend = () => {
            setFilePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
          setFileType('pdf');
          setFilePreview(null);
        }
      }
    },
    [onFileSelected]
  );

  const clearFile = () => {
    setFileName(null);
    setFilePreview(null);
    setFileType(null);
    onFileSelected(null as any);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'application/pdf': [] },
    maxFiles: 1,
  });

  return (
    <div className="relative">
      {fileName ? (
        <div className="relative glass-card rounded-2xl p-8 border border-slate-700/50 transition-all duration-500 hover:border-violet-500/30">
          <button
            onClick={clearFile}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all duration-300 border border-slate-700/50 hover:border-red-500/30"
            title="Remove file"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-6 w-full">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex-shrink-0">
              {fileType === 'pdf' ? (
                <DocumentTextIcon className="w-8 h-8 text-violet-400" />
              ) : (
                <PhotoIcon className="w-8 h-8 text-violet-400" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-slate-200 truncate mb-1">{fileName}</p>
              <p className="text-sm text-slate-400 mb-2">
                {fileType === 'pdf' ? 'PDF Document' : 'Image File'}
              </p>
              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  Ready for processing
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Enterprise grade
                </span>
              </div>
            </div>
          </div>
          
          {filePreview && (
            <div className="mt-6 w-full max-h-48 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/50">
              <img
                src={filePreview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`group relative flex flex-col items-center justify-center w-full h-64 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-500 ${
            isDragActive
              ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20 scale-[1.02]'
              : 'border-slate-600/50 bg-slate-900/20 hover:bg-slate-800/30 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10'
          }`}
        >
          <input {...getInputProps()} />
          
          {/* Animated background effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className={`relative w-20 h-20 mb-6 flex items-center justify-center rounded-2xl transition-all duration-500 ${
            isDragActive 
              ? 'bg-gradient-to-r from-violet-500 to-purple-500 scale-110' 
              : 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 group-hover:scale-110 group-hover:from-violet-500/30 group-hover:to-purple-500/30'
          }`}>
            <DocumentArrowUpIcon className={`w-10 h-10 transition-colors duration-300 ${
              isDragActive ? 'text-white' : 'text-violet-400'
            }`} />
          </div>
          
          <div className="text-center">
            <p className={`mb-3 text-xl font-semibold transition-colors duration-300 ${
              isDragActive ? 'text-violet-300' : 'text-slate-200'
            }`}>
              {isDragActive ? 'Drop your file here' : 'Drag & drop your document'}
            </p>
            <p className="text-slate-400 mb-4">
              or <span className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">browse files</span>
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
              <span className="flex items-center">
                <PhotoIcon className="w-4 h-4 mr-2" />
                Images
              </span>
              <span className="flex items-center">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                PDFs
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-violet-400 rounded-full mr-2"></div>
                Up to 10MB
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 