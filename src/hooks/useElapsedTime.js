import { useEffect, useMemo, useState } from 'react'
export function getElapsed(start, now = new Date()) {
  if (now < start) {
    return {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }

  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }

  if (hours < 0) {
    hours += 24
    days -= 1
  }

  if (days < 0) {
    const daysInPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
    ).getDate()

    days += daysInPreviousMonth
    months -= 1
  }

  if (months < 0) {
    months += 12
    years -= 1
  }

  return {
    years,
    months,
    weeks: Math.floor(days / 7),
    days: days % 7,
    hours,
    minutes,
    seconds,
  }
}

export function useElapsedTime(startDate) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return useMemo(() => getElapsed(startDate, now), [startDate, now])
}