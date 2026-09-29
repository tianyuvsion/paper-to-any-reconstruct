<template>
  <header class="wb-header">
    <!-- 左侧：展开侧栏按钮与面包屑导航 (对齐原版 workspace-toolbar) -->
    <div class="header-left">
      <button
        v-if="!workbenchStore.isRailOpen"
        type="button"
        class="sidebar-open-btn"
        title="展开侧边栏"
        aria-label="展开侧边栏"
        @click="workbenchStore.toggleRail"
      >
        <svg class="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 3h18v18H3z M9 3v18" />
        </svg>
      </button>
      <div class="workspace-breadcrumb">
        <span class="version-tag">3.1.0</span>
        <span class="crumb-text">研读工作空间</span>
      </div>
    </div>

    <!-- 中间：论文标题与三模式切换 -->
    <div class="header-center">
      <div class="paper-title-pill" :title="workbenchStore.currentPaper.title">
        <span class="title-tag">研读中</span>
        <span class="title-text">{{ workbenchStore.currentPaper.title }}</span>
      </div>

      <!-- 三模式切换胶囊滑块 -->
      <nav class="mode-switch-capsule" role="tablist" aria-label="阅读视角模式">
        <button
          type="button"
          class="mode-btn"
          :class="{ active: workbenchStore.currentMode === 'public' }"
          @click="workbenchStore.setMode('public')"
        >
          大众理解
        </button>
        <button
          type="button"
          class="mode-btn"
          :class="{ active: workbenchStore.currentMode === 'researcher' }"
          @click="workbenchStore.setMode('researcher')"
        >
          研究者深读
        </button>
        <button
          type="button"
          class="mode-btn"
          :class="{ active: workbenchStore.currentMode === 'enterprise' }"
          @click="workbenchStore.setMode('enterprise')"
        >
          企业研判
        </button>
      </nav>
    </div>

    <!-- 右侧：版本选择与右栏折叠 -->
    <div class="header-right">
      <div class="version-select-wrap">
        <span class="version-label">成果版本</span>
        <select
          v-model="workbenchStore.currentVersion"
          class="version-select"
        >
          <option value="v2">第 2 版 · AI 证据编译</option>
          <option value="v1">第 1 版 · 原文事实导览</option>
          <option value="source">纯原文依据对照</option>
        </select>
      </div>

      <button
        type="button"
        class="dock-toggle-btn"
        :class="{ active: workbenchStore.isDockOpen }"
        :title="workbenchStore.isDockOpen ? '收起右侧原文栏' : '展开右侧原文依据'"
        @click="workbenchStore.toggleDock"
      >
        <span class="dock-icon">📖</span>
        <span>{{ workbenchStore.isDockOpen ? '隐藏原文' : '查看原文' }}</span>
      </button>

      <!-- 用户账户头像与下拉菜单 -->
      <UserAccountDropdown v-if="authStore.isAuthenticated" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'
import { useAuthStore } from '@/stores/auth'
import UserAccountDropdown from '@/components/account/UserAccountDropdown.vue'

const workbenchStore = useWorkbenchStore()
const authStore = useAuthStore()
</script>

<style scoped>
.wb-header {
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e2deea;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  z-index: 30;
  position: relative;
  box-shadow: 0 1px 4px rgba(48, 33, 80, 0.04);
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.sidebar-open-btn {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 1px solid #e7e2ed;
  border-radius: 8px;
  background: transparent;
  color: #6a6175;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 0;
}

.sidebar-open-btn:hover {
  background: #f7f4fb;
  color: #35206d;
  border-color: #cbbedf;
}

.panel-icon {
  width: 17px;
  height: 17px;
}

.workspace-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #625972;
}

.version-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: #8c8299;
  background: #f4eff9;
  padding: 1px 6px;
  border-radius: 4px;
}

.crumb-text {
  font-weight: 600;
  color: #29253a;
}

.rail-toggle-btn, .dock-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #e1dee7;
  border-radius: 10px;
  background: #f7f5fa;
  color: #584f67;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rail-toggle-btn:hover, .dock-toggle-btn:hover {
  background: #eee8f6;
  color: #35206d;
}

.dock-toggle-btn.active {
  background: #f0eafb;
  color: #513995;
  border-color: #d1c5e4;
}

.header-center {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  max-width: 820px;
  justify-content: center;
  min-width: 0;
}

.paper-title-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fbf9fd;
  border: 1px solid #e5e0ec;
  padding: 5px 12px;
  border-radius: 20px;
  max-width: 380px;
  min-width: 0;
}

.title-tag {
  font-size: 11px;
  font-weight: 800;
  color: #167f7a;
  background: #d9f1ef;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.title-text {
  font-size: 13px;
  color: #29253a;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 模式切换胶囊 */
.mode-switch-capsule {
  display: inline-flex;
  background: #eeebf3;
  padding: 3px;
  border-radius: 20px;
  flex-shrink: 0;
}

.mode-btn {
  padding: 5px 14px;
  border: 0;
  border-radius: 16px;
  background: transparent;
  color: #6a6275;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn.active {
  background: #35206d;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(53, 32, 109, 0.25);
}

.version-select-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.version-label {
  font-size: 12px;
  color: #8c839a;
}

.version-select {
  padding: 6px 10px;
  border: 1px solid #dcd6e6;
  border-radius: 8px;
  background: #fff;
  color: #35206d;
  font-size: 13px;
  font-weight: 600;
  outline: none;
}

@media (max-width: 1080px) {
  .paper-title-pill {
    display: none;
  }
}
@media (max-width: 820px) {
  .version-select-wrap {
    display: none;
  }
}
</style>
