import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/postcard.css';
// import axios from 'axios'; //  조회수 증가용

// 한글 날짜 문자열을 Date 객체로 변환
function parseKoreanDate(dateStr) {
    if (!dateStr) return null;
    const match = dateStr.match(/(\d{4})년 (\d{2})월 (\d{2})일/);
    if (!match) return new Date(dateStr);
    return new Date(`${match[1]}-${match[2]}-${match[3]}`);
}

// D-Day 계산
function getDDay(deadlineStr) {
    const now = new Date();
    const end = parseKoreanDate(deadlineStr);
    if (!end || isNaN(end)) return 'D-?';
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? `D-${diff}` : '종료됨';
}

function PostCard({ post }) {
    const navigate = useNavigate();

    const deadline = post.deadlineEnd || post.deadline;

    // D-day 숫자 계산
    const dDayNum = (() => {
        const now = new Date();
        const end = parseKoreanDate(deadline);
        if (!end || isNaN(end)) return NaN;
        return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    })();

    // 텍스트로 보여줄 D-day 값 (마감 여부 포함)
    const dDayText = isNaN(dDayNum)
        ? 'D-?'
        : dDayNum < 0
            ? '마감'
            : `D-${dDayNum}`;

    const isRecommended = post.views >= 600;

    // 🔥 HOT 조건
    const isHot = (() => {
        const createdAt = new Date(post.createdAt);
        const now = new Date();
        const daysSince = (now - createdAt) / (1000 * 60 * 60 * 24);
        return post.views >= 300 && dDayNum <= 5 && daysSince <= 7;
    })();

    const handleClick = async () => {
        try {
            // 서버 연결되면 아래 주석 해제
            // await axios.patch(`http://localhost:5000/api/posts/${post.id}/views`);

            navigate(`/contest/${post.id}`);
        } catch (error) {
            console.error('조회수 증가 실패:', error);
            navigate(`/contest/${post.id}`);
        }
    };

    return (
        <div className="post-card" onClick={handleClick} style={{ cursor: 'pointer', position: 'relative' }}>
            {/* 추천 뱃지 */}
            {isRecommended && (
                <div className="pick-ribbon">배재 PICK</div>
            )}

            {/* HOT 뱃지 */}
            {isHot && (
                <div className="hot-badge">🔥 HOT</div>
            )}

            <img src={post.imageUrl} alt={post.title} />
            <span className="tag">{post.category}</span>

            <h4>{post.title}</h4>

            <div className="meta">
                <span className={`dday ${!isNaN(dDayNum) && dDayNum <= 5 ? 'urgent' : ''} ${dDayNum < 0 ? 'closed' : ''}`}>
                    {dDayText}
                </span>
                <span className="author">{post.author || '작성자 미지정'}</span>
                <span className="views">조회수 {post.views}</span>
            </div>
        </div>
    );
}

export default PostCard;
