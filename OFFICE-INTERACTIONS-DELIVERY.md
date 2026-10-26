# office026vera · Office Interaction System V1.0

本次在现有代码上渐进增强，保留所有原素材、文案、路由与页面网格。

## 实现

| 效果 | 实现与实测 |
|---|---|
| About 工牌 | 260ms，整体上移7px/旋转−0.5°；回形针为原工牌子元素同步移动；点击90ms反馈，未延迟或拦截原跳转 |
| Project 键帽 | 原素材为整张封面图片，未切割重建；中央键帽区域悬停使原图下压2.5px/缩放0.99，180ms，无新增导航 |
| Research 推车 | 原静态PNG保持不变，整行hover/focus触发图片右移10px/旋转0.6°，350ms，目录行不移动 |
| LAB_001 | 保留原3组图像、编号与文字的共同父节点；两个加号及文件夹共6组，IO首次进入视口显现400ms，组间延迟最多120ms；快速越过及聚焦时确保可见 |
| LAB_003/004 | 原便利贴与HTML状态同步，上移2px/在原角度基础上旋转2°，260ms；Concept/In Progress不变 |
| 打开档案 | 12个详情页复用office-file；标题350ms，正文延迟80ms后350ms；编号、分类及细线不参与；Home/keyhole原代码不变 |

新动画参数集中于office-interactions.css。无新增依赖。移动端宽度<=760px不启用上述hover位移。prefers-reduced-motion:reduce及运行中偏好切换均处理；缺少Intersection Observer时公式直接可见。键盘focus保留，入口无需特殊手势。

## 运行与演示

在项目根目录使用 Node20+、pnpm10.32.1：

```
pnpm install --frozen-lockfile
pnpm run build:pages
pnpm run typecheck
```

构建输出为 artifacts/office026vera-portfolio/dist/public，可部署至原有静态托管/GitHub Pages。保留现有hash路由及相对资源配置。构建目录中的office-interactions-demo.html提供真实站点内嵌演示，可切换六种效果、八种视口、减少动态模拟与无Observer模拟，保存实际CSS帧数据；它没有加入网站原导航，不影响主站布局。请通过HTTP访问，不使用file://。

## 检查结果

- 修改前构建成功；各阶段及最终build:pages成功；工作区TypeScript检查成功；git diff --check通过。
- 四个目录页各检查八种尺寸：1920×1080、1440×900、1366×768、1024×768、768×1024、430×932、390×844、375×667，均未发现页面级横向滚动。
- 全部12个详情页在1440px及390px宽度检查，无横向溢出，标题和正文正常出现。LAB_001另检查八种尺寸，公式保持原构图和响应式网格。
- 工牌单击进入原VERA详情；LAB详情返回目录，浏览器后退及前进正常。Lab预览点击展开aria-expanded=true，空格收起=false；单个VISIT WEBSITE与原地址未改动。
- 减少动态模拟：公式全部可见、无pending；主标题无进入动画；键帽transform=none/transition=0s。无Observer模拟：全部公式直接可见、无隐藏内容。此为浏览器验收工具模拟，未更改系统设置。
- 实测JSON包含原始CSS矩阵、透明度、时间与动画状态。工牌终点y=-7；键帽scale=.99/y=2.5；推车x=10；便利贴003终点−3°/y=-2；档案标题与正文帧透明度递增至1。浏览器采样受自动化调度影响，部分公式记录只捕获完成帧；可在演示页重播观察，不把静态截图当作动画证明。
- transform/opacity不改变布局尺寸。常规样本布局偏移0～0.00017；主动展开/收起原有预览的样本累计0.02833（高度展开会重排），没有修改原预览实现。不能据此声称所有交互CLS恒为0。
- 检查到的控制台错误来自浏览器扩展；未发现本站脚本报错。构建保留原tooltip sourcemap提示，不影响成功输出。
- 原HEVC/MOV视频展开、收起与controls保留；当前云浏览器显示原有不支持HEVC提示，故未声称通过该环境视频播放验收。视频字节未改变，没有重编码。
- 未在真实平板/手机硬件或各旧版浏览器实测；上述为Chrome真实浏览器内指定视口。没有录制视频/GIF，交付可操作浏览器演示及实际帧记录。

## 实际代码文件（9个）

修改：
- artifacts/office026vera-portfolio/src/App.tsx：About详情class、全局偏好监听挂载。
- artifacts/office026vera-portfolio/src/main.tsx：统一动画样式入口。
- artifacts/office026vera-portfolio/src/pages/projects.tsx：原封面中央hover区域、详情class。
- artifacts/office026vera-portfolio/src/pages/research.tsx：详情class。
- artifacts/office026vera-portfolio/src/pages/lab.tsx：原公式ref/Hook、详情class。

新增：
- artifacts/office026vera-portfolio/src/office-interactions.css：共用参数、hover/focus、进入动画及减少动态样式。
- artifacts/office026vera-portfolio/src/hooks/use-office-reveal.ts：一次性IO显现与降级。
- artifacts/office026vera-portfolio/src/components/office-motion-preference.tsx：无DOM输出的动态偏好同步。
- artifacts/office026vera-portfolio/public/office-interactions-demo.html：独立交互验收工具。

复用原工牌Link与装饰父节点、Research目录行、Lab便利贴HTML结构、公式分组、详情masthead及返回入口；没有改动原index.css、各页专用CSS、字体、断点、图片/视频、依赖清单或锁文件。交付说明、日志及回退补丁为附加文件。

## 保护与回退

修改前基线提交：b38a46eb232c8c9e07e17abb77909e67f1024f0c。
开发分支：office-interaction-v1。旧版完整ZIP仍可恢复。

源码ZIP内附rollback-office-interactions.patch；在解压项目根目录运行：

```
git apply -R --check rollback-office-interactions.patch
git apply -R rollback-office-interactions.patch
pnpm run build:pages
```

这只回退本轮9个代码文件。先备份任何后续编辑；如已进一步修改这些文件，应人工核对冲突。构建产物需重新生成。回退不需要重新制作素材。
