import { useEffect, useState } from 'react'

export default function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let ticking = false

        const update = () => {
            setVisible(window.scrollY > 720)
            ticking = false
        }

        const onScroll = () => {
            if (ticking) return
            ticking = true
            window.requestAnimationFrame(update)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        update()

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }

    return (
        <button
            className={`to-top${visible ? ' show' : ''}`}
            id="toTop"
            type="button"
            aria-label="Back to top"
            onClick={scrollToTop}
        >
            <i className="ri-arrow-up-line" />
        </button>
    )
}
