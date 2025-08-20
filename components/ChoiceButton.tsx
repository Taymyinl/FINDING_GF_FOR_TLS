
import React from 'react';
import { Choice } from '../types';

interface ChoiceButtonProps {
  choice: Choice;
  onClick: (choiceText: string) => void;
  disabled: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onClick, disabled }) => {
  return (
    <button
      onClick={() => onClick(choice.text)}
      disabled={disabled}
      className="w-full text-left p-4 bg-gray-800/80 border border-amber-500/50 rounded-lg shadow-lg hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75"
    >
      <p className="font-bold text-amber-300">[{choice.style}]</p>
      <p className="text-white mt-1">{choice.text}</p>
    </button>
  );
};

export default ChoiceButton;
