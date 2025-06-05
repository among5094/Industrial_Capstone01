
// 자동으로 넘어가는 배너 부분 추가
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 모든 페이지에서 Footer가 보이게 해야하므로 App.js에 footer추가
import Footer from './components/Footer';

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import {useUserDispatch, useUserState} from "./pages/auth/UserContext"; // user 로그인 상태
import {useEffect,  useState} from "react";
import "./App.css"; // 스타일시트

import Login from "./pages/auth/Login";
import Signup1 from "./pages/auth/Signup1";
import Signup2 from "./pages/auth/Signup2";
import Signup3 from "./pages/auth/Signup3";
import MainPage from "./pages/MainPage";
import FreeBoard from "./pages/FreeBoard";
import GraduatedBoard from "./pages/GraduatedBoard";
import ActivityBoard from './pages/contest/activityboard';
import WritePage from './pages/contest/writepage';
import Detail from './pages/contest/detail';
import Campus from './pages/contest/campus';


// 새로 추가한 부분
import AddPost from "./pages/AddPost";
import PostDetail from "./pages/PostDetail";

// 5월 6일 새로 추가한 부분
import TopBar from "./components/TopBar";

function App() {
    //gis_roadmap

    const {user} = useUserState(); // user 로그인 상태

    // 로그인 상태일 시 홈화면 이동 테스트용입니다
    const dispatch = useUserDispatch();
    useEffect(() => {
        // 앱 시작 시 세션 스토리지에서 사용자 정보 가져오기
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
            dispatch({
                type: "LOGIN",
                user: JSON.parse(savedUser), // 세션 스토리지에서 user 정보 불러오기
            });
        }
    }, [dispatch]);

    const [posts, setPosts] = useState([
        {
            id: 1,
            title: '2025 카카오 제주 임팩트 챌린지',
            deadline: '2025-04-17',
            deadlineStart: "2025-03-17",
            deadlineEnd: '2025-04-17',
            category: '대외활동',
            imageUrl: require('./image/paichai.png'),
            views: 500,
            author: '카카오임팩트팀',
            orgType: 'IT 기업',
            activityStart: '2025-05-01',
            activityEnd: '2025-09-30',
            target: '대학생',
            homepage: 'https://impact.kakao.com',
            recruitCount: '50명',
            benefit: '수료증, 활동비, 멘토링 제공',
            content: `카카오임팩트팀이 주최하는 '2025 카카오 제주 임팩트 챌린지'는 지속 가능한 사회를 위한 아이디어를 실현하고 싶은 대학생들을 위한 대외활동입니다. 제주에서 5개월간 진행되는 이번 프로그램은 환경, 지역 사회, 기술 등의 다양한 주제를 중심으로 프로젝트를 수행하며, IT기업과 협업할 수 있는 실무 경험을 쌓을 수 있습니다.

참가자들에게는 수료증과 활동비, 전문 멘토의 멘토링이 제공되며, 우수 활동자에게는 카카오 관련 인턴십 기회도 주어질 수 있습니다. 전국의 열정 있는 대학생 50명을 모집하며, 함께 제주에서 사회적 가치를 만들어갈 여러분을 기다립니다.

📅 활동 기간: 2025년 5월 1일 ~ 9월 30일  
💻 지원 대상: 전국의 대학생  
📝 모집 기간: 2025년 3월 17일 ~ 4월 17일  
🏢 주최: 카카오임팩트팀  
🌐 자세한 내용 및 지원: [공식 홈페이지](https://impact.kakao.com)`
        },
        {
            id: 2,
            title: '[Sh수협은행] 유니폼 공모전',
            deadline: '2025-04-20',
            deadlineStart: "2025-03-13",
            deadlineEnd: '2025-04-20',
            category: '공모전',
            imageUrl: require('./image/paichai2.png'),
            views: 650,
            author: '수협은행',
            orgType: '금융기관',
            activityStart: '2025-05-01',
            activityEnd: '2025-08-31',
            target: '대학생, 일반인',
            homepage: 'https://www.suhyup-bank.com',
            awardScale: '총상금 500만원',
            content: `[Sh수협은행] 유니폼 공모전 안내

안녕하세요, 수협은행입니다.

우리 은행을 대표할 창의적이고 실용적인 유니폼 디자인을 모집합니다.
누구나 지원 가능하며, 당선작은 실제 유니폼으로 제작될 예정입니다.

🖌️ 공모 주제: '친근함과 전문성을 모두 담은 수협 유니폼'
🏆 시상 내역: 대상 1명 (200만원) / 우수상 2명 (각 100만원)

여러분의 많은 참여 바랍니다!`
        },
    ]);

    return (
        <div className="App">
            {user && <TopBar/>} {/* TopBar 추가 */}
            {user && <Navbar/>} {/* 로그인된 경우만 Navbar 보이게 */}
            <Routes>
                {user ? (
                    <>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/free-board" element={<FreeBoard/>}/>
                        <Route path="/graduated" element={<GraduatedBoard/>}/>

                        <Route path="/write" element={<AddPost/>}/>
                        <Route path="/post/:id" element={<PostDetail/>}/>


                        <Route path="/notice" element={<ActivityBoard posts={posts}/>}/>
                        <Route path="/contest/write" element={<WritePage setPosts={setPosts}/>}/>
                        <Route path="/contest/:id" element={<Detail posts={posts} />} />
                        <Route path="/map" element={<Campus/>}/>


                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup1" element={<Signup1/>}/>
                        <Route path="/signup2" element={<Signup2/>}/>
                        <Route path="/signup3" element={<Signup3/>}/>
                    </>
                )}
            </Routes>
            {user && <Footer/>} {/* 로그인된 경우만 Footer 보이게 */}
        </div>

    );
}

export default App;
