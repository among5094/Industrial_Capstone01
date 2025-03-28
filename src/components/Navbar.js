
/* 페이지 이동과 현재 위치 확인을 위한 함수 */
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    // 현재 경로를 가져오는 훅
    const location = useLocation();

    // 현재 경로에 따라 링크 스타일을 다르게 적용
    const linkStyle = (path) =>
        location.pathname === path ? "nav-link active" : "nav-link";

    return (
        <nav className="navbar"> {/* 전체 네비게이션 바 컨테이너 */}

            {/* 왼쪽 상단 로고 이미지 */}
            <div className="logo-section">
                <Link to="/"> {/* 로고 클릭 시 메인페이지로 이동 */}
                    <img src="/PaiChaiLogoCircle.png" alt="우리학교 로고" className="logo-img" />
                </Link>
            </div>


            {/* 가운데 메뉴 탭들 */}
            <div className="nav-links">
                <Link to="/" className={linkStyle("/main-page")}> {/* 홈 버튼 */}
                    홈
                </Link>
                <Link to="/free-board" className={linkStyle("/free-board")}> {/* 자유게시판 이동 */}
                    자유게시판
                </Link>
                <Link to="/graduated" className={linkStyle("/graduated")}> {/* 졸업생 게시판 이동 */}
                    졸업생 게시판
                </Link>
                <Link to="/notice" className={linkStyle("/notice")}> {/* 대외활동 공지 이동 */}
                    대외활동 공지
                </Link>
                <Link to="/map" className={linkStyle("/map")}> {/* 캠퍼스맵 이동 */}
                    캠퍼스맵
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
