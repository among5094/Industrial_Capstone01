import React from "react";
import "./UserCard.css";

function UserCard() {
    return (
        <div className="user-card-box">
            <div className="user-profile">
                <img src="/RainbowNasum.png" alt="프로필" className="profile-img" />
                <h3 className="nickname">닉네임입니다</h3>

                <div className="user-subinfo">
                    <p className="real-name">노혜민</p>
                    <span className="divider">|</span>
                    <p className="user-id">nd1118</p>
                </div>

                <div className="button-group">
                    <button className="info-btn">내 정보</button>
                    <button className="logout-btn">로그아웃</button>
                </div>
            </div>

            <ul className="user-menu">
                <li><span className="icon">📋</span> 내가 쓴 글</li>
                <li><span className="icon">💬</span> 댓글 단 글</li>
                <li><span className="icon">⭐</span> 내 스크랩</li>
            </ul>
        </div>
    );
}

export default UserCard;
