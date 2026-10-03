<template>
  <aside class="work-sidebar" aria-label="研究工作区侧边栏">
    <!-- 1. 顶部品牌字标 (带桃粉色四角星标，完全对齐设计稿) -->
    <div class="work-brand">
      <router-link to="/" class="brand-link" aria-label="返回首页">
        <span class="brand-text">Paper to Any</span>
        <span class="brand-star">✧</span>
      </router-link>
    </div>

    <!-- 2. ＋ 新建研究按钮 (圆角药丸胶囊、纯白底色、微灰细边框) -->
    <div class="action-wrap">
      <button
        type="button"
        class="btn-new-research"
        @click="handleNewResearch"
      >
        <svg class="plus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>导入 PDF</span>
      </button>
    </div>

    <!-- 3. 工作空间分组标签 -->
    <div class="nav-section-label">工作空间</div>

    <!-- 4. 5 项核心菜单 (对齐设计稿选项与高亮排版) -->
    <nav class="nav-list" aria-label="工作空间导航">
      <!-- 我的论文菜单 -->
      <a
        href="#library"
        class="nav-item"
        :class="{ active: workbenchStore.activeSidebarNav === 'library' }"
        @click.prevent="workbenchStore.setSidebarNav('library')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
        <span>我的论文</span>
      </a>

      <!-- 2: 研究会话 -->
      <a
        href="#chat"
        class="nav-item"
        :class="{ active: workbenchStore.activeSidebarNav === 'chat' }"
        @click.prevent="workbenchStore.setSidebarNav('chat')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="8" y1="9" x2="16" y2="9"></line>
          <line x1="8" y1="13" x2="13" y2="13"></line>
        </svg>
        <span>研究会话</span>
      </a>

      <!-- 3: 研究记录 -->
      <a
        href="#history"
        class="nav-item"
        :class="{ active: workbenchStore.activeSidebarNav === 'history' }"
        @click.prevent="workbenchStore.setSidebarNav('history')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
          <path d="M12 7v5l3 2"></path>
        </svg>
        <span>研究记录</span>
      </a>

      <!-- 4: 成果 -->
      <a
        href="#outputs"
        class="nav-item"
        :class="{ active: workbenchStore.activeSidebarNav === 'outputs' }"
        @click.prevent="workbenchStore.setSidebarNav('outputs')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
        </svg>
        <span>成果</span>
      </a>

      <!-- 5: 任务 -->
      <a
        href="#tasks"
        class="nav-item"
        :class="{ active: workbenchStore.activeSidebarNav === 'tasks' }"
        @click.prevent="workbenchStore.setSidebarNav('tasks')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="4"></rect>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
        <span>任务</span>
      </a>
    </nav>

    <div v-if="workbenchStore.activeSidebarNav === 'library'" class="sidebar-paper-panel">
      <RailPaperList ref="paperListRef" />
    </div>

    <!-- 5. 底部固定功能区 (设置与收起导航) -->
    <div class="sidebar-bottom">
      <a
        href="#settings"
        class="nav-item"
        :class="{ active: workbenchStore.activeSidebarNav === 'settings' }"
        @click.prevent="workbenchStore.setSidebarNav('settings')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span>设置</span>
      </a>

      <button
        type="button"
        class="nav-item collapse-btn"
        aria-label="收起导航"
        @click="workbenchStore.toggleRail"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
        <span>收起导航</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useWorkbenchStore } from '@/stores/workbench'
import RailPaperList from './RailPaperList.vue'

const workbenchStore = useWorkbenchStore()
const paperListRef = ref<InstanceType<typeof RailPaperList> | null>(null)

function handleNewResearch() {
  workbenchStore.setSidebarNav('library')
  nextTick(() => paperListRef.value?.openFilePicker())
}
</script>

<style scoped>
/* 整个侧边栏：100% 对齐最新设计稿 (M03 规范) */
.work-sidebar {
  width: 240px;
  min-width: 240px;
  height: 100vh;
  background: #F6F3FC;
  border-right: 1px solid #ebe5f5;
  display: flex;
  flex-direction: column;
  padding: 24px 14px 20px 14px;
  box-sizing: border-box;
  user-select: none;
  overflow: hidden;
}

/* 1. 顶部品牌字标 */
.work-brand {
  padding: 0 10px;
  margin-bottom: 24px;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}

.brand-text {
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.5px;
  color: #1e1927;
}

.brand-star {
  font-size: 15px;
  color: #ea8c74;
  margin-left: 2px;
}

/* 2. ＋ 新建研究按钮 */
.action-wrap {
  margin-bottom: 24px;
  padding: 0 4px;
}

.sidebar-paper-panel {
  min-height: 0;
  overflow: hidden;
}

.btn-new-research {
  width: 100%;
  height: 42px;
  padding: 0 16px;
  border-radius: 21px;
  background: #ffffff;
  border: 1px solid #e5dfea;
  color: #31273f;
  font-size: 13.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(48, 32, 79, 0.04);
  cursor: pointer;
  transition: all 0.16s ease;
  box-sizing: border-box;
}

.btn-new-research:hover {
  background: #faf8fd;
  border-color: #cbbfdc;
  box-shadow: 0 3px 8px rgba(94, 58, 140, 0.08);
}

.btn-new-research:active {
  transform: scale(0.99);
}

.plus-icon {
  width: 15px;
  height: 15px;
  stroke: #31273f;
}

/* 3. 分组标签 */
.nav-section-label {
  font-size: 12px;
  font-weight: 500;
  color: #948b9e;
  margin: 0 0 8px 12px;
}

/* 4. 导航列表 */
.nav-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0 4px;
}

/* 菜单项通用规范 */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  font-size: 13.5px;
  color: #594f68;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  background: transparent;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.15s ease;
  text-align: left;
}

.nav-item:hover {
  background: #ede6f7;
  color: #312347;
}

/* 高亮激活项 (100% 对齐设计稿中的“研究库”) */
.nav-item.active {
  background: #ebdff7;
  color: #593687;
  font-weight: 650;
}

.nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  stroke: #594f68;
  transition: stroke 0.15s ease;
}

.nav-item.active .nav-icon {
  stroke: #593687;
}

/* 5. 底部固定区域 */
.sidebar-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 16px 4px 0 4px;
}

.collapse-btn {
  font-family: inherit;
}
</style>
