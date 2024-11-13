import clsx from 'clsx';
import Pagination from '../Pagination';
import BoundingSvg from '/svg/bouncing-circles.svg';

/**
 * Table component
 * @param {Object} props
 * @param {Array} props.data array of data to display
 * @param {Array} props.columns array of columns to display - required
 * @param {String} props.className
 * @param {String} props.width
 * @param {Boolean} props.loading whether to show loading animation or not
 * @param {Number} props.limit number of items to display
 * @param {Boolean} props.showOrder whether to show order or not
 * @param {Boolean} props.pagination whether to show pagination or not
 * @param {Number} props.currentPage current page number - required when pagination is true
 * @param {Number} props.siblingCount number of sibling pages to show
 * @param {Function} props.onPageChange function to handle page change event - required when pagination is true
 * @param {Number} props.totalPages total number of pages - required when pagination is true and not using totalCount
 * @param {Number} props.totalCount total number of items - required when pagination is true and not using totalPages
 * @returns {JSX.Element}
 * @constructor
 * @component
 * @example
 * const data = [
 *   {
 *    id: 1,
 *    name: 'Product 1',
 *   },
 * ];
 * const columns = [
 *  {
 *    key: 'id',
 *    title: 'Code',
 *  },
 *  {
 *    key: 'name',
 *    title: 'Product',
 *  },
 * ]
 * <Table
 *    data={data}
 *    columns={columns}
 *    className="table"
 *    width="100%"
 *    pagination
 *    pageSize={10}
 *    currentPage={currentPage}
 *    siblingCount={1}
 *    onPageChange={onPageChange}
 *    totalPages={totalPages}
 * />
 */
function Table({
    data,
    columns,
    className,
    width = '100%',
    loading = false,
    fetching = false,
    limit = 10,
    enableLimitChange = false,
    onLimitChange = () => {},
    showOrder = false,
    pagination,
    currentPage = 1,
    siblingCount = 1,
    onPageChange,
    totalPages,
    totalCount,
}) {
    const start = (currentPage - 1) * limit;

    return (
        <section>
            <table
                className={`${className}`}
                style={{
                    width: width,
                    borderCollapse: 'collapse',
                }}
            >
                <thead>
                    <tr className="bg-gray-100 dark:bg-navy-700 px-2">
                        {showOrder && (
                            <th className="text-left py-4 px-2">#</th>
                        )}
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={clsx({
                                    'py-4 px-2 dark:text-white': true,
                                    'text-left':
                                        column.align === 'left' ||
                                        !column.align,
                                    'text-center': column.align === 'center',
                                    'text-right': column.align === 'right',
                                })}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="relative">
                    {fetching && <LoadingDataTable />}
                    {loading && <LoadingDataTable isLoading />}
                    {!loading && data.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length + (showOrder ? 1 : 0)}
                                className="text-center py-6"
                            >
                                No data available
                            </td>
                        </tr>
                    )}
                    {!loading &&
                        data.map((row, index) => (
                            <tr
                                key={index}
                                className="hover:bg-slate-100 duration-200"
                            >
                                {showOrder && (
                                    <td className="border-b border-gray-200 dark:border-navy-700 dark:text-white px-2 py-4">
                                        {index + 1 + start}
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={clsx({
                                            'border-b border-gray-200 dark:border-navy-700 dark:text-white px-2 py-4': true,
                                        })}
                                    >
                                        {column?.render
                                            ? column.render(
                                                  row,
                                                  row[column.key]
                                              )
                                            : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="pt-4 flex relative justify-center">
                {pagination && (
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        pageSize={limit}
                        totalPages={totalPages}
                        siblingCount={siblingCount}
                        totalCount={totalCount}
                    />
                )}
                {enableLimitChange && (
                    <input
                        type="number"
                        className="border border-gray-200 dark:bg-navy-700 dark:border-navy-800 dark:text-white rounded-md px-2 py-1 max-w-20 absolute right-0"
                        value={limit}
                        onChange={(e) => {
                            onLimitChange(+e.target.value);
                        }}
                    />
                )}
            </div>
        </section>
    );
}

export default Table;

function LoadingDataTable({ isLoading }) {
    return (
        <tr className={`${isLoading ? 'h-[60dvh]' : ''} `}>
            <td className={`absolute inset-0 flex justify-center items-center`}>
                <span className="bg-white dark:bg-navy-800 opacity-70 absolute inset-0" />
                <img className="size-20 relative z-10" src={BoundingSvg} />
            </td>
        </tr>
    );
}
