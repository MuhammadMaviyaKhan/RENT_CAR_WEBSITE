import { useEffect } from 'react'

export default function useReveal(dependency) {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal')
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (!('IntersectionObserver' in window) || reduceMotion) {
            elements.forEach((element) => element.classList.add('is-visible'))
            return undefined
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return
                    entry.target.classList.add('is-visible')
                    observer.unobserve(entry.target)
                })
            },
            { threshold: 0.12, rootMargin: '0px 0px -55px 0px' },
        )

        elements.forEach((element) => observer.observe(element))
        return () => observer.disconnect()
    }, [dependency])
}
