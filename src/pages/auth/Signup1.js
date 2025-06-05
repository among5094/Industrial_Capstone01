import {useNavigate} from "react-router-dom"; // 페이지이동
import {useState, useEffect} from "react";
import { useUserDispatch} from "./UserContext"; // 회원가입 값 업데이트
import "./Signup.css" // 스타일시트

const Signup1 = ( ) => { // css
    useEffect(() => {
        document.body.classList.add("signup");
        return () => {
            document.body.classList.remove("signup");
        };
    }, []);

    const navigate = useNavigate(); // 페이지 이동

    const [enroll, setEnroll] = useState("");
    const [academic, setAcademic] = useState("");
    const [name, setName] = useState("");
    const dispatch = useUserDispatch();
    const [isNameAvailable, setIsNameAvailable] = useState(null); // 이름 유효성 검사


    const handleSubmit = (e) => // 다음 버튼
    {
        if(isNameAvailable){
            e.preventDefault();
            // 첫 번째 단계의 데이터 업데이트
            dispatch({ type: "UPDATE_SIGNUP_STEP1", enroll, academic, name });
            navigate("/signup2"); // 다음 페이지로 이동
        } else{
            e.preventDefault();
            alert("이름을 올바르게 입력해주세요.");
        }
        
    }

    // 학번 값 업데이트
    const handleChangeEnroll = (e) => {
        setEnroll(e.target.value);
    };
    // 학적 값 업데이트
    const handleChangeAcademic = (e) => {
        setAcademic(e.target.value);
    };
    // 이름 값 업데이트
    const handleChangeName = (e) => {
        setName(e.target.value);
        if(nameRegEx.test(e.target.value)){ // 아이디 유효성 검사
            setIsNameAvailable(false);
        } else {
            setIsNameAvailable(true);
        }
    };

    //이름 정규식 (자음/모음 제외)
    const nameRegEx = /([^가-힣a-z])/i

    // 학번 연도 선택 범위 설정 (1996년부터 현재 연도까지)
    const yearOptions = [];
    for (let i = new Date().getFullYear(); i >= 1996; i--) {
        yearOptions.push(i);
    }


    return(
        <div className="signup-container">
            <h1>회원가입</h1>
            <h3>회원가입 설명</h3>

            <form onSubmit={handleSubmit} className="form-container">
                <h1>학생 정보 입력</h1>
                <div>
                    {/*입학년도(학번) 선택*/}
                    <label className="form-label">입학년도</label>
                    <div>
                        <select className="input-field" value={enroll} onChange={handleChangeEnroll} required>
                            <option value="" disabled>
                                연도 선택 (학번)
                            </option>
                            {yearOptions.map((enroll) => (
                                <option key={enroll} value={enroll}>
                                    {enroll}학번
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    {/*학적 선택*/}
                    <label className="form-label">학적</label>
                    <div>
                        <select className="input-field" value={academic} onChange={handleChangeAcademic} required>
                            <option value="" disabled selected>학적선택</option>
                            <option value="재학">재학</option>
                            <option value="졸업">졸업</option>
                        </select>
                    </div>
                </div>
                <div>
                    {/*이름*/}
                    <label className="form-label">이름</label>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="이름"
                        value={name}
                        onChange={handleChangeName}
                        required
                    />
                    <div>
                        <p/>
                        {isNameAvailable ? <p/> : (name === "" ?
                            <p/> : <p style={{ color: "red" }}>올바른 형식의 이름을 입력해주세요.</p>)}
                    </div>
                </div>
                {/* 다음페이지 버튼 */}
                <button className="next-button" type="submit"> 다음 </button>
            </form>
        </div>
    );
};
export default Signup1;