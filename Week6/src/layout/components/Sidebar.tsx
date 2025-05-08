import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/routes';

const Sidebar = ({
    isSidebarOpen,
    closeSidebar,
}: {
    isSidebarOpen: boolean;
    closeSidebar: () => void;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                ref.current &&
                !ref.current.contains(e.target as Node) &&
                window.innerWidth < 1280
            ) {
                closeSidebar();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [closeSidebar]);

    return (
        <div
            ref={ref}
            className={clsx(
                'bg-white text-black w-64 p-4 transition-transform duration-300 fixed xl:relative h-full z-30 ',
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            )}
        >
            <div className="h-20 text-xl font-bold">메뉴</div>
            <ul className="flex flex-col gap-2">
                <li>
                    <Link to={ROUTES.HOME}>홈</Link>
                </li>
                <li>
                    <Link to={ROUTES.MYPAGE}>마이페이지</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
