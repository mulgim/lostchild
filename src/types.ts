/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabType = 'main' | 'character' | 'setting' | 'secret';

export interface CharacterProfile {
  name: string;
  jpName?: string;
  age: number;
  height: number;
  birthday: string; // "04-17"
  bloodType: string;
  likes: string[];
  dislikes: string[];
  tagline: string;
  description: string;
  personality: string;
  cvName: string;
}

export interface VoiceQuote {
  id: string;
  title: string;
  text: string;
  meaning: string;
  toneFrequency: number; // For synth pitch
  duration: number; // ms
}

export interface LoreCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  clue?: string;
}

// Visual Novel Script Types
export interface DialogueChoice {
  text: string;
  nextId: string;
  affectionBonus: number;
  reactionText?: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  expression?: 'normal' | 'happy' | 'bashful' | 'clumsy' | 'surprised' | 'serious';
  bg?: 'sunset_room' | 'night_room' | 'music_hall' | 'corridor';
  musicCue?: 'calm' | 'melancholic' | 'climax' | 'silence';
  choices?: DialogueChoice[];
  nextId?: string; // If no choices, auto redirect to this
  isEnding?: boolean;
  endingType?: 'happy' | 'normal' | 'bad';
  endingTitle?: string;
  endingDescription?: string;
}

export interface GameSaveState {
  currentSceneId: string;
  affectionPoints: number;
  history: string[]; // List of traversed IDs
  unlockedEndings: string[]; // List of unlocked endings
  nameInput: string;
}
