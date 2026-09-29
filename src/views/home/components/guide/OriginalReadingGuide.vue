<template>
  <div class="reading-guide-wrapper">
    <!-- 1. 顶部操作栏 (对齐原版 template-toolbar，彻底解决原生 select 的 Bug) -->
    <header class="custom-template-toolbar">
      <div class="toolbar-left">
        <span class="toolbar-kicker">成果详情 · 学术报刊模板</span>
      </div>

      <div class="toolbar-center">
        <!-- 彻底修复原版原生下拉栏 Bug：采用 Carved UI 物理浮雕学术定制下拉选择器 -->
        <div class="custom-select-shell">
          <label for="guideTemplateSelect" class="select-label">研读视角</label>
          <div class="select-control-wrapper">
            <select
              id="guideTemplateSelect"
              v-model="selectedTemplate"
              class="carved-academic-select"
              aria-label="选择研读视角与详情模板"
            >
              <option value="originalReadingGuide">原文导读 · 九图贯通</option>
              <option value="breakthrough">关键发现 · 1056秒高约束</option>
              <option value="method">研究方法 · 纯氘放电与射频加热</option>
              <option value="results">实验结果 · 信号与剖面对照</option>
              <option value="limits">结论边界 · 持续运行不等于净发电</option>
              <option value="references">文献关系 · 引文脉络图谱</option>
            </select>
            <!-- 优雅内嵌的矢量向下箭头 -->
            <svg class="select-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div class="toolbar-right">
        <router-link to="/workspace" class="toolbar-link">
          进入完整工作台研读 ↗
        </router-link>
      </div>
    </header>

    <!-- 2. 主体报刊版面容器 -->
    <div id="templateBody" class="reading-viewport-container" :data-reading-mode="readingMode">
      <div class="reading-page-viewport" tabindex="0" :aria-label="readingMode === 'overview' ? '图文总览，向下滚动连续阅读' : '翻页模式，上下逐面查看'">
        <article
          class="visual-edition citation-newspaper guide-newspaper multimedia-card reading-overview"
          data-reading-id="originalReadingGuide"
          data-reading-ready="true"
          data-edition-layout="guide-newspaper"
        >
          <!-- 报纸大标题 -->
          <header class="media-card-heading">
            <span class="media-tag">原文导读 · EAST 千秒实验</span>
            <h2 id="readingTitle">先看懂，再回到原文</h2>
            <p>看一段讲解，切换几张关键图，把这次实验连起来。</p>
          </header>

          <!-- 导读多媒体交互区 (短片 / 图1 / 图6 / 图9) -->
          <section class="media-guide" aria-label="看图理解这篇研究">
            <!-- 4 步讲解方式切换 Tab -->
            <nav class="media-guide-tabs" aria-label="选择讲解方式">
              <button
                v-for="(step, idx) in steps"
                :key="idx"
                type="button"
                class="guide-tab-btn"
                :class="{ active: currentStep === idx }"
                :aria-pressed="currentStep === idx"
                @click="currentStep = idx"
              >
                <span>{{ step.label }}</span>
              </button>
            </nav>

            <!-- 场景展示区 -->
            <div class="media-guide-stage">
              <!-- 场景 0: 试看片视频 -->
              <section v-show="currentStep === 0" class="media-guide-scene reading-slide-scene" data-media-scene="0">
                <div class="media-guide-visual">
                  <div class="media-video-wrap">
                    <video
                      ref="videoPlayerRef"
                      controls
                      playsinline
                      preload="metadata"
                      :poster="steps[0].poster"
                      :src="steps[0].video"
                      aria-label="EAST 证据讲解试看片"
                      @play="isPlaying = true"
                      @pause="isPlaying = false"
                      @ended="handleVideoEnded"
                    >
                      <source :src="steps[0].video" type="video/mp4" />
                      您的浏览器暂不支持该视频播放。
                    </video>
                    <!-- 原版居中覆盖播放大按钮 -->
                    <button
                      v-show="!isPlaying"
                      type="button"
                      class="media-play"
                      @click="playVideo"
                    >
                      {{ playBtnText }}
                    </button>
                  </div>
                  <p class="media-credit">{{ steps[0].credit }}</p>
                </div>

                <div class="media-guide-explanation">
                  <span class="media-eyebrow">{{ steps[0].kicker }}</span>
                  <h3>{{ steps[0].title }}</h3>
                  <p class="media-simple">{{ steps[0].explanation }}</p>
                  <div class="media-look">
                    <span>看哪里</span>
                    <p>{{ steps[0].look }}</p>
                  </div>
                  <div class="media-boundary">
                    <span>还不能说明</span>
                    <p>{{ steps[0].boundary }}</p>
                  </div>
                  <a class="media-source-link" href="#reading-starting-question">看这部分的图文说明 ↓</a>
                </div>
              </section>

              <!-- 场景 1: 共同时间轴 图 1 -->
              <section v-show="currentStep === 1" class="media-guide-scene reading-slide-scene" data-media-scene="1">
                <div class="media-guide-visual">
                  <a :href="steps[1].image" target="_blank" rel="noopener" class="figure-frame">
                    <img :src="steps[1].image" :alt="steps[1].alt" loading="lazy" />
                    <span>放大原图 ↗</span>
                  </a>
                  <p class="media-credit">{{ steps[1].credit }}</p>
                </div>

                <div class="media-guide-explanation">
                  <span class="media-eyebrow">{{ steps[1].kicker }}</span>
                  <h3>{{ steps[1].title }}</h3>
                  <p class="media-simple">{{ steps[1].explanation }}</p>
                  <div class="media-look">
                    <span>看哪里</span>
                    <p>{{ steps[1].look }}</p>
                  </div>
                  <div class="media-boundary">
                    <span>还不能说明</span>
                    <p>{{ steps[1].boundary }}</p>
                  </div>
                  <a class="media-source-link" href="#reading-baseline">看这部分的图文说明 ↓</a>
                </div>
              </section>

              <!-- 场景 2: 从中心到边缘 图 6 -->
              <section v-show="currentStep === 2" class="media-guide-scene reading-slide-scene" data-media-scene="2">
                <div class="media-guide-visual">
                  <a :href="steps[2].image" target="_blank" rel="noopener" class="figure-frame">
                    <img :src="steps[2].image" :alt="steps[2].alt" loading="lazy" />
                    <span>放大原图 ↗</span>
                  </a>
                  <p class="media-credit">{{ steps[2].credit }}</p>
                </div>

                <div class="media-guide-explanation">
                  <span class="media-eyebrow">{{ steps[2].kicker }}</span>
                  <h3>{{ steps[2].title }}</h3>
                  <p class="media-simple">{{ steps[2].explanation }}</p>
                  <div class="media-look">
                    <span>看哪里</span>
                    <p>{{ steps[2].look }}</p>
                  </div>
                  <div class="media-boundary">
                    <span>还不能说明</span>
                    <p>{{ steps[2].boundary }}</p>
                  </div>
                  <a class="media-source-link" href="#reading-new-regime">看这部分的图文说明 ↓</a>
                </div>
              </section>

              <!-- 场景 3: 两个维度一起看 图 9 -->
              <section v-show="currentStep === 3" class="media-guide-scene reading-slide-scene" data-media-scene="3">
                <div class="media-guide-visual">
                  <a :href="steps[3].image" target="_blank" rel="noopener" class="figure-frame">
                    <img :src="steps[3].image" :alt="steps[3].alt" loading="lazy" />
                    <span>放大原图 ↗</span>
                  </a>
                  <p class="media-credit">{{ steps[3].credit }}</p>
                </div>

                <div class="media-guide-explanation">
                  <span class="media-eyebrow">{{ steps[3].kicker }}</span>
                  <h3>{{ steps[3].title }}</h3>
                  <p class="media-simple">{{ steps[3].explanation }}</p>
                  <div class="media-look">
                    <span>看哪里</span>
                    <p>{{ steps[3].look }}</p>
                  </div>
                  <div class="media-boundary">
                    <span>还不能说明</span>
                    <p>{{ steps[3].boundary }}</p>
                  </div>
                  <a class="media-source-link" href="#reading-comparison">看这部分的图文说明 ↓</a>
                </div>
              </section>
            </div>
          </section>

          <!-- 章节索引导航条 -->
          <h3 class="media-detail-heading">沿着图片，继续了解</h3>
          <nav class="news-reading-strip" aria-label="按问题阅读">
            <a href="#reading-starting-question">01 作者真正想解决什么</a>
            <a href="#reading-baseline">02 先认准这一炮的身份</a>
            <a href="#reading-wall">03 稳定运行的证据藏在墙边</a>
            <a href="#reading-new-regime">04 新状态的名字怎样得到支撑</a>
            <a href="#reading-mechanism">05 解释机制时，读得再谨慎一点</a>
            <a href="#reading-comparison">06 比较图给结论划出边界</a>
            <a href="#reading-methods-return">07 最后回到方法，检查你最在意的一句话</a>
          </nav>

          <!-- 01 章节正文 -->
          <section id="reading-starting-question" class="news-guide-story edition-chapter" data-chapter="0">
            <header class="news-story-heading">
              <span>阅读 01 · 原文与解释对照</span>
              <h3>第 1—2 页：作者真正想解决什么</h3>
            </header>
            <div class="news-illustrated-spread">
              <div class="news-plate">
                <figure class="edition-figure">
                  <a :href="'/ui/papers/east-super-i-mode/assets/figures/fig2.jpg'" target="_blank" rel="noopener">
                    <img :src="'/ui/papers/east-super-i-mode/assets/figures/fig2.jpg'" alt="电流驱动如何支持长脉冲" loading="lazy" />
                    <span>放大原图 ↗</span>
                  </a>
                  <figcaption>图 2 · 电流驱动如何支持长脉冲</figcaption>
                </figure>
              </div>
              <div class="news-guide-copy">
                <p>先暂时放下千秒纪录，读引言中的矛盾：聚变研究既追求高性能，也需要把合适的等离子体状态长时间保持。时间拉长后，磁体、加热、冷却、壁面和诊断系统都会进入考验范围。许多短脉冲中不明显的累积效应，到了数百秒乃至千秒才成为实际问题。</p>
                <p>这一段适合慢读的是时间尺度，而不是各装置的名字。作者从毫秒级磁流体事件，谈到秒级约束、数十秒电流扩散与冷却，再到更久的壁面饱和和材料侵蚀。它说明延长放电不是把同一秒复制一千次。带着这些会随时间出现的问题，进入结果部分就有了观察目标。</p>
                <div class="edition-evidence">
                  <a :href="'/ui/papers/east-super-i-mode/source/sciadv.abq5273.PMC9821864.pdf#page=2'" target="_blank" rel="noopener">原文 2 页 · Introduction：时间尺度与两条研究路线 ↗</a>
                </div>
              </div>
            </div>
          </section>

          <!-- 02 章节正文 -->
          <section id="reading-baseline" class="news-guide-story edition-chapter" data-chapter="1">
            <header class="news-story-heading">
              <span>阅读 02 · 原文与解释对照</span>
              <h3>第 3 页：先认准这一炮的身份</h3>
            </header>
            <div class="news-illustrated-spread">
              <div class="news-plate">
                <figure class="edition-figure">
                  <a :href="'/ui/papers/east-super-i-mode/assets/figures/fig1.jpg'" target="_blank" rel="noopener">
                    <img :src="'/ui/papers/east-super-i-mode/assets/figures/fig1.jpg'" alt="用共同时间轴核对这一次放电" loading="lazy" />
                    <span>放大原图 ↗</span>
                  </a>
                  <figcaption>图 1 · 用共同时间轴核对这一次放电</figcaption>
                </figure>
              </div>
              <div class="news-guide-copy">
                <p>结果部分先介绍实验位形、加热方式和逐炮调试，再报告 #106915 放电。为避免误读，可以在纸边记一张身份卡：330 千安、线平均电子密度约 1.8×10¹⁹ m⁻³、射频功率 1.65 兆瓦、持续 1056 秒。这些条件把具体实验与装置的一般能力分开。</p>
                <p>接着看图 1 的四排信号。电流与密度告诉你主要运行量怎样变化；功率信号交代能量输入与辐射；粒子通量和峰值热流指向偏滤器。先找横轴共用的运行时段，再读每排单位。不要试图一次看懂所有细节，只要能解释每排解决什么问题，就完成了第一遍原图阅读。</p>
                <div class="edition-evidence">
                  <a :href="'/ui/papers/east-super-i-mode/source/sciadv.abq5273.PMC9821864.pdf#page=3'" target="_blank" rel="noopener">原文 3 页 · Results / Fig. 1 ↗</a>
                </div>
              </div>
            </div>
          </section>

          <!-- 底部版权与论文原文 -->
          <footer class="news-footer">
            <div class="news-questions">
              <h3>带着问题回到原文</h3>
              <section>
                <h4>第一次读应该按论文顺序，还是先看图？</h4>
                <p>建议先读第 1—2 页的问题，再用图 1 建立实验轮廓，随后按兴趣进入图 3—7。图像与正文来回对照，比跳过问题直接记结论更容易读通。</p>
              </section>
            </div>
            <div class="news-colophon">
              <h3>方法页，就放在手边</h3>
              <p>读通论文，不是把每个术语都记住，而是能从一个问题走到原图，再走回一个带条件的答案。</p>
              <div class="edition-evidence">
                <a :href="'/ui/papers/east-super-i-mode/source/sciadv.abq5273.PMC9821864.pdf#page=8'" target="_blank" rel="noopener">打开论文原文第 8 页核对诊断方法 ↗</a>
              </div>
            </div>
          </footer>
        </article>
      </div>

      <!-- 3. 右侧悬浮卡片操作工具栏 (总览 / 翻页切换) -->
      <aside class="reading-tools" aria-label="卡片操作">
        <div class="reading-mode-switch" role="group" aria-label="阅读方式">
          <button
            type="button"
            class="mode-switch-btn"
            :class="{ active: readingMode === 'overview' }"
            :aria-pressed="readingMode === 'overview'"
            title="总览 · 连续图文阅读"
            aria-label="总览：连续图文阅读"
            @click="readingMode = 'overview'"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M6 7h12M6 11h5v6H6zM14 11h4m-4 3h4m-4 3h4" />
            </svg>
          </button>
          <button
            type="button"
            class="mode-switch-btn"
            :class="{ active: readingMode === 'pages' }"
            :aria-pressed="readingMode === 'pages'"
            title="翻页 · 上下逐面查看"
            aria-label="翻页：上下逐面查看"
            @click="readingMode = 'pages'"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <rect x="5" y="7" width="14" height="10" rx="2" />
              <path d="m9 4 3-2 3 2M9 20l3 2 3-2" />
            </svg>
          </button>
        </div>

        <!-- 翻页模式控制器 -->
        <nav v-show="readingMode === 'pages'" class="reading-page-controls" aria-label="卡片翻页">
          <button type="button" class="page-arrow-btn" aria-label="上一面" @click="handlePagePrev">⌃</button>
          <span class="page-num-indicator" role="status">第 {{ currentPageFace }} 面</span>
          <button type="button" class="page-arrow-btn" aria-label="下一面" @click="handlePageNext">⌄</button>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedTemplate = ref('originalReadingGuide')
