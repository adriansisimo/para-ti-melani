import Header from './components/Header'
import Hero from './sections/Hero'
import AboutHer from './sections/AboutHer'
import AboutUs from './sections/AboutUs'
import OurTime from './sections/OurTime'
import Graduation from './sections/Graduation'
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
        <Graduation />
      </main>
      <Footer />
    </>
  )
}

export default App
