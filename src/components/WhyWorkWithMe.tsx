import {Palette, Code2, ShieldCheck} from 'lucide-react';
import './PortfolioPositioning.css';

const pillars = [
  {title: 'Design Precision', icon: Palette, description: 'Translating Figma designs into responsive interfaces with attention to typography, spacing, interactions, and visual consistency.'},
  {title: 'Engineering Depth', icon: Code2, description: 'Building maintainable frontend experiences with accessibility, performance, and cross-browser behavior in mind.'},
  {title: 'Delivery Ownership', icon: ShieldCheck, description: 'Taking complex UI requirements through implementation, integration, debugging, quality checks, and delivery.'},
];

export default function WhyWorkWithMe() {
  return (
    <section id="why-work-with-me" className="section container positioning-section" aria-labelledby="usp-heading">
      <div className="section-heading">
        <span className="eyebrow">WHY WORK WITH ME</span>
        <h2 id="usp-heading">More than implementation.<br/><em>Ownership from design to delivery.</em></h2>
        <p className="positioning-section__intro">Design precision. Engineering depth. Delivery ownership.</p>
      </div>
      <div className="positioning-section__pillars">
        {pillars.map(({title, icon: Icon, description}) => (
          <article className="positioning-section__card" key={title}>
            <Icon size={22} aria-hidden="true"/>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
