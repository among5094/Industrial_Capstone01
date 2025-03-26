import './MainPage.css';

function MainPage() {
    return (

        <div className="main-page">
            {/* 👉 중앙 상단 배너 이미지 */}
            <div className="main-banner">
                <img src="/ExBanner01.png" alt="광고 배너" className="banner-img" />

            </div>

            {/* 이후 사용자 카드나 인기 게시글 컴포넌트가 여기에 들어감 */}
        </div>
    );
}

export default MainPage;
