'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import ProductsGrid from '../ProductsGrid/ProductsGrid'
import agent from '../../app/agent'
import Pagination from '../Pagination/Pagination'
import { MetaData } from '../../models/pagination'
import LoadingCard from '../LoadingCard/LoadingCard'


function classNames(...classes: (string | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [loading, setLoading] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [products, setProducts] = useState([]);
    const [metaData, setMetaData] = useState<MetaData | null>(null);
    const [sortOptions, setSortOptions] = useState([
        { name: 'By Name', current: true },
        { name: 'Price: Low to High', current: false },
        { name: 'Price: High to Low', current: false },
    ])
    const [subCategories, setSubCategories] = useState([
        { name: 'All', current: true },
        { name: 'Baklava', current: false },
        { name: 'Lokum', current: false },
        { name: 'Kadayif', current: false },
    ]);
    const [filters, setFilters] = useState({
        searchTerm: '',
        orderBy: '',
        types: '',
        brands: '',
        pageNumber: 1,
        pageSize: 8,
    });

    const sleep = () => new Promise(resolve => setTimeout(resolve, 800))

    const fetchProducts = async () => {
        setLoading(true);
        await sleep();
        const params = new URLSearchParams();
        if (filters.searchTerm) params.append('searchTerm', filters.searchTerm);
        if (filters.orderBy) params.append('orderBy', filters.orderBy);
        if (filters.types) params.append('types', filters.types);
        if (filters.brands) params.append('brands', filters.brands);
        params.append('pageNumber', filters.pageNumber.toString());
        params.append('pageSize', filters.pageSize.toString());

        try {
            const response = await agent.Catalog.list(params);
            setProducts(response.items);
            setMetaData(response.metaData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const handleFilterChange = (key: string, value: string | number) => {
        if(typeof value === "string") {
            const updatedArray = [... subCategories]
            updatedArray.map((subCategorie => {
                if(value === subCategorie.name.toLowerCase()) {
                    subCategorie.current = true;
                } else {
                    subCategorie.current = false;
                }
            }))
            setSubCategories(updatedArray);
        }
        if(value === "all") {
            setFilters({
                    searchTerm: '',
                    orderBy: '',
                    types: '',
                    brands: '',
                    pageNumber: 1,
                    pageSize: 8,
            })
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                pageNumber: 1,
                [key]: value
            }));
        }
    };

    const handleSortOptionsChange = (eventTarget: HTMLButtonElement) => {
        const selectedOption = eventTarget.innerText.toLocaleLowerCase();
        if(selectedOption === 'by name') {
            setFilters(prevFilters => ({
                ...prevFilters,
                orderBy: ''
            }));            
        } else if(selectedOption === 'price: low to high') {
            setFilters(prevFilters => ({
                ...prevFilters,
                orderBy: 'price'
            }));
        } else if(selectedOption === 'price: high to low') {
            setFilters(prevFilters => ({
                ...prevFilters,
                orderBy: 'priceDesc'
            }));
        }

        const updatedArray = [...sortOptions];
        updatedArray.map((sortOption) => {
            if(sortOption.name.toLocaleLowerCase() === selectedOption) {
                sortOption.current = true;
            } else {
                sortOption.current = false;
            }
        })
        setSortOptions(updatedArray);
    };

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                    {subCategories.map((category) => (
                                        <li className='flex' key={category.name}>
                                            <button type="button" onClick={(e) => handleFilterChange("types", (e.target as HTMLButtonElement).innerText.toLowerCase())} className="block px-2 py-3">
                                                {category.name}
                                            </button>
                                            {category.current ? <div className='rounded-full w-2 h-2 bg-violet-600'></div> : ''}
                                        </li>
                                    ))}
                                </ul>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Products</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <button
                                                    onClick={(e) => handleSortOptionsChange(e.target as HTMLButtonElement)}
                                                    className={classNames(
                                                        option.current ? 'w-full font-medium text-gray-900' : 'w-full text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                                                    )}
                                                >
                                                    {option.name}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                            
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="size-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {subCategories.map((category) => (
                                        <li className='flex justify-between items-center' key={category.name}>
                                            <button type="button" onClick={(e) => handleFilterChange("types", (e.target as HTMLButtonElement).innerText.toLowerCase())}>
                                                {category.name}
                                            </button>
                                            {category.current ? <div className='rounded-full w-2 h-2 bg-violet-600'></div> : ''}
                                        </li>
                                    ))}
                                </ul>
                            </form>
                            {/* Product grid */}
                            {
                                loading ? 
                                <LoadingCard /> :
                                <div className="lg:col-span-3">
                                    <ProductsGrid products={products} />
                                    <Pagination metaData={metaData} handleFilterChange={handleFilterChange}/>
                                </div>
                            }
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
