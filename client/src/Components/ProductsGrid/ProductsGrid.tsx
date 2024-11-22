import { Product } from "../../models/product"

interface Props {
    products: Product[]
}

export default function Example({products}: Props) {

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-5 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <a key={product.id} href="" className="group">
                            <img
                                alt=""
                                src={product.pictureUrl}
                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                            />
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-sm font-medium text-gray-900">IQD {product.price.toLocaleString()}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