const readingMode = ref<'overview' | 'pages'>('overview')
const currentPageFace = ref(1)

const currentStep = ref(0)
const isPlaying = ref(false)
const playBtnText = ref('▶ 播放讲解')
const videoPlayerRef = ref<HTMLVideoElement | null>(null)

const steps = [
  {
    label: '先看短片',
    kicker: '先建立一个画面',
    title: '让好状态，多保持一会儿。',
    explanation: '这次实验的重点，是让多套系统协同，把高约束等离子体维持到 1056 秒。',
    look: '短片里先看持续时间，再留意加热、粒子和壁面条件。它们需要一起配合。',
    boundary: '长时间运行还不等于聚变发电，也不等于获得净能量增益。',
    section: 'starting-question',
    video: '/ui/papers/east-super-i-mode/assets/media/east-video-v9.1-evidence-proof.mp4',
    poster: '/ui/papers/east-super-i-mode/assets/media/east-poster-v9.1-evidence-proof.png',
    credit: '证据讲解试看片 · 约 43 秒 · 片内双语字幕，科学内容仍待人工复核。'
  },
  {
    label: '发生了什么',
    kicker: '看图 1 · 共同时间轴',
    title: '一千多秒，不只是一条曲线。',
    explanation: '电流、密度、加热和热负荷放在同一个时间轴上，才能看它们有没有一起维持住。',
    look: '从上到下读四排信号，再沿横轴看同一时刻。每排回答一个不同的问题。',
    boundary: '不能仅凭一条平稳曲线，就认定整个系统的所有状态都稳定。',
    section: 'baseline',
    image: '/ui/papers/east-super-i-mode/assets/figures/fig1.jpg',
    alt: 'EAST 放电图1的四排同步信号',
    credit: '论文原图 1 · 原文第 3 页 · 保持原始数据与比例'
  },
  {
    label: '为什么特别',
    kicker: '看图 6 · 从中心到边缘',
    title: '温度与密度，并没有一起变化。',
    explanation: '作者把温度和密度的径向分布分开比较，用这些证据识别芯部与边缘的不同结构。',
    look: '先比较 A、C 的温度，再看 B、D 的密度。E 是输运分析，含有模型假设。',
    boundary: '颜色只是区分不同工况；温度的变化不能替代密度或输运证据。',
    section: 'new-regime',
    image: '/ui/papers/east-super-i-mode/assets/figures/fig6.jpg',
    alt: '原图6温度、密度与输运剖面对照',
    credit: '论文原图 6 · 原文第 6 页 · 点击查看完整坐标'
  },
  {
    label: '离应用多远',
    kicker: '看图 9 · 两个维度一起看',
    title: '持续得久，还要看性能有多高。',
    explanation: '横轴看运行时间，纵轴看聚变三乘积。这两件事需要放在一起比较。',
    look: '先认两个坐标，再找 EAST 的位置。图中不同装置的条件也并不相同。',
    boundary: '这张图不是电站效率排行；本实验也没有证明聚变点火或发电。',
    section: 'comparison',
    image: '/ui/papers/east-super-i-mode/assets/figures/fig9.jpg',
    alt: '原图9聚变三乘积与运行时间的跨装置比较',
    credit: '论文原图 9 · 原文第 8 页 · 比较条件见正文'
  }
]

