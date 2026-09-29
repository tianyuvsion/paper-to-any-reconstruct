<template>
  <div class="chat-stream">
    <div
      v-for="turn in workbenchStore.chatTurns"
      :key="turn.id"
      class="chat-turn-item"
      :class="turn.sender"
    >
      <div class="avatar-col">
        <span class="avatar-badge">{{ turn.sender === 'user' ? '我' : 'R²' }}</span>
      </div>

      <div class="message-content">
        <div class="message-header">
          <strong class="sender-name">{{ turn.sender === 'user' ? '研读者' : 'Paper to Any AI 证据助手' }}</strong>
          <small class="msg-time">{{ turn.timestamp }}</small>
        </div>

        <div class="message-body">
          <p>{{ turn.content }}</p>
        </div>

        <!-- 原文证据追溯卡片 -->
        <div
          v-if="turn.evidenceQuotes && turn.evidenceQuotes.length > 0"
          class="evidence-box"
        >
          <div class="evidence-header">
            <span class="ev-tag">原文证据链</span>
            <span>已核对出处与页码</span>
          </div>
          <div
            v-for="(quote, qIdx) in turn.evidenceQuotes"
            :key="qIdx"
            class="quote-item"
            @click="workbenchStore.jumpToSource(quote.page, quote.text)"
          >
            <span class="quote-page">P.{{ quote.page }}</span>
            <span class="quote-body">“{{ quote.text }}”</span>
            <span class="quote-jump">跳转原文 ↗</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'

const workbenchStore = useWorkbenchStore()
</script>

<style scoped>
.chat-stream {
  flex: 1;
  padding: 24px 28px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chat-turn-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  max-width: 92%;
}

.chat-turn-item.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.avatar-badge {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.chat-turn-item.assistant .avatar-badge {
  background: #35206d;
  color: #ffffff;
  font-family: var(--font-serif);
}

.chat-turn-item.user .avatar-badge {
  background: #f0eafb;
  color: #513995;
  border: 1px solid #d4c8e8;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.message-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.chat-turn-item.user .message-header {
  justify-content: flex-end;
}

.sender-name {
  font-size: 12px;
  color: #51495e;
}

.msg-time {
  font-size: 11px;
  color: #9d94a8;
  font-family: var(--font-mono);
}

.message-body {
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.7;
}

.chat-turn-item.assistant .message-body {
  background: #f8f6fb;
  border: 1px solid #e7e2ee;
  color: #18141f;
}

.chat-turn-item.user .message-body {
  background: #35206d;
  color: #ffffff;
}

/* 证据卡片 */
.evidence-box {
  margin-top: 6px;
  padding: 10px 14px;
  border-radius: 12px;
  background: #fdfcff;
  border: 1px solid #e0d8eb;
}

.evidence-header {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #7b728b;
  margin-bottom: 6px;
}

.ev-tag {
  font-weight: 700;
  color: #167f7a;
}

.quote-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 8px;
  background: #f5f2f9;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 12px;
}

.quote-item:hover {
  background: #ede6f6;
}

.quote-page {
  font-weight: 800;
  color: #513995;
  font-family: var(--font-mono);
}

.quote-body {
  flex: 1;
  color: #3b3248;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quote-jump {
  font-size: 11px;
  color: #167f7a;
  font-weight: 600;
  flex-shrink: 0;
}
</style>
