const callouts = [
    {
        name: 'Deserts',
        description: 'Turkish Baklava',
        imageSrc: 'https://heytripster.com/wp-content/uploads/2020/05/where-to-eat-best-baklava-in-istanbul-min-780x470.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
    },
    {
        name: 'Accessories',
        description: 'Naclaces',
        imageSrc: 'https://igemstonejewelry.com/cdn/shop/products/Unique-Handmade-Wood-Resin-Pendant-Necklace-Couple-Jewelry-Accessories-Women-Men-purple_1024x1024.jpg?v=157171949',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
    },
    {
        name: 'Sovinerces',
        description: 'Iznik Ceramics',
        imageSrc: './ceramic.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
    },
]

export default function Categories() {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-16">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Categories</h2>

                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {callouts.map((callout) => (
                            <div key={callout.name} className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <img
                                        alt={callout.imageAlt}
                                        src={callout.imageSrc}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <a href={callout.href}>
                                        <span className="absolute inset-0" />
                                        {callout.name}
                                    </a>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
