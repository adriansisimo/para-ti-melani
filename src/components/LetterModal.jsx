import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './LetterModal.css'

function LetterModal({ letter, signature, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    // Guardamos la tarjeta que abrió el modal para devolverle el foco al cerrar.
    const trigger = document.activeElement

    dialog.showModal()
    document.body.classList.add('no-scroll')

    return () => {
      if (dialog.open) dialog.close()
      document.body.classList.remove('no-scroll')

      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus()
      }
    }
  }, [])

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) {
      onClose()
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="letter-modal"
      aria-labelledby={`letter-title-${letter.id}`}
      onCancel={onClose}
      onClick={handleBackdropClick}
    >
      <button
        type="button"
        className="letter-close"
        onClick={onClose}
        aria-label="Cerrar carta"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="m6 6 12 12M18 6 6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <article className="letter-panel">
        <p className="eyebrow">Carta {letter.number}</p>

        <h2 className="letter-title" id={`letter-title-${letter.id}`}>
          {letter.title}
        </h2>

        <div className="letter-body">
          {letter.paragraphs.map((paragraph, index) => (
            <p key={`${letter.id}-${index}`}>{paragraph}</p>
          ))}
        </div>

        {letter.closing && <p className="letter-closing">{letter.closing}</p>}

        <p className="letter-signature">{signature}</p>
      </article>
    </dialog>,
    document.body,
  )
}

export default LetterModal