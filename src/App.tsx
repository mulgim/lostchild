/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Volume2, VolumeX, Menu, Heart, Compass, Sparkles, BookOpen, Key, Home, User } from 'lucide-react';
import { audioSynth } from './utils/audioSynth';
import { TabType } from './types';

// Import screens
import MainScreen from './components/MainScreen';
import CharacterIntro from './components/CharacterIntro';
import LoreScreen from './components/LoreScreen';
import SecretScreen from './components/SecretScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('main');
  const [affectionPoints, setAffectionPoints] = useState<number>(20); // starts at a neutral 20
  const [bgmActive, setBgmActive] = useState<boolean>(false);

  // Sync BGM state changes
  const handleToggleBgm = () => {
    if (bgmActive) {
      audioSynth.stopBGM();
      setBgmActive(false);
    } else {
      audioSynth.startBGM();
      setBgmActive(true);
    }
  };

  // Adjust affection points safely from subpanels (bound between 0 and 100)
  const handleAdjustAffection = (amount: number) => {
    setAffectionPoints((prev) => Math.min(100, Math.max(0, prev + amount)));
  };

  const handleSetAffection = (amount: number) => {
    setAffectionPoints(amount);
  };

  // Safe navigation with audio feedback
  const handleNavigate = (tab: TabType) => {
    audioSynth.playChime();
    setActiveTab(tab);
  };

  // Clean up BGM on unmount
  useEffect(() => {
    return () => {
      audioSynth.stopBGM();
    };
  }, []);

  return (
    <div id="game-promo-shell" className="min-h-screen bg-[#0a0a0b] text-[#f4f1ea] flex flex-col justify-between select-none relative pb-10">
      
      {/* 1. Header Navigation Bar */}
      <header id="game-navbar" className="sticky top-0 z-50 backdrop-blur-md bg-[#0f0f12]/90 border-b border-white/10 px-4 md:px-8 py-3.5 flex justify-between items-center transition-all">
        
        {/* Title / Logo */}
        <div 
          id="logo-brand"
          onClick={() => handleNavigate('main')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="space-y-0.5">
            <h1 className="font-serif text-sm md:text-base font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#c9a050] to-[#f4f1ea] group-hover:text-[#eadcb4] transition-colors">
              로스트 차일드 심포니아
            </h1>
            <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#c9a050]/60">Jazz Cafe & Echoes of Piano</p>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <nav id="navbar-links" className="hidden md:flex items-center gap-1.5 text-xs font-serif font-bold">
          <button
            onClick={() => handleNavigate('main')}
            className={`px-4 py-2 rounded-full cursor-pointer transition-all ${
              activeTab === 'main' 
              ? 'bg-[#c9a050]/15 text-[#c9a050] border border-[#c9a050]/40' 
              : 'text-white/60 hover:text-[#f4f1ea] hover:bg-white/5'
            }`}
          >
            메인 홈
          </button>
          <button
            onClick={() => handleNavigate('character')}
            className={`px-4 py-2 rounded-full cursor-pointer transition-all ${
              activeTab === 'character' 
              ? 'bg-[#c9a050]/15 text-[#c9a050] border border-[#c9a050]/40' 
              : 'text-white/60 hover:text-[#f4f1ea] hover:bg-white/5'
            }`}
          >
            소녀 소개
          </button>
          <button
            onClick={() => handleNavigate('setting')}
            className={`px-4 py-2 rounded-full cursor-pointer transition-all ${
              activeTab === 'setting' 
              ? 'bg-[#c9a050]/15 text-[#c9a050] border border-[#c9a050]/40' 
              : 'text-white/60 hover:text-[#f4f1ea] hover:bg-white/5'
            }`}
          >
            세계관 배경
          </button>
          <button
            onClick={() => handleNavigate('secret')}
            className={`px-4 py-2 rounded-full cursor-pointer transition-all flex items-center gap-1 ${
              activeTab === 'secret' 
              ? 'bg-[#c9a050]/15 text-[#c9a050] border border-[#c9a050]/40 shadow-[0_0_12px_rgba(201,160,80,0.15)]' 
              : 'text-white/60 hover:text-[#f4f1ea] hover:bg-white/5'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-[#c9a050]" />
            <span>비밀 일지</span>
          </button>
        </nav>

        {/* Interactive BGM and Affection Widgets */}
        <div id="navbar-widgets" className="flex items-center gap-3.5">
          {/* Synthesizer Ambient Toggle Controller */}
          <button
            id="bgm-player-toggle"
            onClick={handleToggleBgm}
            title={bgmActive ? "재즈 피아노 BGM 끄기" : "재즈 피아노 BGM 켜기"}
            className={`p-2.5 rounded-full border cursor-pointer transition-all ${
              bgmActive 
              ? 'bg-[#c9a050]/15 text-[#c9a050] border-[#c9a050] shadow-[0_0_12px_rgba(201,160,80,0.35)] animate-pulse' 
              : 'bg-[#121215] text-[#f4f1ea]/40 border-white/5 hover:border-[#c9a050]/30 hover:text-[#f4f1ea]'
            }`}
          >
            {bgmActive ? <Volume2 className="w-4 h-4 text-[#c9a050]" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Sticky Navigation Banner */}
      <div id="mobile-sticky-nav" className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-[#0f0f12]/90 backdrop-blur-md border border-white/10 p-2 rounded-2xl flex justify-around shadow-2xl">
        <button
          onClick={() => handleNavigate('main')}
          className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${activeTab === 'main' ? 'text-[#c9a050]' : 'text-[#f4f1ea]/40'}`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-serif mt-1 font-bold">홈</span>
        </button>
        <button
          onClick={() => handleNavigate('character')}
          className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${activeTab === 'character' ? 'text-[#c9a050]' : 'text-[#f4f1ea]/40'}`}
        >
          <User className="w-4 h-4" />
          <span className="text-[9px] font-serif mt-1 font-bold">소녀소개</span>
        </button>
        <button
          onClick={() => handleNavigate('setting')}
          className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${activeTab === 'setting' ? 'text-[#c9a050]' : 'text-[#f4f1ea]/40'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[9px] font-serif mt-1 font-bold">세계관</span>
        </button>
        <button
          onClick={() => handleNavigate('secret')}
          className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${activeTab === 'secret' ? 'text-[#c9a050]' : 'text-[#f4f1ea]/40'}`}
        >
          <Key className="w-4 h-4 text-[#c9a050] animate-bounce" />
          <span className="text-[9px] font-serif mt-1 font-bold">비밀일지</span>
        </button>
      </div>

      {/* 2. Primary Showcase Section */}
      <main id="primary-view-container" className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 my-6 md:my-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full"
          >
            {activeTab === 'main' && (
              <MainScreen 
                onNavigate={handleNavigate} 
                bgmActive={bgmActive}
                onToggleBgm={handleToggleBgm}
              />
            )}
            
            {activeTab === 'character' && (
              <CharacterIntro 
                affectionPoints={affectionPoints} 
                onAdjustAffection={handleAdjustAffection}
              />
            )}
            
            {activeTab === 'setting' && (
              <LoreScreen />
            )}
            
            {activeTab === 'secret' && (
              <SecretScreen 
                affectionPoints={affectionPoints}
                onAdjustAffection={handleAdjustAffection}
                onSetAffection={handleSetAffection}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Subtle Footer Accent */}
      <footer id="game-teaser-footer" className="text-center text-[#f4f1ea]/40 text-[10px] font-mono select-none px-6 mt-12 mb-16 md:mb-0">
        <p className="leading-relaxed">
          © 2026 Cafe Aria Durand Project. All Rights Reserved. Crafted for Jazz and Piano Lovers.
        </p>
      </footer>

    </div>
  );
}
