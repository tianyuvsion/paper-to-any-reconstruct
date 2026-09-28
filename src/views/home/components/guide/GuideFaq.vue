<template>
  <section class="guide-faq">
    <header class="faq-header">
      <span class="faq-kicker">QUESTIONS &amp; ANSWERS</span>
      <h3 class="faq-title">常见疑问与说明</h3>
      <p class="faq-desc">了解关于内测授权、AI 证据边界与使用流程的说明。</p>
    </header>

    <div class="faq-accordion">
      <details
        v-for="item in faqs"
        :key="item.id"
        class="faq-item carved-card"
      >
        <summary class="faq-summary">
          <span>{{ item.question }}</span>
          <span class="summary-arrow">›</span>
        </summary>
        <div class="faq-answer">
          <p>{{ item.answer }}</p>
        </div>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FaqItem } from '@/types/home'

const faqs: FaqItem[] = [
  {
    id: '1',
    question: '需要先注册才能使用吗？',
    answer: '首页提供的 EAST 千秒实验示例全功能对所有访客开放试听与试读。研读您自己的论文需通过受邀邮箱或内测口令验证身份，以保证学术空间的隐私与独立存储。'
  },
  {
    id: '2',
    question: '应该选择哪种阅读模式？',
    answer: '建议首次接触新领域时从「大众理解」开始建立概念框架；需要深入掌握实验参数与复现细节时切换至「研究者深读」；关注产业转化、落地可行性与专利风险时选择「企业研判」。'
  },
  {
    id: '3',
    question: '三种模式可以随时切换吗？',
    answer: '可以。同一篇论文上传解析后，您可以随时在三种视角间自由无缝切换，所有卡片与问答记录均独立保存。'
  },
  {
    id: '4',
    question: '生成过程中可以离开页面吗？',
    answer: '可以。所有大模型编译与多媒体生成任务均由后端异步 Fair Queue 任务队列执行，退出或刷新浏览器不会丢失进度，重新登录后即可在工作台查看生成好的成果。'
  },
  {
    id: '5',
    question: '生成的播客、视频与海报保存在哪里？',
    answer: '生成的音视频与高清海报资产集中归档在您的个人工作台媒体库中，支持在线高速流式播放，亦可下载 MP3/MP4/PNG 原文件用于学术汇报。'
  },
  {
    id: '6',
    question: 'AI 生成的内容可以直接当作最终论文结论引用吗？',
    answer: '严谨提示：AI 提取与评分仅为辅助研读工具，不可替代同行评议与专业实验验证。系统已为您标注了每一处观点的物理页码出处，正式学术引用请以作者原文 PDF 为准。'
  }
]
</script>

<style scoped>
.guide-faq {
  margin-top: 64px;
  width: 100%;
}

.faq-header {
  text-align: center;
  margin-bottom: 36px;
}

.faq-kicker {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #167f7a;
  font-family: var(--font-mono);
  display: block;
  margin-bottom: 8px;
}

.faq-title {
  margin: 0 0 10px;
  font-family: var(--font-serif);
  font-size: clamp(26px, 3.2vw, 36px);
  color: #18141f;
}

.faq-desc {
  margin: 0;
  color: #625d6d;
  font-size: 14px;
}

.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 860px;
  margin: 0 auto;
}

.faq-item {
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e2deea;
  transition: all 0.2s ease;
}

.faq-summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  font-size: 15px;
  font-weight: 700;
  color: #18141f;
  cursor: pointer;
  user-select: none;
}

.faq-summary::-webkit-details-marker {
  display: none;
}

.summary-arrow {
  font-size: 20px;
  color: #7254b3;
  transition: transform 0.25s ease;
}

details[open] .summary-arrow {
  transform: rotate(90deg);
}

details[open] {
  box-shadow: 0 8px 24px rgba(48, 33, 80, 0.08);
}

.faq-answer {
  padding: 0 24px 20px;
  color: #625d6d;
  font-size: 14px;
  line-height: 1.8;
  border-top: 1px solid #f2edf8;
  padding-top: 14px;
}

.faq-answer p {
  margin: 0;
}
</style>
