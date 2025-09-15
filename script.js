// AIS 교육자료 웹사이트 JavaScript

// 전역 변수
let currentContent = null;
let courseData = {};

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    loadCourseData();
});

// 웹사이트 초기화
function initializeWebsite() {
    // 네비게이션 이벤트 리스너
    setupNavigation();
    
    // 탭 기능
    setupTabs();
    
    // 검색 기능
    setupSearch();
    
    // 코스 버튼 이벤트
    setupCourseButtons();
    
    // 뒤로가기 버튼
    setupBackButton();
    
    // 스크롤 이벤트
    setupScrollEffects();
}

// 네비게이션 설정
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

// 섹션 표시
function showSection(sectionId) {
    // 모든 섹션 숨기기
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 대상 섹션 표시
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 콘텐츠 섹션은 별도 처리
    const contentSection = document.getElementById('content');
    if (contentSection && sectionId !== 'content') {
        contentSection.classList.remove('active');
        contentSection.style.display = 'none';
    }
}

// 탭 기능 설정
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 모든 탭 버튼 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 모든 탭 콘텐츠 숨기기
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 클릭된 탭 활성화
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// 검색 기능 설정
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// 검색 실행
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm.trim()) {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    // 검색 결과 표시 (실제 구현에서는 더 정교한 검색 로직 필요)
    showSearchResults(searchTerm);
}

// 검색 결과 표시
function showSearchResults(searchTerm) {
    // 간단한 검색 결과 표시
    const content = `
        <h2>검색 결과: "${searchTerm}"</h2>
        <div class="search-results">
            <p>검색어 "${searchTerm}"에 대한 결과를 찾고 있습니다...</p>
            <div class="loading"></div>
        </div>
    `;
    
    showContent('검색 결과', content);
}

// 코스 데이터 로드
function loadCourseData() {
    // 실제 구현에서는 서버에서 데이터를 가져오거나 JSON 파일을 로드
    courseData = {
        '1.1': {
            title: 'AIS 개요 및 기본 개념',
            content: getContent1_1(),
            duration: '30분',
            level: '초급'
        },
        '1.2': {
            title: 'AIS 시스템 구성 요소',
            content: getContent1_2(),
            duration: '45분',
            level: '초급'
        },
        '1.3': {
            title: 'AIS 작동 원리 및 통신 방식',
            content: getContent1_3(),
            duration: '60분',
            level: '초급'
        },
        '1.4': {
            title: 'AIS 메시지 유형 및 데이터 구조',
            content: getContent1_4(),
            duration: '45분',
            level: '초급'
        },
        '2.1': {
            title: '국제 규정 및 표준',
            content: getContent2_1(),
            duration: '40분',
            level: '중급'
        },
        '2.2': {
            title: '국내 규정 및 법령',
            content: getContent2_2(),
            duration: '30분',
            level: '중급'
        },
        '2.3': {
            title: 'AIS 설치 의무 대상',
            content: getContent2_3(),
            duration: '25분',
            level: '중급'
        },
        '3.1': {
            title: 'AIS 데이터 전처리',
            content: getContent3_1(),
            duration: '60분',
            level: '중급'
        },
        '3.2': {
            title: '데이터 품질 관리',
            content: getContent3_2(),
            duration: '45분',
            level: '중급'
        },
        '3.3': {
            title: '기계학습 및 AI 활용',
            content: getContent3_3(),
            duration: '90분',
            level: '고급'
        },
        '4.1': {
            title: '해상 안전 및 보안',
            content: getContent4_1(),
            duration: '50분',
            level: '고급'
        },
        '4.2': {
            title: '해상 교통 관제',
            content: getContent4_2(),
            duration: '40분',
            level: '고급'
        },
        '5.1': {
            title: '퀴즈 및 연습문제',
            content: getContent5_1(),
            duration: '60분',
            level: '고급'
        },
        '5.2': {
            title: '핵심 용어 사전',
            content: getContent5_2(),
            duration: '30분',
            level: '고급'
        },
        '5.3': {
            title: '참고 자료 및 링크',
            content: getContent5_3(),
            duration: '20분',
            level: '고급'
        }
    };
}

// 코스 버튼 이벤트 설정
function setupCourseButtons() {
    const courseButtons = document.querySelectorAll('.course-btn');
    
    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const fileId = courseCard.getAttribute('data-file');
            
            if (courseData[fileId]) {
                showContent(courseData[fileId].title, courseData[fileId].content);
            } else {
                showContent('준비 중', '<p>이 콘텐츠는 아직 준비 중입니다.</p>');
            }
        });
    });
}

// 콘텐츠 표시
function showContent(title, content) {
    currentContent = { title, content };
    
    // 메인 섹션들 숨기기
    const mainSections = document.querySelectorAll('.hero, .overview, .curriculum, .progress');
    mainSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // 콘텐츠 섹션 표시
    const contentSection = document.getElementById('content');
    const contentTitle = document.getElementById('contentTitle');
    const contentBody = document.getElementById('contentBody');
    
    contentTitle.textContent = title;
    contentBody.innerHTML = content;
    
    contentSection.classList.add('active');
    contentSection.style.display = 'block';
    
    // 스크롤 이동
    contentSection.scrollIntoView({ behavior: 'smooth' });
}

// 뒤로가기 버튼 설정
function setupBackButton() {
    const backBtn = document.getElementById('backBtn');
    
    backBtn.addEventListener('click', function() {
        // 메인 섹션들 다시 표시
        const mainSections = document.querySelectorAll('.hero, .overview, .curriculum, .progress');
        mainSections.forEach(section => {
            section.style.display = 'block';
        });
        
        // 콘텐츠 섹션 숨기기
        const contentSection = document.getElementById('content');
        contentSection.classList.remove('active');
        contentSection.style.display = 'none';
        
        // 페이지 상단으로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 스크롤 효과 설정
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 60, 114, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
            header.style.backdropFilter = 'none';
        }
    });
}

// 콘텐츠 데이터 함수들
function getContent1_1() {
    return `
        <h2>AIS 개요 및 기본 개념</h2>
        
        <h3>AIS (Automatic Identification System) 개요</h3>
        <p>AIS는 말 그대로 선박의 정보를 <strong>자동으로 식별</strong>하고 <strong>교환</strong>하는 시스템입니다. 복잡한 해상 환경에서 선박들이 서로의 존재를 정확히 알고 안전하게 항해할 수 있도록 돕는 아주 중요한 기술입니다.</p>
        
        <h4>1. AIS의 정의</h4>
        <p>AIS는 국제전기통신연합(ITU)에 의해 표준화되고 국제해사기구(IMO)에 의해 채택된 해상 항해 안전 통신 시스템입니다. 기본적으로 VHF(초단파) 해상 이동 주파수 대역에서 작동하는 자동 추적 시스템으로, 다음과 같은 역할을 수행합니다:</p>
        
        <ul>
            <li><strong>선박 정보 제공:</strong> 선박의 신원, 종류, 위치, 침로(방향), 속력, 항해 상태 및 기타 안전 관련 정보를 자동으로 주변 선박, 해안 기지국, 항로표지, 그리고 항공기 등 적절하게 장착된 모든 곳에 제공합니다.</li>
            <li><strong>정보 수신 및 추적:</strong> 이와 유사하게 다른 선박들로부터 이러한 정보를 자동으로 수신하고, 선박들을 모니터링하며 추적합니다.</li>
            <li><strong>데이터 교환:</strong> 육상 기반 시설과 데이터를 교환합니다.</li>
        </ul>
        
        <h4>2. AIS의 배경 및 개발 목적</h4>
        <p>AIS는 처음부터 해상 안전을 최우선 목표로 개발되었습니다. 특히 다음과 같은 배경과 목적을 가지고 있습니다:</p>
        
        <ul>
            <li><strong>충돌 방지 및 항해 안전 증진:</strong> AIS는 원래 선박용 해상 레이더를 보완하여 선박 간의 충돌을 방지하기 위해 개발된 자동 추적 시스템입니다.</li>
            <li><strong>해상 감시 및 교통 관리:</strong> AIS는 해상 당국과 항만에서 선박의 움직임을 모니터링할 수 있도록 합니다.</li>
            <li><strong>상황 인식 강화:</strong> 해상 보안 및 항해 안전 강화를 위한 실시간 상황 인식을 제공합니다.</li>
            <li><strong>수색 및 구조 활동 지원:</strong> 해상 사고 시 AIS 데이터는 수색 및 구조(SAR) 활동을 지원하는 데 활용될 수 있습니다.</li>
            <li><strong>표준화된 정보 교환:</strong> AIS는 표준화된 디지털 메시지를 통해 이 과정을 자동화하여 인적 오류를 줄이고 정보의 정확성과 신뢰성을 높였습니다.</li>
        </ul>
        
        <h3>AIS-ASM에 대한 설명</h3>
        <p><strong>ASM (Application-Specific Message, 애플리케이션 특정 메시지)</strong>은 일반적인 항해 정보 외에 특정 목적을 위해 사용되는 유연한 메시지 유형입니다. 쉽게 말해, 정해진 틀에 박힌 정보 외에 개발자나 운영자가 필요한 추가 정보를 AIS 네트워크를 통해 주고받을 수 있도록 해주는 "맞춤형 메시지"라고 생각하시면 됩니다.</p>
        
        <h4>주요 ASM 메시지 유형</h4>
        <ul>
            <li><strong>메시지 6:</strong> 주소 지정 이진 메시지 - 특정 수신자에게 이진 데이터를 전달</li>
            <li><strong>메시지 8:</strong> 방송 이진 메시지 - 수신 범위 내 모든 AIS 스테이션에 이진 데이터를 방송</li>
            <li><strong>메시지 12:</strong> 안전 관련 주소 지정 메시지 - 특정 AIS 스테이션에 안전과 관련된 중요한 정보를 전달</li>
            <li><strong>메시지 14:</strong> 방송 안전 관련 메시지 - 모든 수신 스테이션에 안전 관련 데이터를 방송</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ AIS-ASM의 개념을 이해하고 일반 AIS 메시지와의 차이점을 설명할 수 있다</li>
                <li>✅ 주요 ASM 메시지 유형(6, 8, 12, 14, 25, 26)의 특징과 활용 방안을 파악한다</li>
                <li>✅ ASM의 기술적 특성과 데이터 교환 방식을 이해한다</li>
                <li>✅ IT 개발자 관점에서 ASM의 중요성과 활용 방안을 제시할 수 있다</li>
            </ul>
        </div>
    `;
}

