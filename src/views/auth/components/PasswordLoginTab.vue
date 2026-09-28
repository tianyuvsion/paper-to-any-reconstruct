<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="pwd-email" class="form-label">注册账号邮箱</label>
      <div class="input-shell carved-well">
        <input
          id="pwd-email"
          v-model.trim="email"
          type="email"
          required
          autocomplete="username"
          placeholder="scholar@university.edu"
          class="carved-native-input"
          :disabled="loading"
        />
      </div>
    </div>

    <div class="form-group">
      <div class="label-row">
        <label for="pwd-password" class="form-label">登录密码</label>
        <button
          type="button"
          class="toggle-pwd-btn"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? '隐藏' : '显示' }}
        </button>
      </div>
      <div class="input-shell carved-well">
        <input
          id="pwd-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          required
          autocomplete="current-password"
          placeholder="输入您的账号密码"
          class="carved-native-input"
          :disabled="loading"
        />
      </div>
      <span class="field-hint">已注册密码的成员可直接使用密码登录。</span>
    </div>

    <button
      type="submit"
      class="primary-submit-btn carved-pressable"
      :disabled="loading || !isValid"
    >
      <span v-if="!loading">验证密码并登入</span>
      <span v-else class="loading-state">
        <span class="spinner"></span>
        <span>正在核验凭据…</span>
      </span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PasswordLoginPayload } from '@/types/auth'

const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: PasswordLoginPayload): void
}>()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const isValid = computed(() => {
  return email.value.includes('@') && password.value.length > 0
})

function handleSubmit() {
  if (!isValid.value || props.loading) return
  emit('submit', {
    email: email.value,
    password: password.value
  })
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--c-ink);
}

.toggle-pwd-btn {
  border: 0;
  background: transparent;
  color: var(--c-purple-secondary);
  font-size: 12px;
  cursor: pointer;
  padding: 2px 6px;
}
.toggle-pwd-btn:hover {
  text-decoration: underline;
}

.input-shell {
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

.carved-native-input::placeholder {
  color: #a7a1b3;
}

.carved-native-input:focus {
  border-radius: var(--radius-sm);
  outline: 2px solid var(--c-purple-secondary);
  outline-offset: -1px;
}

.field-hint {
  font-size: 11px;
  color: var(--c-muted);
  line-height: 1.5;
}

.primary-submit-btn {
  margin-top: 6px;
  padding: 16px 22px;
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
