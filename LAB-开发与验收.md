# Lab 开发与验收

修改文件：src/App.tsx（Lab 路由和子路由导航激活）；src/pages/lab.tsx；src/pages/lab.css；src/assets/lab/cover.jpeg；本说明。源文件相对于 artifacts/office026vera-portfolio。

直接复用 About 的 SiteHeader、interior-page、about-archive、about-cover-visual、about-entry-heading、about-detail-masthead、about-capability、about-tool-list、返回栏及页脚。没有修改公共 index.css 或其他栏目文件。

build:pages 和工作区 typecheck 通过。1920×1080、1440×900、390×844、375×667 检查无横向溢出及失效图片。Lab 详情标题、章节和正文的 font-family/size/weight/line-height/letter-spacing/color 与同宽 About 一致。正文桌面14px/23.1px，手机13px/21.45px；章节标题桌面30px/34.5px，手机25px/28.75px。四个目录入口及返回目录已检查；返回定位 Index。GitHub Pages 保留相对资源路径与 hash 路由。

封面为原始图片，字节不变。实验器皿和烧瓶用 SVG viewBox 引用封面真实像素局部，未生成替代物。当前文件中未找到第二张实验流程图的蓝色涂鸦及《一日水长》真实截图，因此这两项未展示，未创建占位区。最终成果使用真实描述及原始网站链接。网页抓取与 HTTP 检查均未能确认外部网站的当前可访问状态，不能据此认定网站下线。

LAB_003 保持 CONCEPT；LAB_004 保持 IN PROGRESS。没有虚构运营数据或产品界面。Home、About、Project、Research 的组件、素材、样式未修改。


## LAB_001 公式构图纠正
仅修改 src/pages/lab.tsx、src/pages/lab.css，新增 src/assets/lab/formula-reference.jpg（本次原始参考图）、plant-real-site.jpg（真实网站实拍截图）。所有路径以 artifacts/office026vera-portfolio 为起点。没有修改 App.tsx 或公共样式，以及其他 Lab 项目。

页面顺序改为标题、独立完整实验公式、四段实验记录、真实访问入口。涂鸦在上、试管偏右、烧瓶偏左，两个加号与向下箭头连接真实网站成品。器皿不再出现在文字章节旁。

素材说明：尝试用内置图像工具提取透明 PNG，但结果改动了原始细节，未采用。最终以原始参考图的像素配合 SVG viewBox、遮罩与 CSS darken 混合实现独立元素，不是重新生成的素材，也不是 Lab 封面裁片。②保留原参考图器皿上的原始编号；①③和加号为网页文字。试管和烧瓶完整保留。

浏览器现已成功访问 https://interactive-plant--0velium0.replit.app/ ，标题 ZhiZhi Watering，页面为一日水长；使用其真实界面截图，没有模拟界面。未执行真实浇水操作。此检查更新并取代前版文档中无法确认访问状态的记录。

构建和类型检查通过；1920×1080、1440×900、390×844、375×667 检查无横向溢出，3 个主视觉素材、2 个加号、真实截图加载正确；实验记录中图片和器皿数量为 0。详情字体继续直接继承 About。


## 最终宽画布修正（替代前版窄竖向公式）
- 修改 src/pages/lab.tsx、src/pages/lab.css，新增 src/assets/lab/formula-wide-reference.jpg（用户原图，无重绘）。
- 公式使用详情页1120px主要内容宽度；IDEA说明在涂鸦右侧，INTERACTION说明在试管左侧，AI说明在烧瓶右侧。两个深灰加号连接三组，蓝色原始文件夹位于末端。全部说明是可选中的HTML文字。
- 删除公式下方原01/02/03重复章节。真实网站截图改为独立成品区，最大宽560px，保留真实网站链接。
- 直接复用About正文类about-capability-content与辅助文字about-tool-list；桌面正文14px/23.1px，手机13px/21.45px；Manrope字体、颜色rgb(105,99,104)。
- 1440、1920、390、375宽度检查均无横向溢出。1440下：①图像右边703.5，文字左边721.5；②文字右边794.3，图像左边816.7；③图像右边693.5，文字左边721.5。上下区间重叠，保证图文同一横向区域。两加号、文件夹与成品截图均存在；重复章节为0。
- 手机采用各组素材+对应说明顺序，不缩小桌面文字。参考图的圆圈②保留在原始试管中部。其他栏目、Lab Cover/Index与LAB002—004内容未更改。

恢复后重新运行 build:pages 成功，作品集应用 typecheck 通过。


## Final Output V2.0
代码仅修改 src/pages/lab.tsx、src/pages/lab.css。保留前三个实验步骤的原始组件内容和布局规则；LAB002—004组件完全一致。
VISIT WEBSITE移动至原始文件夹下方且仅一处，target=_blank，rel=noopener noreferrer。文件夹本身无点击行为。
Final Output以语义化button提供默认收起预览，aria-expanded与aria-controls同步维护，隐藏时内容从布局及可访问性树中移除。原位展开、再次收起，支持Enter和Space。180ms轻微进入动效，尊重prefers-reduced-motion。
使用原有真实截图，以CSS object-fit:cover、中央位置和440/936比例减少两侧空白，不修改截图文件，不拉伸。桌面预览最大宽360px，保留原图整个纵向范围及中央功能区。没有生成图片。
1920×1080、1440×900、390×844、375×667均验收：默认收起；链接唯一且水平居中；点击展开；空格收起；aria-expanded正确；展开图片正常加载；两态均无横向溢出。另验Enter展开通过。生产构建与工作区typecheck通过。