function getContent1_2() {
    return `
        <h2>AIS 시스템 구성 요소</h2>
        
        <p>자동식별시스템(AIS)은 해상에서 선박들이 서로 정보를 주고받는 중요한 "눈과 귀" 역할을 합니다. AIS는 단순히 하나의 장비가 아니라, 여러 하드웨어와 소프트웨어 구성 요소들이 유기적으로 결합되어 작동하는 시스템입니다.</p>
        
        <h3>하드웨어 구성 요소</h3>
        <p>AIS 시스템의 하드웨어는 선박, 육상, 그리고 위성에 걸쳐 다양한 형태로 존재하며, 정보의 송수신 및 처리를 담당합니다.</p>
        
        <h4>1. AIS 송수신기 (Transponder)</h4>
        <ul>
            <li><strong>Class A AIS:</strong> 국제항해에 종사하는 대형 선박에 의무적으로 설치되는 송수신기입니다. 더 높은 출력으로 더 자주 정보를 보고합니다.</li>
            <li><strong>Class B AIS:</strong> SOLAS 협약 의무 설치 대상이 아닌 소형 선박(레크리에이션 선박, 소규모 상업용 선박)에 사용됩니다.</li>
            <li><strong>AIS SART:</strong> 수색 및 구조 활동에 사용되는 비상용 송수신기입니다.</li>
        </ul>
        
        <h4>2. 주요 하드웨어 구성 요소</h4>
        <ul>
            <li><strong>VHF 해상 라디오:</strong> AIS 메시지 전송 및 수신에 사용되는 주파수 대역 (채널 87b, 88B)</li>
            <li><strong>GNSS 수신기:</strong> 선박의 정확한 위치(위도, 경도)를 파악하기 위한 GPS 등의 위성 항법 수신기</li>
            <li><strong>센서:</strong> 선박의 동적 정보를 측정하는 다양한 센서들 (속도, 침로, 선회율 등)</li>
            <li><strong>AIS 기지국:</strong> 해안에 위치하여 선박의 AIS 메시지를 수신하고 처리하는 고정형 장치</li>
            <li><strong>위성 기반 AIS 수신기:</strong> 저궤도 위성에 장착되어 광범위한 해양 영역의 선박을 추적</li>
        </ul>
        
        <h3>소프트웨어 및 데이터 처리 구성 요소</h3>
        
        <h4>1. 메시지 인코딩/디코딩 로직</h4>
        <ul>
            <li>AIS 메시지는 ITU-R M.1371 표준에 따라 정의된 이진 형식으로 전송됩니다.</li>
            <li>Python과 같은 프로그래밍 언어로 구현된 디코더가 필요합니다.</li>
            <li>선박 정보나 명령을 AIS 메시지로 변환하는 인코딩 로직도 중요합니다.</li>
        </ul>
        
        <h4>2. 통신 프로토콜 관리</h4>
        <ul>
            <li><strong>TDMA (Time Division Multiple Access):</strong> 시간을 분할하여 접근 기회를 할당하는 기본 기술</li>
            <li><strong>SOTDMA (Self-Organizing TDMA):</strong> Class A AIS 선박이 주변 통신 현황을 스스로 파악하여 빈 시간 슬롯을 찾아 예약</li>
            <li><strong>CSTDMA (Carrier Sense TDMA):</strong> Class B AIS 선박이 채널이 사용 중인지 감지하여 다른 통신과 겹치지 않게 데이터를 전송</li>
        </ul>
        
        <h4>3. 데이터 전처리 모듈</h4>
        <ul>
            <li>비정상 데이터 식별 및 정제</li>
            <li>누락된 데이터 보간(interpolation)</li>
            <li>노이즈 제거</li>
            <li>목적지 정보 오류 관리 (40%가량 부정확할 수 있음)</li>
        </ul>
        
        <h3>IT 개발자가 알아두어야 할 주요 사항들</h3>
        
        <h4>1. AIS의 기본 작동 원리 및 구성 이해</h4>
        <ul>
            <li><strong>시스템의 목적:</strong> 해상 교통 안전 증진, 충돌 회피 지원, 해상 상황 인식 개선</li>
            <li><strong>통신 방식:</strong> VHF 해상 이동 주파수 대역(161.975MHz, 162.025MHz) 사용</li>
            <li><strong>정보 수집 범위:</strong> 육상 기지국 40해리, 위성 기반 AIS 1,000해리 이상</li>
        </ul>
        
        <h4>2. AIS 데이터의 종류 및 구성</h4>
        <ul>
            <li><strong>정적 정보:</strong> MMSI, IMO 번호, 호출 부호, 선명, 선박 유형 등</li>
            <li><strong>동적 정보:</strong> 선박의 위치, 속도, 방향 등 실시간 운항 상태</li>
            <li><strong>항해 관련 정보:</strong> 운항 상태, 목적지, 예상 도착 시간, 흘수 등</li>
            <li><strong>안전 관련 메시지:</strong> 해상 위험이나 긴급 상황을 알리는 텍스트 메시지</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ AIS 하드웨어 구성 요소를 분류할 수 있다</li>
                <li>✅ Class A와 Class B AIS의 차이점을 설명할 수 있다</li>
                <li>✅ AIS 소프트웨어의 주요 기능을 이해한다</li>
                <li>✅ IT 개발자 관점에서 AIS 시스템의 중요성을 파악한다</li>
            </ul>
        </div>
    `;
}

function getContent1_3() {
    return `
        <h2>AIS 작동 원리 및 통신 방식</h2>
        
        <p>자동식별시스템(AIS)은 복잡해 보이지만, 선박들이 서로 정보를 주고받는 똑똑한 방법이라고 이해하시면 됩니다. 특히, AIS가 데이터를 전송하는 방식은 여러 가지가 있는데, 그 중심에는 <strong>시분할다중접속(TDMA)</strong>이라는 기술이 있습니다.</p>
        
        <h3>AIS의 핵심 작동 원리: TDMA (시분할다중접속)</h3>
        
        <p>AIS는 기본적으로 <strong>VHF 해상 이동 주파수 대역</strong>을 사용해서 정보를 주고받습니다. 마치 라디오처럼 정해진 주파수 대역을 쓰는 거죠. 그런데 한정된 주파수 대역에서 수많은 선박이 동시에 정보를 보내려고 하면 혼란이 생기겠죠? 그래서 AIS는 <strong>TDMA(Time Division Multiple Access)</strong>라는 기술을 사용합니다.</p>
        
        <p>TDMA는 쉽게 말해, <strong>시간을 잘게 쪼개서 각 선박에게 "너는 이 시간에, 너는 저 시간에" 하고 통신할 수 있는 기회를 주는 방식</strong>이에요. AIS는 1분(프레임)을 2,250개의 시간 슬롯(slot)으로 나누어 사용합니다.</p>
        
        <h3>다양한 TDMA 방식들</h3>
        
        <h4>1. SOTDMA (Self-Organizing Time Division Multiple Access)</h4>
        <ul>
            <li><strong>누가 사용하나요?</strong> 주로 Class A 선박이나 자율적이고 연속적인 운항 모드로 작동하는 이동국</li>
            <li><strong>어떤 방식인가요?</strong> "스스로 조직화하는" 방식으로, 주변 선박들의 통신 현황을 미리 파악해서 다른 선박과 겹치지 않는 빈 시간 슬롯을 스스로 찾아내 예약하고 데이터를 전송</li>
            <li><strong>왜 중요한가요?</strong> 혼잡한 해상에서도 데이터 충돌 없이 지속적으로 선박의 위치, 속력, 침로 등 핵심 정보를 실시간으로 업데이트할 수 있습니다</li>
        </ul>
        
        <h4>2. ITDMA (Incremental Time Division Multiple Access)</h4>
        <ul>
            <li><strong>누가 사용하나요?</strong> Class A 선박 및 Class B "SO" 선박</li>
            <li><strong>어떤 방식인가요?</strong> "증분적인" 예약 방식으로, 선박이 앞으로 전송할 비반복적인 메시지를 위해 미리 시간 슬롯을 확보하고 다른 선박들에게 그 슬롯을 예약했다고 알려줌</li>
            <li><strong>왜 중요한가요?</strong> 급변하는 상황이나 특정 목적을 위한 통신을 다른 정기적인 통신과 겹치지 않게 우선적으로 처리할 수 있게 해줍니다</li>
        </ul>
        
        <h4>3. RATDMA (Random Access Time Division Multiple Access)</h4>
        <ul>
            <li><strong>누가 사용하나요?</strong> Class A 및 Class B 선박 모두 사용 가능</li>
            <li><strong>어떤 방식인가요?</strong> "무작위 접근" 방식으로, 미리 예약되지 않은 슬롯을 찾아서 무작위로 전송을 시도</li>
            <li><strong>왜 중요한가요?</strong> 긴급 상황이나 예측 불가능한 정보를 빠르게 전송해야 할 때 유용합니다</li>
        </ul>
        
        <h4>4. FATDMA (Fixed Access Time Division Multiple Access)</h4>
        <ul>
            <li><strong>누가 사용하나요?</strong> 주로 기지국(Base Station)</li>
            <li><strong>어떤 방식인가요?</strong> "고정 접근" 방식으로, 기지국은 미리 특정 시간 슬롯을 할당받아 반복적인 메시지를 전송</li>
            <li><strong>왜 중요한가요?</strong> 기지국처럼 항상 안정적이고 예측 가능한 시간에 정보를 보내야 하는 경우에 사용되어 해상 관제 시스템의 안정성을 높입니다</li>
        </ul>
        
        <h4>5. CSTDMA (Carrier Sense Time Division Multiple Access)</h4>
        <ul>
            <li><strong>누가 사용하나요?</strong> 주로 Class B "CS" AIS 장치</li>
            <li><strong>어떤 방식인가요?</strong> "반송파 감지" 방식으로, 데이터를 보내기 전에 먼저 채널이 사용 중인지 "듣고" 확인한 후, 비어있는 슬롯이 있을 때만 데이터를 전송</li>
            <li><strong>왜 중요한가요?</strong> Class B AIS가 Class A AIS보다 낮은 우선순위로 통신하면서도 기존 시스템과의 간섭을 최소화하고 상호 호환성을 유지하도록 돕습니다</li>
        </ul>
        
        <h3>결론</h3>
        <p>결론적으로, AIS는 이처럼 다양한 TDMA 기반 통신 방식들을 조합하여, 선박의 종류, 운항 상황, 전송하려는 정보의 중요도에 따라 가장 효율적이고 안전한 방식으로 해상 정보를 교환하고 있습니다. 이 모든 방식들은 해상에서의 충돌 방지, 수색 및 구조 활동 지원, 선박 교통 관제 등 해상 안전을 확보하는 데 필수적인 역할을 합니다.</p>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ TDMA의 기본 원리를 설명할 수 있다</li>
                <li>✅ 5가지 TDMA 방식의 특징을 구분할 수 있다</li>
                <li>✅ AIS 통신 범위를 육상/위성별로 비교할 수 있다</li>
                <li>✅ 각 TDMA 방식의 활용 상황을 이해한다</li>
            </ul>
        </div>
    `;
}

