export const navLinks = [
    { label: 'Fleet', to: '/fleet' },
    { label: 'How it works', to: '/', section: 'how' },
    { label: 'About us', to: '/about' },
    { label: 'Contact', to: '/contact' },
]

export const brands = ['HONDA', 'JAGUAR', 'NISSAN', 'VOLVO', 'AUDI', 'ACURA']

export const steps = [
    {
        number: '01',
        icon: 'ri-map-pin-2-line',
        title: 'Choose your spot',
        text: 'Tell us where you are. We bring the car to your door, the airport or your hotel.',
        note: 'Doorstep delivery',
    },
    {
        number: '02',
        icon: 'ri-calendar-event-line',
        title: 'Pick your dates',
        text: 'Choose your pick-up and return times. Plans change — your booking can too.',
        note: 'Free cancellation',
    },
    {
        number: '03',
        icon: 'ri-roadster-line',
        title: 'Turn the key',
        text: 'Confirm in seconds and we deliver your car, fully detailed and ready to go.',
        note: 'Instant confirmation',
    },
]

export const features = [
    {
        icon: 'ri-shield-check-line',
        title: 'Best price, guaranteed',
        text: "Find a lower price and we'll refund 100% of the difference.",
    },
    {
        icon: 'ri-user-star-line',
        title: 'Experienced drivers',
        text: 'No licence? No problem. Our professional chauffeurs have you covered.',
    },
    {
        icon: 'ri-truck-line',
        title: '24-hour delivery',
        text: "Book at any hour and we'll bring the car straight to you.",
    },
    {
        icon: 'ri-customer-service-2-line',
        title: '24/7 technical support',
        text: "Real people, around the clock. Have a question? We're one message away.",
    },
]

export const fleetFilters = [
    { value: 'all', label: 'All cars' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'sports', label: 'Sports' },
    { value: 'supercar', label: 'Supercar' },
]

