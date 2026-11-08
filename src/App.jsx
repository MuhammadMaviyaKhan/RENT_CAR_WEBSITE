import { useEffect } from 'react'
import BackToTop from './components/BackToTop.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import { useToast } from './context/ToastContext.jsx'
import useReveal from './hooks/useReveal.js'
import useSpotlight from './hooks/useSpotlight.js'
import AboutPage from './pages/AboutPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import CarDetailsPage from './pages/CarDetailsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FleetPage from './pages/FleetPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LegalPage from './pages/LegalPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { RouterProvider, useRouter } from './router.jsx'

const legalRoutes = ['privacy', 'terms', 'cookies']

function renderPage(path) {
    if (path === '/') return <HomePage />
    if (path === '/fleet') return <FleetPage />
    if (path === '/booking') return <BookingPage />
    if (path === '/about') return <AboutPage />
    if (path === '/contact') return <ContactPage />

    const fleetMatch = path.match(/^\/fleet\/([^/]+)$/)
    if (fleetMatch) {
        return <CarDetailsPage carId={decodeURIComponent(fleetMatch[1])} />
    }

    const bookingMatch = path.match(/^\/booking\/([^/]+)$/)
    if (bookingMatch) {
        return <BookingPage carId={decodeURIComponent(bookingMatch[1])} />
    }

    const legalMatch = path.match(/^\/(privacy|terms|cookies)$/)
    if (legalMatch && legalRoutes.includes(legalMatch[1])) {
        return <LegalPage type={legalMatch[1]} />
    }

    return <NotFoundPage />
}

function AppShell() {
    const { path } = useRouter()
    const showToast = useToast()

    useReveal(path)
    useSpotlight()

    useEffect(() => {
        const handleClick = (event) => {
            if (!(event.target instanceof Element)) return

            const toastTarget = event.target.closest('[data-toast]')
            if (toastTarget) {
                event.preventDefault()
                showToast(toastTarget.getAttribute('data-toast'))
                return
            }

            const placeholderLink = event.target.closest('a[href="#"]')
            if (placeholderLink) {
                event.preventDefault()
                showToast('This page is on the way — the cars are ready in the meantime.')
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [showToast])

    return (
        <>
            <a className="skip-link" href="#main">
                Skip to content
            </a>
            <div className="noise" aria-hidden="true" />
            <ScrollProgress />
            <Header />
            <main id="main" className="page-transition" key={path}>
                {renderPage(path)}
            </main>
            <Footer />
            <BackToTop />
        </>
    )
}

export default function App() {
    return (
        <RouterProvider>
            <AppShell />
        </RouterProvider>
    )
}
