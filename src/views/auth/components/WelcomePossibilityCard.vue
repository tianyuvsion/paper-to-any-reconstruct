<template>
  <section class="welcome-cover" aria-labelledby="possibility-title">
    <span class="v-label">PAPER → POSSIBILITY</span>
    <h2 id="possibility-title">好奇心，<br />有了新去处。</h2>

    <!-- 可点击翻牌的互动卡片区域 -->
    <div
      class="paper-play"
      role="button"
      tabindex="0"
      aria-label="点击翻动发现卡片"
      @click="shuffleNextDeck"
      @keydown.enter.space.prevent="shuffleNextDeck"
    >
      <!-- 卡片 1: paper (粉/珊瑚色) -->
      <div
        class="play-sheet sheet-one"
        data-card="paper"
        :data-slot="getSlot('paper')"
      >
        <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
          <g transform="rotate(-12 140 100)">
            <rect x="63" y="26" width="119" height="150" rx="14" fill="currentColor" opacity=".12" />
            <rect x="78" y="13" width="119" height="150" rx="14" fill="#fffaf0" stroke="currentColor" stroke-width="2" />
            <path d="M98 40h56m-56 15h76m-76 61h75m-75 12h63m-63 12h42" stroke="currentColor" stroke-width="4" opacity=".6" />
            <rect x="98" y="73" width="34" height="26" rx="4" fill="currentColor" opacity=".7" />
            <circle cx="163" cy="85" r="17" fill="currentColor" opacity=".22" />
          </g>
        </svg>
      </div>

      <!-- 卡片 2: network (紫丁香色) -->
      <div
        class="play-sheet sheet-two"
        data-card="network"
        :data-slot="getSlot('network')"
      >
        <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
          <g stroke="currentColor" stroke-width="3" opacity=".5">
            <path d="m64 48 74 43 74-46m-74 46-66 64m66-64 77 56m-77-56-5-62" />
          </g>
          <g fill="#fff9ef" stroke="currentColor" stroke-width="2">
            <circle cx="64" cy="48" r="21" />
            <circle cx="212" cy="45" r="17" />
            <circle cx="72" cy="155" r="17" />
            <circle cx="215" cy="147" r="25" />
          </g>
          <circle cx="138" cy="91" r="31" fill="currentColor" />
          <path d="m125 90 9 9 17-19" stroke="#fff9ef" stroke-width="4" fill="none" />
        </svg>
      </div>

      <!-- 卡片 3: chat (米黄/奶油色) -->
      <div
        class="play-sheet sheet-three"
        data-card="chat"
        :data-slot="getSlot('chat')"
      >
        <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
          <path d="M49 54q0-20 21-20h113q22 0 22 22v66q0 22-22 22h-60l-32 28v-28H70q-21 0-21-22z" fill="currentColor" opacity=".12" />
          <path d="M67 28h116q19 0 19 19v60q0 19-19 19h-66l-27 23v-23H67q-19 0-19-19V47q0-19 19-19z" fill="#fff9ef" stroke="currentColor" stroke-width="2" />
          <circle cx="91" cy="77" r="7" fill="currentColor" />
          <circle cx="125" cy="77" r="7" fill="currentColor" />
          <circle cx="159" cy="77" r="7" fill="currentColor" />
          <path d="m218 120 5 15 16 5-16 5-5 16-5-16-16-5 16-5z" fill="currentColor" />
        </svg>
      </div>

      <!-- 右上角星芒 -->
      <span class="play-star">✦</span>
    </div>

    <!-- 对应诗意文案 -->
    <p class="play-caption" aria-live="polite" aria-atomic="true">
      {{ currentDeck.caption }}
    </p>

    <!-- 翻牌按钮 -->
    <button
      type="button"
      class="v-action v-action--forest carved-pressable"
      @click="shuffleNextDeck"
    >
      翻开另一种可能
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export type CardType = 'paper' | 'network' | 'chat'

interface Deck {
  order: CardType[]
  caption: string
}

// 原始项目的 6 种经典排列与注解
const possibilityDecks: Deck[] = [
  { order: ['paper', 'network', 'chat'], caption: '读论文，也可以是一场发现。' },
  { order: ['paper', 'chat', 'network'], caption: '换个角度，也许就读懂了。' },
  { order: ['network', 'paper', 'chat'], caption: '有些好问题，是读着读着冒出来的。' },
  { order: ['network', 'chat', 'paper'], caption: '再读一页，看看会发现什么。' },
  { order: ['chat', 'paper', 'network'], caption: '原来，这两件事还有关系。' },
  { order: ['chat', 'network', 'paper'], caption: '带着好奇心，回到论文里。' }
]

function generateShuffledDeckBag(excludeId = -1): number[] {
  const ids = possibilityDecks.map((_, i) => i).filter((i) => i !== excludeId)
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[ids[i], ids[j]] = [ids[j], ids[i]]
  }
  return ids
}

