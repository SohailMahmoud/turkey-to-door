import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { MetaData } from '../../models/pagination';

interface Props {
    metaData : MetaData | null
    handleFilterChange: (key: string, value: number) => void;
}

export default function Pagination({ metaData, handleFilterChange }: Props) {

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-6 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => handleFilterChange("pageNumber", (metaData?.currentPage ?? 0) - 1)}
                    disabled={metaData?.currentPage === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => handleFilterChange("pageNumber", (metaData?.currentPage ?? 0) + 1)}
                    disabled={metaData?.currentPage === metaData?.totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    {metaData == null ? '' : 
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{((metaData?.currentPage) * (metaData?.pageSize)) - (metaData.pageSize - 1)}</span> to <span className="font-medium">{(metaData?.currentPage) * (metaData?.pageSize) > metaData.totalCount ? metaData.totalCount : (metaData?.currentPage) * (metaData?.pageSize)}</span> of{' '}
                        <span className="font-medium">{metaData?.totalCount}</span> results
                    </p>}
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        {
                            metaData?.currentPage !== 1 && 
                            <button
                            onClick={() => handleFilterChange("pageNumber", (metaData?.currentPage ?? 0) - 1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="size-5" />
                            </button>
                        }
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <p
                            aria-current="page"
                            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {metaData?.currentPage}
                        </p>
                        {
                            metaData?.currentPage !== metaData?.totalPages && 
                            <button
                                onClick={() => handleFilterChange("pageNumber", (metaData?.currentPage ?? 0) + 1)}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon aria-hidden="true" className="size-5" />
                            </button>
                        }
                    </nav>
                </div>
            </div>
        </div>
    )
}
