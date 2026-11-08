import { useEffect, useRef, useState } from 'react'
import { cars, fleetFilters } from '../data/siteData.js'
import { Link } from '../router.jsx'
import CarCard from './CarCard.jsx'

const homeCars = cars.slice(0, 4)

export default function Fleet() {
    const [filter, setFilter] = useState('all')
    const gridRef = useRef(null)
    const previousFilter = useRef(filter)

    useEffect(() => {
        if (previousFilter.current === filter) return
        previousFilter.current = filter

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        if (!gridRef.current) return

        gridRef.current
            .querySelectorAll('.car-card:not(.is-hidden)')
            .forEach((card, index) => {
                card.classList.add('is-visible')
                if (typeof card.animate !== 'function') return

                card.animate(
                    [
                        { opacity: 0, transform: 'translateY(14px)' },
                        { opacity: 1, transform: 'translateY(0)' },
                    ],
                    {
                        duration: 420,
                        delay: index * 40,
                        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        fill: 'backwards',
                    },
                )
            })
    }, [filter])

    return (
        <section className="section fleet" id="fleet">
            <div className="container">
                <div className="fleet-head">
                    <div className="section-head">
                        <div className="eyebrow reveal">
                            <span className="dot" /> Popular rental deals
                        </div>
                        <h2 className="reveal" style={{ '--delay': '.06s' }}>
                            The fleet, curated
                            <br />
                            for the <em>drive.</em>
                        </h2>
                    </div>
                    <Link
                        to="/fleet"
                        className="text-link reveal"
                        style={{ '--delay': '.1s' }}
                    >
                        View all 120 cars <i className="ri-arrow-right-up-line" />
                    </Link>
                </div>

                <div className="filters reveal" role="group" aria-label="Filter cars by type">
                    {fleetFilters.map((option) => (
                        <button
                            className={`filter${filter === option.value ? ' is-active' : ''}`}
                            type="button"
                            key={option.value}
                            data-filter={option.value}
                            aria-pressed={filter === option.value}
                            onClick={() => setFilter(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <div className="car-grid" ref={gridRef}>
                    {homeCars.map((car, index) => (
                        <CarCard
                            key={car.id}
                            car={car}
                            index={index}
                            hidden={filter !== 'all' && car.category !== filter}
                        />
                    ))}
                </div>

                <div className="center reveal">
                    <Link to="/fleet" className="btn btn-outline show-all">
                        Explore the full fleet <i className="ri-arrow-right-line" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
