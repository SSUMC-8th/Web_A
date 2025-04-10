import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <div className='h-dvh flex flex-col'>
        <nav className='bg-black text-white '>네비게이션 공간
        </nav>
        <main className = "flex-1">
            <Outlet/>
        </main>
        <footer className='bg-black text-white'>푸터 공간</footer>
    </div>
  );
};

export default HomeLayout
