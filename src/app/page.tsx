import DemoFooter from 'src/DemoFooter';

const features = [
  {
    title: 'Our expertise',
    body: '140 years of experience in creating groundbreaking glass solutions evolved into our commitment to material innovations. Discover how SCHOTT uses this unique know-how and the latest technology to set new standards in a wide range of industries.',
    action: 'Discover our expertise',
    image: 'https://media.schott.com/api/public/content/04b554d443434407be41b151688ea513?t=OnExW720',
    alt: 'Man wearing safety goggles working on a machine in a production facility',
    imageSide: 'left',
  },
  {
    title: 'Careers at SCHOTT',
    body: 'Learn about the career opportunities and benefits waiting for you at one of the leading international technology groups in the areas of specialty glass, glass-ceramics and material solutions. At SCHOTT everybody can make a difference. Because together, we pioneer groundbreaking glass and material innovations, fueling science and inspiring progress.',
    action: 'Become one of us',
    image: 'https://media.schott.com/api/public/content/d85c24bfc73f4cb9b655032dd25e9c54?t=OnExW720',
    alt: 'Full-body shot of a SCHOTT production worker in blue work attire',
    imageSide: 'right',
  },
  {
    title: 'Projects and references',
    body: 'From protecting ancient manuscripts to expanding our knowledge of the universe: SCHOTT has a long history of working with world’s leading specialists, using our expertise in glass and material technology to solve complex challenges.',
    action: 'Explore our projects',
    image: 'https://media.schott.com/api/public/content/4fa583912d1d444a96986898f1e43f53?t=OnExW720',
    alt: 'Cobot positioning a Glaswafer into a laser processing machine',
    imageSide: 'left',
  },
];

const news = [
  {
    date: '1 October | Mainz, Germany',
    title: 'SCHOTT Pharma makes decarbonization measurable',
    image: 'https://media.schott.com/api/public/content/20507c3d36544bcf9806681bc02a6867?t=OnExW635',
    alt: 'In the cleanroom, a man in cleanroom attire is holding a tray of prefillable syringes.',
    size: 'large',
  },
  {
    date: '29 September | Germany, Mainz',
    title: 'Stefan Brandl appointed new CEO of SCHOTT',
    image: 'https://media.schott.com/api/public/content/8de2134f62cb49a09396f064d635b900?v=2a6bf894&t=OnExW604',
    alt: 'Two professionally dressed men standing in portrait poses.',
    size: 'small',
  },
  {
    date: '22 September | Germany, Mainz',
    title: 'SCHOTT Pharma and Nemera launch a compatible passive safety system',
    image: 'https://media.schott.com/api/public/content/bdb7e063d69747ccb8e52e6ff4d04b79?v=3423880d&t=OnExW604',
    alt: 'Hands wearing white protective gloves hold a glass syringe and passive safety system.',
    size: 'small',
  },
];

const mediaCoverage = [
  {
    date: '22 January 2026',
    source: 'Glass Online',
    title: 'SCHOTT revenues remain stable despite challenging market conditions',
    summary: 'Coverage of SCHOTT’s 2024/2025 performance and its quartz glass capabilities for semiconductor applications.',
  },
  {
    date: '14 December 2025',
    source: 'CNET',
    title: 'Smart Glasses Are Coming for Your Face, With Wild Options for 2026',
    summary: 'A feature on emerging smart-glasses technologies and reflective waveguide optics.',
  },
  {
    date: '1 July 2025',
    source: 'Materialism Podcast',
    title: 'Episode 107: Glass science with Schott',
    summary: 'A discussion of glass science, its history and new material innovations.',
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-stage" aria-labelledby="hero-title">
        <header className="site-header">
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

        <img
          className="hero-image"
          src="https://media.schott.com/api/public/content/f08cfae22a5f496b8e053ce6ed5242a3?t=OnExW1920"
          alt="A hand in white gloves holding a thin, flexible transparent sheet against a blue background."
        />
        <div className="hero-copy">
          <h1 id="hero-title">Pioneer your market</h1>
          <p>In highly competitive industries, differentiation isn’t optional – it’s decisive. Together, we turn challenges into innovative material solutions that set your applications apart.</p>
          <span className="primary-button">Explore your possibilities</span>
        </div>
      </section>

      <section className="feature-list" aria-label="SCHOTT expertise, careers and projects">
        {features.map((feature) => (
          <article className={`feature-row feature-row--image-${feature.imageSide}`} key={feature.title}>
            <div className="feature-copy">
              <h2>{feature.title}</h2>
              <p>{feature.body}</p>
              <span className="primary-button">{feature.action}</span>
            </div>
            <figure className="feature-media">
              <img src={feature.image} alt={feature.alt} loading="lazy" />
            </figure>
          </article>
        ))}
      </section>

      <section className="news-section" aria-labelledby="news-title">
        <h2 id="news-title" className="visually-hidden">News</h2>
        <article className="news-feature">
          <img src={news[0].image} alt={news[0].alt} loading="lazy" />
          <div className="news-copy">
            <p className="news-date">{news[0].date}</p>
            <h3>{news[0].title}</h3>
          </div>
        </article>
        <div className="news-secondary">
          {news.slice(1).map((item) => (
            <article className="news-card" key={item.title}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <div className="news-copy">
                <p className="news-date">{item.date}</p>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="media-section" aria-labelledby="media-title">
        <h2 id="media-title">SCHOTT in the media</h2>
        <div className="media-list">
          {mediaCoverage.map((item) => (
            <article className="media-row" key={item.title}>
              <div className="media-source">
                <span>{item.date}</span>
                <h3>{item.source}</h3>
              </div>
              <div className="media-copy">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span className="read-more">Read more <span aria-hidden="true">↗</span></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DemoFooter />
    </main>
  );
}