import PageHero from '../components/PageHero.jsx'
import { aboutValues, milestones } from '../data/siteData.js'
import usePageTitle from '../hooks/usePageTitle.js'
import { Link } from '../router.jsx'
import { asset } from '../utils/assets.js'

export default function AboutPage() {
    usePageTitle('Our Story — RENTCARS')

    return (
        <>
            <PageHero
                eyebrow="Our story"
                title={
                    <>
                        We rent feelings, <em>not just cars.</em>
                    </>
                }
                lead="RENTCARS started with three cars, one garage and a stubborn belief: renting a car should feel as good as driving one."
            >
                <div className="page-chips reveal" style={{ '--delay': '.2s' }}>
                    <span className="page-chip">
                        <i className="ri-calendar-line" /> Est. 2018
                    </span>
                    <span className="page-chip">
                        <i className="ri-car-line" /> 120+ cars
                    </span>
                    <span className="page-chip">
                        <i className="ri-road-map-line" /> 15k+ journeys
                    </span>
                    <span className="page-chip">
                        <i className="ri-star-fill" /> 4.9 average rating
                    </span>
                </div>
            </PageHero>

            <section className="section about-story-section">
                <div className="container about-story">
                    <div className="about-visual reveal">
                        <div className="about-visual-panel glass spotlight">
                            <span className="about-word" aria-hidden="true">
                                DRIVE
                            </span>
                            <span className="about-kicker">The garage · Est. 2018</span>
                            <span className="about-floor" aria-hidden="true" />
                            <img
                                src={asset('optimized/audi-opt.png')}
                                alt="Audi R8 inside the RENTCARS garage"
                                loading="lazy"
                            />
                            <span className="about-visual-tag">
                                <i className="ri-speed-up-line" /> A garage built on detail
                            </span>
                        </div>
                        <div className="about-float glass">
                            <span className="about-float-icon">
                                <i className="ri-star-fill" />
                            </span>
                            <div>
                                <strong>4.9 / 5</strong>
                                <span>From 3,800+ verified drivers</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-copy">
                        <div className="eyebrow reveal">
                            <span className="dot" /> The RENTCARS story
                        </div>
                        <h2 className="reveal" style={{ '--delay': '.06s' }}>
                            Born from a <em>simple idea.</em>
                        </h2>
                        <p className="section-lead reveal" style={{ '--delay': '.12s' }}>
                            In 2018 our founder kept hearing the same story: renting a car was
                            slow, confusing and full of hidden costs. So he bought three
                            cars, polished them until they gleamed and started delivering
                            them personally.
                        </p>
                        <p className="section-lead reveal" style={{ '--delay': '.16s' }}>
                            Eight years later, the fleet has grown to 120 cars and the
                            deliveries reach across the country — but the promise has not
                            changed. A beautiful car, an honest price and a team that answers
                            when you call.
                        </p>

                        <div className="about-signature reveal" style={{ '--delay': '.2s' }}>
                            <span className="about-signature-mark" aria-hidden="true">
                                <i className="ri-double-quotes-l" />
                            </span>
                            <div>
                                <strong>Maviya Hussaini Yousafzai</strong>
                                <small>Founder, RENTCARS</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section about-values-section">
                <div className="container">
                    <div className="section-head center">
                        <div className="eyebrow reveal">
                            <span className="dot" /> What we stand for
                        </div>
                        <h2 className="reveal" style={{ '--delay': '.06s' }}>
                            Four promises, <em>every key.</em>
                        </h2>
                        <p className="section-lead reveal" style={{ '--delay': '.12s' }}>
                            The details behind every booking, delivery and mile.
                        </p>
                    </div>

                    <div className="about-values">
                        {aboutValues.map((value, index) => (
                            <article
                                className="value-card glass spotlight reveal"
                                key={value.title}
                                style={
                                    index ? { '--delay': `${index * 0.07}s` } : undefined
                                }
                            >
                                <span className="value-icon">
                                    <i className={value.icon} />
                                </span>
                                <h3>{value.title}</h3>
                                <p>{value.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section about-timeline-section">
                <div className="container">
                    <div className="section-head">
                        <div className="eyebrow reveal">
                            <span className="dot" /> The road so far
                        </div>
                        <h2 className="reveal" style={{ '--delay': '.06s' }}>
                            A few <em>milestones.</em>
                        </h2>
                    </div>

                    <div className="about-timeline">
                        {milestones.map((item, index) => (
                            <article
                                className="timeline-item reveal"
                                key={item.year}
                                style={
                                    index ? { '--delay': `${index * 0.08}s` } : undefined
                                }
                            >
                                <span className="timeline-year">{item.year}</span>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section about-cta-section">
                <div className="container">
                    <div className="page-cta glass reveal">
                        <div>
                            <div className="eyebrow">
                                <span className="dot" /> Your turn
                            </div>
                            <h2>
                                The next chapter is <em>yours.</em>
                            </h2>
                            <p>
                                Pick a car, choose a date and let us bring the road to your
                                door. The first mile is always the best one.
                            </p>
                        </div>
                        <div className="page-cta-actions">
                            <Link to="/fleet" className="btn btn-primary btn-lg">
                                Explore the fleet <i className="ri-arrow-right-line" />
                            </Link>
                            <Link to="/contact" className="btn btn-glass btn-lg">
                                Meet the team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
