import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import Detail from "./pages/Detail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>

        <Route path={"movies"} element={<Movie />}>
          <Route path=":category" element={<Movies />} />

          <Route path="detail/:id" element={<Detail />} />

          <Route path="*" element={<h1>영화 경로를 찾을 수 없습니다</h1>} />
        </Route>

        <Route path="*" element={<h1>경로를 찾을 수 없습니다</h1>} />
      </Routes>
    </Layout>
  );
}

export default App;
