import { useRef, useState } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import { footerColumns, socials } from '../data/siteData.js'
import { Link } from '../router.jsx'
import Brand from './Brand.jsx'

export default function Footer() {
    const showToast = useToast()
    const [email, setEmail] = useState('')
    const emailRef = useRef(null)
    const year = new Date().getFullYear()

    const handleNewsletter = (event) => {
        event.preventDefault()

        if (!email.trim()) {
            showToast('Add your email address to join the list.', 'error')
            emailRef.current?.focus()
            return
        }

        if (!emailRef.current?.checkValidity()) {
            showToast("That email address doesn't look quite right.", 'error')
            emailRef.current?.focus()
            return
        }

        showToast("You're on the list. See you in the fast lane.")
        setEmail('')
    }

    return (
        <footer className="site-footer">
            <div className="container footer-top">
                <div className="footer-cta reveal">
                    <div className="eyebrow">
                        <span className="dot" /> The newsletter
                    </div>
                    <h2>
                        Stay in the <em>fast lane.</em>
                    </h2>
                    <p>
                        New arrivals, members-only rates and stories from the road. Once a
                        month, never spam.
                    </p>
                </div>

                <form
                    className="newsletter reveal"
                    id="newsletterForm"
                    style={{ '--delay': '.1s' }}
                    noValidate
                    onSubmit={handleNewsletter}
                >
                    <label className="sr-only" htmlFor="newsletterEmail">
                        Email address
                    </label>
                    <input
                        id="newsletterEmail"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        ref={emailRef}
                        required
                    />
                    <button className="btn btn-primary" type="submit">
                        Join the list <i className="ri-arrow-right-line" />
                    </button>
                </form>
            </div>

            <div className="container footer-grid">
                <div className="footer-brand">
                    <Brand gradientId="logoGradFooter" />

                    <p>
                        Premium car rental for people who would rather drive than wait. Curated
                        cars, honest prices, zero friction.
                    </p>

                    <div className="footer-contact">
                        <a
                            href="https://maps.google.com/?q=26568+Hc+1+Glenallen+Alaska+99588+USA"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="ri-map-pin-line" /> 26568 Hc 1, Glenallen, Alaska
                            99588, USA
                        </a>
                        <a href="tel:+603478427312">
                            <i className="ri-phone-line" /> +603 4784 273 12
                        </a>
                        <a href="mailto:rentcars@gmail.com">
                            <i className="ri-mail-line" /> rentcars@gmail.com
                        </a>
                    </div>
                </div>

                {footerColumns.map((column) => (
                    <div className="footer-col" key={column.title}>
                        <h3>{column.title}</h3>
                        {column.links.map((link) => (
                            <Link
                                to={link.to}
                                section={link.section}
                                key={link.label}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                ))}

                <div className="footer-col">
                    <h3>Follow us</h3>
                    <div className="socials">
                        {socials.map((social) => (
                            <a
                                href="#"
                                aria-label={social.label}
                                data-toast={social.toast}
                                key={social.label}
                            >
                                <i className={social.icon} />
                            </a>
                        ))}
                    </div>
                    <p className="social-note">@rentcars — the drive looks good here.</p>
                </div>
            </div>

            <div className="container footer-bottom">
                <p>© {year} RENTCARS. All rights reserved.</p>
                <p>
                    Crafted by <a href="#">Maviya Hussaini Yousafzai</a>
                </p>
                <div className="legal">
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                    <Link to="/cookies">Cookies</Link>
                </div>
            </div>

            <div className="footer-watermark" aria-hidden="true">
                RENTCARS
            </div>
        </footer>
    )
}
