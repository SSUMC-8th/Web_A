import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Movie from './pages/Movie';
import Movies from './pages/Movies';
import Detail from './pages/Detail';
import Login from './pages/Login';
import SignUp from './pages/SignUp/SignUp';
import Mypage from './pages/Mypage';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={'/'} element={<Home />}></Route>

                <Route path={'movies'} element={<Movie />}>
                    <Route path=":category" element={<Movies />} />

                    <Route path="detail/:id" element={<Detail />} />

                    <Route
                        path="*"
                        element={<h1>영화 경로를 찾을 수 없습니다</h1>}
                    />
                </Route>

                <Route path={'/login'} element={<Login />} />
                <Route path={'/signup'} element={<SignUp />} />
                <Route path={'/my'} element={<Mypage />} />

                <Route path="*" element={<h1>경로를 찾을 수 없습니다</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
