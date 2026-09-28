<template>
  <div class="login-page">
    <JournalCanvas />

    <div class="login-container">
      <!-- 左侧：学术期刊背景与愿景展区 -->
      <section class="journal-hero">
        <div class="brand-badge">
          <span class="brand-symbol">R²</span>
          <div class="brand-text">
            <strong>Paper to Any</strong>
            <small>Research Site · Private Beta</small>
          </div>
        </div>

        <p class="eyebrow">ACADEMIC RIGOR &amp; REPRODUCIBILITY</p>
        <h1 class="hero-title">
          上传一篇论文，<br />
          先得到可核对的阅读入口。
        </h1>
        <p class="hero-description">
          系统严格保存原件哈希、正文页码和生成状态。第一版只展示从原文中真实提取的内容，AI 判断和评分不会偷偷补齐。
        </p>

        <div class="security-guarantee">
          <div class="guarantee-item">
            <span class="dot"></span>
            <span>原文核验证据链</span>
          </div>
          <div class="guarantee-item">
            <span class="dot"></span>
            <span>受邀共享研究库</span>
          </div>
          <div class="guarantee-item">
            <span class="dot"></span>
            <span>无痕沙箱提取</span>
          </div>
        </div>
      </section>

      <!-- 右侧：Carved UI 浮雕登录卡片 -->
      <section class="auth-card carved-card">
        <header class="card-header">
          <span class="badge-beta">INVITE-ONLY BETA</span>
          <h2 class="card-title">进入内测研究库</h2>
          <p class="card-subtitle">这是受邀成员共用的测试空间。请验证您的内测身份。</p>
        </header>

        <!-- 模式切换凹槽 Tab -->
        <div class="carved-well tab-track" role="tablist">
          <button
            type="button"
            class="tab-pill"
            :class="{ active: activeTab === 'invite' }"
            role="tab"
            :aria-selected="activeTab === 'invite'"
            @click="activeTab = 'invite'"
          >
            内测邀请码
          </button>
          <button
            type="button"
            class="tab-pill"
            :class="{ active: activeTab === 'password' }"
            role="tab"
            :aria-selected="activeTab === 'password'"
            @click="activeTab = 'password'"
          >
            账户密码
          </button>
        </div>

        <!-- 状态反馈通知条 -->
        <Transition name="fade-slide">
          <div v-if="authStore.errorMessage" class="error-notice" role="alert">
            <span class="error-icon">!</span>
            <span class="error-text">{{ authStore.errorMessage }}</span>
          </div>
        </Transition>

        <!-- 表单切换区域 -->
        <Transition name="fade-mode" mode="out-in">
          <InviteLoginTab
            v-if="activeTab === 'invite'"
            :loading="authStore.isSubmitting"
            @submit="handleInviteSubmit"
          />
          <PasswordLoginTab
            v-else
            :loading="authStore.isSubmitting"
            @submit="handlePasswordSubmit"
          />
        </Transition>

        <!-- 开发模式快捷直通 -->
        <div v-if="authStore.isDevModeOpen || !authStore.authRequired" class="dev-bypass-wrap">
          <div class="divider">
            <span>开发便利通道</span>
          </div>
          <button
            type="button"
            class="dev-bypass-button carved-pressable"
            @click="handleDevBypass"
          >
            <span class="dev-tag">LOCAL</span>
            <span>免密直达工作台</span>
          </button>
        </div>

        <footer class="card-footer">
          <small>这一阶段是受邀内测，论文模型调用将按实际配置进行安全核验与审计。</small>
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import JournalCanvas from '@/components/layout/JournalCanvas.vue'
import InviteLoginTab from './components/InviteLoginTab.vue'
import PasswordLoginTab from './components/PasswordLoginTab.vue'
import type { InviteLoginPayload, PasswordLoginPayload } from '@/types/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const activeTab = ref<'invite' | 'password'>('invite')

async function navigateAfterLogin() {
  const redirect = (route.query.redirect as string) || '/workspace'
  await router.push(redirect)
}

async function handleInviteSubmit(payload: InviteLoginPayload) {
  try {
    await authStore.loginWithInvite(payload)
    await navigateAfterLogin()
  } catch {
    // 错误信息已保存在 authStore.errorMessage 中
  }
}

