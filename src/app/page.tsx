import DemoFooter from 'components/demo/DemoFooter';

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
            <a href="https://sitecore-ai-demo-inky.vercel.app/" className="header__logo-wrapper main-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 22" fill="#ffffff" className="header__logo main-logo__picture">
                <title>SCHOTT</title>
                <g className="logo">
                  <path d="M47.5059 1.41504H50.52V20.882H47.5059V11.2457H38.0303V20.882H35.0161V1.41504H38.0303V9.24026H47.5059V1.41504Z"></path>
                  <path d="M27.0628 1.08521C29.3771 1.08521 31.3964 1.80398 33.1907 3.13358L32.0718 4.74048C30.756 3.6697 28.5324 3.09143 26.8696 3.09143C22.1786 3.09143 19.4126 6.38879 19.4126 11.0401C19.4126 16.0546 22.7254 19.207 26.8696 19.207C28.6698 19.207 30.4351 18.7766 31.9143 17.7717L32.9745 19.363C31.2048 20.5617 28.8526 21.2118 26.7314 21.2118C19.7588 21.2118 16.2068 16.4561 16.2068 11.0949C16.2068 6.19726 20.0664 1.08521 27.0628 1.08521Z"></path>
                  <path d="M80.8727 3.42126V20.8812H77.8548V3.42126H73.1653V1.41504H85.5875V3.42126H80.8727Z"></path>
                  <path d="M94.7042 3.42126V20.8812H91.6863V3.42126H86.9998V1.41504H99.4219V3.42126H94.7042Z"></path>
                  <path d="M8.0849 1.08521C10.2565 1.08521 12.5344 1.82099 14.2559 3.14689L13.2402 4.81221C11.8316 3.83313 10.0121 3.13284 8.25058 3.13284C5.05811 3.13284 3.67177 4.3944 3.67177 5.99464C3.67177 7.47213 5.47268 8.36099 9.03811 9.58114C12.1303 10.6401 15.264 12.0451 15.0174 15.8098C14.8123 18.9482 11.5604 21.211 7.46082 21.211C5.1651 21.211 2.43772 20.3429 0.578857 18.9408L1.77872 17.1808C3.40133 18.3559 5.31295 19.1626 7.40584 19.1626C9.89473 19.1626 12.0032 17.9277 12.0032 15.7536C12.0032 13.4242 7.69634 12.4274 6.03138 11.7974C2.55511 10.4811 0.604861 8.96219 0.740821 6.16546C0.893126 3.04854 3.82853 1.08521 8.0849 1.08521Z"></path>
                </g>
                <g className="logo-o">
                  <path d="M66.4103 0.554199C70.6489 1.9533 73.7061 5.92803 73.7061 10.6141C73.7061 16.4672 68.9394 21.2095 63.0596 21.2095C58.3047 21.2095 54.2779 18.1073 52.9094 13.8265C54.5885 16.8465 57.8255 18.8941 61.5403 18.8941C66.9839 18.8941 71.3948 14.5016 71.3948 9.08415C71.3948 5.43036 69.3881 2.24096 66.4103 0.554199Z"></path>
                  <path d="M61.5395 1.09546C65.2179 1.09546 68.316 3.55646 69.2655 6.9115C68.0002 4.8158 65.6934 3.41374 63.0581 3.41374C59.061 3.41374 55.824 6.63715 55.824 10.6141C55.824 13.2067 57.1985 15.4769 59.2616 16.7452C55.9392 15.769 53.5142 12.7076 53.5142 9.08411C53.5142 4.67087 57.1071 1.09546 61.5395 1.09546Z"></path>
                </g>
              </svg>
            </a>
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