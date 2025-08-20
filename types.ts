export enum Language {
  ENGLISH = 'English',
  MYANMAR = 'Myanmar (Burmese)',
}

export enum GameStatus {
  START_SCREEN,
  PLAYING,
  ERROR,
}

export interface DialogueLine {
  character: string;
  line: string;
}

export interface Choice {
  style: string;
  text: string;
}

export interface Scene {
  sceneImagePrompt: string;
  narrator: string;
  internalMonologue?: string;
  dialogue: DialogueLine[];
  choices: Choice[];
}

// Content interface for Gemini chat history
export interface Content {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// SaveData interface for the save file structure
export interface SaveData {
  language: Language;
  currentScene: Scene;
  history: Content[];
}
