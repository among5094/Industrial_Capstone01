import './MainPage.css';
import UserCard from '../components/UserCard';  // 사용자 카드 컴포넌트 불러오기
import HotPosts from '../components/HotPosts';  // 인기 게시글 컴포넌트 불러오기
import AutoSlider from '../components/AutoSlider'; // 자동 슬라이드 배너 컴포넌트 불러오기
import Footer from '../components/Footer'; // 하단 푸터 컴포넌트 불러오기
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import FreeBoardPreview from '../components/FreeBoardPreview'; // 자유게시판 미리보기
import GraduatedBoardPreview from '../components/GraduatedBoardPreview'; // 졸업게시판 미리보기

function MainPage() {
    return (
        <div className="main-page">  {/* 메인 페이지 전체 레이아웃 컨테이너 */}

            {/* 히어로 이미지 추가 */}
            <div className="hero-image-wrapper no-gap">
                <img
                    src="/PaiChai_top_img.jpg"
                    alt="배재대학교 킴스가든"
                    className="hero-image"
                />
            </div>

            {/* 사용자 카드  */}
            <div className="main-content">
                <UserCard/>

                <div className="scholarship-banner">
                    <img src="/banner05.PNG" alt="장학금 배너" className="scholarship-image"/>
                </div>


            </div>

            {/* 세로 배너(try01)
            <div className="banner-container">
                <img src="/ExBanner03.jpg" alt="배너1" className="side-banner" />
                <img src="/ExBanner04.jpg" alt="배너2" className="side-banner" />
            </div> */}

            {/* 장학금 배너 이미지 추가
            <div className="scholarship-banner">
                <img src="/banner05.PNG" alt="장학금 배너" className="scholarship-image" />
            </div> */}


                {/* 미리보기 게시판  */}
                <div className="preview-box">
                    <FreeBoardPreview />
                    <GraduatedBoardPreview />
                </div>
                
                {/* 자동 슬라이드 배너 */}
                <AutoSlider />

                {/* 실시간 인기 배너 */}

        </div>
    );
}

export default MainPage;
