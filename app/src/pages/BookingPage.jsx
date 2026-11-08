import { useEffect, useMemo, useRef, useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { bookingExtras, cars } from '../data/siteData.js'
import usePageTitle from '../hooks/usePageTitle.js'
import { Link } from '../router.jsx'
import { asset } from '../utils/assets.js'

const MS_PER_DAY = 86400000

const startOfToday = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
}

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

const formatDate = (value) => {
    const date = parseDate(value)
    if (!date) return '—'
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    })
}

const money = (value) => `$${value.toLocaleString('en-US')}`

export default function BookingPage({ carId }) {
    const showToast = useToast()
    const timer = useRef(null)
    const [selectedId, setSelectedId] = useState(
        () => cars.find((car) => car.id === carId)?.id ?? cars[0].id,
    )
    const [today] = useState(() => toISODate(startOfToday()))
    const [pickupDate, setPickupDate] = useState(() =>
        toISODate(addDays(startOfToday(), 1)),
    )
    const [returnDate, setReturnDate] = useState(() =>
        toISODate(addDays(startOfToday(), 4)),
    )
    const [extras, setExtras] = useState(() => new Set(['insurance']))
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        location: 'Dubai Marina',
        terms: false,
    })
    const [submitting, setSubmitting] = useState(false)
    const [confirmation, setConfirmation] = useState(null)

    usePageTitle(confirmation ? 'Booking confirmed — RENTCARS' : 'Book a car — RENTCARS')

    useEffect(() => () => window.clearTimeout(timer.current), [])

    const selectedCar = cars.find((car) => car.id === selectedId) ?? cars[0]

    const days = useMemo(() => {
        const start = parseDate(pickupDate)
        const end = parseDate(returnDate)
        if (!start || !end || end <= start) return 1
        return Math.max(1, Math.round((end - start) / MS_PER_DAY))
    }, [pickupDate, returnDate])

    const selectedExtras = bookingExtras.filter((extra) => extras.has(extra.id))
    const rentalTotal = selectedCar.priceValue * days
    const extrasTotal = selectedExtras.reduce(
        (sum, extra) => sum + extra.price * days,
        0,
    )
    const serviceFee = 49
    const total = rentalTotal + extrasTotal + serviceFee

    const handlePickupChange = (event) => {
        const value = event.target.value
        setPickupDate(value)

        const pickup = parseDate(value)
        const currentReturn = parseDate(returnDate)
        if (pickup && (!currentReturn || currentReturn <= pickup)) {
            setReturnDate(toISODate(addDays(pickup, 3)))
        }
    }

    const toggleExtra = (id) => {
        setExtras((current) => {
            const next = new Set(current)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const handleFieldChange = (event) => {
        const { name, value, type, checked } = event.target
        setForm((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (submitting) return

        const pickup = parseDate(pickupDate)
        const dropoff = parseDate(returnDate)

        if (!form.name.trim() || form.name.trim().length < 2) {
            showToast("Add the driver's full name to continue.", 'error')
            document.getElementById('bookingName')?.focus()
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            showToast('Add a valid email address for your confirmation.', 'error')
            document.getElementById('bookingEmail')?.focus()
            return
        }

        if (form.phone.replace(/\D/g, '').length < 7) {
            showToast('Add a phone number we can reach you on.', 'error')
            document.getElementById('bookingPhone')?.focus()
            return
        }

        if (!form.location.trim()) {
            showToast('Tell us where to deliver the car.', 'error')
            document.getElementById('bookingLocation')?.focus()
            return
        }

        if (!pickup || !dropoff || dropoff <= pickup) {
            showToast('Your return date needs to be after the pick-up date.', 'error')
            return
        }

        if (!form.terms) {
            showToast('Please accept the rental terms before confirming.', 'error')
            return
        }

        setSubmitting(true)
        timer.current = window.setTimeout(() => {
            setSubmitting(false)
            setConfirmation({
                reference: `RC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
                car: selectedCar.fullName,
                days,
                pickupDate,
                returnDate,
                total,
                name: form.name.trim(),
                email: form.email.trim(),
            })
            showToast('Booking confirmed. Your car is being detailed now.')
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 850)
    }

    if (confirmation) {
        return (
            <section className="booking-success-section">
                <div className="container booking-success-wrap">
                    <div className="booking-success glass reveal">
                        <span className="success-icon">
                            <i className="ri-check-line" />
                        </span>
                        <div className="eyebrow">
                            <span className="dot" /> Booking confirmed
                        </div>
                        <h1>
                            You&apos;re all set,{' '}
                            <em>{confirmation.name.split(' ')[0]}.</em>
                        </h1>
                        <p>
                            Reference <strong>{confirmation.reference}</strong> — we have sent
                            the details to {confirmation.email}. Your {confirmation.car} will
                            arrive detailed, fuelled and ready.
                        </p>

                        <div className="success-details">
                            <div>
                                <span>Car</span>
                                <strong>{confirmation.car}</strong>
                            </div>
                            <div>
                                <span>Trip length</span>
                                <strong>
                                    {confirmation.days}{' '}
                                    {confirmation.days === 1 ? 'day' : 'days'}
                                </strong>
                            </div>
                            <div>
                                <span>Pick-up</span>
                                <strong>{formatDate(confirmation.pickupDate)}</strong>
                            </div>
                            <div>
                                <span>Return</span>
                                <strong>{formatDate(confirmation.returnDate)}</strong>
                            </div>
                            <div>
                                <span>Total paid</span>
                                <strong>{money(confirmation.total)}</strong>
                            </div>
                            <div>
                                <span>Delivery</span>
                                <strong>Doorstep · 24/7</strong>
                            </div>
                        </div>

                        <div className="success-actions">
                            <Link to="/fleet" className="btn btn-primary btn-lg">
                                Browse more cars <i className="ri-arrow-right-line" />
                            </Link>
                            <Link to="/contact" className="btn btn-glass btn-lg">
                                Need to change something?
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <>
            <PageHero
                eyebrow="Reserve your drive"
                title={
                    <>
                        Book the car. <em>Skip the queue.</em>
                    </>
                }
                lead="Choose your car, pick your dates and tell us where to bring it. The whole booking takes less than two minutes."
                compact
            />

            <section className="section booking-section">
                <div className="container booking-layout">
                    <form
                        className="booking-form glass reveal"
                        id="bookingForm"
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <fieldset className="booking-block">
                            <legend>
                                <span className="booking-step">01</span> Choose your car
                            </legend>

                            <div className="form-field">
                                <label htmlFor="bookingCar">The garage</label>
                                <select
                                    id="bookingCar"
                                    value={selectedId}
                                    onChange={(event) => setSelectedId(event.target.value)}
                                >
                                    {cars.map((car) => (
                                        <option value={car.id} key={car.id}>
                                            {car.fullName} — {car.price}/day
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="booking-car-preview">
                                <img src={asset(selectedCar.image)} alt={selectedCar.alt} />
                                <div className="booking-car-copy">
                                    <strong>{selectedCar.fullName}</strong>
                                    <span>
                                        {selectedCar.type} · {selectedCar.seats} seats ·{' '}
                                        {selectedCar.transmission}
                                    </span>
                                </div>
                                <Link
                                    to={`/fleet/${selectedCar.id}`}
                                    className="text-link"
                                >
                                    Details
                                </Link>
                            </div>
                        </fieldset>

                        <fieldset className="booking-block">
                            <legend>
                                <span className="booking-step">02</span> Trip details
                            </legend>

                            <div className="form-grid">
                                <div className="form-field form-field--wide">
                                    <label htmlFor="bookingLocation">
                                        Pick-up location
                                    </label>
                                    <input
                                        id="bookingLocation"
                                        name="location"
                                        type="text"
                                        autoComplete="street-address"
                                        placeholder="City, airport or address"
                                        value={form.location}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="bookingPickup">Pick-up date</label>
                                    <input
                                        id="bookingPickup"
                                        type="date"
                                        value={pickupDate}
                                        min={today}
                                        onChange={handlePickupChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="bookingReturn">Return date</label>
                                    <input
                                        id="bookingReturn"
                                        type="date"
                                        value={returnDate}
                                        min={pickupDate || today}
                                        onChange={(event) =>
                                            setReturnDate(event.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="booking-block">
                            <legend>
                                <span className="booking-step">03</span> Driver details
                            </legend>

                            <div className="form-grid">
                                <div className="form-field form-field--wide">
                                    <label htmlFor="bookingName">Full name</label>
                                    <input
                                        id="bookingName"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="As it appears on your licence"
                                        value={form.name}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="bookingEmail">Email</label>
                                    <input
                                        id="bookingEmail"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="bookingPhone">Phone</label>
                                    <input
                                        id="bookingPhone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="+1 555 000 0000"
                                        value={form.phone}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="booking-block">
                            <legend>
                                <span className="booking-step">04</span> Make it yours
                            </legend>

                            <div className="booking-extras">
                                {bookingExtras.map((extra) => {
                                    const checked = extras.has(extra.id)

                                    return (
                                        <label
                                            className={`extra-option${
                                                checked ? ' is-active' : ''
                                            }`}
                                            key={extra.id}
                                        >
                                            <input
                                                className="sr-only"
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => toggleExtra(extra.id)}
                                            />
                                            <span className="extra-icon">
                                                <i className={extra.icon} />
                                            </span>
                                            <span className="extra-copy">
                                                <strong>{extra.label}</strong>
                                                <small>{extra.text}</small>
                                                <em>+{money(extra.price)} / day</em>
                                            </span>
                                            <span className="extra-check" aria-hidden="true">
                                                <i
                                                    className={
                                                        checked
                                                            ? 'ri-checkbox-circle-fill'
                                                            : 'ri-checkbox-blank-circle-line'
                                                    }
                                                />
                                            </span>
                                        </label>
                                    )
                                })}
                            </div>

                            <label className="checkbox-line">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={form.terms}
                                    onChange={handleFieldChange}
                                />
                                <span>
                                    I agree to the rental terms, the driver requirements
                                    and the cancellation policy.
                                </span>
                            </label>
                        </fieldset>
                    </form>

                    <aside className="booking-summary glass reveal">
                        <div className="summary-heading">
                            <span className="eyebrow">
                                <span className="dot" /> Your reservation
                            </span>
                            <span className="summary-badge">Free cancellation</span>
                        </div>

                        <div className="summary-car">
                            <img src={asset(selectedCar.image)} alt={selectedCar.alt} />
                            <div>
                                <strong>{selectedCar.fullName}</strong>
                                <span>
                                    {selectedCar.type} · {selectedCar.year}
                                </span>
                            </div>
                        </div>

                        <div className="summary-trip">
                            <div className="summary-row">
                                <span>Pick-up</span>
                                <strong>{formatDate(pickupDate)}</strong>
                            </div>
                            <div className="summary-row">
                                <span>Return</span>
                                <strong>{formatDate(returnDate)}</strong>
                            </div>
                            <div className="summary-row">
                                <span>Duration</span>
                                <strong>
                                    {days} {days === 1 ? 'day' : 'days'}
                                </strong>
                            </div>
                            <div className="summary-row">
                                <span>Delivery</span>
                                <strong>Doorstep · included</strong>
                            </div>
                        </div>

                        <ul className="summary-lines">
                            <li>
                                <span>
                                    {money(selectedCar.priceValue)} × {days}{' '}
                                    {days === 1 ? 'day' : 'days'}
                                </span>
                                <span>{money(rentalTotal)}</span>
                            </li>
                            {selectedExtras.map((extra) => (
                                <li key={extra.id}>
                                    <span>{extra.label}</span>
                                    <span>{money(extra.price * days)}</span>
                                </li>
                            ))}
                            <li>
                                <span>Service fee</span>
                                <span>{money(serviceFee)}</span>
                            </li>
                        </ul>

                        <div className="summary-total">
                            <span>Total</span>
                            <strong>{money(total)}</strong>
                        </div>

                        <button
                            type="submit"
                            form="bookingForm"
                            className="btn btn-primary btn-lg summary-submit"
                            disabled={submitting}
                            aria-busy={submitting}
                        >
                            {submitting ? (
                                <>
                                    <i className="ri-loader-4-line" /> Confirming
                                </>
                            ) : (
                                <>
                                    Confirm booking{' '}
                                    <i className="ri-arrow-right-line" />
                                </>
                            )}
                        </button>

                        <p className="summary-note">
                            <i className="ri-shield-check-line" /> No payment is taken now —
                            this is a demo reservation.
                        </p>
                    </aside>
                </div>
            </section>
        </>
    )
}
