<template>
  <div class="reading-guide-container">
    <!-- 1. 顶部章节快捷选择栏 (物理浮雕定制，彻底消除系统原生黑框) -->
    <header class="reading-toolbar">
      <div class="template-chapters">
        <label for="chapterSelect" class="chapters-label">阅读章节</label>
        <div class="chapter-select-shell">
          <select
            id="chapterSelect"
            v-model="activeSectionId"
            class="carved-chapter-select"
            aria-label="选择阅读章节"
            @change="handleSelectChange"
          >
            <option value="first-screen">先看短片 · 视频讲解试看</option>
            <option
              v-for="section in guideSections"
              :key="section.id"
              :value="section.id"
            >
              {{ section.title }}
            </option>
          </select>
          <!-- 优雅内嵌的矢量向下小箭头 -->
          <svg class="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </header>

    <!-- 2. 内部独立纵向滚动视口 (写死原版 650px 高度，默认呈现第 1 屏视频，支持向下滑动与下拉筛选) -->
    <div ref="viewportRef" class="reading-scroll-viewport" @scroll="handleViewportScroll">
      <article
        class="visual-edition citation-newspaper guide-newspaper reading-overview"
        data-reading-id="originalReadingGuide"
      >
        <!-- 【最开始的第一屏】：43秒视频讲解短片与 4 步多媒体讲解 Tab -->
        <section id="reading-first-screen" class="media-guide-first-screen">
          <header class="media-card-heading">
            <span class="media-tag">原文导读 · EAST 千秒实验</span>
            <h2 id="readingTitle">先看懂，再回到原文</h2>
            <p>看一段讲解，切换几张关键图，把这次实验连起来。</p>
          </header>

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
              <section v-show="currentStep === 0" class="media-guide-scene reading-slide-scene">
                <div class="media-guide-visual">
                  <div class="media-video-wrap">
                    <video
                      controls
                      playsinline
                      preload="metadata"
                      :poster="steps[0].poster"
                      :src="steps[0].video"
                      aria-label="EAST 证据讲解试看片"
                    >
                      <source :src="steps[0].video" type="video/mp4" />
                      您的浏览器暂不支持该视频播放。
                    </video>
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
                </div>
              </section>

              <!-- 场景 1: 共同时间轴 图 1 -->
              <section v-show="currentStep === 1" class="media-guide-scene reading-slide-scene">
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
                </div>
              </section>

              <!-- 场景 2: 从中心到边缘 图 6 -->
              <section v-show="currentStep === 2" class="media-guide-scene reading-slide-scene">
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
                </div>
              </section>

              <!-- 场景 3: 两个维度一起看 图 9 -->
              <section v-show="currentStep === 3" class="media-guide-scene reading-slide-scene">
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
                </div>
              </section>
            </div>
          </section>
        </section>

        <!-- 分割大标题：沿着图片，继续了解 -->
        <h2 class="reading-section-title">沿着图片，继续了解</h2>

        <!-- 7 个完整学术图文章节 (覆盖原始论文全部 1~9 页) -->
        <div class="chapters-stream">
          <section
            v-for="(sec, sIdx) in guideSections"
            :id="`reading-${sec.id}`"
            :key="sec.id"
            class="news-guide-story edition-chapter"
            :data-chapter="sIdx"
          >
            <!-- 章节小眉标与主标题 -->
            <header class="news-story-heading">
              <span class="chapter-kicker">阅读 {{ sec.chapterNum }} · 原文与解释对照</span>
              <h3 class="chapter-title">{{ sec.title }}</h3>
            </header>

            <!-- 左右图文并排布局 -->
            <div class="news-illustrated-spread" :class="{ 'single-col': !sec.figures.length }">
              <!-- 左侧：深度学术论述与原文链接 -->
              <div class="news-guide-copy">
                <p v-for="(p, pIdx) in sec.paragraphs" :key="pIdx">
                  {{ p }}
                </p>

                <!-- 原文依据线索 -->
                <div v-if="sec.evidence && sec.evidence.length" class="edition-evidence">
                  <a
                    v-for="(ev, eIdx) in sec.evidence"
                    :key="eIdx"
                    :href="ev.url || `/ui/papers/east-super-i-mode/source/sciadv.abq5273.PMC9821864.pdf#page=${ev.page}`"
                    target="_blank"
                    rel="noopener"
                    class="evidence-link"
                  >
                    原文 {{ ev.page }} 页 · {{ ev.label }} ↗
                  </a>
                </div>
              </div>

              <!-- 右侧：论文原图板 (支持多图切换) -->
              <div v-if="sec.figures && sec.figures.length" class="news-plate">
                <!-- 多图药丸切换按钮 -->
                <div class="news-plate-tabs" role="group" :aria-label="`${sec.title} 原图`">
                  <button
                    v-for="(fig, fIdx) in sec.figures"
                    :key="fIdx"
                    type="button"
                    class="plate-tab-btn"
                    :class="{ active: (activeFigureIndices[sec.id] || 0) === fIdx }"
                    :aria-pressed="(activeFigureIndices[sec.id] || 0) === fIdx"
                    @click="activeFigureIndices[sec.id] = fIdx"
                  >
                    {{ fig.caption }}
                  </button>
                </div>

                <!-- 当前选中的原图展示 -->
                <figure class="edition-figure">
                  <a
                    :href="`/ui/papers/east-super-i-mode/assets/figures/${sec.figures[activeFigureIndices[sec.id] || 0].file}`"
                    target="_blank"
                    rel="noopener"
                    class="figure-zoom-link"
                    title="在新标签页放大原图"
                  >
                    <img
                      :src="`/ui/papers/east-super-i-mode/assets/figures/${sec.figures[activeFigureIndices[sec.id] || 0].file}`"
                      :alt="sec.figures[activeFigureIndices[sec.id] || 0].caption"
                      loading="lazy"
                    />
                    <span class="zoom-badge">放大原图 ↗</span>
                  </a>
                  <figcaption>
                    {{ sec.figures[activeFigureIndices[sec.id] || 0].caption }}
                    <a
                      :href="`/ui/papers/east-super-i-mode/source/sciadv.abq5273.PMC9821864.pdf#page=${sec.figures[activeFigureIndices[sec.id] || 0].page}`"
                      target="_blank"
                      rel="noopener"
                      class="fig-source-link"
                    >
                      第 {{ sec.figures[activeFigureIndices[sec.id] || 0].page }} 页 ↗
                    </a>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>
        </div>

        <!-- 底部回到原文 -->
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
              <a
                href="/ui/papers/east-super-i-mode/source/sciadv.abq5273.PMC9821864.pdf#page=8"
                target="_blank"
                rel="noopener"
                class="evidence-link"
              >
                打开本篇论文 PDF（第 8 页核对诊断方法与比较图） ↗
              </a>
            </div>
          </div>
        </footer>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import guideSectionsData from './guideSections.json'

