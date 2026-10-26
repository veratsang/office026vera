# office026vera · Homepage Refinement V3.0

## 完成内容

本轮仅修正现有首页新增模块，没有重做网站。

1. 首页礼物盒、Selected Works 顶部说明栏和信封使用同一个 --home-visual-width。礼物盒原有视口高度公式、素材与位置保持一致；只是将宽度表达式提为共享变量。
2. 打印纸起点位于黑槽内部：桌面纸张起点48px，出纸槽范围33—78px；手机起点40px，出纸槽范围28—62px。前额与槽前缘位于纸张上方，纸张盖在后壳及黑槽底层上方。中心线一致。
3. 初始完整显示FILE 001；第一次点击显示FILE 002，第二次显示FILE 003。提示依次为CLICK TO PRINT MORE、PRINT NEXT FILE、PRINTING COMPLETE。
4. 打印机是独立原生button；纸张不是按钮，内部案例链接独立。支持Enter/Space，重复点击锁定，完成后禁用。PRINT ALL可立即显示全部。
5. 保留同一份完整DOM纸张，使用800ms可视窗口高度过渡，不缩放文字；后续信封随文档流平滑下移。
6. 信封在桌面/平板保持1.95:1。手机不强制宽高比，按内容增加高度。灰蓝双扣、细绳和原文字保留。
7. Thank You全文复用首页标语的Instrument Serif、italic、400；未加入字体文件、字体服务或依赖。

## 测试

| 视口 | 礼物盒/说明栏/信封宽度 | 三者左边界 | 横向溢出 | 桌面信封比例 | 字体家族/斜体/字重一致 | 扣件与文字 |
|---|---|---|---|---|---|---|
|1920×1080|1120px|一致|无|1.950|通过|无重叠|
|1440×900|1013.33px|一致|无|1.950|通过|无重叠|
|1366×768|778.66px|一致|无|1.950|通过|无重叠|
|1024×768|778.66px|一致|无|1.950|通过|无重叠|
|768×1024|641px|一致|无|1.950|通过|无重叠|
|430×932|379px|一致|无|内容自适应|通过|无重叠|
|390×844|339px|一致|无|内容自适应|通过|无重叠|
|375×667|336px|一致|无|内容自适应|通过|无重叠|

- 桌面与手机均实际执行1→2→3；Enter和Space可打印。快速双击只增加一份；完成后按钮禁用。
- PRINT ALL实际结果为count=3、busy=false、transition=0s；不会等待渐进打印。
- 未打印条目使用inert与aria-hidden避免隐藏链接进入键盘顺序；展开后恢复。
- 两段实际动画帧：高度501→741px、741→985px；宽度始终676px。没有scaleY或内容纵向拉伸。
- 对应三个入口实际进入/project/002、/lab/001、/research/001；浏览器前进/后退正常。原四个模块钥匙入口实际打开About/Project/Research/Lab；Home钥匙与原地址保持一致。邮箱href为mailto:velium0@163.com，未发送邮件。
- 减少动态模拟：直接显示全部3份，隐藏条目为0，过渡时长0s。缺少观察器模拟：默认显示3份。
- 真正禁用iframe脚本时，React root为空，而noscript备用清单显示3个完整作品条目。原详情页仍是客户端路由，需要JavaScript；备用页已如实说明。
- 正常页面检查未发现本站脚本控制台错误。禁用脚本测试中，浏览器阻止脚本的通知属于测试设置预期，不是运行错误。
- 最终Vite构建、工作区TypeScript检查与git diff --check通过。原App.tsx、其他页面、字体、图片、视频、数据、依赖与锁文件未改动。

## 动画、降级与性能说明

单次打印800ms，950ms计时仅作transitionend失效时的解锁保障。同步锁防止同一轮重复递增；PRINT ALL可打断并直接展开。ResizeObserver仅响应纸张尺寸变化，不进行高频滚动计算。

默认渲染全部内容，尺寸测量成功且允许动画时才增强为单份。减少动态或无法测量时保留完整显示。无JavaScript使用静态noscript清单回退。

本轮按需求让文档流高度平滑增长，信封会自然下移；这不是固定高度版。实际记录样本layoutShift为0，不对所有滚动位置与设备承诺零CLS。

测试为Chrome浏览器内指定视口，未覆盖所有实机/旧浏览器。保留原HEVC视频且未重编码，本轮不改变其浏览器兼容性。

## 交付与演示

完整项目包包含源码与构建目录。homepage-extension-demo.html提供当前真实网页的点击打印、尺寸切换、减少动态与观察器降级演示，并可导出实际高度帧。演示工具不加入原主站导航。

证据包包含桌面三阶段、手机三阶段、桌面/手机信封共8张截图，以及staged-print-frames.json和构建/类型检查日志。桌面阶段截图为1920px视口缩放预览；手机为390×844视口及其验收画布。手机完成图展示清单末端，完整页面可在演示中滚动查看。没有合成动画帧或虚构产品截图。

部署范围为现有私密预览；不代替用户向GitHub Pages或Replit更新。

## 实际代码文件（6个）

- artifacts/office026vera-portfolio/src/index.css：仅提取Home共享宽度变量，保留礼物盒原计算结果。
- artifacts/office026vera-portfolio/src/components/home-office-extension.tsx：现有打印机按钮、三阶段接入、独立PRINT ALL、Thank You统一斜体。
- artifacts/office026vera-portfolio/src/components/home-office-extension.css：出纸槽层叠、平滑高度、统一宽度及横向信封比例；无脚本清单样式。
- artifacts/office026vera-portfolio/src/hooks/use-staged-print.ts：新增测量、状态、防重复、解锁及减少动态降级。
- artifacts/office026vera-portfolio/index.html：仅新增noscript三份作品信息回退；正常JS页面不显示它。
- artifacts/office026vera-portfolio/public/homepage-extension-demo.html：更新现有验收页以记录点击打印高度与状态。

附加文件为本说明及rollback-homepage-v3.patch。没有新增素材、字体或依赖。

## 运行与回退

基线提交：a19a56e；分支：homepage-refinement-v3。旧版ZIP仍可恢复。

Node20+、pnpm10.32.1，在项目根目录：

```
pnpm install --frozen-lockfile
pnpm run build:pages
pnpm run typecheck
```

构建目录为artifacts/office026vera-portfolio/dist/public。保留原相对资源配置和hash路由，可继续使用原GitHub Pages方式部署。

仅撤销本轮修正，先备份后续编辑，再运行：

```
git apply -R --check rollback-homepage-v3.patch
git apply -R rollback-homepage-v3.patch
pnpm run build:pages
```

不要对已进一步编辑的文件强制覆盖。需要整版恢复时，可使用上一版office026vera-homepage-extension-v2.zip。
