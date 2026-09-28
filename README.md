# Paper to Any · 重构前端 (Vue 3 + TypeScript)

本项目是 `Paper to Any` 论文研读与多模态重构平台的新一代前端实现，采用现代前端工程化工具链与全家桶生态重构。

- **远程仓库**：[https://github.com/GHW666666/paper-to-any-reconstruct](https://github.com/GHW666666/paper-to-any-reconstruct)
- **技术栈**：Vue 3.5 + TypeScript 5.7 + Vite 6 + Pinia + Vue Router + Axios
- **设计规范**：Carved UI（学术期刊质感、凹凸浮雕语义、135° 光源微阴影、Georgia/宋体大标题）

---

## 目录结构

```
src/
├── api/             # 后端 API 抽象层（Axios 客户端配置、Cookie 凭据、统一错误拦截）
│   ├── auth.ts      # 登录、登出、身份核验、OTP 接口
│   ├── client.ts    # Axios 实例与拦截器
│   └── system.ts    # 后端健康检查与运行模式探测
├── components/      # 通用组件
│   └── layout/      # 布局组件（AppHeader 学术顶栏、JournalCanvas 学术底布）
├── router/          # 路由中心（路由表与未登录/免登权限守卫）
├── stores/          # Pinia 状态中心（useAuthStore 会话状态管理）
├── styles/          # 样式系统（tokens.css 颜色令牌、carved.css 浮雕类、main.css 基础重置）
├── types/           # TypeScript 契约模型（auth.ts, system.ts, api.ts）
└── views/           # 页面视图
    ├── auth/        # 认证模块（LoginView, 邀请码验证 Tab, 密码登录 Tab）
    ├── workspace/   # 工作台主框架骨架
    └── error/       # 404 缺省页
```

---

## 认证与登录功能特点

1. **内测邀请码验证**：支持学者邮箱 + 受邀密钥准入（对接 `POST /api/v1/auth/login`）；
2. **账号密码登录**：支持已注册用户的邮箱密码登录（对接 `POST /api/v1/auth/password/login`）；
3. **本地开发免登直通**：当连接本地 FastAPI 处于开放模式或无后网环境时，可一键以开发身份直通工作台；
4. **会话持久化**：原生配合后端的 HttpOnly `paper_to_any_session` Cookie；
5. **安全与限流响应**：精准捕获 HTTP 401（未授权）与 HTTP 429（防暴力破解限流）友好反馈；
6. **无缝路由拦截**：未登录拦截并记录来源路径，登录后精准回跳。

---

## 运行与开发

```bash
# 1. 安装依赖
pnpm install

# 2. 启动本地开发服务 (支持代理至 http://127.0.0.1:8000)
pnpm dev

# 3. 严格类型检查
pnpm run type-check

# 4. 生产打包
pnpm run build
```
