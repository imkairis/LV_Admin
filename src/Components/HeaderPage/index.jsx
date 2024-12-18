import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

function HeaderPage({ title = 'title' }) {
    return (
        <div className="flex gap-4 items-center mb-5 dark:text-white">
            <Link
                to={-1}
                className="flex items-center gap-1 border dark:border-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 duration-200 px-2 pr-3 py-1 rounded-md"
            >
                <IoIosArrowBack size={16} />
                Back
            </Link>
            <h1 className="font-bold text-xl">{title}</h1>
        </div>
    );
}

export default HeaderPage;
