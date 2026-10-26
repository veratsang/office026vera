# office026vera GitHub Pages 部署说明

状态：部署配置已准备，尚未推送 GitHub，尚未执行 GitHub Actions，不能视为已上线。
目标仓库：https://github.com/vertsang/office026vera
目标网站：https://vertsang.github.io/office026vera/

## 包内内容
- office026vera/：最新完整源码、全部原始素材、GitHub Actions 工作流。
- pages-build/office026vera/：已构建的静态网站，供检查；不要把它代替源码上传到仓库根目录。
- build.log / typecheck.log：本地验证记录。

## 发布步骤
1. 登录 GitHub 的 vertsang 账号，检查 office026vera 仓库。若已有其他或不确定来源的代码，先备份、比较，不能直接覆盖。若不存在，创建同名 public 仓库，默认分支 main。
2. 使用 GitHub Desktop 克隆仓库。将本包 office026vera 文件夹内的内容复制到仓库根目录，包括 .github 隐藏文件夹。不要把 ZIP 或外层 office026vera 文件夹当作源码上传。Mac Finder 使用 Command + Shift + . 显示隐藏文件。
3. 在 GitHub Desktop 检查 Changes，提交到 main，再 Push origin。不要 force push。无需在电脑上安装 Node 来触发云端构建。
4. 仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。工作流已经提供，无需新增另一份。
5. 在 Actions 打开 Deploy office026vera to GitHub Pages，Run workflow → main。若首次推送发生在 Pages 启用之前，启用后重新运行。
6. 等 build 和 deploy 都成功，再打开目标网址并进行下列上线检查。只有工作流成功且实际网站可访问，才算部署完成。

## 上线检查
- Home、五把钥匙、About、Project、Research、Lab 及所有详情页。
- 打印机逐条出纸与 PRINT ALL；Thank You 档案袋；全站 Footer。
- PROJECT_002 的数据截图默认折叠、点击展开、查看原图。
- 手机 375 / 390 / 430px 无横向溢出，最新移动端样式保持不变。
- 图片、字体、视频资源加载及邮箱链接。
- 直接访问并刷新 https://vertsang.github.io/office026vera/#/project/002 。本项目使用 hash 路由，请保留 #；不要改成 /office026vera/project/002。

## 技术说明与范围
React + Vite + TypeScript + pnpm；Wouter hash 路由。
Actions 使用 Node 22，pnpm 版本读取 package.json，锁文件安装依赖。
构建命令：BASE_PATH=/office026vera/ pnpm run build:pages。
构建输出：artifacts/office026vera-portfolio/dist/public。
网站展示不依赖仓库内的后端模板；Lab 外部互动网站仍是原有外链。
部署准备不修改页面内容、交互或移动端样式；保留原 ChatGPT Work 网站。
原有 MOV/HEVC 视频是否能播放依赖访问设备的解码支持，部署没有转码或替换原视频。

## 以后更新
GitHub Desktop Fetch / Pull 最新代码 → 修改或合入已确认的源码 → 检查差异 → Commit → Push main。
每次推送 main 都会自动构建并发布；在 Actions 查看结果。推送后无需一直打开电脑或 ChatGPT。

## 当前限制
本环境未连接 GitHub 写入授权，因此未修改目标仓库、未启用 Pages、未运行远端工作流。
本地构建成功不等于 GitHub Pages 发布成功；上线功能验收需在实际发布后完成。

参考：
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
https://vite.dev/guide/static-deploy.html#github-pages
