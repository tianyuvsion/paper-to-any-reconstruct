<template>
  <div class="guide-chapters-container">
    <!-- 章节 01: 放入论文 -->
    <article v-if="activeChapter === 'import'" class="chapter-card carved-card">
      <div class="chapter-info">
        <span class="chapter-num">CHAPTER 01</span>
        <h3 class="chapter-title">放入论文：从原文开始，不丢失出处</h3>
        <p class="chapter-desc">
          支持上传最大 50MB 的学术 PDF。系统在本地提取正文与图表，实时计算文件哈希与页码索引。第一步只呈现从原文中真实抽取的事实，杜绝无依据生成的幻觉。
        </p>
        <div class="feature-bullets">
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>拖拽直接导入，扫描件明确提示 OCR</span>
          </div>
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>保存原件哈希与物理页码，全程可核验</span>
          </div>
        </div>
      </div>
      <div class="chapter-visual carved-well">
        <div class="mock-import-box">
          <span class="mock-upload-icon">＋</span>
          <strong>拖入 PDF 论文</strong>
          <small>系统自动核验题名、DOI 与作者</small>
        </div>
      </div>
    </article>

    <!-- 章节 02: 选择读法 -->
    <article v-else-if="activeChapter === 'modes'" class="chapter-card carved-card">
      <div class="chapter-info">
        <span class="chapter-num">CHAPTER 02</span>
        <h3 class="chapter-title">选择读法：同一篇论文，三种阅读视角</h3>
        <p class="chapter-desc">
          同一份实验数据，大众想看懂突破意义，研究者需追问实验边界与可复现性，企业研判关注工业落地条件与成本效益。按需切换，互不混淆。
        </p>
        <div class="modes-preview-tabs">
          <span class="mode-tag mode-public">大众视角 · 直觉发现</span>
          <span class="mode-tag mode-researcher">研究者视角 · 证据链条</span>
          <span class="mode-tag mode-enterprise">企业视角 · 工程边界</span>
        </div>
      </div>
      <div class="chapter-visual carved-well">
        <div class="mock-card-fan">
          <div class="fan-card fan-1">大众理解</div>
          <div class="fan-card fan-2">研究者深读</div>
          <div class="fan-card fan-3">企业研判</div>
        </div>
      </div>
    </article>

    <!-- 章节 03: 核对证据 -->
    <article v-else-if="activeChapter === 'evidence'" class="chapter-card carved-card">
      <div class="chapter-info">
        <span class="chapter-num">CHAPTER 03</span>
        <h3 class="chapter-title">核对证据：结论再精彩，也要看限制条件</h3>
        <p class="chapter-desc">
          每一张生成的结论卡片，都标明其推导置信度，并直接附带原文页码直达链接。同时清晰标识负面结果与实验边界，守住科研求真底线。
        </p>
        <div class="feature-bullets">
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>标明置信度区间与推导假设</span>
          </div>
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>一键穿透直达 PDF 对应页码</span>
          </div>
        </div>
      </div>
      <div class="chapter-visual carved-well">
        <div class="mock-evidence-box">
          <div class="mock-evidence-header">
            <span>原文引证 · P.04</span>
            <strong class="text-teal">置信度: 94%</strong>
          </div>
          <p class="mock-quote">
            “The steady-state high-confinement regime was sustained without major disruption...”
          </p>
        </div>
      </div>
    </article>

    <!-- 章节 04: 沿文追问 -->
    <article v-else-if="activeChapter === 'ask'" class="chapter-card carved-card">
      <div class="chapter-info">
        <span class="chapter-num">CHAPTER 04</span>
        <h3 class="chapter-title">沿文追问：带着好奇心，与论文多轮对话</h3>
        <p class="chapter-desc">
          针对特定段落、图表或公式随时发问。AI 回复自动绑定具体引文依据，不编造不存在的引用，让学术交流既敏捷又可靠。
        </p>
        <div class="feature-bullets">
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>公式、图表数据上下文感知问答</span>
          </div>
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>多轮会话记录可一键导出为 Markdown</span>
          </div>
        </div>
      </div>
      <div class="chapter-visual carved-well">
        <div class="mock-chat-flow">
          <div class="chat-bubble user">这项结论适用于常压还是真空？</div>
          <div class="chat-bubble ai">
            <strong>依据第 3 节实验设置：</strong>
            EAST 等离子体腔室必须维持在超高真空（< 10⁻⁵ Pa）状态下运行。
          </div>
        </div>
      </div>
    </article>

    <!-- 章节 05: 多媒体表达 -->
    <article v-else-if="activeChapter === 'outputs'" class="chapter-card carved-card">
      <div class="chapter-info">
        <span class="chapter-num">CHAPTER 05</span>
        <h3 class="chapter-title">多媒体表达：把纸质长文变成视听资产</h3>
        <p class="chapter-desc">
          不仅有静态文字，还能一键生成伴随式音频播客、实验微视频与学术海报。适合团队汇报、文献分享与科学传播。
        </p>
        <div class="feature-bullets">
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>双人对谈通勤播客（MP3 格式）</span>
          </div>
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>高清微视频与一页学术海报</span>
          </div>
        </div>
      </div>
      <div class="chapter-visual carved-well">
        <div class="mock-media-grid">
          <div class="mock-m-item">🎧 播客音频</div>
          <div class="mock-m-item">🎬 微视频</div>
          <div class="mock-m-item">📑 学术海报</div>
        </div>
      </div>
    </article>

    <!-- 章节 06: 收好研究 -->
    <article v-else class="chapter-card carved-card">
      <div class="chapter-info">
        <span class="chapter-num">CHAPTER 06</span>
        <h3 class="chapter-title">收好研究：建立属于您的文献网络</h3>
        <p class="chapter-desc">
          所有研读记录、精选卡片、高亮书签与生成成果，均妥善保存在您的专属空间中。按课题分类管理，随时调取回顾。
        </p>
        <div class="feature-bullets">
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>阅读位置与笔记自动同步</span>
          </div>
          <div class="bullet-item">
            <span class="b-dot">✦</span>
            <span>支持多篇论文交叉对比与收藏夹管理</span>
          </div>
        </div>
      </div>
      <div class="chapter-visual carved-well">
        <div class="mock-organize-box">
          <div class="lib-row">
            <span>EAST 千秒聚变实验</span>
            <small>已生成 3 视角</small>
          </div>
          <div class="lib-row">
            <span>AlphaFold CASP14 原理</span>
            <small>已研读</small>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeChapter: string
}>()
</script>

