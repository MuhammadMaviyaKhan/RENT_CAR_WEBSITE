import { useEffect } from 'react'

export default function useSpotlight() {
    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return undefined

        const handlePointerMove = (event) => {
            if (!(event.target instanceof Element)) return
            const card = event.target.closest('.spotlight')
            if (!card) return

            const rect = card.getBoundingClientRect()
            card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
            card.style.setProperty('--my', `${event.clientY - rect.top}px`)
        }

        document.addEventListener('pointermove', handlePointerMove, { passive: true })
        return () => document.removeEventListener('pointermove', handlePointerMove)
    }, [])
}
