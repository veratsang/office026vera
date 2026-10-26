import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import keycaps from '@/assets/project/keycaps.jpeg';
import account from '@/assets/project/account-evidence.jpeg';
import evidence from '@/assets/project/content-evidence.jpeg';
import './projects.css';
import { projectPeriods, projectPeriodsZh } from '@/data/project-periods';
import { OfficeObject } from '@/components/office-stationery';

const projects = [
  {id:'001', label:'Social Media Operations', title:'Institutional Social Media Operations', zh:'机构新媒体账号运营'},
  {id:'002', label:'Personal Content', title:'Personal Content Creation & Social Media', zh:'个人小红书账号运营'},
  {id:'003', label:'Curriculum Design', title:'Curriculum Design & Visualization', zh:'艺术教育课程体系设计与可视化'},
];
export function ProjectArchive() {
  const [location] = useLocation();
  useEffect(() => {
    const target = location.includes('index') ? document.getElementById('project-index') : null;
    if (target) target.scrollIntoView({behavior:'instant',block:'start'}); else window.scrollTo({top:0,behavior:'instant'});
  }, [location]);
  return <main className="interior-page about-archive project-archive">
    <div className="about-archive-heading">
      <p className="page-eyebrow"><span>03</span>SELECTED / WORKS</p>
      <span className="about-archive-meta">ARCHIVE ENTRY / THREE PROJECTS</span>
    </div>
    <div className="about-archive-layout">
      <figure className="about-cover-visual" aria-label="Project Cover">
        <img src={keycaps} alt="office026 / 02 — PROJECT 白色立体键帽封面 / selected works" />
        <span className="project-keycap-press-area" aria-hidden="true"/>
      </figure>
      <section id="project-index" className="about-entry-column project-index" aria-labelledby="project-index-title">
        <div className="about-entry-heading office-project-heading">
          <OfficeObject kind="binder" className="office-project-binder"/>
          <p className="about-section-kicker">SELECT A PROJECT / 001—003</p>
          <h1 id="project-index-title">Selected works<br /><em>from the archive.</em></h1>
          <p>Choose a project to explore content, communication, and curriculum design.</p>
        </div>
        <nav className="project-index-grid" aria-label="Project Index">
          {projects.map((p,i)=><Link key={p.id} href={`/project/${p.id}`} className="project-index-link"><span className="project-medallion">0{i+1}</span><span className="project-index-label">{p.label}</span><span className="project-index-zh">{p.zh}</span>{projectPeriods[p.id] && <span className="project-period project-index-period"><span>PERIOD / {projectPeriods[p.id]}</span><span lang="zh-CN">{projectPeriodsZh[p.id]}</span></span>}</Link>)}
        </nav>
      </section>
    </div>
    <footer className="page-footer about-archive-footer"><span>office026vera</span><span>Selected / works</span><Link href="/">Return to the beginning ↑</Link></footer>
  </main>;
}
function Section({n,title,children}:{n:string;title:string;children:React.ReactNode}) {return <section className="about-profile-introduction project-section"><div className="project-section-label"><span className="about-section-kicker">{n}</span><h2>{title}</h2></div><div className="about-profile-copy project-section-body">{children}</div></section>}