export const cars = [
    {
        id: 'jaguar-xe',
        name: 'Jaguar XE',
        model: 'P250',
        fullName: 'Jaguar XE P250',
        category: 'sedan',
        type: 'Sedan',
        year: 2024,
        badge: 'Most booked',
        image: 'optimized/jaguar-opt.png',
        alt: 'Jaguar XE P250',
        rating: '4.9',
        reviews: '(3.8k)',
        price: '$1,800',
        priceValue: 1800,
        seats: 4,
        doors: 4,
        luggage: 3,
        engine: '2.0L Turbo I4',
        power: '250 hp',
        topSpeed: '250 km/h',
        acceleration: '6.3s',
        transmission: 'Automatic',
        fuel: 'Petrol',
        description:
            'A sharp-suited saloon with a quietly ferocious turbo four. The XE pairs British craft with rear-drive poise — just as at home on a city arrival as on a long coastal escape.',
        features: [
            'Rear-wheel drive',
            'Heated leather seats',
            'Meridian sound system',
            '360° parking camera',
            'Apple CarPlay & Android Auto',
            'Adaptive cruise control',
        ],
    },
    {
        id: 'audi-r8',
        name: 'Audi R8',
        model: 'V10',
        fullName: 'Audi R8 V10',
        category: 'sports',
        type: 'Sports',
        year: 2024,
        badge: "Editor's pick",
        image: 'optimized/audi-opt.png',
        alt: 'Audi R8',
        rating: '4.6',
        reviews: '(1.9k)',
        price: '$2,100',
        priceValue: 2100,
        seats: 2,
        doors: 2,
        luggage: 1,
        engine: '5.2L V10',
        power: '562 hp',
        topSpeed: '331 km/h',
        acceleration: '3.4s',
        transmission: '7-speed S tronic',
        fuel: 'Petrol',
        description:
            'The everyday supercar, sharpened. A naturally aspirated V10, quattro grip and a cabin built around the driver make the R8 the easiest way to make a grand entrance.',
        features: [
            'Quattro all-wheel drive',
            'Carbon-fibre trim',
            'Bang & Olufsen audio',
            'Sport exhaust',
            'Virtual cockpit',
            'Launch control',
        ],
    },
    {
        id: 'bmw-m3',
        name: 'BMW M3',
        model: 'Competition',
        fullName: 'BMW M3 Competition',
        category: 'sedan',
        type: 'Sedan',
        year: 2025,
        badge: 'New arrival',
        image: 'optimized/bmw-opt.png',
        alt: 'BMW M3 Competition',
        rating: '4.5',
        reviews: '(2.2k)',
        price: '$1,600',
        priceValue: 1600,
        seats: 4,
        doors: 4,
        luggage: 3,
        engine: '3.0L Twin-Turbo I6',
        power: '503 hp',
        topSpeed: '290 km/h',
        acceleration: '3.5s',
        transmission: '8-speed automatic',
        fuel: 'Petrol',
        description:
            'A four-door missile with room for the whole crew. The M3 Competition balances track-bred aggression with genuine daily comfort — the ultimate all-rounder.',
        features: [
            'M xDrive all-wheel drive',
            'Carbon bucket seats',
            'Head-up display',
            'Harman Kardon audio',
            'Adaptive M suspension',
            'Wireless charging',
        ],
    },
    {
        id: 'lamborghini-huracan',
        name: 'Lamborghini',
        model: 'Huracán',
        fullName: 'Lamborghini Huracán',
        category: 'supercar',
        type: 'Supercar',
        year: 2024,
        badge: 'Statement piece',
        image: 'optimized/lamborghini-opt.png',
        alt: 'Lamborghini Huracán',
        rating: '5.0',
        reviews: '(980)',
        price: '$3,400',
        priceValue: 3400,
        seats: 2,
        doors: 2,
        luggage: 1,
        engine: '5.2L V10',
        power: '631 hp',
        topSpeed: '325 km/h',
        acceleration: '2.9s',
        transmission: '7-speed dual-clutch',
        fuel: 'Petrol',
        description:
            'A V10 howl, a wedge of pure theatre and a zero-to-hero soundtrack. The Huracán is not a car you drive quietly — it is the statement piece of the fleet.',
        features: [
            'LDVI dynamic control',
            'Carbon-ceramic brakes',
            'Sport exhaust',
            'Alcantara interior',
            'Digital cockpit',
            'Lifting system',
        ],
    },
    {
        id: 'porsche-718',
        name: 'Porsche',
        model: '718 Cayman GT4',
        fullName: 'Porsche 718 Cayman GT4',
        category: 'sports',
        type: 'Sports',
        year: 2024,
        badge: 'Hero pick',
        image: 'optimized/main-img-opt.png',
        alt: 'Porsche 718 Cayman GT4 in blue',
        rating: '4.9',
        reviews: '(1.2k)',
        price: '$1,800',
        priceValue: 1800,
        seats: 2,
        doors: 2,
        luggage: 2,
        engine: '4.0L Flat-6',
        power: '414 hp',
        topSpeed: '304 km/h',
        acceleration: '3.9s',
        transmission: '6-speed manual',
        fuel: 'Petrol',
        description:
            'The purist’s choice. A naturally aspirated flat-six, a manual gearbox and a chassis that talks to you through every corner. The GT4 is a proper driver’s car.',
        features: [
            'Naturally aspirated flat-six',
            '6-speed manual gearbox',
            'PASM sport suspension',
            'Sport Chrono package',
            'Alcantara sport seats',
            'Bose surround sound',
        ],
    },
]

export const reviews = [
    {
        id: 'charlie-johnson',
        quote:
            '"I feel completely at ease renting with RENTCARS. The team is warm, the car arrived spotless, and the driver was right on time."',
        name: 'Charlie Johnson',
        location: 'New York, US',
        avatar: 'optimized/avatar-charlie.jpg',
    },
    {
        id: 'emily-wilson',
        quote:
            '"Your customer care is on another level. Quick replies, zero hidden fees — I will keep coming back for every trip."',
        name: 'Emily Wilson',
        location: 'Texas, US',
        initials: 'EW',
    },
    {
        id: 'sophia-turner',
        quote:
            '"From booking to drop-off, everything felt effortless. Genuinely the best rental experience I have ever had."',
        name: 'Sophia Turner',
        location: 'Florida, US',
        avatar: 'optimized/avatar-sophia.jpg',
    },
]

export const bookingExtras = [
    {
        id: 'insurance',
        label: 'Full protection cover',
        text: 'Zero-excess cover for bumps, glass and tyres.',
        price: 29,
        icon: 'ri-shield-star-line',
    },
    {
        id: 'chauffeur',
        label: 'Professional chauffeur',
        text: 'A vetted local driver, door to door.',
        price: 120,
        icon: 'ri-user-star-line',
    },
    {
        id: 'gps',
        label: 'GPS navigation',
        text: 'Offline maps and live traffic built in.',
        price: 9,
        icon: 'ri-road-map-line',
    },
    {
        id: 'child-seat',
        label: 'Child seat',
        text: 'Isofix-ready seat, fitted before delivery.',
        price: 12,
        icon: 'ri-baby-carriage-line',
    },
]

