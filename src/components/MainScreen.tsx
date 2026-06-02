/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Music, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import musicRoomBg from '../assets/images/music_room_bg_1780419528160.png';
import lostChildLogo from '../assets/images/lost_child_logo_1780421006964.png';

interface MainScreenProps {
  onNavigate: (tab: 'character' | 'setting' | 'secret') => void;
  bgmActive: boolean;
  onToggleBgm: () => void;
}

export default function MainScreen({ onNavigate, bgmActive, onToggleBgm }: MainScreenProps) {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; scale: number; speed: number }>>([]);

  // Generate falling cherry blossom petals / golden ambient glow particles
  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      delay: Math.random() * 8, // seconds
      scale: Math.random() * 0.6 + 0.4,
      speed: Math.random() * 5 + 7 // seconds duration
    }));
    setPetals(list);
  }, []);

  const handleStartClick = () => {
    audioSynth.playChime();
    onNavigate('character');
  };

  return (
    <div id="main-screen-container" className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f12]">
      {/* Background Image with warm overlay */}
      <div 
        id="main-bg-image"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105 transition-all duration-1000"
        style={{ backgroundImage: `url(${musicRoomBg})` }}
      />
      <div id="main-gradient-overlay" className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-[#0a0a0b]/90" />

      {/* Falling Petals / Amber Sparks (Framer Motion) */}
      <div id="petals-container" className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute top-[-20px] w-3 h-3 bg-[#c9a050]/20 rounded-full"
            style={{
              left: `${petal.left}%`,
              borderRadius: '100% 0% 100% 100%',
              boxShadow: '0 0 8px rgba(201, 160, 80, 0.2)',
            }}
            initial={{ translateY: '-10vh', translateX: 0, rotate: 0, opacity: 0 }}
            animate={{
              translateY: '110vh',
              translateX: [0, 50, -30, 20],
              rotate: [0, 180, 360],
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
              duration: petal.speed,
              repeat: Infinity,
              delay: petal.delay,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Content wrapper */}
      <div id="main-content-wrapper" className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl py-12">
        
        
        {/* Cinematic Title Logo */}
        <div id="main-title-block" className="space-y-2 select-none flex justify-center w-full max-w-lg md:max-w-2xl px-4">
          <motion.img
            src={lostChildLogo}
            alt="로스트 차일드 심포니아 로고"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-full h-auto drop-shadow-[0_0_35px_rgba(201,160,80,0.18)]"
          />
        </div>

        {/* Romance Quote */}
        <motion.p
          id="main-quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-6 font-serif italic text-[#f4f1ea]/80 text-sm sm:text-base leading-relaxed tracking-wide border-l-2 border-[#c9a050]/40 pl-4 py-1 max-w-xl animate-delicate-glow text-left"
        >
          “작은 재즈 카페, 길 잃은 소녀, 커피 향기.”
        </motion.p>



        {/* Navigation Buttons */}
        <motion.div
          id="main-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center"
        >
          {/* Main Action Call */}
          <button
            id="start-intro-btn"
            onClick={handleStartClick}
            className="group relative flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-56 overflow-hidden rounded-full font-serif font-bold text-[#0a0a0b] bg-gradient-to-r from-[#c9a050] to-[#eadcb4] hover:from-[#eadcb4] hover:to-[#f5edd9] shadow-[0_4px_20px_rgba(201,160,80,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="absolute inset-0 w-3 bg-white/20 skew-x-[-20deg] group-hover:left-full transition-all duration-1000 left-[-30px]" />
            <Play className="w-5 h-5 fill-[#0a0a0b]" />
            <span>소녀에 대해</span>
          </button>

          {/* Lore Navigation */}
          <button
            id="lore-nav-btn"
            onClick={() => { audioSynth.playChime(); onNavigate('setting'); }}
            className="flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-52 rounded-full border border-white/10 bg-[#0f0f12]/60 hover:bg-white/5 hover:border-[#c9a050]/40 text-[#f4f1ea]/70 hover:text-[#f4f1ea] font-medium transition-all duration-300 hover:scale-101 cursor-pointer"
          >
            <span>배경 설정</span>
          </button>
        </motion.div>

        {/* Ambient Volume Overlay Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8 flex items-center gap-2 text-[#f4f1ea]/40 text-xs font-mono"
        >
          <span className="flex items-center gap-1.5 bg-[#0f0f12]/60 px-3 py-1.5 rounded-md border border-white/5">
            {bgmActive ? (
              <>
                <Music className="w-3.5 h-3.5 text-[#c9a050] animate-bounce" />
                <span className="text-[#f4f1ea]/80">재생 중</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#f4f1ea]/40" />
                <span>BGM 꺼짐 (우측 상단 켜기 추천)</span>
              </>
            )}
          </span>
        </motion.div>

      </div>
    </div>
  );
}
