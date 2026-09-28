import { apiClient } from './client'
import type {
  BetaIdentity,
  InviteLoginPayload,
  PasswordLoginPayload,
  EmailOtpRequestPayload,
  EmailOtpRequestResponse,
  EmailOtpVerifyPayload,
  AuthMethodsResponse
} from '@/types/auth'

export const authApi = {
  // 1. 邀请码登录
  loginWithInvite(payload: InviteLoginPayload): Promise<BetaIdentity> {
    return apiClient.post('/api/v1/auth/login', payload)
  },

  // 2. 密码登录
  loginWithPassword(payload: PasswordLoginPayload): Promise<BetaIdentity> {
    return apiClient.post('/api/v1/auth/password/login', payload)
  },

  // 3. 邮箱验证码申请
  requestEmailOtp(payload: EmailOtpRequestPayload): Promise<EmailOtpRequestResponse> {
    return apiClient.post('/api/v1/auth/email/request', payload)
  },

  // 4. 邮箱验证码核验登录
  verifyEmailOtp(payload: EmailOtpVerifyPayload): Promise<BetaIdentity> {
    return apiClient.post('/api/v1/auth/email/verify', payload)
  },

  // 5. 获取当前会话身份
  getCurrentUser(): Promise<BetaIdentity> {
    return apiClient.get('/api/v1/auth/me')
  },

  // 6. 登出
  logout(): Promise<void> {
    return apiClient.post('/api/v1/auth/logout')
  },

  // 7. 查询当前环境支持的登录途径
  getAuthMethods(): Promise<AuthMethodsResponse> {
    return apiClient.get('/api/v1/auth/methods')
  }
}
