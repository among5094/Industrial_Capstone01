import './UserCard.css';

function UserCard() {
    return (
        <div className="user-card">
            <img src="/userIcon2.png" alt="사용자 이미지" className="user-img" />
            <h2 className="user-nickname">비락바락</h2>
            <p className="user-info">컴퓨터공학과 | userID</p>
        </div>
    );
}

export default UserCard;
