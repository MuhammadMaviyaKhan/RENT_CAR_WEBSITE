import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const RouterContext = createContext(null)

export const normalizePath = (to) => {
    let path = String(to || '/')
        .split('?')[0]
        .split('#')[0]

    if (!path.startsWith('/')) path = `/${path}`
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)

    return path || '/'
}

const readPath = () => {
    if (typeof window === 'undefined') return '/'

    const hash = window.location.hash
    if (!hash.startsWith('#/')) return '/'

    return normalizePath(hash.slice(1))
}

export function RouterProvider({ children }) {
    const [path, setPath] = useState(readPath)
    const [scrollTarget, setScrollTarget] = useState(null)

    useEffect(() => {
        const onHashChange = () => {
            const hash = window.location.hash

            // Ignore plain in-page anchors such as #fleet or #main.
            if (hash && !hash.startsWith('#/')) return

            setScrollTarget(null)
            window.scrollTo(0, 0)
            setPath(readPath())
        }

        window.addEventListener('hashchange', onHashChange)
        return () => window.removeEventListener('hashchange', onHashChange)
    }, [])

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (scrollTarget) {
            const timer = window.setTimeout(() => {
                const target = document.getElementById(scrollTarget)

                if (target) {
                    target.scrollIntoView({
                        behavior: reduceMotion ? 'auto' : 'smooth',
                        block: 'start',
                    })
                } else {
                    window.scrollTo(0, 0)
                }
            }, 70)

            return () => window.clearTimeout(timer)
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        return undefined
    }, [path, scrollTarget])

    const navigate = useCallback(
        (to, options = {}) => {
            const next = normalizePath(to)
            const section = options.section ?? null
            const reduceMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches

            if (path === next) {
                if (section) {
                    document.getElementById(section)?.scrollIntoView({
                        behavior: reduceMotion ? 'auto' : 'smooth',
                        block: 'start',
                    })
                } else {
                    window.scrollTo({
                        top: 0,
                        behavior: reduceMotion ? 'auto' : 'smooth',
                    })
                }
                return
            }

            setScrollTarget(section)
            window.location.hash = `#${next}`
        },
        [path],
    )

    return (
        <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
    )
}

export function useRouter() {
    const context = useContext(RouterContext)
    if (!context) throw new Error('useRouter must be used inside RouterProvider')
    return context
}

export function Link({ to = '/', section, onClick, children, ...rest }) {
    const { navigate } = useRouter()

    const handleClick = (event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return
        }
        if (rest.target && rest.target !== '_self') return

        event.preventDefault()
        navigate(to, { section })
    }

    return (
        <a href={`#${normalizePath(to)}`} onClick={handleClick} {...rest}>
            {children}
        </a>
    )
}
