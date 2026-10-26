# office026vera · Homepage Extension V2.0

## 已完成

保留原蝴蝶结、钥匙盒、五把钥匙和钥匙孔转场。在现有Home主视觉之后加入打印机精选清单、档案袋结尾。

- 打印机使用CSS外壳、出纸口与遮挡层；纸张宽度略小于机身。暖白纸张上的三项内容均为可聚焦的真实链接，使用细虚线分隔，没有伪造缩略图。
- 清单链接依次为 #/project/002、#/lab/001、#/research/001。131K VIEWS / 28.5K LIKES仅出现在已发布社媒案例旁，附历史表现说明。
- 档案袋使用浅纸层、炭灰袋体及原创SVG灰蓝双扣/细绳。桌面573px左右，390/375px手机520px；430px手机522px。上下内容随文字自然增高，不用固定高度裁切。
- 邮箱及粉色箭头是同一个mailto:velium0@163.com链接。
- 原Home Footer没有版权或图片来源链接；原有品牌、标语与“A living archive”已整合到袋体内，避免重复。其他页面的声明、链接与Footer未动。

## 字体与视觉复用

没有新增字体、字体文件或外部字体请求。新模块直接引用现有 --app-font-serif（Instrument Serif）、--app-font-sans（Manrope）、--app-font-mono（DM Mono）；复用 --paper、--ink、--pink、--line 等全站变量，没有覆盖它们。

英文案例标题采用现有衬线栏目标题尺度，中文正文桌面15px/1.9、手机14px/1.85；辅助编号使用既有等宽字体。Thank You仍是原衬线字体，You使用同族斜体。银白设备、暖白纸张、灰蓝扣件与炭灰袋体均为本次允许的局部物件配色。

## 动画与可访问性

- 打印机保持静止；纸张用clip-path从出纸口展开，900ms，不缩放字形。三个条目分别延迟180/330/480ms，淡入350ms。
- 纸张在文档流中一直保留完整高度。实际样本纸张宽676px、高985px，裁切从93.97%收至完整可见，宽高没有变化。
- 单次Intersection Observer触发。结束后断开；快速越过、页尾进入与键盘聚焦时直接完成，避免内容一直隐藏。没有滚动锁定或持续滚动计算。
- 绳索仅一次520ms、约4%的横向收紧，扣件和联系文字不移动。
- 减少动态偏好开启时清单完整可见、绳索静止；运行中开启也可取消新动画。缺少Observer时默认静态全显。
- 整条作品条目为语义链接，键盘可操作，具可见focus；纯装饰壳体和SVG为aria-hidden。所有信息不依赖hover。

## 验收记录

| 视口 | 无横向滚动 | 3个案例/5把钥匙 | 绳索与联系文字无重叠 | 档案袋高度 |
|---|---|---|---|---|
| 1920×1080 | 通过 | 通过 | 通过 | 573px |
| 1440×900 | 通过 | 通过 | 通过 | 573px |
| 1366×768 | 通过 | 通过 | 通过 | 573px |
| 1024×768 | 通过 | 通过 | 通过 | 562px |
| 768×1024 | 通过 | 通过 | 通过 | 562px |
| 430×932 | 通过 | 通过 | 通过 | 522px |
| 390×844 | 通过 | 通过 | 通过 | 520px |
| 375×667 | 通过 | 通过 | 通过 | 520px |

三个清单链接已实际进入正确详情。原四把模块钥匙入口已实际打开About/Project/Research/Lab；Home钥匙保留原路径。浏览器前进/后退通过。邮箱href与箭头共同链接结构已核对，未实际发送邮件。

build:pages、工作区TypeScript检查及git diff --check通过。捕获到的两个新动画样本layout-shift为0；这不是对全站所有加载场景CLS为0的保证。本站控制台未发现脚本错误。没有增加依赖，原首页主视觉、导航及RouteTransition源码逐段比对一致。

减少动态与缺少Observer通过验收工具模拟检查，没有修改操作系统设置。尺寸测试使用Chrome内真实iframe视口，未在所有实机或旧浏览器上验证。

## 预览、截图与动画演示

homepage-extension-demo.html加载当前真实站点，可重播出纸与封口，切换八种尺寸、减少动态和缺少Observer，导出实际动画状态。它是独立验收入口，没有加入主站导航。

证据包含六张分区截图、print.json、envelope.json、静态/最终构建日志和TypeScript日志。桌面截图展示1920px视口缩放后的浏览器预览；手机展示390×844视口及其验收画布。整页截图接口超时，因此提供入口、打印清单、档案袋的分区截图。动画以可操作网页和真实帧记录交付，未制作模拟GIF或假视频。云浏览器帧采样较稀疏，JSON保留原始采样，没有补造帧。

所列功能均已实现。预览保持原访问权限；没有代替用户向GitHub Pages或Replit部署。

## 实际代码文件（5个）

1. 修改 artifacts/office026vera-portfolio/src/App.tsx：只挂载新首页组件，将重复Home Footer文本整合到新结尾。
2. 新增 artifacts/office026vera-portfolio/src/components/home-office-extension.tsx：三项真实档案、打印机结构、档案袋SVG及邮箱。
3. 新增 artifacts/office026vera-portfolio/src/components/home-office-extension.css：仅作用于新Home模块的样式与动效。
4. 新增 artifacts/office026vera-portfolio/src/hooks/use-home-object-reveal.ts：一次性视口增强、聚焦可见性与降级。
5. 新增 artifacts/office026vera-portfolio/public/homepage-extension-demo.html：真实浏览器验收工具。

附加交付文件为本说明和rollback-homepage-extension.patch。原图片、视频、全站CSS、字体、依赖及锁文件未改动。

## 运行与回退

基线提交：5f7401e；独立分支：homepage-extension-v2。原About宽度修复与之前微交互均保留在基线中。

使用Node20+和pnpm10.32.1，在项目根目录：

```
pnpm install --frozen-lockfile
pnpm run build:pages
pnpm run typecheck
```

构建输出：artifacts/office026vera-portfolio/dist/public。保留原GitHub Pages相对资源配置及hash路由，可通过HTTP预览构建目录。

若需仅撤销本轮修改，先备份后续编辑，再在项目根目录运行：

```
git apply -R --check rollback-homepage-extension.patch
git apply -R rollback-homepage-extension.patch
pnpm run build:pages
```

也可恢复上一版office026vera-about-width-fixed.zip。不要直接复用旧构建产物；回退后重新构建。