async function handlePasswordSubmit(payload: PasswordLoginPayload) {
  try {
    await authStore.loginWithPassword(payload)
    await navigateAfterLogin()
  } catch {
    // 错误信息已保存在 authStore.errorMessage 中
  }
}

async function handleDevBypass() {
  authStore.bypassLoginForDev()
  await navigateAfterLogin()
}
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background: var(--c-ground);
  overflow: hidden;
}

.login-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1140px;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}

/* 左侧期刊英雄区 */
.journal-hero {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.brand-badge {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-symbol {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  background: var(--c-purple-primary);
  color: #fff;
  border-radius: var(--radius-sm);
  font-family: var(--font-serif);
  font-size: 22px;
  box-shadow: 0 4px 14px rgba(53, 32, 109, 0.2);
}

.brand-text strong {
  display: block;
  font-size: 17px;
  font-weight: 700;
  color: var(--c-ink);
}

.brand-text small {
  display: block;
  font-size: 11px;
  color: var(--c-muted);
  font-family: var(--font-mono);
}

.eyebrow {
  margin: 0;
  color: var(--c-teal);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.hero-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(38px, 4.4vw, 56px);
  line-height: 1.18;
  letter-spacing: -0.035em;
  color: var(--c-ink);
}

.hero-description {
  margin: 0;
  max-width: 540px;
  color: var(--c-copy);
  font-size: 16px;
  line-height: 1.85;
}

.security-guarantee {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 14px;
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--c-copy);
}

.guarantee-item .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-teal);
}

/* 右侧 Carved 卡片 */
.auth-card {
  padding: 44px 40px;
}

.card-header {
  margin-bottom: 24px;
}

.badge-beta {
  display: inline-block;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--c-lavender);
  color: var(--c-purple-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 12px;
}

.card-title {
  margin: 0 0 8px;
  font-family: var(--font-serif);
  font-size: 30px;
  color: var(--c-ink);
}

.card-subtitle {
  margin: 0;
  color: var(--c-copy);
  font-size: 14px;
  line-height: 1.6;
}

/* 凹凸 Tab 切换 */
.tab-track {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4px;
  margin-bottom: 24px;
}

.tab-pill {
  padding: 10px 16px;
  border: 0;
  background: transparent;
  color: var(--c-copy);
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-pill.active {
  background: var(--c-paper);
  color: var(--c-purple-primary);
  box-shadow: var(--carved-raised-sm);
}

/* 错误提示 */
.error-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  background: var(--c-danger-soft);
  border: 1px solid rgba(169, 36, 45, 0.15);
  color: var(--c-danger);
  font-size: 13px;
  margin-bottom: 20px;
}

.error-icon {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--c-danger);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

/* 开发直通区 */
.dev-bypass-wrap {
  margin-top: 24px;
}

.divider {
  position: relative;
  text-align: center;
  margin-bottom: 16px;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--c-line);
}

.divider span {
  position: relative;
  padding: 0 12px;
  background: var(--c-paper);
  color: var(--c-muted);
  font-size: 11px;
}

.dev-bypass-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 11px 16px;
  background: var(--c-lavender-soft);
  border: 1px dashed var(--c-purple-secondary);
  border-radius: var(--radius-md);
  color: var(--c-purple-primary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.dev-bypass-button:hover {
  background: var(--c-lavender);
}

.dev-tag {
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--c-purple-primary);
  color: white;
  font-size: 10px;
  font-family: var(--font-mono);
}

.card-footer {
  margin-top: 24px;
  text-align: center;
}

.card-footer small {
  color: var(--c-muted);
  font-size: 12px;
  line-height: 1.6;
}

/* 动效过渡 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-mode-enter-active,
.fade-mode-leave-active {
  transition: all 0.2s ease;
}
.fade-mode-enter-from {
  opacity: 0;
  transform: translateX(8px);
}
.fade-mode-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

/* 响应式断点适配 */
@media (max-width: 960px) {
  .login-container {
    grid-template-columns: 1fr;
    max-width: 520px;
    gap: 36px;
  }
  .journal-hero {
    text-align: center;
    align-items: center;
  }
  .security-guarantee {
    justify-content: center;
  }
}

@media (max-width: 560px) {
  .login-page {
    padding: 20px 16px;
  }
  .auth-card {
    padding: 30px 22px;
    border-radius: var(--radius-lg);
  }
  .hero-title {
    font-size: 32px;
  }
}
</style>
