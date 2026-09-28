import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function setupRouterGuards(router: Router): void {
  router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore()

    // 1. 首次进入页面时确保执行静默会话探针
    if (authStore.isInitializing) {
      await authStore.initSession()
    }

    const { isAuthenticated, authRequired } = authStore

    // 2. 检查未登录访问受保护路由
    if (to.meta.requiresAuth) {
      if (authRequired && !isAuthenticated) {
        return next({
          name: 'Login',
          query: { redirect: to.fullPath }
        })
      }
    }

    // 3. 检查已登录访问游客页面（如 /login）
    if (to.meta.guestOnly && isAuthenticated) {
      const redirect = (to.query.redirect as string) || '/workspace'
      return next(redirect)
    }

    next()
  })

  router.afterEach((to) => {
    if (to.meta.title) {
      document.title = to.meta.title as string
    }
  })
}
