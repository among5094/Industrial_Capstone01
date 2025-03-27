
// 자동으로 넘어가는 배너 부분 추가
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 모든 페이지에서 Footer가 보이게 해야하므로 App.js에 footer추가
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import MainPage from "./pages/MainPage";
import FreeBoard from "./pages/FreeBoard";
import GraduatedBoard from "./pages/GraduatedBoard";
import NoticeBoard from "./pages/NoticeBoard";
import MapPage from "./pages/MapPage";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/free-board" element={<FreeBoard />} />
                <Route path="/graduated" element={<GraduatedBoard />} />
                <Route path="/notice" element={<NoticeBoard />} />
                <Route path="/map" element={<MapPage />} />
            </Routes>

            <Footer />  {/* 회색 footer -> 맨 아래에 추가 */}
        </Router>
    );
}

export default App;
