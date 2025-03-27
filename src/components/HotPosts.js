import './HotPosts.css';

function HotPosts() {
    const posts = [
        { title: "4시간 수업 한 번 빠지면 결석?", board: "자유게시판" },
        { title: "인터 고준희짤 주소", board: "졸업생게시판" },
        { title: "학식 후기 모음", board: "자유게시판" },
    ];

    return (
        <div className="hot-posts">
            <h3>🔥 실시간 인기글</h3>
            <ul>
                {posts.map((post, idx) => (
                    <li key={idx}>
                        <strong>[{post.board}]</strong> {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HotPosts;
