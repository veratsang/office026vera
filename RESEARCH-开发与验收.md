# RESEARCH V1.0 开发与验收

## 实际源码变更
- src/pages/research.tsx：新增封面、目录、两个详情页、三项真实经历、方法与流程展示、目录定位及返回入口。
- src/pages/research.css：仅 Research 局部交互、流程与 GIF 尺寸样式。
- src/assets/research/cover.jpeg：直接使用用户提供的完整封面，未改照片、色调、比例或描边文字。
- src/App.tsx：添加 /research/index、/research/001、/research/002 路由，/research 使用新档案页，子路由导航高亮。
- attached_assets/research-cat-reference.jpeg：保留用户提供的构思参考；仅为静态 JPEG，未当作 GIF 在页面展示。
- 本说明及 README-开发与部署.md；更新生产构建。

本次未修改 index.css、About、Project 源文件、Home、Lab 或转场组件。

## 公共设计复用
直接使用 SiteHeader；interior-page / about-archive / about-archive-heading / page-eyebrow / about-archive-meta / about-archive-layout / about-cover-visual / about-entry-heading / about-section-kicker / about-detail / about-detail-backline / page-masthead / about-detail-masthead / page-description / page-rule / about-capabilities / about-capability / about-capability-index / about-capability-heading / about-capability-content / about-tool-list / page-footer 等既有类。没有新建 Research 字体系统。

封面中 03 是原图编号，页面栏目编号是 04。Methods 是经历归纳，VERIFY → CLASSIFY → CATALOGUE → RETRIEVE 为作品集整理的工作流程，均不冒充软件界面或独立项目成果。

## 事实与素材限制
三项经历及日期均按用户本次指令填入：2023年11月会议纪要；2023年12月—2024年1月文物馆展签；2024年3月—6月金维诺相关资料整理。没有新增文献数量、数据库技术或未经证实的成果。

项目及本次附件未找到原始小猫 GIF，只有 JPEG 构思图。不能从静态截图恢复原动画，因此没有生成、替换或伪造动画，也没有渲染空白占位区。已预留接入：将原 GIF 放到 artifacts/office026vera-portfolio/src/assets/research/cart-cat.gif，重新构建即可自动显示在封面与目录之间，原字节不处理，尺寸120px、手机90px，保持原比例。缺少原 GIF，动画部分仍未完成验收。

## 验证结果
- pnpm build:pages 和全工作区 TypeScript 检查通过；返回导航测试中发现的 effect 返回值问题已修复，修复后重新构建并复核导航。
- 1920×1080、1440×900、390×844、375×667 下比较 About/skills、Research index 及两详情，共16组，无横向溢出或占位提示。
- 详情 h1 / h2 / 正文 / 中文简介的 font-family、font-size、font-weight、line-height、letter-spacing、color 与 About 基准逐项一致；主内容宽度一致。
- Research 001 含两案例，002 含一案例，日期及正文完整。
- 分类入口、详情返回目录（实测目录top约79px）、返回封面均可用。
- 截图包含封面、目录、两详情、390×844手机视口及 About 基准；桌面截图在相同浏览器宽度和缩放取得。

私密预览：https://office026vera-preview.cozypeach68.chatgpt.site/#/research
