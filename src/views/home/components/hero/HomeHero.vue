<template>
  <section class="portal-hero" aria-labelledby="portalTitle">
    <!-- 背景微颗粒层 -->
    <div class="portal-hero-grain" aria-hidden="true"></div>

    <!-- 浮动星标 -->
    <span class="portal-spark spark-one" aria-hidden="true">✳</span>
    <span class="portal-spark spark-two" aria-hidden="true">✦</span>

    <!-- 左侧悬浮艺术徽标：知识卡片 -->
    <div class="portal-hero-art hero-art-left">
      <button
        type="button"
        data-portal-preview="finding"
        aria-label="预览知识卡片"
        @click="$emit('preview', 'finding')"
      >
        <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
          <g stroke="currentColor" stroke-width="2">
            <rect x="40" y="38" width="103" height="128" rx="18" fill="#e6b8d5" transform="rotate(-18 91 102)"></rect>
            <rect x="80" y="22" width="103" height="138" rx="18" fill="#cbb5f0" transform="rotate(-4 130 88)"></rect>
            <rect x="119" y="36" width="103" height="138" rx="18" fill="#fff9df" transform="rotate(13 170 105)"></rect>
          </g>
          <path d="m166 71 7 19 21 5-21 7-7 22-7-22-20-7 20-5z" fill="currentColor"></path>
          <path d="m149 138 43 10" stroke="currentColor" stroke-width="5"></path>
        </svg>
        <span>把发现，翻成卡片 ↗</span>
      </button>
    </div>

    <!-- 右侧悬浮艺术徽标：论文播客 -->
    <div class="portal-hero-art hero-art-right">
      <button
        type="button"
        data-portal-preview="audio"
        aria-label="试听论文播客"
        @click="$emit('preview', 'audio')"
      >
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
        <span>让论文，有声音 ↗</span>
      </button>
    </div>

    <!-- 眉题与标题 -->
    <p class="portal-kicker">PAPER → POSSIBILITY</p>
    <h1 id="portalTitle">让好奇心，<br><em>有声有色。</em></h1>
    <p class="portal-intro">
      从一个问题，到一篇论文。<br class="portal-mobile-break">
      把理解变成卡片、声音与影像。
    </p>

    <!-- 核心提问表单 -->
    <form id="portalQuestionForm" class="portal-composer" @submit.prevent="handleSubmit">
      <div class="portal-context" :hidden="!contextVisible">
        引用 EAST 千秒实验
        <button
          type="button"
          data-portal-clear-context=""
          aria-label="移除论文引用"
          @click="contextVisible = false"
        >
          ×
        </button>
      </div>

      <label class="sr-only" for="portalQuestion">你想研究什么？</label>
      <textarea
        id="portalQuestion"
        ref="textareaRef"
        v-model="questionText"
        name="question"
        rows="2"
        maxlength="700"
        placeholder="输入你想研究的问题，例如：这项结论适用于哪些条件？"
        @keydown.enter="handleEnter"
      ></textarea>

      <div class="portal-compose-tools">
        <router-link to="/workspace" class="portal-import">
          <span aria-hidden="true">＋</span> 选择我的论文
        </router-link>
        <span class="portal-compose-note">下一步：选择原文，确认研究计划</span>
        <button
          type="submit"
          aria-label="继续提问"
          :disabled="!questionText.trim()"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M12 20V4m-7 7 7-7 7 7"></path>
          </svg>
        </button>
      </div>
      <p id="portalQuestionError" role="alert" hidden></p>
    </form>

    <!-- 启发式快捷提问 -->
    <div class="portal-starters" aria-label="试试这样问">
      <button
        type="button"
        data-portal-prompt="EAST 的千秒实验做到了什么？"
        @click="fillQuestion('EAST 的千秒实验做到了什么？')"
      >
        EAST 的千秒实验做到了什么？<span aria-hidden="true">↗</span>
      </button>
      <button
        type="button"
        data-portal-prompt="这项研究离发电还有多远？"
        @click="fillQuestion('这项研究离发电还有多远？')"
      >
        这项研究离发电还有多远？<span aria-hidden="true">↗</span>
      </button>
      <button
        type="button"
        data-portal-prompt="这篇论文应该怎么读？"
        @click="fillQuestion('这篇论文应该怎么读？')"
      >
        这篇论文应该怎么读？<span aria-hidden="true">↗</span>
      </button>
    </div>

    <!-- 体验完整工作台大按钮（原版核心入口） -->
    <router-link to="/workspace" class="btn home-east-demo">
      体验完整 EAST 研究工作台 →
    </router-link>

    <!-- 4 个成果格式条 -->
    <div class="portal-format-strip" aria-label="探索理解的形式">
      <span>先体验一份示例</span>

      <button data-portal-preview="finding" type="button" @click="$emit('preview', 'finding')">
        <span class="home-format-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="5" y="3" width="14" height="18" rx="3"></rect>
            <path d="M9 8h6M9 12h6M9 16h3"></path>
          </svg>
        </span>
        <span>知识卡片</span>
        <span class="home-button-note">预览示例</span>
      </button>

      <button data-portal-preview="audio" type="button" @click="$emit('preview', 'audio')">
        <span class="home-format-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 14v-3a8 8 0 0 1 16 0v3"></path>
            <rect x="3" y="12" width="4" height="8" rx="2"></rect>
            <rect x="17" y="12" width="4" height="8" rx="2"></rect>
          </svg>
        </span>
        <span>听觉叙事</span>
        <span class="home-button-note">预览示例</span>
      </button>

      <button data-portal-preview="video" type="button" @click="$emit('preview', 'video')">
        <span class="home-format-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="3"></rect>
            <path d="m10 8 6 4-6 4Z"></path>
          </svg>
        </span>
        <span>科学影像</span>
        <span class="home-button-note">预览示例</span>
      </button>

      <button data-portal-preview="poster" type="button" @click="$emit('preview', 'poster')">
        <span class="home-format-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2"></rect>
            <path d="M8 7h8M8 11h3M8 17l4-4 4 4"></path>
          </svg>
        </span>
        <span>视觉表达</span>
        <span class="home-button-note">预览示例</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'preview', previewId: string): void
  (e: 'submit', question: string): void
}>()

