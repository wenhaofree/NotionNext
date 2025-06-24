# NotionNext 中文完整指南

<div align="center">

**🚀 从零开始搭建你的 Notion 博客**

*详细的安装、配置和使用教程*

</div>

## 📋 目录

- [🎯 项目介绍](#-项目介绍)
- [⚡ 快速开始](#-快速开始)
- [🛠️ 详细配置](#️-详细配置)
- [🎨 主题系统](#-主题系统)
- [💬 评论系统](#-评论系统)
- [📊 统计分析](#-统计分析)
- [🔍 搜索功能](#-搜索功能)
- [🌍 国际化](#-国际化)
- [🚀 部署指南](#-部署指南)
- [🔧 高级配置](#-高级配置)
- [❓ 常见问题](#-常见问题)
- [🤝 获取帮助](#-获取帮助)

## 🎯 项目介绍

NotionNext 是一个基于 Next.js 和 Notion API 的现代化博客系统，它能够：

- 📝 **将 Notion 页面转换为博客** - 在 Notion 中写作，自动生成博客
- 🎨 **提供丰富的主题选择** - 20+ 个精美主题，满足不同需求
- 🚀 **实现极速访问体验** - 基于静态生成，加载速度极快
- 📱 **支持响应式设计** - 完美适配各种设备
- 🔧 **高度可定制化** - 丰富的配置选项和插件系统

### 🌟 核心优势

| 特性 | 说明 | 优势 |
|:---:|:---:|:---:|
| **零服务器成本** | 部署到 Vercel/Netlify | 完全免费托管 |
| **SEO 友好** | 静态生成 + 结构化数据 | 搜索引擎优化 |
| **高性能** | CDN 加速 + 图片优化 | 极速访问体验 |
| **易于维护** | Notion 作为 CMS | 无需数据库维护 |
| **扩展性强** | 插件化架构 | 功能可按需扩展 |

## ⚡ 快速开始

### 📋 准备工作

在开始之前，你需要：

1. **Notion 账户** - [免费注册](https://www.notion.so/)
2. **GitHub 账户** - [免费注册](https://github.com/)
3. **Vercel 账户** - [免费注册](https://vercel.com/) (推荐部署平台)

### 🚀 方法一：一键部署 (推荐新手)

#### 步骤 1: 复制 Notion 模板

1. 访问 [Notion 模板页面](https://www.notion.so/tanghh/02ab3b8678004aa69e9e415905ef32a5)
2. 点击右上角 "Duplicate" 按钮复制到你的 Notion 工作区
3. 复制页面 URL 中的页面 ID

```
示例 URL: https://www.notion.so/your-workspace/02ab3b8678004aa69e9e415905ef32a5
页面 ID: 02ab3b8678004aa69e9e415905ef32a5
```

#### 步骤 2: 一键部署到 Vercel

1. 点击下方按钮开始部署：

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tangly1024/NotionNext&env=NOTION_PAGE_ID&envDescription=Notion%20Page%20ID&envLink=https://docs.tangly1024.com/)

2. 在 Vercel 部署页面中：
   - 连接你的 GitHub 账户
   - 填入环境变量 `NOTION_PAGE_ID`（步骤1中获取的页面ID）
   - 点击 "Deploy" 开始部署

3. 等待部署完成（通常需要 2-3 分钟）

#### 步骤 3: 访问你的博客

部署完成后，Vercel 会提供一个访问链接，形如：`https://your-project-name.vercel.app`

🎉 **恭喜！你的博客已经上线了！**

### 💻 方法二：本地开发 (推荐开发者)

#### 步骤 1: 克隆项目

```bash
# 克隆项目到本地
git clone https://github.com/tangly1024/NotionNext.git
cd NotionNext
```

#### 步骤 2: 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm (推荐)
pnpm install
```

#### 步骤 3: 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量文件
vim .env.local  # 或使用你喜欢的编辑器
```

在 `.env.local` 中填入：

```bash
# 必填：Notion 页面 ID
NOTION_PAGE_ID=你的Notion页面ID

# 可选：主题设置
NEXT_PUBLIC_THEME=heo

# 可选：语言设置
NEXT_PUBLIC_LANG=zh-CN
```

#### 步骤 4: 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看你的博客。

## 🛠️ 详细配置

### 📝 基础配置

主要配置文件位于 `blog.config.js`，包含以下重要设置：

```javascript
const BLOG = {
  // 🔑 核心配置
  NOTION_PAGE_ID: '你的Notion页面ID',           // 必填
  THEME: 'heo',                                // 主题名称
  LANG: 'zh-CN',                              // 语言设置
  
  // 👤 站点信息
  AUTHOR: '你的名字',                          // 作者名称
  BIO: '你的个人简介',                         // 个人简介
  LINK: 'https://你的域名.com',                // 网站地址
  KEYWORDS: '关键词1, 关键词2',                // SEO关键词
  
  // 🎨 外观设置
  APPEARANCE: 'auto',                         // light/dark/auto
  APPEARANCE_DARK_TIME: [18, 6],              // 夜间模式时间
  
  // 📄 文章设置
  POSTS_PER_PAGE: 12,                         // 每页文章数
  POST_LIST_STYLE: 'page',                    // page/scroll
  POST_LIST_PREVIEW: false,                   // 是否显示预览
  
  // 🔍 SEO 设置
  ENABLE_RSS: true,                           // 启用RSS
  SEO_GOOGLE_SITE_VERIFICATION: '',           // Google验证码
  SEO_BAIDU_SITE_VERIFICATION: '',            // 百度验证码
}
```

### 🎨 主题配置

每个主题都有独立的配置文件，位于 `themes/主题名/config.js`：

```javascript
// 以 heo 主题为例
const CONFIG = {
  // 🧭 导航栏配置
  NAV_TYPE: 'normal',                         // normal/float
  NAV_NOTION_ICON: true,                      // 显示Notion图标
  
  // 📱 侧边栏配置
  RIGHT_BAR: true,                            // 启用右侧边栏
  RIGHT_AD: false,                            // 右侧广告
  
  // 🏠 首页配置
  HOME_BANNER_ENABLE: true,                   // 首页横幅
  HOME_BANNER_GREETINGS: ['Hi', '欢迎来到我的博客'],
  
  // 📝 文章页配置
  POST_SHARE_BAR: true,                       // 分享栏
  POST_ADJACENT: true,                        // 上下篇导航
  POST_COPYRIGHT: true,                       // 版权声明
}
```

### 💬 评论系统配置

NotionNext 支持多种评论系统，可在 `conf/comment.config.js` 中配置：

#### Twikoo (推荐)

```javascript
// Twikoo 配置
COMMENT_TWIKOO_ENV_ID: '你的环境ID',           // 腾讯云环境ID或Vercel域名
COMMENT_TWIKOO_COUNT_ENABLE: true,            // 显示评论数
COMMENT_TWIKOO_CDN_URL: 'https://cdn.staticfile.net/twikoo/1.6.39/twikoo.min.js',
```

#### Giscus (GitHub Discussions)

```javascript
// Giscus 配置
COMMENT_GISCUS_REPO: '用户名/仓库名',          // GitHub仓库
COMMENT_GISCUS_REPO_ID: '仓库ID',             // 仓库ID
COMMENT_GISCUS_CATEGORY_ID: '分类ID',         // 讨论分类ID
COMMENT_GISCUS_MAPPING: 'pathname',           // 页面映射方式
COMMENT_GISCUS_LANG: 'zh-CN',                // 语言设置
```

#### Gitalk (GitHub Issues)

```javascript
// Gitalk 配置
COMMENT_GITALK_REPO: '仓库名',                // GitHub仓库名
COMMENT_GITALK_OWNER: '用户名',               // 仓库所有者
COMMENT_GITALK_ADMIN: '管理员用户名',          // 管理员
COMMENT_GITALK_CLIENT_ID: '客户端ID',         // GitHub应用ID
COMMENT_GITALK_CLIENT_SECRET: '客户端密钥',    // GitHub应用密钥
```

### 📊 统计分析配置

在 `conf/analytics.config.js` 中配置各种统计服务：

```javascript
// Google Analytics
ANALYTICS_GOOGLE_ID: 'G-XXXXXXXXXX',         // GA4 测量ID

// 百度统计
ANALYTICS_BAIDU_ID: '百度统计ID',             // 百度统计代码

// 不蒜子统计
ANALYTICS_BUSUANZI_ENABLE: true,              // 启用不蒜子

// 51LA统计
ANALYTICS_51LA_ID: '51LA站点ID',              // 51LA统计ID
ANALYTICS_51LA_CK: '51LA密钥',                // 51LA密钥
```

## 🎨 主题系统

### 🎭 可用主题

| 主题名称 | 风格特点 | 适用场景 | 推荐指数 |
|:---:|:---:|:---:|:---:|
| **heo** | 现代化、功能丰富 | 个人博客、技术博客 | ⭐⭐⭐⭐⭐ |
| **next** | 经典、简洁 | 技术文档、学术博客 | ⭐⭐⭐⭐⭐ |
| **hexo** | 传统博客风格 | 迁移自Hexo的用户 | ⭐⭐⭐⭐ |
| **medium** | 现代简约 | 内容创作、写作平台 | ⭐⭐⭐⭐ |
| **fukasawa** | 日式极简 | 摄影、设计作品展示 | ⭐⭐⭐⭐ |
| **gitbook** | 文档风格 | 技术文档、教程 | ⭐⭐⭐⭐ |
| **landing** | 着陆页 | 产品介绍、营销页面 | ⭐⭐⭐ |
| **commerce** | 商业风格 | 企业官网、产品展示 | ⭐⭐⭐ |

### 🔄 切换主题

#### 方法一：配置文件修改

在 `blog.config.js` 中修改：

```javascript
THEME: 'heo',  // 改为你想要的主题名
```

#### 方法二：环境变量

```bash
NEXT_PUBLIC_THEME=heo
```

#### 方法三：URL参数 (临时预览)

```
https://你的域名.com/?theme=heo
```

### 🎨 自定义主题

1. **复制示例主题**
   ```bash
   cp -r themes/example themes/my-theme
   ```

2. **修改主题配置**
   ```javascript
   // themes/my-theme/config.js
   const CONFIG = {
     // 你的主题配置
   }
   ```

3. **自定义组件和样式**
   ```
   themes/my-theme/
   ├── components/          # 主题组件
   ├── config.js           # 主题配置
   ├── index.js            # 主题入口
   └── style.js            # 主题样式
   ```

4. **应用自定义主题**
   ```javascript
   THEME: 'my-theme',
   ```

## 💬 评论系统

### 🔧 Twikoo 配置详解

Twikoo 是推荐的评论系统，支持多种部署方式：

#### 腾讯云部署

1. **创建云函数**
   - 登录 [腾讯云控制台](https://console.cloud.tencent.com/scf)
   - 创建新的云函数
   - 选择 Node.js 运行环境

2. **部署 Twikoo**
   ```bash
   # 下载 Twikoo
   wget https://github.com/imaegoo/twikoo/releases/latest/download/twikoo-scf.zip
   
   # 上传到云函数
   ```

3. **配置环境变量**
   ```javascript
   COMMENT_TWIKOO_ENV_ID: '你的环境ID',
   ```

#### Vercel 部署

1. **Fork Twikoo 仓库**
   - 访问 [Twikoo 仓库](https://github.com/imaegoo/twikoo)
   - 点击 Fork 到你的 GitHub

2. **部署到 Vercel**
   - 在 Vercel 中导入你 Fork 的仓库
   - 部署完成后获得域名

3. **配置环境变量**
   ```javascript
   COMMENT_TWIKOO_ENV_ID: 'https://your-twikoo.vercel.app',
   ```

### 🔧 Giscus 配置详解

Giscus 基于 GitHub Discussions，配置简单：

1. **启用 Discussions**
   - 在你的 GitHub 仓库中启用 Discussions 功能

2. **安装 Giscus 应用**
   - 访问 [Giscus 官网](https://giscus.app/zh-CN)
   - 按照指引安装 GitHub 应用

3. **获取配置信息**
   - 在 Giscus 官网填入仓库信息
   - 复制生成的配置代码

4. **配置 NotionNext**
   ```javascript
   COMMENT_GISCUS_REPO: 'username/repo',
   COMMENT_GISCUS_REPO_ID: 'R_kgDOxxxxxx',
   COMMENT_GISCUS_CATEGORY_ID: 'DIC_kwDOxxxxxx',
   ```

## 📊 统计分析

### 📈 Google Analytics 4

1. **创建 GA4 属性**
   - 访问 [Google Analytics](https://analytics.google.com/)
   - 创建新的 GA4 属性
   - 获取测量 ID (G-XXXXXXXXXX)

2. **配置 NotionNext**
   ```javascript
   ANALYTICS_GOOGLE_ID: 'G-XXXXXXXXXX',
   ```

### 📊 百度统计

1. **注册百度统计**
   - 访问 [百度统计](https://tongji.baidu.com/)
   - 添加网站并获取统计代码

2. **配置 NotionNext**
   ```javascript
   ANALYTICS_BAIDU_ID: '你的百度统计ID',
   ```

### 👥 不蒜子统计

不蒜子提供简单的访问量统计，无需注册：

```javascript
ANALYTICS_BUSUANZI_ENABLE: true,
```

## 🔍 搜索功能

### 🔎 Algolia 全文搜索

1. **注册 Algolia**
   - 访问 [Algolia](https://www.algolia.com/)
   - 创建免费账户

2. **创建索引**
   - 在 Algolia 控制台创建新索引
   - 获取 Application ID 和 API Keys

3. **配置 NotionNext**
   ```javascript
   ALGOLIA_APP_ID: 'your_app_id',
   ALGOLIA_ADMIN_APP_KEY: 'your_admin_key',
   ALGOLIA_SEARCH_ONLY_APP_KEY: 'your_search_key',
   ALGOLIA_INDEX: 'your_index_name',
   ```

4. **构建索引**
   ```bash
   npm run build  # 构建时自动生成索引
   ```

### 🔍 本地搜索

如果不需要全文搜索，可以使用内置的本地搜索功能，无需额外配置。

## 🌍 国际化

### 🌐 支持的语言

- 🇨🇳 中文简体 (zh-CN)
- 🇹🇼 中文繁体 (zh-TW)
- 🇭🇰 中文繁体 (zh-HK)  
- 🇺🇸 英语 (en-US)
- 🇯🇵 日语 (ja-JP)
- 🇫🇷 法语 (fr-FR)
- 🇹🇷 土耳其语 (tr-TR)

### 🔧 语言配置

在 `blog.config.js` 中设置：

```javascript
LANG: 'zh-CN',  // 设置默认语言
```

### 🌍 添加新语言

1. **复制语言文件**
   ```bash
   cp lib/lang/en-US.js lib/lang/es-ES.js
   ```

2. **翻译内容**
   ```javascript
   // lib/lang/es-ES.js
   export default {
     LOCALE: 'Español',
     MENU: {
       CATEGORY: 'Categorías',
       TAGS: 'Etiquetas',
       // ... 更多翻译
     }
   }
   ```

3. **注册语言**
   ```javascript
   // lib/lang.js
   import esES from './es-ES'
   
   export const lang = {
     'es-ES': esES,
     // ... 其他语言
   }
   ```

## 🚀 部署指南

### ☁️ Vercel 部署 (推荐)

#### 优势
- ✅ 免费额度充足
- ✅ 自动 CI/CD
- ✅ 全球 CDN 加速
- ✅ 自定义域名支持
- ✅ 环境变量管理

#### 部署步骤

1. **连接 GitHub**
   - 登录 [Vercel](https://vercel.com/)
   - 连接你的 GitHub 账户

2. **导入项目**
   - 点击 "New Project"
   - 选择 NotionNext 仓库
   - 点击 "Import"

3. **配置环境变量**
   ```
   NOTION_PAGE_ID=你的页面ID
   NEXT_PUBLIC_THEME=heo
   NEXT_PUBLIC_LANG=zh-CN
   ```

4. **部署**
   - 点击 "Deploy" 开始部署
   - 等待部署完成

5. **自定义域名** (可选)
   - 在项目设置中添加自定义域名
   - 配置 DNS 记录

### 🌐 Netlify 部署

1. **连接 GitHub**
   - 登录 [Netlify](https://netlify.com/)
   - 连接 GitHub 账户

2. **导入项目**
   - 选择 NotionNext 仓库
   - 配置构建设置：
     ```
     Build command: npm run export
     Publish directory: out
     ```

3. **配置环境变量**
   - 在站点设置中添加环境变量

4. **部署**
   - 点击 "Deploy site"

### 📄 GitHub Pages 部署

1. **配置 GitHub Actions**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '16'
         - run: npm install
         - run: npm run export
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

2. **启用 GitHub Pages**
   - 在仓库设置中启用 GitHub Pages
   - 选择 gh-pages 分支作为源

### 🐳 Docker 部署

1. **构建镜像**
   ```bash
   docker build -t notion-next .
   ```

2. **运行容器**
   ```bash
   docker run -p 3000:3000 \
     -e NOTION_PAGE_ID=你的页面ID \
     -e NEXT_PUBLIC_THEME=heo \
     notion-next
   ```

3. **使用 Docker Compose**
   ```yaml
   # docker-compose.yml
   version: '3'
   services:
     notion-next:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NOTION_PAGE_ID=你的页面ID
         - NEXT_PUBLIC_THEME=heo
   ```

## 🔧 高级配置

### 🎨 自定义样式

1. **全局样式**
   ```css
   /* styles/globals.css */
   .custom-class {
     /* 你的自定义样式 */
   }
   ```

2. **主题样式**
   ```css
   /* themes/your-theme/style.js */
   const style = `
     .theme-specific {
       /* 主题特定样式 */
     }
   `
   ```

### 🔌 自定义插件

1. **创建插件**
   ```javascript
   // lib/plugins/my-plugin.js
   export default function MyPlugin() {
     // 插件逻辑
   }
   ```

2. **注册插件**
   ```javascript
   // blog.config.js
   CUSTOM_EXTERNAL_JS: ['/js/my-plugin.js'],
   ```

### 📝 自定义页面

1. **创建页面**
   ```javascript
   // pages/custom.js
   export default function CustomPage() {
     return <div>自定义页面</div>
   }
   ```

2. **添加导航**
   ```javascript
   // 在主题配置中添加菜单项
   ```

### 🔒 密码保护

在 Notion 中为页面添加 `password` 属性即可启用密码保护。

### 📱 PWA 支持

```javascript
// blog.config.js
PWA: true,  // 启用 PWA 功能
```

## ❓ 常见问题

### 🔧 部署相关

**Q: 部署后页面显示 404**
A: 检查 NOTION_PAGE_ID 是否正确，确保 Notion 页面已公开。

**Q: 图片无法显示**
A: Notion 图片需要登录才能访问，建议使用外部图床。

**Q: 构建失败**
A: 检查 Node.js 版本是否为 16.x 或更高，清除缓存后重试。

### 🎨 主题相关

**Q: 主题切换不生效**
A: 清除浏览器缓存，或使用无痕模式访问。

**Q: 自定义主题不显示**
A: 检查主题文件夹名称和配置是否正确。

### 💬 评论相关

**Q: Twikoo 评论不显示**
A: 检查环境 ID 是否正确，确保 Twikoo 服务正常运行。

**Q: Giscus 评论加载失败**
A: 确保仓库已启用 Discussions，检查配置信息是否正确。

### 📊 统计相关

**Q: Google Analytics 无数据**
A: 检查测量 ID 是否正确，等待 24-48 小时数据生效。

**Q: 不蒜子统计不准确**
A: 不蒜子统计可能有延迟，数据仅供参考。

## 🤝 获取帮助

### 📚 官方资源

- 📖 [官方文档](https://docs.tangly1024.com/)
- 🎥 [视频教程](https://docs.tangly1024.com/video)
- 💬 [讨论社区](https://github.com/tangly1024/NotionNext/discussions)

### 🐛 问题反馈

- 🔍 [搜索已知问题](https://github.com/tangly1024/NotionNext/issues)
- 📝 [提交新问题](https://github.com/tangly1024/NotionNext/issues/new)
- 💡 [功能建议](https://github.com/tangly1024/NotionNext/discussions/categories/ideas)

### 👥 社区支持

- 💬 [QQ 群](https://qm.qq.com/cgi-bin/qm/qr?k=xxx)
- 📱 [微信群](https://docs.tangly1024.com/wechat)
- 🐦 [Twitter](https://twitter.com/tangly1024)

### 💰 付费支持

如需专业技术支持，可联系官方团队：

- 📧 邮箱: support@tangly1024.com
- 💼 企业服务: enterprise@tangly1024.com

---

<div align="center">

**🎉 恭喜你完成了 NotionNext 的配置！**

*现在开始享受写作的乐趣吧！*

Made with ❤️ by [tangly1024](https://github.com/tangly1024)

</div>
