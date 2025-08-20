
import React, { useState, useCallback, useEffect } from 'react';
import { Language, GameStatus, Scene } from './types';
import LanguageSelector from './components/LanguageSelector';
import GameScreen from './components/GameScreen';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.LANGUAGE_SELECT);
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleStartGame = useCallback(async (language: Language) => {
    setSelectedLanguage(language);
    setGameStatus(GameStatus.PLAYING);
    setIsLoading(true);
    setError(null);
    try {
      const initialScene = await geminiService.startNewGame(language);
      setCurrentScene(initialScene);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setGameStatus(GameStatus.ERROR);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMakeChoice = useCallback(async (choiceText: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const nextScene = await geminiService.sendPlayerChoice(choiceText);
      setCurrentScene(nextScene);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const resetGame = () => {
    setGameStatus(GameStatus.LANGUAGE_SELECT);
    setCurrentScene(null);
    setError(null);
    setIsLoading(false);
    setSelectedLanguage(null);
  };

  if (gameStatus === GameStatus.ERROR) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl text-red-500 font-bold">An Error Occurred</h2>
        <p className="mt-4 text-gray-300 max-w-md">{error}</p>
        <button
          onClick={resetGame}
          className="mt-8 px-6 py-2 bg-amber-600 text-white font-bold rounded-lg shadow-lg hover:bg-amber-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (gameStatus === GameStatus.LANGUAGE_SELECT) {
    return <LanguageSelector onSelectLanguage={handleStartGame} />;
  }

  return (
    <GameScreen
      scene={currentScene}
      isLoading={isLoading}
      onMakeChoice={handleMakeChoice}
    />
  );
};

export default App;
