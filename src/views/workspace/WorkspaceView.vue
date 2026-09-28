<template>
  <div class="workspace-page">
    <AppHeader />

    <main class="workspace-main">
      <!-- 欢迎与身份标语 -->
      <section class="welcome-card carved-card">
        <div class="welcome-content">
          <p class="eyebrow">RESEARCH WORKSPACE · ACTIVE</p>
          <h1 class="welcome-title">
            欢迎进入 Paper to Any 学术研读空间
          </h1>
          <p class="welcome-desc">
            您已成功通过身份认证接入。当前登录身份为
            <strong class="scholar-identity">{{ authStore.userDisplayName }}</strong>。
            所有论文的提取、AI 证据编译与观点评分均支持双向原文证据锚定。
          </p>
        </div>

        <div class="account-meta carved-well">
          <div class="meta-row">
            <span class="meta-label">鉴权模式</span>
            <span class="meta-value">{{ authStore.identity?.authentication || 'session' }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">工作区类型</span>
            <span class="meta-value">
              {{ authStore.identity?.shared_workspace ? '受邀共享空间' : '独立专属空间' }}
            </span>
          </div>
          <div class="meta-row">
            <span class="meta-label">会话状态</span>
            <span class="meta-value text-teal">已激活验证</span>
          </div>
        </div>
      </section>

      <!-- 重构规划导览与功能预留区 -->
      <section class="modules-overview">
        <h2 class="section-title">重构演进路线与功能蓝图</h2>

        <div class="modules-grid">
          <article class="module-card carved-card">
            <div class="module-badge status-done">已完成</div>
            <h3 class="module-title">工程基座与鉴权中枢</h3>
            <p class="module-desc">
              采用 Vue 3 + TypeScript + Pinia + Vue Router + Axios 工具链，承接 Carved UI 凹凸浮雕质感，支持 HttpOnly Session 校验与免密直通。
            </p>
            <div class="module-tags">
              <span>Vue 3.5</span>
              <span>Pinia</span>
              <span>TypeScript</span>
              <span>HttpOnly Cookie</span>
            </div>
          </article>

          <article class="module-card carved-card">
            <div class="module-badge status-next">下一阶段</div>
            <h3 class="module-title">论文接引与原文导览</h3>
            <p class="module-desc">
              支持 50MB PDF 拖拽上传、魔数校验、后台解析进度实时轮询，提取正文、图表并生成无偏原文导览。
            </p>
            <div class="module-tags">
              <span>PDF 上传</span>
              <span>状态机轮询</span>
              <span>OCR 探测</span>
            </div>
          </article>

          <article class="module-card carved-card">
            <div class="module-badge status-planned">规划中</div>
            <h3 class="module-title">多重视角研读与核心卡片</h3>
            <p class="module-desc">
              大众 / 研究者 / 企业三模式切换，16 维学术评分矩阵，7 大核心学术卡片及 PDF 页码精准证据链追溯抽屉。
            </p>
            <div class="module-tags">
              <span>三模式切换</span>
              <span>评分引擎</span>
              <span>证据核证抽屉</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'

const authStore = useAuthStore()
</script>

<style scoped>
.workspace-page {
  min-height: 100vh;
  background-color: var(--c-ground);
}

.workspace-main {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  padding: 48px 0 96px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.welcome-card {
  padding: 40px 48px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: center;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--c-teal);
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.08em;
}

.welcome-title {
  margin: 0 0 16px;
  font-family: var(--font-serif);
  font-size: clamp(28px, 3.2vw, 38px);
  color: var(--c-ink);
  line-height: 1.25;
}

.welcome-desc {
  max-width: 680px;
  margin: 0;
  color: var(--c-copy);
  font-size: 15px;
  line-height: 1.8;
}

.scholar-identity {
  color: var(--c-purple-primary);
  font-weight: 700;
}

.account-meta {
  min-width: 220px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 13px;
  gap: 16px;
}

.meta-label {
  color: var(--c-muted);
}

.meta-value {
  font-weight: 600;
  color: var(--c-ink);
  font-family: var(--font-mono);
}

.text-teal {
  color: var(--c-teal);
}

/* 模块总览 */
.section-title {
  margin: 0 0 20px;
  font-family: var(--font-serif);
  font-size: 24px;
  color: var(--c-ink);
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.module-card {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
}

.module-badge {
  align-self: flex-start;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-size: 11px;
  font-weight: 700;
}

.status-done {
  background: var(--c-teal-soft);
  color: var(--c-teal);
}

.status-next {
  background: var(--c-lavender);
  color: var(--c-purple-secondary);
}

.status-planned {
  background: var(--c-lavender-soft);
  color: var(--c-muted);
}

.module-title {
  margin: 0;
  font-size: 18px;
  color: var(--c-ink);
}

.module-desc {
  margin: 0;
  color: var(--c-copy);
  font-size: 13px;
  line-height: 1.7;
  flex: 1;
}

.module-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.module-tags span {
  padding: 3px 8px;
  background: var(--c-lavender-soft);
  color: var(--c-copy);
  border-radius: 6px;
  font-size: 11px;
  font-family: var(--font-mono);
}

@media (max-width: 960px) {
  .welcome-card {
    grid-template-columns: 1fr;
  }
  .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
