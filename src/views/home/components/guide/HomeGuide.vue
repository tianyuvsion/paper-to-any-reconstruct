<template>
  <section
    class="portal-guide"
    id="usage"
    aria-labelledby="usageTitle"
    :data-guide-paused="!motionRunning"
  >
    <!-- 导览总标题 -->
    <header class="portal-guide-heading">
      <p class="portal-kicker">FROM PAPER TO POSSIBILITY</p>
      <h2 id="usageTitle">一篇论文，<br>怎样变成你的理解？</h2>
      <p>跟着 EAST 千秒实验，走一遍从原文到表达的研究旅程。<br>点一点、翻一翻，在这里先试试。</p>
      <div class="guide-heading-bottom">
        <span>交互导览 · 基于 EAST 现有内容</span>
        <button
          type="button"
          class="guide-motion"
          :aria-pressed="motionRunning"
          @click="motionRunning = !motionRunning"
        >
          {{ motionRunning ? '暂停动画' : '播放动画' }}
        </button>
      </div>
    </header>

    <!-- 吸顶子导航 -->
    <nav class="guide-nav" aria-label="产品介绍">
      <a href="#start" @click.prevent="scrollTo('#start')">放入论文</a>
      <a href="#modes" @click.prevent="scrollTo('#modes')">选择读法</a>
      <a href="#read" @click.prevent="scrollTo('#read')">核对证据</a>
      <a href="#ask" @click.prevent="scrollTo('#ask')">沿文追问</a>
      <a href="#outputs" @click.prevent="scrollTo('#outputs')">多媒体表达</a>
      <a href="#organize" @click.prevent="scrollTo('#organize')">收好研究</a>
    </nav>

    <!-- 01 / 放入论文 -->
    <section class="guide-chapter guide-import" id="start">
      <header class="guide-chapter-heading">
        <p class="portal-kicker">01 / START WITH A PAPER</p>
        <h2>先找到原文，<br>再打开更多可能。</h2>
        <p>从 PDF 或 DOI 开始。确认论文身份，让后面的卡片、追问与表达都有共同的起点。</p>
      </header>
      <div class="guide-stage guide-stage-lilac">
        <div class="guide-window">
          <div class="guide-window-bar">
            <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
            <small>新建研究</small>
          </div>
          <div class="guide-steps" role="group" aria-label="导入演示步骤">
            <button type="button" :aria-pressed="importStep === 0" @click="importStep = 0"><span>01</span>放入论文</button>
            <button type="button" :aria-pressed="importStep === 1" @click="importStep = 1"><span>02</span>识别信息</button>
            <button type="button" :aria-pressed="importStep === 2" @click="importStep = 2"><span>03</span>确认原文</button>
          </div>

          <!-- 帧 0 -->
          <div class="guide-frame" :hidden="importStep !== 0">
            <div class="guide-import-layout">
              <div class="guide-paper-float">
                <div style="background:#fff; width:155px; height:200px; border-radius:4px; box-shadow:0 12px 25px rgba(73,54,84,0.15); margin:auto; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:12px;">
                  <span style="font-size:10px; font-weight:800; color:#35206d;">Science Advances · 2023</span>
                  <div style="height:4px; width:80%; background:#dcd7e5; margin:12px 0 6px;"></div>
                  <div style="height:4px; width:90%; background:#dcd7e5; margin-bottom:6px;"></div>
                  <div style="height:4px; width:70%; background:#dcd7e5;"></div>
                </div>
                <span>Science Advances · 2023</span>
              </div>
              <div class="guide-drop">
                <span class="guide-upload" aria-hidden="true">↥</span>
                <h3>从你的论文开始</h3>
                <p>PDF 文件 · DOI</p>
                <button type="button" @click="importStep = 1">用 EAST 示例试一次 →</button>
                <small>在此演示导入过程</small>
              </div>
            </div>
          </div>

          <!-- 帧 1 -->
          <div class="guide-frame" :hidden="importStep !== 1">
            <div class="guide-identify">
              <div class="guide-scanning">
                <div style="background:#fff; width:165px; height:210px; padding:12px; display:flex; flex-direction:column; justify-content:center;">
                  <strong style="font-size:11px; color:#513995;">EAST 1056s Experiment</strong>
                  <div style="height:3px; background:#e2deea; margin:8px 0;"></div>
                  <div style="height:3px; background:#e2deea; width:75%;"></div>
                </div>
                <i aria-hidden="true"></i>
              </div>
              <div>
                <p class="guide-status">正在整理原文信息</p>
                <h3>让论文的身份<br>先清晰起来。</h3>
                <ul class="guide-checklist">
                  <li>✓ 题名与作者信息</li>
                  <li>✓ 期刊、年份与 DOI</li>
                  <li>✓ 原文与图表入口</li>
                </ul>
                <div class="guide-loading-line" aria-hidden="true"></div>
              </div>
            </div>
          </div>

          <!-- 帧 2 -->
          <div class="guide-frame" :hidden="importStep !== 2">
            <div class="guide-confirm">
              <span class="guide-status">✓ 原文已就绪</span>
              <h3>EAST 托卡马克千秒级 Super I-mode 高约束等离子体的实现</h3>
              <p>1056 秒的高约束运行，怎样依靠多套系统持续协同？沿着原文、图表和媒体，读懂这次实验的结果与边界。</p>
              <div class="guide-chips">
                <span class="guide-chip">Science Advances</span>
                <span class="guide-chip">2023</span>
                <span class="guide-chip">DOI 10.1126/sciadv.abq5273</span>
              </div>
              <router-link to="/workspace" class="btn">从我的论文开始 ↗</router-link>
            </div>
          </div>
        </div>
        <p class="guide-stage-caption">先确认论文，再开始生成。所有结果始终关联同一篇原文。</p>
      </div>

      <div class="guide-features">
        <div>
          <h3>两种开始方式</h3>
          <p>手边有文件就从 PDF 开始；已经找到论文，也可以粘贴 DOI。</p>
        </div>
        <div>
          <h3>先确认，再继续</h3>
          <p>核对题名、年份与来源，避免研究从错误的论文开始。</p>
        </div>
        <div>
          <h3>等待也看得见</h3>
          <p>解析与生成分别呈现状态。回到任务中心，可以继续查看进度。</p>
        </div>
      </div>
    </section>

    <!-- 02 / 选择读法 -->
    <section class="guide-chapter guide-modes" id="modes">
      <header class="guide-chapter-heading">
        <p class="portal-kicker">02 / CHOOSE YOUR PERSPECTIVE</p>
        <h2>同一篇研究，<br>从你的问题出发。</h2>
        <p>先理解发生了什么，深入核对怎么做到，或判断还缺哪些工程条件。读法不同，卡片的组织也不同。</p>
      </header>

      <div class="guide-mode-tabs" role="group" aria-label="阅读模式">
        <button type="button" :aria-pressed="modeTab === 'public'" @click="modeTab = 'public'">
          大众理解<small>9 张卡片</small>
        </button>
        <button type="button" :aria-pressed="modeTab === 'researcher'" @click="modeTab = 'researcher'">
          研究者深读<small>12 张卡片</small>
        </button>
        <button type="button" :aria-pressed="modeTab === 'enterprise'" @click="modeTab = 'enterprise'">
          企业研判<small>15 张卡片</small>
        </button>
      </div>

      <div class="guide-mode-deck">
        <!-- 大众模式 -->
        <div class="guide-mode-panel" :hidden="modeTab !== 'public'">
          <div class="guide-mode-copy">
            <span class="guide-big-index">09<small>张卡片，一条阅读路径</small></span>
            <h3>想读懂研究，也想讲给别人听</h3>
            <p>先讲研究做到了什么，再解释关键数字、与你的关系和原文。音频、视频与海报帮助理解和转述。</p>
            <p class="guide-mode-question">EAST 为什么要持续 1056 秒？这与聚变发电还有多远？</p>
            <router-link to="/workspace" class="btn outline">查看大众理解方案 ↗</router-link>
          </div>
          <div class="guide-card-fan" data-tone="public">
            <h3>大众理解</h3>
            <div class="guide-card-list">
              <span style="--order:0"><small>01</small>研究还原</span>
              <span style="--order:1"><small>02</small>视频</span>
              <span style="--order:2"><small>03</small>主要发现</span>
              <span style="--order:3"><small>04</small>为什么值得看</span>
              <span style="--order:4"><small>05</small>原文导读</span>
              <span style="--order:5"><small>06</small>音频</span>
              <span style="--order:6"><small>07</small>关键数据</span>
              <span style="--order:7"><small>08</small>一页海报</span>
              <span style="--order:8"><small>09</small>继续深读</span>
            </div>
          </div>
        </div>

        <!-- 研究者模式 -->
        <div class="guide-mode-panel" :hidden="modeTab !== 'researcher'">
          <div class="guide-mode-copy">
            <span class="guide-big-index">12<small>张卡片，一条阅读路径</small></span>
            <h3>做文献阅读、课题研究或方法核对</h3>
            <p>围绕文献脉络、创新、实验方法、结果对照、公式与原图，逐步核对结论的证据和复现条件。</p>
            <p class="guide-mode-question">放电 #106915 的工况、H98y2 与热流数据怎样支撑结论？</p>
            <router-link to="/workspace" class="btn outline">查看研究者深读方案 ↗</router-link>
          </div>
          <div class="guide-card-fan" data-tone="researcher">
            <h3>研究者深读</h3>
            <div class="guide-card-list">
              <span style="--order:0"><small>01</small>系统与机理</span>
              <span style="--order:1"><small>02</small>实验概览</span>
              <span style="--order:2"><small>03</small>文献谱系</span>
              <span style="--order:3"><small>04</small>方法创新</span>
              <span style="--order:4"><small>05</small>主要结果</span>
              <span style="--order:5"><small>06</small>实验设计</span>
              <span style="--order:6"><small>07</small>关键参数</span>
              <span style="--order:7"><small>08</small>参数定义</span>
              <span style="--order:8"><small>09</small>适用边界</span>
              <span style="--order:9"><small>10</small>证据强度</span>
              <span style="--order:10"><small>11</small>待验证问题</span>
              <span style="--order:11"><small>12</small>图表证据</span>
            </div>
          </div>
        </div>

        <!-- 企业模式 -->
        <div class="guide-mode-panel" :hidden="modeTab !== 'enterprise'">
          <div class="guide-mode-copy">
            <span class="guide-big-index">15<small>张卡片，一条阅读路径</small></span>
            <h3>评估研发方向、技术合作与应用条件</h3>
            <p>区分论文已验证的能力、产业位置、成熟度、迁移条件、尽调问题和风险，帮助判断下一步需要验证什么。</p>
            <p class="guide-mode-question">千秒控制能力能迁移到哪些子系统？还缺哪些堆级验证？</p>
            <router-link to="/workspace" class="btn outline">查看企业研判方案 ↗</router-link>
          </div>
          <div class="guide-card-fan" data-tone="enterprise">
            <h3>企业研判</h3>
            <div class="guide-card-list">
              <span style="--order:0"><small>01</small>系统构成</span>
              <span style="--order:1"><small>02</small>技术概览</span>
              <span style="--order:2"><small>03</small>技术阶段</span>
              <span style="--order:3"><small>04</small>工程相关性</span>
              <span style="--order:4"><small>05</small>验证成熟度</span>
              <span style="--order:5"><small>06</small>验证缺口</span>
              <span style="--order:6"><small>07</small>运行条件</span>
              <span style="--order:7"><small>08</small>尽调资料</span>
              <span style="--order:8"><small>09</small>技术资产</span>
              <span style="--order:9"><small>10</small>工程化路径</span>
              <span style="--order:10"><small>11</small>证据强度</span>
              <span style="--order:11"><small>12</small>技术风险</span>
              <span style="--order:12"><small>13</small>同类比较</span>
              <span style="--order:13"><small>14</small>性能证据</span>
              <span style="--order:14"><small>15</small>工程参数</span>
            </div>
          </div>
        </div>
      </div>
      <p class="guide-small-note">每份成果保留生成时的模式。想换一个角度，可以另开一份，已有内容仍然保留。</p>
    </section>

    <!-- 03 / 核对证据 -->
    <section class="guide-chapter guide-evidence" id="read">
      <header class="guide-chapter-heading">
        <p class="portal-kicker">03 / FOLLOW THE EVIDENCE</p>
        <h2>先读出发现，<br>再问一句：依据呢？</h2>
        <p>卡片是进入研究的入口。展开解释，回到原文，把论文报告的结果与它没有回答的问题分开。</p>
      </header>

      <div class="guide-stage guide-stage-mint">
        <div class="guide-window">
          <div class="guide-window-bar">
            <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
            <small>研究卡片 / 原文核对</small>
          </div>
          <div class="guide-steps" role="group" aria-label="阅读演示步骤">
            <button type="button" :aria-pressed="evidenceStep === 0" @click="evidenceStep = 0"><span>01</span>看到发现</button>
            <button type="button" :aria-pressed="evidenceStep === 1" @click="evidenceStep = 1"><span>02</span>展开解释</button>
            <button type="button" :aria-pressed="evidenceStep === 2" @click="evidenceStep = 2"><span>03</span>核对原文</button>
          </div>

          <!-- 帧 0 -->
          <div class="guide-frame" :hidden="evidenceStep !== 0">
            <div class="guide-evidence-layout">
              <button class="guide-discovery" type="button" @click="evidenceStep = 1">
                <span>主要发现</span>
                <h3>高约束运行，<br>进入千秒。</h3>
                <div>1056<small>秒</small></div>
                <footer>展开这张卡片 <span>↗</span></footer>
              </button>
              <div class="guide-evidence-copy">
                <span class="guide-status">从一个结果开始</span>
                <h3>EAST 把高约束运行维持了 1056 秒</h3>
                <p>这是纯氘长脉冲实验，不是聚变发电或净能量增益。</p>
              </div>
            </div>
          </div>

          <!-- 帧 1 -->
          <div class="guide-frame" :hidden="evidenceStep !== 1">
            <div class="guide-detail-preview">
              <span class="guide-status">主要发现 · 展开详情</span>
              <h3>EAST 把高约束运行维持了 1056 秒</h3>
              <p>这是纯氘长脉冲实验，不是聚变发电或净能量增益。</p>
              <div class="guide-boundary">
                <span>读到这里，要区分</span>
                <strong>持续运行 ≠ 净能量增益</strong>
                <p>实验持续时间、材料寿命与电站可用性，需要各自的证据。</p>
              </div>
              <button class="outline" type="button" @click="evidenceStep = 2">继续核对原文 →</button>
            </div>
          </div>

          <!-- 帧 2 -->
          <div class="guide-frame" :hidden="evidenceStep !== 2">
            <div class="guide-source-layout">
              <a
                href="https://www.science.org/doi/10.1126/sciadv.abq5273"
                target="_blank"
                rel="noopener"
                class="guide-source-page"
              >
                <div style="background:#fff; width:150px; height:190px; margin:auto; border-radius:4px; box-shadow:0 8px 24px rgba(48,33,80,0.15); padding:10px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                  <span style="font-size:10px; font-weight:800; color:#167f7a;">PDF 原始封面</span>
                </div>
                <span>打开完整 PDF ↗</span>
              </a>
              <div>
                <p class="guide-status">回到论文，而不是停在摘要</p>
                <h3>让每个判断，<br>都有下一步。</h3>
                <ul class="guide-checklist">
                  <li>看研究对象与实验条件</li>
                  <li>沿原文查结果与图表</li>
                  <li>区分报告、解释与未知</li>
                </ul>
                <p class="guide-source-citation">Science Advances · 2023<br>10.1126/sciadv.abq5273</p>
                <router-link to="/workspace" class="btn">走进完整阅读页 ↗</router-link>
              </div>
            </div>
          </div>
        </div>
        <p class="guide-stage-caption">EAST 展示了千秒级高约束运行；这不等于已经证明聚变发电。</p>
      </div>

      <div class="guide-features">
        <div>
          <h3>卡片先建立理解</h3>
          <p>主要发现、研究还原、关键数据和原文导读，各自回答一个问题。</p>
        </div>
        <div>
          <h3>按需要展开</h3>
          <p>先看概览，再进入具体卡片。阅读设置可以调整这一页显示哪些内容。</p>
        </div>
        <div>
          <h3>随时返回证据</h3>
          <p>用原文和图表核对关键判断。原文未报告的条件，保持为未知。</p>
        </div>
      </div>
    </section>

    <!-- 试用带章节选择的连续图文阅读 (原版核心穿插章节) -->
    <section class="guide-chapter guide-reading-views" id="reading-views">
      <header class="guide-chapter-heading">
        <p class="portal-kicker">READ IT YOUR WAY</p>
        <h2>沿着问题，<br>把一篇论文读通。</h2>
        <p>从顶部选择感兴趣的章节，沿图文自然向下阅读。解释和原图并排呈现，随时回到论文核对来源。</p>
      </header>
      <!-- 原生渲染的原版报刊导读与视频讲解卡片 (杜绝iframe白屏与隔离风险) -->
      <OriginalReadingGuide />
      <div class="guide-features">
        <div>
          <h3>按问题选章节</h3>
          <p>顶部章节选择始终可用，无需反复回到开头。</p>
        </div>
        <div>
          <h3>顺着图文读下去</h3>
          <p>解释和原图连续展开，用滚轮或手指自然阅读。</p>
        </div>
        <div>
          <h3>随时核对来源</h3>
          <p>放大图表，打开对应原文，核对每个判断的依据。</p>
        </div>
      </div>
    </section>

    <!-- 04 / 沿文追问 -->
    <section class="guide-chapter guide-ask" id="ask">
      <header class="guide-chapter-heading">
        <p class="portal-kicker">04 / KEEP ASKING</p>
        <h2>看懂一点，<br>就再往深处问一点。</h2>
        <p>把问题放在论文上下文里。先问清楚一个结果，再追问它的证据、条件与边界。</p>
      </header>

      <div class="guide-ask-grid">
        <div class="guide-ask-copy">
          <span class="guide-orbit-art" aria-hidden="true">
            <svg class="consumer-art" viewBox="0 0 280 195" aria-hidden="true" focusable="false">
              <path d="M49 54q0-20 21-20h113q22 0 22 22v66q0 22-22 22h-60l-32 28v-28H70q-21 0-21-22z" fill="currentColor" opacity=".12"></path>
              <path d="M67 28h116q19 0 19 19v60q0 19-19 19h-66l-27 23v-23H67q-19 0-19-19V47q0-19 19-19z" fill="#fff9ef" stroke="currentColor" stroke-width="2"></path>
              <circle cx="91" cy="77" r="7" fill="currentColor"></circle>
              <circle cx="125" cy="77" r="7" fill="currentColor"></circle>
              <circle cx="159" cy="77" r="7" fill="currentColor"></circle>
              <path d="m218 120 5 15 16 5-16 5-5 16-5-16-16-5 16-5z" fill="currentColor"></path>
            </svg>
          </span>
          <h3>一个持续展开的<br>研读空间。</h3>
          <p>问答适合聚焦一个疑问；深入分析帮助你展开更完整的讨论。切换方式时，已经输入的问题会保留。</p>
          <div class="guide-chips">
            <span class="guide-chip">论文上下文</span>
            <span class="guide-chip">问答 / 深入分析</span>
            <span class="guide-chip">对话历史</span>
          </div>
          <router-link to="/workspace" class="btn">进入 AI 研读 ↗</router-link>
        </div>

        <div class="guide-stage guide-stage-cream">
          <div class="guide-window">
            <div class="guide-window-bar">
              <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
              <small>AI 研读 · 示例对话</small>
            </div>
            <div class="guide-steps" role="group" aria-label="追问演示步骤">
              <button type="button" :aria-pressed="askStep === 0" @click="askStep = 0"><span>01</span>提出疑问</button>
              <button type="button" :aria-pressed="askStep === 1" @click="askStep = 1"><span>02</span>阅读回应</button>
              <button type="button" :aria-pressed="askStep === 2" @click="askStep = 2"><span>03</span>继续核对</button>
            </div>

            <div class="guide-frame" :hidden="askStep !== 0">
              <div class="guide-conversation">
                <div class="guide-context">▤ EAST · 千秒实验</div>
                <h3>从哪一个问题开始？</h3>
                <button type="button" class="guide-question-bubble" @click="askStep = 1">
                  1056 秒运行，意味着可以发电了吗？ <span>↗</span>
                </button>
                <div class="guide-typing" aria-hidden="true"><i></i><i></i><i></i></div>
                <p>点一下问题，看看如何沿着论文追问。</p>
              </div>
            </div>

            <div class="guide-frame" :hidden="askStep !== 1">
              <div class="guide-conversation">
                <div class="guide-question-bubble">1056 秒运行，意味着可以发电了吗？</div>
                <div class="guide-answer">
                  <span>✳ 研读回应示例</span>
                  <p>先区分实验持续时间和电站性能。这个示例不能仅凭 1056 秒运行推导净发电、材料寿命或商业化时间；这些判断需要各自的证据。</p>
                </div>
                <button class="outline" type="button" @click="askStep = 2">下一步核对什么？ →</button>
              </div>
            </div>

            <div class="guide-frame" :hidden="askStep !== 2">
              <div class="guide-conversation">
                <span class="guide-status">把问题变成核对路径</span>
                <h3>回到结果、条件<br>和研究边界。</h3>
                <ul class="guide-checklist">
                  <li>这次实验具体报告了哪些结果？</li>
                  <li>结果成立依赖哪些条件？</li>
                  <li>哪些问题仍需另行验证？</li>
                </ul>
                <button type="button" class="btn" @click="$emit('prompt', '为什么 EAST 的千秒运行不能直接证明聚变发电？')">
                  带着这个问题开始 ↗
                </button>
                <small>问题会带入首页输入区；登录后可继续。</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05 / 多媒体表达 -->
    <section class="guide-chapter guide-outputs" id="outputs">
      <header class="guide-chapter-heading">
        <p class="portal-kicker">05 / GIVE KNOWLEDGE A NEW FORM</p>
        <h2>让论文有声音，<br>也有可以分享的样子。</h2>
        <p>把理解带出阅读页。听一段研究讲解，看实验影像，或用一页海报把结果与边界一起讲清楚。</p>
      </header>

      <div class="guide-media-grid">
        <article class="guide-media-item guide-audio">
          <p class="guide-status">音频 / 通勤播客</p>
          <div class="guide-record-art">
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
          </div>
          <h3>给眼睛放个假，<br>让耳朵接着读。</h3>
          <p>从装置、控制到结果与局限，沿章节听懂研究。</p>
          <button type="button" @click="$emit('preview', 'audio')">▷ 试听 EAST 播客</button>
        </article>

        <article class="guide-media-item guide-video">
          <div style="width:100%; height:190px; background:radial-gradient(circle, #2b3947, #101920); display:grid; place-items:center; color:#fff; font-size:32px;">🔥</div>
          <div>
            <p class="guide-status">视频 / 论文讲解</p>
            <h3>让抽象的实验，<br>在眼前发生。</h3>
            <p>用现有 EAST 影像与讲解，回顾千秒实验。</p>
            <button type="button" @click="$emit('preview', 'video')">▷ 播放 43 秒影像</button>
          </div>
        </article>

        <article class="guide-media-item guide-poster">
          <p class="guide-status">海报 / 一页表达</p>
          <div style="width:140px; height:185px; margin:0 auto; background:#fff; border-radius:6px; box-shadow:0 8px 18px rgba(101,67,84,0.15); display:grid; place-items:center; font-size:12px; color:#513995; font-weight:800;">
            EAST 海报
          </div>
          <h3>把一个发现，<br>讲给更多人听。</h3>
          <button type="button" @click="$emit('preview', 'poster')">展开完整海报 ↗</button>
        </article>
      </div>

      <div class="guide-features">
        <div>
          <h3>素材与论文在一起</h3>
          <p>从同一篇研究进入已有的音频、视频和海报，原文来源始终可查。</p>
        </div>
        <div>
          <h3>先预览，再带走</h3>
          <p>打开播放器或完整海报，确认内容后再进入素材页查看下载入口。</p>
        </div>
        <div>
          <h3>换表达，保留边界</h3>
          <p>讲解与视觉表达辅助理解；是否支持某个科学判断，仍需回到原文。</p>
        </div>
      </div>
      <div class="guide-center-action">
        <router-link to="/workspace" class="btn outline">查看全部 EAST 素材与下载 ↗</router-link>
      </div>
    </section>

    <!-- 06 / 收好研究 -->
    <section class="guide-chapter guide-organize" id="organize">
      <header class="guide-chapter-heading">
        <p class="portal-kicker">06 / MAKE IT YOURS</p>
        <h2>研究会继续，<br>不必每次从头开始。</h2>
        <p>论文、成果和任务分别安放。回来时，找得到上次读到哪里，也找得到已经整理好的内容。</p>
      </header>

      <div class="guide-stage guide-stage-pink">
        <div class="guide-window">
          <div class="guide-window-bar">
            <span class="brand brand-compact" role="img" aria-label="Paper to Any">Paper <span>to</span> Any</span>
            <small>我的研究空间</small>
          </div>
          <div class="guide-steps" role="group" aria-label="研究库演示步骤">
            <button type="button" :aria-pressed="organizeStep === 0" @click="organizeStep = 0"><span>01</span>我的论文</button>
            <button type="button" :aria-pressed="organizeStep === 1" @click="organizeStep = 1"><span>02</span>研究成果</button>
            <button type="button" :aria-pressed="organizeStep === 2" @click="organizeStep = 2"><span>03</span>任务中心</button>
          </div>

          <!-- 帧 0 -->
          <div class="guide-frame" :hidden="organizeStep !== 0">
            <div class="guide-library-row">
              <div style="background:#fff; width:145px; height:180px; border-radius:5px; box-shadow:0 8px 20px rgba(84,53,93,0.15); display:grid; place-items:center; font-size:12px; color:#513995;">
                EAST 原文封面
              </div>
              <div>
                <span class="guide-chip">EAST 示例论文</span>
                <h3>EAST 托卡马克千秒级 Super I-mode 高约束等离子体的实现</h3>
                <p>Science Advances · 2023</p>
                <router-link to="/workspace" class="btn outline">继续我的研究 ↗</router-link>
              </div>
            </div>
          </div>

          <!-- 帧 1 -->
          <div class="guide-frame" :hidden="organizeStep !== 1">
            <div class="guide-saved-results">
              <span class="guide-status">按用途保留每份成果</span>
              <h3>读过的、生成的，<br>都回到这篇研究。</h3>
              <div>
                <router-link to="/workspace">
                  <strong>大众理解</strong>
                  <small>9 张卡片</small>
                </router-link>
                <router-link to="/workspace">
                  <strong>研究者深读</strong>
                  <small>12 张卡片</small>
                </router-link>
                <router-link to="/workspace">
                  <strong>企业研判</strong>
                  <small>15 张卡片</small>
                </router-link>
              </div>
            </div>
          </div>

          <!-- 帧 2 -->
          <div class="guide-frame" :hidden="organizeStep !== 2">
            <div class="guide-task-preview">
              <h3>等待的时候，<br>也知道发生了什么。</h3>
              <div class="guide-task-row" data-state="complete"><span>✓</span><strong>研究还原</strong><small>已完成</small></div>
              <div class="guide-task-row" data-state="running"><span>◌</span><strong>主要发现</strong><small>生成中</small></div>
              <div class="guide-task-row" data-state="failed"><span>!</span><strong>视频</strong><small>需要重试</small></div>
              <router-link to="/workspace">打开任务中心，查看详情 ↗</router-link>
            </div>
          </div>
        </div>
        <p class="guide-stage-caption">这里展示不同状态的组织方式；你的真实研究记录在登录后的工作空间中。</p>
      </div>

      <div class="guide-features">
        <div>
          <h3>我的论文</h3>
          <p>从收藏的论文继续阅读，核对原文与来源。</p>
        </div>
        <div>
          <h3>研究成果</h3>
          <p>找回按不同用途生成的内容，已有成果不会因新任务而消失。</p>
        </div>
        <div>
          <h3>任务中心</h3>
          <p>查看排队、生成、完成或失败状态，再进入详情继续操作。</p>
        </div>
      </div>
    </section>

    <!-- 常见问题 FAQ -->
    <section class="landing-faq" id="questions">
      <div>
        <p class="portal-kicker">BEFORE YOU BEGIN</p>
        <h2>还有一些，<br>你可能想知道。</h2>
      </div>
      <div>
        <details>
          <summary>需要先注册吗？</summary>
          <p>EAST 研究示例可以免登录阅读。保存论文或进入自己的研究空间，需要先登录或创建账号。首页输入的问题会保留，登录后可确认发送。</p>
        </details>
        <details>
          <summary>应该选哪种阅读模式？</summary>
          <p>先建立直觉、想讲给别人听，可以从大众理解开始；核对方法与证据，选择研究者深读；评估研发与合作条件，选择企业研判。上方可切换查看三套完整卡片清单。</p>
        </details>
        <details>
          <summary>模式可以随时切换吗？</summary>
          <p>每份生成成果固定一种模式。开始前可比较卡片清单；需要其他用途时，另行生成一份，已有内容会保留。</p>
        </details>
        <details>
          <summary>生成过程中可以离开页面吗？</summary>
          <p>可以继续浏览其他内容。任务中心和生成提醒会呈现进度，完成后从任务或研究库进入对应成果。</p>
        </details>
        <details>
          <summary>音视频和海报在哪里？</summary>
          <p>在论文阅读页的相应卡片，或示例素材页查看已有内容。先预览，再使用对应的下载入口。</p>
        </details>
        <details>
          <summary>AI 内容可以直接当作论文结论吗？</summary>
          <p>请结合原文核对。研究解释与媒体用于辅助理解；原文未报告的数据和条件，不应由生成内容补成事实。</p>
        </details>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OriginalReadingGuide from './OriginalReadingGuide.vue'

defineEmits<{
  (e: 'preview', previewId: string): void
  (e: 'prompt', text: string): void
}>()

const motionRunning = ref(true)
const importStep = ref(2)
const modeTab = ref<'public' | 'researcher' | 'enterprise'>('public')
const evidenceStep = ref(0)
const askStep = ref(0)
const organizeStep = ref(1)

function scrollTo(selector: string) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* 保证 outline 按钮具备原版精美样式 */
button.outline, .btn.outline, .outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  border: 1px solid #cfc5dc;
  border-radius: 12px;
  background: #ffffff;
  color: #513995;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(48, 33, 80, 0.05);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 18px;
}

button.outline:hover, .btn.outline:hover, .outline:hover {
  background: #f4effb;
  border-color: #9d85be;
  color: #35206d;
  transform: translateY(-1px);
  box-shadow: 0 5px 12px rgba(48, 33, 80, 0.1);
}

button.outline:active, .btn.outline:active, .outline:active {
  transform: translateY(1px);
}
</style>
