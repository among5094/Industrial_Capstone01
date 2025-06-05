import { useEffect, useState} from "react";
import { useNavigate} from "react-router-dom"; // 페이지 이동
import "./Signup.css" // 스타일시트
import { useUserDispatch } from "./UserContext"; // 회원가입 값 업데이트

const Signup2 = ( ) => {
    useEffect(() => { // css
        document.body.classList.add("signup");
        return () => {
            document.body.classList.remove("signup");
        };
    }, []);

    const navigate = useNavigate();
    const [departmentList, setDepartmentList] = useState([]); // 학과 데이터
    const [filteredDepartment, setFilteredDepartment] = useState(departmentList); // 학과 자동완성 필터링
    const [department, setDepartment] = useState([]); // 선택된 학과 목록
    const [inputValue, setInputValue] = useState(""); // 검색 입력값

    const dispatch = useUserDispatch();

    // 학과 JSON 데이터 불러오기
    useEffect(() => {
        fetch("/department_data.json")
            .then((response) => response.json())
            .then((data) => {
                const departmentNames = data.map(dept =>
                    dept.closedDepartment ? `${dept.departmentName} (폐과)` : dept.departmentName
                ); /* 폐과된 학과라면 '학과명'(폐과)로 출력*/
                setDepartmentList(departmentNames);
                setFilteredDepartment(departmentNames);
            })
            .catch((error) => console.error("Error loading JSON:", error));
    }, []);

    // "다음" 버튼 클릭 시 데이터 제출
    const handleSubmit = (e) => {
        if (department.length === 0) { // 선택한 학과가 없을 경우
            e.preventDefault();
            alert("학과를 선택해주세요.");
        } else {
            e.preventDefault();
            // 두 번째 단계의 데이터 업데이트
            dispatch({type: "UPDATE_SIGNUP_STEP2", department});
            navigate("/signup3"); // 다음 페이지로 이동
        }
    };

    //학과 선택 관리
    // 학과 선택
    const handleSelectDepartment = (dept) => {
        if (!department.includes(dept) && dept !== "존재하지 않는 학과입니다") {
            setDepartment([...department, dept]);
        }
        setInputValue(""); // 입력 필드 초기화
        setFilteredDepartment(departmentList); // 자동완성 목록 초기화
    };
    // 학과 제거
    const handleRemoveDepartment = (dept) => {
        setDepartment(department.filter(item => item !== dept));
    };
    // 입력값 변경 시 자동완성 옵션 업데이트
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const filtered = departmentList.filter((dept) => dept.includes(value));
        setFilteredDepartment(filtered.length ? filtered : ["존재하지 않는 학과입니다"]);
    };


    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h1>학과 입력</h1>
                <div>
                    {/*학과 선택*/}
                    {/* 선택된 학과 리스트 */}
                    <div className="selected-departments">
                        {department.map((dept, index) => (
                            <span key={index} className="selected-tag">
                            {dept} <button
                                type="button"
                                onClick={() => handleRemoveDepartment(dept)}>❌</button>
                        </span>
                        ))}
                    </div>

                    <label className="form-label">학과</label>
                    <div className="input-container">
                        <input
                            className="input-field"
                            type="text"
                            placeholder="학과를 검색하세요."
                            value={inputValue}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        <span className="search-icon">🔍︎</span>
                    </div>
                    <div>
                        {/*자동완성 옵션*/}
                        <ul className="autocomplete-list">
                            {filteredDepartment.map((dept, index) => (
                                <li key={index}
                                    onClick={() => handleSelectDepartment(dept)}
                                    className={dept === "존재하지 않는 학과입니다" ? "disabled-option" : ""}
                                >
                                    {dept}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button className="next-button" type="submit"> 다음 </button>
            </form>
        </div>
    );
};
export default Signup2;