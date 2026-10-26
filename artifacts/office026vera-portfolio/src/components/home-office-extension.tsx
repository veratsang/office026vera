import { Link } from 'wouter';
import { useHomeObjectReveal } from '@/hooks/use-home-object-reveal';
import { useStagedPrint } from '@/hooks/use-staged-print';
import './home-office-extension.css';

const selectedFiles = [
  {number:'001', title:'Personal Social Media Operations', zh:'个人社交媒体内容运营', category:'CONTENT / PROJECT_002', description:'独立拍摄与剪辑线下活动内容，结合受众兴趣、社媒流行趋势和素材特点进行内容制作。', result:'131K VIEWS / 28.5K LIKES', href:'/project/002'},
  {number:'002', title:'Interactive Plant-Watering Website', zh:'一日水长｜互动浇水网站', category:'DIGITAL EXPERIMENT / LAB_001', description:'围绕线下展位真实植物的浇水需求，设计线上互动流程，并通过 AI 辅助开发实现网页功能。', href:'/lab/001'},
  {number:'003', title:'Museum & Exhibition Texts', zh:'博物馆与展览文本', category:'RESEARCH / RESEARCH_001', description:'结合艺术史研究与文献整理经验，参与博物馆展览文本撰写及专业信息组织。', href:'/research/001'},
];

function ArchiveClosure() {
  return <svg className="home-envelope-closure" viewBox="0 0 100 180" aria-hidden="true" focusable="false">
    <circle cx="50" cy="40" r="23" fill="#748a9b" stroke="#8d9fad"/>
    <circle cx="50" cy="140" r="23" fill="#748a9b" stroke="#8d9fad"/>
    <g className="home-envelope-string" fill="none" stroke="#a7b5bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M75 34L66 36C80 61 61 68 50 64C33 60 24 45 29 31C34 16 60 14 69 28C76 39 67 50 62 58L32 129C24 145 38 165 54 162C72 159 78 142 68 127L34 54C28 42 31 27 44 22C61 17 77 33 71 47L33 133C27 148 37 158 51 159C64 159 73 148 69 135L35 53"/>
      <path d="M73 33L83 31"/>
    </g>
    {[40,140].map(cy=><g key={cy}><circle cx="50" cy={cy} r="8" fill="#acb1b5" stroke="#3b4249" strokeWidth="2"/><circle cx="50" cy={cy} r="4.5" fill="#33383c" stroke="#d6dce0" strokeWidth="1"/></g>)}
  </svg>;
}

export function HomeOfficeExtension() {
  const print = useStagedPrint();
  const sealRef = useHomeObjectReveal();
  return <div className="home-office-extension">
    <section className="home-selected" aria-labelledby="home-selected-title">
      <div className="home-object-label"><span>02 / SELECTED WORKS</span><span>THREE FILES · ONE OFFICE</span></div>
      <section className={`home-printer${print.busy ? ' is-printing' : ''}`} data-printed-files={print.count} aria-label="打印机输出精选档案">
        <div className="home-printer-housing" aria-hidden="true"><div className="home-printer-shell"/><div className="home-printer-forehead"/><div className="home-printer-top"><span>OFFICE026</span><i/></div><div className="home-printer-slot"/><div className="home-printer-lip"/></div>
        <button className="home-printer-control" type="button" onClick={print.printNext} disabled={print.count === 3} aria-disabled={print.busy || print.count === 3} aria-label={print.count === 3 ? '全部三份作品已打印' : `打印下一份作品档案，当前已打印 ${print.count} 份`} aria-controls="home-printed-output" aria-busy={print.busy}/>
        <div id="home-printed-output" className="home-print-window" ref={print.windowRef} style={{height:print.height}} onTransitionEnd={event=>{if(event.target === event.currentTarget && event.propertyName === 'height') print.unlock();}}>
          <div className="home-print-paper" ref={print.paperRef}>
            <header className="home-print-heading"><p className="home-print-meta">OFFICE026VERA / ARCHIVE</p><h2 id="home-selected-title">Selected works</h2><p className="home-print-meta">THREE FILES FROM THE ARCHIVE</p></header>
            <ol className="home-printed-files">{selectedFiles.map((file,index)=><li key={file.number} inert={index >= print.count} aria-hidden={index >= print.count}>
              <Link href={file.href} className="home-printed-file" aria-label={`Open FILE ${file.number} — ${file.title}`}>
                <div className="home-print-file-meta"><span>FILE {file.number}</span><span>{file.category}</span></div>
                <h3>{file.title}</h3><p className="home-print-zh">{file.zh}</p><p className="home-print-description">{file.description}</p>
                <div className="home-print-file-bottom">{file.result?<span className="home-print-results">{file.result}<small>已发布案例的历史表现</small></span>:<span/>}<span className="home-print-open">OPEN FILE <span aria-hidden="true">↗</span></span></div>
              </Link>
            </li>)}</ol>
            <p className="home-print-end" aria-hidden={print.count < 3}>END OF SELECTED FILES <span>001—003</span></p>
          </div>
        </div>
        <div className="home-print-controls"><p role="status">{print.count === 3 ? 'PRINTING COMPLETE' : print.count === 1 ? 'CLICK TO PRINT MORE ↘' : 'PRINT NEXT FILE ↘'}</p>{print.count < 3 && <button type="button" onClick={print.printAll}>PRINT ALL ↗</button>}</div>
      </section>
    </section>
    <section className="home-envelope" ref={sealRef} aria-labelledby="home-thank-you-title">
      <div className="home-envelope-sheet"><p className="home-print-meta">OFFICE026VERA / END OF FILE</p><h2 id="home-thank-you-title">Thank You</h2><p className="home-envelope-subtitle">FOR VISITING MY OFFICE</p><p className="home-envelope-looking">LOOKING FORWARD TO CONNECTING WITH YOU.</p></div>
      <ArchiveClosure/>
      <div className="home-envelope-pocket">
        <div className="home-envelope-contact"><p className="home-print-meta">CONTACT</p><a href="mailto:velium0@163.com">velium0@163.com <span aria-hidden="true">↗</span></a></div>
        <div className="home-envelope-signoff"><p>office026vera</p><span>ART HISTORY × CONTENT × DIGITAL EXPERIMENTS</span></div>
        <footer className="home-envelope-footer">A living archive</footer>
      </div>
    </section>
  </div>;
}
