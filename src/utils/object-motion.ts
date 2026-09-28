// 官方原生 3D 机械骨骼与序列帧动画控制器 (Web Component)
// 优先使用当前同源静态路径 /ui/...，确保开发与线上构建产物 100% 自包含、不依赖外部临时域名
const ROOT = '/ui/local-demo/art-proof/objects-v2/'
const REMOTE_FALLBACK = 'https://paper-to-any.8-218-121-139.sslip.io/ui/local-demo/art-proof/objects-v2/'
const mechanisms: Record<string, number> = {
  audioExplanation: 44,
  whyEnterprise: 20,
  maturity: 20,
  researchMethod: 20,
  literatureGraph: 24,
  keyFindings: 24, // 24 帧围绕把柄 3D 自旋
  followupResearch: 24,
  presentation: 24
}

const frames = new Map<string, HTMLImageElement[]>()
const reduce = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false }

const effects: Record<string, string> = {
  audioExplanation: 'notes',
  literatureGraph: 'signal',
  followupResearch: 'scan',
  keyFindings: 'focus',
  whyEnterprise: 'drive',
  maturity: 'measure',
  researchMethod: 'wave',
  industryPosition: 'steps',
  presentation: 'pages'
}

const downloads: { kind: string; run: () => Promise<void> }[] = []
let downloading = 0

function pump() {
  while (downloading < 4 && downloads.length) {
    const job = downloads.shift()
    if (!job) break
    downloading++
    job.run().finally(() => {
      downloading--
      pump()
    })
  }
}

function preload(kind: string, all = true, upto = 2, priority = all): HTMLImageElement[] {
  if (!frames.has(kind)) {
    const total = mechanisms[kind] || 24
    const sequence: any = Array(total).fill(null)
    sequence.pending = []
    frames.set(kind, sequence)
  }
  const sequence: any = frames.get(kind)!
  const limit = all ? sequence.length : Math.min(upto, sequence.length)

  for (let i = 0; i < limit; i++) {
    if (!sequence.pending[i]) {
      sequence.pending[i] = new Promise<void>((resolve) => {
        downloads.push({
          kind,
          run: async () => {
            const img = new Image()
            img.fetchPriority = 'high'
            sequence.pending[i].image = img
            const pad = String(i).padStart(2, '0')
            img.src = `${ROOT}motion-webp/${kind}/${pad}.webp`
            try {
              await img.decode()
              sequence[i] = img
            } catch {
              try {
                img.src = `${REMOTE_FALLBACK}motion-webp/${kind}/${pad}.webp`
                await img.decode()
                sequence[i] = img
              } catch {
                // 静默失败，保持首帧
              }
            }
            resolve()
          }
        })
      })
    }
  }

  if (priority) {
    downloads.sort((a, b) => Number(b.kind === kind) - Number(a.kind === kind))
  }
  pump()
  sequence.ready = Promise.all(sequence.pending)
  return sequence
}

export class ObjectMotion extends HTMLElement {
  kind: string = ''
  effect: string = 'breathe'
  img: HTMLImageElement | null = null
  original: string = ''
  controller: AbortController | null = null
  surface: Element | null = null
  active: boolean = false
  manual: boolean = false
  phase: number = 0
  lastFrame: number = -1
  last: number = 0
  raf: number = 0
  returnFrame: number = 0
  progress: number = 0
  sequence: HTMLImageElement[] | null = null
  observer: IntersectionObserver | null = null
  visible: boolean = true

