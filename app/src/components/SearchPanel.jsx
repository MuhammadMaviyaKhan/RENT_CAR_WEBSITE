import { useEffect, useMemo, useRef, useState } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import { useRouter } from '../router.jsx'

const toISODate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const parseDate = (value) => {
    if (!value) return null
    const parsed = new Date(`${value}T00:00:00`)
    return Number.isNaN(parsed.getTime()) ? null : parsed
}

const addDays = (date, days) => {
    const next = new Date(date)
    next.setDate(next.getDate() + days)
    return next
}

const formatDate = (date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function SearchPanel() {
    const showToast = useToast()
    const { navigate } = useRouter()
    const locationRef = useRef(null)
    const timerRef = useRef(null)

    const initialDates = useMemo(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return {
            today: toISODate(today),
            pickup: toISODate(addDays(today, 1)),
            return: toISODate(addDays(today, 4)),
        }
    }, [])

    const [location, setLocation] = useState('Dubai Marina')
    const [pickupDate, setPickupDate] = useState(initialDates.pickup)
    const [returnDate, setReturnDate] = useState(initialDates.return)
    const [returnMin, setReturnMin] = useState(initialDates.today)
    const [searching, setSearching] = useState(false)

    useEffect(() => () => window.clearTimeout(timerRef.current), [])

    const handlePickupChange = (event) => {
        const value = event.target.value
        setPickupDate(value)

        const pickup = parseDate(value)
        if (!pickup) return

        setReturnMin(toISODate(pickup))
        const currentReturn = parseDate(returnDate)
        if (!currentReturn || currentReturn < pickup) {
            setReturnDate(toISODate(addDays(pickup, 3)))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (searching) return

        const pickup = parseDate(pickupDate)
        const dropoff = parseDate(returnDate)

        if (!location.trim()) {
            showToast('Add a pick-up location so we know where to bring the car.', 'error')
            locationRef.current?.focus()
            return
        }

        if (!pickup || !dropoff) {
            showToast('Choose your pick-up and return dates to see availability.', 'error')
            return
        }

        if (dropoff < pickup) {
            showToast('Your return date needs to be after the pick-up date.', 'error')
            return
        }

        setSearching(true)
        timerRef.current = window.setTimeout(() => {
            setSearching(false)
            showToast(
                `12 premium cars are available in ${location.trim()} · ${formatDate(
                    pickup,
                )} → ${formatDate(dropoff)}.`,
            )
            navigate('/fleet')
        }, 750)
    }

    return (
        <form
            className="search-panel glass reveal"
            id="searchForm"
            style={{ '--delay': '.4s' }}
            noValidate
            onSubmit={handleSubmit}
        >
            <div className="search-field">
                <span className="field-icon">
                    <i className="ri-map-pin-2-line" />
                </span>
                <div className="field-content">
                    <label htmlFor="location">Pick-up location</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="City, airport or address"
                        autoComplete="off"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        ref={locationRef}
                        required
                    />
                </div>
            </div>
            <span className="search-sep" aria-hidden="true" />
            <div className="search-field">
                <span className="field-icon">
                    <i className="ri-calendar-event-line" />
                </span>
                <div className="field-content">
                    <label htmlFor="pickupDate">Pick-up date</label>
                    <input
                        id="pickupDate"
                        name="pickup"
                        type="date"
                        value={pickupDate}
                        min={initialDates.today}
                        onChange={handlePickupChange}
                        required
                    />
                </div>
            </div>
            <span className="search-sep" aria-hidden="true" />
            <div className="search-field">
                <span className="field-icon">
                    <i className="ri-calendar-event-line" />
                </span>
                <div className="field-content">
                    <label htmlFor="returnDate">Return date</label>
                    <input
                        id="returnDate"
                        name="return"
                        type="date"
                        value={returnDate}
                        min={returnMin}
                        onChange={(event) => setReturnDate(event.target.value)}
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-primary search-submit"
                disabled={searching}
                aria-busy={searching}
                style={searching ? { opacity: 0.75 } : undefined}
            >
                {searching ? (
                    <>
                        <i className="ri-loader-4-line" /> Searching
                    </>
                ) : (
                    <>
                        <i className="ri-search-line" /> Find a car
                    </>
                )}
            </button>
        </form>
    )
}
