import { useEffect, useRef, useState } from 'react'
import { steps } from '../data/siteData.js'

function Counter({ target, decimals = 0, suffix = '' }) {
    const ref = useRef(null)
    const [display, setDisplay] = useState('0')

    useEffect(() => {
        const element = ref.current
        if (!element) return undefined

        let frame = null
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const finalValue = `${target.toFixed(decimals)}${suffix}`

        if (!('IntersectionObserver' in window) || reduceMotion) {
            setDisplay(finalValue)
            return undefined
        }

        const animate = () => {
            const start = performance.now()
            const duration = 1500

            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                const current = target * eased
                setDisplay(`${current.toFixed(decimals)}${progress === 1 ? suffix : ''}`)

                if (progress < 1) frame = window.requestAnimationFrame(tick)
            }

            frame = window.requestAnimationFrame(tick)
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return
                    observer.disconnect()
                    animate()
                })
            },
            { threshold: 0.7 },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
            if (frame) window.cancelAnimationFrame(frame)
        }
    }, [target, decimals, suffix])

    return <span ref={ref}>{display}</span>
}

export default function HowItWorks() {
    return (
        <section className="section how" id="how">
            <div className="container">
                <div className="section-head center">
                    <div className="eyebrow reveal">
                        <span className="dot" /> How it works
                    </div>
                    <h2 className="reveal" style={{ '--delay': '.06s' }}>
                        Three steps. <em>Zero friction.</em>
                    </h2>
                    <p className="section-lead reveal" style={{ '--delay': '.12s' }}>
                        From first tap to first turn — booking a car should feel as good as
                        driving one.
                    </p>
                </div>

                <div className="steps">
                    {steps.map((step, index) => (
                        <article
                            className="step-card glass spotlight reveal"
                            key={step.number}
                            style={index ? { '--delay': `${index * 0.08}s` } : undefined}
                        >
                            <span className="step-number" aria-hidden="true">
                                {step.number}
                            </span>
                            <span className="step-icon">
                                <i className={step.icon} />
                            </span>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                            <span className="step-note">
                                <i className="ri-check-line" /> {step.note}
                            </span>
                        </article>
                    ))}
                </div>

                <div className="stats-band glass reveal">
                    <div className="stat">
                        <strong>
                            <Counter target={120} />+
                        </strong>
                        <span>Premium cars</span>
                    </div>
                    <div className="stat">
                        <strong>
                            <Counter target={15} suffix="k" />+
                        </strong>
                        <span>Journeys delivered</span>
                    </div>
                    <div className="stat">
                        <strong>
                            <Counter target={4.9} decimals={1} />/5
                        </strong>
                        <span>Average rating</span>
                    </div>
                    <div className="stat">
                        <strong>24/7</strong>
                        <span>Human support</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
