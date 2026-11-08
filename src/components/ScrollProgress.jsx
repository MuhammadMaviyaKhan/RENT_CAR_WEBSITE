import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
    const progressRef = useRef(null)

    useEffect(() => {
        let ticking = false

        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            const progress = max > 0 ? (window.scrollY / max) * 100 : 0
            if (progressRef.current) {
                progressRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`
            }
            ticking = false
        }

        const requestUpdate = () => {
            if (ticking) return
            ticking = true
            window.requestAnimationFrame(update)
        }

        window.addEventListener('scroll', requestUpdate, { passive: true })
        window.addEventListener('resize', requestUpdate)
        update()

        return () => {
            window.removeEventListener('scroll', requestUpdate)
            window.removeEventListener('resize', requestUpdate)
        }
    }, [])

    return <div className="scroll-progress" id="scrollProgress" aria-hidden="true" ref={progressRef} />
}
