# Project 与 About 统一设计系统

本次源代码仅修改以下两份文件：
- artifacts/office026vera-portfolio/src/pages/projects.tsx
- artifacts/office026vera-portfolio/src/pages/projects.css

直接复用 index.css 中已有公共类：
- interior-page：桌面 min(100% - 112px, 1120px)，760px 下左右 18px，380px 下左右 12px。
- about-archive、about-archive-heading、page-eyebrow、about-archive-meta：容器、粉色栏目编号、说明栏与分隔线。
- about-archive-layout、about-cover-visual：原封面外框、16:9 比例、边框、内外留白；使用完整原键帽图，保留 office026 / 02 / PROJECT / selected works。
- about-entry-column、about-entry-heading、about-section-kicker：索引左右分栏、等宽小标、衬线主标题及粉色斜体。
- about-detail、about-detail-backline、page-masthead、about-detail-masthead、page-description、page-rule：详情页头部及内容宽度。
- about-profile-introduction、about-profile-copy：详情页段落的布局、正文颜色、字号、行高和响应式。
- page-footer、about-archive-footer：页脚。
- 继续使用同一个 SiteHeader 组件，Project 及其子路由的栏目高亮已存在，本次未另建导航。

背景直接继承 body 的 --paper；边线使用 --line，内容使用 --ink；字体使用现有 --app-font-sans / serif / mono。不再设置 Project 独立白底、独立最大宽度或 700px 断点。Project 专属 CSS 仅保留金属椭圆、真实案例图文、数据及课程示意的必要排版，断点为现有 900px / 760px。

已有首页、About、Research、Lab 和钥匙孔转场未修改。原项目文案、两张真实截图、数据、素材占位、详情路由及返回交互保留；About 的静音视频保留原文件。

## 验证
- 生产构建、完整工作区 TypeScript 检查通过。
- 1348px 桌面预览中 About 与 Project 的内容宽度均为 1120px，左右 margin 均 114px，body 背景 rgb(246,247,247)，正文字体 Manrope, sans-serif。
- 浏览器 iframe 分别按 1920×1080、1440×900、390×844、375×667 检查索引及三个详情，共 16 组；scrollWidth 与 clientWidth 一致，无横向溢出。所有尺寸索引三个入口的 top 坐标一致。
- 浏览器截图成功：About 桌面、Project 桌面、Project 手机、Project Index 横排。手机截图为 390×844 iframe 中的真实页面。桌面截图为当前浏览器视口。
- 截图接口的 clip 模式仍超时，普通截图可用；采用成功取得的普通截图交付。

更新：生产构建产物、本文说明、README 开发说明。
私密预览：https://office026vera-preview.cozypeach68.chatgpt.site/#/project
