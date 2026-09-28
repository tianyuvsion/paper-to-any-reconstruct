<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="invite-email" class="form-label">受邀学者邮箱</label>
      <div class="input-shell carved-well">
        <input
          id="invite-email"
          v-model.trim="email"
          type="email"
          required
          autocomplete="email"
          placeholder="scholar@university.edu"
          class="carved-native-input"
          :disabled="loading"
        />
      </div>
    </div>

    <div class="form-group">
      <div class="label-row">
        <label for="invite-code" class="form-label">内测受邀密钥</label>
        <span class="field-tag">Invite Code</span>
      </div>
      <div class="input-shell carved-well">
        <input
          id="invite-code"
          v-model="accessCode"
          type="password"
          required
          autocomplete="current-password"
          placeholder="输入由团队发放的邀请码"
          class="carved-native-input"
          :disabled="loading"
        />
      </div>
      <span class="field-hint">受邀成员共用测试空间，上传的论文将可在共享研究库中核验。</span>
    </div>

    <button
      type="submit"
      class="primary-submit-btn carved-pressable"
      :disabled="loading || !isValid"
    >
      <span v-if="!loading">进入共享研究空间</span>
      <span v-else class="loading-state">
        <span class="spinner"></span>
        <span>正在核验证据与凭据…</span>
      </span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { InviteLoginPayload } from '@/types/auth'

const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: InviteLoginPayload): void
}>()

const email = ref('')
const accessCode = ref('')

const isValid = computed(() => {
  return email.value.includes('@') && accessCode.value.trim().length > 0
})

function handleSubmit() {
  if (!isValid.value || props.loading) return
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

.field-tag {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--c-muted);
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
