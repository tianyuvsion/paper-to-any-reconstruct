<template>
  <div class="home-page-root">
    <!-- 顶部导航 -->
    <HomeNavbar />

    <!-- 严格还原的原版外层容器 -->
    <main id="main" tabindex="-1" class="landing product-home">
      <div class="portal">
        <!-- 1. Hero 愿景与提问输入区 -->
        <HomeHero
          ref="heroRef"
          @preview="openPreview"
          @submit="handleQuestionSubmit"
        />

        <!-- 2. EAST 成果知识画廊 -->
        <HomeGallery @preview="openPreview" />

        <!-- 3. 多视角阅读展台 -->
        <HomeExperience @select="openPreview" />

        <!-- 4. 全流程交互导览与常见问答 -->
        <HomeGuide
          @preview="openPreview"
          @prompt="handlePrompt"
        />

        <!-- 5. 尾部收尾 -->
        <section class="portal-final">
          <span aria-hidden="true">✳</span>
          <h2>你的下一个问题，<br />会打开什么？</h2>
          <a class="btn" href="#portalTitle" @click.prevent="scrollToTitle">
            从好奇心开始 ↑
          </a>
        </section>

        <!-- 访客提问拦截弹窗: dialog#portalAuth -->
        <dialog
          id="portalAuth"
          ref="authDialogRef"
          class="portal-dialog portal-auth-dialog"
          aria-labelledby="portalAuthTitle"
        >
          <button
            type="button"
            aria-label="关闭登录提示"
            class="portal-dialog-close"
            @click="closeAuthDialog"
          >
            ×
          </button>
          <div class="portal-auth-art" aria-hidden="true">
            <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
              <g stroke="currentColor" stroke-width="2">
                <rect x="40" y="38" width="103" height="128" rx="18" fill="#e6b8d5" transform="rotate(-18 91 102)"></rect>
                <rect x="80" y="22" width="103" height="138" rx="18" fill="#cbb5f0" transform="rotate(-4 130 88)"></rect>
                <rect x="119" y="36" width="103" height="138" rx="18" fill="#fff9df" transform="rotate(13 170 105)"></rect>
              </g>
              <path d="m166 71 7 19 21 5-21 7-7 22-7-22-20-7 20-5z" fill="currentColor"></path>
              <path d="m149 138 43 10" stroke="currentColor" stroke-width="5"></path>
            </svg>
          </div>
          <p class="portal-kicker">YOUR RESEARCH SPACE</p>
          <h2 id="portalAuthTitle">把好奇心，接着聊。</h2>
          <p>登录或创建账号，进入你的 AI 研读空间。</p>
          <div class="portal-draft-saved">
            <span aria-hidden="true">✓</span> 问题已保留，登录后可确认发送。
          </div>
          <div class="portal-auth-actions">
            <router-link to="/login" class="btn">创建账号</router-link>
            <router-link to="/login" class="btn outline">已有账号，登录</router-link>
          </div>
        </dialog>

        <!-- 成果全功能预览弹窗: dialog#portalPreview -->
        <dialog
          id="portalPreview"
          ref="previewDialogRef"
          class="portal-dialog portal-preview-dialog"
          aria-labelledby="portalPreviewTitle"
        >
          <button
            type="button"
            aria-label="关闭作品预览"
            class="portal-dialog-close"
            @click="closePreviewDialog"
          >
            ×
          </button>
          <p class="portal-kicker">{{ currentPreview?.label }} · EAST</p>
          <h2 id="portalPreviewTitle">{{ currentPreview?.title }}</h2>

          <!-- 内容区分：音频、视频、海报、图文 -->
          <div v-if="activePreviewId === 'audio'" class="portal-audio-player" data-tone="peach">
            <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
              <circle cx="137" cy="97" r="78" fill="#342735"></circle>
              <g fill="none" stroke="#ffdeb2" opacity=".3">
                <circle cx="137" cy="97" r="66"></circle>
                <circle cx="137" cy="97" r="57"></circle>
                <circle cx="137" cy="97" r="47"></circle>
              </g>
              <circle cx="137" cy="97" r="30" fill="#fff3d1"></circle>
              <circle cx="137" cy="97" r="6" fill="#342735"></circle>
              <path d="M212 22h22v88l-29 28" fill="none" stroke="#fff9ef" stroke-width="7" stroke-linecap="round"></path>
            </svg>
            <p>EAST 千秒放电 · 通勤播客</p>
            <audio controls preload="metadata" src=""></audio>
          </div>

          <div v-else-if="activePreviewId === 'video'">
            <div style="background:#17232c; border-radius:18px; padding:60px 20px; text-align:center; color:#fff;">
              <span style="font-size:42px; display:block; margin-bottom:10px;">🎬</span>
              <strong>EAST 真实等离子体放电影像 (00:43)</strong>
            </div>
          </div>

          <div v-else-if="activePreviewId === 'poster'">
            <div style="background:#fff; border:1px solid #d4cde1; border-radius:12px; padding:30px; text-align:center;">
              <span style="font-size:32px; display:block; margin-bottom:10px;">📑</span>
              <strong>EAST 千秒实验完整海报</strong>
            </div>
          </div>

          <div v-else>
            <div class="portal-preview-visual" :data-tone="currentPreview?.tone">
              <div v-if="activePreviewId === 'finding'" class="portal-number">1056<span>秒</span></div>
              <div v-else-if="activePreviewId === 'boundary'" class="portal-equation">1056 s <span>≠</span> 发电</div>
            </div>
            <p class="portal-preview-body">{{ currentPreview?.body }}</p>
          </div>

          <div class="portal-preview-actions">
            <button class="btn" @click="handlePrompt(currentPreview?.question || '')">
              沿着这个问题继续 ↗
            </button>
            <a
              href="https://www.science.org/doi/10.1126/sciadv.abq5273"
              target="_blank"
              rel="noopener"
            >
              核对原文 ↗
            </a>
          </div>
          <p class="portal-art-credit">Paper to Any · 基于 EAST 论文整理与创作</p>
        </dialog>
      </div>
    </main>

    <!-- 页脚 -->
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeNavbar from './components/layout/HomeNavbar.vue'
import HomeFooter from './components/layout/HomeFooter.vue'
import HomeHero from './components/hero/HomeHero.vue'
import HomeGallery from './components/gallery/HomeGallery.vue'
import HomeExperience from './components/experience/HomeExperience.vue'
import HomeGuide from './components/guide/HomeGuide.vue'

