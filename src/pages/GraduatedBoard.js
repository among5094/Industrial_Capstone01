import './GraduatedBoard.css'; // 스타일 파일 불러오기

function GraduatedBoard() {
    return (
        <div className="graduated-board"> {/* ✅ 여기 className 변경 */}
            <h1 className="title">졸업생 게시판</h1>
            <p>졸업생과 재학생이 소통할 수 있는 게시판입니다.</p>
        </div>
    );
}

export default GraduatedBoard;
