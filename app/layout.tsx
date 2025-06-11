import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import React from 'react';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VisionText Pro | Enterprise OCR Intelligence',
  description: 'State-of-the-art document intelligence platform. Extract text from images and PDFs with unmatched accuracy, speed, and cost efficiency.',
  keywords: 'OCR, document intelligence, text extraction, enterprise OCR, document scanner, AI text recognition',
  icons: {
    icon: '/ocr.ico',
    shortcut: '/ocr.ico',
    apple: '/ocr.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.05),transparent_50%)]" />
        
        {/* Floating orbs */}
        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <header className="relative z-10 w-full py-8 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 shadow-2xl overflow-hidden">
                    <img 
                      src="/ocr.png" 
                      alt="VisionText Pro Logo" 
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    VisionText Pro
                  </h1>
                  <p className="text-xs text-slate-400 font-medium tracking-wide">ENTERPRISE OCR</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-300 font-medium">Enterprise Ready</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20">{children}</main>
        
        <footer className="relative z-10 mt-32 py-12 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-slate-400 text-sm">
                  Powered by state-of-the-art AI • Enterprise-grade accuracy
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  © {new Date().getFullYear()} VisionText Pro. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-6 text-xs text-slate-500">
                <span>99.9% Uptime</span>
                <span>•</span>
                <span>SOC 2 Compliant</span>
                <span>•</span>
                <span>GDPR Ready</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
} 