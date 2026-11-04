import Counter from '../components/Counter'
import { START_DATE, START_DATE_LABEL } from '../data/relationship'
import './Hero.css'

function Hero() {
  return (
    <section id="inicio" className="section section--hero hero">
      <div className="container hero-inner">
        <p className="eyebrow">{START_DATE_LABEL}</p>
        <h1 className="hero-title">Llevo amándote desde hace</h1>
        <Counter startDate={START_DATE} />
        <p className="hero-note">Y espero que sean muchos años más.</p>
      </div>
    </section>
  )
}

export default Hero
