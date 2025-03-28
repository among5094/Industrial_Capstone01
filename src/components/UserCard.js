import './UserCard.css';

function UserCard() {
    return (
        <div className="user-card"> {/* 사용자 카드 전체 컨테이너 */}
            <img src="/userIcon2.png" alt="사용자 이미지" className="user-img" /> {/* 사용자 프로필 이미지 */}
            <h2 className="user-nickname">비락바락</h2> {/* 사용자 닉네임 */}
            <p className="user-info">컴퓨터공학과 | userID</p> {/* 학과 및 ID 정보 */}
        </div>
    );
}

export default UserCard;