async function playVideo() {
  if (!videoPlayerRef.value) return
  try {
    await videoPlayerRef.value.play()
    isPlaying.value = true
  } catch (err) {
    console.warn('播放中断或受阻:', err)
    playBtnText.value = '▶ 再次点击播放'
  }
}

function handleVideoEnded() {
  isPlaying.value = false
  playBtnText.value = '↻ 再看一次'
}

function handlePagePrev() {
  if (currentPageFace.value > 1) currentPageFace.value--
}

function handlePageNext() {
  if (currentPageFace.value < 4) currentPageFace.value++
}
</script>

<style scoped>
/* 整个卡片容器 */
.reading-guide-wrapper {
  width: 100%;
  margin: 0 auto;
  background: #f8f6fa;
  border-radius: 28px;
  border: 1px solid #e2d9ec;
  box-shadow: 0 16px 48px rgba(48, 32, 79, 0.08);
  overflow: hidden;
  box-sizing: border-box;
}

/* 1. 顶部操作栏：解决原生 select 丑陋 Bug */
.custom-template-toolbar {
  height: 56px;
  padding: 0 24px;
  background: #f3ecf7;
  border-bottom: 1px solid #ded4e7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-sizing: border-box;
}

.toolbar-kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #74528e;
}

/* 物理浮雕定制下拉栏 (Carved UI) */
.custom-select-shell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.select-label {
  font-size: 13px;
  font-weight: 600;
  color: #554467;
}