function getContent1_4() {
    return `
        <h2>AIS 메시지 유형 및 데이터 구조</h2>
        
        <p>AIS 메시지는 해상에서 선박들이 서로 그리고 육상 관제소와 중요한 정보를 주고받는 표준화된 "언어"라고 생각하시면 됩니다. 이 메시지들은 해상 안전과 효율성을 높이는 데 필수적인 다양한 정보를 포함하고 있어요.</p>
        
        <h3>AIS 메시지 유형 및 구성 요소</h3>
        
        <p>AIS 메시지는 크게 정적(Static), 동적(Dynamic), 항해 관련(Voyage-Related), 안전 관련(Safety-Related) 정보로 구성됩니다. 이 정보들은 ITU-R M.1371 국제 표준에 따라 정의된 다양한 메시지 ID를 통해 전송됩니다.</p>
        
        <h3>주요 메시지 ID별 상세 설명</h3>
        
        <div class="message-table">
            <table>
                <thead>
                    <tr>
                        <th>메시지 ID</th>
                        <th>메시지 이름/설명</th>
                        <th>포함 정보 유형</th>
                        <th>주요 데이터 필드</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>1, 2, 3</strong></td>
                        <td>위치 보고 (Position Report)</td>
                        <td>동적 정보</td>
                        <td>선박 위치 (위도, 경도), 위치 정확도 및 무결성 상태, UTC 시간, 대지침로(COG), 대지속력(SOG), 선회율(ROT), 진침로(True Heading), 항해 상태</td>
                    </tr>
                    <tr>
                        <td><strong>4</strong></td>
                        <td>기지국 보고 (Base Station Report)</td>
                        <td>정적 정보, 동적 정보</td>
                        <td>기지국 위치, UTC 시간, 날짜, 현재 슬롯 번호</td>
                    </tr>
                    <tr>
                        <td><strong>5</strong></td>
                        <td>정적 및 항해 관련 데이터 (Static and Voyage Related Data)</td>
                        <td>정적 정보, 항해 관련 정보</td>
                        <td>MMSI, IMO 번호, 호출 부호, 선명, 선박 유형, 길이 및 폭, 위치 고정 안테나 위치, 운항 상태, 흘수, 목적지, 예상 도착 시간(ETA)</td>
                    </tr>
                    <tr>
                        <td><strong>6</strong></td>
                        <td>주소 지정 이진 메시지 (Addressed Binary Message)</td>
                        <td>시스템/응용 프로그램 데이터</td>
                        <td>특정 수신자에게 이진 데이터 전송. AIS 항로표지(AtoN) 모니터링에 활용</td>
                    </tr>
                    <tr>
                        <td><strong>8</strong></td>
                        <td>방송 이진 메시지 (Broadcast Binary Message)</td>
                        <td>시스템/응용 프로그램 데이터</td>
                        <td>수신 범위 내 모든 스테이션에 이진 데이터 방송</td>
                    </tr>
                    <tr>
                        <td><strong>12</strong></td>
                        <td>안전 관련 주소 지정 메시지 (Safety Related Addressed Message)</td>
                        <td>안전 관련 정보</td>
                        <td>특정 AIS 스테이션에 안전 관련 정보 전달</td>
                    </tr>
                    <tr>
                        <td><strong>14</strong></td>
                        <td>방송 안전 관련 메시지 (Broadcast Safety Related Message)</td>
                        <td>안전 관련 정보</td>
                        <td>모든 수신 스테이션에 안전 관련 데이터 방송. 항로표지(AtoN) 오작동 경고 가능</td>
                    </tr>
                    <tr>
                        <td><strong>18</strong></td>
                        <td>표준 Class B CS 위치 보고 (Standard Class B CS Position Report)</td>
                        <td>정적 정보, 동적 정보</td>
                        <td>MMSI, 선명, 선박 유형, 선박 위치, UTC 시간, 대지침로(COG), 대지속력(SOG)</td>
                    </tr>
                    <tr>
                        <td><strong>21</strong></td>
                        <td>항로표지 보고 (AtoN Report)</td>
                        <td>항해 관련 정보, 시스템 데이터</td>
                        <td>MMSI, 항로표지 유형, 이름, 위치, 위치 정확도, 타임스탬프, 항로표지 치수</td>
                    </tr>
                    <tr>
                        <td><strong>25, 26</strong></td>
                        <td>단일 슬롯 이진 메시지 (Single Slot Binary Message)</td>
                        <td>시스템/응용 프로그램 데이터</td>
                        <td>주소 지정 또는 방송 통신을 위한 이진 데이터</td>
                    </tr>
                    <tr>
                        <td><strong>27</strong></td>
                        <td>장거리 AIS 방송 메시지 (Long Range AIS Broadcast Message)</td>
                        <td>동적 정보</td>
                        <td>Class A 스테이션에서 위성 수신을 위해 VHF 채널 75(AIS3) 및 76(AIS4)으로 3분마다 방송</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <h3>AIS 데이터 형식 및 처리</h3>
        
        <p>AIS 데이터는 일반적으로 <strong>NMEA (National Maritime Electronic Association) 형식</strong>으로 제공되며, 실제 정보로 변환하기 위해 디코딩 과정이 필요합니다. 파이썬과 같은 프로그래밍 언어를 사용하여 NMEA 메시지를 디코딩할 수 있습니다.</p>
        
        <h3>참고 사항</h3>
        
        <ul>
            <li>선박 동적 데이터는 일반적으로 <strong>삼각형 모양의 아이콘</strong>으로 표시됩니다</li>
            <li>정적 데이터 및 안전 메시지는 <strong>텍스트 상자</strong>로 표시됩니다</li>
            <li>AIS 항로표지 메시지는 <strong>다이아몬드 모양의 아이콘</strong>으로 표시됩니다</li>
            <li>AIS 데이터는 전송 지연, 신호 손실, 장비 고장 등으로 인해 오류, 노이즈, 누락된 데이터가 발생할 수 있어 추가 분석 전에 전처리 과정이 필요할 수 있습니다</li>
            <li>특히, 수동으로 입력되는 <strong>목적지 정보</strong> 같은 필드에는 오타나 약어 등 오류가 많을 수 있습니다</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ AIS 데이터의 4가지 주요 범주를 구분할 수 있다</li>
                <li>✅ 주요 메시지 ID의 기능을 설명할 수 있다</li>
                <li>✅ ASM의 개념과 활용 방안을 이해한다</li>
                <li>✅ AIS 데이터 형식과 처리 방법을 파악한다</li>
            </ul>
        </div>
    `;
}

// 유틸리티 함수들
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element) {
    const loading = element.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// 애니메이션 효과
function addFadeInEffect(element) {
    element.classList.add('fade-in');
}

function addSlideInEffect(element) {
    element.classList.add('slide-in');
}

// 로컬 스토리지 관리
function saveProgress(courseId, progress) {
    localStorage.setItem(`ais_course_${courseId}`, JSON.stringify(progress));
}

function loadProgress(courseId) {
    const saved = localStorage.getItem(`ais_course_${courseId}`);
    return saved ? JSON.parse(saved) : null;
}

// 검색 기능 향상
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// 반응형 처리
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const header = document.querySelector('.header');
    
    if (isMobile) {
        header.classList.add('mobile');
    } else {
        header.classList.remove('mobile');
    }
}

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', handleResize);

// 초기 리사이즈 처리
handleResize();

