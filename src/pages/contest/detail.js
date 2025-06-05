import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style/detail.css';
import ImageViewer from '../../components/ImageViewer';


function Detail({ posts }) {
    const { id } = useParams();
    const post = posts.find(p => p.id === Number(id));
    const [isScrapped, setIsScrapped] = useState(false);
    const [scrapCount, setScrapCount] = useState(0);

    useEffect(() => {
        if (post) {
            const savedScraps = JSON.parse(localStorage.getItem("scraps") || "[]");
            const scrapInfo = JSON.parse(localStorage.getItem("scrapCounts") || "{}");

            if (savedScraps.includes(post.id)) {
                setIsScrapped(true);
            }
            setScrapCount(scrapInfo[post.id] || 0);
        }
    }, [post]);

    const toggleScrap = () => {
        let saved = JSON.parse(localStorage.getItem("scraps") || "[]");
        let scrapInfo = JSON.parse(localStorage.getItem("scrapCounts") || "{}");

        if (isScrapped) {
            saved = saved.filter(pid => pid !== post.id);
            scrapInfo[post.id] = Math.max((scrapInfo[post.id] || 1) - 1, 0);
        } else {
            if (!saved.includes(post.id)) {
                saved.push(post.id);
                scrapInfo[post.id] = (scrapInfo[post.id] || 0) + 1;
            }
        }

        localStorage.setItem("scraps", JSON.stringify(saved));
        localStorage.setItem("scrapCounts", JSON.stringify(scrapInfo));
        setScrapCount(scrapInfo[post.id]);
        setIsScrapped(!isScrapped);
    };

    const calculateDday = (end) => {
        if (!end) return 'D-?';
        const cleaned = end.replace(/[\n월일\s]/g, '-').replace(/--+/g, '-').replace(/-$/, '');
        const endDate = new Date(cleaned);
        if (isNaN(endDate)) return 'D-?';
        const today = new Date();
        const diff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        return diff < 0 ? '마감' : `D-${diff}`;
    };

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div style={{ maxWidth: 1200, margin: '40px auto', padding: 20, display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
            {/* 왼쪽: 제목, 날짜, 내용 */}
            <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10}}>
                    <span
                        className={`dday-badge ${calculateDday(post.deadlineEnd || post.deadline) === '마감' ? 'closed' : ''}`}>
                        {calculateDday(post.deadlineEnd || post.deadline)}
                    </span>
                    <span>{post.deadlineStart} ~ {post.deadlineEnd}</span>
                </div>

                <h2>{post.title}</h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <p><strong>조회수:</strong> {post.views}</p>
                    <div className="category-box">
                        <span className="label">카테고리:</span>
                        <span className="category-badge">{post.category}</span>
                    </div>
                </div>

                <hr className="divider"/>
                <p className="main-content"><strong>내용:</strong></p>
                <p className="main-content-body" style={{whiteSpace: 'pre-wrap'}}>{post.content}</p>

                {/* 스크랩 박스 - 본문 하단 오른쪽 */}
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                    <div className="scrap-box" onClick={toggleScrap}>
                        <div className="scrap-icon">
                            <img
                                src={isScrapped ? require('../../image/bookmark.png') : require('../../image/enbookmark.png')}
                                alt="스크랩"
                            />
                        </div>
                        <div className="scrap-count">{scrapCount}</div>
                    </div>
                </div>
            </div>

            {/* 오른쪽: 이미지 + 상세 정보 */}
            <div style={{width: 1, height: '100%', backgroundColor: '#ccc'}}></div>

            <div style={{flex: 1}}>
                <ImageViewer src={post.imageUrl} alt={post.title} style={{marginBottom: 20}}/>

                <div className="detail-box">
                    <h3 className="detail-title"> 상세 정보</h3>
                    <div className="detail-two-columns">
                        <div className="column">
                            <div className="item"><strong>기업 형태</strong> {post.orgType || '-'}</div>
                            <div className="item">
                                <strong>접수 기간</strong><br />
                                시작일 | {post.deadlineStart || '-'}<br />
                                마감일 | {post.deadlineEnd || '-'}
                            </div>
                            {post.recruitCount && (
                                <div className="item"><strong>모집 인원</strong> {post.recruitCount}</div>
                            )}
                            {post.benefit && (
                                <div className="item"><strong>활동 혜택</strong> {post.benefit}</div>
                            )}
                        </div>
                        <div className="column">
                            <div className="item"><strong>참여 대상</strong> {post.target || '-'}</div>
                            <div className="item">
                                <strong>활동 기간</strong><br />
                                시작일 | {post.activityStart || '-'}<br />
                                마감일 | {post.activityEnd || '-'}
                            </div>
                            {post.region && (
                                <div className="item"><strong>활동 지역</strong> {post.region}</div>
                            )}
                            <div className="item">
                                <strong>홈페이지 </strong>
                                <a href={post.homepage} target="_blank" rel="noopener noreferrer">
                                    {post.homepage}
                                </a>
                            </div>
                            {post.category === '대외활동' && (
                                <div className="item">
                                    <strong>모집 인원</strong> {post.recruitCount || '-'}
                                </div>
                            )}
                            {post.category === '공모전' && (
                                <div className="item">
                                    <strong>시상 규모</strong> {post.awardScale || '-'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