.select-control-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.carved-academic-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 7px 34px 7px 14px;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  color: #35206d;
  background: #ffffff;
  border: 1px solid #cdbede;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(48, 32, 79, 0.06), inset 0 -1px 2px rgba(48, 32, 79, 0.04);
  cursor: pointer;
  outline: none;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.carved-academic-select:hover {
  border-color: #9c84bf;
  background: #fbf9fd;
  box-shadow: 0 4px 10px rgba(114, 84, 179, 0.12);
}

.carved-academic-select:focus-visible {
  border-color: #8c72b5;
  box-shadow: 0 0 0 3px rgba(140, 114, 181, 0.2), 0 4px 12px rgba(114, 84, 179, 0.16);
}

.select-arrow-icon {
  position: absolute;
  right: 12px;
  width: 14px;
  height: 14px;
  color: #7b6299;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.toolbar-link {
  font-size: 12px;
  font-weight: 600;
  color: #513995;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #dcd3e5;
  transition: all 0.15s ease;
}

.toolbar-link:hover {
  background: #f9f5fc;
  border-color: #baa6c6;
}

/* 2. 报纸版面与右侧工具栏容器 */
.reading-viewport-container {
  position: relative;
  display: flex;
}

.reading-page-viewport {
  flex: 1;
  max-height: 720px;
  overflow-y: auto;
  padding: 36px 44px;
  box-sizing: border-box;
}