// 추가 콘텐츠 함수들
function getContent2_1() {
    return `
        <h2>국제 규정 및 표준</h2>
        
        <p>AIS(자동식별시스템)는 국제적으로나 국내적으로 엄격한 규정과 표준에 따라 운영되는 중요한 시스템입니다. 해상 안전을 위해 AIS가 어떻게 규제되고 있는지 자세히 알아보겠습니다.</p>
        
        <h3>국제 규정 및 표준</h3>
        
        <p>AIS는 국제해사기구(IMO), 국제전기통신연합(ITU-R), 국제항로표지협회(IALA), 국제전기기술위원회(IEC) 등의 국제기구들에 의해 표준화되고 규정됩니다.</p>
        
        <h4>1. IMO(국제해사기구 - International Maritime Organization)</h4>
        
        <h5>SOLAS 협약 (해상인명안전협약 - Safety of Life at Sea)</h5>
        <p>AIS 설치 의무화를 규정하는 핵심 국제 협약입니다.</p>
        
        <ul>
            <li><strong>설치 의무 대상 선박:</strong>
                <ul>
                    <li>국제 항해에 종사하는 총톤수 300톤 이상의 선박</li>
                    <li>국제 항해에 종사하지 않는 총톤수 500톤 이상의 화물선</li>
                    <li>모든 크기의 여객선 (총톤수 무관)</li>
                </ul>
            </li>
            <li>AIS는 선박 운항 시스템 및 장비 탑재 요건을 명시한 SOLAS 규정 V/19에 포함</li>
            <li>2002년 7월 1일부터 신조 선박에 의무적으로 적용 시작</li>
            <li>2008년 7월까지 모든 SOLAS 선박에 AIS 설치 완료</li>
        </ul>
        
        <h5>성능 표준 및 운용 지침</h5>
        <ul>
            <li>IMO는 AIS의 성능 표준을 채택하여 AIS가 수행해야 할 기본 요소를 정의</li>
            <li>WGS 84 기반의 위치, 대지속력, 센서 정보 등을 제공해야 함을 명시</li>
            <li>AIS가 제공해야 하는 정보 내용, 특히 정적 및 동적 데이터에 대한 상세한 규정</li>
        </ul>
        
        <h4>2. ITU-R (국제전기통신연합 전파통신부문)</h4>
        
        <ul>
            <li><strong>ITU-R M.1371 표준:</strong> AIS 메시지의 비트 단위 설명과 파라미터 이름 및 단위를 포함한 정보 변환에 필요한 모든 정보를 담고 있는 국제 표준</li>
            <li><strong>주파수 및 프로토콜:</strong> AIS는 VHF 해상 이동 주파수 대역(주로 161.975 MHz 및 162.025 MHz)에서 방송</li>
            <li><strong>통신 기술:</strong> 자체 조직 시분할다중접속(SOTDMA) 기술을 사용하여 높은 데이터 전송률과 견고한 작동을 보장</li>
        </ul>
        
        <h4>3. IALA (국제항로표지협회)</h4>
        
        <ul>
            <li>IALA는 AIS 표준 개발을 후원하고 조율하는 주요 기관</li>
            <li><strong>AIS AtoN (항로표지) 지침:</strong> 항로표지에 AIS를 적용하는 방법에 대한 지침 제공
                <ul>
                    <li>실제 항로표지(Physical AIS AtoN)</li>
                    <li>합성 예측 AIS AtoN(Synthetic Predicted AIS AtoN)</li>
                    <li>모니터링되는 합성 AIS AtoN(Monitored Synthetic AIS AtoN)</li>
                </ul>
            </li>
            <li><strong>메시지 모니터링 및 관리:</strong> 지역별 ASM(Application Specific Messages) 등록부를 운영</li>
        </ul>
        
        <h4>4. IEC (국제전기기술위원회)</h4>
        
        <ul>
            <li>AIS는 IEC에서 제정한 일련의 테스트 표준에 의해 규제</li>
            <li><strong>데이터 형식 및 디스플레이:</strong> AIS 호환 항해 디스플레이(IEC 62288)에 선박 동적 데이터, 정적 데이터, 안전 메시지, AIS AtoN 메시지 등이 어떻게 표시되어야 하는지 규정</li>
        </ul>
        
        <h3>국내 규정 (대한민국)</h3>
        
        <p>대한민국에서도 해상 안전을 위해 AIS 설치 및 운영에 대한 법적 의무가 있습니다.</p>
        
        <h4>선박안전법 및 선박설비기준</h4>
        
        <p>해양수산부의 '선박설비기준 제108조의5(자동식별장치)'에 따라 AIS 설치 대상 선박이 명시됩니다.</p>
        
        <ul>
            <li><strong>설치 의무 대상 선박:</strong>
                <ul>
                    <li>「해운법」에 따른 여객선</li>
                    <li>총톤수 150톤 이상 여객선 (호소·하천 운항 선박 및 도선 제외)</li>
                    <li>여객선 외 다음 각 목의 선박:
                        <ul>
                            <li>국제항해에 종사하는 총톤수 300톤 이상의 선박</li>
                            <li>국제항해에 종사하지 않는 총톤수 500톤 이상의 선박</li>
                            <li>연해구역 이상을 항해하는 총톤수 50톤 이상의 선박 (부선 제외)</li>
                        </ul>
                    </li>
                    <li>총톤수 10톤 이상의 어선 (내수면 어선, 연안으로부터 5마일 이내 어장관리 종사 어선 제외)</li>
                </ul>
            </li>
            <li><strong>관리 기관:</strong> 해양수산부는 AIS 기반 선박 정적 정보 및 선박 위치 정보를 해양안전종합정보시스템(GICOMS)을 통해 관리하고 공공데이터 포털을 통해 제공</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ AIS 관련 주요 국제기구(IMO, ITU-R, IALA, IEC)의 역할과 책임을 구분할 수 있다</li>
                <li>✅ SOLAS 협약의 AIS 설치 의무 대상과 적용 기준을 설명할 수 있다</li>
                <li>✅ ITU-R M.1371 표준의 중요성과 AIS 기술 규격을 이해한다</li>
                <li>✅ 국내 AIS 규정과 국제 규정의 차이점을 비교할 수 있다</li>
            </ul>
        </div>
    `;
}

function getContent2_2() {
    return `
        <h2>국내 규정 및 법령</h2>
        
        <p>대한민국에서도 해상 안전을 위해 AIS 설치 및 운영에 대한 법적 의무가 있습니다. 국내 규정은 국제 규정보다 더 넓은 범위의 선박에 적용될 수 있습니다.</p>
        
        <h3>AIS 설치 의무 대상 선박</h3>
        
        <p>해양수산부의 '선박설비기준 제108조의5(자동식별장치)'에 따라 AIS 설치 대상 선박이 명시됩니다.</p>
        
        <h4>국제 규정 (IMO SOLAS 협약 기준)</h4>
        
        <p>국제해사기구(IMO)는 해상인명안전협약(SOLAS 협약)을 통해 AIS 설치를 의무화했습니다. 이 규정은 2002년 7월 1일부터 신조 선박에 적용되기 시작했으며, 2008년 7월까지 모든 SOLAS 적용 대상 선박은 AIS를 설치해야 했습니다.</p>
        
        <ul>
            <li><strong>국제 항해에 종사하는 총톤수 300톤 이상의 선박</strong></li>
            <li><strong>국제 항해에 종사하지 않는 총톤수 500톤 이상의 화물선</strong></li>
            <li><strong>크기에 관계없이 모든 여객선</strong></li>
        </ul>
        
        <h4>국내 규정 (대한민국 선박안전법 및 선박설비기준)</h4>
        
        <p>국내에서 AIS 설치가 의무화된 선박은 다음과 같습니다:</p>
        
        <ul>
            <li><strong>「해운법」에 따른 여객선</strong></li>
            <li><strong>총톤수 150톤 이상 여객선</strong> (단, 호소·하천을 운항하는 선박 및 「유선 및 도선사업법」에 따른 도선은 제외)</li>
            <li><strong>여객선 이외의 선박으로서 다음 각 목의 선박:</strong>
                <ul>
                    <li>국제 항해에 종사하는 총톤수 <strong>300톤 이상</strong>의 선박 (국제 규정과 동일)</li>
                    <li>국제 항해에 종사하지 아니하는 총톤수 <strong>500톤 이상</strong>의 선박 (국제 규정과 동일)</li>
                    <li>연해구역 이상을 항해하는 총톤수 <strong>50톤 이상</strong>의 선박 (단, 부선은 제외) (국제 규정보다 작은 규모의 선박에도 적용)</li>
                </ul>
            </li>
            <li><strong>총톤수 10톤 이상 어선</strong> (단, 내수면 어선, 연안으로부터 5마일 이내에서 어장관리에 종사하는 어선은 제외) (어선에 대한 특정 기준)</li>
        </ul>
        
        <h3>GICOMS 시스템</h3>
        
        <p><strong>해양안전종합정보시스템(GICOMS)</strong>은 해양수산부에서 운영하는 AIS 기반 선박 정보 관리 시스템으로, 다음과 같은 기능을 제공합니다:</p>
        
        <ul>
            <li><strong>선박 정적 정보 관리:</strong> MMSI, IMO 번호, 선명, 선박 유형 등 선박의 고유 정보를 관리</li>
            <li><strong>선박 위치 정보 관리:</strong> 실시간 선박 위치, 속력, 침로 등 동적 정보를 추적</li>
            <li><strong>공공데이터 포털 제공:</strong> AIS 데이터를 공공데이터 포털을 통해 일반인과 연구자들이 활용할 수 있도록 제공</li>
            <li><strong>해양 안전 정책 수립 지원:</strong> 수집된 AIS 데이터를 바탕으로 해양 안전 정책을 수립하고 국제 해운 흐름을 분석</li>
        </ul>
        
        <h3>설치 의무의 중요성</h3>
        
        <p>이러한 기준들은 해상 교통의 안전을 확보하고 해상 감시를 효과적으로 수행하기 위해 설정된 것입니다.</p>
        
        <ul>
            <li>전 세계적으로 <strong>200,000척 이상</strong>의 선박이 AIS 트랜스폰더를 장착하고 있습니다</li>
            <li>이는 해상 안전 및 항해에 필수적인 시스템이 되었음을 의미합니다</li>
            <li>AIS 데이터를 통해 해양수산부는 선박의 정적 정보와 위치 정보를 관리하며, 이는 해양 안전 정책 수립, 국제 해운 흐름 분석 등 다양한 분야에 활용됩니다</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ 국내 AIS 설치 의무 대상을 나열할 수 있다</li>
                <li>✅ 국내외 규정의 차이점을 비교할 수 있다</li>
                <li>✅ GICOMS 시스템의 역할을 이해한다</li>
                <li>✅ AIS 설치 의무의 중요성을 설명할 수 있다</li>
            </ul>
        </div>
    `;
}

