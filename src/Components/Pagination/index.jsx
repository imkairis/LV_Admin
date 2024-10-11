import { clsx } from 'clsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { DOTS, usePagination } from '~/Hooks/usePagination';

function Pagination({
    onPageChange,
    currentPage,
    totalCount,
    totalPages,
    siblingCount,
    pageSize,
}) {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        totalPages,
        pageSize,
        siblingCount,
    });
    return (
        <div>
            <ul className="flex gap-1 items-center">
                <li
                    className={clsx({
                        'p-1 rounded-md duration-200': true,
                        'cursor-pointer hover:bg-blue-200': currentPage > 1,
                        'text-gray-300': currentPage === 1,
                    })}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <IoIosArrowBack size={20} />
                </li>
                {paginationRange?.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return <li key={index}>...</li>;
                    }
                    return (
                        <li
                            key={index}
                            onClick={() => onPageChange(pageNumber)}
                            className={clsx({
                                'bg-blue-600 text-white':
                                    currentPage === pageNumber,
                                'hover:bg-gray-200': currentPage !== pageNumber,
                                'cursor-pointer': currentPage !== pageNumber,
                                'py-1 px-3 rounded-md select-none duration-200': true,
                            })}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li
                    className={clsx({
                        'p-1 rounded-md duration-200': true,
                        'cursor-pointer hover:bg-blue-200':
                            currentPage < totalPages,
                        'text-gray-300': currentPage === totalPages,
                    })}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <IoIosArrowForward size={20} />
                </li>
            </ul>
        </div>
    );
}

export default Pagination;
