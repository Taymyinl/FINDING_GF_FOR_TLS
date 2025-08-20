import React from 'react';
import { Scene, DialogueLine } from '../types';
import ChoiceButton from './ChoiceButton';
import LoadingSpinner from './LoadingSpinner';

interface GameScreenProps {
  scene: Scene | null;
  isLoading: boolean;
  onMakeChoice: (choiceText: string) => void;
  onSaveGame: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ scene, isLoading, onMakeChoice, onSaveGame }) => {
  const backgroundImageUrl = scene 
    ? `https://picsum.photos/seed/${encodeURIComponent(scene.sceneImagePrompt)}/1920/1080`
    : 'https://picsum.photos/1920/1080';

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col justify-end transition-all duration-1000"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={onSaveGame}
          className="px-4 py-2 bg-gray-800/80 border border-amber-500/50 rounded-lg shadow-lg text-amber-200 font-semibold hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300"
          aria-label="Save Game"
        >
          Save Game
        </button>
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
        <div className="bg-gray-900/80 p-6 rounded-xl shadow-2xl border border-gray-700">
          {isLoading && !scene ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : scene ? (
            <>
              <div className="prose prose-invert max-w-none prose-p:text-gray-200 prose-p:text-lg">
                <p>{scene.narrator}</p>
                {scene.dialogue.map((line: DialogueLine, index: number) => (
                  <p key={index}>
                    <strong className="text-teal-300">{line.character}:</strong> "{line.line}"
                  </p>
                ))}
                {scene.internalMonologue && (
                  <p className="mt-4 italic text-amber-200 border-l-4 border-amber-400/50 pl-4">
                    {scene.internalMonologue}
                  </p>
                )}
              </div>
              <div className="mt-8">
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                     <LoadingSpinner />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scene.choices.map((choice, index) => (
                      <ChoiceButton
                        key={index}
                        choice={choice}
                        onClick={onMakeChoice}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <p>Ready to start the story.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
