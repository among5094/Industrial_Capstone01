import './GraduatedBoard.css'; // 스타일 파일 불러오기

function GraduatedBoard() {
    return (
        <div className="graduated-board">  {/* 졸업생 게시판 전체 영역을 감싸는 컨테이너 */}
            <h1 className="title">졸업생 게시판</h1> {/* 게시판 제목 */}
            <p>졸업생과 재학생이 소통할 수 있는 게시판입니다.</p> {/* 간단한 설명 문구 */}
        </div>
    );
}

export default GraduatedBoard;
