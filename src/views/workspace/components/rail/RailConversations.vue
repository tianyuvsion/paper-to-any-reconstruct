<template>
  <div class="rail-conversations">
    <div class="section-title">
      <span>AI 研读会话</span>
      <button type="button" class="new-chat-btn" title="另开新会话" @click="handleNewChat">
        ＋
      </button>
    </div>

    <div class="chat-list">
      <div
        class="chat-session-item active"
        @click="workbenchStore.setStageTab('chat')"
      >
        <div class="session-header">
          <span class="chat-icon">💬</span>
          <strong class="session-name">EAST 千秒实验深度问答</strong>
        </div>
        <div class="session-sub">
          <span>{{ workbenchStore.chatTurns.length }} 轮对话</span>
          <small>刚刚活跃</small>
        </div>
      </div>

      <div class="chat-session-item" @click="workbenchStore.setStageTab('chat')">
        <div class="session-header">
          <span class="chat-icon">💬</span>
          <strong class="session-name">高约束模等离子体参数核验</strong>
        </div>
        <div class="session-sub">
          <span>3 轮对话</span>
          <small>昨天</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'

const workbenchStore = useWorkbenchStore()

function handleNewChat() {
  workbenchStore.setStageTab('chat')
  workbenchStore.chatTurns.push({
    id: String(Date.now()),
    sender: 'assistant',
    timestamp: '刚刚',
    content: '新研读会话已建立。您可以随时在此提问，或右侧划词后点击“用于提问”把精确依据带入。'
  })
}
</script>

<style scoped>
.rail-conversations {
  padding: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 800;
  color: #726882;
  letter-spacing: 0.5px;
}

.new-chat-btn {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid #dcd7e6;
  background: #ffffff;
  color: #35206d;
  font-size: 16px;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.new-chat-btn:hover {
  background: #f0eafb;
  border-color: #7254b3;
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-session-item {
  padding: 10px 12px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #e5e0ec;
  cursor: pointer;
  transition: all 0.2s;
}

.chat-session-item:hover {
  border-color: #cbb5f0;
  background: #fdfcff;
}

.chat-session-item.active {
  border-color: #7254b3;
  background: #f4effb;
  box-shadow: 0 2px 6px rgba(53, 32, 109, 0.06);
}

.session-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.chat-icon {
  font-size: 13px;
}

.session-name {
  font-size: 12px;
  color: #29253a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.session-sub {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #9287a1;
  padding-left: 21px;
}
</style>
