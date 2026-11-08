import { Fragment } from 'react'
import { brands } from '../data/siteData.js'

export default function BrandStrip() {
    return (
        <section className="brand-strip" aria-label="Brands available in our fleet">
            <div className="container">
                <p className="brand-heading">Trusted by drivers worldwide</p>
            </div>
            <div className="marquee" aria-hidden="true">
                <div className="marquee-track">
                    {[0, 1].map((group) => (
                        <div className="marquee-group" key={group}>
                            {brands.map((brand) => (
                                <Fragment key={`${group}-${brand}`}>
                                    <span>{brand}</span>
                                    <i />
                                </Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
