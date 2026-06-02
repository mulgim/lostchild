/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, ShieldAlert, Sparkles, BookOpen, Key, LogOut } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface SecretScreenProps {
  affectionPoints: number;
  onAdjustAffection: (amount: number) => void;
  onSetAffection: (amount: number) => void;
}

export default function SecretScreen({ affectionPoints }: SecretScreenProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Retrieve previous unlocked status from localStorage
  useEffect(() => {
    const unlocked = localStorage.getItem('aria_secret_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = password.trim();
    if (cleanInput === '아리아' || cleanInput.toLowerCase() === 'aria') {
      audioSynth.playChime();
      setIsUnlocked(true);
      setPasswordError(false);
      localStorage.setItem('aria_secret_unlocked', 'true');
    } else {
      audioSynth.playTone(180, 500); // Fail tone
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 500);
    }
  };

  const handleLockAgain = () => {
    audioSynth.playChime();
    setIsUnlocked(false);
    setPassword('');
    localStorage.removeItem('aria_secret_unlocked');
  };

  // Structured Tragic Secrets of Aria
  const secrets = [
    {
      id: "sec_2",
      title: "비극적인 유기 사유와 오랜 아동 방임",
      description: "아리아가 프랑스어마저 심할 정도로 서툴며 모국어 대신 점장님이 건네는 따뜻한 한국어 한 자 한 자를 뺨과 수줍은 온기로 배우던 이면에는 부모의 고의적인 아동 방임(Child Neglect)이 있었습니다. 올바른 언어나 정서 조율 한 줌조차 받지 못한 채 홀로 고립되어 있던 상처 입은 아이기 때문입니다.",
      subtitle: "The Tragedic Neglect"
    },
    {
      id: "sec_3",
      title: "선종하신 외할아버지와 그랜드 피아노",
      description: "어둠 같은 세상에 갇혀 지내던 아리아에게 무구한 사랑과 피아노 건반의 즐거움을 전해주며 유일하게 구원해 주던 등불은 그녀의 외할아버지였습니다. 할아버지가 노환으로 선종하자마자, 비정한 친부모는 복잡해진 부양의 굴레를 끊으려 타지(한국)의 우아하고 한적한 쇼핑몰 한편에 아리아를 몰래 버리고 떠났습니다.",
      subtitle: "The Departed Sanctuary"
    }
  ];

  return (
    <div id="secret-screen-outer" className="w-full min-h-[75vh] flex flex-col items-center justify-center py-2 px-4">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          /* 1. PASSWORD GATE (LOCKED) */
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-[#0f0f12] border border-white/10 p-8 rounded-2xl shadow-2xl text-center"
          >
            <motion.div
              animate={passwordError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="mx-auto w-16 h-16 rounded-full bg-[#c9a050]/15 border border-[#c9a050]/40 flex items-center justify-center mb-6 text-[#c9a050]"
            >
              <Lock className="w-7 h-7" />
            </motion.div>

            <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
              <input
                id="secret-password-input"
                type="text"
                maxLength={10}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-5 py-3.5 bg-[#0a0a0b] rounded-xl border border-white/5 focus:border-[#c9a050] focus:outline-none text-center font-serif tracking-widest text-base text-[#eadcb4]"
              />

              <div className="text-[11px] text-white/40 font-mono tracking-wide mt-1">
                힌트: 소녀의 이름 (성 제외, 한글 3글자)
              </div>

              <button
                id="unlock-submit-btn"
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-serif font-bold text-[#0a0a0b] bg-gradient-to-r from-[#c9a050] to-[#eadcb4] hover:from-[#eadcb4] hover:to-[#f5edd9] shadow-md hover:scale-101 active:scale-99 transition-all cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>비밀 실크 해제</span>
              </button>
            </form>
          </motion.div>
        ) : (
          /* 2. SECRETS BOARD DISPLAY (UNLOCKED) */
          <motion.div
            key="unlocked-secrets"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-3xl bg-[#0f0f12] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl relative"
          >
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5 mb-6">
              <div className="space-y-1">
                <span className="text-[#c9a050] text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Unveiled Diary & Truths</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f4f1ea]">진실</h3>
              </div>

              <button
                id="relock-btn"
                onClick={handleLockAgain}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-serif bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#c9a050]/40 text-white/70 hover:text-[#f4f1ea] transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>일지 덮기 (다시 잠그기)</span>
              </button>
            </div>

            {/* List of Secrets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
              {secrets.map((sec, idx) => (
                <motion.div
                  key={sec.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0a0a0b] border border-white/5 hover:border-[#c9a050]/20 p-5 rounded-2xl flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono tracking-widest text-[#c9a050] uppercase font-bold bg-[#c9a050]/10 px-2.5 py-0.5 rounded-md border border-[#c9a050]/20">
                        {sec.subtitle}
                      </span>
                      <span className="text-[10px] font-mono text-white/20">Secret #{idx + 1}</span>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-[#f4f1ea] group-hover:text-[#eadcb4] transition-colors">
                      {sec.title}
                    </h4>

                    <p className="font-serif text-xs text-[#f4f1ea]/70 leading-relaxed text-justify whitespace-pre-line">
                      {sec.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer Sign-off */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end items-center text-[10px] font-mono text-white/30">
              <span>CONFIDENTIAL ARCHIVE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