function getContent2_3() {
    return `
        <h2>AIS 설치 의무 대상</h2>
        
        <p>자동식별시스템(AIS)은 해상 안전을 지키는 데 정말 중요한 역할을 합니다. 그래서 전 세계적으로, 그리고 우리나라에서도 특정 선박들에게는 AIS 설치를 의무화하고 있습니다. 설치 의무 대상이 되는 선박들의 기준을 함께 알아볼까요?</p>
        
        <h3>AIS 설치 의무 대상 선박 기준</h3>
        
        <p>소스에서 각 국가 또는 전 세계적으로 AIS가 설치된 '총 선박 수량'을 직접적으로 명시하고 있지는 않지만, '어떤 선박들이' AIS 설치 의무 대상인지에 대한 명확한 기준을 제시하고 있습니다.</p>
        
        <h4>국제 규정 기준</h4>
        
        <p>국제해사기구(IMO)는 해상인명안전협약(SOLAS 협약)을 통해 AIS 설치를 의무화했습니다. 이 규정은 2002년 7월 1일부터 신조 선박에 적용되기 시작했으며, 2008년 7월까지 모든 SOLAS 적용 대상 선박은 AIS를 설치해야 했습니다.</p>
        
        <h5>SOLAS 협약 기준 설치 의무 대상</h5>
        
        <ul>
            <li><strong>국제 항해에 종사하는 총톤수 300톤 이상의 선박</strong></li>
            <li><strong>국제 항해에 종사하지 않는 총톤수 500톤 이상의 화물선</strong></li>
            <li><strong>크기에 관계없이 모든 여객선</strong></li>
        </ul>
        
        <h4>국내 규정 기준</h4>
        
        <p>대한민국 해양수산부는 '선박설비기준' 제108조의5(자동식별장치)에 따라 AIS 설치 의무 대상 선박을 명시하고 있습니다. 국내 규정은 국제 규정보다 더 넓은 범위의 선박에 적용될 수 있습니다.</p>
        
        <h5>선박안전법 기준 설치 의무 대상</h5>
        
        <ul>
            <li><strong>「해운법」에 따른 여객선</strong></li>
            <li><strong>총톤수 150톤 이상 여객선</strong> (단, 호소·하천을 운항하는 선박 및 「유선 및 도선사업법」에 따른 도선은 제외)</li>
            <li><strong>여객선 이외의 선박으로서 다음 각 목의 선박:</strong>
                <ul>
                    <li>국제 항해에 종사하는 총톤수 <strong>300톤 이상</strong>의 선박 (국제 규정과 동일)</li>
                    <li>국제 항해에 종사하지 아니하는 총톤수 <strong>500톤 이상</strong>의 선박 (국제 규정과 동일)</li>
                    <li>연해구역 이상을 항해하는 총톤수 <strong>50톤 이상</strong>의 선박 (단, 부선은 제외) (국제 규정보다 작은 규모의 선박에도 적용)</li>
                </ul>
            </li>
            <li><strong>총톤수 10톤 이상 어선</strong> (단, 내수면 어선, 연안으로부터 5마일 이내에서 어장관리에 종사하는 어선은 제외) (어선에 대한 특정 기준)</li>
        </ul>
        
        <h3>설치 의무의 중요성</h3>
        
        <p>이러한 기준들은 해상 교통의 안전을 확보하고 해상 감시를 효과적으로 수행하기 위해 설정된 것입니다.</p>
        
        <h4>전 세계 AIS 설치 현황</h4>
        
        <ul>
            <li>전 세계적으로 <strong>200,000척 이상</strong>의 선박이 AIS 트랜스폰더를 장착하고 있습니다</li>
            <li>이는 해상 안전 및 항해에 필수적인 시스템이 되었음을 의미합니다</li>
            <li>AIS 데이터를 통해 해양수산부는 선박의 정적 정보와 위치 정보를 관리하며, 이는 해양 안전 정책 수립, 국제 해운 흐름 분석 등 다양한 분야에 활용됩니다</li>
        </ul>
        
        <h4>AIS 설치 의무의 효과</h4>
        
        <ol>
            <li><strong>해상 안전 증진:</strong> 모든 의무 대상 선박이 AIS를 통해 실시간 정보를 공유하여 충돌 위험을 줄입니다</li>
            <li><strong>해상 감시 강화:</strong> 해상 교통 관제소가 선박의 위치와 움직임을 실시간으로 모니터링할 수 있습니다</li>
            <li><strong>수색 및 구조 활동 지원:</strong> 조난 선박의 마지막 위치 정보를 제공하여 구조 활동을 돕습니다</li>
            <li><strong>해상 교통 효율성 향상:</strong> 선박 교통 흐름을 분석하여 항로 최적화와 항만 운영 효율성을 높입니다</li>
        </ol>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ SOLAS 협약의 AIS 설치 의무 대상을 분류할 수 있다</li>
                <li>✅ 국내 AIS 설치 의무 대상을 나열할 수 있다</li>
                <li>✅ 국내외 규정의 차이점을 비교할 수 있다</li>
                <li>✅ AIS 설치 의무의 중요성과 효과를 설명할 수 있다</li>
            </ul>
        </div>
    `;
}

function getContent3_1() {
    return `
        <h2>AIS 데이터 전처리</h2>
        
        <p>대량의 AIS 데이터에서 유용한 정보를 추출하는 것은 쉽지 않으며, 데이터의 양, 불완전성, 노이즈, 악성/미식별 선박 등의 문제로 인해 여러 가지 과제가 따릅니다.</p>
        
        <p>AIS 데이터는 분석에 앞서 반드시 전처리 과정을 거쳐야 합니다. 이 과정을 통해 데이터의 품질을 향상시키고 분석 알고리즘의 성능을 최적화할 수 있습니다.</p>
        
        <h3>데이터 전처리 단계</h3>
        
        <p>AIS 데이터 전처리는 다음과 같은 주요 단계로 구성됩니다:</p>
        
        <ol>
            <li><strong>형식 변환:</strong> DBF 형식의 원시 데이터베이스 파일을 CSV 형식으로 변환</li>
            <li><strong>데이터 선택 및 정렬:</strong> 시간순 및 MMSI별 정렬</li>
            <li><strong>항해 조건 및 복잡성 계산:</strong> 유용한 데이터 필터링</li>
            <li><strong>노이즈 제거:</strong> 불량 데이터 식별 및 제거</li>
            <li><strong>결측값 보간:</strong> 누락된 데이터 복원</li>
        </ol>
        
        <h3>데이터 형식 변환</h3>
        
        <ul>
            <li><strong>DBF → CSV 변환:</strong> DBF 형식의 원시 데이터베이스 파일을 CSV 형식으로 변환하여 연구자들이 쉽게 처리할 수 있도록 합니다</li>
            <li><strong>GIS 소프트웨어 활용:</strong> ArcMap과 같은 GIS 소프트웨어의 도구를 사용하여 지리 공간 데이터를 내보냅니다</li>
            <li><strong>표준화된 형식:</strong> 변환된 CSV 파일은 표준화된 형식으로 저장되어 다양한 분석 도구에서 활용할 수 있습니다</li>
        </ul>
        
        <h3>데이터 선택 및 정렬</h3>
        
        <ul>
            <li><strong>시간순 정렬:</strong> 전체 원시 데이터를 시간순으로 정렬하여 시간적 연속성을 확보합니다</li>
            <li><strong>MMSI별 정렬:</strong> 시간순 정렬 후 MMSI별로 다시 정렬하여 각 선박의 항적을 시계열 순으로 쉽게 처리할 수 있도록 합니다</li>
            <li><strong>데이터 구조화:</strong> 정렬된 데이터는 각 선박의 항적을 연대순으로 표시하고 처리하기 쉽게 만듭니다</li>
        </ul>
        
        <h3>항해 조건 및 복잡성 계산</h3>
        
        <h4>항해 조건 정의</h4>
        
        <ul>
            <li><strong>SOG 기준:</strong> SOG(대지속력) 값이 0이 아닌 경우를 항해 조건으로 정의합니다</li>
            <li><strong>최소 메시지 수:</strong> 항적 데이터에 500개 이상의 AIS 메시지가 포함되어야 유용한 데이터로 간주합니다</li>
            <li><strong>복잡성 계산:</strong> 항적의 복잡성은 각 선박 위치의 cos θ 평균값으로 계산합니다</li>
            <li><strong>유의미한 항적:</strong> 0.8보다 큰 항적만 유의미하게 간주합니다</li>
        </ul>
        
        <h4>데이터 품질 기준</h4>
        
        <ul>
            <li><strong>충분한 데이터 포인트:</strong> 경로 예측 및 데이터 마이닝 알고리즘에 충분한 정보를 포함</li>
            <li><strong>적절한 복잡도:</strong> 단순한 직선 경로가 아닌 의미 있는 항해 패턴을 보이는 항적</li>
            <li><strong>시간적 연속성:</strong> 일정한 시간 간격으로 수집된 데이터</li>
        </ul>
        
        <h3>노이즈 제거</h3>
        
        <p>불연속적인 항적, 느슨한 항적, 엉킨 항적과 같은 노이즈가 있는 항적은 예측 및 데이터 마이닝 알고리즘에 방해가 되므로 제거해야 합니다.</p>
        
        <h4>노이즈 유형</h4>
        
        <ul>
            <li><strong>불연속적인 항적:</strong> 시간적으로 연결되지 않은 데이터 포인트들</li>
            <li><strong>느슨한 항적:</strong> 데이터 포인트 간 거리가 너무 멀어 연속성이 떨어지는 항적</li>
            <li><strong>엉킨 항적:</strong> 데이터 포인트들이 무작위로 분산되어 패턴을 파악하기 어려운 항적</li>
        </ul>
        
        <h4>노이즈 제거 방법</h4>
        
        <ul>
            <li><strong>통계적 방법:</strong> 이상치 탐지 알고리즘을 사용하여 비정상적인 데이터 포인트 식별</li>
            <li><strong>지리적 방법:</strong> Haversine 공식을 사용하여 거리 기반 이상치 탐지</li>
            <li><strong>시간적 방법:</strong> 시간 간격이 비정상적으로 긴 데이터 포인트 제거</li>
        </ul>
        
        <h3>결측값 보간</h3>
        
        <p>데이터 누락으로 인한 불연속성은 학습 알고리즘의 성능과 데이터 마이닝 품질에 영향을 미칠 수 있으므로 적절한 보간 방법을 사용해야 합니다.</p>
        
        <h4>선형 보간법</h4>
        
        <ul>
            <li><strong>기본 원리:</strong> 두 개의 알려진 데이터 포인트 사이의 값을 선형적으로 추정</li>
            <li><strong>적용 조건:</strong> 두 메시지 사이의 시간 간격이 설정된 임계값(예: 1분)보다 클 때</li>
            <li><strong>수식:</strong> y = y₁ + (y₂ - y₁) × (t - t₁) / (t₂ - t₁)</li>
        </ul>
        
        <h4>속도 오류 감지 및 수정</h4>
        
        <ul>
            <li><strong>SOG 점프 감지:</strong> 현재 SOG와 이전 SOG의 차이를 기반으로 속도 오류를 감지</li>
            <li><strong>Haversine 공식:</strong> 두 지점 간의 거리를 정확하게 계산하여 속도 검증</li>
            <li><strong>임계값 설정:</strong> 비정상적인 속도 변화를 식별하기 위한 임계값 설정</li>
        </ul>
        
        <h4>보간 품질 관리</h4>
        
        <ul>
            <li><strong>물리적 제약 고려:</strong> 선박의 최대 속도, 가속도 등 물리적 제약을 고려한 보간</li>
            <li><strong>데이터 무결성 유지:</strong> 보간 과정에서 원본 데이터의 무결성을 최대한 보존</li>
            <li><strong>검증 과정:</strong> 보간된 데이터의 품질을 검증하는 후처리 과정</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ AIS 데이터 전처리의 필요성과 주요 단계를 이해한다</li>
                <li>✅ 데이터 형식 변환 방법(DBF → CSV)을 설명할 수 있다</li>
                <li>✅ 노이즈 제거 기법과 결측값 보간 방법을 파악한다</li>
                <li>✅ Haversine 공식을 활용한 데이터 검증 방법을 이해한다</li>
            </ul>
        </div>
    `;
}

