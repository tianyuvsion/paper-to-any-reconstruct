import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// 静态资源本地映射插件：使 /ui/... 直接从 F:/paper-to-any/apps/web/r715 中快速读取
function localUiPlugin(): Plugin {
  const r715Root = 'F:/paper-to-any/apps/web/r715'
  return {
    name: 'local-ui-static',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/ui/')) {
          const cleanUrl = req.url.replace(/^\/ui\//, '').split('?')[0]
          const decodedPath = decodeURIComponent(cleanUrl)
          const filePath = path.join(r715Root, decodedPath)
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase()
            const mimeTypes: Record<string, string> = {
              '.html': 'text/html; charset=utf-8',
              '.htm': 'text/html; charset=utf-8',
              '.webp': 'image/webp',
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.svg': 'image/svg+xml',
              '.mp3': 'audio/mpeg',
              '.mp4': 'video/mp4',
              '.pdf': 'application/pdf',
              '.css': 'text/css; charset=utf-8',
              '.js': 'application/javascript; charset=utf-8',
              '.mjs': 'application/javascript; charset=utf-8',
              '.json': 'application/json; charset=utf-8',
              '.wasm': 'application/wasm'
            }
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
            res.setHeader('Accept-Ranges', 'bytes')

            const cacheControl = ext === '.html' || ext === '.htm'
              ? 'no-cache'
              : 'public, max-age=31536000'

            const stat = fs.statSync(filePath)
            const totalSize = stat.size
            const range = req.headers.range

            if (range) {
              // 关键：处理浏览器 HTML5 <video> / <audio> 的 HTTP 206 Range 分段流媒体请求
              const parts = range.replace(/bytes=/, '').split('-')
              const start = parseInt(parts[0], 10)
              const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1
              const chunkSize = end - start + 1

              res.statusCode = 206
              res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
              res.setHeader('Content-Length', chunkSize)
              res.setHeader('Cache-Control', cacheControl)

              const stream = fs.createReadStream(filePath, { start, end })
              stream.pipe(res)
            } else {
              res.statusCode = 200
              res.setHeader('Content-Length', totalSize)
              res.setHeader('Cache-Control', cacheControl)
              fs.createReadStream(filePath).pipe(res)
            }
            return
          }
        }
        next()
      })
    }
  }
}

// 实时访客监控插件：记录外部通过 Cloudflare 穿透访问的访客 IP、设备与浏览行为
function accessLoggerPlugin(): Plugin {
  return {
    name: 'cf-visitor-logger',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '/'
        // 过滤掉高频内部静态模块，聚焦核心页面与 API 请求
        const isCoreRoute =
          url === '/' ||
          url.startsWith('/login') ||
          url.startsWith('/workspace') ||
          url.startsWith('/api/') ||
          url.includes('.html')

        if (isCoreRoute) {
          const cfIp = req.headers['cf-connecting-ip'] || req.socket.remoteAddress || '127.0.0.1'
          const country = req.headers['cf-ipcountry'] || 'CN'
          const ua = (req.headers['user-agent'] as string) || ''
          const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })

          let device = '电脑 / 其它'
          if (/iPhone|iPad|iPod/i.test(ua)) device = '苹果 iOS'
          else if (/Android/i.test(ua)) device = '安卓手机'
          else if (/Macintosh/i.test(ua)) device = 'Mac'
          else if (/Windows/i.test(ua)) device = 'Windows PC'

          const logLine = `[CF 访客 ${time}] 来源: ${cfIp} (${country}) | 设备: ${device} | 动作: ${req.method} ${url}`
          // 控制台醒目紫色打印
          console.log(`\x1b[35m${logLine}\x1b[0m`)

          try {
            fs.appendFileSync('access.log', `${new Date().toISOString()} | ${logLine}\n`)
          } catch {
            // 忽略写入异常
          }
        }
        next()
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendTarget = env.VITE_BACKEND_URL || 'https://paper-to-any.8-218-121-139.sslip.io'
  const targetUrl = new URL(backendTarget)

  return {
    plugins: [
      localUiPlugin(),
      accessLoggerPlugin(),
      vue({
        template: {
          compilerOptions: {
            // 将 object-motion 标记为原生自定义 Web Component
            isCustomElement: (tag) => tag === 'object-motion'
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
      allowedHosts: true,
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
          ws: true,
          headers: {
            Origin: targetUrl.origin,
            Referer: `${targetUrl.origin}/`
          },
          cookieDomainRewrite: {
            '*': ''
          },
          onProxyRes(proxyRes: any) {
            // 解决本地 http 环境下 Secure Cookie 无法保存的问题
            const setCookie = proxyRes.headers['set-cookie']
            if (setCookie) {
              proxyRes.headers['set-cookie'] = setCookie.map((cookie: string) =>
                cookie
                  .replace(/;\s*Secure/gi, '')
                  .replace(/;\s*SameSite=Strict/gi, '; SameSite=Lax')
              )
            }
          }
        }
      }
    },
    build: {
      target: 'esnext',
      sourcemap: true,
      chunkSizeWarningLimit: 1000
    }
  }
})
