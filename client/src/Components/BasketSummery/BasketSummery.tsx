import { useStoreContext } from "../../context/context";
import TableRow from "../TableRow/TableRow";
import './BasketSummery.css'

export default function BasketSummery() {
    const context = useStoreContext();
    return (
        <div className="order-summery flex justify-center mt-5">
            <div className="order-summery-table flex w-3/5 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount (KG)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {context.basket?.items.map((item) => {
                            return <TableRow key={item.productId} item={item} />
                        })}
                    </tbody>
                </table>
            </div>
            <aside className="order-summery-aside w-1/5 pl-5">
                    <div>
                        <button className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 mb-5 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Checkout
                        </button>
                        <div className="border-solid border-2 border-black-600 px-2 py-4 rounded-md">
                            <p className="font-bold	px-3 mb-4">Order Summary</p>
                            <ul className="px-3 text-sm">
                                <li className="flex justify-between pb-2"><span>Subtotal</span> <strong>IQD&nbsp;{context.basket?.items.reduce((total, item) => (item.price * item.quantity) + total, 0).toLocaleString()}</strong></li>
                                <li className="flex justify-between pb-2"><span>Shipping Fees</span><strong>IQD&nbsp;5,000</strong></li>
                                <li className="flex justify-between items-center pb-2"><span>Disccount <br /> (Free Shipping)</span><strong>- IQD&nbsp;5,000</strong></li>
                                <hr />
                                <li className="flex justify-between pt-2"><span>Total</span><strong>IQD&nbsp;{context.basket?.items.reduce((total, item) => (item.price * item.quantity) + total, 0).toLocaleString()}</strong></li>
                            </ul>
                        </div>
                        <button className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 mt-5 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Checkout
                        </button>
                    </div>
            </aside>
        </div>
        
    )
}