function getContent3_2() {
    return `
        <h2>데이터 품질 관리</h2>
        
        <p>선박 행동을 빠르게 식별하고 잠재적인 문제나 위협을 파악하기 위해 자동화된 기계 학습 접근 방식이 필요합니다. AIS 데이터에서 선박의 항적을 정확하게 식별하고 분류하는 것은 해상 안전과 교통 관제에 매우 중요합니다.</p>
        
        <h3>항적 식별 및 분류</h3>
        
        <h4>Hough 변환 및 DBSCAN</h4>
        
        <h5>Hough 변환</h5>
        <ul>
            <li><strong>목적:</strong> 선박 항적 정보를 생성하는 데 사용됩니다</li>
            <li><strong>원리:</strong> 이미지 공간에서 직선을 파라미터 공간으로 변환하여 직선을 감지하는 기법</li>
            <li><strong>AIS 적용:</strong> 선박의 직선 항로를 식별하고 분석하는 데 활용</li>
            <li><strong>장점:</strong> 노이즈가 있는 데이터에서도 직선 패턴을 효과적으로 감지</li>
        </ul>
        
        <h5>DBSCAN (Density-Based Spatial Clustering)</h5>
        <ul>
            <li><strong>목적:</strong> 선박 항적을 자동으로 식별하는 데 사용됩니다</li>
            <li><strong>특징:</strong> 저밀도 영역의 데이터를 노이즈로 식별하고 제거</li>
            <li><strong>k-평균 클러스터링의 단점 보완:</strong>
                <ul>
                    <li>클러스터 수를 미리 지정할 필요 없음</li>
                    <li>임의의 모양의 클러스터를 찾을 수 있음</li>
                    <li>노이즈 데이터를 자동으로 식별하고 제거</li>
                </ul>
            </li>
            <li><strong>AIS 데이터 적용:</strong> 선박의 항적 패턴을 클러스터링하여 유사한 행동을 보이는 선박들을 그룹화</li>
        </ul>
        
        <h3>지리적 섹터링 및 다운샘플링</h3>
        
        <h4>지리적 섹터링</h4>
        <ul>
            <li><strong>목적:</strong> 방대한 데이터 분석의 계산 부담을 줄이고 실시간 애플리케이션을 지원</li>
            <li><strong>방법:</strong> 분석 영역을 더 작은 덩어리로 나누어 처리</li>
            <li><strong>장점:</strong>
                <ul>
                    <li>메모리 사용량 감소</li>
                    <li>처리 속도 향상</li>
                    <li>지역별 특성 분석 가능</li>
                </ul>
            </li>
            <li><strong>적용 예:</strong> 특정 해역이나 항만 지역의 선박 교통 분석</li>
        </ul>
        
        <h4>다운샘플링</h4>
        <ul>
            <li><strong>목적:</strong> 데이터 포인트를 줄여서 처리 효율성을 높임</li>
            <li><strong>방법:</strong>
                <ul>
                    <li>시간 간격을 늘려서 데이터 포인트 수 감소</li>
                    <li>중요하지 않은 데이터 포인트 제거</li>
                    <li>통계적 샘플링 기법 적용</li>
                </ul>
            </li>
            <li><strong>주의사항:</strong> 중요한 정보 손실을 방지하기 위해 적절한 샘플링 전략 필요</li>
        </ul>
        
        <h3>선박 행동 분류</h3>
        
        <p>다양한 선박 유형의 행동을 분류하기 위한 기계 학습 시스템이 개발됩니다.</p>
        
        <h4>선박 유형별 특성</h4>
        
        <div class="ship-types">
            <div class="ship-type">
                <h5>어선</h5>
                <ul>
                    <li>느리고 꾸준한 속도</li>
                    <li>많은 코스 변경</li>
                    <li>특정 어장에서의 순환 패턴</li>
                </ul>
            </div>
            
            <div class="ship-type">
                <h5>유조선</h5>
                <ul>
                    <li>비교적 높은 속도</li>
                    <li>일관된 직선 항로</li>
                    <li>항만 간 정기적인 운항</li>
                </ul>
            </div>
            
            <div class="ship-type">
                <h5>화물선</h5>
                <ul>
                    <li>중간 속도</li>
                    <li>정기적인 항로</li>
                    <li>화물 적재/하역을 위한 정박</li>
                </ul>
            </div>
            
            <div class="ship-type">
                <h5>여객선</h5>
                <ul>
                    <li>높은 속도</li>
                    <li>정해진 스케줄</li>
                    <li>승객 안전을 고려한 안정적인 항로</li>
                </ul>
            </div>
            
            <div class="ship-type">
                <h5>도선선</h5>
                <ul>
                    <li>짧은 거리 운항</li>
                    <li>높은 빈도의 왕복</li>
                    <li>항만 내 제한된 활동 범위</li>
                </ul>
            </div>
        </div>
        
        <h4>분류 알고리즘</h4>
        <ul>
            <li><strong>지도 학습:</strong> 레이블이 있는 데이터를 사용하여 선박 유형별 행동 패턴 학습</li>
            <li><strong>비지도 학습:</strong> 데이터의 숨겨진 패턴을 발견하여 새로운 선박 유형 식별</li>
            <li><strong>앙상블 방법:</strong> 여러 알고리즘의 결과를 결합하여 분류 정확도 향상</li>
        </ul>
        
        <h3>특징 추출</h3>
        
        <p>Haversine 거리를 사용하여 두 지점 간의 거리 및 방위와 같은 주요 측정값을 기반으로 다양한 유용한 특징이 추출됩니다.</p>
        
        <h4>지리적 특징</h4>
        <ul>
            <li><strong>Haversine 거리:</strong> 두 지점 간의 대원거리 계산</li>
            <li><strong>방위각:</strong> 선박의 진행 방향</li>
            <li><strong>속도 변화율:</strong> 가속도 및 감속도</li>
            <li><strong>회전율:</strong> 방향 전환의 급격함</li>
        </ul>
        
        <h4>시간적 특징</h4>
        <ul>
            <li><strong>항해 시간:</strong> 총 항해 소요 시간</li>
            <li><strong>정박 시간:</strong> 항만에서의 체류 시간</li>
            <li><strong>속도 패턴:</strong> 시간대별 속도 변화</li>
            <li><strong>항로 복잡도:</strong> 경로의 곡률과 변화</li>
        </ul>
        
        <h4>통계적 특징</h4>
        <ul>
            <li><strong>평균 속도:</strong> 전체 항해 구간의 평균 속도</li>
            <li><strong>속도 분산:</strong> 속도 변화의 정도</li>
            <li><strong>방향 일관성:</strong> 직선 항로 유지 정도</li>
            <li><strong>정박 빈도:</strong> 정박 횟수와 패턴</li>
        </ul>
        
        <h3>데이터 품질 검증</h3>
        
        <h4>실시간 품질 모니터링</h4>
        <ul>
            <li><strong>데이터 완전성:</strong> 필수 필드의 누락 여부 확인</li>
            <li><strong>데이터 일관성:</strong> 논리적 모순 여부 검사</li>
            <li><strong>데이터 정확성:</strong> 물리적 제약 조건 검증</li>
            <li><strong>데이터 신선도:</strong> 최신 데이터 수신 여부 확인</li>
        </ul>
        
        <h4>품질 지표</h4>
        <ul>
            <li><strong>완전성 지수:</strong> 필수 데이터 필드의 완성도</li>
            <li><strong>정확성 지수:</strong> 오류 데이터의 비율</li>
            <li><strong>일관성 지수:</strong> 논리적 일관성 유지 정도</li>
            <li><strong>신선도 지수:</strong> 데이터의 최신성 정도</li>
        </ul>
        
        <h4>품질 개선 방안</h4>
        <ul>
            <li><strong>자동 보정:</strong> 명백한 오류의 자동 수정</li>
            <li><strong>데이터 보강:</strong> 누락된 정보의 추론 및 보완</li>
            <li><strong>이상치 처리:</strong> 비정상적인 데이터의 식별 및 처리</li>
            <li><strong>검증 규칙:</strong> 데이터 품질을 보장하는 규칙 설정</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ 항적 식별 및 분류 기법을 이해한다</li>
                <li>✅ Hough 변환과 DBSCAN의 차이점을 설명할 수 있다</li>
                <li>✅ 선박 유형별 행동 특성을 구분할 수 있다</li>
                <li>✅ 데이터 품질 검증 방법을 적용할 수 있다</li>
            </ul>
        </div>
    `;
}

function getContent3_3() {
    return `
        <h2>기계학습 및 AI 활용</h2>
        
        <p>AIS 시장은 규제 요건, 기술 발전, 운영 효율성 강조에 따라 빠르게 성장하고 있습니다. 특히 IoT, AI, 블록체인, 5G, 자율 기술과의 융합은 AIS 터미널 시장을 근본적으로 재편하고 있습니다.</p>
        
        <h3>신기술과의 통합 및 미래 전망</h3>
        
        <h4>IoT 통합</h4>
        <ul>
            <li><strong>실시간 데이터 교환:</strong> 선박과 육상 시스템 간의 즉각적인 정보 공유</li>
            <li><strong>상황 인식 향상:</strong> 더 많은 센서 데이터를 통한 종합적인 상황 파악</li>
            <li><strong>예측적 유지보수:</strong> 선박 장비의 상태를 실시간으로 모니터링하여 고장 예방</li>
            <li><strong>운영 효율성 증대:</strong> 데이터 기반의 의사결정으로 연료 소비 최적화</li>
        </ul>
        
        <h4>AI 및 딥러닝</h4>
        <ul>
            <li><strong>GCNN (그래프 컨볼루션 신경망):</strong> 규제된 선박 항적에 대해 98.3%의 인식 정확도 달성</li>
            <li><strong>RNN/LSTM:</strong> 시계열 데이터 처리에 특화</li>
            <li><strong>GRU:</strong> LSTM의 간소화된 버전으로 빠른 학습 속도</li>
            <li><strong>Extreme Learning Machine:</strong> 빠른 훈련 속도와 높은 일반화 기능</li>
        </ul>
        
        <h3>사이버 보안</h3>
        
        <h4>AIS의 보안 취약점</h4>
        <ul>
            <li><strong>비보안적 설계:</strong> AIS는 설계상 비보안적이고 비독점적인 개방형 방송</li>
            <li><strong>스푸핑 위험:</strong> 기만적이거나 허위 방송(스푸핑)을 전송하는 것이 어렵지 않음</li>
            <li><strong>데이터 무결성:</strong> 전송 과정에서 데이터 조작 가능성</li>
            <li><strong>개인정보 보호:</strong> 선박의 민감한 정보 노출 위험</li>
        </ul>
        
        <h4>보안 대응 방안</h4>
        <ul>
            <li><strong>폴링 메커니즘:</strong> 스푸핑이 의심되는 경우 대상에 새로운 보고서 요청</li>
            <li><strong>자동 경고 시스템:</strong> 잘못된 대상이 감지될 경우 자동 경고 및 확인 제공</li>
            <li><strong>암호화 기술:</strong> 민감한 정보의 암호화 전송</li>
            <li><strong>블록체인 기술:</strong> 데이터 무결성 보장을 위한 분산 원장 기술</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ AI/ML 기술의 AIS 적용 사례를 이해한다</li>
                <li>✅ IoT 통합의 장점과 활용 방안을 파악한다</li>
                <li>✅ AIS의 보안 취약점과 대응 방안을 설명할 수 있다</li>
                <li>✅ 미래 기술 발전 방향을 예측할 수 있다</li>
            </ul>
        </div>
    `;
}

