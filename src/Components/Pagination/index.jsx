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
        <ul className="flex gap-1 items-center">
            <li
                className={clsx({
                    'p-1 rounded-md duration-200 dark:text-white': true,
                    'cursor-pointer hover:bg-blue-200 dark:hover:bg-navy-600':
                        currentPage > 1,
                    'text-gray-300 dark:text-navy-300': currentPage === 1,
                })}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
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
                            'bg-blue-600 dark:bg-navy-500 text-white':
                                currentPage === pageNumber,
                            'hover:bg-gray-200 dark:hover:bg-navy-600':
                                currentPage !== pageNumber,
                            'cursor-pointer': currentPage !== pageNumber,
                            'py-1 px-3 rounded-md select-none duration-200 dark:text-white': true,
                        })}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={clsx({
                    'p-1 rounded-md duration-200 dark:text-white': true,
                    'cursor-pointer hover:bg-blue-200 dark:hover:bg-navy-600':
                        currentPage < totalPages,
                    'text-gray-300': currentPage === totalPages,
                })}
                onClick={() =>
                    currentPage !== totalPages &&
                    currentPage < totalPages &&
                    onPageChange(currentPage + 1)
                }
            >
                <IoIosArrowForward size={20} />
            </li>
        </ul>
    );
}

export default Pagination;
