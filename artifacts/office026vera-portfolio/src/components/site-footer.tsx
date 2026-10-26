import { useLocation } from 'wouter';
import './site-footer.css';

/** Shared secondary contact and image-source notice. Keep specific credits in place. */
export function SiteFooter({ home = false }: { home?: boolean }) {
  return <footer className={`site-contact-footer archive-footer-type ${home ? 'site-contact-footer--home' : 'interior-page'}`} aria-label="Contact and image copyright">
    <div className="site-contact-footer-contact">
      <h2>CONTACT</h2>
      <a href="mailto:velium0@163.com">velium0@163.com</a>
    </div>
    <div className="site-contact-footer-credits" lang="zh-CN">
      <h2>Image Credits &amp; Copyright｜图片来源与版权声明</h2>
      <p>部分图片来源于 Pinterest、微信公众号等公开平台，版权归原作者或权利人所有。如有侵权，请联系我处理。</p>
    </div>
  </footer>;
}

export function InteriorSiteFooter() {
  const [location] = useLocation();
  return location === '/' ? null : <SiteFooter />;
}