.citation-newspaper {
  max-width: 1100px;
  margin: 0 auto;
  color: #302838;
  font-family: var(--font-serif);
  line-height: 1.85;
}

.media-card-heading {
  margin-bottom: 24px;
  border-bottom: 2px solid #302838;
  padding-bottom: 16px;
}

.media-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #74528e;
  display: block;
  margin-bottom: 6px;
}

.media-card-heading h2 {
  font-size: 32px;
  font-weight: 750;
  color: #18141f;
  margin: 0 0 8px;
  line-height: 1.25;
}

.media-card-heading p {
  margin: 0;
  font-size: 15px;
  color: #73657e;
  font-family: var(--font-sans);
}

/* 多媒体 Tab 导航 */
.media-guide-tabs {
  display: flex;
  gap: 8px;
  margin: 0 0 20px;
  flex-wrap: wrap;
}

.guide-tab-btn {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  padding: 9px 18px;
  border-radius: 12px;
  border: 1px solid #dcd5e8;
  background: #ffffff;
  color: #654987;
  cursor: pointer;
  transition: all 0.2s ease;
}

.guide-tab-btn:hover {
  background: #f3ecf8;
  transform: translateY(-1px);
}

.guide-tab-btn.active {
  background: #35206d;
  color: #ffffff;
  border-color: #35206d;
  box-shadow: 0 4px 12px rgba(53, 32, 109, 0.2);
}

