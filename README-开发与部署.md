# office026vera — 继续开发与部署

## 项目结构

这是保留原 Replit 工作区的增量修改版本，没有从零重建。

- `artifacts/office026vera-portfolio/`：正式作品集，React 19.1 + TypeScript + Vite 7 + Tailwind CSS 4；使用 Wouter 路由、React Query，以及已有 UI 组件。
- `attached_assets/`：原始图片、视频与参考文件。
- `artifacts/api-server/`：原有 Express 服务模板；当前作品集页面不依赖它，不部署到 GitHub Pages。
- `artifacts/mockup-sandbox/`：原有实验工作区，保留。
- `lib/`：原有 API 客户端、类型与数据库模块，保留。
- `pnpm-workspace.yaml`、`pnpm-lock.yaml`：工作区依赖与锁定版本。

现有 Home、About、About 的三个详情页、Project、Research、Lab 均保留；首页蝴蝶结、五把钥匙导航、钥匙孔转场未改动。

## 本地运行

需要 Node.js 22 和 pnpm 10.32.1。不要双击打开 HTML 文件。

```sh
pnpm install --frozen-lockfile
pnpm dev:portfolio
```

在浏览器打开终端显示的地址（默认 http://localhost:5173）。访问期间保持该终端运行；按 Ctrl+C 会停止本地服务。

生产构建与本地预览：

```sh
pnpm build:pages
pnpm --filter @workspace/office026vera-portfolio serve
```

预览期间也需保持终端运行。构建输出在 `artifacts/office026vera-portfolio/dist/public/`，本 ZIP 中也包含一份已构建版本。

完整工作区的 `pnpm build` 还会构建原有服务端和实验区；部署作品集使用专用 `pnpm build:pages`。

## 新增视频案例

入口：About → Skills & Tools → Content & Operations → Video Editing → VIEW WORK ↗。

展开后显示 Offline Moments、原生播放器、案例说明和来源说明；再次点击 CLOSE WORK ↑ 会暂停并卸载播放器，重新展开时从头开始。没有自动播放。

使用 ZIP 中已有静音文件：
`attached_assets/copy_565008BC-6880-4C89-AC22-564A2A3FD114_1792658676438.mov`

文件元数据显示：HEVC 视频轨，1440 × 1080，无音频轨。直接引用原文件，未转码、未处理音轨、未改画面。另一份带音频的原始 MOV 保留在源码素材中，但没有被页面引用或部署。不要将整个源码目录当成静态站点发布。

HEVC 在部分浏览器或设备上不能播放。播放器报错时页面提示打开原文件；该链接使用同一份视频，不能消除设备解码限制。若未来需要更广泛兼容，可另行提供自己导出的 H.264 MP4 静音版后替换引用。

案例下方已注明：原版 BGM 为 82MAJOR《오늘 어때 (wyd?)》、视觉风格参考 @闹行芭特、拍摄与剪辑为 VERA；网站展示版因音乐授权考虑已静音，原版沟通与提供须符合授权要求。

## GitHub Pages

本次没有登录 GitHub 或发布网站。准备好了 `.github/workflows/deploy-pages.yml`：推送到 main 或手动运行时，安装锁定依赖，只构建作品集，再部署到 GitHub Pages。

1. 将解压目录内的项目文件上传到仓库根目录（根目录可见 package.json 和 .github）。不要上传外层 ZIP 或 node_modules。
2. 仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。
3. 推送到 main；若实际默认分支名称不同，修改 workflow 的 branches，或在 Actions 手动运行。
4. 在 Actions 中等待 Deploy portfolio to GitHub Pages 成功，再打开部署返回的网址。

Vite 默认相对资源路径 `./`，适用于用户主页仓库和 `/仓库名/` 项目路径。路由采用哈希方式，例如 `https://vertsang.github.io/仓库名/#/about/skills`，可直接打开和刷新子页面，不依赖服务器重写或 404 跳转。原 Replit 的普通路径书签需改为哈希路径。首页交互和页面布局不受影响。

