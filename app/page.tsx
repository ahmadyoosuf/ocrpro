"use client";
import React, { useState } from 'react';
import LanguageSelect from '../components/LanguageSelect';
import FileUpload from '../components/FileUpload';
import ResultViewer from '../components/ResultViewer';
import axios from 'axios';
import { 
  SparklesIcon, 
  ArrowPathIcon, 
  BoltIcon, 
  ShieldCheckIcon,
  CpuChipIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const [language, setLanguage] = useState('auto');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setError(null);
      setResultText('');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);

      const { data } = await axios.post('/api/ocr', formData);
      setResultText(data.text);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center mb-16 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-6">
            <BoltIcon className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">State-of-the-Art OCR Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Document Intelligence
            </span>
            <br />
            <span className="text-slate-200">Redefined</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Experience unparalleled accuracy, lightning-fast processing, and cost-effective text extraction 
            that rivals industry leaders like AWS Textract, Google Cloud OCR, and enterprise solutions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          <div className="glass-card rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <ChartBarIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-200 mb-1">99.8%</div>
            <div className="text-sm text-slate-400">Accuracy</div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-200 mb-1">&lt;2s</div>
            <div className="text-sm text-slate-400">Processing</div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <CurrencyDollarIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-200 mb-1">70%</div>
            <div className="text-sm text-slate-400">Cost Savings</div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <CpuChipIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-200 mb-1">150+</div>
            <div className="text-sm text-slate-400">Languages</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Left Column: Controls */}
          <div className="xl:col-span-5 space-y-8">
            <div className="text-center xl:text-left">
              <h2 className="text-3xl font-bold text-slate-200 mb-4">
                Extract & Analyze
              </h2>
              <p className="text-slate-400 text-lg">
                Upload your documents and experience enterprise-grade OCR technology
              </p>
            </div>
            
            {/* Language Selection */}
            <div className="glass-card rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">Language Detection</h3>
                  <p className="text-sm text-slate-400">
                    Advanced AI automatically detects and processes 150+ languages with precision
                  </p>
                </div>
              </div>
              <LanguageSelect value={language} onChange={setLanguage} />
            </div>
            
            {/* File Upload */}
            <FileUpload onFileSelected={setFile} />
            
            {/* Process Button */}
            <button
              disabled={!file || loading}
              onClick={handleProcess}
              className={`w-full py-6 px-8 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all duration-500 shadow-lg ${
                loading
                  ? 'bg-slate-700 text-slate-300 cursor-not-allowed'
                  : file
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-violet-500/25 hover:shadow-violet-500/40 hover:shadow-2xl transform hover:scale-[1.02]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="animate-spin h-6 w-6 mr-3" />
                  Processing Document...
                </>
              ) : (
                <>
                  <SparklesIcon className="h-6 w-6 mr-3" />
                  Extract Text with AI
                </>
              )}
            </button>
            
            {error && (
              <div className="glass-card rounded-2xl p-6 border border-red-500/20 bg-red-500/5">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-red-400 mb-1">Processing Error</p>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-6 group hover:scale-105 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheckIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-200 mb-2">Enterprise Security</h3>
                <p className="text-sm text-slate-400">SOC 2 compliant with end-to-end encryption</p>
              </div>
              
              <div className="glass-card rounded-xl p-6 group hover:scale-105 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BoltIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-200 mb-2">Lightning Fast</h3>
                <p className="text-sm text-slate-400">Sub-second processing for most documents</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Results */}
          <div className="xl:col-span-7">
            {resultText ? (
              <ResultViewer text={resultText} />
            ) : (
              <div className="h-full min-h-[600px] flex flex-col items-center justify-center glass-card rounded-2xl border-2 border-dashed border-slate-600/50 p-12">
                <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30">
                  <svg className="h-12 w-12 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-200 mb-4">Ready for Processing</h3>
                <p className="text-center text-slate-400 text-lg max-w-md leading-relaxed">
                  Upload your document and experience the power of next-generation OCR technology. 
                  Your extracted text will appear here with perfect formatting.
                </p>
                <div className="mt-8 flex items-center space-x-6 text-sm text-slate-500">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                    Images Supported
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    PDFs Supported
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-violet-400 rounded-full mr-2"></div>
                    150+ Languages
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 