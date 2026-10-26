import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ResearchArchive, ResearchDetail } from '@/pages/research';
import { LabArchive, LabDetail } from '@/pages/lab';
import { ProjectArchive, ProjectDetail } from '@/pages/projects';
import NotFound from '@/pages/not-found';
import { HomeOfficeExtension } from '@/components/home-office-extension';
import { SiteFooter, InteriorSiteFooter } from '@/components/site-footer';
import { OfficeMotionPreference } from '@/components/office-motion-preference';
import { OfficeObject } from '@/components/office-stationery';
import bowKeys from '@assets/礼盒钥匙最终修正图_1792483661738.png';
import aboutCoverReference from '@assets/Live_20261018183713644_1792569987645.jpeg';
import offlineMoments from '@assets/copy_565008BC-6880-4C89-AC22-564A2A3FD114_1792658676438.mov';
import { useHashLocation } from 'wouter/use-hash-location';
import aboutBadgeReference from './assets/about-id-badges-transparent.png';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const navigation = [
  { label: 'Home', path: '/', index: '01' },
  { label: 'About', path: '/about', index: '02' },
  { label: 'Project', path: '/project', index: '03' },
  { label: 'Research', path: '/research', index: '04' },
  { label: 'Lab', path: '/lab', index: '05' },
];

const collections = {
  Project: {
    eyebrow: 'Selected practice / 01',
    intro: 'Content, communication, and learning systems shaped for different audiences and contexts.',
    items: [
      ['01', 'Institutional social media', 'Operations and editorial work for cultural institutions.'],
      ['02', 'Xiaohongshu content', 'Personal content making and visual storytelling.'],
      ['03', 'Art education curriculum', 'Curriculum system design for art education.'],
    ],
  },
  Research: {
    eyebrow: 'Notes & methods / 02',
    intro: 'A working archive for looking closely, organizing sources, and translating research for public life.',
    items: [
      ['01', 'Art-historical literature', 'Organization of literature and research materials.'],
      ['02', 'Museum object labels', 'Writing and editing interpretive text for museum objects.'],
      ['03', 'Conference documentation', 'Documentation of academic conferences and their conversations.'],
    ],
  },
  Lab: {
    eyebrow: 'Experiments in progress / 03',
    intro: 'Small digital studies that test how an idea can become a place to explore, learn, or play.',
    items: [
      ['01', 'Watering, together', 'An interactive watering-site experiment.'],
      ['02', 'Portfolio studies', 'Experiments in how a portfolio can be read and navigated.'],
      ['03', 'Learning tools', 'Experimental tools for learning and discovery.'],
    ],
  },
};

function Home() {
  return (
    <main className="home-page">
      <div className="home-intro">
        <p className="home-kicker">A personal archive&nbsp; · &nbsp;Est. 026</p>
        <h1 data-testid="text-site-title">office026vera</h1>
        <p className="home-subtitle">Art History <span>×</span> Content <span>×</span> Digital Experiments</p>
        <p className="home-tagline">Researching, creating, and building across disciplines.</p>
      </div>
      <div className="key-image-frame">
        <img className="key-image" src={bowKeys} alt="Pink patterned gift bow with two diagonal ribbon tails and five antique navigation keys" data-testid="img-bow-keys" />
        <nav className="key-navigation" aria-label="Navigate using the five keys">
          {navigation.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              className={`key-target key-target-${index + 1}`}
              aria-label={`${item.label} — open ${item.label} page`}
              title={item.label}
              data-testid={`link-key-${item.label.toLowerCase()}`}
            />
          ))}
        </nav>
      </div>
      <div className="home-caption">
        <span>Five keys, five ways in</span>
        <span>Choose a key to begin&nbsp; ↗</span>
      </div>
      <HomeOfficeExtension />
      <SiteFooter home />
    </main>
  );
}

function SiteHeader() {
  const [location] = useLocation();
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="office026vera home" data-testid="link-wordmark">office026vera<span>®</span></Link>
      <nav className="text-navigation" aria-label="Main navigation">
        {navigation.map((item) => (
          (() => {
            const isCurrent = location === item.path || ((item.path === '/about' || item.path === '/project' || item.path === '/research' || item.path === '/lab') && location.startsWith(item.path + '/'));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={isCurrent ? 'nav-link is-current' : 'nav-link'}
                aria-current={isCurrent ? 'page' : undefined}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <span className="nav-number">{item.index}</span>{item.label}
              </Link>
            );
          })()
        ))}
      </nav>
      <span className="header-note">Independent practice<br />Across disciplines</span>
    </header>
  );
}

