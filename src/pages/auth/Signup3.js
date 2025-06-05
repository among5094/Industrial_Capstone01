import "./Signup.css" // 스타일시트
import {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom"; // 페이지 이동
import {useUserDispatch, useUserState} from "./UserContext"; // 회원가입 값, 유저 업데이트

const Signup3 = ( ) => {
    useEffect(() => { // css
        document.body.classList.add("signup");
        return () => {
            document.body.classList.remove("signup");
        };
    }, []);

    const [id, setId] = useState(""); // 아이디
    const [password, setPassword] = useState(""); // 비밀번호
    const [email, setEmail] = useState(""); // 이메일
    const dispatch = useUserDispatch();
    const navigate = useNavigate();
    const [isIdAvailable, setIsIdAvailable] = useState(null); // 아이디 유효성 검사
    const [isPwAvailable, setIsPwAvailable] = useState(null); // 비밀번호 유효성 검사
    const [isEmailAvailable, setIsEmailAvailable] = useState(null); // 이메일 유효성 검사
    const [isIdDuplicateId, setIsIdDuplicateId] = useState(null); // 아이디 중복 여부
    const { userList } = useUserState(); // 유저 리스트
    const { step1, step2 } = useUserState();

    //아이디 정규식 (영문자+숫자만, 3자 이상)
    const idRegEx = /^[A-Za-z0-9]{3,}$/
    //이메일 정규식 (영문자+숫자만, @ 하나 포함, . 하나 이상 포함)
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    //비밀번호 정규식 (영문자+숫자+특수문자 포함, 8자-25자)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/


    // 아이디 입력 핸들러
    const handleChangeId = (e) => {
        setId(e.target.value);
        if(!idRegEx.test(e.target.value)){ // 아이디 유효성 검사
            setIsIdAvailable(false);
            setIsIdDuplicateId(null); // 변경사항이 있으면 중복검사 초기화
        } else {
            setIsIdAvailable(true);
            setIsIdDuplicateId(null);
        }
    };
    // 비밀번호 입력 핸들러
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        if(!passwordRegex.test(e.target.value)){ // 비밀번호 유효성 검사
            setIsPwAvailable(false);
        } else {
            setIsPwAvailable(true);
        }
    };
    // 닉네임 입력 핸들러
    /*
    const handleChangeNickname = (e) => {
        setNickname(e.target.value);
        if(!nicknameRegex.test(e.target.value)){ // 비밀번호 유효성 검사
            setIsNicknameAvailable(false);
        } else {
            setIsNicknameAvailable(true);
        }
    };
     */
    // 이메일 입력 핸들러
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        if(!emailRegEx.test(e.target.value)){ // 이메일 유효성 검사
            setIsEmailAvailable(false);
        } else {
            setIsEmailAvailable(true);
        }
    };

    // 아이디 중복 확인 함수
    const handleCheckDuplicate = () => {
        if(isIdAvailable) {
            const isExistingUser = userList.some(user => user.id === id);
            if (isExistingUser) {
                setIsIdDuplicateId(false);
            } else {
                setIsIdDuplicateId(true);
            }
        } else {
            setIsIdDuplicateId(null);
        }
    };


    // "다음" 버튼 클릭 시 데이터 제출
    const handleSubmit = async (e) => {
        if(isIdAvailable && isIdDuplicateId && isPwAvailable&& isEmailAvailable){
            e.preventDefault();

            console.log("user", step1, step2, id, password, email);

            // 세 번째 단계의 데이터 업데이트
            dispatch({ type: "UPDATE_SIGNUP_STEP3", id, password, email });
            // 회원가입 완료 후 CREATE_USER 액션 디스패치
            /*
            dispatch({
                type: "CREATE_USER",
                user: { id, password, nickname, email }, // 최종 사용자 데이터
            });
             */

            const userData = {
                id: id,
                password: password,
                email: email,
                username: step1.name,
                ent_year: step1.enroll,
                sch_state: step1.academic,
                department: Array.isArray(step2.department) ? step2.department[0] : step2.department,
            };

            try{
                const response = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: {"Content-Type": "application/json; charset=UTF-8"},
                    body: JSON.stringify(userData),
                });

                const result = await response.json();
                if(response.ok) {
                    alert("회원가입 성공");
                    navigate("/");
                } else {
                    alert("에러 발생: " + result.error);
                }
            } catch(error) {
                alert("서버 연결 실패: " + error.message);
            }

        } else if (isIdDuplicateId === null) { // 아이디 중복확인을 안 했다면
            alert("아이디 중복 확인을 해주세요.");
        }  else { // 아이디 중복, 비밀번호/닉네임/이메일 유효성 겁사 결과 false
            alert("정보를 올바르게 입력해주세요.");
        }

    };


    return (
        <div>
            <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <h1>아이디/비밀번호 입력</h1>
                    <div>
                        <div className="duplicate-button-box"> <p/> </div>
                        {/*아이디*/}
                        <label className="form-label">아이디</label>
                        <input
                            className="input-field"
                            type="text"
                            placeholder="아이디"
                            value={id}
                            onChange={handleChangeId}
                            required
                        />
                        {/*아이디 중복 확인*/}
                        <div className="duplicate-button-box">
                            {/*아이디 유효성 검사*/}
                            {isIdAvailable ? <p/> :
                                <p style={{ color: "red" }}>아이디는 영문자+숫자 조합으로 3자리 이상 입력해주세요.</p>}
                            {/*버튼을 누르기 전(isIdDuplicateId값이 null이면)에는 아무것도 출력되지 않음*/}
                            {isIdDuplicateId ? <p style={{ color: "green" }}>사용 가능한 아이디입니다.</p> : (isIdDuplicateId === null ?
                                <p/> : <p style={{ color: "red" }}>이미 존재하는 아이디입니다.</p>)}
                            <button className="duplicate-button" type="button" onClick={handleCheckDuplicate}>중복 확인</button>
                        </div>


                        {/*비번*/}
                        <label className="form-label">비밀번호</label>
                        <input
                            className="input-field"
                            type="text"
                            placeholder="비밀번호"
                            value={password}
                            onChange={handleChangePassword}
                            required
                        />
                        <div className="duplicate-button-box">
                            {isPwAvailable ? <p style={{ color: "green" }}>사용 가능한 비밀번호입니다.</p> :
                            <p style={{ color: "red" }}>비밀번호는 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.</p>}
                        </div>
                        {/*닉네임*/}

                        {/*이메일*/}
                        <label className="form-label">이메일</label>
                        <input
                            className="input-field"
                            type="text"
                            placeholder="email@example.com"
                            value={email}
                            onChange={handleChangeEmail}
                            required
                        />
                        <div className="duplicate-button-box">
                            {isEmailAvailable ? <p/> : 
                                <p style={{ color: "red" }}>올바른 형식의 이메일을 입력해주세요.</p>}
                        </div>
                            
                    </div>
                    {/* 회원가입 완료 버튼 */}
                    <button className="next-button" type="submit"> 다음 </button>
                </form>
            </div>
        </div>
    );
};
export default Signup3;