<style scoped>
.guide-chapters-container {
  width: 100%;
}

.chapter-card {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 40px;
  align-items: center;
  padding: 44px 40px;
  border-radius: 28px;
  background: #ffffff;
}

.chapter-num {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #7254b3;
  font-family: var(--font-mono);
  display: block;
  margin-bottom: 10px;
}

.chapter-title {
  margin: 0 0 14px;
  font-family: var(--font-serif);
  font-size: clamp(24px, 2.8vw, 34px);
  color: #18141f;
  line-height: 1.3;
}

.chapter-desc {
  margin: 0 0 24px;
  font-size: 15px;
  line-height: 1.8;
  color: #625d6d;
}

.feature-bullets {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bullet-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #4b3e64;
  font-weight: 600;
}

.b-dot {
  color: #167f7a;
  font-size: 12px;
}

/* 视觉插画盒 */
.chapter-visual {
  min-height: 240px;
  padding: 24px;
  display: grid;
  place-items: center;
}

.mock-import-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px;
  border: 2px dashed #b9b0c8;
  border-radius: 18px;
  background: #ffffff;
  width: 80%;
  text-align: center;
}

.mock-upload-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #35206d;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 24px;
}

.modes-preview-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mode-tag {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.mode-public {
  background: #d9f1ef;
  color: #167f7a;
}
.mode-researcher {
  background: #f0eafb;
  color: #513995;
}
.mode-enterprise {
  background: #fff4ea;
  color: #b25820;
}

.mock-card-fan {
  position: relative;
  width: 180px;
  height: 120px;
}

.fan-card {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(48, 33, 80, 0.1);
  border: 1px solid #dcd7e5;
}
.fan-1 {
  background: #ffffff;
  color: #167f7a;
  transform: rotate(-10deg);
}
.fan-2 {
  background: #f0eafb;
  color: #513995;
  transform: rotate(2deg) translateY(-8px);
}
.fan-3 {
  background: #fff4ea;
  color: #b25820;
  transform: rotate(12deg) translateY(4px);
}

.mock-evidence-box {
  width: 85%;
  background: #ffffff;
  border-radius: 14px;
  padding: 16px;
  border: 1px solid #d9d4e2;
}

.mock-evidence-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #71697e;
  margin-bottom: 8px;
}

.text-teal {
  color: #167f7a;
  font-weight: 700;
}

.mock-quote {
  font-size: 13px;
  color: #29253a;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
  font-family: var(--font-serif);
}

.mock-chat-flow {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-bubble {
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.5;
}
.chat-bubble.user {
  align-self: flex-end;
  background: #35206d;
  color: #ffffff;
}
.chat-bubble.ai {
  align-self: flex-start;
  background: #ffffff;
  color: #29253a;
  border: 1px solid #dcd7e5;
}

.mock-media-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 90%;
}

.mock-m-item {
  background: #ffffff;
  border: 1px solid #dcd7e5;
  border-radius: 12px;
  padding: 20px 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: #35206d;
}

.mock-organize-box {
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lib-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #dcd7e5;
  font-size: 13px;
  color: #29253a;
}
.lib-row small {
  color: #167f7a;
  font-weight: 600;
}

@media (max-width: 900px) {
  .chapter-card {
    grid-template-columns: 1fr;
    padding: 28px 20px;
  }
}
</style>
