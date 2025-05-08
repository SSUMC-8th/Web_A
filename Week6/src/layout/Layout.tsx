import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 1280);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
            />
            <div className="flex flex-col flex-1">
                <Navbar
                    toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
                />
                <main className="flex-1 p-4 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
