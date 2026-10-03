<template>
  <div class="workspace-root" :class="{ 'sidebar-collapsed': !workbenchStore.isRailOpen }">
    <!-- 1. 左侧大侧边栏 (Full height 100vh，100% 对齐最新设计稿规范) -->
    <WorkspaceSidebar v-show="workbenchStore.isRailOpen" />

    <!-- 2. 右侧主体区域 (包含顶栏操作条、中间主研读舞台、右侧原文依据栏) -->
    <div class="workspace-main">
      <!-- 工作台顶栏 -->
      <WorkbenchHeader />

      <!-- 主体研读与原文联动区 -->
      <div class="workbench-body" :class="{ 'no-dock': !workbenchStore.isDockOpen }">
        <!-- 中间主研读舞台 -->
        <main class="layout-stage">
          <!-- 主舞台 Tab 切换导航 -->
          <StageNavTabs />

          <!-- 视图 1: 学术成果卡片流 -->
          <div v-show="workbenchStore.activeTab === 'reading'" class="stage-reading-view">
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
        </main>

        <!-- 右侧原文依据栏 -->
        <aside v-show="workbenchStore.isDockOpen" class="layout-dock">
          <SourceDockHeader />
          <SourceViewer />
        </aside>
      </div>
    </div>

    <!-- 成果卡片全景报纸版式大弹窗 -->
    <CardDetailModal
      :visible="isDetailVisible"
      :card="selectedCardForDetail"
      @close="isDetailVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkbenchStore } from '@/stores/workbench'
import type { AcademicCard, ReadingMode } from '@/types/workbench'
import WorkbenchHeader from './components/layout/WorkbenchHeader.vue'
import WorkspaceSidebar from './components/rail/WorkspaceSidebar.vue'
import StageNavTabs from './components/stage/StageNavTabs.vue'
import ChatStream from './components/stage/chat/ChatStream.vue'
import ChatComposer from './components/stage/chat/ChatComposer.vue'
import AcademicCardGrid from './components/stage/reading/AcademicCardGrid.vue'
import CardDetailModal from './components/stage/reading/CardDetailModal.vue'
import NoteEditor from './components/stage/notes/NoteEditor.vue'
import SourceDockHeader from './components/dock/SourceDockHeader.vue'
import SourceViewer from './components/dock/SourceViewer.vue'

const route = useRoute()
const workbenchStore = useWorkbenchStore()

const isDetailVisible = ref(false)
const selectedCardForDetail = ref<AcademicCard | null>(null)
let paperStatusPoll: number | undefined

function openCardDetail(card: AcademicCard) {
  selectedCardForDetail.value = card
  isDetailVisible.value = true
}

onMounted(async () => {
  if (route.query.mode) {
    workbenchStore.setMode(route.query.mode as ReadingMode)
  }

  const requestedPaperId = typeof route.query.paperId === 'string'
    ? route.query.paperId
    : undefined
  await workbenchStore.initializeLibrary(requestedPaperId)

  if (route.query.question) {
    const q = decodeURIComponent(route.query.question as string)
    workbenchStore.setStageTab('chat')
    workbenchStore.sendQuestion(q)
  }
  if (route.query.card) {
    workbenchStore.setStageTab('reading')
  }
})

watch(
  () => [workbenchStore.currentPaper.id, workbenchStore.currentPaper.status] as const,
  ([paperId, status]) => {
    if (paperStatusPoll !== undefined) {
      window.clearInterval(paperStatusPoll)
      paperStatusPoll = undefined
    }

    const isProcessing = ['uploaded', 'extracting', 'extracted', 'compiling'].includes(status)
    if (!paperId || !isProcessing) return

    paperStatusPoll = window.setInterval(() => {
      void workbenchStore.refreshCurrentPaper()
    }, 2500)
  }
)

onUnmounted(() => {
  if (paperStatusPoll !== undefined) {
    window.clearInterval(paperStatusPoll)
  }
})
</script>

<style scoped>
.workspace-root {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #f8f6fb;
  overflow: hidden;
}

.workspace-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 0;
  overflow: hidden;
}

.workbench-body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 480px;
  height: calc(100vh - 64px);
  min-height: 0;
  overflow: hidden;
  transition: grid-template-columns 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.workbench-body.no-dock {
  grid-template-columns: 1fr 0px;
}

.layout-stage {
  background: #ffffff;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
}

.layout-dock {
  background: #faf9fc;
  border-left: 1px solid #e1dee7;
  overflow-y: auto;
  min-width: 480px;
  height: 100%;
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

@media (max-width: 1200px) {
  .workbench-body {
    grid-template-columns: 1fr 400px;
  }
  .layout-dock {
    min-width: 400px;
  }
}

@media (max-width: 992px) {
  .workbench-body {
    grid-template-columns: 1fr;
  }
  .layout-dock {
    display: none;
  }
}
</style>
