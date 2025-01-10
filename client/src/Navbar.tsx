'use client'

import { Fragment, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import BasketPage from './Components/BasketPage/BasketPage'
import { useStoreContext, useUserContext } from './context/context'
import { useNavigate } from "react-router-dom";

const navigation = {
    categories: [
        {
            id: 'catalog',
            name: 'Catalog',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'desserts',
                    name: 'Desserts',
                    items: [
                        { name: 'Baklava', href: '#' },
                        { name: 'Lokum', href: '#' },
                        { name: 'Kadayif', href: '#' },
                        { name: 'Coffee', href: '#' },
                        { name: 'Tea', href: '#' },
                        { name: 'Selap', href: '#' },
                        { name: 'Draje Chocolate', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'souvenirs',
                    name: 'Souvenirs',
                    items: [
                        { name: 'Turkish Carpets', href: '#' },
                        { name: 'Turkish Spices', href: '#' },
                        { name: 'Iznik Ceramics', href: '#' },
                        { name: 'Mosaic lamps', href: '#' },
                        { name: 'Leather goods', href: '#' },
                    ],
                },
            ],
        }
    ],
    pages: [
        { name: 'About us', href: 'about' },
    ],
}

export default function Navbar() {
    const navigate = useNavigate();

    const { user, setUser } = useUserContext();
    const { setBasket } = useStoreContext();

    const [open, setOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const { basket } = useStoreContext();

    function handleOnCartClick() {
        setCartOpen(prev => !prev)
    }

    function handleSignout() {
        setUser(undefined);
        setBasket(undefined);
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <div className="flex px-4 pb-2 pt-5">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Links */}
                        <TabGroup className="mt-2">
                            <div className="border-b border-gray-200">
                                <TabList className="-mb-px flex space-x-8 px-4">
                                    {navigation.categories.map((category) => (
                                        <Tab
                                            key={category.name}
                                            className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                                        >
                                            {category.name}
                                        </Tab>
                                    ))}
                                </TabList>
                            </div>
                            <TabPanels as={Fragment}>
                                {navigation.categories.map((category) => (
                                    <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                        <div className="grid grid-cols-2 gap-x-4">
                                            {category.featured.map((item) => (
                                                <div key={item.name} className="group relative text-sm">
                                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                        <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
                                                    </div>
                                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                        <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                        {item.name}
                                                    </a>
                                                    <p aria-hidden="true" className="mt-1">
                                                        Shop now
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        {category.sections.map((section) => (
                                            <div key={section.name}>
                                                <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                    {section.name}
                                                </p>
                                                <ul
                                                    role="list"
                                                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                    className="mt-6 flex flex-col space-y-6"
                                                >
                                                    {section.items.map((item) => (
                                                        <li key={item.name} className="flow-root">
                                                            <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </TabGroup>

                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                    <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                        {page.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                        {!user ?
                            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                <div className="flow-root">
                                    <a href="sign-in" className="-m-2 block p-2 font-medium text-gray-900">
                                        Sign in
                                    </a>
                                </div>
                                <div className="flow-root">
                                    <a href="create-account" className="-m-2 block p-2 font-medium text-gray-900">
                                        Create account
                                    </a>
                                </div>
                            </div>
                            : ''}


                        {/* <div className="border-t border-gray-200 px-4 py-6">
                            <a href="#" className="-m-2 flex items-center p-2">
                                <img
                                    alt="USA flag"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/1280px-Flag_of_Iraq.svg.png?20221130134748"
                                    className="block h-auto w-5 flex-shrink-0"
                                />
                                <span className="ml-3 block text-base font-medium text-gray-900">IQD</span>
                                <span className="sr-only">, change currency</span>
                            </a>
                        </div> */}
                    </DialogPanel>
                </div>
            </Dialog>

            <header className="relative bg-white">
                <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                    Get free delivery on orders over $100
                </p>

                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <a href="/">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        alt=""
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        className="h-8 w-auto"
                                    />
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup className="hidden lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            <div className="relative flex">
                                                <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                                                    {category.name}
                                                </PopoverButton>
                                            </div>

                                            <PopoverPanel
                                                transition
                                                className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in z-10"
                                            >
                                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                                                <div className="relative bg-white">
                                                    <div className="mx-auto max-w-7xl px-8">
                                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                {category.featured.map((item) => (
                                                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                            <img
                                                                                alt={item.imageAlt}
                                                                                src={item.imageSrc}
                                                                                className="object-cover object-center"
                                                                            />
                                                                        </div>
                                                                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                                                            {item.name}
                                                                        </a>
                                                                        <p aria-hidden="true" className="mt-1">
                                                                            Shop now
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                {category.sections.map((section) => (
                                                                    <div key={section.name}>
                                                                        <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                            {section.name}
                                                                        </p>
                                                                        <ul
                                                                            role="list"
                                                                            aria-labelledby={`${section.name}-heading`}
                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                        >
                                                                            {section.items.map((item) => (
                                                                                <li key={item.name} className="flex">
                                                                                    <a href={item.href} className="hover:text-gray-800">
                                                                                        {item.name}
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverPanel>
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </PopoverGroup>

                            <div className="ml-auto flex items-center">
                                {/* <div className="hidden lg:ml-8 lg:flex">
                                    <div className="flex items-center text-gray-700 hover:text-gray-800">
                                        <img
                                            alt="USA flag"
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/1280px-Flag_of_Iraq.svg.png?20221130134748"
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-sm font-medium">IQD</span>
                                        <span className="sr-only">, change currency</span>
                                    </div>
                                </div> */}

                                {/* Search */}
                                {/* <div className="flex lg:ml-6">
                                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                                    </a>
                                </div> */}

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <button onClick={handleOnCartClick} className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{basket?.items.length}</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </button>
                                    <BasketPage cartOpen={cartOpen} setCartOpen={setCartOpen} />
                                </div>
                                {!user ?
                                    <div className="hidden ml-4 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <a href="sign-in" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                                className="on"
                                                style={{ width: '24px', height: '24px', color: 'rgb(156, 163, 175)' }}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                                />
                                            </svg>

                                        </a>
                                    </div> : <Menu as="div" className="ml-4 relative lg:ml-6">
                                        <div>
                                            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    alt=""
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    className="size-8 rounded-full"
                                                />
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            <MenuItem>
                                                <button
                                                    className="w-full block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                >
                                                    Your Profile
                                                </button>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    className="w-full block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                >
                                                    Settings
                                                </button>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    onClick={handleSignout}
                                                    className="w-full block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                                >
                                                    Sign out
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
