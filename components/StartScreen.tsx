import React, { useRef } from 'react';

interface StartScreenProps {
  onStartGame: () => void;
  onLoadGame: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, onLoadGame }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-amber-300 drop-shadow-lg">The 34-Year Itch</h1>
        <p className="mt-4 text-lg text-gray-300">An AI-powered interactive romantic comedy.</p>
        <div className="mt-12">
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartGame}
              className="px-8 py-4 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105"
            >
              ဂိမ်းအသစ်စတင်ပါ (မြန်မာ)
            </button>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <button
              onClick={handleLoadClick}
              className="px-8 py-4 bg-gray-700 text-amber-200 font-bold rounded-lg shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
            >
              Save ဖိုင်ဖြင့်ပြန်ကစားရန်
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onLoadGame}
              className="hidden"
              accept=".json"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
