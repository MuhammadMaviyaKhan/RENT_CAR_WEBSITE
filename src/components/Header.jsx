import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../data/siteData.js'
import { Link, useRouter } from '../router.jsx'
import Brand from './Brand.jsx'

export default function Header() {
    const { path } = useRouter()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const navRef = useRef(null)
    const toggleRef = useRef(null)
    const isHome = path === '/'

    useEffect(() => {
        let ticking = false

        const update = () => {
            setScrolled(window.scrollY > 24)
            if (window.scrollY < 220) setActiveSection('')
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

    useEffect(() => {
        setMenuOpen(false)
    }, [path])

    useEffect(() => {
        if (!isHome) {
            setActiveSection('')
            return undefined
        }

        if (!('IntersectionObserver' in window)) return undefined

        const sections = ['fleet', 'how', 'why', 'reviews', 'app']
            .map((id) => document.getElementById(id))
            .filter(Boolean)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return

                    if (entry.target.id === 'app') {
                        setActiveSection('')
                        return
                    }

                    setActiveSection(`#${entry.target.id}`)
                })
            },
            { rootMargin: '-38% 0px -55% 0px', threshold: 0 },
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [isHome])

    useEffect(() => {
        if (!menuOpen) return undefined

        const closeOnOutsideClick = (event) => {
            if (
                !navRef.current?.contains(event.target) &&
                !toggleRef.current?.contains(event.target)
            ) {
                setMenuOpen(false)
            }
        }

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setMenuOpen(false)
        }

        const closeOnResize = () => {
            if (window.innerWidth > 980) setMenuOpen(false)
        }

        document.addEventListener('click', closeOnOutsideClick)
        document.addEventListener('keydown', closeOnEscape)
        window.addEventListener('resize', closeOnResize)

        return () => {
            document.removeEventListener('click', closeOnOutsideClick)
            document.removeEventListener('keydown', closeOnEscape)
            window.removeEventListener('resize', closeOnResize)
        }
    }, [menuOpen])

    const closeMenu = () => setMenuOpen(false)

    const isActive = (link) => {
        if (link.section) return isHome && activeSection === `#${link.section}`
        if (link.to === '/fleet') return path === '/fleet' || path.startsWith('/fleet/')
        if (link.to === '/booking') {
            return path === '/booking' || path.startsWith('/booking/')
        }
        return path === link.to
    }

    return (
        <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="siteHeader">
            <div className="container header-inner">
                <Brand />

                <nav
                    className={`main-nav${menuOpen ? ' is-open' : ''}`}
                    id="mainNav"
                    aria-label="Primary navigation"
                    ref={navRef}
                >
                    {navLinks.map((link) => {
                        const active = isActive(link)

                        return (
                            <Link
                                key={link.label}
                                to={link.to}
                                section={link.section}
                                className={active ? 'active' : undefined}
                                aria-current={active ? 'page' : undefined}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                    <div className="mobile-actions">
                        <a
                            href="#"
                            className="btn btn-glass"
                            data-toast="Sign in is coming soon. Your keys are almost ready."
                            onClick={closeMenu}
                        >
                            Sign in
                        </a>
                        <Link to="/booking" className="btn btn-primary" onClick={closeMenu}>
                            Book a car <i className="ri-arrow-right-up-line" />
                        </Link>
                    </div>
                </nav>

                <div className="header-actions">
                    <a
                        href="#"
                        className="sign-in"
                        data-toast="Sign in is coming soon. Your keys are almost ready."
                    >
                        Sign in
                    </a>
                    <Link to="/booking" className="btn btn-primary btn-nav">
                        Book a car <i className="ri-arrow-right-up-line" />
                    </Link>
                    <button
                        className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
                        id="menuToggle"
                        type="button"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mainNav"
                        ref={toggleRef}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <i className={menuOpen ? 'ri-close-line' : 'ri-menu-4-line'} />
                    </button>
                </div>
            </div>
        </header>
    )
}
