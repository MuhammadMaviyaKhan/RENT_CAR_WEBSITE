import { useState } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import { Link } from '../router.jsx'
import { asset } from '../utils/assets.js'

export default function CarCard({ car, index = 0, hidden = false, reveal = true }) {
    const showToast = useToast()
    const [isFavorite, setIsFavorite] = useState(false)

    const toggleFavorite = () => {
        const active = !isFavorite
        setIsFavorite(active)

        showToast(
            active
                ? `${car.fullName} saved to your favourites.`
                : `${car.fullName} removed from your favourites.`,
        )
    }

    return (
        <article
            className={`car-card glass spotlight${reveal ? ' reveal' : ''}${
                hidden ? ' is-hidden' : ''
            }`}
            data-category={car.category}
            style={index ? { '--delay': `${Math.min(index, 6) * 0.06}s` } : undefined}
        >
            <div className="car-media">
                <span className="car-badge">{car.badge}</span>
                <button
                    className={`fav-btn${isFavorite ? ' is-active' : ''}`}
                    type="button"
                    aria-label={`${isFavorite ? 'Remove' : 'Save'} ${car.fullName} ${
                        isFavorite ? 'from' : 'to'
                    } favourites`}
                    aria-pressed={isFavorite}
                    onClick={toggleFavorite}
                >
                    <i className={isFavorite ? 'ri-heart-fill' : 'ri-heart-line'} />
                </button>
                <span className="car-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <Link
                    to={`/fleet/${car.id}`}
                    className="car-media-link"
                    aria-label={`View details for ${car.fullName}`}
                >
                    <img src={asset(car.image)} alt={car.alt} loading="lazy" />
                </Link>
            </div>

            <div className="car-body">
                <div className="car-title-row">
                    <div>
                        <h3>
                            <Link to={`/fleet/${car.id}`}>
                                {car.name} <span>{car.model}</span>
                            </Link>
                        </h3>
                        <p className="car-type">
                            {car.type} · {car.year}
                        </p>
                    </div>
                    <span className="car-rating">
                        <i className="ri-star-fill" /> {car.rating}{' '}
                        <small>{car.reviews}</small>
                    </span>
                </div>

                <div className="car-specs">
                    <span>
                        <i className="ri-user-3-line" /> {car.seats} seats
                    </span>
                    <span>
                        <i className="ri-settings-3-line" /> Auto
                    </span>
                    <span>
                        <i className="ri-snowflake-line" /> A/C
                    </span>
                    <span>
                        <i className="ri-car-line" /> {car.doors} doors
                    </span>
                </div>

                <div className="car-foot">
                    <div className="car-price">
                        <strong>{car.price}</strong>
                        <span> / day</span>
                    </div>
                    <Link className="btn btn-card" to={`/booking/${car.id}`}>
                        Rent now <i className="ri-arrow-right-line" />
                    </Link>
                </div>
            </div>
        </article>
    )
}
