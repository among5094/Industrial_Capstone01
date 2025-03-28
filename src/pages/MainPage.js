
import './MainPage.css';
import UserCard from '../components/UserCard';  // 사용자 카드 컴포넌트 불러오기
import HotPosts from '../components/HotPosts';  // 인기 게시글 컴포넌트 불러오기
import AutoSlider from '../components/AutoSlider'; // 자동 슬라이드 배너 컴포넌트 불러오기
 import Footer from '../components/Footer'; // 하단 푸터 컴포넌트 불러오기

function MainPage() {
    return (

        /* 사용자 카드 + 인기글 박스 */
        <div className="main-page">  {/* 메인 페이지 전체 레이아웃 컨테이너 */}
            <AutoSlider />

            {/* 사용자 카드 + 인기글 박스 */}
            <div className="main-content">
                <UserCard /> {/* 사용자 정보 카드 */}
                <HotPosts /> {/* 실시간 인기글 목록 */}
            </div>

            {/* 하단 고정 배너 추가 */}
            <div className="bottom-banner">
                <img src="/.png" alt="하단 배너" className="bottom-banner-img" /> {/* 하단 배너 이미지 (경로 수정 필요) */}
            </div>

        </div>
    );
}

export default MainPage;
