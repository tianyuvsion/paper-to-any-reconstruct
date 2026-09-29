<template>
  <div class="workspace-root">
    <!-- 1. 工作台顶栏 -->
    <WorkbenchHeader />

    <!-- 2. 三栏自适应工作台布局 -->
    <WorkbenchLayout>
      <!-- 左侧资料栏 -->
      <template #rail>
        <RailPaperList />
        <RailConversations />
      </template>

      <!-- 中间主研读舞台 -->
      <template #stage>
        <!-- 主舞台 Tab 切换导航 -->
        <StageNavTabs />

        <!-- 视图 1: 学术成果卡片流 -->
        <div v-show="workbenchStore.activeTab === 'reading'" class="stage-reading-view">
          <ScoreMatrixBar />
          <AcademicCardGrid @open-detail="openCardDetail" />
        </div>

        <!-- 视图 2: AI 学术研读会话 -->
        <div v-show="workbenchStore.activeTab === 'chat'" class="stage-chat-view">
          <ChatStream />
          <ChatComposer />
        </div>

        <!-- 视图 3: 研读笔记 -->
        <div v-show="workbenchStore.activeTab === 'notes'" class="stage-notes-view">
          <NoteEditor />
        </div>
      </template>

      <!-- 右侧原文依据栏 -->
      <template #dock>
        <SourceDockHeader />
        <SourceViewer />
      </template>
    </WorkbenchLayout>

    <!-- 成果卡片全景报纸版式大弹窗 -->
    <CardDetailModal
      :visible="isDetailVisible"
      :card="selectedCardForDetail"
      @close="isDetailVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkbenchStore } from '@/stores/workbench'
import type { AcademicCard, ReadingMode } from '@/types/workbench'
import WorkbenchHeader from './components/layout/WorkbenchHeader.vue'
import WorkbenchLayout from './components/layout/WorkbenchLayout.vue'
import RailPaperList from './components/rail/RailPaperList.vue'
import RailConversations from './components/rail/RailConversations.vue'
import StageNavTabs from './components/stage/StageNavTabs.vue'
import ChatStream from './components/stage/chat/ChatStream.vue'
import ChatComposer from './components/stage/chat/ChatComposer.vue'
import ScoreMatrixBar from './components/stage/reading/ScoreMatrixBar.vue'
import AcademicCardGrid from './components/stage/reading/AcademicCardGrid.vue'
import CardDetailModal from './components/stage/reading/CardDetailModal.vue'
import NoteEditor from './components/stage/notes/NoteEditor.vue'
import SourceDockHeader from './components/dock/SourceDockHeader.vue'
import SourceViewer from './components/dock/SourceViewer.vue'

const route = useRoute()
const workbenchStore = useWorkbenchStore()

const isDetailVisible = ref(false)
const selectedCardForDetail = ref<AcademicCard | null>(null)

function openCardDetail(card: AcademicCard) {
  selectedCardForDetail.value = card
  isDetailVisible.value = true
}

onMounted(() => {
  // 解析路由参数：如从首页卡片点击或提问跳转带来的参数
  if (route.query.mode) {
    workbenchStore.setMode(route.query.mode as ReadingMode)
  }
  if (route.query.question) {
    const q = decodeURIComponent(route.query.question as string)
    workbenchStore.setStageTab('chat')
    workbenchStore.sendQuestion(q)
  }
  if (route.query.card) {
    // 定位到该卡片
    workbenchStore.setStageTab('reading')
  }
})
</script>

<style scoped>
.workspace-root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f6fb;
  overflow: hidden;
}

.stage-reading-view,
.stage-chat-view,
.stage-notes-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100% - 56px);
  overflow-y: auto;
}

.stage-chat-view {
  overflow: hidden;
}
</style>
