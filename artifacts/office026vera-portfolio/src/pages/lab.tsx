import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import cover from '@/assets/lab/cover.jpeg';
import formulaReference from '@/assets/lab/formula-wide-reference.jpg';
import plantOutput from '@/assets/lab/plant-real-site.jpg';
import './lab.css';
import { OfficeNote } from '@/components/office-stationery';
import { useOfficeReveal } from '@/hooks/use-office-reveal';

const experiments = [
  {id:'001',title:'Interactive Plant-Watering Website',zh:'一日水长',status:'COMPLETED'},
  {id:'002',title:'Personal Portfolio Website',zh:'个人作品集网站',status:'COMPLETED / CURRENT VERSION'},
  {id:'003',title:'Thesis Visualization',zh:'硕士论文内容可视化',status:'CONCEPT'},
  {id:'004',title:'YouTube Korean Learning Extension',zh:'YouTube 韩语学习辅助插件',status:'IN PROGRESS'},
] as const;
type LabId = typeof experiments[number]['id'];

export function LabArchive() {
  const [location] = useLocation();
  useEffect(()=>{const index=location.endsWith('/index') ? document.getElementById('lab-index'):null; if(index) index.scrollIntoView({behavior:'instant',block:'start'}); else window.scrollTo({top:0,behavior:'instant'});},[location]);
  return <main className="interior-page about-archive lab-archive">
    <div className="about-archive-heading"><p className="page-eyebrow"><span>05</span>DIGITAL / EXPERIMENTS</p><span className="about-archive-meta">ARCHIVE ENTRY / FOUR EXPERIMENTS</span></div>
    <div className="about-archive-layout">
      <figure className="about-cover-visual"><img src={cover} alt="office026 / 04 — 实验器皿、蓝色培养皿与玻璃光影 / ai/experiments" /></figure>
      <section id="lab-index" className="about-entry-column" aria-labelledby="lab-index-title">
        <div className="about-entry-heading"><p className="about-section-kicker">LAB INDEX / 001—004</p><h1 id="lab-index-title">Experiments<br/><em>in progress.</em></h1><p>Ideas, interactions, and learning through making.</p></div>
        <nav aria-label="Lab experiments">{experiments.map(e=><Link key={e.id} href={`/lab/${e.id}`} className={`about-capability lab-index-entry${e.id==='003'||e.id==='004'?' office-lab-index-entry':''}`}><span className="about-capability-index">{e.id}</span><div className="about-capability-content"><p className="about-tool-list">LAB_{e.id} / {e.status}</p><div className="about-capability-heading"><h2>{e.title}</h2><span className="lab-open">OPEN FILE ↗</span></div><p>{e.zh}</p></div>{(e.id==='003'||e.id==='004')&&<OfficeNote id={e.id} status={e.status}/>}</Link>)}</nav>
      </section>
    </div>
    <footer className="page-footer about-archive-footer"><span>office026vera</span><span>Lab / digital experiments</span><Link href="/">Return to the beginning ↑</Link></footer>
  </main>;
}
function Stage({n,title,label,children}:{n:string;title:string;label?:string;children:ReactNode}) {
  return <section className="about-capability"><span className="about-capability-index">{n}</span><div className="about-capability-content"><div className="about-capability-heading"><h2>{title}</h2></div>{label&&<p className="about-tool-list">{label}</p>}{children}</div></section>;
}
function Sequence({steps,label}:{steps:string[];label:string}) {return <ol className="lab-sequence" aria-label={label}>{steps.map((s,i)=><li key={s}><span className="about-capability-index">0{i+1}</span><span>{s}</span>{i<steps.length-1&&<span aria-hidden="true">→</span>}</li>)}</ol>}
// The reference pixels remain unchanged. Blend the pale source background into
// the formula canvas; do not use generated cutouts which alter glass details.
function FormulaElement({kind}:{kind:'idea'|'tube'|'flask'|'folder'}) {
  const boxes={idea:'690 110 350 215',tube:'1092 342 70 232',flask:'904 606 108 178',folder:'918 872 214 200'};
  return <svg className="lab-formula-object" viewBox={boxes[kind]} role="img" aria-label={kind==='idea'?'原始蓝色手绘涂鸦':kind==='tube'?'完整透明试管及原始编号②':kind==='flask'?'完整透明烧瓶':'原始蓝色花纹文件夹'}><defs><mask id={`formula-mask-${kind}`} maskUnits="userSpaceOnUse" x="0" y="0" width="2048" height="1151"><rect width="2048" height="1151" fill="white"/>{kind==='idea'&&<><rect x="0" y="0" width="711" height="230" fill="black"/><rect x="990" y="305" width="80" height="80" fill="black"/></>}{kind==='flask'&&<rect x="0" y="0" width="930" height="665" fill="black"/>}</mask></defs><image href={formulaReference} width="2048" height="1151" mask={`url(#formula-mask-${kind})`}/></svg>;
}
function ExperimentFormula() {const formulaRef = useOfficeReveal(); return <section ref={formulaRef} className="lab-formula" aria-label="一日水长实验过程拼贴">
  <div className="lab-formula-group lab-formula-group-idea">
    <figure className="lab-formula-idea"><span className="lab-formula-number">①</span><FormulaElement kind="idea"/></figure>
    <div className="about-capability-content lab-formula-copy"><p className="about-tool-list">01 / IDEA</p><p><strong>问题与需求：</strong>展位设置真实植物，希望观众不只是观看，能够通过实际浇水参与互动；同时需要记录线下互动行为并方便项目方远程查看。</p></div>
  </div>
  <div className="lab-formula-operator" aria-hidden="true">+</div>
  <div className="lab-formula-group lab-formula-group-interaction">
    <div className="about-capability-content lab-formula-copy"><p className="about-tool-list">02 / INTERACTION DESIGN</p><p><strong>构想页面元素配色和设计风格、互动流程、规则限制、互动署名记录。</strong></p><p><strong>互动设计：</strong>将“浇水”设计为核心互动动作，建立“扫码进入网页—指定时段参与—网页点击浇水—动画反馈—记录互动”的线上线下联动流程。</p><p><strong>规则设计：</strong>根据展位运营安排设置 09:00–09:30、12:00–12:30、16:00–16:30 三个浇水时段，使网页互动与真实展位活动保持对应。</p></div>
    <figure className="lab-formula-tube"><FormulaElement kind="tube"/></figure>
  </div>
  <div className="lab-formula-operator" aria-hidden="true">+</div>
  <div className="lab-formula-group lab-formula-group-ai">
    <figure className="lab-formula-flask"><span className="lab-formula-number">③</span><FormulaElement kind="flask"/></figure>
    <div className="about-capability-content lab-formula-copy"><p className="about-tool-list">03 / AI DEVELOPMENT</p><p><strong>AI 实现：</strong>使用 Vibe Coding 完成互动网站制作，实现时间段限制、浇水按钮、昵称记录、浇水次数及互动记录等功能，并支持项目方远程查看互动情况。</p><p><strong>交互反馈：</strong>使用 ASCII 风格图标构建视觉界面，并设计浇水小动画，将现实中的浇水动作映射到网页中，使数字反馈服务于真实线下体验。</p></div>
  </div>
  <div className="lab-formula-folder"><span aria-hidden="true">↓</span><FormulaElement kind="folder"/><a className="lab-visit lab-folder-visit" href="https://interactive-plant--0velium0.replit.app/" target="_blank" rel="noopener noreferrer">VISIT WEBSITE ↗</a></div>
</section>}
function PlantExperiment() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  return <><ExperimentFormula/><section className="lab-finished-work" aria-label="一日水长成品展示">
    <div className="page-rule lab-preview-heading"><span>04 / FINAL OUTPUT</span><button id="lab-preview-toggle" type="button" aria-expanded={isPreviewOpen} aria-controls="lab-plant-preview" onClick={()=>setIsPreviewOpen(open=>!open)}>{isPreviewOpen ? 'CLOSE PREVIEW −' : 'VIEW PREVIEW +'}</button></div>
    <div id="lab-plant-preview" className="lab-preview-panel" role="region" aria-labelledby="lab-preview-toggle" hidden={!isPreviewOpen}>
      <figure><div className="lab-preview-image"><img src={plantOutput} alt="一日水长真实网站截图：植物视觉、今日浇水时刻及非浇水时段按钮"/></div><figcaption className="about-tool-list">一日水长 / INTERACTIVE PLANT-WATERING WEBSITE</figcaption></figure>
    </div>
  </section></>;
}
function PortfolioExperiment() {return <div className="about-capabilities">
  <Stage n="01" title="项目背景" label="Vibe Coding · Web Design · AI-assisted Development"><p>希望建立一个无需购买独立域名、可以展示跨领域作品的个人网站，将美术史研究、内容创作与数字实验组织在同一个空间中。</p></Stage>
  <Stage n="02" title="设计与开发过程"><p>探索 AI 辅助开发与网页部署工具，逐步完成网站的视觉设计、内容组织、页面交互与迭代。通过持续调整页面之间的排版与导航关系，建立统一的浏览体验。</p></Stage>
  <Stage n="03" title="当前成果" label="COMPLETED / CURRENT VERSION"><p>当前 office026vera 网站。以首页钥匙导航、栏目档案及项目详情组织跨领域作品。</p><p><Link href="/" className="lab-visit">VISIT HOMEPAGE ↗</Link></p></Stage>
  </div>}
