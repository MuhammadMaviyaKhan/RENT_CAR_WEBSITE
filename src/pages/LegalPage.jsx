import PageHero from '../components/PageHero.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

const legalPages = {
    privacy: {
        eyebrow: 'Legal · Privacy',
        titleText: 'Privacy policy — RENTCARS',
        title: (
            <>
                Privacy <em>policy.</em>
            </>
        ),
        updated: 'Last updated: November 8, 2026',
        intro: 'Your data should be handled the way we handle our cars: carefully, transparently and with respect. This policy explains what we collect and why.',
        sections: [
            {
                id: 'privacy-collect',
                heading: 'What we collect',
                body: [
                    'When you make a booking we collect the details needed to put you in the driver’s seat: your name, email address, phone number, delivery address, driving licence details and payment information.',
                    'We also collect technical information such as your device type, browser and the pages you visit. This helps us keep the site fast and spot problems early.',
                ],
            },
            {
                id: 'privacy-use',
                heading: 'How we use it',
                body: [
                    'We use your information to confirm bookings, deliver cars, process payments, provide support and keep you updated about your trip.',
                    'With your permission, we also send occasional news about new cars and member-only rates. You can unsubscribe from any email in one click.',
                ],
            },
            {
                id: 'privacy-share',
                heading: 'Who we share it with',
                body: [
                    'We never sell your personal data. We share only what is necessary with the partners who help us operate: payment processors, insurance providers, delivery drivers and our hosting provider.',
                    'All partners are bound by confidentiality agreements and may only use your data to provide their service to us.',
                ],
            },
            {
                id: 'privacy-rights',
                heading: 'Your rights',
                body: [
                    'You can ask for a copy of your data, request corrections or ask us to delete it. You can also object to marketing at any time.',
                    'To exercise any of these rights, email rentcars@gmail.com. We respond to every request within 30 days.',
                ],
            },
            {
                id: 'privacy-cookies',
                heading: 'Cookies',
                body: [
                    'We use a small number of cookies to keep you signed in, remember your preferences and understand how the site is used. See our cookie policy for the full list and how to manage them.',
                ],
            },
        ],
    },
    terms: {
        eyebrow: 'Legal · Terms',
        titleText: 'Rental terms — RENTCARS',
        title: (
            <>
                Rental <em>terms.</em>
            </>
        ),
        updated: 'Last updated: November 8, 2026',
        intro: 'These terms keep every rental clear and fair. By booking with RENTCARS you agree to the points below.',
        sections: [
            {
                id: 'terms-booking',
                heading: 'Bookings and confirmation',
                body: [
                    'A booking is confirmed when we send you a confirmation email with a reference number. The price shown at checkout is the total price for the rental period and the extras you selected.',
                    'We may ask for additional documents, such as a valid licence or proof of address, before handing over the car.',
                ],
            },
            {
                id: 'terms-driver',
                heading: 'Driver requirements',
                body: [
                    'The main driver must be at least 21 years old and hold a valid driving licence that has been held for at least one year. Additional drivers must be declared at booking.',
                    'A passport or national ID and a payment card in the main driver’s name are required at pick-up.',
                ],
            },
            {
                id: 'terms-use',
                heading: 'Use of the car',
                body: [
                    'Cars must be driven responsibly and only on paved public roads. Racing, off-road driving, towing, subletting and driving under the influence are strictly prohibited.',
                    'The car must be returned with the same level of fuel, in the same condition, at the agreed time and place. Late returns may incur an additional day’s rental.',
                ],
            },
            {
                id: 'terms-cancel',
                heading: 'Cancellation and changes',
                body: [
                    'Flexible bookings can be cancelled or changed free of charge up to 24 hours before pick-up. Cancellations inside 24 hours may be charged one day’s rental.',
                    'If we cannot provide the booked car, we will offer an equivalent or better vehicle at no extra cost, or a full refund.',
                ],
            },
            {
                id: 'terms-damage',
                heading: 'Damage and liability',
                body: [
                    'Every car includes basic third-party cover. The renter is responsible for the excess on any damage until full protection cover is added.',
                    'Traffic fines and parking penalties issued during the rental period remain the responsibility of the renter.',
                ],
            },
        ],
    },
    cookies: {
        eyebrow: 'Legal · Cookies',
        titleText: 'Cookie policy — RENTCARS',
        title: (
            <>
                Cookie <em>policy.</em>
            </>
        ),
        updated: 'Last updated: November 8, 2026',
        intro: 'Cookies are tiny files that help the site work smoothly. We keep ours to a minimum and never use them to sell your data.',
        sections: [
            {
                id: 'cookies-what',
                heading: 'What cookies are',
                body: [
                    'A cookie is a small text file stored on your device when you visit a website. It lets the site remember your actions and preferences between visits.',
                ],
            },
            {
                id: 'cookies-types',
                heading: 'Cookies we use',
                body: [
                    'Essential cookies keep the booking flow and security features working. They cannot be switched off.',
                    'Preference cookies remember choices such as your last search location. Analytics cookies give us anonymised numbers about how the site is used, so we can improve it.',
                ],
            },
            {
                id: 'cookies-manage',
                heading: 'Managing cookies',
                body: [
                    'You can delete or block cookies in your browser settings at any time. Blocking essential cookies may prevent parts of the site, including booking, from working correctly.',
                    'For more detail on managing cookies, visit the help pages of your browser.',
                ],
            },
            {
                id: 'cookies-contact',
                heading: 'Questions',
                body: [
                    'If anything here is unclear, email rentcars@gmail.com and we will explain it in plain language.',
                ],
            },
        ],
    },
}

export default function LegalPage({ type }) {
    const page = legalPages[type] ?? legalPages.privacy

    usePageTitle(page.titleText)

    const scrollToSection = (event, id) => {
        event.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <>
            <PageHero
                eyebrow={page.eyebrow}
                title={page.title}
                lead={page.intro}
                compact
            />

            <section className="section legal-section">
                <div className="container legal-layout">
                    <aside className="legal-toc glass reveal">
                        <span className="legal-toc-title">On this page</span>
                        {page.sections.map((section) => (
                            <a
                                href={`#${section.id}`}
                                key={section.id}
                                onClick={(event) => scrollToSection(event, section.id)}
                            >
                                {section.heading}
                            </a>
                        ))}
                        <span className="legal-updated">{page.updated}</span>
                    </aside>

                    <div className="legal-prose reveal">
                        {page.sections.map((section) => (
                            <section id={section.id} key={section.id}>
                                <h2>{section.heading}</h2>
                                {section.body.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </section>
                        ))}
                        <div className="legal-note">
                            <i className="ri-information-line" />
                            <p>
                                This page is sample content for the RENTCARS demo. For legal
                                advice specific to your situation, consult a qualified
                                professional.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
