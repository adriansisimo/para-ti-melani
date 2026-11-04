import Header from './components/Header'
import Hero from './sections/Hero'
import AboutHer from './sections/AboutHer'
import AboutUs from './sections/AboutUs'
import OurTime from './sections/OurTime'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <AboutHer />
        <AboutUs />
        <OurTime />

        <section id="graduacion" className="section section--dark">
          <div className="container container--narrow">
            <div className="section-header">
              <p className="eyebrow">Para ti</p>
              <h2>Y por último...</h2>
            </div>
            <p className="lead">
              Aquí irá la introducción a tus cartas de graduación.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
