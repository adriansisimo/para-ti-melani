import { useEffect, useRef, useState } from 'react'
import { memories } from '../data/memories'
import './OurTime.css'

const AUTOPLAY_MS = 5500
const SWIPE_THRESHOLD = 40
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

// Si el usuario pidió menos movimiento en su sistema, no avanzamos solo.
// Escuchamos cambios para respetarlo aunque la página ya esté abierta.
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    const handleChange = (event) => setPrefersReducedMotion(event.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

function OurTime() {
  const [index, setIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [instant, setInstant] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const dragStart = useRef(null)

  const total = memories.length
  const activeIndex = index % total
  const activeMemory = memories[activeIndex]
  // Clonamos la primera foto al final para que el paso sea continuo.
  const slides = [...memories, memories[0]]

  const next = () => {
    setIndex((current) => Math.min(current + 1, total))
  }

  const previous = () => {
    if (index === 0) {
      setInstant(true)
      setIndex(total - 1)
      return
    }

    setIndex((current) => current - 1)
  }

  const goTo = (target) => {
    if (target === activeIndex) return
    setInstant(true)
    setIndex(target)
  }

  const togglePause = () => {
    // Si reanuda con el mouse encima, el hover no debe volver a pausarlo.
    if (isPaused) setIsHovering(false)
    setIsPaused(!isPaused)
  }

  // Avance automático: se reinicia cada vez que cambia la foto.
  useEffect(() => {
    if (prefersReducedMotion || isHovering || isPaused) return

    const timeoutId = setTimeout(() => {
      setIndex((current) => (current >= total ? 0 : current + 1))
    }, AUTOPLAY_MS)

    return () => clearTimeout(timeoutId)
  }, [index, isHovering, isPaused, prefersReducedMotion, total])

  // Al llegar al clon, saltamos al inicio sin animación.
  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return
    if (index !== total) return

    setInstant(true)
    setIndex(0)
  }

  useEffect(() => {
    if (!instant) return

    const frame = requestAnimationFrame(() => setInstant(false))
    return () => cancelAnimationFrame(frame)
  }, [instant])

  const handlePointerDown = (event) => {
    dragStart.current = event.clientX
  }

  const handlePointerUp = (event) => {
    if (dragStart.current === null) return

    const distance = event.clientX - dragStart.current
    dragStart.current = null

    if (Math.abs(distance) < SWIPE_THRESHOLD) return

    if (distance < 0) {
      next()
    } else {
      previous()
    }
  }

  return (
    <section id="tiempo" className="section section--strong">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="eyebrow">Nuestro tiempo</p>
          <h2>Momentos que guardo con amor</h2>
          <p className="lead">
            Un recorrido por las fotos que mejor cuentan nuestra historia.
          </p>
        </div>

        <div
          className="carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Fotos de nuestros recuerdos"
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setIsHovering(true)
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse') setIsHovering(false)
          }}
        >
          <div className="carousel-card">
            <div
              className="carousel-viewport"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                dragStart.current = null
              }}
            >
              <ul
                className={`carousel-track ${instant ? 'carousel-track--instant' : ''}`}
                style={{ transform: `translateX(-${index * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {slides.map((memory, slideIndex) => (
                  <li
                    className="carousel-slide"
                    key={`${memory.id}-${slideIndex}`}
                    aria-hidden={slideIndex !== index}
                  >
                    <img
                      src={memory.src}
                      alt={memory.alt}
                      loading="eager"
                      decoding="async"
                    />
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="carousel-arrow carousel-arrow--prev"
                onClick={previous}
                aria-label="Foto anterior"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15 5 8 12l7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="carousel-arrow carousel-arrow--next"
                onClick={next}
                aria-label="Foto siguiente"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="m9 5 7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="carousel-caption">
              <span className="carousel-date">{activeMemory.date}</span>
              <span className="carousel-text">{activeMemory.caption}</span>
            </div>
          </div>

          <div className="carousel-footer">
            <p className="carousel-count" aria-hidden="true">
              {activeIndex + 1} / {total}
            </p>

            <div className="carousel-dots">
              {memories.map((memory, dotIndex) => (
                <button
                  type="button"
                  className="carousel-dot"
                  key={memory.id}
                  onClick={() => goTo(dotIndex)}
                  aria-label={`Ir a la foto ${dotIndex + 1} de ${total}`}
                  aria-current={dotIndex === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>

            {!prefersReducedMotion && (
              <button
                type="button"
                className="carousel-pause"
                onClick={togglePause}
                aria-pressed={isPaused}
              >
                {isPaused ? 'Reanudar' : 'Pausar'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurTime
