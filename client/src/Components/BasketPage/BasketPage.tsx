'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useStoreContext } from '../../context/context';
import agent from '../../app/agent';

interface BasketPageProps {
    cartOpen: boolean;
    setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BasketPage({ cartOpen, setCartOpen }: BasketPageProps) {

    const context = useStoreContext();
    // console.log(context.basket?.items.length);

    // Handle remove item from the basket in the client-side
    // Then, update the basket in the shared context
    function removeItem(productId: number, quantity: number) {
        if (!context.basket) return;
        const items = [...context.basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            context.setBasket(prevState => {
                return {...prevState!, items}
            })
        }
    }

    // Call the removeItem API endpoint
    // Then, call removeItem func to handle client-side basket status
    function handleRemove(productid: number, quantity = 1) {
        agent.Basket.removeItem(productid, quantity)
            .then(() => removeItem(productid, quantity))
            .catch(error => console.log(error))
    }

    return (
        <Dialog open={cartOpen} onClose={setCartOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => setCartOpen(false)}
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {context.basket?.items.map((item) => (
                                                    <li key={item.productId} className="flex py-6">
                                                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                //alt={item.}
                                                                src={item.pictureUrl}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">{item.name}</a>
                                                                    </h3>
                                                                    <p className="ml-4">IQD {(item.price * item.quantity).toLocaleString()}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{item.quantity} KG</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                {/* <p className="text-gray-500">Amount: {item.quantity} KG</p> */}
                                                                <div className="flex">
                                                                    <button onClick={() => handleRemove(item.productId)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>IQD {context.basket?.items.reduce((total, item) => (item.price * item.quantity) + total, 0).toLocaleString()}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <a
                                            href="/basket-summery"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-500"
                                        >
                                            Go to bag
                                        </a>
                                    </div>
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or{' '}
                                            <button
                                                type="button"
                                                onClick={() => setCartOpen(false)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