const router = useRouter()
const authStore = useAuthStore()

const heroRef = ref<InstanceType<typeof HomeHero> | null>(null)
const authDialogRef = ref<HTMLDialogElement | null>(null)
const previewDialogRef = ref<HTMLDialogElement | null>(null)

const activePreviewId = ref('finding')

const previewDefinitions: Record<string, {
  id: string
  label: string
  title: string
  tone: string
  question: string
  body?: string
}> = {
  finding: {
    id: 'finding',
    label: '发现卡片',
    title: '把千秒，读成一个发现。',
    tone: 'lilac',
    question: 'EAST 的 1056 秒实验做到了什么？',
    body: 'EAST 实现了 1056 秒的高约束等离子体运行。这个结果展示了长时间持续运行的能力；持续时间本身不能证明净发电。'
  },
  audio: {
    id: 'audio',
    label: '通勤播客',
    title: '给眼睛放个假。',
    tone: 'peach',
    question: '帮我梳理 EAST 千秒实验的核心结果和研究边界。'
  },
  video: {
    id: 'video',
    label: '论文影像',
    title: '让实验，在眼前发生。',
    tone: 'ink',
    question: '这段 EAST 讲解中，哪些结论可以回到原文核对？'
  },
  boundary: {
    id: 'boundary',
    label: '证据卡片',
    title: '好奇，也可以很严谨。',
    tone: 'lime',
    question: '为什么 EAST 的千秒运行不能直接证明聚变发电？',
    body: '持续运行、能量增益和电站可用性是不同的问题。这篇研究推进了长脉冲高约束运行；净能量增益、材料寿命与商业化时间仍需要分别核对证据。'
  },
  poster: {
    id: 'poster',
    label: '一页海报',
    title: '把理解，放大一点。',
    tone: 'pink',
    question: '如何把 EAST 实验的结果和边界讲清楚？'
  },
  source: {
    id: 'source',
    label: '原文导读',
    title: '每一个“为什么”，都有下一页。',
    tone: 'mint',
    question: '这篇 EAST 论文应该怎么读？',
    body: '先辨认研究问题与主要结果，再沿实验条件、诊断和图表核对。读到推论时，留意它是否超出了实验实际报告的范围。'
  }
}

const currentPreview = computed(() => previewDefinitions[activePreviewId.value] || previewDefinitions.finding)

function openPreview(id: string) {
  activePreviewId.value = id
  previewDialogRef.value?.showModal()
}

function closePreviewDialog() {
  previewDialogRef.value?.close()
}

function closeAuthDialog() {
  authDialogRef.value?.close()
}

function handlePrompt(text: string) {
  closePreviewDialog()
  heroRef.value?.fillQuestion(text)
  scrollToTitle()
}

function scrollToTitle() {
  const el = document.getElementById('portalTitle')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function handleQuestionSubmit(question: string) {
  if (authStore.isAuthenticated) {
    router.push({
      path: '/workspace',
      query: { question: encodeURIComponent(question) }
    })
  } else {
    // 弹出未登录保留问题并提示对话框
    authDialogRef.value?.showModal()
  }
}
</script>

<style scoped>
.home-page-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
