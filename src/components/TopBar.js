// src/components/TopBar.js
import React from "react";
import "./TopBar.css";

function TopBar() {
    return (
        <div className="topbar">

            {/* 슬로건 애니메이션 추가 */}
            <div className="slogan-banner">
                <span>크고자 하거든 남을 섬기라</span>
            </div>

            {/*
            <div className="topbar-left">
                <a href="#">International Office</a>
                <a href="#">진로취업포털</a>
                <a href="#">산학/연구</a>
                <a href="https://www.pcu.ac.kr/fund" target="_blank" rel="noopener noreferrer">발전기금</a>
            </div>
            */}

            <div className="topbar-right">

                <a href="https://www.instagram.com/paichaiuniv/#"  target="_blank" rel="noopener noreferrer">
                    <img src="/instagram.png" alt="Instagram"/> </a>

                <a href="https://www.facebook.com/paichaiuniv" target="_blank" rel="noopener noreferrer">
                    <img src="/facebook.png" alt="Facebook" /></a>

                <a href="https://www.youtube.com/channel/UCooRkW1fWFWMPJvuRbJt4eA" target="_blank" rel="noopener noreferrer">
                    <img src="/youtube.png" alt="YouTube" /> </a>

                <a href="https://pf.kakao.com/_twcQG" target="_blank" rel="noopener noreferrer">
                    <img src="/kakaotalk.png" alt="KakaoTalk" /> </a>

                {/*
                <a href="#">LOGIN</a>
                <a href="#">SITEMAP</a>
                <a href="#">LANGUAGE</a>
                <a href="#">원격지원</a>
                */}

            </div>
        </div>
    );
}

export default TopBar;
