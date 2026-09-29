<template>
  <div class="reading-guide-wrapper">
    <article
      class="visual-edition citation-newspaper guide-newspaper multimedia-card reading-overview"
      data-reading-id="originalReadingGuide"
      data-reading-ready="true"
      data-edition-layout="guide-newspaper"
    >
      <!-- 头部标题 -->
      <header class="media-card-heading">
        <span class="media-tag">原文导读</span>
        <h2 id="readingTitle">先看懂，再回到原文</h2>
        <p>看一段讲解，切换几张关键图，把这次实验连起来。</p>
      </header>

      <!-- 导读多媒体交互区 -->
      <section class="media-guide" aria-label="看图理解这篇研究">
        <!-- 4 步 Tab 导航 -->
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
          <!-- 步骤 0: 试看片视频 -->
          <section v-show="currentStep === 0" class="media-guide-scene reading-slide-scene">
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
                  您的浏览器暂不支持播放该格式视频。
                </video>
                <!-- 浮动播放按钮 -->
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

          <!-- 步骤 1: 共同时间轴 图 1 -->
          <section v-show="currentStep === 1" class="media-guide-scene reading-slide-scene">
            <div class="media-guide-visual">
              <a :href="steps[1].image" target="_blank" rel="noopener" class="figure-link">
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

          <!-- 步骤 2: 从中心到边缘 图 6 -->
          <section v-show="currentStep === 2" class="media-guide-scene reading-slide-scene">
            <div class="media-guide-visual">
              <a :href="steps[2].image" target="_blank" rel="noopener" class="figure-link">
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

          <!-- 步骤 3: 两个维度一起看 图 9 -->
          <section v-show="currentStep === 3" class="media-guide-scene reading-slide-scene">
            <div class="media-guide-visual">
              <a :href="steps[3].image" target="_blank" rel="noopener" class="figure-link">
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

      <!-- 7 篇深度图文对照文章 -->
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

      <!-- 章节 01 -->
      <section id="reading-starting-question" class="news-guide-story edition-chapter">
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
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
    console.warn('播放受阻，请再次点击:', err)
    playBtnText.value = '▶ 再次点击播放'
  }
}

function handleVideoEnded() {
  isPlaying.value = false
  playBtnText.value = '↻ 再看一次'
}
</script>

<style scoped>
/* 100% 对齐原版 reference-newspaper.css & model-newspaper.css */
.reading-guide-wrapper {
  width: 100%;
  margin: 0 auto;
}

.citation-newspaper {
  max-width: 1160px;
  margin: 0 auto;
  padding: 30px 40px 44px;
  background: #f8f6fa;
  color: #302838;
  border-radius: 24px;
  border: 1px solid #dcd3e5;
  box-shadow: 0 10px 30px rgba(48, 32, 79, 0.06);
  font-family: var(--font-serif);
  line-height: 1.85;
  box-sizing: border-box;
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

/* Tab 切换 */
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

/* 场景左右布局 */
.media-guide-scene {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(280px, 1fr);
  gap: 32px;
  align-items: center;
}

.media-guide-visual {
  min-width: 0;
}

/* 视频外壳 */
.media-video-wrap {
  position: relative;
  background: #081019;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: inset 2px 3px 8px rgba(0, 0, 0, 0.25);
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
  padding: 10px 18px;
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
  transform: scale(1.02);
}

.media-credit {
  font-family: var(--font-sans);
  font-size: 12px;
  color: #73657e;
  margin: 10px 0 0;
  line-height: 1.6;
}

.figure-link {
  display: block;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  text-decoration: none;
  border: 1px solid #e2daea;
}

.figure-link img {
  display: block;
  width: 100%;
  max-height: 440px;
  object-fit: contain;
  border-radius: 8px;
}

.figure-link span {
  display: block;
  text-align: right;
  font-size: 12px;
  color: #74528e;
  margin-top: 8px;
  font-family: var(--font-sans);
}

/* 右侧解说 */
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

/* 章节横条 */
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

@media (max-width: 900px) {
  .media-guide-scene, .news-illustrated-spread {
    grid-template-columns: 1fr;
  }
}
</style>