const currentDeckIndex = ref<number>(Math.floor(Math.random() * possibilityDecks.length))
const deckBag = ref<number[]>(generateShuffledDeckBag(currentDeckIndex.value))

const currentDeck = computed(() => possibilityDecks[currentDeckIndex.value])

function getSlot(cardType: CardType): number {
  return currentDeck.value.order.indexOf(cardType)
}

function shuffleNextDeck() {
  if (deckBag.value.length === 0) {
    let newBag = generateShuffledDeckBag()
    if (newBag[newBag.length - 1] === currentDeckIndex.value && newBag.length > 1) {
      ;[newBag[0], newBag[newBag.length - 1]] = [newBag[newBag.length - 1], newBag[0]]
    }
    deckBag.value = newBag
  }
  const nextId = deckBag.value.pop()
  if (nextId !== undefined) {
    currentDeckIndex.value = nextId
  }
}
</script>

<style scoped>
.welcome-cover {
  position: relative;
  /* 纯净青柠背景，无斑点点纹 */
  background-color: #d9ee80;
  color: #303823;
  border: 1px solid #d4e48a;
  min-height: 540px;
  border-radius: 30px;
  padding: 36px 32px 32px;
  overflow: hidden;
  box-shadow:
    0 18px 30px rgba(75, 82, 41, 0.12),
    inset 0 1px #effdb6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.v-label {
  display: block;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #556633;
}

.welcome-cover h2 {
  font-size: 46px;
  color: #2b331f;
  margin: 14px 0 0;
  line-height: 1.12;
  letter-spacing: -2px;
  font-weight: 800;
  font-family: inherit;
}

/* 互动卡片舞台 */
.paper-play {
  position: relative;
  width: 300px;
  height: 220px;
  max-width: 100%;
  margin: 20px auto 10px;
  cursor: pointer;
  outline: none;
}

.paper-play:focus-visible {
  outline: 2px dashed #40502f;
  outline-offset: 4px;
  border-radius: 20px;
}

/* 卡片单体与微质感 */
.play-sheet {
  position: absolute;
  width: 132px;
  height: 164px;
  border: 1px solid rgba(61, 52, 75, 0.2);
  border-radius: 17px;
  box-shadow:
    inset 0 2px rgba(255, 255, 255, 0.8),
    0 10px 14px rgba(48, 35, 62, 0.12);
  display: grid;
  place-items: center;
  top: 25px;
  left: 0;
  /* 核心规律移动动画：平滑贝塞尔曲线 */
  transition: transform 0.48s cubic-bezier(0.2, 0.8, 0.2, 1);
  user-select: none;
}

.consumer-art {
  width: 145px;
  max-width: none;
  color: #493b61;
  pointer-events: none;
}

/* 三张卡片的专属底色 */
.sheet-one {
  background: #f3afba;
}
.sheet-two {
  background: #cbb5f0;
}
.sheet-three {
  background: #fff9dd;
}

/* 三个卡槽的绝对空间位置与旋转角度 */
.play-sheet[data-slot="0"] {
  transform: translateX(22px) rotate(-17deg);
  z-index: 1;
}

.play-sheet[data-slot="1"] {
  transform: translate(85px, -13px) rotate(2deg);
  z-index: 2;
}

.play-sheet[data-slot="2"] {
  transform: translateX(149px) rotate(16deg);
  z-index: 3;
}

/* 鼠标悬停时，中间卡片优雅浮动抬起 */
@media (hover: hover) {
  .paper-play:hover .play-sheet[data-slot="1"] {
    transform: translate(85px, -21px) rotate(2deg);
  }
}

/* 右上角四角星标 */
.play-star {
  position: absolute;
  right: 12px;
  top: 4px;
  font-size: 40px;
  line-height: 1;
  color: #564079;
  transform: rotate(12deg);
  pointer-events: none;
  z-index: 4;
}

/* 诗意文案 */
.play-caption {
  font-size: 14px;
  margin: 10px auto 18px;
  min-height: 24px;
  line-height: 1.6;
  text-align: center;
  color: #3b452b;
  font-weight: 500;
}

/* 原始墨绿深林按钮 (Forest Variant) */
.v-action--forest {
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 280px);
  min-height: 48px;
  margin: 0 auto;
  border: 1px solid #20291a;
  border-radius: 12px;
  background-color: #303b24;
  color: #f0f7cc;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow:
    0 3px 0 #20291a,
    0 8px 16px rgba(48, 59, 36, 0.2);
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-action--forest:hover {
  background-color: #40502f;
  transform: translateY(-1px);
  box-shadow:
    0 4px 0 #20291a,
    0 10px 20px rgba(48, 59, 36, 0.25);
}

.v-action--forest:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #20291a;
}

@media (max-width: 900px) {
  .welcome-cover {
    padding: 26px 22px;
    min-height: 480px;
  }
  .welcome-cover h2 {
    font-size: 38px;
  }
}
</style>
