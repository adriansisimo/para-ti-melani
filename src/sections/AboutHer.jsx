import { qualities } from '../data/qualities'
import './AboutHer.css'

function AboutHer() {
  return (
    <section id="ella" className="section section--alt">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="eyebrow">Melani</p>
          <h2>Lo que admiro de ti</h2>
          <p className="lead">
            Hay cosas de ti que me hacen sentir orgulloso todos los días.
          </p>
        </div>

        <ul className="quality-grid" role="list">
          {qualities.map((quality) => (
            <li className="quality-card surface-card" key={quality.id}>
              <span className="quality-number" aria-hidden="true">
                {quality.number}
              </span>
              <h3>{quality.title}</h3>
              <p>{quality.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AboutHer
