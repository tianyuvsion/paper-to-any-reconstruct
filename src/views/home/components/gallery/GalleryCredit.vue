<template>
  <div class="gallery-credit">
    <div class="credit-badge">
      <span class="dot"></span>
      <span>案例出处 · 科学核对声明</span>
    </div>
    <p class="credit-text">
      以上示例基于真实顶刊论文：
      <strong>A 1056-second long-pulse high-confinement plasma regime on EAST</strong>（<em>Science Advances</em>, 2023）。
      所有卡片提取与评分皆来自论文真实实验数据，AI 不会脱离原文自拟结论。
    </p>
  </div>
</template>

<style scoped>
.gallery-credit {
  margin-top: 36px;
  padding: 16px 20px;
  background: #f7f5fa;
  border-radius: 16px;
  border: 1px dashed #dcd6e6;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.credit-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 750;
  color: #167f7a;
  background: #d9f1ef;
  padding: 4px 10px;
  border-radius: 20px;
  flex-shrink: 0;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #167f7a;
}

.credit-text {
  margin: 0;
  font-size: 13px;
  color: #625d6d;
  line-height: 1.6;
}

.credit-text strong {
  color: #18141f;
}

.credit-text em {
  font-style: italic;
  font-family: var(--font-serif);
}
</style>
