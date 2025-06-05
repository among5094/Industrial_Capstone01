import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/writepage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';


const koreanLocale = ko;

//  기본 입력 상태값
function WritePage({ setPosts }) {
    const navigate = useNavigate();
    const [category, setCategory] = useState('대외활동');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // 나중에 서버에 이미지 업로드할 계획
    const [preview, setPreview] = useState(null); // 이미지 미리보기

    // 공통 입력값
    const [orgType, setOrgType] = useState('');
    const [target, setTarget] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [homepage, setHomepage] = useState('');
    const [field, setField] = useState('');
    const [benefit, setBenefit] = useState('');
    const [activityStart, setActivityStart] = useState(null);
    const [activityEnd, setActivityEnd] = useState(null);
    const [location, setLocation] = useState('');

    // 조건부 입력값
    const [recruitCount, setRecruitCount] = useState('');
    const [awardScale, setAwardScale] = useState('');

    // 이미지 업로드 및 미리보기
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // 등록 버튼 클릭
    const handleSubmit = () => {
        if (!title || !content) {
            alert('제목과 내용을 입력해주세요!');
            return;
        }

        // 게시글 객체 구성
        const newPost = {
            id: Date.now(),
            title,
            content,
            category,
            deadlineStart: startDate ? format(startDate, 'yyyy-MM-dd') : '',
            deadlineEnd: endDate ? format(endDate, 'yyyy-MM-dd') : '',
            activityStart: activityStart ? format(activityStart, 'yyyy-MM-dd') : '',
            activityEnd: activityEnd ? format(activityEnd, 'yyyy-MM-dd') : '',
            location,
            imageUrl: preview || require('../../image/paichai2.png'),
            views: 0,
            author: '익명',
            orgType,
            target,
            homepage,
            field,
            benefit,
            ...(category === '대외활동' && { recruitCount }),
            ...(category === '공모전' && { awardScale }),
        };

        console.log("등록 데이터:", newPost);
        setPosts(prevPosts => [newPost, ...prevPosts]);
        alert('글이 등록되었습니다!');
        navigate('/');
    };

    return (
        <div className="write-container">
            <h2>글쓰기</h2>

            <label>카테고리</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="대외활동">대외활동</option>
                <option value="공모전">공모전</option>
            </select>

            {/* 제목 & 내용 */}
            <label>제목</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
            />

            <label>내용</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
            />

            {/* 공통 입력값 */}
            <label>기업 형태</label>
            <input value={orgType} onChange={(e) => setOrgType(e.target.value)} placeholder="예: 공공기관"/>

            <label>참여 대상</label>
            <input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="예: 대학생"/>

            <label>접수 시작일</label>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="날짜를 선택하세요"
                className="custom-datepicker"
                locale={ko}
            />

            <label>접수 마감일</label>
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="날짜를 선택하세요"
                className="custom-datepicker"
                locale={ko}
            />

            <label>홈페이지</label>
            <input value={homepage} onChange={(e) => setHomepage(e.target.value)} placeholder="https://example.com"/>

            <label>관심 분야</label>
            <input value={field} onChange={(e) => setField(e.target.value)} placeholder="예: 봉사, IT, 마케팅"/>

            <label>활동 혜택</label>
            <input value={benefit} onChange={(e) => setBenefit(e.target.value)} placeholder="예: 활동비, 수료증"/>

            <label>활동 시작일</label>
            <DatePicker
                selected={activityStart}
                onChange={(date) => setActivityStart(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="날짜를 선택하세요"
                className="custom-datepicker"
                locale={ko}
            />

            <label>활동 종료일</label>
            <DatePicker
                selected={activityEnd}
                onChange={(date) => setActivityEnd(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="날짜를 선택하세요"
                className="custom-datepicker"
                locale={ko}
            />

            <label>활동 지역</label>
            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 서울, 전국, 온라인"
            />

            {/* 대외활동 전용 */}
            {category === '대외활동' && (
                <>
                    <label>모집 인원</label>
                    <input value={recruitCount} onChange={(e) => setRecruitCount(e.target.value)} placeholder="예: 00명"/>
                </>
            )}

            {/* 공모전 전용 */}
            {category === '공모전' && (
                <>
                    <label>시상 규모</label>
                    <input value={awardScale} onChange={(e) => setAwardScale(e.target.value)}
                           placeholder="예: 총상금 500만원"/>
                </>
            )}

            {/* 이미지 업로드 */}
            <label>이미지 첨부</label>
            <input type="file" accept="image/*" onChange={handleImageChange}/>
            {preview && (
                <img
                    src={preview}
                    alt="미리보기"
                    style={{width: '200px', marginTop: '10px', borderRadius: '8px'}}
                />
            )}

            {/* 등록 버튼 */}
            <button onClick={handleSubmit}>등록하기</button>
        </div>
    );
}
export default WritePage;
