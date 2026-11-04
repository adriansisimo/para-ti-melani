import { timeline } from '../data/timeline'
import './AboutUs.css'

function AboutUs() {
  return (
    <section id="nosotros" className="section">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="eyebrow">Nosotros</p>
          <h2>Lo que hemos construido juntos</h2>
        </div>

        <ol className="timeline">
          {timeline.map((item) => (
            <li className="timeline-item" key={item.id}>
              <div className="timeline-marker" aria-hidden="true" />
              <div className="timeline-card surface-card">
                <p className="timeline-date">{item.date}</p>
                <h3>{item.title}</h3>
                <p className="timeline-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default AboutUs