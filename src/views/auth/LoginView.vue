<template>
  <div class="login-page">
    <!-- 顶栏品牌 Wordmark -->
    <header class="site-header auth-site-header">
      <router-link to="/" class="brand-link" aria-label="Paper to Any 首页">
        <span class="wordmark">Paper <span>to</span> Any</span>
        <span class="wordmark-star">✦</span>
      </router-link>
    </header>

    <!-- 登录主舞台 -->
    <main class="login-container">
      <!-- 左侧：纯净青柠底色 · 3张卡片规律平滑位移的互动卡片 -->
      <div class="possibility-col">
        <WelcomePossibilityCard />
      </div>

      <!-- 右侧：登录表单面板 -->
      <section class="auth-panel" aria-labelledby="login-title">
        <header class="auth-heading">
          <h1 id="login-title">欢迎回来</h1>
          <p>继续你的阅读与发现。</p>
        </header>

        <!-- 登录模式切换 Tab (邮箱密码 / 邮箱验证码 / 内测口令) -->
        <nav class="auth-tabs" role="tablist" aria-label="邮箱登录方式">
          <button
            type="button"
            class="tab-btn"
            :class="{ active: activeTab === 'password' }"
            role="tab"
            :aria-selected="activeTab === 'password'"
            @click="activeTab = 'password'"
          >
            邮箱密码
          </button>
          <button
            type="button"
            class="tab-btn tab-btn--disabled"
            role="tab"
            disabled
            title="邮箱验证码发送服务尚未配置"
          >
            邮箱验证码
          </button>
          <button
            type="button"
            class="tab-btn"
            :class="{ active: activeTab === 'invite' }"
            role="tab"
            :aria-selected="activeTab === 'invite'"
            @click="activeTab = 'invite'"
          >
            内测口令
          </button>
        </nav>

        <!-- 错误提示通知条 -->
        <Transition name="fade-slide">
          <div v-if="authStore.errorMessage" class="error-notice" role="alert">
            <span class="error-icon">!</span>
            <span>{{ authStore.errorMessage }}</span>
          </div>
        </Transition>

        <!-- 表单切换区域 -->
        <Transition name="fade-mode" mode="out-in">
          <PasswordLoginTab
            v-if="activeTab === 'password'"
            :loading="authStore.isSubmitting"
            @submit="handlePasswordSubmit"
          />
          <InviteLoginTab
            v-else
            :loading="authStore.isSubmitting"
            @submit="handleInviteSubmit"
          />
        </Transition>

        <!-- 其他登录方式分割线 -->
        <div class="auth-divider">其他登录方式</div>

        <!-- 社交登录按钮组 -->
        <div class="social-buttons" aria-label="第三方服务登录">
          <button type="button" class="provider-btn" disabled title="微信登录服务尚未配置">
            <span class="wechat-mark">●</span>
            <span>微信</span>
          </button>
          <button type="button" class="provider-btn" disabled title="短信验证码服务尚未配置">
            <span class="sms-mark">▯</span>
            <span>短信登录</span>
          </button>
          <button type="button" class="provider-btn" disabled title="Google 登录尚未配置">
            <span class="google-mark">G</span>
            <span>Google</span>
          </button>
        </div>

        <!-- 注册引导条 -->
        <div class="auth-create-account">
          <div>
            <strong>还没有账号？</strong>
            <p>用受邀邮箱创建你的研究空间。</p>
          </div>
          <button
            type="button"
            class="create-button"
            disabled
            title="本轮内测暂不开放自助注册，请使用团队分配的内测口令"
          >
            创建账号
          </button>
        </div>

        <!-- 本地开发直通入口 -->
        <button
          v-if="authStore.isDevModeOpen || !authStore.authRequired"
          type="button"
          class="dev-bypass-link"
          @click="handleDevBypass"
        >
          本地开发：免密直达工作台 →
        </button>

        <!-- 返回首页 -->
        <div class="auth-back">
          <router-link to="/" class="back-home-link">返回首页</router-link>
        </div>
      </section>
    </main>

    <!-- 页脚规范 -->
    <footer class="site-footer">
      <span>Paper to Any V3.0.0·内测版 · 天与视界</span>
      <nav aria-label="页脚导航">
        <a href="#help" @click.prevent>帮助</a>
        <a href="#privacy" @click.prevent>隐私</a>
        <a href="#terms" @click.prevent>使用说明</a>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import WelcomePossibilityCard from './components/WelcomePossibilityCard.vue'
import InviteLoginTab from './components/InviteLoginTab.vue'
import PasswordLoginTab from './components/PasswordLoginTab.vue'
import type { InviteLoginPayload, PasswordLoginPayload } from '@/types/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 优先默认采用内测口令登录（原项目生产环境的核心有效登录方式）
const activeTab = ref<'invite' | 'password'>(
  (route.query.method as string) === 'password' ? 'password' : 'invite'
)

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
  min-height: 100vh;
  display: grid;
  grid-template-rows: 88px 1fr 55px;
  background-color: #ffffff;
  color: #29253a;
}

