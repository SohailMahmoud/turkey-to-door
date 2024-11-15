import { useStoreContext } from "../../context/context";
import TableRow from "../TableRow/TableRow";

export default function BasketSummery() {
    const context = useStoreContext();
    return (
        <div className="flex justify-center mt-5">
            <div className="flex w-3/5 relative overflow-x-auto shadow-md sm:rounded-lg">
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
            <aside className="w-1/5 pl-5">
                    <h1>Bag summery</h1>
                    <div className="mt-6">
                        <button className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Checkout
                        </button>
                    </div>
            </aside>
        </div>
        
    )
}