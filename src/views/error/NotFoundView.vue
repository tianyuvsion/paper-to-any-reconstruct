<template>
  <div class="not-found-page">
    <div class="not-found-card carved-card">
      <span class="error-code">404</span>
      <h1 class="error-title">该学术页面或文献不存在</h1>
      <p class="error-desc">您访问的资源地址可能已被迁移、归档，或者尚未建立索引。</p>
      <router-link to="/" class="back-home-btn carved-pressable">
        返回研读工作台
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: var(--c-ground);
}

.not-found-card {
  max-width: 500px;
  width: 100%;
  padding: 48px 36px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.error-code {
  font-family: var(--font-serif);
  font-size: 64px;
  font-weight: 700;
  color: var(--c-purple-primary);
  line-height: 1;
}

.error-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 22px;
  color: var(--c-ink);
}

.error-desc {
  margin: 0;
  color: var(--c-copy);
  font-size: 14px;
  line-height: 1.6;
}

.back-home-btn {
  margin-top: 12px;
  padding: 12px 24px;
  background: var(--c-purple-primary);
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

.back-home-btn:hover {
  background: var(--c-purple-secondary);
  text-decoration: none;
}
</style>
