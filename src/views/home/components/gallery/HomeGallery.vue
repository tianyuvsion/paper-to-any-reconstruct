<template>
  <section class="portal-gallery" id="gallery">
    <header>
      <div>
        <p class="portal-kicker">THE KNOWLEDGE GALLERY</p>
        <h2>先看见成果，再开始自己的研究</h2>
        <p>以下为独立 EAST 示例；打开可预览，研究你自己的论文需先确认来源与范围。</p>
      </div>
      <div class="portal-gallery-filter" role="group" aria-label="作品类型">
        <button
          type="button"
          data-portal-filter="all"
          :aria-pressed="activeFilter === 'all'"
          @click="activeFilter = 'all'"
        >
          全部
        </button>
        <button
          type="button"
          data-portal-filter="card"
          :aria-pressed="activeFilter === 'card'"
          @click="activeFilter = 'card'"
        >
          知识卡片
        </button>
        <button
          type="button"
          data-portal-filter="media"
          :aria-pressed="activeFilter === 'media'"
          @click="activeFilter = 'media'"
        >
          媒体作品
        </button>
      </div>
    </header>

    <div class="portal-gallery-grid">
      <!-- 卡片 1: 发现卡片 · 关键发现 (包含原版放大镜与聚焦互动动效) -->
      <article
        class="portal-gallery-card"
        data-kind="card"
        data-tone="lilac"
        :hidden="activeFilter !== 'all' && activeFilter !== 'card'"
      >
        <article
          class="rcs-item"
          data-result-card="keyFindings"
          data-media-variant="depth"
          data-size="square"
          data-catalog-variant="current-keyFindings-complete"
        >
          <button
            class="rcs-card ap-card"
            data-tone="lime"
            data-appearance="light"
            data-cover-style="machine"
            data-cover-art=""
            aria-label="预览发现卡片：1056 秒高约束运行"
            data-portal-preview="finding"
            @click="$emit('preview', 'finding')"
            @mouseenter="startMagnifier"
            @mouseleave="stopMagnifier"
          >
            <div class="rcs-top"><span>发现卡片</span></div>
            <h3>1056 秒高约束运行</h3>
            <div class="rcs-art">
              <!-- 放大镜组件与24帧围绕把柄3D自旋 -->
              <object-motion
                kind="keyFindings"
                class="object-motion"
                data-effect="focus"
                data-mechanism="true"
                aria-hidden="true"
                :data-active="magnifierActive ? 'true' : 'false'"
                data-playing="false"
                :data-frame="magnifierFrame"
              >
                <img
                  class="function-render"
                  :src="keyFindingsWebpFrames[magnifierFrame]"
                  alt=""
                  loading="lazy"
                  draggable="false"
                />
                <span class="object-feedback" aria-hidden="true"><i></i><i></i><i></i></span>
              </object-motion>
            </div>
            <div class="rcs-bottom"><span>EAST · 独立示例</span><i aria-hidden="true">↗</i></div>
          </button>
        </article>
        <footer>
          <span>
            <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
            <small>EAST · 精选作品</small>
          </span>
        </footer>
      </article>

      <!-- 卡片 2: 通勤播客 (包含黑胶唱片与跳跃音符 ♪ ♫ ♪ 动效) -->
      <article
        class="portal-gallery-card"
        data-kind="media"
        data-tone="peach"
        :hidden="activeFilter !== 'all' && activeFilter !== 'media'"
      >
        <article
          class="rcs-item"
          data-result-card="audioExplanation"
          data-media-variant="studio"
          data-size="square"
          data-catalog-variant="current-audioExplanation-complete-studio-square"
        >
          <button
            class="rcs-card ap-card"
            data-tone="orange"
            data-appearance="light"
            data-cover-style="machine"
            data-cover-art=""
            aria-label="预览通勤播客：听懂千秒实验"
            data-portal-preview="audio"
            @click="$emit('preview', 'audio')"
          >
            <div class="rcs-top"><span>通勤播客</span></div>
            <h3>听懂千秒实验</h3>
            <div class="rcs-art">
              <!-- 原项目 44 帧音乐机：0–11 帧落针，12–43 帧循环播放。 -->
              <object-motion kind="audioExplanation">
                <img
                  class="function-render"
                  src="https://paper-to-any.8-218-121-139.sslip.io/ui/local-demo/art-proof/objects-v2/audioExplanation.png"
                  alt=""
                  loading="lazy"
                  draggable="false"
                />
              </object-motion>
            </div>
            <div class="rcs-bottom"><span>EAST · 独立示例</span><i aria-hidden="true">↗</i></div>
          </button>
        </article>
        <footer>
          <span>
            <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
            <small>EAST · 精选作品</small>
          </span>
        </footer>
      </article>

      <!-- 卡片 3: 论文影像 -->
      <article
        class="portal-gallery-card"
        data-kind="media"
        data-tone="ink"
        :hidden="activeFilter !== 'all' && activeFilter !== 'media'"
      >
        <article
          class="rcs-item"
          data-result-card="videoExplanation"
          data-media-variant="selected"
          data-size="square"
          data-catalog-variant="current-videoExplanation-complete"
        >
          <button
            class="rcs-card ap-card"
            data-tone="violet"
            data-appearance="light"
            data-cover-style="machine"
            data-cover-art=""
            aria-label="预览论文影像：43 秒走近 EAST"
            data-portal-preview="video"
            @click="$emit('preview', 'video')"
          >
            <img
              class="rcs-video-cover"
              src="https://paper-to-any.8-218-121-139.sslip.io/ui/local-demo/art-proof/east-video-frame-8s.jpg"
              alt="现有EAST视频画面"
            />
            <div class="rcs-video-shade"></div>
            <div class="rcs-top"><span>论文影像</span></div>
            <h3>43 秒走近 EAST</h3>
            <span class="rcs-video-play" aria-hidden="true">▶</span>
            <div class="rcs-bottom"><span>EAST · 独立示例</span><i aria-hidden="true">↗</i></div>
          </button>
        </article>
        <footer>
          <span>
            <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
            <small>EAST · 精选作品</small>
          </span>
        </footer>
      </article>

      <!-- 卡片 4: 证据卡片 (包含原版精美复杂的磁约束多层渐变螺旋线圈 SVG) -->
      <article
        class="portal-gallery-card"
        data-kind="card"
        data-tone="lime"
        :hidden="activeFilter !== 'all' && activeFilter !== 'card'"
      >
        <article
          class="rcs-item"
          data-result-card="limitations"
          data-media-variant="depth"
          data-size="square"
          data-catalog-variant="current-limitations-complete"
        >
          <button
            class="rcs-card ap-card"
            data-tone="orange"
            data-appearance="light"
            data-cover-style="machine"
            data-cover-art=""
            aria-label="预览证据卡片：持续运行不等于净发电"
            data-portal-preview="boundary"
            @click="$emit('preview', 'boundary')"
          >
            <div class="rcs-top"><span>证据卡片</span></div>
            <h3>持续运行不等于净发电</h3>
            <div class="rcs-art">
              <svg class="at-svg" data-catalog-variant="questions-original" viewBox="0 0 320 240" role="img" aria-label="待验证问题概念图形">
                <defs>
                  <linearGradient id="proof-current-limitations-body" x1="0" y1="0" x2="1" y2="1">
                    <stop stop-color="#ffe8b5"></stop>
                    <stop offset=".3" stop-color="#bd672b"></stop>
                    <stop offset=".58" stop-color="#713714"></stop>
                    <stop offset=".85" stop-color="#fff0ca"></stop>
                    <stop offset="1" stop-color="#df9a49"></stop>
                  </linearGradient>
                  <linearGradient id="proof-current-limitations-coil" x1="0" y1="0" x2="1" y2="1">
                    <stop stop-color="#fff0ba"></stop>
                    <stop offset=".3" stop-color="#56c4b5"></stop>
                    <stop offset=".58" stop-color="#0f6570"></stop>
                    <stop offset=".85" stop-color="#c5fff2"></stop>
                    <stop offset="1" stop-color="#3da6a0"></stop>
                  </linearGradient>
                </defs>
                <g class="at-object">
                  <path d="M117 79C92 17 225 24 220 86C219 124 158 125 158 165" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="2.40" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M120 81C96 20 222 27 217 86C216 122 158.7 125 158.7 165" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="2.88" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M123 83C100 23 219 30 214 86C213 120 159.4 125 159.4 165" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="3.30" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M126 85C104 26 216 33 211 86C210 118 160.1 125 160.1 165" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="3.61" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M129 87C108 29 213 36 208 86C207 116 160.8 125 160.8 165" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="3.78" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M132 89C112 32 210 39 205 86C204 114 161.5 125 161.5 165" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="3.78" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M135 91C116 35 207 42 202 86C201 112 162.2 125 162.2 165" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="3.61" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M138 93C120 38 204 45 199 86C198 110 162.9 125 162.9 165" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="3.30" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M141 95C124 41 201 48 196 86C195 108 163.6 125 163.6 165" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="2.88" stroke-linecap="round" stroke-linejoin="round"></path>
                  <ellipse cx="161" cy="193" rx="4" ry="4" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="2.40"></ellipse>
                  <ellipse cx="161" cy="193" rx="6" ry="6" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="2.40"></ellipse>
                  <ellipse cx="161" cy="193" rx="8" ry="8" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="2.88"></ellipse>
                  <ellipse cx="161" cy="193" rx="10" ry="10" fill="none" stroke="url(#proof-current-limitations-body)" stroke-width="3.30"></ellipse>
                </g>
              </svg>
            </div>
            <div class="rcs-bottom"><span>EAST · 独立示例</span><i aria-hidden="true">↗</i></div>
          </button>
        </article>
        <footer>
          <span>
            <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
            <small>EAST · 精选作品</small>
          </span>
        </footer>
      </article>

      <!-- 卡片 5: 一页海报 -->
      <article
        class="portal-gallery-card"
        data-kind="media"
        data-tone="pink"
        :hidden="activeFilter !== 'all' && activeFilter !== 'media'"
      >
        <article
          class="rcs-item"
          data-result-card="presentation"
          data-media-variant="studio"
          data-size="square"
          data-catalog-variant="current-presentation-complete-studio-square"
        >
          <button
            class="rcs-card ap-card"
            data-tone="coral"
            data-appearance="light"
            data-cover-style="machine"
            data-cover-art=""
            aria-label="预览一页海报：一页看懂实验要点"
            data-portal-preview="poster"
            @click="$emit('preview', 'poster')"
          >
            <div class="rcs-top"><span>一页海报</span></div>
            <h3>一页看懂实验要点</h3>
            <div class="rcs-art">
              <img
                class="home-poster"
                src="https://paper-to-any.8-218-121-139.sslip.io/ui/papers/east-super-i-mode/assets/media/poster_EAST千秒SuperI模.jpg"
                alt="EAST 实验海报"
                loading="lazy"
              />
            </div>
            <div class="rcs-bottom"><span>EAST · 独立示例</span><i aria-hidden="true">↗</i></div>
          </button>
        </article>
        <footer>
          <span>
            <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
            <small>EAST · 精选作品</small>
          </span>
        </footer>
      </article>

      <!-- 卡片 6: 原文导读 -->
      <article
        class="portal-gallery-card"
        data-kind="card"
        data-tone="mint"
        :hidden="activeFilter !== 'all' && activeFilter !== 'card'"
      >
        <article
          class="rcs-item"
          data-result-card="researchQuestion"
          data-media-variant="depth"
          data-size="square"
          data-catalog-variant="current-researchQuestion-complete"
        >
          <button
            class="rcs-card ap-card social-cover"
            data-tone="coral"
            data-appearance="light"
            data-cover-style="coral"
            data-cover-art="paper"
            aria-label="预览原文导读：从标题页回到原文"
            data-portal-preview="source"
            @click="$emit('preview', 'source')"
          >
            <img
              class="cover-image"
              src="https://paper-to-any.8-218-121-139.sslip.io/ui/papers/east-super-i-mode/assets/pages/page-11.png"
              alt=""
              loading="lazy"
            />
            <span class="cover-art" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="cover-top"><span>原文导读</span></span>
            <span class="cover-title">从标题页回到原文</span>
            <span class="cover-bottom">
              <span class="cover-note">EAST · 独立示例</span>
              <span class="cover-open" aria-hidden="true">↗</span>
            </span>
          </button>
        </article>
        <footer>
          <span>
            <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
            <small>EAST · 精选作品</small>
          </span>
        </footer>
      </article>
    </div>

    <!-- 来源出处与核验声明 -->
    <p class="portal-gallery-credit">
      独立作品示例 · EAST 千秒实验，Science Advances，2023。
      <a
        href="https://www.science.org/doi/10.1126/sciadv.abq5273"
        target="_blank"
        rel="noopener"
      >
        阅读论文原文 ↗
      </a>
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { keyFindingsWebpFrames } from '@/utils/keyFindingsFrames'

