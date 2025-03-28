import './FreeBoard.css'; // 우리가 만든 CSS

function FreeBoard() {
    return (
        <div className="free-board"> {/* 자유게시판 전체 영역 컨테이너 */}
            <h1 className="title">자유게시판</h1> {/* 제목 텍스트 */}
            <p>여기는 자유롭게 이야기를 나눌 수 있는 공간입니다.</p> {/* 설명 문구 */}
        </div>
    );
}

export default FreeBoard;
