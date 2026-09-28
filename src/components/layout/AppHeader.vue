<template>
  <header class="topbar">
    <router-link to="/" class="brand" aria-label="Paper to Any 首页">
      <span class="brand-mark">R²</span>
      <span class="brand-copy">
        <strong>Paper to Any</strong>
        <small>Research Site · Reconstruct</small>
      </span>
    </router-link>

    <div class="top-actions">
      <span class="connection-status" :class="statusClass">
        <span class="status-indicator"></span>
        <span>{{ statusText }}</span>
      </span>

      <template v-if="authStore.isAuthenticated">
        <span class="account-badge" :title="authStore.userDisplayName">
          {{ authStore.userDisplayName }}
        </span>
        <button
          type="button"
          class="logout-button carved-pressable"
          @click="handleLogout"
        >
          退出
        </button>
      </template>
      <template v-else>
        <router-link to="/login" class="login-link">
          成员登录
        </router-link>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const statusText = computed(() => {
  if (authStore.health?.status === 'ok') {
    return `后端就绪 · ${authStore.health.contract}`
  }
  if (authStore.health) {
    return '后端已连接'
  }
  return '独立体验模式'
})

const statusClass = computed(() => {
  if (authStore.health?.status === 'ok') return 'status-ok'
  return 'status-standby'
})

async function handleLogout() {
  await authStore.logout()
  await router.push('/login')
}
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  min-height: 80px;
  padding: 12px clamp(20px, 4vw, 64px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--c-line);
  background: rgba(250, 249, 252, 0.88);
  backdrop-filter: blur(18px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  background: var(--c-purple-primary);
  color: #fff;
  border-radius: var(--radius-sm);
  font-family: var(--font-serif);
  font-size: 21px;
  box-shadow: 0 4px 14px rgba(53, 32, 109, 0.18);
}

.brand-copy strong {
  display: block;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.brand-copy small {
  display: block;
  margin-top: 2px;
  font-size: 11px;
  color: var(--c-muted);
  font-family: var(--font-mono);
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.connection-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-family: var(--font-mono);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
}

.status-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.status-ok {
  color: var(--c-teal);
  background: var(--c-teal-soft);
}
.status-ok .status-indicator {
  background: var(--c-teal);
  box-shadow: 0 0 6px rgba(22, 127, 122, 0.4);
}

.status-standby {
  color: var(--c-muted);
  background: var(--c-lavender-soft);
}
.status-standby .status-indicator {
  background: var(--c-muted);
}

.account-badge {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: var(--c-copy);
  font-weight: 600;
  padding: 6px 12px;
  background: var(--c-paper);
  border: 1px solid var(--c-line);
  border-radius: var(--radius-sm);
}

.logout-button {
  padding: 6px 14px;
  border: 1px solid var(--c-line);
  border-radius: var(--radius-sm);
  background: var(--c-paper);
  color: var(--c-danger);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background: var(--c-danger-soft);
  border-color: rgba(169, 36, 45, 0.3);
}

.login-link {
  padding: 8px 16px;
  background: var(--c-purple-primary);
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
.login-link:hover {
  background: var(--c-purple-secondary);
  text-decoration: none;
}

@media (max-width: 640px) {
  .connection-status {
    display: none;
  }
}
</style>
