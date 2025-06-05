import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "./auth/UserContext";
import "./AddPost.css"

function AddPost() {
    const { user } = useUserState();
    const userId = user ? user.id : "";
    const [boardType, setBoardType] = useState("free");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(true);
    const navigate = useNavigate();

    console.log("user in AddPost:", user);

    // 제목 값 업데이트
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    // 내용 값 업데이트
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };
    /*이미지 업로드*/
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };
    // 게시글 정보 업데이트
    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("user in AddPost:", user);

        if(!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        } else if(!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        const newPost = {
            title: title,
            content: content,
            author: isAnonymous ? "익명" : user.username,
            category: boardType,
            user_id: user ? user.user_id : "",
            likes: 0,
            image: image || "",
        };

        try {
            const response = await fetch("http://localhost:5000/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newPost),
            });

            const result = await response.json();
            if(response.ok) {
                alert("게시글 작성 완료");
                navigate("/main");
            } else {
                alert("게시글 작성 실패:" + result.error);
            }
        } catch (error) {
            alert("서버 연결 실패: " + error.message);
        }

        /*게시판 종류*/
        const key = boardType === "grad" ? "gradPosts" : "freePosts";
        const existing = JSON.parse(localStorage.getItem(key)) || [];
        localStorage.setItem(key, JSON.stringify([newPost, ...existing]));
        /*게시글의 게시판 타입이 자유게시판이면 자유게시판 페이지로 이동, 아니면 졸업게시판 페이지로 이동*/
        if(boardType==="grad"){
            navigate("/graduated");
        } else{
            navigate("/free-board");
        }

    };

    return (
        <div className="post">
            <h2>게시글 작성</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <select value={boardType} onChange={(e) => setBoardType(e.target.value)}>
                        <option value="free">자유게시판</option>
                        <option value="grad">졸업게시판</option>
                    </select>

                    <div>
                        <label>
                            <input type="radio" name="authType" checked={isAnonymous} onChange={() => setIsAnonymous(true)} />
                            익명
                        </label>
                        <label>
                            <input type="radio" name="authType" checked={!isAnonymous} onChange={() => setIsAnonymous(false)} />
                            아이디
                        </label>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="제목을 입력해주세요."
                            value={title}
                            onChange={handleChangeTitle}
                            maxLength={100} // 글자수를 100자로 제한
                            required /* 미입력 시 넘어가기 불가 */
                        />
                    </div>
                    <div>
                        <textarea placeholder="내용을 입력해주세요."
                                  value={content}
                                  onChange={handleChangeContent}
                                  required /* 미입력 시 넘어가기 불가 *//>
                    </div>
                    <div>
                        <input type="file" accept="image/*" onChange={handleImageUpload}/>
                    </div>
                    <div>
                        <button>작성 완료</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default AddPost;