function ThesisExperiment() {return <div className="about-capabilities">
  <Stage n="01" title="初步构思" label="CONCEPT"><p>探索将硕士论文内容转化为可视化体验。以观者视角进入画面，官员处于原有位置，随着视线和动线的逐渐深入，观者可以理解画中人物之间的关系。</p></Stage>
  <Stage n="02" title="观看路径"><p>围绕观者进入画面、逐步深入与理解人物关系组织概念路径，保留画中人物原有的位置关系。</p><Sequence steps={['观者进入画面','视线与动线深入','理解人物关系']} label="概念观看路径"/><p className="about-tool-list">为作品集整理的概念路径，非已完成产品界面。</p></Stage>
  <Stage n="03" title="当前阶段" label="CONCEPT"><p>目前为内容可视化的初步构思，尚未形成可使用的产品。</p></Stage>
  </div>}
function KoreanExperiment() {return <div className="about-capabilities">
  <Stage n="01" title="探索方向" label="IN PROGRESS"><p>探索 YouTube 韩语学习辅助插件，辅助理解 YouTuber 的日常口语表达。项目仍处于探索阶段。</p></Stage>
  <Stage n="02" title="双语逐字稿"><p>构思以双语逐字稿辅助对照观看与理解口语内容。</p></Stage>
  <Stage n="03" title="词组与词语原型"><p>探索鼠标悬停查询词组及词语原型的方式，帮助理解日常口语表达。</p></Stage>
  <Stage n="04" title="当前阶段" label="IN PROGRESS"><p>以上为正在探索的功能方向，尚未上线或发布，不代表功能已全部实现。</p></Stage>
  </div>}
export function LabDetail({id}:{id:LabId}) {
  useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});},[id]);
  const e=experiments.find(e=>e.id===id)!;
  return <main className="interior-page about-detail lab-detail office-file">
    <div className="about-detail-backline"><Link href="/lab/index">← LAB ARCHIVE</Link><span>LAB_{id}</span></div>
    <div className="page-masthead about-detail-masthead"><div><p className="page-eyebrow"><span>05</span>DIGITAL / EXPERIMENTS</p><h1>{e.title.toUpperCase()}</h1></div><p className="page-description">{e.zh}</p></div>
    <div className="page-rule"><span>{e.status}</span><span>File {id}</span></div>
    {id==='001'?<PlantExperiment/>:id==='002'?<PortfolioExperiment/>:id==='003'?<ThesisExperiment/>:<KoreanExperiment/>}
    <footer className="page-footer about-detail-footer"><Link href="/lab/index">← LAB ARCHIVE</Link><span>office026vera / Lab</span><Link href="/lab">Return to Lab cover ↑</Link></footer>
  </main>;
}
