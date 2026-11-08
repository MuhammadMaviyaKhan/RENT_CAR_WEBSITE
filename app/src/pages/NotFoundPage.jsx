import usePageTitle from '../hooks/usePageTitle.js'
import { Link } from '../router.jsx'

export default function NotFoundPage({
    title = (
        <>
            Wrong <em>turn.</em>
        </>
    ),
    message = 'The page you were looking for has moved, sold out or never existed. The road ahead is still open.',
}) {
    usePageTitle('Page not found — RENTCARS')

    return (
        <section className="not-found">
            <div className="not-found-bg" aria-hidden="true">
                <span className="page-hero-glow" />
                <span className="page-hero-grid" />
            </div>

            <div className="container not-found-inner">
                <span className="not-found-code" aria-hidden="true">
                    404
                </span>
                <div className="eyebrow reveal">
                    <span className="dot" /> Lost in the fast lane
                </div>
                <h1 className="reveal" style={{ '--delay': '.06s' }}>
                    {title}
                </h1>
                <p className="page-hero-lead reveal" style={{ '--delay': '.12s' }}>
                    {message}
                </p>
                <div className="not-found-actions reveal" style={{ '--delay': '.18s' }}>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Back to home <i className="ri-home-4-line" />
                    </Link>
                    <Link to="/fleet" className="btn btn-glass btn-lg">
                        Browse the fleet <i className="ri-arrow-right-line" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
