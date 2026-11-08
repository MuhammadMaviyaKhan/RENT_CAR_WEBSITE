import { useMemo, useState } from 'react'
import CarCard from '../components/CarCard.jsx'
import PageHero from '../components/PageHero.jsx'
import { cars, fleetFilters } from '../data/siteData.js'
import usePageTitle from '../hooks/usePageTitle.js'
import { Link } from '../router.jsx'

const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: low to high' },
    { value: 'price-high', label: 'Price: high to low' },
    { value: 'rating', label: 'Top rated' },
]

export default function FleetPage() {
    usePageTitle('The Fleet — RENTCARS')

    const [category, setCategory] = useState('all')
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState('featured')

    const filteredCars = useMemo(() => {
        const needle = query.trim().toLowerCase()

        const matches = cars.filter((car) => {
            const matchesCategory = category === 'all' || car.category === category
            if (!matchesCategory) return false
            if (!needle) return true

            const haystack = `${car.name} ${car.model} ${car.fullName} ${car.type} ${
                car.category
            }`.toLowerCase()

            return haystack.includes(needle)
        })

        switch (sort) {
            case 'price-low':
                return [...matches].sort((a, b) => a.priceValue - b.priceValue)
            case 'price-high':
                return [...matches].sort((a, b) => b.priceValue - a.priceValue)
            case 'rating':
                return [...matches].sort((a, b) => Number(b.rating) - Number(a.rating))
            default:
                return matches
        }
    }, [category, query, sort])

    const resetFilters = () => {
        setCategory('all')
        setQuery('')
        setSort('featured')
    }

    return (
        <>
            <PageHero
                eyebrow="The fleet"
                title={
                    <>
                        Every car. <em>One standard.</em>
                    </>
                }
                lead="Hand-picked, fully detailed and delivered wherever you are. Filter the garage, find your match and book it in minutes."
            >
                <div className="page-chips reveal" style={{ '--delay': '.2s' }}>
                    <span className="page-chip">
                        <i className="ri-car-line" /> 120+ premium cars
                    </span>
                    <span className="page-chip">
                        <i className="ri-shield-check-line" /> Free cancellation
                    </span>
                    <span className="page-chip">
                        <i className="ri-truck-line" /> 24-hour delivery
                    </span>
                    <span className="page-chip">
                        <i className="ri-star-fill" /> 4.9 average rating
                    </span>
                </div>
            </PageHero>

            <section className="section fleet-page">
                <div className="container">
                    <div className="fleet-toolbar reveal">
                        <div className="fleet-search">
                            <i className="ri-search-line" aria-hidden="true" />
                            <label className="sr-only" htmlFor="fleetSearch">
                                Search the fleet
                            </label>
                            <input
                                id="fleetSearch"
                                type="search"
                                placeholder="Search by brand, model or type…"
                                autoComplete="off"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            {query ? (
                                <button
                                    type="button"
                                    aria-label="Clear search"
                                    onClick={() => setQuery('')}
                                >
                                    <i className="ri-close-line" />
                                </button>
                            ) : null}
                        </div>

                        <div className="fleet-sort">
                            <label htmlFor="fleetSort">Sort by</label>
                            <select
                                id="fleetSort"
                                value={sort}
                                onChange={(event) => setSort(event.target.value)}
                            >
                                {sortOptions.map((option) => (
                                    <option value={option.value} key={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="fleet-meta reveal">
                        <div
                            className="filters"
                            role="group"
                            aria-label="Filter cars by type"
                        >
                            {fleetFilters.map((option) => (
                                <button
                                    className={`filter${
                                        category === option.value ? ' is-active' : ''
                                    }`}
                                    type="button"
                                    key={option.value}
                                    aria-pressed={category === option.value}
                                    onClick={() => setCategory(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <p className="fleet-count" aria-live="polite">
                            Showing <strong>{filteredCars.length}</strong> of {cars.length}{' '}
                            cars
                        </p>
                    </div>

                    {filteredCars.length ? (
                        <div className="car-grid fleet-page-grid">
                            {filteredCars.map((car, index) => (
                                <CarCard
                                    car={car}
                                    index={index}
                                    key={car.id}
                                    reveal={false}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="fleet-empty reveal">
                            <i className="ri-steering-2-line" aria-hidden="true" />
                            <h2>No cars match that search.</h2>
                            <p>
                                Try a different model, or clear the filters and start again.
                            </p>
                            <button
                                className="btn btn-outline"
                                type="button"
                                onClick={resetFilters}
                            >
                                Reset filters <i className="ri-refresh-line" />
                            </button>
                        </div>
                    )}

                    <div className="page-cta glass reveal">
                        <div>
                            <div className="eyebrow">
                                <span className="dot" /> Tailored rentals
                            </div>
                            <h2>
                                Need something <em>specific?</em>
                            </h2>
                            <p>
                                Wedding, film shoot, long-term lease or a very important
                                weekend — our team will find the right car for it.
                            </p>
                        </div>
                        <div className="page-cta-actions">
                            <Link to="/contact" className="btn btn-primary btn-lg">
                                Talk to a specialist <i className="ri-arrow-right-line" />
                            </Link>
                            <Link to="/booking" className="btn btn-glass btn-lg">
                                Start a booking
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