function getContent4_1() {
    return `
        <h2>해상 안전 및 보안</h2>
        
        <p>AIS는 단순히 음성으로 정보를 주고받는 무선 통신이나, 레이더처럼 물체의 존재 여부만 파악하는 수준을 넘어, 해상 환경에 최적화된 여러 독점적인 이점들을 제공합니다.</p>
        
        <h3>AIS 통신의 주요 특장점</h3>
        
        <h4>실시간 자동 정보 교환 및 상황 인식 강화</h4>
        <ul>
            <li><strong>자동성 및 지속성:</strong> 선박의 식별 정보, 위치, 속력, 침로 등 핵심 항해 정보를 자동으로 연속적으로 방송</li>
            <li><strong>충돌 회피 및 안전 증진:</strong> 주변 선박들의 정확한 항해 정보를 실시간으로 파악하여 충돌 위험을 조기에 감지</li>
        </ul>
        
        <h4>풍부하고 표준화된 정보 제공</h4>
        <ul>
            <li><strong>선박의 고유 식별자:</strong> MMSI, IMO 번호, 호출 부호, 선명, 선박 유형, 크기 등</li>
            <li><strong>실시간 운항 정보:</strong> 위치, 속력, 침로, 선회율, 항해 상태 등</li>
            <li><strong>항해 관련 정보:</strong> 목적지, 예상 도착 시간, 흘수 등</li>
            <li><strong>안전 관련 메시지:</strong> 해상 위험이나 긴급 상황을 알리는 텍스트 메시지</li>
        </ul>
        
        <h3>해상 안전 및 보안 응용 분야</h3>
        
        <h4>교통 이상 감지</h4>
        <ul>
            <li>실시간으로 잠재적인 이상 활동이나 선박을 식별</li>
            <li>어선에 대한 이상 감지는 해양 어업 모니터링에 중요</li>
        </ul>
        
        <h4>충돌 예측</h4>
        <ul>
            <li>선박 도메인 모델을 사용하여 충돌 위험을 평가</li>
            <li>인공 신경망을 통해 학습된 선박 도메인 활용</li>
        </ul>
        
        <h4>수색 및 구조 (SAR) 지원</h4>
        <ul>
            <li>조난 선박의 마지막 위치 정보를 제공</li>
            <li>SAR 항공기와의 연동을 통한 효율적인 구조 활동 지원</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ AIS 통신의 주요 특장점을 설명할 수 있다</li>
                <li>✅ 해상 안전 및 보안 응용 분야를 이해한다</li>
                <li>✅ 충돌 예측 및 이상 감지 시스템을 파악한다</li>
                <li>✅ SAR 지원 시스템의 역할을 설명할 수 있다</li>
            </ul>
        </div>
    `;
}

function getContent4_2() {
    return `
        <h2>해상 교통 관제</h2>
        
        <p>해상 교통 관제(Vessel Traffic Service, VTS)는 해안 당국이 AIS 데이터를 활용하여 선박 교통을 식별, 추적, 모니터링하고 관리하는 시스템입니다.</p>
        
        <h3>VTS의 주요 기능</h3>
        <ul>
            <li><strong>선박 식별 및 추적:</strong> 실시간으로 선박의 위치와 움직임을 모니터링</li>
            <li><strong>교통 흐름 관리:</strong> 항만 및 해역의 선박 집중도 모니터링</li>
            <li><strong>충돌 방지 지원:</strong> 선박 간 충돌 위험 감지 및 경고</li>
            <li><strong>항해 지원:</strong> 기상 정보, 항로 정보 제공</li>
            <li><strong>응급 상황 대응:</strong> 조난 선박 지원 및 구조 활동 조정</li>
        </ul>
        
        <h3>AIS 기반 VTS 시스템</h3>
        
        <h4>시스템 구성 요소</h4>
        <ul>
            <li><strong>AIS 기지국:</strong> 해안에 위치하여 선박의 AIS 메시지를 수신</li>
            <li><strong>데이터 처리 시스템:</strong> 수신된 AIS 데이터를 분석하고 처리</li>
            <li><strong>관제소:</strong> 실시간 모니터링 및 관제 업무 수행</li>
            <li><strong>통신 시스템:</strong> 선박과의 양방향 통신 지원</li>
        </ul>
        
        <h3>실시간 선박 추적 및 모니터링</h3>
        
        <h4>추적 기능</h4>
        <ul>
            <li><strong>위치 추적:</strong> GPS 기반 정확한 위치 정보 제공</li>
            <li><strong>속도 모니터링:</strong> 선박의 속력 변화 추적</li>
            <li><strong>침로 추적:</strong> 선박의 진행 방향 모니터링</li>
            <li><strong>항해 상태:</strong> 정박, 운항, 조업 등 상태 정보</li>
        </ul>
        
        <h3>교통 흐름 분석 및 최적화</h3>
        
        <h4>교통 흐름 분석</h4>
        <ul>
            <li><strong>선박 밀도:</strong> 특정 해역의 선박 집중도 분석</li>
            <li><strong>교통 패턴:</strong> 시간대별, 계절별 교통 흐름 분석</li>
            <li><strong>혼잡도 측정:</strong> 항만 및 해역의 혼잡 정도 평가</li>
            <li><strong>예측 모델링:</strong> 미래 교통 흐름 예측</li>
        </ul>
        
        <h3>스마트 항만 시스템</h3>
        
        <h4>IoT 통합</h4>
        <ul>
            <li><strong>센서 네트워크:</strong> 항만 내 다양한 센서 데이터 수집</li>
            <li><strong>실시간 모니터링:</strong> 항만 시설 및 장비 상태 모니터링</li>
            <li><strong>자동화 시스템:</strong> 화물 처리 자동화</li>
            <li><strong>디지털 트윈:</strong> 항만의 디지털 복제본 구축</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ VTS 시스템의 주요 기능을 이해한다</li>
                <li>✅ AIS 기반 VTS 시스템 구성을 설명할 수 있다</li>
                <li>✅ 교통 흐름 분석 및 최적화 방법을 파악한다</li>
                <li>✅ 스마트 항만 시스템의 구성 요소를 이해한다</li>
            </ul>
        </div>
    `;
}

function getContent5_1() {
    return `
        <h2>퀴즈 및 연습문제</h2>
        
        <h3>기본 개념 퀴즈</h3>
        
        <div class="quiz-question">
            <h4>문제 1</h4>
            <p>AIS(자동식별시스템)의 주요 목적은 무엇인가요?</p>
            <div class="quiz-answer">
                <strong>정답:</strong>
                <ul>
                    <li>해상 안전 증진</li>
                    <li>충돌 회피 지원</li>
                    <li>해상 상황 인식 개선</li>
                    <li>선박 교통 관제(VTS) 지원</li>
                </ul>
            </div>
        </div>
        
        <div class="quiz-question">
            <h4>문제 2</h4>
            <p>AIS에서 사용하는 주파수 대역은 무엇인가요?</p>
            <div class="quiz-answer">
                <strong>정답:</strong>
                <ul>
                    <li>VHF 해상 이동 주파수 대역</li>
                    <li>주로 161.975 MHz (채널 87b)</li>
                    <li>주로 162.025 MHz (채널 88B)</li>
                </ul>
            </div>
        </div>
        
        <h3>시스템 구성 요소 퀴즈</h3>
        
        <div class="quiz-question">
            <h4>문제 3</h4>
            <p>Class A AIS와 Class B AIS의 주요 차이점은 무엇인가요?</p>
            <div class="quiz-answer">
                <strong>정답:</strong>
                <ul>
                    <li><strong>Class A AIS:</strong>
                        <ul>
                            <li>SOLAS 협약 의무 설치 대상</li>
                            <li>더 높은 출력과 보고 빈도</li>
                            <li>SOTDMA 기술 사용</li>
                        </ul>
                    </li>
                    <li><strong>Class B AIS:</strong>
                        <ul>
                            <li>의무 설치 대상 아님</li>
                            <li>낮은 출력과 보고 빈도</li>
                            <li>CSTDMA 기술 사용</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        
        <h3>데이터 처리 퀴즈</h3>
        
        <div class="quiz-question">
            <h4>문제 4</h4>
            <p>AIS 데이터 전처리의 주요 단계 5가지를 말하세요.</p>
            <div class="quiz-answer">
                <strong>정답:</strong>
                <ol>
                    <li><strong>형식 변환:</strong> DBF → CSV 변환</li>
                    <li><strong>데이터 선택 및 정렬:</strong> 시간순, MMSI별 정렬</li>
                    <li><strong>항해 조건 및 복잡성 계산:</strong> SOG > 0, 500개 이상 메시지</li>
                    <li><strong>노이즈 제거:</strong> 불연속적, 느슨한, 엉킨 궤적 제거</li>
                    <li><strong>결측값 보간:</strong> 선형 보간법 사용</li>
                </ol>
            </div>
        </div>
        
        <h3>종합 문제</h3>
        
        <div class="quiz-question">
            <h4>문제 5 (서술형)</h4>
            <p>AIS 시스템이 해상 안전에 기여하는 방식을 종합적으로 설명하세요.</p>
            <div class="quiz-answer">
                <strong>정답 요점:</strong>
                <ul>
                    <li><strong>실시간 정보 교환:</strong> 선박 간 자동 정보 공유</li>
                    <li><strong>충돌 방지:</strong> 주변 선박 정보를 통한 충돌 위험 감지</li>
                    <li><strong>상황 인식:</strong> 해상 환경에 대한 종합적 파악</li>
                    <li><strong>응급 대응:</strong> 조난 상황 시 신속한 대응 지원</li>
                    <li><strong>교통 관리:</strong> VTS를 통한 효율적 교통 흐름 관리</li>
                </ul>
            </div>
        </div>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ AIS 기본 개념을 정확히 이해한다</li>
                <li>✅ 시스템 구성 요소의 차이점을 구분할 수 있다</li>
                <li>✅ 데이터 처리 과정을 단계별로 설명할 수 있다</li>
                <li>✅ 해상 안전 기여 방식을 종합적으로 설명할 수 있다</li>
            </ul>
        </div>
    `;
}

