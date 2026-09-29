<template>
  <div class="chat-composer-box">
    <!-- 选区引用暂存胶囊 -->
    <ContextRefChips />

    <div class="input-row">
      <textarea
        v-model="inputQuestion"
        class="chat-textarea"
        rows="2"
        placeholder="向当前论文发问，例如：这项实验的关键参数和适用边界是什么？（Enter 发送）"
        @keydown.enter="handleEnter"
      ></textarea>

      <button
        type="button"
        class="chat-send-btn carved-pressable"
        :disabled="!inputQuestion.trim()"
        @click="handleSend"
      >
        <span>发送</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWorkbenchStore } from '@/stores/workbench'
import ContextRefChips from './ContextRefChips.vue'

const workbenchStore = useWorkbenchStore()
const inputQuestion = ref('')

function handleEnter(e: KeyboardEvent) {
  if (e.shiftKey) return
  e.preventDefault()
  handleSend()
}

function handleSend() {
  if (!inputQuestion.value.trim()) return
  workbenchStore.sendQuestion(inputQuestion.value.trim())
  inputQuestion.value = ''
}
</script>

<style scoped>
.chat-composer-box {
  border-top: 1px solid #ede8f4;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.input-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 14px 20px;
}

.chat-textarea {
  flex: 1;
  border: 1px solid #dcd5e6;
  border-radius: 14px;
  padding: 10px 14px;
  font-size: 14px;
  line-height: 1.6;
  outline: none;
  resize: none;
  font-family: inherit;
  color: #18141f;
  background: #fdfcff;
  transition: border-color 0.2s;
}

.chat-textarea:focus {
  border-color: #513995;
  background: #ffffff;
}

.chat-send-btn {
  padding: 10px 18px;
  border: 0;
  border-radius: 12px;
  background: #35206d;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.chat-send-btn:hover:not(:disabled) {
  background: #513995;
}

.chat-send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
