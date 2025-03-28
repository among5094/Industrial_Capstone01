import './HotPosts.css';

function HotPosts() {
    const posts = [

        // 게시글 데이터 배열 (게시판 이름 + 글 제목)
        { title: "4시간 수업 한 번 빠지면 결석?", board: "자유게시판" },
        { title: "인터 고준희짤 주소", board: "졸업생게시판" },
        { title: "학식 후기 모음", board: "자유게시판" },
    ];

    return (
        <div className="hot-posts">
            <h3>🔥 실시간 인기글</h3> {/* 전체 인기글 박스 */}
            <ul>
                {/* 게시글 리스트를 반복 렌더링 */}
                {posts.map((post, idx) => (
                    <li key={idx}> {/* 리액트가 각 요소를 효율적으로 추적하기 위해 필요한 고유 식별자 */}
                        <strong>[{post.board}]</strong> {post.title} {/* 게시판명을 강조해서 보여주기 */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HotPosts;
