import { Link } from '../router.jsx'

export default function Brand({ gradientId = 'logoGrad' }) {
    return (
        <Link to="/" className="brand" aria-label="RENTCARS — home">
            <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="12" fill={`url(#${gradientId})`} />
                    <path
                        d="M12.5 29V11h8.1c4.6 0 7.6 2.4 7.6 6.3 0 2.8-1.5 4.8-4.2 5.8L29.5 29h-5.4l-4.5-5.2h-2.1V29h-5Zm5-9.3h2.9c2.1 0 3.3-.9 3.3-2.4 0-1.6-1.2-2.4-3.3-2.4h-2.9v4.8Z"
                        fill="white"
                    />
                    <defs>
                        <linearGradient
                            id={gradientId}
                            x1="4"
                            y1="2"
                            x2="36"
                            y2="38"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#6BA8FF" />
                            <stop offset=".55" stopColor="#3D7BFF" />
                            <stop offset="1" stopColor="#1B47D8" />
                        </linearGradient>
                    </defs>
                </svg>
            </span>
            <span className="brand-word">
                RENTCARS<span>Premium drive</span>
            </span>
        </Link>
    )
}
