/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Shield, Sparkles } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

type SubTabType = 'backstory' | 'calendar';

interface EventItem {
  month: string;
  title: string;
  tag: string;
}

export default function LoreScreen() {
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('backstory');

  const handleSubTabChange = (tab: SubTabType) => {
    audioSynth.playChime();
    setActiveSubTab(tab);
  };

  // Dynamic yearly events listing requested by the user
  const yearlyEvents: EventItem[] = [
    {
      month: "2월 말",
      title: "설날 대축제",
      tag: "대규모 인파"
    },
    {
      month: "6월",
      title: "여름 대성수기",
      tag: "소녀와 처음 만났던 달"
    },
    {
      month: "9월",
      title: "추석 연휴 대목",
      tag: "고향으로 내려가는 운전자들의 커피 테이크아웃 세례"
    },
    {
      month: "10월 말",
      title: "할로윈 파티",
      tag: "가게 꾸미기 & 코스프레"
    },
    {
      month: "12월",
      title: "크리스마스",
      tag: "크리스마스 다음날이 휴무일"
    }
  ];

  return (
    <div id="lore-screen-main-box" className="w-full space-y-8 py-4">
      
      {/* 1. Header Hero section */}
      <div className="bg-[#0f0f12] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-[#c9a050] text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Café Background & Seasonal Logs</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#f4f1ea]">배경 이야기</h2>
        </div>

        {/* Navigation Tabs Controller */}
        <div className="flex bg-[#0a0a0b] p-1.5 rounded-xl border border-white/5 gap-1 shrink-0 w-full md:w-auto">
          <button
            onClick={() => handleSubTabChange('backstory')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-serif font-bold cursor-pointer transition-all ${
              activeSubTab === 'backstory' ? 'bg-[#c9a050] text-[#0a0a0b]' : 'text-[#f4f1ea]/50 hover:text-[#f4f1ea]'
            }`}
          >
            기본 스토리
          </button>
          <button
            onClick={() => handleSubTabChange('calendar')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-serif font-bold cursor-pointer transition-all ${
              activeSubTab === 'calendar' ? 'bg-[#c9a050] text-[#0a0a0b]' : 'text-[#f4f1ea]/50 hover:text-[#f4f1ea]'
            }`}
          >
            연간 이벤트
          </button>
        </div>
      </div>

      {/* 2. Dynamic Content Segment */}
      <div className="relative min-h-[50vh]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Main Overarching Backstory (뒷배경) */}
          {activeSubTab === 'backstory' && (
            <motion.div
              key="backstory-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0f0f12] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-3 bg-[#c9a050]/15 text-[#c9a050] rounded-xl border border-[#c9a050]/20">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#f4f1ea]">당신과 소녀의 첫 만남</h3>
                  <span className="text-[10px] font-mono tracking-widest text-[#c9a050] uppercase">The Chronicle of Guardian and Lost Fille</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 items-center pt-2">
                <div className="space-y-4 font-serif text-sm leading-relaxed text-[#f4f1ea]/80 text-justify">
                  <p>
                    당신은 런던풍 인테리어로 수놓아진 한 도심 속 대형 쇼핑몰 구석에서 잔잔히 흘러가는 빈티지한 카페를 경영하는 점장입니다. 정성스레 간 로스팅 커피와 은은한 재즈 선율이 전부였던 소담스러운 그 공간에, 어느 날 작은 인연이 찾아왔습니다.
                  </p>
                  <p className="border-l-2 border-[#c9a050]/40 pl-4 italic text-[#eadcb4]">
                    6월, 수많은 관광객이 찾아오던 성수기. 폭풍같던 손님들의 방문이 끝나고, 밤의 폐점 시간... 밝은 백금발을 잔뜩 헝클어뜨린 외국인 소녀가 미동도 없이 카페 구석 테이블에 멍하니 남겨져 있었습니다.
                  </p>
                  <p>
                    가만히 그녀를 들여다보니 놀라울 정도로 눈먼 상태였습니다. 심각한 고도 근시를 앓고 있어 코앞의 아주 밀접한 거리가 아니면 모든 세상을 뿌연 안갯속 실루엣으로 여기는 기구한 운명이었죠. 게다가 프랑스 태생인 듯했으나, 모국어조차 도저히 가늠할 수 없을 만큼 심각할 정도로 띄엄띄엄 말했습니다.
                  </p>
                  <p>
                    쇼핑몰 구석구석을 수배하고 외교 통로를 수소문해 봐도 그녀의 보호자나 친족은 그 어디에도 찾을 수 없었습니다. 오갈 데 없는 가시 돋친 어린새처럼 상처 입은 눈으로 당신의 품만을 깊숙이 파고드는 소녀를 보며, 당신은 중대한 책임감과 연민을 느꼈습니다.
                  </p>
                  <p>
                    수많은 복잡다단한 법적 절차를 기꺼이 모두 완수하고, 당신은 마침내 이 흐릿한 백금발 소녀의 공식적인 임시 법정 보호자가 되었습니다.
                  </p>
                  <p>
                    ...그리고, 현재 그녀는 당신의 집에 같이 살며, 당신의 카페 피아노에서 피아노를 연주하고 있습니다.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Yearly Event Calendar (이벤트 목록) */}
          {activeSubTab === 'calendar' && (
            <motion.div
              key="calendar-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="bg-[#0f0f12] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
                  <Calendar className="w-5 h-5 text-[#c9a050]" />
                  <h3 className="font-serif text-lg font-bold text-[#f4f1ea]">연간 일정</h3>
                </div>

                <div className="relative border-l border-[#c9a050]/30 ml-4 pl-6 space-y-8 py-2">
                  {yearlyEvents.map((ev, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative space-y-1.5"
                    >
                      {/* Timeline dot */}
                      <span className="absolute left-[-31px] top-1 w-4 h-4 rounded-full border-2 border-[#c9a050] bg-[#0f0f12] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-[#c9a050] rounded-full animate-ping" />
                      </span>

                      {/* Header line detail */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 gap-y-0.5">
                        <span className="text-sm font-mono font-bold text-[#c9a050] bg-[#c9a050]/10 px-2.5 py-0.5 rounded border border-[#c9a050]/20 w-fit">
                          {ev.month}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#f4f1ea]">{ev.title}</h4>
                        <span className="text-[10px] font-mono text-white/40 border border-white/5 px-2 py-0.5 rounded-full bg-[#121215]">
                          {ev.tag}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
