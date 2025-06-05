export const formatTime = (timestamp) => { // 게시글 작성 시간 (당일이면 작성 시간, 당일이 아니면 작성 날짜를 표시)
    const now = new Date();
    const date = new Date(timestamp);
    const isToday = now.toDateString() === date.toDateString();
    return isToday
        ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : date.toLocaleDateString();
};

export const getCommentCount = (type, postId) => { // 댓글 갯수
    const comments = JSON.parse(localStorage.getItem(`comments_${type}_${postId}`)) || [];
    return comments.length;
};

export const savePostsToStorage = (key, posts, setPosts) => { // 게시글 저장
    const fixed = posts.map((p) => ({ ...p, likes: p.likes || 0 }));
    localStorage.setItem(key, JSON.stringify(fixed));
    setPosts(fixed);
};