/* 场景图文 */
.media-guide-scene {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(280px, 1fr);
  gap: 32px;
  align-items: center;
}

.media-guide-visual {
  min-width: 0;
}

/* 视频播放器外壳 */
.media-video-wrap {
  position: relative;
  background: #081019;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: inset 2px 3px 8px rgba(0, 0, 0, 0.35);
  line-height: 0;
}

.media-video-wrap video {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: contain;
  background: #081019;
}

.media-play {
  position: absolute;
  left: 24px;
  bottom: 24px;
  padding: 11px 20px;
  background: #74528e;
  color: #ffffff;
  border: 1px solid #cdb9dd;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;
}

.media-play:hover {
  background: #5d3f74;
  transform: scale(1.03);
}

.media-credit {
  font-family: var(--font-sans);
  font-size: 12px;
  color: #73657e;
  margin: 10px 0 0;
  line-height: 1.6;
}

.figure-frame {
  display: block;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  text-decoration: none;
  border: 1px solid #e2daea;
}

.figure-frame img {
  display: block;
  width: 100%;
  max-height: 440px;
  object-fit: contain;
  border-radius: 8px;
}

.figure-frame span {
  display: block;
  text-align: right;
  font-size: 12px;
  color: #74528e;
  margin-top: 8px;
  font-family: var(--font-sans);
}

/* 解说区 */
.media-guide-explanation {
  font-family: var(--font-sans);
}

.media-eyebrow {
  font-size: 12px;
  font-weight: 700;
  color: #74528e;
  display: block;
  margin-bottom: 6px;
}

