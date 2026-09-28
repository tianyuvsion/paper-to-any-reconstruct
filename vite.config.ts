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
              '.webp': 'image/webp',
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.svg': 'image/svg+xml',
              '.mp3': 'audio/mpeg',
              '.mp4': 'video/mp4',
              '.pdf': 'application/pdf',
              '.css': 'text/css',
              '.js': 'application/javascript',
              '.mjs': 'application/javascript'
            }
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
            res.setHeader('Cache-Control', 'public, max-age=31536000')
            fs.createReadStream(filePath).pipe(res)
            return
          }
        }
        next()
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendTarget = env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'

  return {
    plugins: [
      localUiPlugin(),
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
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
          ws: true
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
