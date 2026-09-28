export interface BetaIdentity {
  email: string
  authentication: 'session' | 'development' | 'bearer'
  shared_workspace: boolean
  expires_at?: string | null
}

export interface InviteLoginPayload {
  email: string
  access_code: string
}

export interface PasswordLoginPayload {
  email: string
  password: string
}

export interface EmailOtpRequestPayload {
  email: string
  purpose?: 'login' | 'password_reset'
}

export interface EmailOtpRequestResponse {
  challenge_id: string
  expires_in: number
  retry_after: number
  delivery_status: 'not_disclosed' | 'delivered'
}

export interface EmailOtpVerifyPayload {
  challenge_id: string
  code: string
  password?: string
}

export interface AuthMethodDetail {
  implemented: boolean
  configured: boolean
  reason?: string | null
}

export interface AuthMethodsResponse {
  invite: AuthMethodDetail
  password: AuthMethodDetail
  email_otp: AuthMethodDetail
  sms: AuthMethodDetail
  wechat: AuthMethodDetail
  google: AuthMethodDetail
}
