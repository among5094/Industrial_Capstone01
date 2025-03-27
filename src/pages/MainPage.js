
import './MainPage.css';
import UserCard from '../components/UserCard';
import HotPosts from '../components/HotPosts';
import AutoSlider from '../components/AutoSlider';
 import Footer from '../components/Footer';

function MainPage() {
    return (

        /* 사용자 카드 + 인기글 박스 */
        <div className="main-page">
            <AutoSlider />

            {/* 사용자 카드 + 인기글 박스 */}
            <div className="main-content">
                <UserCard />
                <HotPosts />
            </div>

            {/* 하단 고정 배너 추가 */}
            <div className="bottom-banner">
                <img src="/.jpg" alt="하단 배너" className="bottom-banner-img" />
            </div>

        </div>
    );
}

export default MainPage;
