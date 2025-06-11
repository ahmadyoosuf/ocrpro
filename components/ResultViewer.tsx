"use client";
import React, { useState } from 'react';
import { ClipboardDocumentIcon, ArrowDownTrayIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Props {
  text: string;
}

export default function ResultViewer({ text }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = (format: 'txt' | 'md') => {
    if (!text) return;
    
    const fileExtension = format === 'txt' ? 'txt' : 'md';
    const fileName = `visiontext-extract-${new Date().toISOString().slice(0, 10)}.${fileExtension}`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!text) return null;

  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = text.length;

  return (
    <div className="glass-card rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Extracted Text</h2>
            <div className="flex items-center space-x-6 text-sm text-violet-100">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                {wordCount} words
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                {charCount} characters
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-violet-300 rounded-full mr-2"></div>
                Enterprise grade
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => downloadText('txt')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 border border-white/20 hover:border-white/30 hover:scale-105"
              title="Download as TXT"
            >
              <ArrowDownTrayIcon className="w-4 h-4" /> 
              TXT
            </button>
            
            <button
              onClick={() => downloadText('md')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 border border-white/20 hover:border-white/30 hover:scale-105"
              title="Download as Markdown"
            >
              <ArrowDownTrayIcon className="w-4 h-4" /> 
              MD
            </button>
            
            <button
              onClick={copyToClipboard}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 border hover:scale-105 ${
                copied 
                  ? 'bg-emerald-500 border-emerald-400 text-white' 
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 hover:border-white/30 text-white'
              }`}
              title="Copy to Clipboard"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4" /> 
                  Copied!
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="w-4 h-4" /> 
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
        <pre className="relative whitespace-pre-wrap p-8 max-h-96 overflow-auto text-sm text-slate-200 font-mono leading-relaxed scrollbar-thin bg-slate-950/50">
          {text}
        </pre>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-4 bg-slate-900/50 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Processed with VisionText Pro</span>
          <span>Enterprise OCR • 99.8% Accuracy</span>
        </div>
      </div>
    </div>
  );
} 