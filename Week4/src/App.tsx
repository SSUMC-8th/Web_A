import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import MoviePage from './pages/Movie/MoviePage';
import Movies from './pages/Movie/components/Movies';
import Detail from './pages/Movie/components/Detail';
import SignupPage from './pages/SignUp/SignupPage';
import Mypage from './pages/Mypage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={'/'} element={<HomePage />}></Route>

                <Route path={'movies'} element={<MoviePage />}>
                    <Route path=":category" element={<Movies />} />

                    <Route path="detail/:id" element={<Detail />} />

                    <Route
                        path="*"
                        element={<h1>영화 경로를 찾을 수 없습니다</h1>}
                    />
                </Route>

                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/signup'} element={<SignupPage />} />
                <Route path={'/my'} element={<Mypage />} />

                <Route path="*" element={<h1>경로를 찾을 수 없습니다</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
