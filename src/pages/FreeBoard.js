import Board from "../components/Board"; /*게시판 컴포넌트*/

function FreeBoard() {
    return (
        <Board
            boardKey="freePosts"
            boardType="free"
            title="자유게시판" // 게시판 제목
            description="여기는 자유롭게 이야기를 나눌 수 있는 공간입니다." // 간단한 설명 문구
        />
    );
}

export default FreeBoard;

