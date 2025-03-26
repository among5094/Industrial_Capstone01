// NoticeBoard.js - 대외활동 공지 게시판 컴포넌트
import './NoticeBoard.css'; // 스타일 시트 불러오기

function NoticeBoard() {
    return (
        // 전체 페이지 레이아웃 - 배경색, 높이 등은 CSS에서 적용
        <div className="notice-board">
            {/* 페이지 제목 */}
            <h1 className="title">대외활동 공지</h1>

            {/* 설명 문구 */}
            <p>교내외 대회, 공모전, 행사 등의 정보를 확인할 수 있는 게시판입니다.</p>
        </div>
    );
}

export default NoticeBoard;
