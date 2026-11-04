import { useState } from 'react'
import { letters, LETTER_SIGNATURE } from '../data/letters'
import LetterModal from '../components/LetterModal'
import './Graduation.css'

function Graduation() {
  const [selectedLetter, setSelectedLetter] = useState(null)

  return (
    <section id="graduacion" className="section section--dark">
      <div className="container">
        <div className="section-header section-header--center">
          <p className="eyebrow">Para ti</p>
          <h2>Y por último, sé que pronto te gradúas...</h2>
          <p className="lead">
            Quiero dejarte cuatro cartas para que las abras cuando quieras.
            En cada una hay algo que quiero que recuerdes siempre.
          </p>
        </div>

        <ul className="letter-grid" role="list">
          {letters.map((letter) => (
            <li key={letter.id}>
              <button
                type="button"
                className="letter-card"
                onClick={() => setSelectedLetter(letter)}
                aria-haspopup="dialog"
              >
                <span className="letter-card__number" aria-hidden="true">
                  {letter.number}
                </span>

                <span className="letter-card__title">{letter.title}</span>

                <span className="letter-card__teaser">{letter.teaser}</span>

                <span className="letter-card__cta">
                  Abrir carta
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedLetter && (
        <LetterModal
          letter={selectedLetter}
          signature={LETTER_SIGNATURE}
          onClose={() => setSelectedLetter(null)}
        />
      )}
    </section>
  )
}

export default Graduation