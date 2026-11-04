import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="section section--hero">
          <div className="container">
            <p className="eyebrow">12 de julio de 2023</p>
            <h1>Llevo Amándote Desde</h1>
            <p className="lead">"Contador..."</p>
          </div>
        </section>

      <section className="section section--alt" id="ella">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Melani</p>
            <h2>Lo que Admiro de Ti, desde mi cora</h2>
          </div>
          <p className="lead">Aquí irán las cosas que amo de ti</p>
        </div>
      </section>

      <section id="nosotros" className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Nosotros</p>
            <h2>Lo que hemos construido juntos</h2>
          </div>  
          <p className="lead">Aquí irán las cosas que hemos construido juntos</p>
        </div>
      </section>

      <section className="section section--strong" id="tiempo">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Nuestro tiempo</p>
            <h2>Momentos que Guardo con Amor</h2>
          </div>
          <p className="lead">Aquí irá la galería</p>
        </div>
      </section>

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
