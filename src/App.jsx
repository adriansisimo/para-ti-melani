import Header from './components/Header'
import Footer from './components/Header'

function App() {
  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="section section--hero">
          <div className="container">
            <p className="eyebrow">12 de Julio de 2023</p>
            <h1>Llevo Amándote Desde</h1>
            <p className="lead">"Contador..."</p>
          </div>
        </section>
      </main>

      <section className="ella" id="section section--alt">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Melani</p>
            <h2>Lo que Admiro de Ti, desde mi cora</h2>
          </div>
          <p className="lead">Aquí irán las cosas que amo de ti</p>
        </div>
      </section>
    </>
  )
}

export default App