function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-page about-archive" data-testid="about-archive">
        <div className="about-archive-heading">
          <p className="page-eyebrow"><span>02</span>Profile / Identity</p>
          <span className="about-archive-meta">ARCHIVE ENTRY&nbsp; / &nbsp;THREE FILES</span>
        </div>
        <div className="about-archive-layout">
          <figure className="about-cover-visual">
            <img
              src={aboutCoverReference}
              alt="Blue filing drawer with an ABOUT ME profile sheet, large outlined ABOUT lettering, and profile/identity caption"
              data-testid="img-about-cover"
            />
          </figure>
          <section className="about-entry-column" aria-labelledby="about-entry-title">
            <div className="about-entry-heading">
              <p className="about-section-kicker">SELECT A FILE&nbsp; / &nbsp;001—003</p>
              <h1 id="about-entry-title">Three entries<br /><em>to the archive.</em></h1>
              <p>Choose a badge to read the full profile, skills, or contact details.</p>
            </div>
            <nav className="about-badge-grid" aria-label="About archive files">
              <Link href="/about/vera" className="about-id-card about-id-card-1" aria-label="Open ABOUT 001 — VERA" data-testid="link-about-vera">
                <OfficeObject kind="paperclip" className="office-about-paperclip"/>
                <span className="about-id-card-image" aria-hidden="true">
                  <img src={aboutBadgeReference} alt="" />
                </span>
                <span className="about-id-card-label" aria-hidden="true">
                  <span className="about-id-card-index">ABOUT_001</span>
                  <span className="about-id-card-rule" />
                  <strong className="about-id-card-title">VERA</strong>
                  <span className="about-id-card-action">OPEN FILE ↗</span>
                </span>
              </Link>
              <Link href="/about/skills" className="about-id-card about-id-card-2" aria-label="Open ABOUT 002 — SKILLS & TOOLS" data-testid="link-about-skills">
                <span className="about-id-card-image" aria-hidden="true">
                  <img src={aboutBadgeReference} alt="" />
                </span>
                <span className="about-id-card-label" aria-hidden="true">
                  <span className="about-id-card-index">ABOUT_002</span>
                  <span className="about-id-card-rule" />
                  <strong className="about-id-card-title about-id-card-title-long">SKILLS &amp; TOOLS</strong>
                  <span className="about-id-card-action">OPEN FILE ↗</span>
                </span>
              </Link>
              <Link href="/about/contact" className="about-id-card about-id-card-3" aria-label="Open ABOUT 003 — CONTACT" data-testid="link-about-contact">
                <span className="about-id-card-image" aria-hidden="true">
                  <img src={aboutBadgeReference} alt="" />
                </span>
                <span className="about-id-card-label" aria-hidden="true">
                  <span className="about-id-card-index">ABOUT_003</span>
                  <span className="about-id-card-rule" />
                  <strong className="about-id-card-title">CONTACT</strong>
                  <span className="about-id-card-action">OPEN FILE ↗</span>
                </span>
              </Link>
            </nav>
          </section>
        </div>
        <footer className="page-footer about-archive-footer">
          <span>office026vera</span>
          <span>Profile / identity</span>
          <Link href="/" data-testid="link-about-return-home">Return to the beginning ↑</Link>
        </footer>
      </main>
    </>
  );
}

