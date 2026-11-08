import { features } from '../data/siteData.js'
import { Link } from '../router.jsx'
import { asset } from '../utils/assets.js'

export default function WhyUs() {
    return (
        <section className="section why" id="why">
            <div className="container why-grid">
                <div className="showcase-wrap reveal">
                    <div className="showcase glass spotlight">
                        <span className="showcase-word" aria-hidden="true">
                            R8
                        </span>
                        <span className="showcase-kicker">The garage</span>
                        <span className="showcase-floor" aria-hidden="true" />
                        <img
                            src={asset('optimized/audi-opt.png')}
                            alt="Audi R8 in the RENTCARS garage"
                            loading="lazy"
                        />
                        <span className="showcase-tag">
                            <i className="ri-speed-up-line" /> 0–100 in 3.1s
                        </span>
                    </div>
                    <div className="showcase-card glass">
                        <span className="showcase-card-icon">
                            <i className="ri-shield-check-fill" />
                        </span>
                        <div>
                            <strong>Best price guaranteed</strong>
                            <span>Found it cheaper? We refund the difference.</span>
                        </div>
                    </div>
                </div>

                <div className="why-copy">
                    <div className="eyebrow reveal">
                        <span className="dot" /> Why choose us
                    </div>
                    <h2 className="reveal" style={{ '--delay': '.06s' }}>
                        More than a rental.
                        <br />
                        <em>A first-class feeling.</em>
                    </h2>
                    <p className="section-lead reveal" style={{ '--delay': '.12s' }}>
                        We obsess over the details — so all you have to do is turn the key and
                        go.
                    </p>

                    <div className="features">
                        {features.map((feature, index) => (
                            <div
                                className="feature reveal"
                                key={feature.title}
                                style={{ '--delay': `${0.16 + index * 0.06}s` }}
                            >
                                <span className="feature-icon">
                                    <i className={feature.icon} />
                                </span>
                                <div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link
                        to="/fleet"
                        className="btn btn-glass reveal"
                        style={{ '--delay': '.4s' }}
                    >
                        Discover the difference <i className="ri-arrow-right-line" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
