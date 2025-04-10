import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <div className='h-dvh flex flex-col'>
        <nav className='bg-black text-white '>Gang's LP 
        </nav>
        <main className = "flex-1">
            <Outlet/>
        </main>
        <footer className='bg-black text-white'></footer>
    </div>
  );
};

export default HomeLayout
