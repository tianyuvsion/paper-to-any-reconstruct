import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import type { ApiErrorResponse, AppError } from '@/types/api'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 30000,
  withCredentials: true, // 核心：支持 HttpOnly Session Cookie 传递
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['X-Request-ID'] = `web-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status
    const data = error.response?.data

    let friendlyMessage = '网络请求失败，请稍后重试'
    if (typeof data?.detail === 'string') {
      friendlyMessage = data.detail
    } else if (Array.isArray(data?.detail) && data.detail.length > 0) {
      friendlyMessage = data.detail.map((d) => d.msg).join('；')
    } else if (data?.detail && typeof data.detail === 'object' && 'message' in data.detail && data.detail.message) {
      friendlyMessage = data.detail.message
    } else if (status === 401) {
      friendlyMessage = '会话已过期或未授权，请登录'
    } else if (status === 403) {
      friendlyMessage = '请求来源受限或无操作权限'
    } else if (status === 429) {
      friendlyMessage = '请求过于频繁，已被系统限流，请稍候再试'
    } else if (status === 503) {
      friendlyMessage = '后端服务暂时不可用'
    }

    const customError = new Error(friendlyMessage) as AppError
    customError.status = status
    const retryHeader = error.response?.headers['retry-after']
    if (retryHeader) {
      customError.retryAfter = parseInt(retryHeader, 10)
    }

    return Promise.reject(customError)
  }
)
