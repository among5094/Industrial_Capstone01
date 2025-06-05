import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './postcard';
import './style/activityboard.css';
import WholeBoard from './wholeboard';

function ActivityBoard({ posts }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('전체');
    const [filter, setFilter] = useState('최신순');
    const navigate = useNavigate();

    //  필터링된 전체 게시글 (카테고리 + 검색어)
    const filteredPosts = posts.filter(post =>
        (category === '전체' || post.category === category) &&
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //  마감 임박 게시글 (D-7 이내)
    const upcomingPosts = posts
        .filter(post => category === '전체' || post.category === category)
        .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(post => {
            const today = new Date();
            const deadline = new Date(post.deadlineEnd);
            if (isNaN(deadline)) return false;
            const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
            return diff <= 7 && diff >= 0;
        })
        .sort((a, b) => new Date(a.deadlineEnd) - new Date(b.deadlineEnd))
        .slice(0, 5);

    return (
        <div className="activity-container">
            {/*  검색창 */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/*  카테고리 탭 */}
            <div className="tabs category-tabs">
                {['전체', '대외활동', '공모전'].map(cat => (
                    <button
                        key={cat}
                        className={category === cat ? 'active' : ''}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/*  마감 임박순 */}
            <div className="section-box">
                <h2 className="section-title">마감 임박순</h2>
                <div className="card-list">
                    {upcomingPosts.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onClick={() => navigate(`/contest/${post.id}`)}
                        />
                    ))}
                </div>
            </div>

            {/*  전체 게시글 헤더 - 검색결과 + 정렬 */}

            <h2 className="board-title">{category}</h2>

            <div className="wholeboard-header">
                <div className="result-summary">
                    검색결과 {filteredPosts.length}건
                </div>
                <div className="filter-dropdown">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="최신순">최신순</option>
                        <option value="마감순">마감순</option>
                        <option value="인기순">인기순</option>
                    </select>
                </div>
            </div>

            {/*  전체 게시글 카드 렌더링 */}
            <WholeBoard
                posts={filteredPosts}
                sortOption={filter}
            />

            {/* ➕ 글쓰기 버튼 */}
            <button className="write-button" onClick={() => navigate('/contest/write')}>
                +
            </button>
        </div>
    );
}

export default ActivityBoard;
