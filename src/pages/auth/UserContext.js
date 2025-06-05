import React, {createContext, useReducer, useContext, useEffect} from "react";

const initialState = {
    userList: [],   // 유저리스트
    user: null, // 유저의 로그인 상태값
    step1: {    //Signup1페이지에서 받을 값
        enroll: "",
        academic: "",
        name: "",
    },
    step2: {    //Signup2페이지에서 받을 값
        department: [],
    },
    step3: {    //Signup3페이지에서 받을 값
        id: "",
        password: "",
        email: "",
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_SIGNUP_STEP1": //Signup1에서 받은 정보 업데이트(학번, 학과)
            return {
                ...state,
                step1: {
                    enroll: action.enroll,
                    academic: action.academic,
                    name: action.name,
                },
            };

        case "UPDATE_SIGNUP_STEP2": //Signup2에서 받은 정보 업데이트(학적)
            return {
                ...state,
                step2: {
                    department: action.department,
                },
            };

        case "UPDATE_SIGNUP_STEP3": //Signup3에서 받은 정보 업데이트(이름, 아이디, 비밀번호, 이메일)
            return {
                ...state,
                step3: {
                    id: action.id,
                    password: action.password,
                    email: action.email,
                },
            };

        case "CREATE_USER":
            const newUser = { // 회원가입 페이지에서 업데이트한 값을 저장하여 유저 생성
                enroll: state.step1.enroll,
                academic: state.step1.academic,
                name: state.step1.name,
                department: state.step2.department,
                id: state.step3.id,
                password: state.step3.password,
                email: state.step3.email,
            };
            return { // 생선된 유저를 유저리스트에 추가
                ...state,
                userList: [...state.userList, newUser],
            };
        case "LOGIN":
            return {
                ...state,
                user: action.user, // 로그인 후 user 정보를 state에 저장 (로그인 상태)
            };
        case "LOGOUT":
            return {
                ...state,
                user: null, // 로그아웃 후 user 정보 제거 (로그인 상태)
            };
        default:
            return state;
    }
};

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export const UserProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(reducer, initialState);

    // 여기부터
    const savedState = sessionStorage.getItem("userState");
    const initial = savedState ? JSON.parse(savedState) : initialState;
    const [state, dispatch] = useReducer(reducer, initial);
    useEffect(() => {
        sessionStorage.setItem("userState", JSON.stringify(state));  // 상태가 변경될 때마다 sessionStorage에 저장
    }, [state]);
    // 여기까지 테스트용으로 세션 스토리지에 저장하는 코드입니다

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
};

//에러확인용
export const useUserState = () => {
    const state = useContext(UserStateContext);
    if(!state) throw new Error("Cannot find UserProvider");
    return state;
}
export const useUserDispatch = () => {
    const dispatch = useContext(UserDispatchContext);
    if(!dispatch) throw new Error("Cannot find UserProvider");
    return dispatch;
}