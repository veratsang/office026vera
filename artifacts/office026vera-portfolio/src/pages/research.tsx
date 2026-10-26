import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import cover from '@/assets/research/cover.jpeg';
import catCart from '@/assets/research/cat-cart.png';
import './research.css';
import { OfficeObject } from '@/components/office-stationery';

// Only render the original animated asset if it is actually present.
const catGif = Object.values(import.meta.glob('../assets/research/cart-cat.gif', {
  eager: true, query: '?url', import: 'default',
}))[0] as string | undefined;
const categories = [
  { id: '001', title: 'Museum & Exhibition Texts', zh: '博物馆与展览文本', description: '美术史年会会议纪要撰写 · 香港中文大学文物馆展签撰写' },
  { id: '002', title: 'Archival & Literature Work', zh: '文献整理与系统归档', description: '金维诺相关文献整理与系统归档' },
];
function Methods({archival = false}: {archival?: boolean}) {
  const steps = archival ? [['VERIFY','资料核对'],['CLASSIFY','分类整理'],['CATALOGUE','目录编制'],['RETRIEVE','资料检索']] : [['COLLECT','资料收集'],['ANALYZE','信息分析'],['STRUCTURE','结构组织'],['COMMUNICATE','内容表达']];
  return <aside className="research-methods"><p className="about-section-kicker">{archival ? 'WORKFLOW / 工作方法' : 'RESEARCH METHODS / 经验归纳'}</p><ol>{steps.map(([en,zh],i)=><li key={en}><span className="research-method-en">{en}{i < 3 && <span aria-hidden="true"> →</span>}</span><span>{zh}</span></li>)}</ol><p className="research-method-note">{archival ? '依据工作经历为作品集重新整理的流程展示，非原始软件界面。' : '对本页真实工作经历的研究方法归纳。'}</p></aside>;
}
export function ResearchArchive() {
  const [location] = useLocation();
  useEffect(()=>{
    const index = location.endsWith('/index') ? document.getElementById('research-index') : null;
    if(index) index.scrollIntoView({behavior:'instant',block:'start'}); else window.scrollTo({top:0,behavior:'instant'});
  },[location]);
  return <main className="interior-page about-archive research-archive">
    <div className="about-archive-heading"><p className="page-eyebrow"><span>04</span>RESEARCH / DOCUMENTS</p><span className="about-archive-meta">ARCHIVE ENTRY / TWO CATEGORIES</span></div>
    <div className="about-archive-layout">
      <figure className="about-cover-visual"><img src={cover} alt="office026 / 03 — 建筑室内照片叠加蓝色描边 RESEARCH / art history/documents" /></figure>
      {catGif && <div className="research-cat"><img src={catGif} alt="推购物车的小猫动画" /></div>}
      <section id="research-index" className="about-entry-column" aria-labelledby="research-index-title">
        <div className="about-entry-heading"><p className="about-section-kicker">RESEARCH INDEX / 001—002</p><h1 id="research-index-title">Research notes<br /><em>from the archive.</em></h1><p>Art history, documentation, and translating knowledge for public life.</p></div>
        <nav className="research-index-entries" aria-label="Research archive categories">{categories.map(c=><div key={c.id} className="about-capability research-index-row"><div className="research-index-marker"><span className="about-capability-index">{c.id}</span><img className="research-index-cat" src={catCart} alt="" aria-hidden="true" draggable={false} /></div><Link href={`/research/${c.id}`} className="about-capability-content research-index-entry"><p className="about-section-kicker">RESEARCH_{c.id}</p><div className="about-capability-heading"><h2>{c.title}</h2><span className="research-open" aria-hidden="true">OPEN FILE ↗</span></div><p>{c.zh}</p><p className="about-tool-list">{c.description}</p></Link></div>)}</nav>
        <Methods />
      </section>
    </div>
    <footer className="page-footer about-archive-footer"><span>office026vera</span><span>Research / documents</span><Link href="/">Return to the beginning ↑</Link></footer>
  </main>;
}
function Case({number,title,time,children}:{number:string;title:string;time:string;children:ReactNode}) {
  return <section className="about-capability"><span className="about-capability-index">{number}</span><div className="about-capability-content research-case"><div className="about-capability-heading"><h2>{title}</h2></div><p className="about-tool-list">{time}</p>{children}</div></section>;
}
function Label({children}:{children:ReactNode}) {return <p className="about-tool-list research-copy-label">{children}</p>}
export function ResearchDetail({id}:{id:'001'|'002'}) {
  useEffect(()=>{ window.scrollTo({top:0,behavior:'instant'}); },[id]);
  const c = categories.find(c=>c.id===id)!;
  return <main className="interior-page about-detail research-detail office-file">
    <div className="about-detail-backline"><Link href="/research/index">← RESEARCH ARCHIVE</Link><span>RESEARCH_{id}</span></div>
    <div className="page-masthead about-detail-masthead office-research-masthead"><OfficeObject kind="paper" className="office-research-paper"/><div><p className="page-eyebrow"><span>04</span>RESEARCH / DOCUMENTS</p><h1>{c.title.toUpperCase()}</h1></div><p className="page-description">{c.zh}</p></div>
    <div className="page-rule"><span>Research / office026vera</span><span>File {id}</span></div>
    <div className="about-capabilities">
      {id==='001' ? <>
        <Case number="01" title="美术史年会会议纪要撰写" time="2023 年 11 月">
          <Label>任务背景</Label><p>对会议现场连续产生的大量学术信息进行记录，需要在有限时间内识别不同发言的核心观点。</p>
          <Label>工作内容</Label><p><span className="research-inline-label">信息采集：</span>记录会议现场的学术讨论与发言内容。</p><p><span className="research-inline-label">重点提炼：</span>根据会议主题筛选观点、案例及研究结论，区分不同发言人的观点和论据。</p><p><span className="research-inline-label">结构化写作：</span>按照会议主题和发言逻辑重新组织信息，将学术讨论整理成结构清晰的文字内容。</p>
          <Label>成果</Label><p>完成从信息采集、筛选到结构化文字输出的会议纪要整理工作。</p>
        </Case>
        <Case number="02" title="香港中文大学文物馆展签撰写" time="2023 年 12 月—2024 年 1 月">
          <Label>任务背景</Label><p>面向实际展览场景，将较完整的艺术史资料转化为普通观众能够快速理解的展签内容。</p>
          <Label>工作内容</Label><p><span className="research-inline-label">信息整理：</span>围绕展品搜集作者、年代、材质、背景等核心资料。</p><p><span className="research-inline-label">内容提炼：</span>重新组织信息顺序并控制文字篇幅，减少过度复杂的专业术语。</p><p><span className="research-inline-label">公众表达：</span>将专业艺术史知识转化为更易理解的展览文本。</p>
          <Label>成果</Label><p>完成从专业资料搜集、信息筛选到公众内容输出的展签撰写工作。</p>
        </Case>
      </> : <Case number="01" title="金维诺相关文献整理与系统归档" time="2024 年 3 月—2024 年 6 月">
        <Label>项目背景</Label><p>围绕金维诺相关学术文献、书目及纸质资料开展整理与归档工作，为后续研究与文献查找提供支持。</p>
        <Label>工作内容</Label>
        <p><span className="research-inline-label">01 — Material Verification / 资料核对</span><br />对不同来源的文献与纸质资料进行核对，整理基本信息。</p>
        <p><span className="research-inline-label">02 — Classification / 分类整理</span><br />按照资料属性与研究使用需求进行分类，建立清晰的组织结构。</p>
        <p><span className="research-inline-label">03 — Cataloguing / 目录编制</span><br />整理文献条目及相关信息，形成便于查阅的目录。</p>
        <p><span className="research-inline-label">04 — Digital Organization / 数字化组织</span><br />通过电子化管理与检索方式，提高文献查找和使用的便利性。</p>
        <Methods archival />
        <Label>成果</Label><p>完成相关资料的系统化组织，建立便于后续查阅与检索的资料目录及电子数据库，为学术研究与文献查考提供基础支持。</p>
      </Case>}
    </div>
    <footer className="page-footer about-detail-footer"><Link href="/research/index">← RESEARCH ARCHIVE</Link><span>office026vera / Research</span><Link href="/research">Return to Research cover ↑</Link></footer>
  </main>;
}
