import { asset } from '../utils/assets.js'

export default function AppSection() {
    return (
        <section className="section app-section" id="app">
            <div className="container">
                <div className="app-panel reveal">
                    <div className="app-copy">
                        <div className="eyebrow">
                            <span className="dot" /> The RENTCARS app
                        </div>
                        <h2>
                            The road, in your <em>pocket.</em>
                        </h2>
                        <p>
                            Book faster, unlock member-only rates and manage every trip from one
                            beautiful place.
                        </p>

                        <ul className="app-perks">
                            <li>
                                <i className="ri-check-line" /> Instant booking, keys in minutes
                            </li>
                            <li>
                                <i className="ri-check-line" /> Free cancellation on flexible
                                plans
                            </li>
                            <li>
                                <i className="ri-check-line" /> 24/7 priority support from real
                                people
                            </li>
                        </ul>

                        <div className="store-row">
                            <a
                                className="store-btn"
                                href="#"
                                data-toast="The iOS app is coming soon. Stay in the fast lane."
                                aria-label="Download on the App Store"
                            >
                                <i className="ri-apple-fill" />
                                <span>
                                    <small>Download on the</small>
                                    <strong>App Store</strong>
                                </span>
                            </a>
                            <a
                                className="store-btn"
                                href="#"
                                data-toast="The Android app is coming soon. Stay in the fast lane."
                                aria-label="Get it on Google Play"
                            >
                                <i className="ri-google-play-fill" />
                                <span>
                                    <small>Get it on</small>
                                    <strong>Google Play</strong>
                                </span>
                            </a>
                        </div>

                        <p className="app-foot">
                            <span className="stars" aria-hidden="true">
                                ★★★★★
                            </span>{' '}
                            4.9 average · 30k+ downloads
                        </p>
                    </div>

                    <div className="app-visual">
                        <div className="phone-glow" aria-hidden="true" />
                        <div className="phone-frame">
                            <div
                                className="app-screen"
                                aria-label="Preview of the RENTCARS mobile app"
                            >
                                <div className="app-status">
                                    <span className="app-time">9:41</span>
                                    <span className="app-island" aria-hidden="true" />
                                    <span className="app-status-icons" aria-hidden="true">
                                        <i className="ri-wifi-line" />
                                        <i className="ri-battery-fill" />
                                    </span>
                                </div>

                                <div className="app-screen-top">
                                    <span className="app-icon-btn">
                                        <i className="ri-arrow-left-s-line" />
                                    </span>
                                    <span className="app-icon-btn">
                                        <i className="ri-heart-line" />
                                    </span>
                                </div>

                                <div className="app-screen-car">
                                    <span className="app-screen-triangle" aria-hidden="true" />
                                    <img
                                        src={asset('optimized/jaguar-opt.png')}
                                        alt="Jaguar XE P250"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="app-screen-body">
                                    <div className="app-car-head">
                                        <div>
                                            <h3>Jaguar XE L P250</h3>
                                            <p>
                                                <i className="ri-star-fill" /> 4.8{' '}
                                                <span>(2,436 reviews)</span>
                                            </p>
                                        </div>
                                        <span className="app-price-tag">
                                            $1,800<small>/day</small>
                                        </span>
                                    </div>

                                    <div className="app-specs">
                                        <span>
                                            <i className="ri-user-3-line" /> 4 seats
                                        </span>
                                        <span>
                                            <i className="ri-settings-3-line" /> Auto
                                        </span>
                                        <span>
                                            <i className="ri-snowflake-line" /> A/C
                                        </span>
                                    </div>

                                    <div className="app-dates">
                                        <div>
                                            <small>Pick-up</small>
                                            <strong>15 Feb, 09:00</strong>
                                        </div>
                                        <i className="ri-arrow-right-line" />
                                        <div>
                                            <small>Return</small>
                                            <strong>18 Feb, 11:00</strong>
                                        </div>
                                    </div>

                                    <button
                                        className="app-book"
                                        type="button"
                                        data-toast="The app is coming soon — your Jaguar XE is waiting in the meantime."
                                    >
                                        Book this car <i className="ri-arrow-right-line" />
                                    </button>
                                </div>

                                <span className="app-home-bar" aria-hidden="true" />
                            </div>
                        </div>

                        <div className="app-float float-a glass">
                            <i className="ri-flashlight-fill" />
                            <div>
                                <strong>Instant booking</strong>
                                <span>Confirmed in seconds</span>
                            </div>
                        </div>
                        <div className="app-float float-b glass">
                            <i className="ri-shield-check-fill" />
                            <div>
                                <strong>Free cancellation</strong>
                                <span>Flexible plans</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
