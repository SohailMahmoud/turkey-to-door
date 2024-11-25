import { useEffect, useState } from "react";
import agent from "../../app/agent";
import { Product } from '../../models/product';
import { useStoreContext } from "../../context/context";



export default function ProductList() {
    // Track loading state per product (use an object to store loading state by product Id)
    const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});

    const [products, setProducts] = useState<Product[]>([]);

    const { setBasket } = useStoreContext();

    useEffect(() => {
        const params = new URLSearchParams({
            searchTerm: '',
            orderBy: '',     
            types: '',       
            brands: '',     
            pageNumber: String(1),  
            pageSize: String(4),    
        });

        agent.Catalog.list(params)
            .then((list) => {
                // console.log(list)
                setProducts(list.items)
            })
            .catch((err) => console.log(err));
    }, [])

    async function handleAddToBag(productId: number) {
        // Set the specific product as loading
        setLoadingStates((prev) => ({ ...prev, [productId]: true }));
        console.log(loadingStates);

        try {
            const result = await agent.Basket.addItem(productId);
            setBasket(result);
            setLoadingStates((prev) => ({ ...prev, [productId]: false }));
        } catch (error) {
            console.error("Error adding item to the basket", error);
        }
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending Products</h2>
                    <a href="#" className="text-indigo-600 font-semibold">Shop the collection <i className="fa-solid fa-arrow-right"></i></a>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    // alt={product.PictureAlt}
                                    src={product.pictureUrl}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="#">
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">1 KG</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">IQD {product.price.toLocaleString()}</p>
                            </div>
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => handleAddToBag(product.id)}
                                    className="flex justify-center bg-gray-100 rounded-md text-center px-8 py-2 w-full"
                                    disabled={loadingStates[product.id]}
                                >
                                    {loadingStates[product.id] ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        'Add to bag'
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}