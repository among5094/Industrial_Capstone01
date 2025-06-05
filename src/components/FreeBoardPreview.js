import { useEffect, useState } from "react";
import  { Link } from "react-router-dom";
import './FreeBoardPreview.css';
//css 추가

function FreeBoardPreview() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/api/posts?type=free")
            .then(res => {
                if(!res.ok) throw new Error("게시글 데이터를 불러오는데 실패했습니다.");
                return res.json();
            })
            .then(data => {
                const sortedPosts = data
                    .filter(posts => posts.category == "free")
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3);
                setPosts(sortedPosts);
            })
            .catch(err => {
                console.error(err);
                setPosts([]);
            });
    }, []);

    return (
        <div className="preview-section">
            <h3>자유게시판</h3>
            <ul>
                {posts.map((posts) => (
                    <li key={posts.id}>
                        <Link to={`/post/${posts.id}?type=free`} className="post-link">{posts.title}</Link>
                    </li>))}
            </ul>
        </div>
    );
}
export default FreeBoardPreview;