function Metrics({items}:{items:[string,string][]}) {return <dl className="project-metrics">{items.map(([v,l])=><div key={l}><dt>{l}</dt><dd>{v}</dd></div>)}</dl>}
export function ProjectDetail({id}:{id:string}) {
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  useEffect(()=>{setEvidenceOpen(false); window.scrollTo({top:0,behavior:'instant'})},[id]);
  const p=projects.find(p=>p.id===id)!;
  const title=id==='002'?'Personal Social Media Content Operations':p.title;
  const subtitle=id==='002'?'个人社交媒体内容运营':p.zh;
  return <main className="interior-page about-detail project-detail office-file"><div className="about-detail-backline"><Link href="/project/index">← ALL PROJECTS</Link><span>PROJECT_{id}</span></div>
    <header className="page-masthead about-detail-masthead"><div><p className="page-eyebrow"><span>03</span>Selected / works</p><h1>{title}</h1></div><p className="page-description">{subtitle}</p></header>
    <div className="page-rule"><span>Project / office026vera</span><span>File {id}</span></div>
    {projectPeriods[id] && <p className="project-period project-detail-period">PERIOD / {projectPeriods[id]}</p>}
    {id==='001'&&<>
      <Section n="01" title="项目背景"><p className="project-lead">从 0 开始，让内容持续发生。</p><p>负责机构新媒体账号从 0 开始运营。在缺少系统带教的情况下，于较短时间内完成平台熟悉、内容定位和持续更新。</p></Section>
      <Section n="02" title="职责与执行"><div className="project-two-columns"><div><h3>工作日 / 语言学习</h3><p>法语单词与词句朗读。</p></div><div><h3>周末 / 兴趣内容</h3><p>法语歌曲分享。</p></div></div><p>根据工作日与周末的不同使用场景划分内容，围绕法语学习与兴趣内容持续更新。独立完成选题、资料搜集、图片素材整理、视频制作及发布，将语言学习内容与艺术作品等视觉素材相结合，降低知识内容的理解门槛。</p></Section>
      <Section n="03" title="项目成果"><Metrics items={[["24 条","约 1 个月内发布的视频"],["250 赞 / 178 收藏","小红书 · 单条内容最高"],["113 赞 / 186 转发","微信视频号 · 单条内容最高"]]}/><p className="project-note">两组互动数据分别对应不同平台的单条内容，不合并统计。完成约 1 个月的独立运营后交接账号。</p></Section>
    </>}
    {id==='002'&&<>
      <dl className="project-002-facts"><div><dt>TYPE</dt><dd>Independent Content Practice</dd></div><div><dt>PLATFORM</dt><dd>Xiaohongshu</dd></div><div><dt>ROLE</dt><dd>Content Planning · Video Editing · Publishing</dd></div></dl>
      <Section n="01" title="Overview"><p>独立运营小红书个人兴趣内容账号，围绕偶像线下活动影像进行短视频创作。</p><p>结合素材表现力、内容时效性与平台趋势，完成视频筛选、剪辑、封面调整、话题标签选择及发布。</p><Metrics items={[["131K","单条视频最高播放量"],["28.5K","单条视频最高点赞量"],["49K","账号累计点赞与收藏"]]}/><p className="project-note">以上为历史内容表现数据，并非实时统计。</p></Section>
      <Section n="02" title="Content Strategy"><div className="project-002-strategies">
        <article><span className="about-section-kicker">01 / MATERIAL SELECTION</span><h3>素材筛选</h3><p>比较不同现场影像，优先选择画面清晰、具有表现力和内容看点的片段。</p></article>
        <article><span className="about-section-kicker">02 / TIMING &amp; AUDIO</span><h3>时效与声音</h3><p>当天发布的视频优先保留现场原声，突出即时性与现场氛围；非当天内容则根据画面情绪与节奏选择合适的背景音乐。</p></article>
        <article><span className="about-section-kicker">03 / CONTENT PACKAGING</span><h3>内容包装</h3><p>重视封面画面的选择与调整，关注视频清晰度、裁切比例及视觉重点，使内容呈现更清晰、直观。</p></article>
        <article><span className="about-section-kicker">04 / TRENDS &amp; TAGS</span><h3>趋势与标签</h3><p>参考平台流行内容形式，根据视频主题选择相关话题标签，并结合活动时效性安排发布。</p></article>
      </div></Section>
      <Section n="03" title="Execution"><ol className="project-002-workflow" aria-label="内容制作与发布流程">{['FOOTAGE','EDITING','PACKAGING','PUBLISHING'].map(step=><li key={step}>{step}</li>)}</ol><p>从现场素材中筛选片段，完成画面裁剪、剪辑节奏与声音配置，再调整封面和话题标签，最终发布内容。</p></Section>
      <Section n="04" title="Results"><p>账号粉丝规模相对有限，部分内容获得了较高的播放与互动表现。但由于缺少完整的流量来源及用户画像数据，无法确认非粉丝触达比例或各项内容策略的独立效果。</p><p className="project-note project-002-evidence-data">账号累计赞藏：49.4K；单条视频播放：130,799（约 131K）；单条视频点赞：28.5K。</p><button type="button" className="project-002-evidence-toggle" aria-expanded={evidenceOpen} aria-controls="project-002-evidence-images" onClick={()=>setEvidenceOpen(open=>!open)}>{evidenceOpen ? 'HIDE EVIDENCE / 收起数据截图 ↑' : 'VIEW EVIDENCE / 查看数据截图 ↓'}</button><div id="project-002-evidence-images" className="project-002-evidence" hidden={!evidenceOpen}><figure><a href={account} target="_blank" rel="noopener noreferrer"><img src={account} alt="个人账号历史资料截图：49.4K Likes & Saves" loading="lazy"/></a><figcaption>账号累计赞藏 / 原图显示 49.4K，快速阅读区采用约 49K。点击查看原图。</figcaption></figure><figure><a href={evidence} target="_blank" rel="noopener noreferrer"><img src={evidence} alt="已发布单条内容历史截图：130,799 次播放、28.5K 点赞" loading="lazy"/></a><figcaption>单条已发布内容 / 130,799 次播放，约 131K；28.5K 点赞。播放图标属于静态截图，点击查看原图。</figcaption></figure></div><p className="project-note">单条视频数据与账号累计赞藏采用不同统计口径。以上数据不对应 About → Skills &amp; Tools 中的 Offline Moments 独立剪辑案例。</p>
        <section className="project-002-case" aria-labelledby="project-002-case-title"><h3 id="project-002-case-title" className="project-002-case-heading">CASE NOTES / 原有单案例拆解</h3><div className="project-case-layout"><div className="project-case-steps"><article><span>01 / AUDIENCE & NEEDS</span><h3>受众与需求</h3><p>以关注相关偶像的粉丝为主要受众，满足其观看线下活动影像、偶像现场表现及展示个人技能的需求。</p></article><article><span>02 / CONTENT STRATEGY</span><h3>内容策略</h3><p>结合 HYBE 当时的宣传趋势与社交媒体内容趋势，基于现场素材选择内容切入点。通过画面取舍、剪辑节奏与封面设计突出视频看点，提升内容吸引力。</p></article><article><span>03 / PRODUCTION & EXECUTION</span><h3>制作执行</h3><ul><li>素材剪辑：精简视频内容，从偶像准备展示个人技能的关键节点切入，减少无效停顿。</li><li>视听呈现：保留现场原声，强化现场感；调整画面尺寸与构图，确保主体清晰。</li><li>发布优化：结合线下活动时效性及时发布，并选择相关标签。</li><li>评论互动：及时回应评论区话题，通过回复与点赞维持互动。</li></ul></article><article><span>04 / RESULTS & REVIEW</span><h3>效果与复盘</h3><Metrics items={[["约 131K","单条视频播放"],["约 28.5K","单条视频点赞"]]}/><ul><li>以现场大屏幕画面为主要素材，突出偶像的个人技能展示。相比距离较远的个人直拍，大屏幕画面更清晰地呈现细节。</li><li>从个人技能展示前的关键节点切入，减少铺垫与停顿。</li><li>调整画面尺寸和方向，改善观看体验。</li><li>及时回应评论区话题，增强内容与粉丝社群的连接。</li></ul></article></div></div><p className="project-note">单案例约 131K 为概数，证据截图显示 130,799 次播放；131K 为对该截图播放量的近似展示；截图点赞量为 28.5K。</p></section>
      </Section>
      <Section n="05" title="Reflection"><h3>Content Presentation Matters</h3><p>在运营实践中，我逐渐形成了结合素材质量、内容时效性、封面表现、声音配置与平台趋势进行内容判断的工作方法。</p><p>由于缺少系统化的数据记录，目前难以量化不同因素对传播结果的贡献。</p><p>未来若重新运营，我会建立内容表现记录表，持续记录发布时间、封面类型、视频长度、声音策略、话题标签与互动数据，并在可比条件下进行分析，逐步提高内容决策的可验证性。</p></Section>
    </>}
    {id==='003'&&<>
      <Section n="01" title="项目背景"><p className="project-lead">让课程结构可见，让教学经验得以衔接。</p><p>探索如何将不同阶段、不同类别的美术课程组织成易于教学和理解的体系。在保留各类课程自身教学逻辑的基础上，建立清晰、连贯且便于交接的课程体系，降低课程对单一教师个人经验的依赖，保障教学工作的连续性。</p></Section>
      <Section n="02" title="设计逻辑"><p>按照学习阶段与美术门类梳理课程内容，建立从入门到进阶的课程结构，并通过视觉化呈现，使课程安排更加清晰、规范。</p><div className="project-curriculum-map" aria-label="为作品集重新整理的课程结构示意"><div><span>学习阶段</span><strong>入门 → 进阶</strong></div><div><span>美术门类</span><strong>素描 / 色彩 / 中国画 / 儿童画</strong></div><div><span>教学衔接</span><strong>内容组织 → 视觉整理 → 授课与交接</strong></div></div><p className="project-note">以上为依据项目说明重新整理的结构示意，非原始课程成果。</p></Section>
      <Section n="03" title="职责与执行"><div className="project-process"><article><span>01</span><h3>分阶段课程体系</h3><p>梳理素描、色彩、中国画、儿童画等课程从入门到进阶的教学内容，形成具有阶段性与连贯性的课程结构。</p></article><article><span>02</span><h3>分类课程内容体系</h3><p>根据不同课程的内容特点组织教学材料。例如围绕儿童画课程，以中外朝代更迭为时间线，梳理各时期代表性艺术作品，并结合儿童认知特点与创作需求设计相应课程内容及教学材料。</p></article><article><span>03</span><h3>课程视觉化成果</h3><p>将课程内容与阶段关系进行结构化、视觉化整理，使教学体系更加直观，便于理解、查阅与教学衔接。</p></article></div></Section>
      <Section n="04" title="实际应用"><p>课程体系应用于实际教学，为日常授课与教师交接提供参考。部分学生作品在商场进行展示，将课堂教学成果延伸至公共展示空间。</p></Section>
    </>}
    <nav className="page-footer project-detail-nav" aria-label="项目间导航"><Link href="/project/index">← ALL PROJECTS</Link><Link href={`/project/${projects[(projects.indexOf(p)+2)%3].id}`}>← PREVIOUS</Link><Link href={`/project/${projects[(projects.indexOf(p)+1)%3].id}`}>NEXT →</Link></nav>
  </main>;
}
