"use client";
import React, { useState } from 'react';
import { ChevronDownIcon, CheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface Props {
  value: string;
  onChange: (lang: string) => void;
}

const LANGUAGES: { code: string; label: string; nativeName?: string }[] = [
  { code: 'auto', label: 'Auto-detect', nativeName: 'Auto-detect' },
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية' },
  { code: 'zh', label: 'Chinese', nativeName: '中文' },
  { code: 'fr', label: 'French', nativeName: 'Français' },
  { code: 'de', label: 'German', nativeName: 'Deutsch' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'it', label: 'Italian', nativeName: 'Italiano' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語' },
  { code: 'ko', label: 'Korean', nativeName: '한국어' },
  { code: 'pt', label: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', label: 'Russian', nativeName: 'Русский' },
  { code: 'es', label: 'Spanish', nativeName: 'Español' },
];

export default function LanguageSelect({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLanguage = LANGUAGES.find(lang => lang.code === value) || LANGUAGES[0];

  return (
    <div className="relative w-full">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-6 py-4 glass-button rounded-xl border border-slate-700/50 text-left transition-all duration-300 hover:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mr-4 border border-violet-500/30 group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-all duration-300">
              <GlobeAltIcon className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <span className="block font-semibold text-slate-200 text-lg">{selectedLanguage.label}</span>
              {value !== 'auto' && selectedLanguage.nativeName !== selectedLanguage.label && (
                <span className="block text-sm text-slate-400 mt-0.5">{selectedLanguage.nativeName}</span>
              )}
            </div>
          </div>
          <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-all duration-300 group-hover:text-violet-400 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute z-20 w-full mt-2 glass-card rounded-xl border border-slate-700/50 shadow-2xl max-h-80 overflow-auto scrollbar-thin">
              <div className="py-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className={`w-full flex items-center px-6 py-3 hover:bg-slate-800/50 transition-all duration-200 ${
                      lang.code === value ? 'bg-violet-500/10 border-l-2 border-violet-500' : ''
                    }`}
                    onClick={() => {
                      onChange(lang.code);
                      setIsOpen(false);
                    }}
                  >
                    <div className="w-6 mr-4 flex justify-center">
                      {lang.code === value && (
                        <CheckIcon className="w-5 h-5 text-violet-400" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <span className={`font-medium ${
                        lang.code === value ? 'text-violet-300' : 'text-slate-200'
                      }`}>
                        {lang.label}
                      </span>
                      {lang.nativeName !== lang.label && (
                        <span className={`block text-sm ${
                          lang.code === value ? 'text-violet-400' : 'text-slate-400'
                        }`}>
                          {lang.nativeName}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 