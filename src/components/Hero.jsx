import { useEffect, useRef } from 'react'
import { Link } from '../router.jsx'
import { asset } from '../utils/assets.js'
import SearchPanel from './SearchPanel.jsx'

export default function Hero() {
    const visualRef = useRef(null)
    const carRef = useRef(null)

    useEffect(() => {
        const visual = visualRef.current
        const car = carRef.current
        if (!visual || !car) return undefined
        if (!window.matchMedia('(pointer: fine)').matches) return undefined
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

        let frame = null

        const handlePointerMove = (event) => {
            if (frame) window.cancelAnimationFrame(frame)

            frame = window.requestAnimationFrame(() => {
                const rect = visual.getBoundingClientRect()
                const x = (event.clientX - rect.left) / rect.width - 0.5
                const y = (event.clientY - rect.top) / rect.height - 0.5

                car.style.transform = `translate3d(${x * 16}px, ${y * 10}px, 0) rotateX(${
                    y * -5
                }deg) rotateY(${x * 7}deg)`
            })
        }

        const handlePointerLeave = () => {
            if (frame) window.cancelAnimationFrame(frame)
            car.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)'
        }

        visual.addEventListener('pointermove', handlePointerMove)
        visual.addEventListener('pointerleave', handlePointerLeave)

        return () => {
            visual.removeEventListener('pointermove', handlePointerMove)
            visual.removeEventListener('pointerleave', handlePointerLeave)
            if (frame) window.cancelAnimationFrame(frame)
        }
    }, [])

    return (
        <section className="hero" id="home">
            <div className="hero-bg" aria-hidden="true">
                <div className="hero-glow" />
                <div className="hero-grid-lines" />
            </div>

            <div className="container hero-inner">
                <div className="hero-copy">
                    <div className="eyebrow reveal">
                        <span className="dot" /> Premium car rental · Available 24/7
                    </div>

                    <h1 className="reveal" style={{ '--delay': '.08s' }}>
                        Rent the
                        <br />
                        <em>extraordinary.</em>
                    </h1>

                    <p className="hero-lead reveal" style={{ '--delay': '.16s' }}>
                        Find, book and rent your perfect car in minutes. A curated fleet,
                        doorstep delivery and support that never sleeps — wherever the road
                        takes you.
                    </p>

                    <div className="hero-cta reveal" style={{ '--delay': '.24s' }}>
                        <Link to="/fleet" className="btn btn-primary btn-lg">
                            Explore the fleet <i className="ri-arrow-right-line" />
                        </Link>
                        <Link to="/" section="how" className="btn btn-glass btn-lg">
                            <span className="btn-play">
                                <i className="ri-play-fill" />
                            </span>{' '}
                            How it works
                        </Link>
                    </div>

                    <div className="hero-proof reveal" style={{ '--delay': '.32s' }}>
                        <div className="avatar-stack">
                            <img src={asset('optimized/avatar-charlie.jpg')} alt="Charlie Johnson" />
                            <img src={asset('optimized/avatar-sophia.jpg')} alt="Sophia Turner" />
                            <span className="avatar-count">2.4k+</span>
                        </div>
                        <div className="proof-copy">
                            <div className="star-row">
                                <span className="stars" aria-hidden="true">
                                    ★★★★★
                                </span>
                                <strong>4.9</strong>
                                <span>/ 5</span>
                            </div>
                            <p>From 3,800+ verified drivers</p>
                        </div>
                    </div>
                </div>

                <div className="hero-visual reveal" style={{ '--delay': '.18s' }} ref={visualRef}>
                    <div className="hero-orbit orbit-one" aria-hidden="true" />
                    <div className="hero-orbit orbit-two" aria-hidden="true" />
                    <span className="orbit-label label-top" aria-hidden="true">
                        Curated fleet
                    </span>
                    <span className="orbit-label label-bottom" aria-hidden="true">
                        Est. 2018
                    </span>
                    <div className="hero-car-glow" aria-hidden="true" />

                    <div className="hero-car-wrap" id="heroCarWrap" ref={carRef}>
                        <img
                            className="hero-car"
                            src={asset('optimized/main-img-opt.png')}
                            alt="Porsche 718 Cayman GT4 in blue"
                            fetchPriority="high"
                        />
                        <img
                            className="hero-car-reflection"
                            src={asset('optimized/main-img-opt.png')}
                            alt=""
                            aria-hidden="true"
                        />
                    </div>

                    <div className="hero-chip glass reveal" style={{ '--delay': '.55s' }}>
                        <span className="chip-icon">
                            <i className="ri-shield-check-fill" />
                        </span>
                        <span>
                            <strong>Free cancellation</strong>
                            <small>Up to 24h before pick-up</small>
                        </span>
                    </div>

                    <aside
                        className="hero-deal glass reveal"
                        style={{ '--delay': '.65s' }}
                        aria-label="Featured car"
                    >
                        <div className="deal-head">
                            <span className="live-dot" /> Available now
                        </div>
                        <div className="deal-row">
                            <div>
                                <h3>Porsche 718</h3>
                                <p>Cayman GT4 · Sports</p>
                            </div>
                            <div className="deal-price">
                                $1,800<small>/ day</small>
                            </div>
                        </div>
                        <Link to="/fleet/porsche-718" className="deal-link">
                            Reserve today <i className="ri-arrow-right-up-line" />
                        </Link>
                    </aside>
                </div>
            </div>

            <div className="container">
                <SearchPanel />
            </div>
        </section>
    )
}
