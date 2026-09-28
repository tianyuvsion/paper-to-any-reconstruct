<template>
  <header class="site-header portal-header product-home-header">
    <router-link to="/" class="brand" aria-label="Paper to Any 首页">
      Paper <span>to</span> Any
    </router-link>

    <nav aria-label="首页导航">
      <a class="portal-nav-anchor" href="#experience" @click.prevent="scrollTo('#experience')">
        产品功能
      </a>
      <a class="portal-nav-anchor" href="#gallery" @click.prevent="scrollTo('#gallery')">
        示例体验
      </a>

      <!-- 根据登录状态自适应渲染 -->
      <template v-if="authStore.isAuthenticated">
        <router-link class="btn" to="/workspace">进入研究库</router-link>
        <span class="scholar-tag" :title="authStore.userDisplayName">{{ authStore.userDisplayName }}</span>
      </template>
      <template v-else>
        <router-link class="btn outline" to="/login">登录</router-link>
        <router-link class="btn" to="/login">开始研究</router-link>
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

function scrollTo(selector: string) {
  const el = document.querySelector(selector)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.scholar-tag {
  font-size: 12px;
  color: #7254b3;
  padding: 4px 10px;
  background: #f0eafb;
  border-radius: 8px;
  font-family: var(--font-mono);
}
</style>
