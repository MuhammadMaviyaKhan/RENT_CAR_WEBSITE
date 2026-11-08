export default function PageHero({ eyebrow, title, lead, children, compact = false }) {
    return (
        <section className={`page-hero${compact ? ' is-compact' : ''}`}>
            <div className="page-hero-bg" aria-hidden="true">
                <span className="page-hero-glow" />
                <span className="page-hero-grid" />
            </div>

            <div className="container page-hero-inner">
                <div className="eyebrow reveal">
                    <span className="dot" /> {eyebrow}
                </div>
                <h1 className="reveal" style={{ '--delay': '.07s' }}>
                    {title}
                </h1>
                {lead ? (
                    <p className="page-hero-lead reveal" style={{ '--delay': '.14s' }}>
                        {lead}
                    </p>
                ) : null}
                {children}
            </div>
        </section>
    )
}
