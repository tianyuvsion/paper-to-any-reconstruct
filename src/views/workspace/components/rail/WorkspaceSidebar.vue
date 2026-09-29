<template>
  <aside class="work-sidebar" aria-label="研究工作区">
    <!-- 1. 顶部品牌与折叠按钮 -->
    <div class="work-brand">
      <router-link to="/" class="brand-link" aria-label="Paper to Any 首页">
        <span class="brand-text">Paper <span class="brand-to">to</span> Any</span>
        <span class="brand-star">✦</span>
      </router-link>
      <button
        type="button"
        class="icon-btn collapse-btn"
        aria-label="收起侧边栏"
        title="收起侧边栏"
        @click="workbenchStore.toggleRail"
      >
        <svg class="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 3h18v18H3z M9 3v18" />
        </svg>
      </button>
    </div>

    <!-- 2. 中间可滚动的导航菜单区 -->
    <div class="work-navigation" tabindex="0" role="region" aria-label="可滚动的工作区导航">
      <!-- ＋ 新建研究大按钮 -->
      <button
        type="button"
        class="btn new-research carved-pressable"
        @click="handleNewResearch"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14 M5 12h14" />
        </svg>
        <span>新建研究</span>
      </button>

      <nav aria-label="工作区导航">
        <!-- 分组 1: 我的工作空间 -->
        <p class="nav-group-label">我的工作空间</p>

        <!-- 研究库及其子层级树 -->
        <div class="nav-library-group">
          <a
            href="#library"
            class="workspace-link"
            :class="{ active: activeNav === 'library' }"
            @click.prevent="selectNav('library')"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4v16 M9 4v16 M14 4v16 M18 4l3 16" />
            </svg>
            <span>研究库</span>
          </a>

          <!-- 子菜单树 -->
          <div class="nav-children">
            <a
              href="#my-papers"
              class="workspace-link"
              :class="{ active: activeNav === 'my-papers' }"
              @click.prevent="selectNav('my-papers')"
            >
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 3h9l4 4v14H6z M14 3v5h5 M9 12h7 M9 16h7" />
              </svg>
              <span>我的论文</span>
            </a>

            <a
              href="#results"
              class="workspace-link"
              :class="{ active: activeNav === 'results' || workbenchStore.activeTab === 'reading' }"
              @click.prevent="selectNav('results')"
            >
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z" />
              </svg>
              <span>研究成果</span>
            </a>

            <a
              href="#recent"
              class="workspace-link"
              :class="{ active: activeNav === 'recent' }"
              @click.prevent="selectNav('recent')"
            >
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8v5l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
              </svg>
              <span>最近阅读</span>
            </a>
          </div>
        </div>

        <!-- 独立导航项 -->
        <a
          href="#guide"
          class="workspace-link"
          :class="{ active: activeNav === 'guide' }"
          @click.prevent="selectNav('guide')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z" />
          </svg>
          <span>研究工具</span>
        </a>

        <a
          href="#assistant"
          class="workspace-link"
          :class="{ active: activeNav === 'assistant' || workbenchStore.activeTab === 'chat' }"
          @click.prevent="selectNav('assistant')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 4h18v13H8l-5 4z M7 8h10 M7 12h7" />
          </svg>
          <span>研究会话</span>
        </a>

        <a
          href="#tasks"
          class="workspace-link"
          :class="{ active: activeNav === 'tasks' }"
          @click.prevent="selectNav('tasks')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12h4l3-7 4 14 3-7h4" />
          </svg>
          <span>任务中心</span>
        </a>

        <a
          href="#activity"
          class="workspace-link"
          :class="{ active: activeNav === 'activity' }"
          @click.prevent="selectNav('activity')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 4v5h5 M3 9a9 9 0 1 1 0 6 M12 7v6l3 2" />
          </svg>
          <span>最近活动</span>
        </a>

        <!-- 分组 2: 发现与参考 -->
        <p class="nav-group-label">发现与参考</p>

        <a
          href="#search"
          class="workspace-link"
          :class="{ active: activeNav === 'search' }"
          @click.prevent="selectNav('search')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 15l6 6 M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0" />
          </svg>
          <span>探索论文</span>
        </a>

        <a
          href="#outputs"
          class="workspace-link"
          :class="{ active: activeNav === 'outputs' }"
          @click.prevent="selectNav('outputs')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 4h18v16H3z M9 8l7 4-7 4z" />
          </svg>
          <span>成果与素材</span>
        </a>
      </nav>
    </div>

    <!-- 3. 底部固定账户与设置区 -->
    <div class="work-account">
      <!-- 额度信息条 -->
      <div class="workspace-credit">
        <a href="#credits" class="credit-link" @click.prevent>我的用量</a>
        <span class="meta-badge">内测额度</span>
      </div>

      <!-- 设置链接 -->
      <a
        href="#settings"
        class="workspace-link settings-link"
        :class="{ active: activeNav === 'settings' }"
        @click.prevent="selectNav('settings')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3v3 M12 18v3 M3 12h3 M18 12h3 M6 6l2 2 M16 16l2 2 M6 18l2-2 M16 8l2-2 M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
        </svg>
        <span>设置</span>
      </a>

      <!-- 账户胶囊卡片与上浮菜单 -->
      <div ref="accountWrapRef" class="account-wrap">
        <button
          type="button"
          class="workspace-account"
          :aria-expanded="isAccountMenuOpen"
          aria-haspopup="true"
          @click="isAccountMenuOpen = !isAccountMenuOpen"
        >
          <span class="avatar-circle">
            {{ userInitial }}
          </span>
          <span class="identity">
            <strong :title="userDisplayName">{{ userDisplayName }}</strong>
            <small :title="userEmail">{{ userEmail }}</small>
          </span>
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 8l3-3 3 3 M9 16l3 3 3-3" />
          </svg>
        </button>

        <!-- 上浮式账户操作气泡 (对齐原版 account-menu) -->
        <div v-show="isAccountMenuOpen" class="account-menu">
          <div class="account-profile">
            <span class="avatar-circle small">
              {{ userInitial }}
            </span>
            <div class="profile-details">
              <strong>{{ userDisplayName }}</strong>
              <span class="meta">{{ userEmail }}</span>
            </div>
          </div>
          <div class="account-actions">
            <router-link to="/login" class="account-action" @click="isAccountMenuOpen = false">切换账号</router-link>
            <button type="button" class="account-action logout-action" @click="handleLogout">退出当前登录</button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkbenchStore } from '@/stores/workbench'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const workbenchStore = useWorkbenchStore()
