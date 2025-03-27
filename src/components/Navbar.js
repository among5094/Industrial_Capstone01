import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const location = useLocation();

    const linkStyle = (path) =>
        location.pathname === path ? "nav-link active" : "nav-link";

    return (
        <nav className="navbar">
            {/* 왼쪽 상단 로고 이미지 */}
            <div className="logo-section">
                <Link to="/">
                    <img src="/PaiChaiLogoCircle.png" alt="우리학교 로고" className="logo-img" />
                </Link>
            </div>

            {/* 가운데 메뉴 탭들 */}
            <div className="nav-links">
                <Link to="/" className={linkStyle("/main-page")}>
                    홈
                </Link>
                <Link to="/free-board" className={linkStyle("/free-board")}>
                    자유게시판
                </Link>
                <Link to="/graduated" className={linkStyle("/graduated")}>
                    졸업생 게시판
                </Link>
                <Link to="/notice" className={linkStyle("/notice")}>
                    대외활동 공지
                </Link>
                <Link to="/map" className={linkStyle("/map")}>
                    캠퍼스맵
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
