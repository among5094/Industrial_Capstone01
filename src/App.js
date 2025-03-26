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
        </Router>
    );
}

export default App;
