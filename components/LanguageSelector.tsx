
import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  onSelectLanguage: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-amber-300 drop-shadow-lg">The 34-Year Itch</h1>
        <p className="mt-4 text-lg text-gray-300">An AI-powered interactive romantic comedy.</p>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Choose your language:</h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onSelectLanguage(Language.ENGLISH)}
              className="px-8 py-4 bg-amber-600 text-white font-bold rounded-lg shadow-lg hover:bg-amber-700 transition-transform transform hover:scale-105"
            >
              English
            </button>
            <button
              onClick={() => onSelectLanguage(Language.MYANMAR)}
              className="px-8 py-4 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
            >
              Myanmar (မြန်မာ)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
