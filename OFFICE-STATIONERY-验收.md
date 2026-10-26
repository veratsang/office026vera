# Office Stationery 局部视觉优化

## 素材
来源：用户 IMG_4192.jpeg，1080×1346 JPEG。通过确定性的背景分离、边缘去底色和Alpha蒙版提取原始像素，无AI重绘或生成替代物。仅用于网页小尺寸展示，不扩大成主视觉。
四个PNG均为真正RGBA透明文件：粉色回形针64×192、银色票据夹155×130、纸张堆185×251、蓝色便利贴222×256。分别约13、13、21、34KB。保留纸面、金属纹理、颜色和胶带；已裁掉透明边距并用棋盘背景检查。原合集为JPEG，边缘仍受原始压缩限制，不适合作大幅放大。

## 修改文件
- src/App.tsx：仅新增公共装饰组件导入及ABOUT001工牌内的回形针。
- src/pages/projects.tsx：仅Project Index标题边缘添加票据夹。
- src/pages/research.tsx：仅详情标题留白处添加纸张；移动端隐藏。
- src/pages/lab.tsx：仅目录003、004添加同源便利贴及HTML状态文字。
- src/components/office-stationery.tsx、office-stationery.css：共用装饰组件和作用域内样式。
- src/assets/office/ 下四个透明PNG。
以上src路径以artifacts/office026vera-portfolio为起点。公共index.css、路由及其他页面素材未更改。

## 布局及功能
所有装饰pointer-events:none，纯装饰图片alt为空、aria-hidden=true。便利贴状态文字为真正HTML，为避免重复读出，对屏幕阅读器隐藏，入口原有状态保持可读。
1920×1080、1440×900、390×844、375×667：About、Project Index、Research001/002、Lab Index无横向溢出；装饰无文字/按钮碰撞；素材正常加载；Research纸张小屏隐藏。
实际点击About VERA、Project001、Lab003入口正常。LAB001 VIEW PREVIEW展开与收起正常，aria-expanded同步。Lab详情组件代码经对比保持完全一致，包括一日水长实验公式及访问链接、LAB002—004内容。Research小猫未改动。
生产构建、工作区typecheck通过。