defineEmits<{
  (e: 'preview', previewId: string): void
}>()

const activeFilter = ref<'all' | 'card' | 'media'>('all')

// 官方原版 3D 机械骨骼序列帧原地自转控制器
const magnifierHover = ref(false)
const magnifierActive = ref(false)
const magnifierFrame = ref(0)
let magnifierRaf = 0
let magnifierPhase = 0
let lastTime = 0

function startMagnifier() {
  magnifierHover.value = true
  magnifierActive.value = true
  lastTime = performance.now()
  cancelAnimationFrame(magnifierRaf)

  function tick(now: number) {
    if (!magnifierHover.value) return
    const delta = Math.min(now - lastTime, 60)
    lastTime = now
    // 原版节奏推进自转角度
    magnifierPhase += (delta / 1000) * 3.8
    // 正弦波平滑 3D 循环推进 24 帧
    const progress = (1 - Math.cos((magnifierPhase * Math.PI) / 3)) / 2
    magnifierFrame.value = Math.min(23, Math.max(0, Math.round(progress * 23)))
    magnifierRaf = requestAnimationFrame(tick)
  }
  magnifierRaf = requestAnimationFrame(tick)
}

function stopMagnifier() {
  magnifierHover.value = false
  cancelAnimationFrame(magnifierRaf)
  // 原版 settle 缓动：在 450ms 内平滑从当前帧回弹至静止第 0 帧
  const fromFrame = magnifierFrame.value
  const startTime = performance.now()
  function settle(now: number) {
    const p = Math.min(1, (now - startTime) / 450)
    magnifierFrame.value = Math.min(23, Math.max(0, Math.round(fromFrame * (1 - p) * (1 - p))))
    if (p < 1) {
      magnifierRaf = requestAnimationFrame(settle)
    } else {
      magnifierFrame.value = 0
      magnifierPhase = 0
      magnifierActive.value = false
    }
  }
  magnifierRaf = requestAnimationFrame(settle)
}

onBeforeUnmount(() => {
  cancelAnimationFrame(magnifierRaf)
})
</script>

<style scoped>
/* 继承自 portal.css 与 result-card-system.css */

.home-poster {
  transition: transform 0.35s ease;
}
.rcs-card:hover .home-poster {
  transform: rotate(-3deg) translateY(-5px);
}

.cover-image {
  transition: transform 0.35s ease;
}
.rcs-card:hover .cover-image {
  transform: rotate(-6deg) translateY(-6px);
}
</style>
