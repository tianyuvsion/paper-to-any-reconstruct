<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="invite-email" class="form-label">邮箱地址</label>
      <div class="input-shell carved-well">
        <input
          id="invite-email"
          v-model.trim="email"
          type="email"
          required
          autocomplete="username"
          placeholder="输入受邀邮箱地址"
          class="carved-native-input"
          :disabled="loading"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="invite-code" class="form-label">内测口令</label>
      <div class="password-input-wrapper carved-well">
        <input
          id="invite-code"
          v-model="accessCode"
          :type="showPassword ? 'text' : 'password'"
          required
          autocomplete="current-password"
          placeholder="输入此账号的内测口令"
          class="carved-native-input"
          :disabled="loading"
        />
        <!-- 输入行内部右侧的小眼睛按钮 -->
        <button
          type="button"
          class="password-eye"
          :aria-label="showPassword ? '隐藏内测口令' : '显示内测口令'"
          :aria-pressed="showPassword"
          :title="showPassword ? '隐藏内测口令' : '显示内测口令'"
          @click="showPassword = !showPassword"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
            <path v-if="showPassword" d="m3 3 18 18" />
          </svg>
        </button>
      </div>
      <div class="login-options">
        <label class="check">
          <input v-model="rememberMe" type="checkbox" />
          <span>记住账号</span>
        </label>
      </div>
    </div>

    <button
      type="submit"
      class="primary-submit-btn carved-pressable"
      :disabled="loading || !isValid"
    >
      <span v-if="!loading">登录</span>
      <span v-else class="loading-state">
        <span class="spinner"></span>
        <span>正在核验证据与凭据…</span>
      </span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { InviteLoginPayload } from '@/types/auth'

const LAST_ACCOUNT_KEY = 'pta.east.last-account.v1'

const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: InviteLoginPayload): void
}>()

const email = ref('')
const accessCode = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

onMounted(() => {
  try {
    const saved = localStorage.getItem(LAST_ACCOUNT_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed?.email) {
        email.value = parsed.email
        rememberMe.value = true
      }
    }
  } catch {
    // 忽略 localStorage 读取异常
  }
})

const isValid = computed(() => {
  return email.value.includes('@') && accessCode.value.trim().length > 0
})

function handleSubmit() {
  if (!isValid.value || props.loading) return
  if (rememberMe.value) {
    try {
      localStorage.setItem(LAST_ACCOUNT_KEY, JSON.stringify({ email: email.value }))
    } catch {
      // 忽略
    }
  } else {
    try {
      localStorage.removeItem(LAST_ACCOUNT_KEY)
    } catch {
      // 忽略
    }
  }
  emit('submit', {
    email: email.value,
    access_code: accessCode.value.trim()
  })
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--c-ink);
}

.input-shell {
  padding: 3px 5px;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding: 3px 5px;
}

.carved-native-input {
  width: 100%;
  padding: 12px 14px;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--c-ink);
  font-size: 15px;
  font-family: inherit;
}

.password-input-wrapper .carved-native-input {
  padding-right: 48px;
}

.carved-native-input::placeholder {
  color: #a7a1b3;
}

.carved-native-input:focus {
  border-radius: var(--radius-sm);
  outline: 2px solid var(--c-purple-secondary);
  outline-offset: -1px;
}

/* 输入行内部右侧的小眼睛按钮 */
.password-eye {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #716a80;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  padding: 0;
}

.password-eye:hover {
  background: rgba(81, 57, 149, 0.08);
  color: var(--c-purple-primary);
}

.login-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #625b6e;
  font-size: 13px;
  margin-top: 4px;
}
.login-options label {
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
}
.login-options input {
  width: 16px;
  height: 16px;
  accent-color: var(--c-purple-primary);
}

.primary-submit-btn {
  margin-top: 6px;
  padding: 15px 22px;
  border: 0;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--c-purple-primary), var(--c-purple-secondary));
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(53, 32, 109, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.primary-submit-btn:hover:not(:disabled) {
  box-shadow: 0 10px 28px rgba(53, 32, 109, 0.32);
  transform: translateY(-1px);
}

.primary-submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