.media-guide-explanation h3 {
  font-size: 26px;
  font-family: var(--font-serif);
  font-weight: 700;
  color: #18141f;
  margin: 0 0 12px;
  line-height: 1.35;
}

.media-simple {
  font-size: 16px;
  line-height: 1.8;
  color: #3b2853;
  margin: 0 0 18px;
}

.media-look, .media-boundary {
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  font-size: 13px;
  line-height: 1.7;
}

.media-look {
  background: #ffffff;
  border: 1px solid #e5dee9;
}
.media-look span {
  font-weight: 700;
  color: #35206d;
  display: block;
  margin-bottom: 4px;
}

.media-boundary {
  background: #fdf5f4;
  border: 1px solid #f1dedc;
}
.media-boundary span {
  font-weight: 700;
  color: #9e2a2b;
  display: block;
  margin-bottom: 4px;
}

.media-source-link {
  display: inline-block;
  font-size: 13px;
  color: #74528e;
  font-weight: 600;
  margin-top: 6px;
}

/* 章节阅读条目 */
.media-detail-heading {
  margin: 40px 0 16px;
  font-size: 20px;
  font-family: var(--font-serif);
  color: #18141f;
  border-top: 1px solid #ddd5e5;
  padding-top: 24px;
}

.news-reading-strip {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 24px;
}

.news-reading-strip a {
  padding: 8px 14px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #ded5e8;
  color: #654987;
  font-size: 13px;
  font-family: var(--font-sans);
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
}

.news-reading-strip a:hover {
  background: #f3ecf8;
}

/* 章节正文 */
.news-guide-story {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e5dee9;
  margin-bottom: 20px;
}

.news-story-heading span {
  font-size: 11px;
  font-family: var(--font-mono);
  color: #74528e;
  font-weight: 700;
}

.news-story-heading h3 {
  font-size: 22px;
  font-family: var(--font-serif);
  margin: 6px 0 16px;
  color: #18141f;
}

.news-illustrated-spread {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 24px;
  align-items: start;
}

.edition-figure img {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #e2daea;
}

.edition-figure figcaption {
  font-size: 12px;
  color: #8c8299;
  margin-top: 8px;
  font-family: var(--font-sans);
}

.news-guide-copy p {
  font-size: 14px;
  line-height: 1.85;
  color: #3b2853;
  margin-bottom: 14px;
}

.edition-evidence a {
  font-size: 12px;
  color: #74528e;
  text-decoration: underline;
  font-weight: 600;
  font-family: var(--font-sans);
}

/* 底部 */
.news-footer {
  margin-top: 36px;
  padding-top: 24px;
  border-top: 3px double #74528e;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}

.news-footer h3 {
  font-size: 20px;
  margin: 0 0 12px;
}

.news-footer p {
  font-size: 14px;
  color: #554467;
  font-family: var(--font-sans);
}

/* 3. 右侧悬浮阅读工具栏 (对齐原版 reading-mode-switch) */
.reading-tools {
  width: 54px;
  background: #f7f4fa;
  border-left: 1px solid #e7dff0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 8px;
  gap: 16px;
  box-sizing: border-box;
}

.reading-mode-switch {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mode-switch-btn {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #ded5e8;
  background: #ffffff;
  color: #74528e;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 2px 5px rgba(48, 32, 79, 0.06);
}

.mode-switch-btn:hover {
  background: #f4edf9;
  border-color: #a28abe;
}

.mode-switch-btn.active {
  background: #74528e;
  color: #ffffff;
  border-color: #74528e;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.reading-page-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  border-top: 1px solid #ded6e7;
  padding-top: 12px;
}

.page-arrow-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #ded5e8;
  background: #ffffff;
  color: #74528e;
  font-size: 18px;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.page-arrow-btn:hover {
  background: #f4edf9;
}

.page-num-indicator {
  font-family: var(--font-mono);
  font-size: 10px;
  color: #8c8299;
  text-align: center;
}

@media (max-width: 900px) {
  .media-guide-scene, .news-illustrated-spread, .news-footer {
    grid-template-columns: 1fr;
  }
  .reading-tools {
    display: none;
  }
}
</style>
