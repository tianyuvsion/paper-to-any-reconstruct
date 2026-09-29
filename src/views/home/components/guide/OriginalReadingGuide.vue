<template>
  <div class="reading-guide-container">
    <!-- 1. 顶部章节快捷选择栏 (对齐截图 1，彻底解决原生 select 丑陋 Bug) -->
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

    <!-- 2. 主体报刊版面 (直接展示大标题，移除了上方多余的视频横栏) -->
    <article
      class="visual-edition citation-newspaper guide-newspaper reading-overview"
      data-reading-id="originalReadingGuide"
    >
      <h2 class="reading-section-title">沿着图片，继续了解</h2>

      <!-- 7 个完整章节 (完整覆盖原始论文全部 1~9 页) -->
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
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
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

const activeSectionId = ref(guideSections[0]?.id || 'starting-question')
const activeFigureIndices = reactive<Record<string, number>>({})

// 初始化每个章节的默认第 0 张图
guideSections.forEach((s) => {
  activeFigureIndices[s.id] = 0
})

function handleSelectChange() {
  const el = document.getElementById(`reading-${activeSectionId.value}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 监听滚动自动联动顶部下拉栏当前激活项
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('reading-', '')
          activeSectionId.value = id
        }
      }
    },
    { threshold: 0.25 }
  )

  guideSections.forEach((s) => {
    const el = document.getElementById(`reading-${s.id}`)
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
/* 整个容器 */
.reading-guide-container {
  width: 100%;
  margin: 0 auto;
  background: #fdfcfe;
  border-radius: 24px;
  border: 1px solid #e2d9ec;
  box-shadow: 0 12px 40px rgba(48, 32, 79, 0.05);
  overflow: hidden;
  box-sizing: border-box;
}

/* 1. 顶部章节选择栏 (对齐截图 1) */
.reading-toolbar {
  height: 58px;
  padding: 0 28px;
  background: linear-gradient(180deg, #f7f4ee 0%, #f3ebf6 100%);
  border-bottom: 1px solid #ddd3e5;
  display: flex;
  align-items: center;
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

/* 2. 主体报刊版面 */
.citation-newspaper {
  max-width: 1140px;
  margin: 0 auto;
  padding: 36px 40px 48px;
  color: #302838;
  font-family: var(--font-serif);
  line-height: 1.85;
  box-sizing: border-box;
}

/* 页面大标题：沿着图片，继续了解 */
.reading-section-title {
  font-size: 32px;
  font-weight: 750;
  color: #1a1424;
  margin: 0 0 32px;
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
  scroll-margin-top: 70px;
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
  font-size: 26px;
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
  .news-illustrated-spread, .news-footer {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
