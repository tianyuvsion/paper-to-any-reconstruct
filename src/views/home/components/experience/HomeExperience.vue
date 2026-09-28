<template>
  <section class="portal-experience" id="experience">
    <div class="portal-experience-copy">
      <p class="portal-kicker">READ. REMIX. UNDERSTAND.</p>
      <h2>理解不必<br>只有一种形状。</h2>
      <p>
        读一张卡片，沿原文追问。<br>
        听一段讲解，再把理解讲给别人听。
      </p>
      <router-link to="/workspace" class="btn">
        走进这篇研究 ↗
      </router-link>
    </div>

    <div class="portal-experience-stage">
      <div class="portal-experience-paper">
        <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
          <g transform="rotate(-12 140 100)">
            <rect x="63" y="26" width="119" height="150" rx="14" fill="currentColor" opacity=".12"></rect>
            <rect x="78" y="13" width="119" height="150" rx="14" fill="#fffaf0" stroke="currentColor" stroke-width="2"></rect>
            <path d="M98 40h56m-56 15h76m-76 61h75m-75 12h63m-63 12h42" stroke="currentColor" stroke-width="4" opacity=".6"></path>
            <rect x="98" y="73" width="34" height="26" rx="4" fill="currentColor" opacity=".7"></rect>
            <circle cx="163" cy="85" r="17" fill="currentColor" opacity=".22"></circle>
          </g>
        </svg>
        <span>一篇论文</span>
      </div>

      <div class="portal-experience-thread" aria-hidden="true"></div>

      <div class="portal-experience-options">
        <button
          type="button"
          data-portal-preview="finding"
          @click="$emit('select', 'finding')"
        >
          <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
            <g stroke="currentColor" stroke-width="2">
              <rect x="40" y="38" width="103" height="128" rx="18" fill="#e6b8d5" transform="rotate(-18 91 102)"></rect>
              <rect x="80" y="22" width="103" height="138" rx="18" fill="#cbb5f0" transform="rotate(-4 130 88)"></rect>
              <rect x="119" y="36" width="103" height="138" rx="18" fill="#fff9df" transform="rotate(13 170 105)"></rect>
            </g>
            <path d="m166 71 7 19 21 5-21 7-7 22-7-22-20-7 20-5z" fill="currentColor"></path>
            <path d="m149 138 43 10" stroke="currentColor" stroke-width="5"></path>
          </svg>
          <span>读出发现</span>
        </button>

        <button
          type="button"
          data-portal-preview="audio"
          @click="$emit('select', 'audio')"
        >
          <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
            <circle cx="137" cy="97" r="78" fill="#342735"></circle>
            <g fill="none" stroke="#ffdeb2" opacity=".3">
              <circle cx="137" cy="97" r="66"></circle>
              <circle cx="137" cy="97" r="57"></circle>
              <circle cx="137" cy="97" r="47"></circle>
            </g>
            <circle cx="137" cy="97" r="30" fill="#fff3d1"></circle>
            <circle cx="137" cy="97" r="6" fill="#342735"></circle>
            <path d="M212 22h22v88l-29 28" fill="none" stroke="#fff9ef" stroke-width="7" stroke-linecap="round"></path>
          </svg>
          <span>听懂研究</span>
        </button>

        <button
          type="button"
          data-portal-preview="boundary"
          @click="$emit('select', 'boundary')"
        >
          <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
            <g stroke="currentColor" stroke-width="3" opacity=".5">
              <path d="m64 48 74 43 74-46m-74 46-66 64m66-64 77 56m-77-56-5-62"></path>
            </g>
            <g fill="#fff9ef" stroke="currentColor" stroke-width="2">
              <circle cx="64" cy="48" r="21"></circle>
              <circle cx="212" cy="45" r="17"></circle>
              <circle cx="72" cy="155" r="17"></circle>
              <circle cx="215" cy="147" r="25"></circle>
            </g>
            <circle cx="138" cy="91" r="31" fill="currentColor"></circle>
            <path d="m125 90 9 9 17-19" stroke="#fff9ef" stroke-width="4" fill="none"></path>
          </svg>
          <span>追问证据</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'select', id: string): void
}>()
</script>

<style scoped>
/* 继承自 portal.css 与 product-home.css */
</style>
