import { useElapsedTime } from '../hooks/useElapsedTime'
import './Counter.css'

const pad = (value) => String(value).padStart(2, '0')

const pluralize = (value, singular, plural) =>
  value === 1 ? singular : plural

function Counter({ startDate }) {
  const elapsed = useElapsedTime(startDate)

  const mainUnits = [
    {
      id: 'years',
      value: elapsed.years,
      label: pluralize(elapsed.years, 'año', 'años'),
    },
    {
      id: 'months',
      value: elapsed.months,
      label: pluralize(elapsed.months, 'mes', 'meses'),
    },
    {
      id: 'weeks',
      value: elapsed.weeks,
      label: pluralize(elapsed.weeks, 'semana', 'semanas'),
    },
    {
      id: 'days',
      value: elapsed.days,
      label: pluralize(elapsed.days, 'día', 'días'),
    },
  ]

  return (
    <div className="counter" role="timer" aria-live="off">
      <div className="counter-grid">
        {mainUnits.map((unit) => (
          <div className="counter-unit" key={unit.id}>
            <span className="counter-value">{unit.value}</span>
            <span className="counter-label">{unit.label}</span>
          </div>
        ))}
      </div>

      <p className="counter-time">
        <span>{pad(elapsed.hours)} h</span>
        <span aria-hidden="true">·</span>
        <span>{pad(elapsed.minutes)} min</span>
        <span aria-hidden="true">·</span>
        <span>{pad(elapsed.seconds)} s</span>
      </p>
    </div>
  )
}

export default Counter