export const contactChannels = [
    {
        icon: 'ri-map-pin-2-line',
        title: 'Visit the garage',
        lines: ['26568 Hc 1, Glenallen', 'Alaska 99588, USA'],
        action: 'Open in Maps',
        href: 'https://maps.google.com/?q=26568+Hc+1+Glenallen+Alaska+99588+USA',
    },
    {
        icon: 'ri-phone-line',
        title: 'Call us',
        lines: ['+603 4784 273 12', 'Mon–Sun, 24 hours'],
        action: 'Call now',
        href: 'tel:+603478427312',
    },
    {
        icon: 'ri-mail-line',
        title: 'Email us',
        lines: ['rentcars@gmail.com', 'Replies within 2 hours'],
        action: 'Write to us',
        href: 'mailto:rentcars@gmail.com',
    },
]

export const faqs = [
    {
        q: 'Do you deliver the car to me?',
        a: 'Yes. Doorstep delivery is included within the city and available at airports, hotels and private addresses. Add your location at checkout and we will confirm the exact drop-off window.',
    },
    {
        q: 'What do I need to rent a car?',
        a: 'A valid driving licence, a passport or national ID, and a credit or debit card in the main driver’s name. Drivers must be at least 21 years old.',
    },
    {
        q: 'Can I cancel or change my booking?',
        a: 'Flexible bookings can be cancelled or changed free of charge up to 24 hours before pick-up. Just reply to your confirmation email or contact our team.',
    },
    {
        q: 'Is insurance included in the price?',
        a: 'Every rental includes basic third-party cover. You can add zero-excess full protection at checkout for complete peace of mind.',
    },
    {
        q: 'Do you offer chauffeur-driven rentals?',
        a: 'We do. Add the professional chauffeur extra to any car and a vetted local driver will handle the road while you enjoy the ride.',
    },
]

export const aboutValues = [
    {
        icon: 'ri-steering-2-line',
        title: 'Cars worth driving',
        text: 'Every car in the fleet is hand-picked, detailed and serviced before it reaches you.',
    },
    {
        icon: 'ri-price-tag-3-line',
        title: 'Honest pricing',
        text: 'One clear price with no hidden fees, no surprise deposits and no last-minute extras.',
    },
    {
        icon: 'ri-customer-service-2-line',
        title: 'Real human support',
        text: 'A team of actual people, awake around the clock, one message away from your next trip.',
    },
    {
        icon: 'ri-leaf-line',
        title: 'A lighter footprint',
        text: 'Efficient routing, shared deliveries and a growing electric fleet keep every journey cleaner.',
    },
]

export const milestones = [
    { year: '2018', title: 'First key', text: 'RENTCARS opens with three cars and one very big idea.' },
    { year: '2020', title: 'Going national', text: 'Doorstep delivery reaches 12 cities across the country.' },
    { year: '2023', title: 'The experience', text: 'Our app launches and redefines how a rental should feel.' },
    { year: '2026', title: '120 cars strong', text: 'A curated fleet, 15k+ journeys and a 4.9 average rating.' },
]

export const footerColumns = [
    {
        title: 'Our product',
        links: [
            { label: 'Fleet', to: '/fleet' },
            { label: 'Book a car', to: '/booking' },
            { label: 'Our story', to: '/about' },
            { label: 'Contact', to: '/contact' },
            { label: 'Download app', to: '/', section: 'app' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Help centre', to: '/contact' },
            { label: 'How it works', to: '/', section: 'how' },
            { label: 'Why choose us', to: '/', section: 'why' },
            { label: 'Reviews', to: '/', section: 'reviews' },
            { label: 'Partner network', to: '/contact' },
        ],
    },
    {
        title: 'About RENTCARS',
        links: [
            { label: 'Our story', to: '/about' },
            { label: 'Careers', to: '/contact' },
            { label: 'Press centre', to: '/contact' },
            { label: 'Advertise', to: '/contact' },
            { label: 'Investor relations', to: '/about' },
        ],
    },
]

export const socials = [
    {
        label: 'RENTCARS on Facebook',
        icon: 'ri-facebook-fill',
        toast: 'Follow us on Facebook — coming soon.',
    },
    {
        label: 'RENTCARS on Instagram',
        icon: 'ri-instagram-line',
        toast: 'Follow us on Instagram — coming soon.',
    },
    {
        label: 'RENTCARS on YouTube',
        icon: 'ri-youtube-fill',
        toast: 'Watch RENTCARS on YouTube — coming soon.',
    },
    {
        label: 'RENTCARS on X',
        icon: 'ri-twitter-x-fill',
        toast: 'Follow RENTCARS on X — coming soon.',
    },
]
