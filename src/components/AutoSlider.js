/* 자동으로 넘어가는 배너를 만들기 위한 설치
npm install react-slick slick-carousel
임포트 후에 App.js 파일에 아래 2개 임포트 추가하기

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */

import Slider from 'react-slick';
import './AutoSlider.css';

function AutoSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div><img src="/WebPoster01.png" alt="배너1" className="slider-img" /></div>
                <div><img src="/WebPoster03.jpg" alt="배너2" className="slider-img" /></div>
                <div><img src="/WebPoster02.png" alt="배너3" className="slider-img" /></div>
            </Slider>
        </div>
    );
}

export default AutoSlider;