发布目录仅为 `artifacts/office026vera-portfolio/dist/public/`，不能使用工作区根目录。页面无服务端依赖，GitHub Pages 可承载当前功能。

## 文件变更

- `artifacts/office026vera-portfolio/src/App.tsx`：新增 VideoEditingWork 组件、原视频引用、展开/收起和错误提示、来源及版权说明；启用哈希路由。
- `artifacts/office026vera-portfolio/src/index.css`：仅增加视频案例的局部 Editorial 样式。
- `artifacts/office026vera-portfolio/vite.config.ts`：PORT 默认 5173，BASE_PATH 默认 ./，支持脱离 Replit 构建。
- `artifacts/office026vera-portfolio/index.html`：favicon 使用 BASE_URL，适配子路径。
- `package.json`：新增 dev:portfolio / build:pages，声明 pnpm 版本。
- `pnpm-workspace.yaml`：恢复 macOS 所需的原生构建依赖，不再仅限 Linux x64。
- `pnpm-lock.yaml`：同步上述跨平台依赖配置。
- `.github/workflows/deploy-pages.yml`：新增 GitHub Pages 自动构建部署。
- `README-开发与部署.md`：本说明。
- `artifacts/office026vera-portfolio/dist/public/`：重新生成的生产构建输出。

所有未涉及的源码、参考图片和原始素材保留；ZIP 不含 Git 历史、node_modules 与临时缓存。

## 本次验证结果

- pnpm 10.32.1 frozen-lockfile 安装通过。
- `pnpm build:pages` 生产构建通过。Vite 有一条已有 tooltip.tsx 的 sourcemap 定位警告，不影响构建产物生成。
- `pnpm typecheck` 整个工作区类型检查通过。
- 构建 HTML 的本地资源均使用相对路径，并在嵌套静态目录下返回 HTTP 200。
- 构建视频与原静音 MOV 的 SHA-256 一致；构建目录只包含这一份 MOV。
- 自动浏览器测试未完成：环境没有浏览器，浏览器下载失败，因此实际点击、播放、桌面/移动端视觉验收仍需在本地浏览器确认。
- 未执行真实 GitHub Pages 部署；需上传仓库并启用 GitHub Actions 后验证线上结果。

## Project 页面 V1.0

新增封面 → 自然滚动索引 → 三个独立详情页：
- `/#/project`：封面及下方索引。
- `/#/project/index`：定位索引；详情页 ALL PROJECTS 返回这里。
- `/#/project/001`、`002`、`003`：三个详情页；提供上一项目、下一项目。

封面通过 SVG 视窗使用用户提供键帽参考图的主体区域，保留大小与排列节奏，没有生成新图片。该参考图分辨率有限，超大屏可能略柔；如需更清晰可补充同一设计的独立高分辨率键帽图。索引金属椭圆用局部 CSS 表现，始终三列。

实际新增：
- `artifacts/office026vera-portfolio/src/pages/projects.tsx`：封面、索引、三详情页、真实数据与案例正文、素材占位、返回交互。
- `artifacts/office026vera-portfolio/src/pages/projects.css`：仅 Project 局部样式及响应式规则。
- `artifacts/office026vera-portfolio/src/assets/project/keycaps.jpeg`：原键帽参考图。
- `artifacts/office026vera-portfolio/src/assets/project/account-evidence.jpeg`：用户提供账号截图，未修改内容。
- `artifacts/office026vera-portfolio/src/assets/project/content-evidence.jpeg`：用户提供单条内容截图，静态展示，不冒充视频播放器。
- `PROJECT-素材与验收.md`：本次待补素材及验收记录。

本次调整：`src/App.tsx` 新增 Project 路由与顶部导航高亮；更新生产构建输出。此前 About 视频入口、首页及其转场、Research、Lab 保持。

