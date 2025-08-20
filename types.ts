
export enum Language {
  ENGLISH = 'English',
  MYANMAR = 'Myanmar (Burmese)',
}

export enum GameStatus {
  LANGUAGE_SELECT,
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
