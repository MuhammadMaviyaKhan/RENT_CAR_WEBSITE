import CarCard from '../components/CarCard.jsx'
import { cars } from '../data/siteData.js'
import usePageTitle from '../hooks/usePageTitle.js'
import { Link } from '../router.jsx'
import { asset } from '../utils/assets.js'
import NotFoundPage from './NotFoundPage.jsx'

const specItems = (car) => [
    { icon: 'ri-settings-3-line', label: 'Engine', value: car.engine },
    { icon: 'ri-flashlight-line', label: 'Power', value: car.power },
    { icon: 'ri-speed-up-line', label: '0–100 km/h', value: car.acceleration },
    { icon: 'ri-roadster-line', label: 'Top speed', value: car.topSpeed },
    { icon: 'ri-git-commit-line', label: 'Gearbox', value: car.transmission },
    { icon: 'ri-gas-station-line', label: 'Fuel', value: car.fuel },
]

export default function CarDetailsPage({ carId }) {
    const car = cars.find((item) => item.id === carId)
    const index = car ? cars.findIndex((item) => item.id === carId) : 0

    usePageTitle(car ? `${car.fullName} — RENTCARS` : null)

    if (!car) {
        return (
            <NotFoundPage
                title={
                    <>
                        That car left <em>the garage.</em>
                    </>
                }
                message="The model you are looking for is not in the fleet right now. Browse the full garage and find your next drive."
            />
        )
    }

    const relatedCars = cars.filter((item) => item.id !== car.id).slice(0, 3)

    return (
        <section className="section detail-section">
            <div className="container">
                <nav className="breadcrumbs reveal" aria-label="Breadcrumb">
                    <Link to="/">Home</Link>
                    <i className="ri-arrow-right-s-line" aria-hidden="true" />
                    <Link to="/fleet">Fleet</Link>
                    <i className="ri-arrow-right-s-line" aria-hidden="true" />
                    <span className="current">{car.fullName}</span>
                </nav>

                <div className="detail-grid">
                    <div className="detail-visual glass reveal">
                        <span className="car-badge detail-badge">{car.badge}</span>
                        <span className="detail-word" aria-hidden="true">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="detail-floor" aria-hidden="true" />
                        <img src={asset(car.image)} alt={car.alt} />
                        <div className="detail-visual-foot">
                            <span>
                                <i className="ri-speed-up-line" /> 0–100 in{' '}
                                {car.acceleration}
                            </span>
                            <span>
                                <i className="ri-steering-2-line" /> {car.type}
                            </span>
                        </div>
                    </div>

                    <div className="detail-info">
                        <div className="eyebrow reveal">
                            <span className="dot" /> Available for delivery
                        </div>
                        <h1 className="reveal" style={{ '--delay': '.06s' }}>
                            {car.name} <em>{car.model}</em>
                        </h1>

                        <div className="detail-meta reveal" style={{ '--delay': '.1s' }}>
                            <span className="car-rating">
                                <i className="ri-star-fill" /> {car.rating}{' '}
                                <small>{car.reviews}</small>
                            </span>
                            <span className="detail-dot" aria-hidden="true" />
                            <span>
                                {car.type} · {car.year}
                            </span>
                            <span className="detail-dot" aria-hidden="true" />
                            <span>
                                <i className="ri-user-3-line" /> {car.seats} seats
                            </span>
                        </div>

                        <p className="detail-lead reveal" style={{ '--delay': '.14s' }}>
                            {car.description}
                        </p>

                        <div className="detail-spec-grid reveal" style={{ '--delay': '.18s' }}>
                            {specItems(car).map((item) => (
                                <div className="detail-spec" key={item.label}>
                                    <i className={item.icon} aria-hidden="true" />
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>

                        <div className="detail-features reveal" style={{ '--delay': '.22s' }}>
                            {car.features.map((feature) => (
                                <span className="detail-feature" key={feature}>
                                    <i className="ri-check-line" /> {feature}
                                </span>
                            ))}
                        </div>

                        <div className="detail-book reveal" style={{ '--delay': '.26s' }}>
                            <div className="detail-price">
                                <small>From</small>
                                <strong>{car.price}</strong>
                                <span>/ day</span>
                            </div>
                            <div className="detail-actions">
                                <Link
                                    to={`/booking/${car.id}`}
                                    className="btn btn-primary btn-lg"
                                >
                                    Reserve this car <i className="ri-arrow-right-line" />
                                </Link>
                                <Link to="/fleet" className="btn btn-outline">
                                    Back to fleet
                                </Link>
                            </div>
                        </div>

                        <ul className="detail-perks reveal">
                            <li>
                                <i className="ri-shield-check-line" /> Free cancellation up to
                                24h
                            </li>
                            <li>
                                <i className="ri-truck-line" /> Delivered to your door
                            </li>
                            <li>
                                <i className="ri-customer-service-2-line" /> 24/7 human support
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="detail-related">
                    <div className="detail-related-head reveal">
                        <div>
                            <div className="eyebrow">
                                <span className="dot" /> Keep exploring
                            </div>
                            <h2>
                                More from the <em>garage.</em>
                            </h2>
                        </div>
                        <Link to="/fleet" className="text-link">
                            View all cars <i className="ri-arrow-right-up-line" />
                        </Link>
                    </div>

                    <div className="car-grid detail-related-grid">
                        {relatedCars.map((item, itemIndex) => (
                            <CarCard
                                car={item}
                                index={itemIndex}
                                key={item.id}
                                reveal={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
