import {useParams, useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserState} from "./auth/UserContext";
import "./PostDetail.css"
import {formatTime} from "../utils/Postutil";

function PostDetail() { // 게시글 상세페이지
    const navigate = useNavigate();
    const {user} = useUserState();
    const userId = user ? user.id : "";

    const { id } = useParams(); // 게시글 아이디
    const location = useLocation();
    const boardType = new URLSearchParams(location.search).get("type") || "free";
    const storageKey = boardType === "grad" ? "gradPosts" : "freePosts";
    const commentKey = `comments_${boardType}_${id}`;

    //좋아요 기능
    const [hasLiked, setHasLiked] = useState(false);
    const likeStorageKey = `liked_${userId}`;

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);  // 익명 체크 상태

    useEffect(() => {

        fetch(`http://localhost:5000/api/posts/${id}`)
            .then(res => {
                if(!res.ok) throw new Error("게시글을 불러오는데 실패했습니다.");
                return res.json();
            })
            .then(data => {
                setPost(data);
            })
            .catch(err => {
                console.error(err);
                setPost(null);
            });

        const savedComments = JSON.parse(localStorage.getItem(commentKey)) || [];
        setComments(savedComments);

        const likedPostIds = JSON.parse(localStorage.getItem(likeStorageKey)) || []; // 추가
        setHasLiked(likedPostIds.includes(Number(id)));

    }, [id, boardType, storageKey, commentKey, likeStorageKey]); // likeStorageKey 추가

    const handleDeletePost = () => {    // 게시글 삭제
        if (!window.confirm("이 게시글을 삭제하시겠습니까?")) return;
        const posts = JSON.parse(localStorage.getItem(storageKey)) || [];
        const updated = posts.filter((p) => p.id !== Number(id));
        localStorage.setItem(storageKey, JSON.stringify(updated));
        if(boardType==="grad"){
            navigate("/graduated");
        } else{
            navigate("/free-board");
        }
    };

    //좋아요 처리 함수
    const handleLike = () => {
        const posts = JSON.parse(localStorage.getItem(storageKey)) || [];
        const updatedPosts = posts.map((p) => {
            if (p.id === Number(id)) {
                const liked = JSON.parse(localStorage.getItem(likeStorageKey)) || [];
                const hasLikedBefore = liked.includes(p.id);

                if (hasLikedBefore) {
                    // 좋아요 취소
                    localStorage.setItem(
                        likeStorageKey,
                        JSON.stringify(liked.filter(pid => pid !== p.id))
                    );
                    return { ...p, likes: Math.max((p.likes || 1) - 1, 0) };
                } else {
                    // 좋아요 추가
                    localStorage.setItem(
                        likeStorageKey,
                        JSON.stringify([...liked, p.id])
                    );
                    return { ...p, likes: (p.likes || 0) + 1 };
                }
            }
            return p;
        });

        localStorage.setItem(storageKey, JSON.stringify(updatedPosts));
        const found = updatedPosts.find(p => p.id === Number(id));
        setPost(found);
        setHasLiked(!hasLiked);
    };

    const handleAddComment = async (e) => { // 댓글 작성
        if (!newComment.trim()) return;

        let finalAuthor = userId;

        if (isAnonymous) {
            // 기존 댓글 중 익명 댓글만 필터링하여, 가장 큰 익명 번호를 찾음
            const existingAnonymousComments = comments
                .filter(comment => comment.author.startsWith('익명'))
                .map(comment => parseInt(comment.author.replace('익명', ''), 10))
                .filter(n => !isNaN(n));

            const maxAnonymousNumber = existingAnonymousComments.length > 0
                ? Math.max(...existingAnonymousComments)
                : 0;
            // 가장 큰 익명 번호를 기준으로 1씩 증가시켜 부여
            const newAnonymousNumber = maxAnonymousNumber + 1;
            finalAuthor = `익명${newAnonymousNumber}`;
        }

        // 익명 여부에 따른 작성자 ID 설정
        const newCommentData = {
            user_id: userId, // 유저 고유 id
            post_id: id,   // 게시글 고유 id
            author: finalAuthor,  // 익명일 경우 작성자명
            contetnt: newComment,  // 댓글 내용
        };

        const updated = [...comments, newCommentData];
        localStorage.setItem(commentKey, JSON.stringify(updated));  // 댓글 정보 데이터를 localStorage에 저장
        setComments(updated);

        setNewComment("");  // 댓글창 초기화
    };

    const handleDeleteComment = (commentId) => {    // 댓글 삭제
        const updated = comments.filter((c) => c.id !== commentId);
        localStorage.setItem(commentKey, JSON.stringify(updated));
        setComments(updated);
    };

    if (!post) return <div>게시글을 찾을 수 없습니다.</div>; // 게시글이 없으면

    return (
        <div className="postDetail">
            <div className="postTitle">
                {post.title}
            </div>
            <div className="postUserinfo">
                {post.author} · {formatTime(post.createdAt)}
            </div>
            <div className="postContent">
                <p>{post.content}</p>
            </div>
            <div className="postDetail-img">
                {post.image && <img src={post.image} alt="첨부 이미지"/>}
            </div>
            {/* 게시글 작성자와 현재 로그인 유저 아이디가 같으면 삭제 버튼 표시 */}
            {post.userId === userId && (
                <div>
                    <button
                        onClick={handleDeletePost}
                    >
                        삭제
                    </button>
                </div>
            )}

            {/*여기부터*/}
            <div>
                <button
                    onClick={handleLike}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: hasLiked ? "red" : "black",
                    }}
                >
                    {hasLiked ? "❤️" : "🤍"} {post.likes || 0}
                </button>
            </div>
            {/*여기까지 좋아요 버튼*/}

            <div className="commentBox">
                <div className="comment">
                    {/* 익명 여부 체크박스 */}
                    <label>
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                        익명
                    </label>
                    <textarea
                        value={newComment}
                        onChange={(e) => {
                            setNewComment(e.target.value);
                            /* 입력칸 크기 자동 조절 */
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        placeholder="댓글을 입력하세요"
                        maxLength={300} // 글자수를 300자로 제한
                    />
                    <button
                        onClick={handleAddComment}
                    >
                        작성
                    </button>
                </div>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            {/* [닉네임(또는 익명)] [댓글내용] */}
                            <span>
                                <span className="comment-author">{comment.author}</span> <span className="comment-text">{comment.text}</span>
                            </span>
                            {/* 댓글작성자의 실제 아이디와 현재 로그인 유저의 아이디가 같으면 삭제 버튼 표시 */}
                            {comment.authorId === userId && (
                                <button
                                    onClick={() => handleDeleteComment(comment.id)}
                                >
                                    삭제
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PostDetail;