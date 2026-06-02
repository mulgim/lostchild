/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DialogueNode } from '../types';

export const STORY_SCRIPT: Record<string, DialogueNode> = {
  start: {
    id: "start",
    speaker: "나",
    text: "비가 내리는 숲속 같은 저녁, 어스름한 재즈 음악이 흐르는 카페의 조명이 런던풍 원목 테이블을 은은히 비춘다. 구석의 작은 그랜드 피아노 앞에, 백금발 머리칼이 조명을 받아 황금빛으로 물든 소녀가 웅크리듯 앉아 연주를 주저하고 있다.",
    expression: "normal",
    bg: "sunset_room", // Re-utilizing existing key or styling
    musicCue: "calm",
    choices: [
      {
        text: "따스한 스팀 밀크 한 잔을 들고 조용히 다가간다.",
        nextId: "milk_approach",
        affectionBonus: 15,
        reactionText: "달착지근한 스팀 밀크의 증기 냄새가 퍼지자, 소녀는 코를 쫑긋거리며 당신만의 따듯한 공기 파동을 직관적으로 감지해 슬며시 웃어 보입니다."
      },
      {
        text: "“안녕, 열심히 피아노를 보고 있었네?”라며 다정하게 말을 건넨다.",
        nextId: "voice_approach",
        affectionBonus: 5,
        reactionText: "소녀는 흠칫 놀라 어깨를 동그랗게 웅크렸지만, 이내 당신의 목소리를 듣고 손끝을 꼬물거립니다."
      }
    ]
  },

  milk_approach: {
    id: "milk_approach",
    speaker: "소녀",
    text: "“...점, 장님? 따듯한... 냄새. 눈먼 강아지처럼 고개를 내밀더니 내 턱밑과 셔츠 초상 앞 3cm까지 얼굴을 쑤욱 들이민다. 이윽고 나만의 특이한 향을 가까이 확인하더니 행복한 소리를 내며 내 품에 꼬오옥 안겨든다.”",
    expression: "bashful",
    bg: "sunset_room",
    musicCue: "calm",
    nextId: "ask_melody"
  },

  voice_approach: {
    id: "voice_approach",
    speaker: "소녀",
    text: "“꺄앗...! (깜짝 놀라며) ...아, 점장님이다! 다가온 당신을 간신히 인식하자, 덥석 한걸음에 접근해 소매를 꼭 부여잡고는 내 얼굴선 앞까지 얼굴을 바짝 포갭니다. 확인이라도 하듯 소매 끝을 살짝 '앙' 하고 깨물었습니다.”",
    expression: "surprised",
    bg: "sunset_room",
    musicCue: "melancholic",
    nextId: "ask_melody"
  },

  ask_melody: {
    id: "ask_melody",
    speaker: "나",
    text: "소녀가 짚고 있는 흑백 건반을 바라보며 연주하고 싶은 재즈 멜로디가 있느냐고 물어보았다. 그녀는 극심한 고도 근시 탓에 악보는 아예 볼 수 없어 홀로 할아버지가 좋아하던 재즈 코드를 눈 감고 더듬기만 할 뿐이다.",
    expression: "serious",
    bg: "sunset_room",
    musicCue: "melancholic",
    choices: [
      {
        text: "“내가 옆에서 부드러운 재즈 베이스 반주를 낮게 채워줄게.”",
        nextId: "play_duet",
        affectionBonus: 20,
        reactionText: "소녀는 기뻐서 얼굴을 활짝 붉히며 당신의 뺨에 살짝 자기 뺨을 부벼 대는 감미로운 애정표현을 쏟아냅니다."
      },
      {
        text: "연장자로서 그녀의 서툰 손가락을 따뜻하게 포개어 한 음씩 짚어준다.",
        nextId: "guide_fingers",
        affectionBonus: 10,
        reactionText: "소녀는 가만히 당신 가슴팍에 머리를 조용히 파묻으며 그저 따스한 속삭임에 몸을 맡깁니다."
      }
    ]
  },

  play_duet: {
    id: "play_duet",
    speaker: "소녀",
    text: "“점장님... 피아노, 부드러워... 할아버지... 들려준... 멜로디... 같이, 쳐요!” \n\n소녀가 서툰 한글로 기뻐하며 피아노 우측 건반을 투명한 기교로 짚어 연주하자, 나 또한 낮고 중후한 재즈 코드로 뒤를 채웠다. 눈앞이 뿌옇기에 오직 청각과 촉각, 나에 대한 의존에만 의지해 연주하는 그녀의 피아노 소리가 런던풍 카페 공간에 깊은 은빛 꽃망울을 틔운다.",
    expression: "happy",
    bg: "sunset_room",
    musicCue: "climax",
    choices: [
      {
        text: "소녀의 사랑스러운 어리광 넘치는 리듬에 맞춰 한껏 따사로운 템포로 조율한다.",
        nextId: "jazz_harmony",
        affectionBonus: 20,
        reactionText: "소녀는 뺨을 내 어깨에 지긋이 맞대고 웃으며 세상에서 가장 달콤하고 완벽하게 흘러가는 스윙 재즈 화음을 짜 나갑니다!"
      },
      {
        text: "지그시 지켜보며 가볍고 통통 튀는 발랄한 카페 음악 분위기가 나도록 연주를 꾸민다.",
        nextId: "jazz_playful",
        affectionBonus: 10,
        reactionText: "소녀는 신나서 고개를 연신 끄덕이며 점장님의 손가락 근처를 살며시 가볍게 눌러봅니다."
      }
    ]
  },

  guide_fingers: {
    id: "guide_fingers",
    speaker: "소녀",
    text: "“손... 커요... 아주... 안심... 돼요. 점장님 손, 꼭 쥐고... 있으면... 안 무서워요. 피아노... 계속 가르쳐... 줄 거죠?” \n\n소녀의 작은 백합 같은 손가락 위에 마음을 보태 가라앉힌다. 비록 눈앞은 안갯속처럼 보희뿌옇게 가려졌으나, 등 뒤를 든든히 지키며 인도하는 당신으로 인해 소녀는 무거운 긴장이 완전히 가라앉았는지 따스한 미소를 머금습니다.",
    expression: "bashful",
    bg: "sunset_room",
    musicCue: "calm",
    nextId: "ending_decision"
  },

  jazz_harmony: {
    id: "jazz_harmony",
    speaker: "소녀",
    text: "“점장님... 소리, 정말 정겨워... 나, 비뚤어진 사탕 같아도... 곁에 있을래... 기뻐서, 뺨... 또 부빌래요... 꼬오옥...” \n\n연주를 부드럽게 마친 소녀가 왈칵 당신 가슴 속에 뛰어듭니다. 자신의 눈장벽과 언어 학습 장애가 점장님과의 아름다운 이중주를 결코 가로막을 수 없다는 것을, 온 몸과 선율로 선포하는 것처럼 말입니다.",
    expression: "happy",
    bg: "sunset_room",
    musicCue: "climax",
    nextId: "ending_decision"
  },

  jazz_playful: {
    id: "jazz_playful",
    speaker: "소녀",
    text: "“꺄앗, 빠른... 소리다! 간지러워요... 히히... 점장님은... 개구쟁이 바보! 그래도... 나, 계속... 연주할 거예요!” \n\n어려운 난간 속에서도 맑게 웃는 백금발 소녀는, 뿌옇게 흐려 보이는 광경 속에서 오로지 당신만을 빛나는 오아시스로 굳건히 삼고 있었습니다.",
    expression: "clumsy",
    bg: "sunset_room",
    musicCue: "climax",
    nextId: "ending_decision"
  },

  ending_decision: {
    id: "ending_decision",
    speaker: "시스템",
    text: "소녀와의 소담스러운 방과 후 재즈 모음조곡이 아늑함의 한가운데서 숨죽입니다. 밖에는 런던풍 거리의 정취와 부푼 빗방울 소리, 안에는 모락모락 커피 향이 뒤섞여 녹아듭니다. 당신과 의지형 소녀 사이의 두터운 신뢰 화음은 과연 어떤 아름다운 엔딩을 향해 조율될까요?",
    expression: "normal",
    bg: "sunset_room",
    musicCue: "silence",
    nextId: "calc_ending"
  },

  calc_ending: {
    id: "calc_ending",
    speaker: "나",
    text: "마침내 마지막 마디의 피아노 진동이 노란 조명 아래에 포근히 사그러들었다. 소녀는 코앞까지 내 턱밑과 뺨 앞으로 얼굴을 밀착시켜 가만히 숨소리를 마주하며, 고마움과 애착을 듬뿍 담아 내 소매를 살며시 입술에 댑니다.",
    expression: "normal",
    bg: "sunset_room",
    musicCue: "silence"
  }
};
