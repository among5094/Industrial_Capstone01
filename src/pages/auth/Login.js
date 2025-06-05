import { useNavigate, Link} from "react-router-dom"; /* 페이지 이동 */
import {useState, useEffect} from "react";
import {useUserDispatch, useUserState} from "./UserContext"; /* 유저 정보 */
import "./Login.css" /* 스타일시트 */

const Login = () => {
    useEffect(() => { // css
        document.body.classList.add("login");
        return () => {
            document.body.classList.remove("login");
        };

    }, []);

    const [id, setId] = useState(""); /* 아이디 */
    const [password, setPassword] = useState(""); /* 비밀번호 */
    const navigate = useNavigate();
    const dispatch = useUserDispatch();
    const { userList } = useUserState(); /* 회원가입한 유저리스트 */

    const blank = /\s/; // 공백을 검사하는 정규식
    // 공백이 포함된 입력을 거르는 함수
    const handleChange = (e, field) => {
        const value = e.target.value;

        // 공백이 포함되어 있으면 알림을 띄우고 입력을 중단
        if (blank.test(value)) {
            alert("공백은 사용할 수 없습니다.");
            return;
        }

        // 공백이 없으면 상태 업데이트
        if (field === "id") {
            setId(value);
        } else if (field === "password") {
            setPassword(value);
        }
    };


    // 로그인 처리 함수
    const handleLogin = async (e) => {
        e.preventDefault();

        // 입력된 id와 password를 userList에서 확인
        //const user = userList.find((user) => user.id === id && user.password === password);

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(id, password),
            });

            const result = await response.json();

            if(response.ok && result.success) {
                dispatch({
                    type: "LOGIN",
                    userId: id,
                });

                sessionStorage.setItem("user", JSON.stringify(result.user));
                navigate("/main");
            } else {
                alert(result.message || "아이디 또는 비밀번호가 일치하지 않습니다.");
            }
        } catch(error) {
            console.error("로그인 요청 중 에러 발생:", error);
            alert("서버와의 통신에 문제가 있습니다.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <div className="logo-container">
                    <img src="/PaiChaiLogoCircle.png" alt="로고"/>
                </div>
                <div>
                    {/*아이디 입력*/}
                    <input
                        className="input-field"
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => handleChange(e, "id")}
                        required /* 미입력 시 넘어가기 불가 */
                    />
                    <br/>
                    {/*비밀번호 입력*/}
                    <input
                        className="input-field"
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => handleChange(e, "password")}
                        required /* 미입력 시 넘어가기 불가 */
                    />
                </div>
                {/*로그인 버튼*/}
                <button className="login-button">로그인</button>
                {/* 회원가입 버튼 */}
                <Link to={"/signup1"} className="signup">회원가입</Link>
            </form>
        </div>
    );
};
export default Login;