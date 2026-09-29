<template>
  <div ref="dropdownRef" class="user-account-dropdown">
    <!-- 头像触发按钮 -->
    <button
      type="button"
      class="avatar-trigger-btn"
      :class="{ active: isOpen }"
      :aria-label="`账户菜单：${displayName}`"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      @click="toggleDropdown"
    >
      <span class="user-avatar" :style="{ backgroundColor: avatarTone }">
        {{ initialChar }}
      </span>
      <span class="user-name-label">{{ displayName }}</span>
      <svg class="chevron-icon" :class="{ rotated: isOpen }" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
        <path d="M4.293 5.293a1 1 0 011.414 0L8 7.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
      </svg>
    </button>

    <!-- 下拉菜单浮层 -->
    <Transition name="dropdown-fade">
      <div v-if="isOpen" class="account-menu-popover carved-card">
        <!-- 1. 用户摘要卡片 -->
        <div class="popover-header">
          <span class="popover-avatar" :style="{ backgroundColor: avatarTone }">
            {{ initialChar }}
          </span>
          <div class="popover-user-info">
            <div class="user-title-row">
              <strong class="user-name" :title="displayName">{{ displayName }}</strong>
              <span class="role-badge">{{ isDevUser ? '本机开发' : '受邀学者' }}</span>
            </div>
            <span class="user-email" :title="email">{{ email }}</span>
          </div>
        </div>

        <div class="menu-divider"></div>

        <!-- 2. 功能操作区 -->
        <nav class="popover-nav" aria-label="用户快捷菜单">
          <router-link
            to="/workspace"
            class="menu-item"
            @click="isOpen = false"
          >
            <span class="item-icon">📖</span>
            <span class="item-label">核心研读工作台</span>
            <span class="item-hint">直达</span>
          </router-link>

          <router-link
            to="/"
            class="menu-item"
            @click="isOpen = false"
          >
            <span class="item-icon">🏛️</span>
            <span class="item-label">访问门户首页</span>
          </router-link>

          <router-link
            to="/login"
            class="menu-item"
            @click="isOpen = false"
          >
            <span class="item-icon">🔄</span>
            <span class="item-label">切换登录账号</span>
          </router-link>
        </nav>

        <div class="menu-divider"></div>

        <!-- 3. 底部退出操作 -->
        <div class="popover-footer">
          <button
            type="button"
            class="logout-btn"
            :disabled="isLoggingOut"
            @click="handleLogout"
          >
            <span class="logout-icon">🚪</span>
            <span>{{ isLoggingOut ? '正在退出…' : '退出登录' }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const dropdownRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const isLoggingOut = ref(false)

// 用户信息解析
const email = computed(() => authStore.identity?.email || '')
const displayName = computed(() => {
  if (!email.value) return '研读学者'
  if (email.value === 'local@paper-to-any') return '本机内测'
  return email.value.split('@')[0]
})
const isDevUser = computed(() => authStore.identity?.authentication === 'development')
const initialChar = computed(() => {
  const name = displayName.value
  return name.charAt(0).toUpperCase()
})

// 根据邮箱哈希生成稳定的头像底色
const avatarTone = computed(() => {
  const palette = [
    '#7254B3',
    '#177E89',
    '#3267AD',
    '#BD5268',
    '#2E7D32',
    '#C2185B',
    '#6A1B9A'
  ]
  if (!email.value) return palette[0]
  let hash = 0
  for (let i = 0; i < email.value.length; i++) {
    hash = (hash << 5) - hash + email.value.charCodeAt(i)
    hash |= 0
  }
  const index = Math.abs(hash) % palette.length
  return palette[index]
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

// 退出登录
async function handleLogout() {
  isLoggingOut.value = true
  try {
    await authStore.logout()
    isOpen.value = false
    // 退出后跳转回首页或刷新当前状态
    await router.push('/')
  } catch (err) {
    console.error('退出异常:', err)
  } finally {
    isLoggingOut.value = false
  }
}

// 点击外部关闭 (Click Outside)
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// 按 ESC 键关闭
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.user-account-dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* 头像按钮 */
.avatar-trigger-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 10px 3px 4px;
  background: #ffffff;
  border: 1px solid #ded7e8;
  border-radius: 24px;
  color: #29253a;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 2px 6px rgba(48, 32, 79, 0.05);
}

.avatar-trigger-btn:hover,
.avatar-trigger-btn.active {
  border-color: #a28abe;
  background: #fbf9fd;
  box-shadow: 0 4px 12px rgba(114, 84, 179, 0.14);
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font-mono, monospace);
  box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.15);
}

.user-name-label {
  font-size: 13px;
  font-weight: 600;
  color: #35206d;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron-icon {
  color: #8c8299;
  transition: transform 0.2s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

/* 弹层卡片 */
.account-menu-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 260px;
  background: #ffffff;
  border: 1px solid #ded7e8;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(48, 32, 79, 0.16), 0 2px 6px rgba(48, 32, 79, 0.04);
  z-index: 1000;
  overflow: hidden;
}

/* 头部信息卡片 */
.popover-header {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(180deg, #faf7fc 0%, #ffffff 100%);
}

.popover-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 17px;
  font-weight: 700;
  font-family: var(--font-mono, monospace);
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(114, 84, 179, 0.25);
}

.popover-user-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.user-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-name {
  font-size: 14px;
  font-weight: 700;
  color: #18141f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role-badge {
  font-size: 10px;
  color: #7254b3;
  background: #ede6f8;
  padding: 1px 6px;
  border-radius: 6px;
  font-weight: 600;
  white-space: nowrap;
}

.user-email {
  font-size: 12px;
  color: #8c8299;
  font-family: var(--font-mono, monospace);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-divider {
  height: 1px;
  background: #f0ebf5;
  margin: 0;
}

/* 导航项 */
.popover-nav {
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: #35206d;
  font-size: 13px;
  font-weight: 550;
  transition: background 0.15s ease, color 0.15s ease;
}

.menu-item:hover {
  background: #f5effc;
  color: #513995;
}

.item-icon {
  font-size: 15px;
}

.item-label {
  flex: 1;
}

.item-hint {
  font-size: 11px;
  color: #a28abe;
  font-family: var(--font-mono, monospace);
}

/* 底部操作 */
.popover-footer {
  padding: 6px;
  background: #faf8fd;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #c0392b;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}

.logout-btn:hover:not(:disabled) {
  background: #feeae8;
}

.logout-btn:disabled {
  opacity: 0.6;
  cursor: wait;
}

/* 过渡动画 */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