function getContent5_2() {
    return `
        <h2>핵심 용어 사전</h2>
        
        <h3>AIS 기본 용어</h3>
        
        <div class="glossary-term">
            <h4>AIS (Automatic Identification System)</h4>
            <ul>
                <li><strong>한국어:</strong> 자동식별시스템</li>
                <li><strong>정의:</strong> 선박 간, 선박과 육상 기지국, 또는 위성 간 전자 데이터 교환을 통해 선박의 움직임을 추적하는 자동 추적 시스템</li>
                <li><strong>목적:</strong> 해상 안전, 보안 및 효율성을 높이는 데 필수적인 정보 제공</li>
            </ul>
        </div>
        
        <div class="glossary-term">
            <h4>MMSI (Maritime Mobile Service Identity)</h4>
            <ul>
                <li><strong>한국어:</strong> 해상이동업무식별번호</li>
                <li><strong>정의:</strong> 각 선박에 고유하게 할당된 9자리 숫자 식별자</li>
                <li><strong>구성:</strong> 국가 코드(3자리) + 선박 식별번호(6자리)</li>
            </ul>
        </div>
        
        <h3>통신 및 프로토콜 용어</h3>
        
        <div class="glossary-term">
            <h4>TDMA (Time Division Multiple Access)</h4>
            <ul>
                <li><strong>한국어:</strong> 시분할다중접속</li>
                <li><strong>정의:</strong> 한정된 주파수 대역에서 여러 선박이 동시에 통신할 수 있도록 시간을 분할하여 접근 기회를 할당하는 기술</li>
                <li><strong>구성:</strong> 1분(프레임)을 2,250개의 시간 슬롯으로 분할</li>
            </ul>
        </div>
        
        <div class="glossary-term">
            <h4>SOTDMA (Self-Organizing Time Division Multiple Access)</h4>
            <ul>
                <li><strong>한국어:</strong> 자체 조직 시분할다중접속</li>
                <li><strong>정의:</strong> Class A AIS에서 사용하는 통신 방식으로, 주변 통신 현황을 스스로 파악하여 빈 시간 슬롯을 찾아 예약하고 데이터를 전송</li>
                <li><strong>특징:</strong> 자율적이고 연속적인 운항 모드에 적합</li>
            </ul>
        </div>
        
        <h3>메시지 및 데이터 용어</h3>
        
        <div class="glossary-term">
            <h4>정적 정보 (Static Information)</h4>
            <ul>
                <li><strong>한국어:</strong> 정적 정보</li>
                <li><strong>정의:</strong> 선박의 고유하고 변하지 않는 특성 정보</li>
                <li><strong>포함 내용:</strong> MMSI, IMO 번호, 호출 부호, 선명, 선박 유형, 크기, 위치 고정 안테나 위치</li>
            </ul>
        </div>
        
        <div class="glossary-term">
            <h4>동적 정보 (Dynamic Information)</h4>
            <ul>
                <li><strong>한국어:</strong> 동적 정보</li>
                <li><strong>정의:</strong> 선박의 실시간 운항 상태 정보</li>
                <li><strong>포함 내용:</strong> 위치, 속도(SOG), 침로(COG), 선회율(ROT), 항해 상태</li>
            </ul>
        </div>
        
        <h3>활용 분야 용어</h3>
        
        <div class="glossary-term">
            <h4>VTS (Vessel Traffic Service)</h4>
            <ul>
                <li><strong>한국어:</strong> 선박 교통 서비스</li>
                <li><strong>정의:</strong> 해안 당국이 AIS 데이터를 활용하여 선박 교통을 식별, 추적, 모니터링하고 관리하는 서비스</li>
                <li><strong>기능:</strong> 충돌 방지, 교통 흐름 관리, 항해 지원</li>
            </ul>
        </div>
        
        <div class="glossary-term">
            <h4>SAR (Search and Rescue)</h4>
            <ul>
                <li><strong>한국어:</strong> 수색 및 구조</li>
                <li><strong>정의:</strong> 조난 선박이나 인명을 찾아 구조하는 활동</li>
                <li><strong>AIS 활용:</strong> 조난 선박의 마지막 위치 정보 제공</li>
            </ul>
        </div>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ AIS 관련 핵심 용어의 정확한 정의를 이해한다</li>
                <li>✅ 통신 프로토콜 용어의 차이점을 구분할 수 있다</li>
                <li>✅ 메시지 유형별 특징을 설명할 수 있다</li>
                <li>✅ 활용 분야별 용어의 의미를 파악한다</li>
            </ul>
        </div>
    `;
}

function getContent5_3() {
    return `
        <h2>참고 자료 및 링크</h2>
        
        <h3>국제 표준 문서</h3>
        
        <h4>IMO (국제해사기구) 문서</h4>
        <ul>
            <li><strong>SOLAS 협약:</strong> 해상인명안전협약</li>
            <li><strong>IMO Resolution MSC.74(69):</strong> 범용 선박 자동 식별 시스템의 성능 표준</li>
            <li><strong>IMO Resolution A.694(17):</strong> 해상 이동 및 안전 통신 장비의 일반 요구사항</li>
        </ul>
        
        <h4>ITU-R (국제전기통신연합) 문서</h4>
        <ul>
            <li><strong>ITU-R M.1371-5:</strong> TDMA 기술을 사용하는 범용 선박 AIS의 기술적 및 운영적 특성 (최신 버전)</li>
        </ul>
        
        <h3>국제기구 웹사이트</h3>
        
        <h4>주요 국제기구</h4>
        <ul>
            <li><strong>IMO:</strong> https://www.imo.org/</li>
            <li><strong>ITU-R:</strong> https://www.itu.int/</li>
            <li><strong>IALA:</strong> https://www.iala-aism.org/</li>
            <li><strong>IEC:</strong> https://www.iec.ch/</li>
        </ul>
        
        <h4>국내 기관</h4>
        <ul>
            <li><strong>해양수산부:</strong> https://www.mof.go.kr/</li>
            <li><strong>해양안전정책관실:</strong> https://www.mof.go.kr/ais/</li>
            <li><strong>한국해양수산개발원:</strong> https://www.kmi.re.kr/</li>
            <li><strong>한국해양과학기술원:</strong> https://www.kiost.ac.kr/</li>
        </ul>
        
        <h3>학술 논문 및 연구 자료</h3>
        
        <h4>핵심 연구 논문</h4>
        <ul>
            <li><strong>"지능형 해상 항해를 위한 AIS 데이터 활용: 종합 설문조사"</strong> (2016)
                <ul>
                    <li>저자: Enmei Tu, Guanghao Zhang, Lily Rachmawati, Eshan Rajabally, Guang-Bin Huang</li>
                    <li>저널: IEEE Transactions on Intelligent Transportation Systems</li>
                </ul>
            </li>
            <li><strong>"그래프 컨볼루션 신경망을 활용한 선박 상태 인식을 위한 심층 학습 접근 방식"</strong> (2024)
                <ul>
                    <li>저자: Lin Ma, Hao Cao, Guo-You Shi, Shengyan Qin</li>
                    <li>저널: IEEE Transactions on Intelligent Transportation Systems</li>
                </ul>
            </li>
        </ul>
        
        <h3>소프트웨어 및 도구</h3>
        
        <h4>AIS 데이터 분석 도구</h4>
        <ul>
            <li><strong>Python 라이브러리:</strong>
                <ul>
                    <li><code>pyais</code>: AIS 메시지 디코딩</li>
                    <li><code>pandas</code>: 데이터 처리 및 분석</li>
                    <li><code>scikit-learn</code>: 머신러닝</li>
                    <li><code>tensorflow/pytorch</code>: 딥러닝</li>
                </ul>
            </li>
            <li><strong>GIS 소프트웨어:</strong>
                <ul>
                    <li>ArcGIS: 상용 GIS 소프트웨어</li>
                    <li>QGIS: 오픈소스 GIS 소프트웨어</li>
                    <li>Google Earth Engine: 클라우드 기반 지리공간 분석</li>
                </ul>
            </li>
        </ul>
        
        <h3>데이터 소스</h3>
        
        <h4>공개 AIS 데이터</h4>
        <ul>
            <li><strong>MarineTraffic:</strong> https://www.marinetraffic.com/</li>
            <li><strong>VesselFinder:</strong> https://www.vesselfinder.com/</li>
            <li><strong>AIS Hub:</strong> https://www.aishub.net/</li>
            <li><strong>Global Fishing Watch:</strong> https://globalfishingwatch.org/</li>
        </ul>
        
        <h3>교육 자료</h3>
        
        <h4>온라인 강의</h4>
        <ul>
            <li><strong>Coursera:</strong> "Maritime Data Analysis"</li>
            <li><strong>edX:</strong> "Introduction to AIS Systems"</li>
            <li><strong>YouTube:</strong> AIS 관련 교육 채널</li>
        </ul>
        
        <h4>교육 기관</h4>
        <ul>
            <li><strong>한국해양대학교:</strong> 해양공학과</li>
            <li><strong>목포해양대학교:</strong> 해양시스템공학과</li>
            <li><strong>한국해양과학기술원:</strong> 해양과학기술연수원</li>
        </ul>
        
        <div class="learning-objectives">
            <h4>🎯 학습 목표</h4>
            <ul>
                <li>✅ 국제 표준 문서의 중요성을 이해한다</li>
                <li>✅ 관련 국제기구와 국내 기관을 파악한다</li>
                <li>✅ 핵심 연구 논문과 최신 동향을 파악한다</li>
                <li>✅ 실용적인 소프트웨어 도구를 활용할 수 있다</li>
            </ul>
        </div>
    `;
}
