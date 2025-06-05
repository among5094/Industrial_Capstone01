/* 자동으로 넘어가는 배너를 만들기 위한 설치
npm install react-slick slick-carousel
임포트 후에 App.js 파일에 아래 2개 임포트 추가하기

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */

import Slider from 'react-slick'; /* react-slick 슬라이더 라이브러리 불러오기 */
import './AutoSlider.css';

function AutoSlider() {

    // 슬라이더 동작 설정
    const settings = {
        dots: true, /* 하단 점 네비게이션 표시 */
        infinite: true, /* 무한 반복 슬라이드 */
        speed: 500, /* 슬라이드 전환 속도 (ms) */
        autoplay: true, /* 자동 재생 여부 */
        autoplaySpeed: 2000, /* 자동 재생 간격 (ms) */
        pauseOnHover: true /* 마우스를 올리면 자동 재생 일시 정지 */
    };

    return (

        <div className="slider-container"> {/* 슬라이더 전체를 감싸는 컨테이너 */}
            <Slider {...settings}> {/* 설정 적용된 슬라이더 실행 */}
                {/* 배너 1 */}
                <div><img src="/row_banner.jpg" alt="배너1" className="slider-img" /></div>
                {/* 배너 2 */}
                <div><img src="/row_banner02.jpg" alt="배너2" className="slider-img" /></div>
                {/* 배너 3 */}
                <div><img src="/row_banner03.jpg" alt="배너3" className="slider-img" /></div>
            </Slider>
        </div>
    );
}

/* 컴포넌트 외부에서 사용할 수 있도록 내보내기 */
export default AutoSlider;
