import Board from "../components/Board";    /*게시판 컴포넌트*/

function GraduatedBoard() {
    return (
        <Board
            boardKey="gradPosts"
            boardType="grad"
            title="졸업생 게시판"
            description="졸업생과 재학생이 소통할 수 있는 게시판입니다."
        />
    );
}

export default GraduatedBoard;