import agent from "../../app/agent";
import { useStoreContext } from "../../context/context";
import { BasketItem } from "../../models/basket";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TableRowProps {
    item: BasketItem;
}

export default function TableRow({item}: TableRowProps) {

    const context = useStoreContext();

    async function handleAddToBag(productId: number) {
        const loadingToast = toast.loading("Adding to bag...");
        try {
            const result = await agent.Basket.addItem(productId);

            context.setBasket(result);
            // console.log(result);
            toast.update(loadingToast, {
                render: "Item successfully added!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            
        } catch (error) {
            toast.update(loadingToast, {
                render: "Failed to add item. Try again.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

            console.error("Error adding item to the basket", error);
        }
    }

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
        const loadingToast = toast.loading("Removing from bag...");
        agent.Basket.removeItem(productid, quantity)
            .then(() => {
                removeItem(productid, quantity)
                toast.update(loadingToast, {
                    render: "Item successfully removed!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            })
            .catch(error => {
                toast.update(loadingToast, {
                    render: "Failed to remove item. Try again.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                console.log(error)
            })
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="flex justify-center p-4">
                <img src={item.pictureUrl} className="w-16 md:w-32 max-w-full max-h-full sm:rounded-lg" alt=""/>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.name}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                    <button disabled={item.quantity === 1} onClick={() => handleRemove(item.productId)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                        </svg>
                    </button>
                    <div>
                        <p id={item.productId.toString()} className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 text-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {item.quantity}
                        </p>
                    </div>
                    <button onClick={() => handleAddToBag(item.productId)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </button>
                </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                IQD {(item.price * item.quantity).toLocaleString()}
            </td>
            <td className="px-6 py-4">
                <button onClick={() => handleRemove(item.productId, item.quantity)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
            </td>
        </tr>
    )
}