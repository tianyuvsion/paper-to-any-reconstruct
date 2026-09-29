<template>
  <details ref="detailsRef" class="home-account" :open="isOpen">
    <summary
      :aria-label="`账号：${userDisplayName}`"
      @click.prevent="toggleMenu"
    >
      {{ initialChar }}
    </summary>
    <div v-if="isOpen">
      <strong>{{ userDisplayName }}</strong>
      <router-link to="/workspace" @click="closeMenu">研读工作台</router-link>
      <router-link to="/login" @click="closeMenu">切换账号</router-link>
      <button type="button" :disabled="isLoggingOut" @click="handleLogout">
        {{ isLoggingOut ? '正在退出…' : '退出登录' }}
      </button>
    </div>
  </details>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const detailsRef = ref<HTMLDetailsElement | null>(null)
const isOpen = ref(false)
const isLoggingOut = ref(false)

const email = computed(() => authStore.identity?.email || '')
const userDisplayName = computed(() => {
  if (!email.value) return '研读学者'
  if (email.value === 'local@paper-to-any') return '本机内测'
  return email.value
})

const initialChar = computed(() => {
  const name = userDisplayName.value
  return name.charAt(0).toUpperCase()
})

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

async function handleLogout() {
  isLoggingOut.value = true
  try {
    await authStore.logout()
    closeMenu()
    await router.push('/')
  } catch (err) {
    console.error('退出登录异常:', err)
  } finally {
    isLoggingOut.value = false
  }
}

function handleClickOutside(event: MouseEvent) {
  if (detailsRef.value && !detailsRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    closeMenu()
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
/* 100% 对齐原版 product-home.css 的 .home-account 规范 */
.home-account {
  position: relative;
  display: inline-block;
}

.home-account summary {
  list-style: none;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #e9e1f1;
  color: #654987;
  cursor: pointer;
  font-size: 16px;
  font-weight: 650;
  user-select: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.home-account summary::-webkit-details-marker {
  display: none;
}

.home-account summary:hover {
  background: #ded4e8;
  color: #4b327b;
}

.home-account summary img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.home-account > div {
  position: absolute;
  right: 0;
  top: 52px;
  min-width: 190px;
  padding: 12px;
  display: grid;
  gap: 5px;
  background: #fff;
  border: 1px solid #e0d5e9;
  box-shadow: 0 12px 30px #30233822;
  border-radius: 16px;
  z-index: 1000;
  box-sizing: border-box;
}

.home-account > div :is(a, button, strong) {
  padding: 10px;
  text-align: left;
  font-size: 14px;
  border-radius: 8px;
  box-sizing: border-box;
}

.home-account > div strong {
  color: #29253a;
  font-weight: 650;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #f0ebf5;
  padding-bottom: 8px;
  margin-bottom: 2px;
}

.home-account > div a {
  color: #3b2853;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.home-account > div a:hover {
  background: #f7f2fa;
  color: #4b327b;
}

.home-account > div button {
  border: 0;
  background: transparent;
  color: #655078;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.home-account > div button:hover:not(:disabled) {
  background: #f7f2fa;
  color: #b33939;
}

.home-account > div button:disabled {
  opacity: 0.5;
  cursor: wait;
}
</style>