interface GuideFigure {
  caption: string
  file: string
  page: number
}

interface GuideEvidence {
  label: string
  page: number
  url?: string
}

interface GuideSection {
  id: string
  chapterNum: string
  title: string
  paragraphs: string[]
  figures: GuideFigure[]
  evidence: GuideEvidence[]
}

const guideSections: GuideSection[] = guideSectionsData

const viewportRef = ref<HTMLElement | null>(null)
const activeSectionId = ref('first-screen')
const activeFigureIndices = reactive<Record<string, number>>({})

const currentStep = ref(0)

// 初始化每个章节的默认第 0 张图
guideSections.forEach((s) => {
  activeFigureIndices[s.id] = 0
})

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

// 顶部下拉框切换：在内部视口中精确平滑滚动
function handleSelectChange() {
  if (!viewportRef.value) return
  if (activeSectionId.value === 'first-screen') {
    viewportRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const target = document.getElementById(`reading-${activeSectionId.value}`)
  if (target) {
    const containerTop = viewportRef.value.getBoundingClientRect().top
    const targetTop = target.getBoundingClientRect().top
    const offset = targetTop - containerTop + viewportRef.value.scrollTop
    viewportRef.value.scrollTo({ top: offset, behavior: 'smooth' })
  }
}

// 内部向下滑动阅读时，下拉栏文字自动跟随当前视口中可见的章节
function handleViewportScroll() {
  if (!viewportRef.value) return
  if (viewportRef.value.scrollTop < 280) {
    activeSectionId.value = 'first-screen'
    return
  }
  const containerTop = viewportRef.value.getBoundingClientRect().top
  for (const s of guideSections) {
    const el = document.getElementById(`reading-${s.id}`)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top - containerTop <= 100 && rect.bottom - containerTop > 100) {
        activeSectionId.value = s.id
        break
      }
    }
  }
}
</script>

