import usePageTitle from '../hooks/usePageTitle.js'
import Hero from '../components/Hero.jsx'
import BrandStrip from '../components/BrandStrip.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import WhyUs from '../components/WhyUs.jsx'
import Fleet from '../components/Fleet.jsx'
import Reviews from '../components/Reviews.jsx'
import AppSection from '../components/AppSection.jsx'

export default function HomePage() {
    usePageTitle('RENTCARS — Rent the Extraordinary')

    return (
        <>
            <Hero />
            <BrandStrip />
            <HowItWorks />
            <WhyUs />
            <Fleet />
            <Reviews />
            <AppSection />
        </>
    )
}
