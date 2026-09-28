<template>
  <div class="hero-composer carved-card">
    <!-- 引用上下文胶囊 -->
    <div v-if="hasReference" class="reference-capsule">
      <span class="ref-icon">📄</span>
      <span class="ref-title">引用：EAST 千秒实验（Science Advances 2023）</span>
      <button
        type="button"
        class="ref-remove-btn"
        title="清除当前引用"
        @click="hasReference = false"
      >
        ×
      </button>
    </div>

    <!-- 问题输入文本域 -->
    <div class="composer-body">
      <textarea
        ref="textareaRef"
        v-model="question"
        class="composer-textarea"
        maxlength="700"
        rows="3"
        placeholder="输入你想研究的问题，例如：这项结论适用于哪些技术条件？"
        @keydown.enter="handleEnter"
      ></textarea>
    </div>

    <!-- 底部操作与工具栏 -->
    <footer class="composer-footer">
      <router-link to="/workspace" class="choose-paper-btn">
        <span class="plus-icon">＋</span>
        <span>选择我的论文</span>
      </router-link>

      <span class="step-hint">下一步：确认原文与研读视角</span>

      <button
        type="button"
        class="send-btn carved-pressable"
        :disabled="!question.trim()"
        title="开始研读此问题"
        @click="handleSend"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', question: string): void
}>()

const question = ref('')
const hasReference = ref(true)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function handleEnter(e: KeyboardEvent) {
  if (e.shiftKey) return
  e.preventDefault()
  handleSend()
}

function handleSend() {
  if (!question.value.trim()) return
  emit('submit', question.value.trim())
}

function fillQuestion(text: string) {
  question.value = text
  textareaRef.value?.focus()
}

defineExpose({
  fillQuestion
})
</script>

<style scoped>
.hero-composer {
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 16px 20px 14px;
  background: #ffffff;
  border: 1px solid #dcd7e5;
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(48, 33, 80, 0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
}

/* 引用上下文胶囊 */
.reference-capsule {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: #f0eafb;
  border-radius: 20px;
  font-size: 12px;
  color: #513995;
  font-weight: 600;
}

.ref-icon {
  font-size: 13px;
}

.ref-remove-btn {
  border: 0;
  background: transparent;
  color: #7e6da8;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
  cursor: pointer;
}
.ref-remove-btn:hover {
  color: #35206d;
}

/* 输入域 */
.composer-body {
  width: 100%;
}

.composer-textarea {
  width: 100%;
  border: 0;
  outline: none;
  resize: none;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  line-height: 1.6;
  color: #18141f;
  box-sizing: border-box;
}

.composer-textarea::placeholder {
  color: #9d96a8;
}

/* 底部操作行 */
.composer-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 6px;
  border-top: 1px solid #f1eef6;
}

.choose-paper-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #4b3e64;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 8px;
  background: #f7f4fb;
  transition: all 0.2s;
}

.choose-paper-btn:hover {
  background: #ede7f6;
  color: #35206d;
}

.plus-icon {
  font-size: 14px;
  font-weight: 800;
}

.step-hint {
  font-size: 12px;
  color: #928a9e;
}

.send-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 0;
  background: #35206d;
  color: #ffffff;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(53, 32, 109, 0.25);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: #513995;
  transform: translateY(-1px);
}

.send-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  box-shadow: none;
}

@media (max-width: 640px) {
  .step-hint {
    display: none;
  }
}
</style>
