import { reviews } from '../data/siteData.js'
import { asset } from '../utils/assets.js'

export default function Reviews() {
    return (
        <section className="section reviews" id="reviews">
            <div className="container">
                <div className="section-head center">
                    <div className="eyebrow reveal">
                        <span className="dot" /> Testimonials
                    </div>
                    <h2 className="reveal" style={{ '--delay': '.06s' }}>
                        Loved by drivers <em>everywhere.</em>
                    </h2>
                    <div className="review-summary reveal" style={{ '--delay': '.12s' }}>
                        <span className="stars" aria-hidden="true">
                            ★★★★★
                        </span>
                        <strong>4.9 / 5</strong>
                        <span>based on 3,800+ verified reviews</span>
                    </div>
                </div>

                <div className="review-grid">
                    {reviews.map((review, index) => (
                        <article
                            className="review-card glass spotlight reveal"
                            key={review.id}
                            style={index ? { '--delay': `${index * 0.08}s` } : undefined}
                        >
                            <i className="ri-double-quotes-l quote-icon" aria-hidden="true" />
                            <div className="review-stars" aria-label="5 out of 5 stars">
                                ★★★★★
                            </div>
                            <p>{review.quote}</p>
                            <div className="reviewer">
                                {review.avatar ? (
                                    <img
                                        src={asset(review.avatar)}
                                        alt={review.name}
                                        loading="lazy"
                                    />
                                ) : (
                                    <span className="avatar-initials" aria-hidden="true">
                                        {review.initials}
                                    </span>
                                )}
                                <div>
                                    <strong>{review.name}</strong>
                                    <span>{review.location}</span>
                                </div>
                                <span className="verified">
                                    <i className="ri-shield-check-fill" /> Verified
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