const authStore = useAuthStore()

const activeNav = ref('results')
const isAccountMenuOpen = ref(false)
const accountWrapRef = ref<HTMLElement | null>(null)

const userEmail = computed(() => authStore.identity?.email || '3121906711@qq.com')
const userDisplayName = computed(() => {
  if (authStore.identity?.email) {
    return authStore.identity.email.split('@')[0]
  }
  return '3121906711'
})
const userInitial = computed(() => {
  return userDisplayName.value.charAt(0).toUpperCase()
})

function selectNav(key: string) {
  activeNav.value = key
  if (key === 'results') {
    workbenchStore.setStageTab('reading')
  } else if (key === 'assistant') {
    workbenchStore.setStageTab('chat')
  }
}

function handleNewResearch() {
  selectNav('my-papers')
}

async function handleLogout() {
  try {
    await authStore.logout()
    isAccountMenuOpen.value = false
    await router.push('/')
  } catch (err) {
    console.error('退出登录异常:', err)
  }
}

function handleClickOutside(e: MouseEvent) {
  if (accountWrapRef.value && !accountWrapRef.value.contains(e.target as Node)) {
    isAccountMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 100% 对齐原版 product-shell.mjs & consumer-ui.css */
.work-sidebar {
  width: 260px;
  min-width: 260px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #ebe8ef;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  user-select: none;
  overflow: hidden;
}

/* 1. 顶部品牌与折叠 */
.work-brand {
  height: 64px;
  min-height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0ecf4;
  box-sizing: border-box;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  text-decoration: none;
}

.brand-text {
  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.7px;
  color: #1f1b26;
}

.brand-to {
  color: #7b689a;
  font-weight: 600;
}

.brand-star {
  font-size: 15px;
  color: #e8957c;
  margin-left: 2px;
}

.collapse-btn {
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

.collapse-btn:hover {
  background: #f7f4fb;
  color: #35206d;
  border-color: #cbbedf;
}

.panel-icon {
  width: 17px;
  height: 17px;
}

/* 2. 中间滚动导航区 */
.work-navigation {
  flex: 1;
  padding: 16px 14px 10px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ddd7e6 transparent;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.work-navigation::-webkit-scrollbar {
  width: 4px;
}

.work-navigation::-webkit-scrollbar-thumb {
  background: #ddd7e6;
  border-radius: 4px;
}

/* ＋ 新建研究大按钮 */
.new-research {
  width: 100%;
  min-height: 44px;
  padding: 10px 16px;
  margin-bottom: 12px;
  background: #654987;
  color: #ffffff;
  border: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(101, 73, 135, 0.28);
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.new-research:hover {
  background: #553974;
  box-shadow: 0 6px 18px rgba(101, 73, 135, 0.38);
  transform: translateY(-1px);
}

.new-research .nav-icon {
  width: 16px;
  height: 16px;
}

/* 分组标题 */
.nav-group-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: #99929f;
  margin: 12px 6px 4px;
  text-transform: uppercase;
}

/* 导航链接 */
.workspace-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  color: #655f70;
  text-decoration: none;
  font-size: 13px;
  font-weight: 550;
  transition: all 0.16s ease;
  box-sizing: border-box;
}

.workspace-link:hover {
  background: #f6f4f9;
  color: #463a5c;
}

.workspace-link.active {
  background: #eee9f5;
  color: #574576;
  box-shadow: inset 2px 0 0 #8c79b3;
  font-weight: 650;
}

.workspace-link .nav-icon {
  width: 18px;
  height: 18px;
  opacity: 0.78;
  flex-shrink: 0;
}

.workspace-link.active .nav-icon {
  opacity: 1;
  stroke-width: 1.9;
}

/* 子菜单树 */
.nav-library-group {
  display: flex;
  flex-direction: column;
}

.nav-children {
  border-left: 1px solid #e8e3ee;
  margin-left: 20px;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
  margin-bottom: 2px;
}

.nav-children .workspace-link {
  padding: 7px 10px;
  font-size: 13px;
}

/* 3. 底部固定区域 */
.work-account {
  padding: 10px 14px 14px;
  border-top: 1px solid #ebe8ef;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.workspace-credit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  font-size: 12px;
}

.credit-link {
  color: #716880;
  text-decoration: none;
  font-weight: 500;
}

.credit-link:hover {
  color: #35206d;
}

.meta-badge {
  font-size: 11px;
  color: #9287a1;
  background: #f4eff9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-mono);
}

.settings-link {
  padding: 8px 12px;
}

/* 用户胶囊卡片 */
.account-wrap {
  position: relative;
  margin-top: 4px;
}

.workspace-account {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid #eae5ef;
  border-radius: 12px;
  background: #faf8fc;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  box-sizing: border-box;
}

.workspace-account:hover {
  background: #f3ecf8;
  border-color: #dcd3e5;
}

.avatar-circle {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  background: #e9e1f1;
  color: #654987;
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-mono);
}

.avatar-circle.small {
  width: 30px;
  height: 30px;
  min-width: 30px;
  font-size: 13px;
}

.identity {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.identity strong {
  font-size: 13px;
  font-weight: 650;
  color: #1f1b26;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.identity small {
  font-size: 11px;
  color: #8a8194;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--font-mono);
}

.chevron-icon {
  width: 16px;
  height: 16px;
  color: #9287a1;
  flex-shrink: 0;
}

/* 上浮式菜单 */
.account-menu {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e0d5e9;
  box-shadow: 0 -10px 30px rgba(48, 35, 56, 0.14);
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 50;
  box-sizing: border-box;
}

.account-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 6px;
  border-bottom: 1px solid #f0ebf5;
  padding-bottom: 8px;
}

.profile-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.profile-details strong {
  font-size: 13px;
  color: #18141f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-details .meta {
  font-size: 11px;
  color: #8c8299;
  font-family: var(--font-mono);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.account-actions {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.account-action {
  padding: 8px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #463a5c;
  font-size: 13px;
  font-weight: 550;
  text-decoration: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease;
}

.account-action:hover {
  background: #f7f2fa;
  color: #654987;
}

.logout-action {
  color: #b33939;
}

.logout-action:hover {
  background: #feeae8;
  color: #c0392b;
}
</style>