const questionText = ref('')
const contextVisible = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function handleEnter(e: KeyboardEvent) {
  if (e.shiftKey) return
  e.preventDefault()
  handleSubmit()
}

function handleSubmit() {
  if (!questionText.value.trim()) return
  emit('submit', questionText.value.trim())
}

function fillQuestion(text: string) {
  questionText.value = text
  textareaRef.value?.focus()
}

defineExpose({
  fillQuestion
})
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* 核心提问表单精雕细琢 (完全对齐原版) */
.portal-composer {
  position: relative;
  margin: 0 auto;
  width: min(100%, 740px);
  padding: 20px 20px 14px;
  border: 1px solid #dcd2e8;
  border-radius: 24px;
  background: #fffffff5;
  box-shadow: 0 14px 50px rgba(123, 90, 156, 0.08), 0 3px #e9e2ef;
  transition: box-shadow 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.25s ease;
  box-sizing: border-box;
}

/* 选中激活状态：优雅浮现淡紫阴影蒙层与光晕 */
.portal-composer:focus-within {
  border-color: #a28abe;
  box-shadow: 0 18px 60px rgba(123, 90, 156, 0.16), 0 0 0 3px rgba(162, 138, 190, 0.18), 0 3px #cab7e2;
}

.portal-composer textarea {
  display: block;
  width: 100%;
  min-height: 76px;
  max-height: 220px;
  resize: vertical;
  padding: 4px 2px;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  font: inherit;
  font-size: 16px;
  line-height: 1.7;
  color: #3a2d48;
  border-radius: 0;
  box-sizing: border-box;
}

.portal-composer textarea::placeholder {
  color: #9a8da3;
}
</style>
