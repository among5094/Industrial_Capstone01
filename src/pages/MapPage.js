import './MapPage.css'; // 스타일 불러오기

function MapPage() {
    return (
        <div className="map-page">  {/* 캠퍼스맵 페이지 전체 영역 컨테이너 */}
            <h1 className="title">캠퍼스맵</h1> {/* 페이지 제목 */}
            <p>학교 건물 위치와 약어를 쉽게 확인할 수 있습니다.</p> {/* 설명 문구 */}
        </div>
    );
}

export default MapPage;
