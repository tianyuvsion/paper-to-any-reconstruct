<template>
  <footer class="home-footer">
    <div class="footer-inner">
      <div class="footer-meta">
        <strong>Paper to Any</strong>
        <p>让好奇心，有声有色 · 论文研读与多模态重构平台</p>
        <small>© 2026 天与视界 · V3.0.0 内测版</small>
      </div>

      <nav class="footer-nav" aria-label="页脚导航">
        <a href="#experience" @click.prevent="scrollTo('#experience')">功能总览</a>
        <a href="#gallery" @click.prevent="scrollTo('#gallery')">成果画廊</a>
        <a href="#guide" @click.prevent="scrollTo('#guide')">研读指南</a>
        <router-link to="/login">内测登录</router-link>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
function scrollTo(selector: string) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.home-footer {
  width: 100%;
  border-top: 1px solid #ebe8ef;
  background: #fbfafc;
  padding: 48px 0 64px;
}

.footer-inner {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 36px;
}

.footer-meta strong {
  display: block;
  font-size: 18px;
  font-weight: 800;
  color: #29253a;
  letter-spacing: -0.5px;
}

.footer-meta p {
  margin: 6px 0 8px;
  color: #686274;
  font-size: 13px;
}

.footer-meta small {
  color: #9c96a6;
  font-size: 12px;
  font-family: var(--font-mono);
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.footer-nav a {
  color: #625c6c;
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: #35206d;
}

@media (max-width: 680px) {
  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .footer-nav {
    justify-content: center;
  }
}
</style>