function AboutDetailFrame({
  number, eyebrow, title, description, children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="interior-page about-detail office-file">
        <div className="about-detail-backline">
          <Link href="/about" data-testid="link-about-detail-back">← About archive</Link>
          <span>ABOUT_{number}</span>
        </div>
        <div className="page-masthead about-detail-masthead">
          <div>
            <p className="page-eyebrow"><span>02</span>{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <p className="page-description">{description}</p>
        </div>
        <div className="page-rule"><span>About / office026vera</span><span>File&nbsp; {number}</span></div>
        {children}
        <footer className="page-footer about-detail-footer">
          <span>office026vera</span>
          <span>Profile / identity</span>
          <Link href="/about" data-testid="link-about-detail-footer">Return to About cover ↑</Link>
        </footer>
      </main>
    </>
  );
}

function AboutVeraPage() {
  const facts = [
    ['EDUCATION', '中央美术学院｜美术学硕士'],
    ['ACADEMIC BACKGROUND', '中国美术史 · 佛教美术史 · 中国文化史'],
    ['RESEARCH INTERESTS', '中国古代书画 · 视觉文化 · 艺术与数字媒介'],
    ['LANGUAGES', '中文（母语） · 英语（CET-6） · 韩语（初级学习阶段）'],
  ];
  return (
    <AboutDetailFrame
      number="001"
      eyebrow="Personal file / VERA"
      title="VERA"
      description="关于艺术、文化与数字媒介之间的联系，以及研究如何转化为可见、可用的成果。"
    >
      <section className="about-profile-introduction" data-testid="about-vera-introduction">
        <p className="about-section-kicker">INTRODUCTION&nbsp; / &nbsp;01</p>
        <div className="about-profile-copy">
          <p>我关注艺术、文化与数字媒介之间的联系。艺术史研究训练了我提出问题、梳理资料与组织论证的能力；内容创作与数字实验则让我尝试将这些思考转化为可见、可用的成果。</p>
          <p>从文献整理、展览文本到社交媒体内容与互动网站，我持续探索研究、视觉表达与数字工具之间的连接。目前，我正在尝试 AI 辅助创作与 Vibe Coding，希望以开放的方式理解问题、组织信息，并将想法逐步实现。</p>
        </div>
      </section>
      <dl className="about-facts-grid">
        {facts.map(([label, value], index) => (
          <div className="about-fact" key={label} data-testid={`about-vera-fact-${index + 1}`}>
            <dt><span>0{index + 1}</span>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="about-interests"><span>PERSONAL INTERESTS</span>Nomad · Procreate · 钩针 · 不织布 · 拼豆</p>
    </AboutDetailFrame>
  );
}

function VideoEditingWork() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  function toggleWork() {
    if (isOpen) videoRef.current?.pause();
    if (!isOpen) setHasPlaybackError(false);
    setIsOpen(!isOpen);
  }
  return (
    <section className="video-editing-work" aria-label="Video Editing">
      <div className="video-work-heading">
        <h3>Video Editing</h3>
        <button type="button" onClick={toggleWork} aria-expanded={isOpen} aria-controls="offline-moments-work">
          {isOpen ? 'CLOSE WORK ↑' : 'VIEW WORK ↗'}
        </button>
      </div>
      {isOpen && (
        <div id="offline-moments-work" className="video-work-detail">
          <p className="about-section-kicker">SELECTED VIDEO / 01</p>
          <h4>Offline Moments</h4>
          <p>素材由我自行拍摄，参考创作者 @闹行芭特 的视觉风格，通过镜头编排与节奏剪辑呈现线下活动氛围。</p>
          <video src={offlineMoments} ref={videoRef} controls playsInline muted preload="metadata" aria-label="Offline Moments 静音展示版" onError={() => setHasPlaybackError(true)}>
            您的浏览器不支持内嵌视频，请通过下方链接打开原文件。
          </video>
          {hasPlaybackError && <p role="status">当前浏览器可能不支持此 HEVC 视频，请在支持 HEVC 的设备或播放器中打开原文件。</p>}
          <a className="video-file-link" href={offlineMoments} target="_blank" rel="noopener noreferrer">打开视频原文件 ↗</a>
          <div className="video-work-credits">
            <p>原版 BGM：82MAJOR《오늘 어때 (wyd?)》</p>
            <p>视觉风格参考：@闹行芭特；拍摄与剪辑：VERA。</p>
            <p>网站展示版因音乐授权考虑已静音。如需了解原版，可<Link href="/about/contact">联系沟通</Link>，具体提供须符合相关授权要求。</p>
          </div>
        </div>
      )}
    </section>
  );
}

function AboutSkillsPage() {
  const areas = [
    {
      number: '01',
      title: 'Content & Operations',
      skills: '内容策划 · 社交媒体运营 · 视频剪辑',
      tools: '剪映 · Photoshop · Loveart',
      route: '/project',
      routeLabel: 'View Project',
    },
    {
      number: '02',
      title: 'Digital & AI',
      skills: 'Vibe Coding · AI 辅助创作 · 网站搭建',
      tools: 'Replit · Notion · Cursor',
      route: '/lab',
      routeLabel: 'View Lab',
    },
    {
      number: '03',
      title: 'Research',
      skills: '美术史研究 · 文献整理 · 学术写作 · 展览文本撰写',
      tools: '',
      route: '/research',
      routeLabel: 'View Research',
    },
  ];
  return (
    <AboutDetailFrame
      number="002"
      eyebrow="Skills & tools"
      title="SKILLS & TOOLS"
      description="内容运营、数字实验与艺术史研究的方法和工具。"
    >
      <section className="about-capabilities" aria-label="Skills, tools, and related pages">
        {areas.map((area) => (
          <article className="about-capability" key={area.number} data-testid={`about-capability-${area.number}`}>
            <span className="about-capability-index">{area.number}</span>
            <div className="about-capability-content">
              <div className="about-capability-heading">
                <h2>{area.title}</h2>
                <Link href={area.route} data-testid={`link-about-${area.route.slice(1)}`}>{area.routeLabel}&nbsp; ↗</Link>
              </div>
              <p>{area.skills}</p>
              {area.tools && <p className="about-tool-list"><span>TOOLS&nbsp; / &nbsp;</span>{area.tools}</p>}
              {area.number === '01' && <VideoEditingWork />}
            </div>
          </article>
        ))}
      </section>
    </AboutDetailFrame>
  );
}

function AboutContactPage() {
  return (
    <AboutDetailFrame
      number="003"
      eyebrow="Contact"
      title="CONTACT"
      description="For correspondence, please use the email address below."
    >
      <section className="about-contact-block" data-testid="about-contact-details">
        <p className="about-section-kicker">EMAIL&nbsp; / &nbsp;03</p>
        <a href="mailto:velium0@163.com" data-testid="link-about-email">velium0@163.com<span aria-hidden="true">↗</span></a>
      </section>
    </AboutDetailFrame>
  );
}

function CollectionPage({ title }: { title: 'Project' | 'Research' | 'Lab' }) {
  const collection = collections[title];
  return (
    <PageFrame
      name={title}
      number={title === 'Project' ? '01' : title === 'Research' ? '02' : '03'}
      eyebrow={collection.eyebrow}
      title={<>{title}<span className="title-period">.</span></>}
      description={collection.intro}
    >
      <div className="collection-list">
        {collection.items.map(([number, heading, description]) => (
          <article className="collection-item" key={number} data-testid={`item-${title.toLowerCase()}-${number}`}>
            <span className="row-index">{number}</span>
            <div className="collection-copy">
              <h2>{heading}</h2>
              <p>{description}</p>
            </div>
            <span className="item-arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
      <p className="archive-note"><span className="note-dot" />An evolving archive — further details will be added over time.</p>
    </PageFrame>
  );
}

function PageFrame({
  name, number, eyebrow, title, description, children,
}: {
  name: string;
  number: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="interior-page">
        <div className="page-masthead">
          <div>
            <p className="page-eyebrow"><span>{number}</span>{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <p className="page-description">{description}</p>
        </div>
        <div className="page-rule"><span>{name} / office026vera</span><span>Index&nbsp; {number}</span></div>
        {children}
        <footer className="page-footer">
          <span>office026vera</span>
          <span>Researching, creating, and building across disciplines.</span>
          <Link href="/" data-testid="link-return-home">Return to the beginning ↑</Link>
        </footer>
      </main>
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/">
          <div className="home-shell">
            <SiteHeader />
            <Home />
          </div>
        </Route>
        <Route path="/about" component={AboutPage} />
        <Route path="/about/vera" component={AboutVeraPage} />
        <Route path="/about/skills" component={AboutSkillsPage} />
        <Route path="/about/contact" component={AboutContactPage} />
        <Route path="/project"><SiteHeader /><ProjectArchive /></Route>
        <Route path="/project/index"><SiteHeader /><ProjectArchive /></Route>
        <Route path="/project/001"><SiteHeader /><ProjectDetail id="001" /></Route>
        <Route path="/project/002"><SiteHeader /><ProjectDetail id="002" /></Route>
        <Route path="/project/003"><SiteHeader /><ProjectDetail id="003" /></Route>
        <Route path="/research"><SiteHeader /><ResearchArchive /></Route>
        <Route path="/research/index"><SiteHeader /><ResearchArchive /></Route>
        <Route path="/research/001"><SiteHeader /><ResearchDetail id="001" /></Route>
        <Route path="/research/002"><SiteHeader /><ResearchDetail id="002" /></Route>
        <Route path="/lab"><SiteHeader /><LabArchive /></Route>
        <Route path="/lab/index"><SiteHeader /><LabArchive /></Route>
        <Route path="/lab/001"><SiteHeader /><LabDetail id="001" /></Route>
        <Route path="/lab/002"><SiteHeader /><LabDetail id="002" /></Route>
        <Route path="/lab/003"><SiteHeader /><LabDetail id="003" /></Route>
        <Route path="/lab/004"><SiteHeader /><LabDetail id="004" /></Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RouteTransition() {
  const [location] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setIsVisible(true);
    const timeout = window.setTimeout(() => setIsVisible(false), 420);
    return () => window.clearTimeout(timeout);
  }, [location]);
  return <div className={isVisible ? 'keyhole-transition is-opening' : 'keyhole-transition'} aria-hidden="true"><span /></div>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter hook={useHashLocation}>
          <OfficeMotionPreference/>
          <Router />
          <InteriorSiteFooter />
          <RouteTransition />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
