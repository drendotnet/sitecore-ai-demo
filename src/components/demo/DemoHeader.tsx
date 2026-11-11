export default function DemoHeader() {
  return (
    <header className="site-header site-header--standalone">
      <div className="header-meta">
        <span>News &amp; Media</span>
        <span className="header-language">EN</span>
      </div>
      <div className="header-main">
        <span className="wordmark">SCHOTT</span>
        <nav className="main-nav" aria-label="Main navigation">
          <span>Markets &amp; Applications</span>
          <span>Products &amp; Expertise</span>
          <span>Solutions Magazine</span>
          <span>Careers</span>
          <span>About us</span>
        </nav>
      </div>
    </header>
  );
}