私密预览：https://office026vera-preview.cozypeach68.chatgpt.site/#/project

## Project 设计系统统一修订

Project 现直接复用 About 的公共样式。实际源代码变更、复用类名与验证结果详见 PROJECT-统一设计系统.md。此前关于 Project 独立全屏封面、SVG 裁取参考图及截图未取得的记录属于旧版本，本次已改为 About 同款封面容器并取得四张截图。Project 源文件为 projects.tsx 与 projects.css，本次未改动 About 或其他栏目。

## Project 详情占位模块清理

本次仅从 projects.tsx 删除三个待补素材模块及 Missing 组件，从 projects.css 删除专用 project-missing 样式。原有正文、两张真实截图、成果数据、课程结构示意和导航保留；Cover、Index 与其他页面未改动。模块在正常文档流中移除，未保留高度、占位框或空容器。

1440×900 和 390×844 下逐页检查 001 / 002 / 003，共六组：无占位提示、无空 aside、无横向溢出；正文到页脚使用既有公共间距（桌面84px、手机62px）。历史文档中的素材补充清单不再作为页面需求。生产构建通过。

## Project 详情字体与 Skills & Tools 对齐

本次仅调整 src/index.css 的共享排版选择器和 src/pages/projects.css 的详情文字规则。main h1 继续直接使用 AboutDetailFrame 相同的 .about-detail-masthead h1 与 760px 响应式规则；未额外放大标题。章节 h2 与 .about-capability-heading h2 共用 font 声明（桌面30px / 1.15，移动25px），保留原有中文字体回退。正文与 .about-capability-content > p 共用字号、字重、行高、字距及颜色（14px，手机13px，400，1.65，normal，#696368）；辅助文字与 .about-tool-list 共用12px / 1.65 / #8b8588；数据为24px / 1.3。右侧中文简介也按技能正文处理。

字体继续通过 index.css 原有 Google Fonts CSS 引入 Instrument Serif、Manrope、DM Mono，没有新增字体文件或改变字体来源。原有 About 的计算样式保持原值。

在1920×1080、1440×900、390×844、375×667检查 About/skills 及三个 Project 详情，共16组。对比font-family、size、weight、line-height、letter-spacing、color全部一致；无页面横向溢出，无数据单元溢出。桌面前两尺寸主标题76px，390px下39px，375px下38px。

对比截图在同一浏览器内宽1363px、visualViewport.scale=1取得；输出图片尺寸由截图接口决定，两图一致。页面结构、内容、资源、导航、Cover、Index及其他栏目均未重做。

## Research V1.0

Research 封面、分类目录与两页详情已加入，字体与布局直接复用 About。详见 RESEARCH-开发与验收.md。小猫原 GIF 缺失，静态 JPEG 参考图没有替代动画；其余功能及截图已完成。

## Research Index 小猫装饰修订

按最新要求使用静态透明 PNG，不再要求原 GIF。仅修改 research.tsx 的两个目录条目左侧区域、research.css 的局部样式，并新增 src/assets/research/cat-cart.png。两个编号下引用同一张 PNG，左列继续使用 About 的64px/35px Grid 宽度，图片宽度56px/手机28px，height:auto；图片及编号独立于右侧链接，不提供点击功能。右侧标题、中文简介和 OPEN FILE 仍在原列中。没有使用绝对定位，未改 Cover 或详情内容。

素材用内置 imagegen 的 background-extraction 模式处理。提示要求：只提取原小猫文件夹推车，去除白底及 office026/03，保留颜色、方向、比例和完整把手、轮子；输出透明 PNG。生成资产复制到项目目录后接入，两处复用，未生成第二只小猫。PNG 为 RGBA，alpha 范围0–255。

1920×1080、1440×900、390×844、375×667 检查通过：两图片同 URL、同尺寸、均位于编号下方并左对齐，未越过分隔线或进入右侧文字区域；无横向溢出。右侧入口点击测试通过，生产构建通过。