  connectedCallback() {
    if (this.controller) return
    this.classList.add('object-motion')
    this.kind = this.getAttribute('kind') || ''
    this.effect = effects[this.kind] || 'breathe'
    this.dataset.effect = this.effect
    this.dataset.mechanism = String(['literatureGraph', 'keyFindings', 'followupResearch', 'presentation'].includes(this.kind))
    this.img = this.querySelector('img')
    if (!this.img) return
    this.original = this.img.src
    this.setAttribute('aria-hidden', 'true')

    if (!this.querySelector('.object-feedback')) {
      this.insertAdjacentHTML(
        'beforeend',
        `<span class="object-feedback" aria-hidden="true">${this.effect === 'notes' ? '<i>♪</i><i>♫</i><i>♪</i>' : '<i></i><i></i><i></i>'}</span>`
      )
    }

    this.controller = new AbortController()
    const { signal } = this.controller
    this.surface = this.closest('.rcs-card, .rcs-reserve-art') || this

    // 绑定鼠标移入自旋与移出停止
    this.surface.addEventListener('pointerenter', () => this.activate(true), { signal })
    this.surface.addEventListener('pointerleave', () => this.activate(false), { signal })

    // 视口监听预加载
    this.observer = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting
      if (!this.visible) {
        this.stop()
      } else if (this.active) {
        this.start()
      }
      if (entry.isIntersecting && !reduce.matches && mechanisms[this.kind]) {
        preload(this.kind, false)
      }
    })
    this.observer.observe(this.surface)

    // 页面可见性与减弱动效处理
    document.addEventListener('visibilitychange', () => (document.hidden ? this.stop() : this.active && this.start()), { signal })
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.returnFrame)
    this.stop()
    this.observer?.disconnect()
    this.controller?.abort()
    this.controller = null
  }

  activate(active: boolean) {
    this.active = active
    this.dataset.active = String(active && !reduce.matches)
    if (active) {
      if (this.returnFrame) {
        this.phase = Math.acos(1 - 2 * Math.max(0, Math.min(1, this.progress || 0))) * 3 / Math.PI
      }
      cancelAnimationFrame(this.returnFrame)
      this.returnFrame = 0
      if (reduce.matches) return
      if (mechanisms[this.kind]) {
        this.sequence = preload(this.kind, true, 8, true)
      }
      if (this.isConnected && this.active) {
        this.start()
      }
    } else {
      this.stop()
      this.manual = false
      if (this.dataset.mechanism === 'true' && this.sequence && !reduce.matches) {
        this.settle()
      } else if (this.img) {
        this.img.src = this.original
        this.phase = 0
        this.lastFrame = -1
      }
    }
  }

  settle() {
    cancelAnimationFrame(this.returnFrame)
    const start = performance.now()
    const from = this.progress || 0
    const back = (t: number) => {
      if (!this.isConnected || this.active || reduce.matches) return
      const p = Math.min(1, (t - start) / 550)
      this.show(from * (1 - p) * (1 - p))
      if (p < 1) {
        this.returnFrame = requestAnimationFrame(back)
      } else {
        if (this.img) this.img.src = this.original
        this.phase = 0
        this.lastFrame = -1
        this.returnFrame = 0
      }
    }
    this.returnFrame = requestAnimationFrame(back)
  }

  start() {
    if (this.raf || document.hidden || this.visible === false || reduce.matches || !this.active) return
    this.dataset.active = 'true'
    if (!mechanisms[this.kind] || this.manual) return
    this.last = performance.now()
    this.raf = requestAnimationFrame((t) => this.tick(t))
  }

  stop() {
    cancelAnimationFrame(this.raf)
    this.raf = 0
    this.dataset.active = 'false'
    this.dataset.playing = 'false'
  }

  show(progress: number) {
    this.progress = progress
    if (!this.sequence || !this.img) return
    const requested = Math.min(this.sequence.length - 1, Math.round(progress * (this.sequence.length - 1)))
    const i = this.sequence[requested]
      ? requested
      : this.sequence.reduce((best, frame, index) => (frame && (best < 0 || Math.abs(index - requested) < Math.abs(best - requested)) ? index : best), -1)
    if (i >= 0 && this.lastFrame !== i && this.sequence[i]) {
      this.img.src = this.sequence[i].src
      this.lastFrame = i
      this.dataset.frame = String(i)
    }
  }

  tick(t: number) {
    this.raf = 0
    if (!this.surface?.matches(':hover, :focus-within')) {
      this.activate(false)
      return
    }
    const next = this.phase + Math.min(t - this.last, 80) / 1000
    this.last = t

    if (this.sequence && !this.manual) {
      if (this.kind === 'audioExplanation') {
        const f = next < 0.9 ? Math.min(11, (next / 0.9) * 12) : 12 + (((next - 0.9) / 5) * 32) % 32
        const a = Math.floor(f)
        preload(this.kind, false, a + 5, true)
        this.phase = next
        this.dataset.playing = String(f >= 12)
        this.show(f / 43)
      } else {
        // 正弦波平滑自旋循环
        const progress = (1 - Math.cos((next * Math.PI) / 1.5)) / 2
        const index = Math.round(progress * (this.sequence.length - 1))
        preload(this.kind, false, index + 5, true)
        this.phase = next
        this.show(progress)
      }
    }

    if (this.active && !document.hidden && this.visible !== false && !reduce.matches) {
      this.raf = requestAnimationFrame((s) => this.tick(s))
    }
  }
}

// 自动注册自定义元素
if (typeof window !== 'undefined' && !customElements.get('object-motion')) {
  customElements.define('object-motion', ObjectMotion)
}
