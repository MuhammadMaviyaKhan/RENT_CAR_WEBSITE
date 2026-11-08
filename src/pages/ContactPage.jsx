import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { contactChannels, faqs } from '../data/siteData.js'
import usePageTitle from '../hooks/usePageTitle.js'

const emptyForm = {
    name: '',
    email: '',
    subject: 'A new booking',
    message: '',
}

export default function ContactPage() {
    usePageTitle('Contact — RENTCARS')

    const showToast = useToast()
    const [form, setForm] = useState(emptyForm)
    const [sent, setSent] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!form.name.trim()) {
            showToast('Add your name so we know who to reply to.', 'error')
            document.getElementById('contactName')?.focus()
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            showToast('Add a valid email address for our reply.', 'error')
            document.getElementById('contactEmail')?.focus()
            return
        }

        if (form.message.trim().length < 10) {
            showToast('Tell us a little more — at least 10 characters.', 'error')
            document.getElementById('contactMessage')?.focus()
            return
        }

        setSent(true)
        setForm(emptyForm)
        showToast('Message sent. A real human will reply within 2 hours.')
    }

    return (
        <>
            <PageHero
                eyebrow="Contact"
                title={
                    <>
                        Let&apos;s talk <em>cars.</em>
                    </>
                }
                lead="A question about a booking, a special request or just want to say hello? Our team is awake around the clock."
            >
                <div className="page-chips reveal" style={{ '--delay': '.2s' }}>
                    <span className="page-chip">
                        <i className="ri-time-line" /> Replies within 2 hours
                    </span>
                    <span className="page-chip">
                        <i className="ri-customer-service-2-line" /> 24/7 human support
                    </span>
                    <span className="page-chip">
                        <i className="ri-global-line" /> 12 cities covered
                    </span>
                </div>
            </PageHero>

            <section className="section contact-section">
                <div className="container contact-layout">
                    <div className="contact-side">
                        <div className="contact-cards">
                            {contactChannels.map((channel, index) => {
                                const external = channel.href.startsWith('http')

                                return (
                                    <article
                                        className="contact-card glass spotlight reveal"
                                        key={channel.title}
                                        style={
                                            index
                                                ? { '--delay': `${index * 0.07}s` }
                                                : undefined
                                        }
                                    >
                                        <span className="contact-card-icon">
                                            <i className={channel.icon} />
                                        </span>
                                        <div className="contact-card-body">
                                            <h3>{channel.title}</h3>
                                            {channel.lines.map((line) => (
                                                <p key={line}>{line}</p>
                                            ))}
                                            <a
                                                href={channel.href}
                                                target={external ? '_blank' : undefined}
                                                rel={
                                                    external
                                                        ? 'noopener noreferrer'
                                                        : undefined
                                                }
                                            >
                                                {channel.action}{' '}
                                                <i className="ri-arrow-right-up-line" />
                                            </a>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>

                        <div className="contact-note glass reveal">
                            <span className="contact-note-icon">
                                <i className="ri-flashlight-fill" />
                            </span>
                            <div>
                                <strong>Roadside emergency?</strong>
                                <p>
                                    Call us any hour and say “urgent”. You will be connected
                                    straight to the on-call team.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form glass reveal">
                        {sent ? (
                            <div className="contact-sent">
                                <span className="success-icon">
                                    <i className="ri-check-line" />
                                </span>
                                <h2>Message received.</h2>
                                <p>
                                    Thanks for reaching out. A real human will reply within
                                    two hours — usually much sooner.
                                </p>
                                <button
                                    className="btn btn-outline"
                                    type="button"
                                    onClick={() => setSent(false)}
                                >
                                    Send another message{' '}
                                    <i className="ri-arrow-right-line" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="eyebrow">
                                    <span className="dot" /> Send a message
                                </div>
                                <h2>
                                    How can we <em>help?</em>
                                </h2>
                                <p>
                                    Fill in the form and the right person — not a bot — will
                                    get back to you.
                                </p>

                                <form
                                    className="contact-form-inner"
                                    noValidate
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label htmlFor="contactName">Your name</label>
                                            <input
                                                id="contactName"
                                                name="name"
                                                type="text"
                                                autoComplete="name"
                                                placeholder="Full name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label htmlFor="contactEmail">Email</label>
                                            <input
                                                id="contactEmail"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                placeholder="you@example.com"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-field form-field--wide">
                                            <label htmlFor="contactSubject">
                                                What is it about?
                                            </label>
                                            <select
                                                id="contactSubject"
                                                name="subject"
                                                value={form.subject}
                                                onChange={handleChange}
                                            >
                                                <option>A new booking</option>
                                                <option>An existing booking</option>
                                                <option>Chauffeur service</option>
                                                <option>Long-term rental</option>
                                                <option>Press & partnerships</option>
                                                <option>Something else</option>
                                            </select>
                                        </div>
                                        <div className="form-field form-field--wide">
                                            <label htmlFor="contactMessage">Message</label>
                                            <textarea
                                                id="contactMessage"
                                                name="message"
                                                placeholder="Tell us what you need…"
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button className="btn btn-primary btn-lg" type="submit">
                                        Send message <i className="ri-send-plane-line" />
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>

                <div className="container faq-section">
                    <div className="section-head center">
                        <div className="eyebrow reveal">
                            <span className="dot" /> Quick answers
                        </div>
                        <h2 className="reveal" style={{ '--delay': '.06s' }}>
                            Before you <em>ask.</em>
                        </h2>
                    </div>

                    <div className="faq-list reveal">
                        {faqs.map((faq) => (
                            <details className="faq-item" key={faq.q}>
                                <summary>
                                    {faq.q}
                                    <i className="ri-add-line" aria-hidden="true" />
                                </summary>
                                <p>{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
