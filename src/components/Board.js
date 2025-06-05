import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTime, getCommentCount} from "../utils/Postutil";
import {useUserState} from "../pages/auth/UserContext";
import "./Board.css";

function Board({ boardKey, boardType, title, description }) {
    const { user } = useUserState();
    const userId = user ? user.id : ""; // 유저의 id 불러오기
    const likeStorageKey = `liked_${userId}`;

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("new");

    const likedPostIds = JSON.parse(localStorage.getItem(likeStorageKey)) || []; // localStorage에 좋아요 데이터 저장
    const navigate = useNavigate();

    useEffect(() => {

        //const saved = JSON.parse(localStorage.getItem(boardKey)) || [];
        //setPosts(saved);

        fetch(`http://localhost:5000/api/posts?boardType=${boardType}`)
            .then((res) => res.json())
            .then((data) => {
                const sorted = data.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(sorted);
            })
            .catch((err) => console.error("게시글 불러오기 실패", err));
    }, [boardKey]);

    const handleClickPost = (id) => { // 게시글 상세페이지로 이동
        navigate(`/post/${id}?type=${boardType}`);
    };

    const getLikeIcon = (postId) => // 좋아요 버튼 아이콘
        likedPostIds.includes(postId) ? "❤️" : "🤍";

    const filteredPosts = posts  // 게시글 정렬(최신순, 인기순)
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === "new") return b.createdAt - a.createdAt;
            if (sort === "popular") return b.likes - a.likes;
            return 0;
        });

    return (
        <div className="board">
            <h1 className="title">{title}</h1>
            <p>{description}</p>

            <div>
                <button onClick={() => navigate("/write")}>글 작성</button>
            </div>
            {/* 게시글 검색 */}
            <div>
                <input
                    type="text"
                    placeholder="검색어 입력"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="new">최신순</option>
                    <option value="popular">인기순</option>
                </select>
            </div>
            {/* 게시글 리스트 */}
            <ul className="post-list">
                {filteredPosts.map((post) => (
                    <li key={post.id} onClick={() => handleClickPost(post.id)}>
                        <div>
                            <p>{post.title}</p>
                            <p>{post.content}</p>
                            <div className="userinfo">
                                {post.author} · {formatTime(post.createdAt)} ·{" "}
                                {getLikeIcon(post.id)} {post.likes || 0} · 💬{" "}
                                {getCommentCount(boardType, post.id)}
                            </div>
                        </div>
                        {/* 정렬을 위해 항상 이미지 영역이 존재하도록 렌더링 */}
                        <div>
                            {post.image ? (
                                <img src={post.image} alt="썸네일" className="post-img" />
                            ) : (
                                <div style={{ width: "80px", height: "80px" }} />  // 빈 공간
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Board;
