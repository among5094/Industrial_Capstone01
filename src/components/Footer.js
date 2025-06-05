import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer-dark">
            <div className="footer-top"> {/* 메뉴 + 로고 수평 정렬 구조 */}

                <div className="footer-left"> {/* 왼쪽 로고 박스 */}
                    <img src="/PaiChaiLogoCircle.png" alt="배재대 로고" className="footer-logo-img" />
                </div>

                <div className="footer-center"> {/* 오른쪽 텍스트 박스 */}
                    <h2 className="footer-title">PAI CHAI</h2>

                    {/* 아래 메뉴에 divider | 구분자 삽입 */}
                    <div className="footer-menu">
                        <a href="#">대학기구</a>
                        <span className="divider">|</span> {/* ✅ 구분선 추가 */}
                        <a href="#">총동창회</a>
                        <span className="divider">|</span>
                        <a href="#">예결산현황</a>
                        <span className="divider">|</span>
                        <a href="#">입찰정보</a>
                        <span className="divider">|</span>
                        <a href="#">전자규정집</a>
                        <span className="divider">|</span>
                        <a href="#">개정규정</a>
                        <span className="divider">|</span>
                        <a href="#">대학정보공시</a>
                        <span className="divider">|</span>
                        <a href="#">정보공개 접수</a>
                        <span className="divider">|</span>
                        <a href="#">교육행정서비스현장</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-links">
                    {/* 개인정보 처리방침 강조 (하이라이트 클래스 사용) */}
                    <a className="highlight">개인정보 처리방침</a>
                    <a>영상정보처리기기 운영·관리 방침</a>
                    <a>재난안전관리 매뉴얼</a>
                    <a>집단연수 매뉴얼</a>
                    <a>청탁금지법 안내</a>
                    <a>공익신고 안내</a>
                </div>

                <p className="footer-address">
                    (35345) 대전광역시 서구 배재로 155-40(도마동) / 155-40 Baejae-ro(Doma-Dong), Seo-gu, Daejeon, 35345, Korea <br />
                    FAX. 070-4850-8303 전화 042-520-5114
                </p>

                <p className="copyright">
                    Copyright © 2025 Pai Chai University. All Right Reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
