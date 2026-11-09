import './PortfolioPositioning.css';

const services = [
  {title: 'Figma to Code', description: 'Convert approved designs into responsive React, HTML, CSS, and SCSS interfaces.', primary: true},
  {title: 'Responsive Website Development', description: 'Build business websites, landing pages, and custom responsive UI sections.', primary: true},
  {title: 'React UI Development', description: 'Build reusable components, interactive interfaces, and application UI.', primary: false},
  {title: 'CMS Frontend Development', description: 'Implement Drupal/Twig themes and Sitecore-integrated frontend interfaces.', primary: false},
  {title: 'UI Fixes & Improvements', description: 'Resolve layout inconsistencies, responsive bugs, accessibility issues, and frontend performance problems.', primary: false},
];

export default function ServicesSection() {
  return (
    <section id="services" className="section section-dark positioning-section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">WHAT I CAN BUILD</span>
          <h2 id="services-heading">Frontend solutions,<br/><em>from design to delivery.</em></h2>
        </div>
        <div className="positioning-section__services">
          {services.map(({title, description, primary}) => (
            <article className={`positioning-section__card${primary ? ' positioning-section__card--primary' : ''}`} key={title}>
              {primary && <span className="positioning-section__label">PRIMARY SERVICE</span>}
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