<style scoped>
/* 整个容器：写死原版 650px 视口高度，默认只呈现第1屏视频，支持向下滑动与下拉筛选读取 */
.reading-guide-container {
  width: 100%;
  height: 650px;
  margin: 0 auto;
  background: #fdfcfe;
  border-radius: 24px;
  border: 1px solid #e2d9ec;
  box-shadow: 0 12px 40px rgba(48, 32, 79, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

/* 1. 顶部章节选择栏 (对齐截图 1，固定在顶部) */
.reading-toolbar {
  flex: none;
  height: 58px;
  padding: 0 28px;
  background: linear-gradient(180deg, #f7f4ee 0%, #f3ebf6 100%);
  border-bottom: 1px solid #ddd3e5;
  display: flex;
  align-items: center;
  z-index: 10;
  box-sizing: border-box;
}

.template-chapters {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chapters-label {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: #58446e;
  white-space: nowrap;
}

/* 物理浮雕定制章节选择框 (Carved Academic Select - 消除系统原生黑框) */
.chapter-select-shell {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.carved-chapter-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: min(100%, 460px);
  padding: 8px 36px 8px 14px;
  font-size: 13.5px;
  font-weight: 650;
  font-family: inherit;
  color: #2b1a52;
  background: #ffffff;
  border: 1px solid #c8b9db;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(48, 32, 79, 0.08), inset 0 -1px 2px rgba(48, 32, 79, 0.04);
  cursor: pointer;
  outline: none;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-sizing: border-box;
}

.carved-chapter-select:hover {
  border-color: #9275b9;
  background: #fbf9fd;
  box-shadow: 0 4px 12px rgba(114, 84, 179, 0.14);
}

.carved-chapter-select:focus-visible {
  border-color: #7b58ab;
  box-shadow: 0 0 0 3px rgba(123, 88, 171, 0.22), 0 4px 14px rgba(114, 84, 179, 0.16);
}

.select-chevron {
  position: absolute;
  right: 13px;
  width: 14px;
  height: 14px;
  color: #684f88;
  pointer-events: none;
}

/* 内部独立纵向滚动视口 */
.reading-scroll-viewport {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #d8cde3 transparent;
}

.reading-scroll-viewport::-webkit-scrollbar {
  width: 6px;
}

.reading-scroll-viewport::-webkit-scrollbar-thumb {
  background: #d8cde3;
  border-radius: 3px;
}

/* 2. 主体报刊版面 */
.citation-newspaper {
  max-width: 1140px;
  margin: 0 auto;
  padding: 32px 40px 48px;
  color: #302838;
  font-family: var(--font-serif);
  line-height: 1.85;
  box-sizing: border-box;
}

/* 第一屏：短片与 4 步讲解 */
.media-guide-first-screen {
  margin-bottom: 40px;
}

.media-card-heading {
  margin-bottom: 20px;
  border-bottom: 1px solid #e2daea;
  padding-bottom: 14px;
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
  font-size: 30px;
  font-weight: 750;
  color: #18141f;
  margin: 0 0 6px;
  line-height: 1.25;
}

.media-card-heading p {
  margin: 0;
  font-size: 14.5px;
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
  font-size: 13.5px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid #dcd5e8;
  background: #ffffff;
  color: #654987;
  cursor: pointer;
  transition: all 0.15s ease;
}

.guide-tab-btn:hover {
  background: #f3ecf8;
}

.guide-tab-btn.active {
  background: #35206d;
  color: #ffffff;
  border-color: #35206d;
  box-shadow: 0 3px 10px rgba(53, 32, 109, 0.2);
}

/* 场景左右布局 */
.media-guide-scene {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 1fr);
  gap: 28px;
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
  max-height: 400px;
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
  font-size: 24px;
  font-family: var(--font-serif);
  font-weight: 700;
  color: #18141f;
  margin: 0 0 10px;
  line-height: 1.35;
}

.media-simple {
  font-size: 15.5px;
  line-height: 1.8;
  color: #3b2853;
  margin: 0 0 16px;
}

.media-look, .media-boundary {
  display: grid;
  grid-template-columns: 78px 1fr;
  gap: 16px;
  align-items: baseline;
  padding: 13px 0;
  margin: 0;
  border-top: 1px solid #eee7f3;
  background: none;
  font-size: 14px;
  line-height: 1.8;
}

.media-look span {
  font-family: var(--font-sans);
  font-weight: 650;
  color: #55416d;
  margin: 0;
  white-space: nowrap;
}

.media-boundary span {
  font-family: var(--font-sans);
  font-weight: 650;
  color: #654987;
  margin: 0;
  white-space: nowrap;
}

.media-look p, .media-boundary p {
  margin: 0;
  color: #2f273b;
}

/* 页面大标题：沿着图片，继续了解 */
.reading-section-title {
  font-size: 30px;
  font-weight: 750;
  color: #1a1424;
  margin: 40px 0 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2daea;
  font-family: var(--font-serif);
}

.chapters-stream {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* 单个章节块 */
.news-guide-story {
  padding-top: 10px;
  border-bottom: 1px solid #eee7f3;
  padding-bottom: 36px;
  scroll-margin-top: 20px;
}

.news-story-heading {
  margin-bottom: 20px;
}

.chapter-kicker {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
  color: #74528e;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 6px;
}

.chapter-title {
  font-size: 25px;
  font-family: var(--font-serif);
  font-weight: 750;
  color: #18141f;
  margin: 0;
  line-height: 1.35;
}

/* 左右分栏布局 (100% 对齐截图 1) */
.news-illustrated-spread {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 36px;
  align-items: start;
}

.news-illustrated-spread.single-col {
  grid-template-columns: 1fr;
}

/* 左侧正文描述 */
.news-guide-copy p {
  font-size: 15.5px;
  line-height: 1.95;
  color: #2d2638;
  margin: 0 0 16px;
  text-align: justify;
}

.edition-evidence {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.evidence-link {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  color: #654987;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.evidence-link:hover {
  color: #35206d;
}

/* 右侧原图卡片 */
.news-plate {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 多图切换药丸按钮组 */
.news-plate-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.plate-tab-btn {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 650;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #d4c8e1;
  background: #ffffff;
  color: #624b7b;
  cursor: pointer;
  transition: all 0.15s ease;
}

.plate-tab-btn:hover {
  background: #f4edf9;
}

.plate-tab-btn.active {
  background: #654987;
  color: #ffffff;
  border-color: #654987;
  box-shadow: 0 2px 8px rgba(101, 73, 135, 0.25);
}

/* 原图展示框 */
.edition-figure {
  margin: 0;
  background: #ffffff;
  border: 1px solid #ded5e7;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(48, 32, 79, 0.05);
}

.figure-zoom-link {
  display: block;
  text-decoration: none;
  position: relative;
}

.figure-zoom-link img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: contain;
  border-radius: 8px;
}

.zoom-badge {
  display: block;
  text-align: right;
  font-family: var(--font-sans);
  font-size: 11px;
  color: #74528e;
  margin-top: 8px;
  font-weight: 600;
}

.edition-figure figcaption {
  font-family: var(--font-sans);
  font-size: 12px;
  color: #73657e;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fig-source-link {
  color: #74528e;
  text-decoration: none;
  font-weight: 600;
}

.fig-source-link:hover {
  text-decoration: underline;
}

/* 底部收尾 */
.news-footer {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 3px double #74528e;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.news-footer h3 {
  font-size: 20px;
  margin: 0 0 12px;
  color: #18141f;
}

.news-footer h4 {
  font-size: 15px;
  margin: 0 0 8px;
  font-family: var(--font-sans);
  color: #35206d;
}

.news-footer p {
  font-size: 14px;
  color: #554467;
  font-family: var(--font-sans);
  line-height: 1.8;
}

@media (max-width: 900px) {
  .media-guide-scene, .news-illustrated-spread, .news-footer {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