/* 顶栏品牌 Wordmark */
.site-header {
  display: flex;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid #ebe8ef;
}

.brand-link {
  display: inline-flex;
  align-items: baseline;
  gap: 3px;
  text-decoration: none;
  color: inherit;
}

.wordmark {
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -1.2px;
  color: #29253a;
}

.wordmark span {
  color: #7e67ae;
  font-weight: 600;
}

.wordmark-star {
  color: #f39b7f;
  font-size: 19px;
  margin-left: 2px;
}

/* 主舞台布局 */
.login-container {
  width: min(1040px, calc(100% - 48px));
  margin: auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 440px);
  gap: 72px;
  align-items: center;
  padding: 42px 0;
}

.possibility-col {
  width: 100%;
}

/* 右侧登录面板 */
.auth-panel {
  width: 100%;
}

.auth-heading h1 {
  margin: 0 0 8px;
  font-size: 32px;
  letter-spacing: -1.5px;
  font-weight: 800;
  color: #29253a;
}

.auth-heading p {
  margin: 0 0 28px;
  color: #686274;
  font-size: 14px;
}

/* 模式 Tab 切换 */
.auth-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 4px;
  margin-bottom: 30px;
  border-radius: 12px;
  background: #f0eef3;
}

.tab-btn {
  min-height: 40px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: transparent;
  color: #716a80;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: #ffffff;
  color: #654c92;
  border-color: #ded8e8;
  box-shadow: 0 1px 3px rgba(43, 31, 70, 0.1);
}

.tab-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 错误提示 */
.error-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 11px 14px;
  border-radius: 8px;
  background: #fff0ef;
  border: 1px solid rgba(168, 61, 70, 0.2);
  color: #a83d46;
  font-size: 13px;
}

.error-icon {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #a83d46;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
}

/* 分割线 */
.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 28px 0 18px;
  color: #625b6e;
  font-size: 12px;
  text-align: center;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e7e3eb;
}

/* 社交登录按钮组 */
.social-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.provider-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  border: 1px solid #e4dfeb;
  border-radius: 12px;
  background: #ffffff;
  color: #aaa2bf;
  font-size: 13px;
  font-weight: 600;
  cursor: not-allowed;
  box-shadow: 0 1px 2px #eeeaf2;
}

.wechat-mark {
  color: #72c9a0;
  font-size: 16px;
}

.sms-mark {
  font-size: 14px;
}

.google-mark {
  color: #e9876e;
  font-weight: 800;
}

/* 注册引导条 */
.auth-create-account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid #e7e3eb;
}

.auth-create-account strong {
  font-size: 14px;
  color: #29253a;
}

.auth-create-account p {
  margin: 5px 0 0;
  color: #777083;
  font-size: 12px;
}

.create-button {
  min-width: 86px;
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid #ded8e8;
  border-radius: 10px;
  background: #ffffff;
  color: #6a5792;
  font-size: 13px;
  font-weight: 600;
  cursor: not-allowed;
}

/* 辅助通道链接 */
.dev-bypass-link {
  display: block;
  margin: 20px auto 0;
  border: 0;
  background: none;
  color: #6a5792;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
}
.dev-bypass-link:hover {
  text-decoration: underline;
}

.auth-back {
  margin-top: 14px;
  text-align: center;
}

.back-home-link {
  color: #756e81;
  font-size: 12px;
  text-decoration: none;
}
.back-home-link:hover {
  text-decoration: underline;
}

/* 页脚 */
.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  border-top: 1px solid #ebe8ef;
  color: #625c6c;
  font-size: 12px;
}

.site-footer nav {
  display: flex;
  gap: 24px;
}

.site-footer a {
  color: inherit;
  text-decoration: none;
}
.site-footer a:hover {
  text-decoration: underline;
}

/* 过渡动效 */
.fade-slide-enter-active,
.fade-slide-leave-active,
.fade-mode-enter-active,
.fade-mode-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to,
.fade-mode-enter-from,
.fade-mode-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* 响应式断点适配 */
@media (max-width: 960px) {
  .login-page {
    grid-template-rows: 70px auto 55px;
  }
  .site-header {
    padding: 0 24px;
  }
  .login-container {
    grid-template-columns: 1fr;
    max-width: 480px;
    gap: 36px;
    padding: 32px 0 48px;
  }
}

@media (max-width: 520px) {
  .login-container {
    width: calc(100% - 32px);
    padding-top: 20px;
  }
  .auth-tabs button {
    font-size: 12px;
  }
  .site-footer {
    padding: 0 16px;
  }
  .site-footer span {
    display: none;
  }
  .site-footer nav {
    width: 100%;
    justify-content: center;
  }
}
</style>
