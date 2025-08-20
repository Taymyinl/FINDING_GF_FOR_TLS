import React, { useState, useCallback } from 'react';
import { Language, GameStatus, Scene, Content, SaveData } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import { geminiService } from './services/geminiService';
import { getInitialPrompt } from './constants';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.START_SCREEN);
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Content[]>([]);

  const handleStartGame = useCallback(async () => {
    setGameStatus(GameStatus.PLAYING);
    setIsLoading(true);
    setError(null);
    setChatHistory([]);

    try {
      const initialPrompt = getInitialPrompt();
      const initialScene = await geminiService.getNextScene([], initialPrompt);
      setCurrentScene(initialScene);

      const newHistory: Content[] = [
        { role: 'user', parts: [{ text: initialPrompt }] },
        { role: 'model', parts: [{ text: JSON.stringify(initialScene) }] }
      ];
      setChatHistory(newHistory);
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
      const userPrompt = `The player chose: "${choiceText}". Continue the story.`;
      const nextScene = await geminiService.getNextScene(chatHistory, userPrompt);
      setCurrentScene(nextScene);

      const newHistory: Content[] = [
        ...chatHistory,
        { role: 'user', parts: [{ text: userPrompt }] },
        { role: 'model', parts: [{ text: JSON.stringify(nextScene) }] }
      ];
      setChatHistory(newHistory);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setGameStatus(GameStatus.ERROR);
    } finally {
      setIsLoading(false);
    }
  }, [chatHistory]);

  const handleSaveGame = useCallback(() => {
    if (!currentScene) {
      setError("Cannot save game: no active game state.");
      return;
    }
    const saveData: SaveData = {
      language: Language.MYANMAR,
      currentScene: currentScene,
      history: chatHistory,
    };

    const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'the-34-year-itch-save.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentScene, chatHistory]);

  const handleLoadGame = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const saveData = JSON.parse(text) as SaveData;
        
        // Basic validation
        if (!saveData.language || !saveData.currentScene || !saveData.history) {
          throw new Error("Invalid save file format.");
        }

        setCurrentScene(saveData.currentScene);
        setChatHistory(saveData.history);
        setGameStatus(GameStatus.PLAYING);
        setError(null);

      } catch (err: any) {
        setError(`Failed to load save file: ${err.message}`);
      }
    };
    reader.onerror = () => {
        setError(`Failed to read file: ${reader.error}`);
    }
    reader.readAsText(file);
    // Reset file input value to allow loading the same file again
    event.target.value = '';
  };
  
  const resetGame = () => {
    setGameStatus(GameStatus.START_SCREEN);
    setCurrentScene(null);
    setError(null);
    setIsLoading(false);
    setChatHistory([]);
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

  if (gameStatus === GameStatus.START_SCREEN) {
    return <StartScreen onStartGame={handleStartGame} onLoadGame={handleLoadGame} />;
  }

  return (
    <GameScreen
      scene={currentScene}
      isLoading={isLoading}
      onMakeChoice={handleMakeChoice}
      onSaveGame={handleSaveGame}
    />
  );
};

export default App;