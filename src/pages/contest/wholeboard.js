import React, { useState } from 'react';
import PostCard from './postcard';
import { useNavigate } from 'react-router-dom';
import './style/wholeboard.css';

function WholeBoard({ posts, sortOption }) {
    const [currentPage, setCurrentPage] = useState(1); //  현재 페이지 상태
    const postsPerPage = 20;  // 페이지당 게시글 수
    const navigate = useNavigate();

    // 정렬 처리 (최신순 / 마감순 / 인기순)
    const sortedPosts = [...posts].sort((a, b) => {
        if (sortOption === '최신순') return b.id - a.id;
        if (sortOption === '마감순') return new Date(a.deadlineEnd || a.deadline) - new Date(b.deadlineEnd || b.deadline);
        if (sortOption === '인기순') return (b.views || 0) - (a.views || 0);
        return 0;
    });

    //  현재 페이지에 표시할 게시글 범위 계산
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    //  페이지 번호 클릭
    const handleClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="wholeboard-container">

            {/* 게시글 카드 리스트 (현재 페이지 기준) */}
            <div className="card-grid">
                {currentPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onClick={() => navigate(`/post/${post.id}`)}
                    />
                ))}
            </div>

            {/*  페이지 쪽수 */}
            <div className="pagination">

                {/* 이전 페이지 버튼 */}
                <button disabled={currentPage === 1} onClick={() => handleClick(currentPage - 1)}>
                    &lt;
                </button>

                {/* 페이지 번호 버튼 */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => handleClick(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* 다음 페이지 버튼 */}
                <button disabled={currentPage === totalPages} onClick={() => handleClick(currentPage + 1)}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default WholeBoard;