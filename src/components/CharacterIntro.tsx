/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SEOA_PROFILE } from '../data/characterData';
import { Compass, Heart, EyeOff } from 'lucide-react';

interface CharacterIntroProps {
  affectionPoints: number;
  onAdjustAffection: (amount: number) => void;
}

export default function CharacterIntro({ affectionPoints, onAdjustAffection }: CharacterIntroProps) {
  return (
    <div id="character-intro-container" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 py-4">
      
      {/* LEFT COLUMN: Character Portrait (5 cols) */}
      <div id="portrait-col" className="lg:col-span-5 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative group overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f12] shadow-2xl w-full max-w-sm aspect-[3/4]"
        >
          {/* Main Visual */}
          <img
            id="seoa-portrait-img"
            src="https://github.com/mulgim/lostchild/blob/main/src/assets/images/portrait_1780419505846.png"
            alt="아리아 포트레이트"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
          />
          
          {/* Sunset glow overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/20 pointer-events-none" />
        </motion.div>
      </div>

      {/* RIGHT COLUMN: Character Details & Voice (7 cols) */}
      <div id="details-col" className="lg:col-span-7 flex flex-col justify-start">
        
        {/* Name and Tagline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#f4f1ea] to-[#c9a050]">{SEOA_PROFILE.name}</h2>
          </div>
          <p className="font-serif italic text-[#c9a050]/80 text-base md:text-lg mt-2 tracking-wide font-medium">
            {SEOA_PROFILE.tagline}
          </p>
        </motion.div>

        {/* Bio Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs"
        >
          <div className="bg-[#121215]/60 border border-white/5 p-3 rounded-xl flex flex-col">
            <span className="text-white/40">나이</span>
            <span className="text-[#f4f1ea] font-bold mt-1 text-sm">{SEOA_PROFILE.age}세</span>
          </div>
          <div className="bg-[#121215]/60 border border-white/5 p-3 rounded-xl flex flex-col">
            <span className="text-white/40">신장 (키)</span>
            <span className="text-[#f4f1ea] font-bold mt-1 text-sm">{SEOA_PROFILE.height}cm</span>
          </div>
        </motion.div>

        {/* Bio Sections (3개 분할: 현재 상황, 성격, 시각장애) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="mt-6 space-y-4"
        >
          {/* Section 1: 소녀의 현재 상황 */}
          <div className="bg-[#121215]/40 border border-white/5 p-4 rounded-xl flex gap-3.5 items-start">
            <div className="p-2 rounded-lg bg-[#c9a050]/15 text-[#c9a050] shrink-0 mt-0.5 animate-pulse">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#f4f1ea] text-sm mb-1.5">소녀의 현재 상황</h4>
              <p className="font-serif leading-relaxed text-xs text-[#f4f1ea]/80 text-justify">
                한때 당신의 가게에 홀로 남겨졌던 소녀입니다.
                지금은 당신의 집에서 함께 살며, 카페에 놓여 있는 그랜드 피아노로 재즈를 연주하며 편안함을 느끼고 있습니다.
              </p>
            </div>
          </div>

          {/* Section 2: 소녀의 성격 */}
          <div className="bg-[#121215]/40 border border-white/5 p-4 rounded-xl flex gap-3.5 items-start">
            <div className="p-2 rounded-lg bg-pink-500/15 text-pink-400 shrink-0 mt-0.5">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#f4f1ea] text-sm mb-1.5">소녀의 성격</h4>
              <p className="font-serif leading-relaxed text-xs text-[#f4f1ea]/80 text-justify">
                {SEOA_PROFILE.personality}
              </p>
            </div>
          </div>

          {/* Section 3: 시각장애 */}
          <div className="bg-[#121215]/40 border border-white/5 p-4 rounded-xl flex gap-3.5 items-start">
            <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 shrink-0 mt-0.5">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#f4f1ea] text-sm mb-1.5">시각장애</h4>
              <p className="font-serif leading-relaxed text-xs text-[#f4f1ea]/80 text-justify">
                엄청나게 심각한 고도 근시(시각장애)를 앓고 있어 몇십 센티미터 앞까지만 물체를 간신히 구별하며, 그 이상 거리는 온통 뿌연 수채화처럼 흘러 보입니다. 어째서인지 점장인 당신만큼은 얼마나 떨어져 있어도 형체만으로 구분할 수 있는 것 같습니다.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
