const footerGroups = [
  {
    title: 'Markets',
    links: ['Architecture', 'Automotive', 'Aviation, Astro and Space', 'Consumer Electronics', 'Health', 'Home and Living', 'Industrial and Energy', 'Optics', 'Retail and Gastronomy', 'Security and Defense', 'Semiconductor and Datacom'],
  },
  {
    title: 'Products',
    links: ['Product Selector', 'Expertise', 'Services', 'Trainings'],
  },
  {
    title: 'About us',
    links: ['Company', 'Sustainability', 'Document Search', 'Careers', 'Working at SCHOTT', 'Job Board'],
  },
  {
    title: 'Contact us',
    links: ['Contact us', 'Events & Fairs', 'News & Media'],
  },
];

export default function DemoFooter() {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-columns">
        {footerGroups.map((group) => (
          <section className="footer-group" key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((link) => <li key={link}>{link}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <div className="footer-bottom">
        <span className="wordmark footer-wordmark">SCHOTT</span>
        <span>Disclaimer&nbsp; | &nbsp;Imprint&nbsp; | &nbsp;Data Protection&nbsp; | &nbsp;Terms &amp; Conditions</span>
        <span className="social-labels">Facebook&nbsp;&nbsp; Instagram&nbsp;&nbsp; LinkedIn&nbsp;&nbsp; X&nbsp;&nbsp; YouTube</span>
      </div>
    </footer>
  );
}