import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/auth'
import { systemApi } from '@/api/system'
import type {
  BetaIdentity,
  InviteLoginPayload,
  PasswordLoginPayload,
  AuthMethodsResponse
} from '@/types/auth'
import type { HealthCheckResponse } from '@/types/system'
import type { AppError } from '@/types/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const identity = ref<BetaIdentity | null>(null)
  const health = ref<HealthCheckResponse | null>(null)
  const authMethods = ref<AuthMethodsResponse | null>(null)
  const isInitializing = ref(true)
  const isSubmitting = ref(false)
  const errorMessage = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!identity.value)
  const isDevModeOpen = computed(() => {
    return (
      health.value?.authentication === 'development_open' ||
      health.value?.authentication === 'development'
    )
  })
  const authRequired = computed(() => {
    if (!health.value) return true
    return health.value.authentication === 'required'
  })
  const userDisplayName = computed(() => {
    if (!identity.value) return ''
    if (identity.value.authentication === 'development') return '本机开发'
    return identity.value.email
  })

  // Actions
  /**
   * 初始化引导：请求健康检查并探测现有会话
   */
  async function initSession(): Promise<boolean> {
    isInitializing.value = true
    errorMessage.value = null
    try {
      // 1. 尝试获取后端健康状态
      try {
        const healthData = await systemApi.getHealth()
        health.value = healthData
      } catch (err: unknown) {
        const message = (err as Error).message || '未知错误'
        console.warn('后端健康检查暂未连通:', message)
        // 允许开发或降级运行
      }

      // 2. 尝试获取认证方式
      try {
        authMethods.value = await authApi.getAuthMethods()
      } catch {
        // 静默容错
      }

      // 3. 校验现有会话 Cookie
      if (authRequired.value) {
        try {
          const user = await authApi.getCurrentUser()
          identity.value = user
          return true
        } catch (error: unknown) {
          const appErr = error as AppError
          if (appErr?.status === 401) {
            identity.value = null
          }
          return false
        }
      } else {
        // 开发模式免登：直接注入虚拟身份
        identity.value = {
          email: 'local@paper-to-any',
          authentication: 'development',
          shared_workspace: true,
          expires_at: null
        }
        return true
      }
    } catch (err: unknown) {
      const message = (err as Error).message || '网络连接异常'
      errorMessage.value = `系统初始化异常: ${message}`
      return false
    } finally {
      isInitializing.value = false
    }
  }

  /**
   * 邀请码模式登录
   */
  async function loginWithInvite(payload: InviteLoginPayload): Promise<BetaIdentity> {
    isSubmitting.value = true
    errorMessage.value = null
    try {
      const user = await authApi.loginWithInvite(payload)
      identity.value = user
      return user
    } catch (err: unknown) {
      const message = (err as Error).message || '登录验证失败'
      errorMessage.value = message
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * 密码模式登录
   */
  async function loginWithPassword(payload: PasswordLoginPayload): Promise<BetaIdentity> {
    isSubmitting.value = true
    errorMessage.value = null
    try {
      const user = await authApi.loginWithPassword(payload)
      identity.value = user
      return user
    } catch (err: unknown) {
      const message = (err as Error).message || '账号或密码错误'
      errorMessage.value = message
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * 开发环境直通快捷登入
   */
  function bypassLoginForDev(): void {
    identity.value = {
      email: 'dev-scholar@paper-to-any.internal',
      authentication: 'development',
      shared_workspace: true,
      expires_at: null
    }
  }

  /**
   * 登出
   */
  async function logout(): Promise<void> {
    try {
      if (identity.value?.authentication !== 'development') {
        await authApi.logout()
      }
    } catch (err) {
      console.warn('登出请求异常:', err)
    } finally {
      identity.value = null
    }
  }

  return {
    // State
    identity,
    health,
    authMethods,
    isInitializing,
    isSubmitting,
    errorMessage,
    // Getters
    isAuthenticated,
    isDevModeOpen,
    authRequired,
    userDisplayName,
    // Actions
    initSession,
    loginWithInvite,
    loginWithPassword,
    bypassLoginForDev,
    logout
  }
})
