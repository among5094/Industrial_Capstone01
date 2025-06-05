import React, { useState } from "react";
import './style/campus.css';
import api from "../../api/api";
import KakaoMap from "../../components/KakaoMap";
import swapIcon from '../../image/swap.png'; // 스왑 이미지 경로

function Campus() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [path, setPath] = useState([]);
    const [markers, setMarkers] = useState({ start: null, end: null });

    const handleSearch = async () => {
        try {
            setErrorMsg('');
            const response = await api.post('/api/search-path', { start, end });

            if (response.data.status === 'success') {
                const { start: startInfo, end: endInfo, path } = response.data;

                setPath(path);
                setMarkers({
                    start: { lat: startInfo.lat, lng: startInfo.lng },
                    end: { lat: endInfo.lat, lng: endInfo.lng }
                });
            } else {
                setErrorMsg(response.data.message);
            }
        } catch (err) {
            console.error('❌ 요청 중 오류 발생:', err);
            setErrorMsg('서버와 통신 중 문제가 발생했습니다.');
        }
    };

    // 출발지와 도착지 값 스왑
    const handleSwap = () => {
        const temp = start;
        setStart(end);
        setEnd(temp);
    };

    return (
        <div className="campus-container" style={{ padding: "20px" }}>
            <h2> 최단 경로 탐색 (학교 내부 건물 전용)</h2>

            <div className="form-wrapper">
                <div className="form-box">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="출발지를 입력하세요"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="도착지를 입력하세요"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </div>
                </div>

                {/* swap 버튼을 입력창 외부 오른쪽에 위치 */}
                <button className="swap-button" onClick={handleSwap}>
                    <img src={swapIcon} alt="swap" />
                </button>

                <div className="control-buttons">
                    <button
                        className="clear-button"
                        onClick={() => {
                            setStart('');
                            setEnd('');
                            setPath([]);
                            setMarkers({ start: null, end: null });
                            setErrorMsg('');
                        }}
                    >
                        ✖
                    </button>
                </div>

                <button className="search-button" onClick={handleSearch}>경로 탐색</button>

                {errorMsg && <p className="error-msg">⚠ {errorMsg}</p>}
            </div>

            <KakaoMap markers={markers} path={path} />
        </div>
    );
}

export default Campus;
