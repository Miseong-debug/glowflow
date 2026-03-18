// ════════════════════════════════════════
//  CONSTANTS
// ════════════════════════════════════════
const IMAGES={front:'front(2).png',back:'back(2).png',face:'face.png',male_front:'male_front.png',male_back:'male_back.png',male_face:'male_face.png'};
const VIEW_LABELS={front:'앞면',back:'뒷면',face:'얼굴',male_front:'앞면',male_back:'뒷면',male_face:'얼굴'};
const PARTS=['어깨','등','가슴','복부','허리','팔','목','손','엉덩이','허벅지','무릎','종아리','발','이마','눈','코','입','볼','턱'];
const CONCERNS={
  skin:[{id:'acne',label:'여드름'},{id:'pigmentation',label:'색소침착'},{id:'wrinkle',label:'주름'},{id:'pore',label:'모공'},{id:'redness',label:'홍조'},{id:'dryness',label:'건조'},{id:'elasticity',label:'탄력저하'}],
  body:[{id:'cellulite',label:'셀룰라이트'},{id:'fat',label:'지방'},{id:'contour',label:'체형라인'},{id:'swelling',label:'부종'}],
  etc:[{id:'hair_removal',label:'제모'},{id:'scar',label:'흉터'},{id:'stretch_mark',label:'튼살'}]
};
const SEV_LABELS=['','양호','경미','보통','주의','심각'];
const SEV_COLORS=['','#7db89e','#a8c99a','#d4b578','#d49a78','#c4756a'];

// Service catalog (from CSV)
// Skin measurement reference table
const SKIN_REF = {
  water: [
    { max: 34, label: 'Dry', color: '#c4756a', bg: 'rgba(196,117,106,0.15)' },
    { max: 49, label: 'Moderate', color: '#d4b578', bg: 'rgba(212,181,120,0.15)' },
    { max: 100, label: 'Excellent', color: '#7db89e', bg: 'rgba(125,184,158,0.15)' },
  ],
  oil: [
    { max: 29, label: 'Low Sebum', color: '#7db89e', bg: 'rgba(125,184,158,0.15)' },
    { max: 34, label: 'Moderate', color: '#d4b578', bg: 'rgba(212,181,120,0.15)' },
    { max: 100, label: 'High Sebum', color: '#c4756a', bg: 'rgba(196,117,106,0.15)' },
  ],
  elasticity: [
    { max: 49, label: 'Low', color: '#c4756a', bg: 'rgba(196,117,106,0.15)' },
    { max: 59, label: 'Basic', color: '#d4b578', bg: 'rgba(212,181,120,0.15)' },
    { max: 100, label: 'High', color: '#7db89e', bg: 'rgba(125,184,158,0.15)' },
  ],
  score: [
    { max: 69, label: 'Poor', color: '#c4756a', bg: 'rgba(196,117,106,0.15)' },
    { max: 79, label: 'Fair', color: '#d49a78', bg: 'rgba(212,154,120,0.15)' },
    { max: 89, label: 'Good', color: '#d4b578', bg: 'rgba(212,181,120,0.15)' },
    { max: 100, label: 'Excellent', color: '#7db89e', bg: 'rgba(125,184,158,0.15)' },
  ],
};
function getSkinStatus(type, value) {
  for (const ref of SKIN_REF[type]) { if (value <= ref.max) return ref; }
  return SKIN_REF[type][SKIN_REF[type].length - 1];
}

const SERVICES=[
  {cat:'IM 결라인',name:'성형전 결케어 (IM 브리즈)',time:'50분',price:66000,concerns:['elasticity','dryness']},
  {cat:'IM 결라인',name:'보습 결케어',time:'50분',price:66000,concerns:['dryness']},
  {cat:'IM 결라인',name:'성형후 결케어 (IM 리커버)',time:'50분',price:66000,concerns:['scar','elasticity']},
  {cat:'IM 결라인',name:'진정 결케어',time:'1시간',price:88000,concerns:['redness','acne']},
  {cat:'IM 결라인',name:'톤업 결케어',time:'1시간',price:88000,concerns:['pigmentation']},
  {cat:'IM 결라인',name:'트러블 결케어',time:'1시간',price:88000,concerns:['acne']},
  {cat:'IM 윤곽라인',name:'얼굴축소 작은얼굴 윤곽케어',time:'1시간 10분',price:110000,concerns:['contour','fat']},
  {cat:'IM 윤곽라인',name:'볼륨업 입체동안 윤곽케어',time:'1시간 20분',price:132000,concerns:['elasticity','contour']},
  {cat:'IM 윤곽라인',name:'얼굴비대칭 균형얼굴 윤곽케어',time:'1시간 30분',price:165000,concerns:['contour']},
  {cat:'IM 탄력라인',name:'진피재생 스피큘케어',time:'1시간 20분',price:165000,concerns:['wrinkle','elasticity','pore']},
  {cat:'IM 탄력라인',name:'진피재생 MTS케어',time:'1시간 20분',price:165000,concerns:['wrinkle','elasticity','scar']},
  {cat:'IM 탄력라인',name:'모공 리프팅케어',time:'1시간 20분',price:165000,concerns:['pore','elasticity']},
  {cat:'IM 탄력라인',name:'주름 리프팅케어',time:'1시간 20분',price:165000,concerns:['wrinkle','elasticity']},
  {cat:'IM 개선라인',name:'등, 팔 여드름 개선케어',time:'1시간 20분',price:800000,concerns:['acne','scar'],desc:'책임제 5회'},
  {cat:'IM 개선라인',name:'코르셋 리프팅케어',time:'1시간 20분',price:1100000,concerns:['elasticity','contour'],desc:'책임제 5회'},
  {cat:'IM 개선라인',name:'색소개선 케어',time:'1시간 20분',price:2000000,concerns:['pigmentation'],desc:'책임제 10회'},
  {cat:'IM 개선라인',name:'붉은 여드름 개선케어',time:'1시간 20분',price:2000000,concerns:['acne','redness'],desc:'책임제 15회'},
  {cat:'IM 순환라인',name:'복부+하체전면',time:'1시간',price:99000,concerns:['cellulite','swelling','fat']},
  {cat:'IM 순환라인',name:'등+하체후면',time:'1시간',price:99000,concerns:['cellulite','swelling']},
  {cat:'IM 순환라인',name:'순환 전신 관리',time:'1시간 20분',price:143000,concerns:['cellulite','swelling','fat']},
  {cat:'IM 쏙쏙라인',name:'등+하체후면 B',time:'1시간 20분',price:143000,concerns:['fat','cellulite']},
  {cat:'IM 쏙쏙라인',name:'복부+하체전면 B',time:'1시간 20분',price:143000,concerns:['fat','cellulite']},
  {cat:'IM 체형라인',name:'체형 맞춤케어 C (거북목, 라운드숄더)',time:'1시간',price:132000,concerns:['contour','swelling']},
  {cat:'IM 체형라인',name:'체형 맞춤케어 A',time:'2시간',price:297000,concerns:['contour']},
  {cat:'IM 슬림라인',name:'복부 옆구리라인 슬림케어',time:'20분',price:33000,concerns:['fat'],type:'추가'},
  {cat:'IM 슬림라인',name:'허벅지라인 슬림케어',time:'20분',price:33000,concerns:['fat','cellulite'],type:'추가'},
  {cat:'IM 슬림라인',name:'승모근라인 슬림케어',time:'20분',price:33000,concerns:['fat','contour'],type:'추가'},
  {cat:'IM 슬림라인',name:'힙라인 슬림케어',time:'20분',price:33000,concerns:['fat','contour'],type:'추가'},
  {cat:'IM 두피라인',name:'두피문제 예방케어',time:'50분',price:88000,concerns:['hair_removal']},
  {cat:'IM 두피라인',name:'문제성두피 집중케어',time:'1시간 10분',price:132000,concerns:['hair_removal']},
];

// ════════════════════════════════════════
//  STATE
// ════════════════════════════════════════
let db = loadDB();
seedIfEmpty();

let currentCustomerId = null;
let currentSessionId = null;
let currentChartView = 'front';
let sessionZones = [];
let sheetState = {part:null,side:null,concerns:new Set(),severity:3,memo:'',editIdx:-1};
let custSheetMode = 'new';
let custGender = 'female';
let activeMainTab = 'clients';
let subViewStack = []; // for session/admin sub-views

// Admin
let adminView='front',adminActivePart='어깨';
let adminInteraction={mode:null,part:null,index:-1,startX:0,startY:0,initData:null};
let adminLastTap={time:0,target:null};

// ════════════════════════════════════════
//  DATABASE
// ════════════════════════════════════════
function loadDB(){try{const r=localStorage.getItem('aesthetic_db');if(r)return JSON.parse(r);}catch(e){}return{customers:[],visits:[],regions:{}};}
function saveDB(){localStorage.setItem('aesthetic_db',JSON.stringify(db));}
function genId(){return Date.now().toString(36)+Math.random().toString(36).substr(2,6);}

function seedIfEmpty(){
  // Force re-seed if old data missing score field
  const needsReseed = db.visits?.length > 0 && db.visits.some(v => v.id?.startsWith('v_') && !v.measurements?.score);
  if (needsReseed) { db = { customers: [], visits: [], regions: {} }; }
  if(db.customers.length>0||Object.keys(db.regions).length>0)return;
  const R={};
  R.front={
    '목':[{cx:320,cy:138,rx:20,ry:16}],'어깨':[{cx:252,cy:165,rx:30,ry:14},{cx:388,cy:165,rx:30,ry:14}],
    '가슴':[{cx:320,cy:200,rx:52,ry:26}],'팔':[{cx:220,cy:222,rx:16,ry:40},{cx:420,cy:222,rx:16,ry:40},{cx:202,cy:302,rx:13,ry:36},{cx:438,cy:302,rx:13,ry:36}],
    '복부':[{cx:320,cy:262,rx:40,ry:28}],'허리':[{cx:320,cy:302,rx:46,ry:16}],
    '손':[{cx:192,cy:365,rx:13,ry:17},{cx:448,cy:365,rx:13,ry:17}],'엉덩이':[{cx:320,cy:340,rx:46,ry:20}],
    '허벅지':[{cx:290,cy:405,rx:24,ry:45},{cx:350,cy:405,rx:24,ry:45}],'무릎':[{cx:290,cy:462,rx:16,ry:16},{cx:350,cy:462,rx:16,ry:16}],
    '종아리':[{cx:292,cy:512,rx:14,ry:30},{cx:348,cy:512,rx:14,ry:30}],'발':[{cx:288,cy:572,rx:17,ry:16},{cx:352,cy:572,rx:17,ry:16}],
    '등':[],'이마':[],'눈':[],'코':[],'입':[],'볼':[],'턱':[]
  };
  R.back={
    '목':[{cx:320,cy:128,rx:18,ry:15}],'어깨':[{cx:258,cy:155,rx:28,ry:14},{cx:382,cy:155,rx:28,ry:14}],
    '등':[{cx:320,cy:195,rx:48,ry:24},{cx:320,cy:245,rx:46,ry:22}],'팔':[{cx:222,cy:215,rx:15,ry:38},{cx:418,cy:215,rx:15,ry:38},{cx:205,cy:298,rx:12,ry:34},{cx:435,cy:298,rx:12,ry:34}],
    '허리':[{cx:320,cy:288,rx:48,ry:18}],'엉덩이':[{cx:320,cy:334,rx:50,ry:26}],
    '허벅지':[{cx:292,cy:400,rx:23,ry:42},{cx:348,cy:400,rx:23,ry:42}],'무릎':[{cx:292,cy:455,rx:15,ry:15},{cx:348,cy:455,rx:15,ry:15}],
    '종아리':[{cx:294,cy:505,rx:13,ry:28},{cx:346,cy:505,rx:13,ry:28}],'발':[{cx:290,cy:568,rx:16,ry:15},{cx:350,cy:568,rx:16,ry:15}],
    '가슴':[],'복부':[],'손':[],'이마':[],'눈':[],'코':[],'입':[],'볼':[],'턱':[]
  };
  R.face={
    '이마':[{cx:320,cy:175,rx:68,ry:32}],'눈':[{cx:278,cy:250,rx:26,ry:11},{cx:362,cy:250,rx:26,ry:11}],
    '코':[{cx:320,cy:295,rx:17,ry:26}],'볼':[{cx:258,cy:312,rx:32,ry:28},{cx:382,cy:312,rx:32,ry:28}],
    '입':[{cx:320,cy:358,rx:28,ry:14}],'턱':[{cx:320,cy:400,rx:36,ry:20}],'목':[{cx:320,cy:465,rx:42,ry:22}],
    '어깨':[],'등':[],'가슴':[],'복부':[],'허리':[],'팔':[],'손':[],'엉덩이':[],'허벅지':[],'무릎':[],'종아리':[],'발':[]
  };
  R.male_front={
    '목':[{cx:320,cy:135,rx:22,ry:16}],'어깨':[{cx:248,cy:162,rx:34,ry:15},{cx:392,cy:162,rx:34,ry:15}],
    '가슴':[{cx:320,cy:198,rx:56,ry:26}],'팔':[{cx:216,cy:220,rx:18,ry:42},{cx:424,cy:220,rx:18,ry:42},{cx:200,cy:305,rx:14,ry:38},{cx:440,cy:305,rx:14,ry:38}],
    '복부':[{cx:320,cy:265,rx:42,ry:30}],'허리':[{cx:320,cy:306,rx:48,ry:16}],
    '손':[{cx:188,cy:370,rx:14,ry:18},{cx:452,cy:370,rx:14,ry:18}],'엉덩이':[{cx:320,cy:340,rx:44,ry:18}],
    '허벅지':[{cx:290,cy:408,rx:25,ry:46},{cx:350,cy:408,rx:25,ry:46}],'무릎':[{cx:290,cy:465,rx:17,ry:17},{cx:350,cy:465,rx:17,ry:17}],
    '종아리':[{cx:292,cy:515,rx:15,ry:32},{cx:348,cy:515,rx:15,ry:32}],'발':[{cx:288,cy:576,rx:18,ry:16},{cx:352,cy:576,rx:18,ry:16}],
    '등':[],'이마':[],'눈':[],'코':[],'입':[],'볼':[],'턱':[]
  };
  R.male_back={
    '목':[{cx:320,cy:125,rx:20,ry:15}],'어깨':[{cx:252,cy:152,rx:32,ry:15},{cx:388,cy:152,rx:32,ry:15}],
    '등':[{cx:320,cy:192,rx:52,ry:24},{cx:320,cy:242,rx:50,ry:22}],'팔':[{cx:218,cy:212,rx:16,ry:40},{cx:422,cy:212,rx:16,ry:40},{cx:202,cy:298,rx:13,ry:36},{cx:438,cy:298,rx:13,ry:36}],
    '허리':[{cx:320,cy:286,rx:50,ry:18}],'엉덩이':[{cx:320,cy:332,rx:48,ry:24}],
    '허벅지':[{cx:292,cy:398,rx:24,ry:44},{cx:348,cy:398,rx:24,ry:44}],'무릎':[{cx:292,cy:453,rx:16,ry:16},{cx:348,cy:453,rx:16,ry:16}],
    '종아리':[{cx:294,cy:502,rx:14,ry:30},{cx:346,cy:502,rx:14,ry:30}],'발':[{cx:290,cy:566,rx:17,ry:15},{cx:350,cy:566,rx:17,ry:15}],
    '가슴':[],'복부':[],'손':[],'이마':[],'눈':[],'코':[],'입':[],'볼':[],'턱':[]
  };
  R.male_face={
    '이마':[{cx:320,cy:172,rx:65,ry:30}],'눈':[{cx:280,cy:248,rx:24,ry:10},{cx:360,cy:248,rx:24,ry:10}],
    '코':[{cx:320,cy:292,rx:16,ry:24}],'볼':[{cx:260,cy:308,rx:30,ry:26},{cx:380,cy:308,rx:30,ry:26}],
    '입':[{cx:320,cy:354,rx:26,ry:13}],'턱':[{cx:320,cy:396,rx:34,ry:20}],'목':[{cx:320,cy:458,rx:40,ry:20}],
    '어깨':[],'등':[],'가슴':[],'복부':[],'허리':[],'팔':[],'손':[],'엉덩이':[],'허벅지':[],'무릎':[],'종아리':[],'발':[]
  };
  db.regions=R;
  const now=Date.now(),day=86400000;
  db.customers=[
    {id:'c_suyeon',name:'김서연',phone:'010-1234-5678',gender:'female',memo:'건성 피부, 볼 색소침착 집중 관리',createdAt:now-90*day,lastVisit:now-3*day},
    {id:'c_jihyun',name:'이지현',phone:'010-9876-5432',gender:'female',memo:'하체 셀룰라이트 관리 중',createdAt:now-60*day,lastVisit:now-10*day},
    {id:'c_minjun',name:'박민준',phone:'010-5555-1234',gender:'male',memo:'등 여드름, 어깨 긴장',createdAt:now-20*day,lastVisit:now-20*day},
    {id:'c_haeun',name:'최하은',phone:'010-7777-8888',gender:'female',memo:'신규 상담 고객, 얼굴 전체 피부 관리 희망',createdAt:now-1*day,lastVisit:null},
    {id:'c_yuna',name:'정유나',phone:'010-3333-4444',gender:'female',memo:'팔뚝 제모 + 얼굴 모공 관리',createdAt:now-45*day,lastVisit:now-7*day}
  ];
  db.visits=[
    {id:'v_sy1',customerId:'c_suyeon',date:now-85*day,measurements:{water:28,oil:22,elasticity:35,score:65},zones:[{part:'볼',side:'face',concerns:[{id:'pigmentation',severity:5},{id:'dryness',severity:4}],memo:'양볼 기미 심각'},{part:'이마',side:'face',concerns:[{id:'acne',severity:4},{id:'pore',severity:3}],memo:'이마 트러블'},{part:'턱',side:'face',concerns:[{id:'acne',severity:3}],memo:'턱 좁쌀'}],notes:'1회차 초기 상담. 건성, 볼 색소침착 심각.'},
    {id:'v_sy2',customerId:'c_suyeon',date:now-50*day,measurements:{water:38,oil:28,elasticity:42,score:76},zones:[{part:'볼',side:'face',concerns:[{id:'pigmentation',severity:3},{id:'dryness',severity:3}],memo:'색소 연해지는 중'},{part:'이마',side:'face',concerns:[{id:'acne',severity:2},{id:'pore',severity:3}],memo:'트러블 감소'},{part:'턱',side:'face',concerns:[{id:'acne',severity:2}],memo:'거의 없어짐'},{part:'목',side:'face',concerns:[{id:'wrinkle',severity:2}],memo:'예방 관리'}],notes:'2회차. 전반적 개선 중.'},
    {id:'v_sy3',customerId:'c_suyeon',date:now-3*day,measurements:{water:52,oil:30,elasticity:55,score:88},zones:[{part:'볼',side:'face',concerns:[{id:'pigmentation',severity:2},{id:'dryness',severity:1}],memo:'건조함 해소, 색소 옅어짐'},{part:'이마',side:'face',concerns:[{id:'pore',severity:2}],memo:'트러블 완치'},{part:'턱',side:'face',concerns:[{id:'acne',severity:1}],memo:'깨끗'},{part:'목',side:'face',concerns:[{id:'wrinkle',severity:2}],memo:'유지'}],notes:'3회차. 고객 매우 만족. 대폭 개선.'},
    {id:'v_jh1',customerId:'c_jihyun',date:now-55*day,zones:[{part:'허벅지',side:'front',concerns:[{id:'cellulite',severity:4},{id:'fat',severity:4}],memo:'앞쪽 셀룰라이트'},{part:'허벅지',side:'back',concerns:[{id:'cellulite',severity:5}],memo:'뒤쪽 더 심함'},{part:'엉덩이',side:'back',concerns:[{id:'contour',severity:3},{id:'cellulite',severity:3}],memo:'힙라인'},{part:'복부',side:'front',concerns:[{id:'fat',severity:3}],memo:'하복부'}],notes:'1회차. 하체 집중 관리 시작.'},
    {id:'v_jh2',customerId:'c_jihyun',date:now-10*day,zones:[{part:'허벅지',side:'front',concerns:[{id:'cellulite',severity:3},{id:'fat',severity:3}],memo:'줄어드는 중'},{part:'허벅지',side:'back',concerns:[{id:'cellulite',severity:4}],memo:'뒤쪽 관리 필요'},{part:'엉덩이',side:'back',concerns:[{id:'contour',severity:2},{id:'cellulite',severity:2}],memo:'힙라인 개선'},{part:'복부',side:'front',concerns:[{id:'fat',severity:2}],memo:'허리 라인 살아남'}],notes:'2회차. 엉덩이/복부 개선 눈에 띔.'},
    {id:'v_mj1',customerId:'c_minjun',date:now-20*day,zones:[{part:'등',side:'male_back',concerns:[{id:'acne',severity:4},{id:'scar',severity:3}],memo:'등 상부 여드름+흉터'},{part:'어깨',side:'male_back',concerns:[{id:'acne',severity:3}],memo:'어깨 뒤쪽'},{part:'어깨',side:'male_front',concerns:[{id:'swelling',severity:2}],memo:'앞쪽 붓기'}],notes:'1회차. 등 여드름 집중 관리.'},
    {id:'v_yn1',customerId:'c_yuna',date:now-40*day,measurements:{water:33,oil:38,elasticity:48,score:72},zones:[{part:'팔',side:'front',concerns:[{id:'hair_removal',severity:3}],memo:'팔뚝 제모 1차'},{part:'볼',side:'face',concerns:[{id:'pore',severity:4}],memo:'볼 모공'},{part:'코',side:'face',concerns:[{id:'pore',severity:4}],memo:'블랙헤드'}],notes:'1회차. 제모+모공 동시 진행.'},
    {id:'v_yn2',customerId:'c_yuna',date:now-7*day,measurements:{water:42,oil:33,elasticity:52,score:81},zones:[{part:'팔',side:'front',concerns:[{id:'hair_removal',severity:2}],memo:'모량 감소'},{part:'볼',side:'face',concerns:[{id:'pore',severity:3}],memo:'모공 개선 중'},{part:'코',side:'face',concerns:[{id:'pore',severity:3}],memo:'블랙헤드 줄어듦'},{part:'이마',side:'face',concerns:[{id:'dryness',severity:2}],memo:'이마 건조 발견'}],notes:'2회차. 제모 효과 좋음.'}
  ];
  saveDB();
}

// ════════════════════════════════════════
//  NAVIGATION
// ════════════════════════════════════════
function switchTab(tab) {
  activeMainTab = tab;
  if (typeof saveState === 'function') saveState();
  document.querySelectorAll('.main-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const navBack = document.getElementById('nav-back');
  if (navBack) navBack.classList.add('hidden');
  subViewStack = [];

  const viewId = 'view-' + tab;
  document.getElementById(viewId).classList.add('active');

  // Clean up profile card when leaving clients tab
  const existingProfile = document.getElementById('customer-profile');
  if (existingProfile) existingProfile.remove();

  if (tab === 'clients') {
    renderCustomerList();
    if (currentCustomerId) renderCustomerProfile();
  } else if (!currentCustomerId) {
    // No customer selected — show empty message in content area only
    const contentEl = document.getElementById(tab + '-content');
    if (contentEl) contentEl.innerHTML = `<div class="text-center py-20"><div class="empty-illustration"><svg width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5"><circle cx="24" cy="14" r="8"/><path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16"/></svg></div><p class="text-main font-medium mt-4 text-base">고객을 먼저 선택해주세요</p><p class="text-muted text-sm mt-2">Clients 탭에서 고객을 선택하면<br>해당 고객의 데이터를 확인할 수 있습니다</p></div>`;
  } else {
    if (tab === 'analysis') renderAnalysis();
    else if (tab === 'history') renderHistory();
    else if (tab === 'report') renderReport();
  }
}


function pushSubView(viewId, title) {
  subViewStack.push(activeMainTab);
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
  const nb = document.getElementById('nav-back');
  if (nb) nb.classList.remove('hidden');
}

function goBack() {
  if (subViewStack.length > 0) {
    const prev = subViewStack.pop();
    switchTab(prev);
  }
}

function getCustomerName(id) { const c = db.customers.find(c => c.id === id); return c ? c.name : ''; }
function getCustomerVisits(id) { return db.visits.filter(v => v.customerId === id).sort((a,b) => a.date - b.date); }

function openAdmin() { pushSubView('view-admin', '영역 편집'); initAdmin(); }

// ════════════════════════════════════════
//  TAB 1: CLIENTS
// ════════════════════════════════════════
function renderCustomerList() {
  const q = (document.getElementById('search-input')?.value || '').toLowerCase();
  const list = document.getElementById('customer-list');
  let filtered = db.customers.filter(c => c.name.toLowerCase().includes(q) || (c.phone||'').includes(q));
  filtered.sort((a,b) => (b.lastVisit||b.createdAt) - (a.lastVisit||a.createdAt));
  if (filtered.length === 0) {
    list.innerHTML = `<div class="text-center py-16"><div class="empty-illustration"><svg width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5"><circle cx="24" cy="14" r="8"/><path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16"/></svg></div><p class="text-main font-medium mt-4 text-base">${q?'검색 결과가 없습니다':'등록된 고객이 없습니다'}</p></div>`;
    return;
  }
  list.innerHTML = filtered.map(c => {
    const visits = getCustomerVisits(c.id);
    const lastDate = c.lastVisit ? new Date(c.lastVisit).toLocaleDateString('ko') : '';
    const sel = currentCustomerId === c.id ? ' selected-card' : '';
    return `<div class="customer-card ${sel}" onclick="selectCustomer('${c.id}')">
      
      <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="font-medium">${c.name}</span><span class="text-xs text-amber-400">${c.gender==='male'?'남':'여'}</span></div><p class="text-xs text-amber-700 truncate">${c.phone||''} ${lastDate?'· 최근 '+lastDate:''}</p></div>
      <div class="text-right flex-shrink-0"><span class="text-xs text-amber-400">${visits.length}회</span></div></div>`;
  }).join('');
}

function selectCustomer(id) {
  currentCustomerId = id;
  if (typeof saveState === 'function') saveState();
  renderCustomerList();
  renderCustomerProfile();
}

function renderCustomerProfile() {
  const c = db.customers.find(x => x.id === currentCustomerId);
  if (!c) return;
  const visits = getCustomerVisits(currentCustomerId);
  const lastDate = c.lastVisit ? new Date(c.lastVisit).toLocaleDateString('ko') : '-';
  const regDate = new Date(c.createdAt).toLocaleDateString('ko');

  // Find most recent concerns
  let recentConcerns = '';
  if (visits.length > 0) {
    const last = visits[visits.length - 1];
    const tags = (last.zones||[]).flatMap(z => (z.concerns||[]).map(cc =>
      `<span class="tag-pill tag-pill-sm sev-bg-${cc.severity}" style="color:white;border:none;">${findConcernLabel(cc.id)}</span>`
    ));
    recentConcerns = tags.join(' ');
  }

  const profileHTML = `
    <div id="customer-profile" class="glass-solid p-6 mb-6 mx-1" style="animation:viewIn 0.25s ease;">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          
          <div>
            <h2 class="text-lg font-semibold">${c.name}</h2>
            <p class="text-sm text-amber-700">${c.phone || '전화번호 미등록'} · ${c.gender === 'male' ? '남성' : '여성'}</p>
          </div>
        </div>
        <button class="btn-icon" onclick="editCurrentCustomer()">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.5 2.5l3 3L5 15H2v-3L11.5 2.5z"/></svg>
        </button>
      </div>
      <div class="grid grid-cols-3 gap-3 mb-3">
        <div class="text-center p-2 rounded-lg" style="background: #F4F5F7;">
          <p class="text-lg font-semibold" style="color: var(--text-main);">${visits.length}</p>
          <p class="text-xs text-amber-700">방문</p>
        </div>
        <div class="text-center p-2 rounded-lg" style="background: #F4F5F7;">
          <p class="text-xs text-amber-700 mt-1">등록일</p>
          <p class="text-xs font-medium mt-0.5">${regDate}</p>
        </div>
        <div class="text-center p-2 rounded-lg" style="background: #F4F5F7;">
          <p class="text-xs text-amber-700 mt-1">최근 방문</p>
          <p class="text-xs font-medium mt-0.5">${lastDate}</p>
        </div>
      </div>
      ${c.memo ? '<p class="text-sm text-amber-800 mb-3">' + c.memo + '</p>' : ''}
      ${recentConcerns ? '<div class="mb-3"><p class="text-xs text-amber-400 mb-1">최근 관심사</p><div class="flex flex-wrap gap-1">' + recentConcerns + '</div></div>' : ''}
      <div class="flex gap-2">
        <button class="btn-ghost flex-1" onclick="goAnalysis('face')" style="background:rgba(251,113,133,0.06);border-color:transparent;color:var(--text-main);">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="7" r="5"/><path d="M4 18c0-3 2.2-5 5-5s5 2 5 5"/><path d="M7 6.5h.01M11 6.5h.01M8 9.5c.5.5 1.5.5 2 0"/></svg>
          Facial
        </button>
        <button class="btn-ghost flex-1" onclick="goAnalysis('body')" style="background:rgba(251,113,133,0.06);border-color:transparent;color:var(--text-main);">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 2v4M9 14v4M5 6l-2 4 2 4M13 6l2 4-2 4M6 6h6M6 14h6"/></svg>
          Body
        </button>
      </div>
    </div>`;

  // Remove existing profile if any
  const existing = document.getElementById('customer-profile');
  if (existing) existing.remove();

  // Insert after search bar
  const listEl = document.getElementById('customer-list');
  listEl.insertAdjacentHTML('beforebegin', profileHTML);
}

function openNewCustomer() {
  custSheetMode='new';custGender='female';
  document.getElementById('customer-sheet-title').textContent='신규 고객';
  document.getElementById('cust-name').value='';document.getElementById('cust-phone').value='';document.getElementById('cust-memo').value='';
  updateGenderUI();openBottomSheet('sheet-customer');
}
function editCurrentCustomer(){
  const c=db.customers.find(x=>x.id===currentCustomerId);if(!c)return;
  custSheetMode='edit';custGender=c.gender||'female';
  document.getElementById('customer-sheet-title').textContent='고객 정보 수정';
  document.getElementById('cust-name').value=c.name;document.getElementById('cust-phone').value=c.phone||'';document.getElementById('cust-memo').value=c.memo||'';
  updateGenderUI();openBottomSheet('sheet-customer');
}
function setCustGender(g){custGender=g;updateGenderUI();}
function updateGenderUI(){document.getElementById('cust-gender-f').classList.toggle('active',custGender==='female');document.getElementById('cust-gender-m').classList.toggle('active',custGender==='male');}
function saveCustomer(){
  const name=document.getElementById('cust-name').value.trim();if(!name)return;
  const phone=document.getElementById('cust-phone').value.trim(),memo=document.getElementById('cust-memo').value.trim();
  if(custSheetMode==='new'){db.customers.push({id:genId(),name,phone,gender:custGender,memo,createdAt:Date.now(),lastVisit:null});}
  else{const c=db.customers.find(x=>x.id===currentCustomerId);if(c){c.name=name;c.phone=phone;c.gender=custGender;c.memo=memo;}}
  saveDB();closeCustomerSheet();renderCustomerList();
}

// ════════════════════════════════════════
//  TAB 2: ANALYSIS
// ════════════════════════════════════════
let analysisChartView = 'front';
let analysisMode = 'face'; // 'face' | 'body'

function goAnalysis(mode) {
  analysisMode = mode;
  if (activeMainTab === 'analysis') {
    // Already on analysis tab — just re-render
    renderAnalysis();
  } else {
    switchTab('analysis');
  }
}

function renderAnalysis() {
  const c = db.customers.find(x => x.id === currentCustomerId);
  if (!c) return;
  const visits = getCustomerVisits(currentCustomerId);
  const el = document.getElementById('analysis-content');

  // Setup chart tabs based on mode
  const gender = c.gender || 'female';
  let views;
  if (analysisMode === 'face') {
    views = gender === 'male' ? [{k:'male_face',l:'얼굴'}] : [{k:'face',l:'얼굴'}];
  } else {
    views = gender === 'male'
      ? [{k:'male_front',l:'앞면'},{k:'male_back',l:'뒷면'}]
      : [{k:'front',l:'앞면'},{k:'back',l:'뒷면'}];
  }
  analysisChartView = views[0].k;

  // Hide tabs for face mode (single view), show for body (front/back)
  const tabsEl = document.getElementById('analysis-chart-tabs');
  if (views.length <= 1) {
    tabsEl.innerHTML = '';
    tabsEl.parentElement.style.display = 'none';
  } else {
    tabsEl.parentElement.style.display = '';
    tabsEl.innerHTML = views.map(v =>
      `<button class="segment-item ${v.k===analysisChartView?'active':''}" data-view="${v.k}">${v.l}</button>`
    ).join('');
  }
  document.querySelectorAll('#analysis-chart-tabs .segment-item').forEach(btn => {
    btn.onclick = () => {
      analysisChartView = btn.dataset.view;
      document.querySelectorAll('#analysis-chart-tabs .segment-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('analysis-chart-img').src = IMAGES[analysisChartView];
      document.getElementById('analysis-chart-img').onload = () => { syncAnalysisChart(); renderAnalysisChartOverlay(visits); };
    };
  });
  document.getElementById('analysis-chart-img').src = IMAGES[analysisChartView];
  document.getElementById('analysis-chart-img').onload = () => { syncAnalysisChart(); renderAnalysisChartOverlay(visits); };

  // ── Mode toggle bar ──
  document.getElementById('analysis-mode-bar').innerHTML = `
    <div class="segment-group mr-4">
      <button class="segment-item ${analysisMode==='face'?'active':''}" onclick="goAnalysis('face')">Facial</button>
      <button class="segment-item ${analysisMode==='body'?'active':''}" onclick="goAnalysis('body')">Body</button>
    </div>
    <div class="flex items-center gap-3">
      
      <div class="flex flex-col"><span class="text-sm font-semibold">${c.name}</span><span class="text-xs text-muted">${visits.length} sessions</span></div>
    </div>`;

  const visitsWithMeasurements = visits.filter(v => v.measurements);
  const faceSides = gender === 'male' ? ['male_face'] : ['face'];
  const bodySides = gender === 'male' ? ['male_front','male_back'] : ['front','back'];
  const relevantSides = analysisMode === 'face' ? faceSides : bodySides;

  // ── Col 2: Gauge + Concern Trend + Measurement Trend ──
  let col2 = '';

  // Gauge
  if (visitsWithMeasurements.length > 0 && visitsWithMeasurements[visitsWithMeasurements.length-1].measurements.score) {
    const latest = visitsWithMeasurements[visitsWithMeasurements.length-1].measurements;
    const scoreVal = latest.score;
    const scoreS = getSkinStatus('score', scoreVal);
    const scoreLabel = scoreVal >= 90 ? 'Healthy Skin!' : scoreVal >= 80 ? 'Good Skin' : scoreVal >= 70 ? 'Fair Skin' : 'Needs Care';
    const pct = Math.min(1, Math.max(0, (scoreVal - 60) / 40));
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const arcLength = circumference * 0.75;
    const dashOffset = arcLength * (1 - pct);

    col2 += `<div class="glass-solid p-4 text-center">
      <p class="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Overall Score</p>
      <div style="position:relative;width:140px;height:120px;margin:0 auto;">
        <svg width="140" height="120" viewBox="0 0 140 120">
          <circle cx="70" cy="70" r="${radius}" fill="none" stroke="rgba(196,169,154,0.1)" stroke-width="10"
            stroke-dasharray="${arcLength} ${circumference}" stroke-dashoffset="0"
            stroke-linecap="round" transform="rotate(135 70 70)"/>
          <circle cx="70" cy="70" r="${radius}" fill="none" stroke="${scoreS.color}" stroke-width="10"
            stroke-dasharray="${arcLength} ${circumference}" stroke-dashoffset="${dashOffset}"
            stroke-linecap="round" transform="rotate(135 70 70)"
            style="transition:stroke-dashoffset 0.8s ease;"/>
        </svg>
        <div style="position:absolute;top:30px;left:0;right:0;text-align:center;">
          <p class="text-3xl font-bold" style="color:${scoreS.color};">${scoreVal}</p>
          <p class="text-xs mt-0.5" style="color:${scoreS.color};opacity:0.7;">${scoreS.label}</p>
        </div>
      </div>
      <p class="text-sm font-semibold" style="color:${scoreS.color};">${scoreLabel}</p>
    </div>`;
  } else {
    col2 += `<div class="glass-solid p-4 text-center flex items-center justify-center" style="min-height:180px;"><p class="text-sm text-amber-400">측정 데이터 없음</p></div>`;
  }

  // Measurement Trend
  if (visitsWithMeasurements.length > 1) {
    col2 += `<div class="glass-solid p-3">
      <p class="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Measurement Trend</p>`;
    [...SKIN_FIELDS, 'score'].forEach(key => {
      const label = SKIN_LABELS[key];
      col2 += `<div class="mb-2 last:mb-0"><div class="flex justify-between text-xs mb-1"><span class="text-amber-700">${label}</span><span class="text-amber-400">${visitsWithMeasurements.map(v=>(v.measurements[key]??'-')).join(' → ')}</span></div><div class="flex items-end gap-1 h-5">`;
      visitsWithMeasurements.forEach(v => {
        const val = v.measurements[key];
        if (!val && val !== 0) { col2 += `<div class="flex-1 rounded-sm bg-amber-100" style="height:2px;"></div>`; return; }
        const s = getSkinStatus(key, val);
        const minVal = key === 'score' ? 60 : 0;
        const pct = Math.max(10, ((val - minVal) / (100 - minVal)) * 100);
        col2 += `<div class="flex-1 rounded-sm" style="height:${pct}%;background:${s.color};"></div>`;
      });
      col2 += `</div></div>`;
    });
    col2 += `</div>`;
  }

  // Concern Trend
  col2 += `<div class="glass-solid p-3"><p class="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Concern Trend</p>`;
  const concernMap = {};
  visits.forEach((v, vi) => {
    (v.zones||[]).filter(z => relevantSides.includes(z.side)).forEach(z => (z.concerns||[]).forEach(cc => {
      if (!concernMap[cc.id]) concernMap[cc.id] = [];
      concernMap[cc.id].push({ visit: vi+1, severity: cc.severity, part: z.part });
    }));
  });

  if (Object.keys(concernMap).length === 0) {
    col2 += `<p class="text-sm text-amber-400 text-center py-3">${analysisMode==='face'?'페이셜':'바디'} 관련 기록이 없습니다</p>`;
  }

  for (const [cId, entries] of Object.entries(concernMap)) {
    const label = findConcernLabel(cId);
    const first = entries[0].severity, last = entries[entries.length-1].severity;
    const diff = first - last;
    const arrow = diff > 0 ? '↓'+diff : diff < 0 ? '↑'+Math.abs(diff) : '→';
    const arrowColor = diff > 0 ? 'sev-text-1' : diff < 0 ? 'sev-text-5' : 'text-amber-400';
    const parts = [...new Set(entries.map(e => e.part))].join(', ');
    const grouped = {};
    entries.forEach(e => { grouped[e.visit] = Math.max(grouped[e.visit]||0, e.severity); });

    col2 += `<div class="mb-2 p-2 rounded-lg" style="background:rgba(196,169,154,0.04);">
      <div class="flex justify-between items-center mb-1">
        <div><span class="font-medium text-xs">${label}</span><span class="text-xs text-amber-400 ml-1">${parts}</span></div>
        <span class="text-xs font-semibold ${arrowColor}">${arrow}</span>
      </div>
      <div class="flex items-end gap-1 h-5">`;
    for (let vi = 1; vi <= visits.length; vi++) {
      const sev = grouped[vi];
      if (sev) col2 += `<div class="flex-1 rounded-sm sev-bg-${sev}" style="height:${sev*20}%;min-height:3px;"></div>`;
      else col2 += `<div class="flex-1 rounded-sm bg-amber-100" style="height:2px;"></div>`;
    }
    col2 += `</div></div>`;
  }
  col2 += `</div>`;

  document.getElementById('analysis-col2').innerHTML = col2;

  // ── Col 3: Radar + Recommended Programs ──
  let col3 = '';

  // Radar chart
  if (visitsWithMeasurements.length > 0) {
    const latest = visitsWithMeasurements[visitsWithMeasurements.length-1].measurements;
    const w = Math.min(100, latest.water || 0);
    const o = Math.min(100, latest.oil || 0);
    const e = Math.min(100, latest.elasticity || 0);
    const cx2 = 120, cy2 = 125, maxR = 90;
    const angles = [-90, 30, 150];
    const values = [w, o, e];
    const labels = ['수분', '유분', '탄력'];

    function polarToXY(a, r) { const rad = a * Math.PI / 180; return { x: cx2 + r * Math.cos(rad), y: cy2 + r * Math.sin(rad) }; }

    let grid = '', axes = '';
    [0.2, 0.4, 0.6, 0.8, 1.0].forEach(s => {
      const pts = angles.map(a => polarToXY(a, maxR * s));
      grid += `<polygon points="${pts.map(p=>p.x+','+p.y).join(' ')}" fill="none" stroke="rgba(196,169,154,${s===1?0.2:0.08})" stroke-width="1"/>`;
    });
    angles.forEach(a => { const p = polarToXY(a, maxR); axes += `<line x1="${cx2}" y1="${cy2}" x2="${p.x}" y2="${p.y}" stroke="rgba(196,169,154,0.12)" stroke-width="1"/>`; });

    const dp = values.map((v, i) => polarToXY(angles[i], maxR * (v / 100)));
    const poly = `<polygon points="${dp.map(p=>p.x+','+p.y).join(' ')}" fill="rgba(220,167,165,0.2)" stroke="#dca7a5" stroke-width="2"/>`;
    let dots = '', lbls = '';
    dp.forEach((p, i) => { const s = getSkinStatus(SKIN_FIELDS[i], values[i]); dots += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${s.color}" stroke="white" stroke-width="2"/>`; });
    angles.forEach((a, i) => {
      const p = polarToXY(a, maxR + 22);
      const s = getSkinStatus(SKIN_FIELDS[i], values[i]);
      lbls += `<text x="${p.x}" y="${p.y}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="600" fill="${s.color}">${labels[i]}</text>`;
      lbls += `<text x="${p.x}" y="${p.y + 15}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="${s.color}" opacity="0.7">${values[i]}</text>`;
    });

    col3 += `<div class="glass-solid p-4 text-center flex-1 flex flex-col items-center justify-center">
      <p class="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">Skin Balance</p>
      <svg width="100%" viewBox="0 0 240 260" style="max-width:280px;">${grid}${axes}${poly}${dots}${lbls}</svg>
    </div>`;
  } else {
    col3 += `<div class="glass-solid p-4 text-center flex items-center justify-center" style="min-height:180px;"><p class="text-sm text-amber-400">측정 데이터 없음</p></div>`;
  }

  // Recommended programs
  const activeConcerns = new Set();
  if (visits.length > 0) {
    const lastVisit = visits[visits.length - 1];
    (lastVisit.zones||[]).filter(z => relevantSides.includes(z.side)).forEach(z => (z.concerns||[]).forEach(cc => activeConcerns.add(cc.id)));
  }
  const recommended = SERVICES.filter(s => s.concerns.some(c => activeConcerns.has(c))).slice(0, 3);
  if (recommended.length > 0) {
    col3 += `<div class="glass-solid p-3">
      <p class="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">Recommended</p>`;
    recommended.forEach(s => {
      const matchedTags = s.concerns.filter(c => activeConcerns.has(c)).map(c => findConcernLabel(c));
      col3 += `<div class="mb-2 p-2 rounded-lg last:mb-0" style="background:rgba(196,169,154,0.04);">
        <p class="text-xs font-medium">${s.name}</p>
        <p class="text-xs text-amber-500 mt-0.5">${s.cat} · ${s.time} · ${s.price>=10000?(s.price/10000)+'만':'₩'+s.price.toLocaleString()}</p>
        <div class="flex flex-wrap gap-1 mt-1">${matchedTags.map(t=>'<span class="tag-pill tag-pill-sm active" style="padding:1px 6px;font-size:9px;">'+t+'</span>').join('')}</div>
      </div>`;
    });
    col3 += `</div>`;
  }

  document.getElementById('analysis-col3').innerHTML = col3;
}

function syncAnalysisChart() {
  const img = document.getElementById('analysis-chart-img');
  const svg = document.getElementById('analysis-chart-svg');
  if (!img.naturalWidth) return;
  svg.setAttribute('viewBox', `0 0 ${img.naturalWidth} ${img.naturalHeight}`);
  svg.style.width = img.clientWidth + 'px';
  svg.style.height = img.clientHeight + 'px';
}

function renderAnalysisChartOverlay(visits) {
  const rl = document.getElementById('analysis-chart-regions');
  rl.innerHTML = '';
  const regions = getRegionsForView(analysisChartView);
  // Get latest visit data for this view
  const latestZones = {};
  visits.forEach(v => {
    (v.zones||[]).forEach(z => {
      if (z.side === analysisChartView) {
        const maxSev = Math.max(...(z.concerns||[]).map(cc => cc.severity||3), 0);
        latestZones[z.part] = maxSev; // latest visit overwrites
      }
    });
  });

  regions.forEach(r => {
    const sev = latestZones[r.part] || 0;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    el.setAttribute('cx', r.cx); el.setAttribute('cy', r.cy);
    el.setAttribute('rx', r.rx); el.setAttribute('ry', r.ry);
    let cls = 'body-part';
    if (sev > 0) cls += ' sev-' + sev;
    el.setAttribute('class', cls);
    rl.appendChild(el);
  });
}

// ════════════════════════════════════════
//  TAB 3: HISTORY
// ════════════════════════════════════════
function renderHistory() {
  const visits = getCustomerVisits(currentCustomerId);
  const el = document.getElementById('history-content');
  if (visits.length === 0) {
    el.innerHTML = `<div class="text-center py-16"><div class="empty-illustration"><svg width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5"><circle cx="24" cy="24" r="10"/><path d="M24 18v6l4 2"/></svg></div><p class="text-main font-medium mt-4 text-base">관리 기록이 없습니다</p><p class="text-muted text-sm mt-2">+ 버튼을 눌러 첫 관리를 시작하세요</p></div>`;
    return;
  }
  let html = '<div class="pt-4 space-y-0">';
  visits.forEach((v, i) => {
    const date = new Date(v.date).toLocaleDateString('ko',{year:'numeric',month:'short',day:'numeric'});
    const concerns = (v.zones||[]).flatMap(z => (z.concerns||[]).map(cc => `<span class="tag-pill tag-pill-sm sev-bg-${cc.severity||3}" style="color:white;border:none;margin:1px;">${findConcernLabel(cc.id)}</span>`)).join('');
    html += `<div class="flex gap-3 ${i<visits.length-1?'pb-4':''}">
      <div class="flex flex-col items-center"><div class="timeline-dot ${i===visits.length-1?'filled':''}"></div>${i<visits.length-1?'<div class="timeline-line flex-1 mt-1"></div>':''}</div>
      <div class="glass-solid p-4 flex-1 mb-1 cursor-pointer" onclick="openSessionReview('${v.id}')">
        <div class="flex justify-between items-start mb-1.5"><div><span class="font-medium text-sm">${i+1}회차</span><span class="text-xs text-amber-700 ml-2">${date}</span></div><span class="text-xs text-amber-400">${(v.zones||[]).length}부위</span></div>
        <div class="flex flex-wrap gap-0.5">${concerns||'<span class="text-xs text-amber-400">기록 없음</span>'}</div>
        ${v.measurements?`<div class="flex gap-2 mt-2 flex-wrap">${v.measurements.score?`<span class="text-xs font-semibold px-2 py-0.5 rounded" style="background:${getSkinStatus('score',v.measurements.score).bg};color:${getSkinStatus('score',v.measurements.score).color};">Score ${v.measurements.score}</span>`:''}${SKIN_FIELDS.map(k=>{const val=v.measurements[k];if(!val&&val!==0)return'';const s=getSkinStatus(k,val);return`<span class="text-xs font-medium px-1.5 py-0.5 rounded" style="background:${s.bg};color:${s.color};">${SKIN_LABELS[k]} ${val}</span>`;}).join('')}</div>`:''}
        ${v.notes?'<p class="text-xs text-amber-700 mt-2 truncate">'+v.notes+'</p>':''}
      </div></div>`;
  });
  html += '</div>';
  el.innerHTML = html;
}

// ════════════════════════════════════════
//  TAB 4: REPORT
// ════════════════════════════════════════
function renderReport() {
  const c = db.customers.find(x => x.id === currentCustomerId);
  if (!c) return;
  const visits = getCustomerVisits(currentCustomerId);
  const el = document.getElementById('report-content');

  let html = `<div class="flex justify-between items-center mt-4 mb-4">
    <h2 class="text-lg font-semibold">${c.name} 관리 리포트</h2>
    <button class="btn-primary text-sm py-2 px-5 no-print" onclick="window.print()">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="inline mr-1 -mt-0.5"><path d="M6 9V2h8v7"/><path d="M6 14H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/><rect x="6" y="11" width="8" height="5" rx="1"/></svg>
      PDF 인쇄
    </button>
  </div>`;

  // Summary card
  const firstDate = visits.length ? new Date(visits[0].date).toLocaleDateString('ko') : '-';
  const lastDate = visits.length ? new Date(visits[visits.length-1].date).toLocaleDateString('ko') : '-';
  html += `<div class="glass-solid p-5 mb-4">
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div><span class="text-amber-700">고객명</span><p class="font-medium mt-0.5">${c.name}</p></div>
      <div><span class="text-amber-700">성별</span><p class="font-medium mt-0.5">${c.gender==='male'?'남성':'여성'}</p></div>
      <div><span class="text-amber-700">첫 방문</span><p class="font-medium mt-0.5">${firstDate}</p></div>
      <div><span class="text-amber-700">최근 방문</span><p class="font-medium mt-0.5">${lastDate}</p></div>
      <div><span class="text-amber-700">총 방문</span><p class="font-medium mt-0.5">${visits.length}회</p></div>
      <div><span class="text-amber-700">메모</span><p class="font-medium mt-0.5">${c.memo||'-'}</p></div>
    </div>
  </div>`;

  if (visits.length === 0) {
    html += `<p class="text-center text-amber-400 py-8">관리 기록이 없습니다.</p>`;
    el.innerHTML = html; return;
  }

  // Skin measurement table
  const rptMeasurements = visits.filter(v => v.measurements);
  if (rptMeasurements.length > 0) {
    html += `<h3 class="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-3">피부 측정 변화</h3>`;
    html += `<div class="glass-solid overflow-hidden mb-4"><table class="w-full text-sm"><thead><tr class="border-b border-amber-100/30">
      <th class="text-left p-3 text-amber-800 font-semibold text-xs">항목</th>`;
    rptMeasurements.forEach((v,i) => {
      const vi = visits.indexOf(v)+1;
      html += `<th class="text-center p-3 text-amber-800 font-semibold text-xs">${vi}회</th>`;
    });
    html += `<th class="text-center p-3 text-amber-800 font-semibold text-xs">변화</th></tr></thead><tbody>`;
    [{key:'water',label:'수분'},{key:'oil',label:'유분'},{key:'elasticity',label:'탄력'},{key:'score',label:'종합'}].forEach(({key,label}) => {
      html += `<tr class="border-b border-amber-50/50"><td class="p-3 font-medium">${label}</td>`;
      const vals = rptMeasurements.map(v => v.measurements[key]||0);
      rptMeasurements.forEach(v => {
        const val = v.measurements[key]||0;
        const s = getSkinStatus(key, val);
        html += `<td class="p-3 text-center"><span class="inline-block px-2 py-1 rounded text-xs font-semibold" style="background:${s.bg};color:${s.color};">${val}</span></td>`;
      });
      const first=vals[0], last=vals[vals.length-1], diff=last-first;
      const isGoodUp = key !== 'oil';
      const isImproved = isGoodUp ? diff > 0 : (first > 35 ? diff < 0 : diff > 0);
      const changeText = diff > 0 ? `+${diff}` : `${diff}`;
      const changeColor = diff === 0 ? 'color:#8c7e77' : isImproved ? 'color:#7db89e' : 'color:#c4756a';
      html += `<td class="p-3 text-center font-semibold text-xs" style="${changeColor}">${changeText}</td></tr>`;
    });
    html += `</tbody></table></div>`;
  }

  // Concern progress table
  html += `<h3 class="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-3">관심사별 변화 요약</h3>`;
  const concernMap = {};
  visits.forEach((v, vi) => {
    (v.zones||[]).forEach(z => (z.concerns||[]).forEach(cc => {
      if (!concernMap[cc.id]) concernMap[cc.id] = { parts: new Set(), byVisit: {} };
      concernMap[cc.id].parts.add(z.part);
      if (!concernMap[cc.id].byVisit[vi]) concernMap[cc.id].byVisit[vi] = cc.severity;
      else concernMap[cc.id].byVisit[vi] = Math.max(concernMap[cc.id].byVisit[vi], cc.severity);
    }));
  });

  html += `<div class="glass-solid overflow-hidden mb-4"><table class="w-full text-sm"><thead><tr class="border-b border-amber-100/30">
    <th class="text-left p-3 text-amber-800 font-semibold text-xs">관심사</th><th class="text-left p-3 text-amber-800 font-semibold text-xs">부위</th>`;
  visits.forEach((v, i) => html += `<th class="text-center p-3 text-amber-800 font-semibold text-xs">${i+1}회</th>`);
  html += `<th class="text-center p-3 text-amber-800 font-semibold text-xs">변화</th></tr></thead><tbody>`;

  for (const [cId, data] of Object.entries(concernMap)) {
    const label = findConcernLabel(cId);
    const parts = [...data.parts].join(', ');
    const sevs = Object.values(data.byVisit);
    const first = sevs[0], last = sevs[sevs.length-1];
    const diff = first - last;
    const changeText = diff > 0 ? `↓${diff} 개선` : diff < 0 ? `↑${Math.abs(diff)} 악화` : '유지';
    const changeColor = diff > 0 ? 'color:#7db89e' : diff < 0 ? 'color:#c4756a' : 'color:#8c7e77';

    html += `<tr class="border-b border-amber-50/50"><td class="p-3 font-medium">${label}</td><td class="p-3 text-amber-700 text-xs">${parts}</td>`;
    visits.forEach((v, vi) => {
      const sev = data.byVisit[vi];
      if (sev) html += `<td class="p-3 text-center"><span class="inline-block w-7 h-7 rounded-full text-white text-xs leading-7 sev-bg-${sev}">${sev}</span></td>`;
      else html += `<td class="p-3 text-center text-amber-300">-</td>`;
    });
    html += `<td class="p-3 text-center font-semibold text-xs" style="${changeColor}">${changeText}</td></tr>`;
  }
  html += `</tbody></table></div>`;

  // Visit details
  html += `<h3 class="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-3">회차별 상세 기록</h3>`;
  visits.forEach((v, i) => {
    const date = new Date(v.date).toLocaleDateString('ko',{year:'numeric',month:'long',day:'numeric'});
    html += `<div class="glass-solid p-4 mb-3">
      <div class="flex justify-between items-center mb-2"><span class="font-semibold">${i+1}회차</span><span class="text-xs text-amber-700">${date}</span></div>`;
    (v.zones||[]).forEach(z => {
      const tags = (z.concerns||[]).map(cc => `<span class="tag-pill tag-pill-sm sev-bg-${cc.severity}" style="color:white;border:none;">${findConcernLabel(cc.id)} ${SEV_LABELS[cc.severity]}</span>`).join(' ');
      html += `<div class="mb-2"><span class="text-sm font-medium">${z.part}</span><span class="text-xs text-amber-400 ml-1">${VIEW_LABELS[z.side]||z.side}</span><div class="flex flex-wrap gap-1 mt-1">${tags}</div>${z.memo?'<p class="text-xs text-amber-700 mt-1">'+z.memo+'</p>':''}</div>`;
    });
    if (v.notes) html += `<p class="text-xs text-amber-700 mt-2 pt-2 border-t border-amber-100/20">${v.notes}</p>`;
    html += `</div>`;
  });

  // Footer
  html += `<div class="text-center text-xs text-amber-300 py-4 mt-4 border-t border-amber-100/20">GLOWFLOW · ${new Date().toLocaleDateString('ko')} 생성</div>`;
  el.innerHTML = html;
}

// ════════════════════════════════════════
//  CHART SESSION (sub-view)
// ════════════════════════════════════════
function startNewSession() {
  currentSessionId=null;sessionZones=[];
  const c=db.customers.find(x=>x.id===currentCustomerId);
  const gender=c?.gender||'female';
  const views=gender==='male'?[{k:'male_front',l:'앞면'},{k:'male_back',l:'뒷면'},{k:'male_face',l:'얼굴'}]:[{k:'front',l:'앞면'},{k:'back',l:'뒷면'},{k:'face',l:'얼굴'}];
  currentChartView=views[0].k;
  const visits=getCustomerVisits(currentCustomerId);
  pushSubView('view-session',`${c?.name||''} · ${visits.length+1}회차`);
  document.getElementById('session-title').textContent=`${visits.length+1}회차 관리 기록`;
  document.getElementById('session-notes').value='';
  initChartTabs(views);renderSessionPanel();loadSkinInputs(null);
}

function openSessionReview(visitId) {
  const v=db.visits.find(x=>x.id===visitId);if(!v)return;
  currentSessionId=visitId;sessionZones=JSON.parse(JSON.stringify(v.zones||[]));
  const c=db.customers.find(x=>x.id===currentCustomerId);
  const visits=getCustomerVisits(currentCustomerId);const num=visits.findIndex(x=>x.id===visitId)+1;
  const gender=c?.gender||'female';
  const views=gender==='male'?[{k:'male_front',l:'앞면'},{k:'male_back',l:'뒷면'},{k:'male_face',l:'얼굴'}]:[{k:'front',l:'앞면'},{k:'back',l:'뒷면'},{k:'face',l:'얼굴'}];
  currentChartView=views[0].k;
  pushSubView('view-session',`${c?.name||''} · ${num}회차`);
  document.getElementById('session-title').textContent=`${num}회차 관리 기록`;
  document.getElementById('session-notes').value=v.notes||'';
  initChartTabs(views);renderSessionPanel();loadSkinInputs(v.measurements);
}

function initChartTabs(views) {
  document.getElementById('chart-tabs').innerHTML=views.map(v=>`<button class="segment-item ${v.k===currentChartView?'active':''}" data-view="${v.k}">${v.l}</button>`).join('');
  document.querySelectorAll('#chart-tabs .segment-item').forEach(btn=>{btn.onclick=()=>{currentChartView=btn.dataset.view;document.querySelectorAll('#chart-tabs .segment-item').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById('chart-img').src=IMAGES[currentChartView];};});
  document.getElementById('chart-img').src=IMAGES[currentChartView];
  document.getElementById('chart-img').onload=()=>{syncChartSvg();renderChart();};
}

function syncChartSvg(){const img=document.getElementById('chart-img'),svg=document.getElementById('chart-svg');if(!img.naturalWidth)return;svg.setAttribute('viewBox',`0 0 ${img.naturalWidth} ${img.naturalHeight}`);svg.style.width=img.clientWidth+'px';svg.style.height=img.clientHeight+'px';renderChart();}

function renderChart(){
  const rl=document.getElementById('chart-regions');rl.innerHTML='';
  getRegionsForView(currentChartView).forEach(r=>{
    const zone=sessionZones.find(z=>z.part===r.part&&z.side===currentChartView);
    const maxSev=zone?Math.max(...(zone.concerns||[]).map(c=>c.severity||3),0):0;
    const el=document.createElementNS('http://www.w3.org/2000/svg','ellipse');
    el.setAttribute('cx',r.cx);el.setAttribute('cy',r.cy);el.setAttribute('rx',r.rx);el.setAttribute('ry',r.ry);
    let cls='body-part';if(zone)cls+=' selected'+(maxSev?' sev-'+maxSev:'');
    el.setAttribute('class',cls);el.onclick=()=>openZoneSheet(r.part,currentChartView);
    rl.appendChild(el);
  });
}

function getRegionsForView(view){const all=db.regions[view]||{};const r=[];for(const part in all)(all[part]||[]).forEach(e=>{if(e.rx>0||e.ry>0)r.push({part,...e});});return r;}

function renderSessionPanel(){
  const allZ=sessionZones;
  const p=document.getElementById('session-zones');
  if(p)p.innerHTML=allZ.length===0?'<p class="text-sm text-amber-400 text-center py-6">인체도에서 부위를 탭하세요</p>':allZ.map((z,i)=>renderZoneCard(z,i)).join('');
  const b=document.getElementById('zone-count-badge');if(b)b.textContent=allZ.length;
  const m=document.getElementById('mobile-session-zones');if(m)m.innerHTML=allZ.length===0?'<p class="text-sm text-amber-400 text-center py-4">선택된 부위 없음</p>':allZ.map((z,i)=>renderZoneCard(z,i)).join('');
}

function renderZoneCard(zone,idx){
  const vl=VIEW_LABELS[zone.side]||zone.side;
  const tags=(zone.concerns||[]).map(cc=>`<span class="tag-pill tag-pill-sm sev-bg-${cc.severity||3}" style="color:white;border:none;">${findConcernLabel(cc.id)} ${SEV_LABELS[cc.severity||3]}</span>`).join('');
  return `<div class="glass-solid p-3"><div class="flex justify-between items-start mb-1"><div><span class="font-medium text-sm">${zone.part}</span><span class="text-xs text-amber-400 ml-1">${vl}</span></div><div class="flex gap-1"><button onclick="editSessionZone(${idx})" class="btn-icon" style="width:36px;height:36px;"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2.5l2.5 2.5L4 13.5H1.5V11L10 2.5z"/></svg></button><button onclick="removeSessionZone(${idx})" class="btn-icon" style="width:36px;height:36px;"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l10 10M13 3L3 13"/></svg></button></div></div><div class="flex flex-wrap gap-1">${tags||'<span class="text-xs text-amber-400">관심사 없음</span>'}</div>${zone.memo?'<p class="text-xs text-amber-700 mt-1">'+zone.memo+'</p>':''}</div>`;
}

function editSessionZone(idx){const z=sessionZones[idx];if(!z)return;sheetState={part:z.part,side:z.side,concerns:new Set((z.concerns||[]).map(c=>c.id)),severity:(z.concerns||[])[0]?.severity||3,memo:z.memo||'',editIdx:idx};document.getElementById('sheet-title').textContent=z.part;document.getElementById('sheet-memo').value=sheetState.memo;renderSheetTags();updateSeverityUI();openBottomSheet('sheet-zone');}
function removeSessionZone(idx){sessionZones.splice(idx,1);renderSessionPanel();renderChart();}

const SKIN_FIELDS = ['water','oil','elasticity'];
const SKIN_LABELS = {water:'수분',oil:'유분',elasticity:'탄력',score:'종합'};

function getSkinValues() {
  const vals = {};
  let hasAny = false;
  [...SKIN_FIELDS, 'score'].forEach(type => {
    const v = document.getElementById('skin-'+type)?.value || document.getElementById('m-skin-'+type)?.value || '';
    if (v) { vals[type] = Number(v); hasAny = true; }
  });
  return hasAny ? vals : null;
}

function updateSkinBadge(prefix) {
  [...SKIN_FIELDS, 'score'].forEach(type => {
    const input = document.getElementById(prefix+'skin-'+type);
    const badge = document.getElementById(prefix+'skin-'+type+'-badge');
    if (!input || !badge) return;
    const val = Number(input.value);
    if (!input.value) { badge.textContent = ''; badge.style.background = ''; return; }
    const s = getSkinStatus(type, val);
    badge.textContent = s.label;
    badge.style.background = s.bg;
    badge.style.color = s.color;
  });
}

function updateSkinPreview() { updateSkinBadge(''); }
function updateSkinPreviewMobile() { updateSkinBadge('m-'); }

function loadSkinInputs(measurements) {
  const m = measurements || {};
  [...SKIN_FIELDS, 'score'].forEach(type => {
    const v = m[type] ?? '';
    const d = document.getElementById('skin-'+type);
    const mob = document.getElementById('m-skin-'+type);
    if (d) d.value = v;
    if (mob) mob.value = v;
  });
  updateSkinPreview();
  updateSkinPreviewMobile();
}

function saveSession(){
  const notes=document.getElementById('session-notes')?.value?.trim()||document.getElementById('mobile-session-notes')?.value?.trim()||'';
  const measurements = getSkinValues();
  if(currentSessionId){
    const v=db.visits.find(x=>x.id===currentSessionId);
    if(v){v.zones=sessionZones;v.notes=notes;if(measurements)v.measurements=measurements;}
  } else {
    const visit = {id:genId(),customerId:currentCustomerId,date:Date.now(),zones:sessionZones,notes};
    if(measurements) visit.measurements = measurements;
    db.visits.push(visit);
    const c=db.customers.find(x=>x.id===currentCustomerId);if(c)c.lastVisit=Date.now();
  }
  saveDB();closeSessionSheet();goBack();
}

// ════════════════════════════════════════
//  ZONE SHEET
// ════════════════════════════════════════
function openZoneSheet(part,side){
  const ei=sessionZones.findIndex(z=>z.part===part&&z.side===side);
  if(ei>=0){const z=sessionZones[ei];sheetState={part,side,concerns:new Set((z.concerns||[]).map(c=>c.id)),severity:(z.concerns||[])[0]?.severity||3,memo:z.memo||'',editIdx:ei};}
  else sheetState={part,side,concerns:new Set(),severity:3,memo:'',editIdx:-1};
  document.getElementById('sheet-title').textContent=part;document.getElementById('sheet-memo').value=sheetState.memo;renderSheetTags();updateSeverityUI();openBottomSheet('sheet-zone');
}
function renderSheetTags(){['skin','body','etc'].forEach(cat=>{const el=document.getElementById('sheet-'+cat+'-tags');el.innerHTML=CONCERNS[cat].map(t=>`<span class="tag-pill ${sheetState.concerns.has(t.id)?'active':''}" onclick="toggleSheetConcern('${t.id}')">${t.label}</span>`).join('');});document.getElementById('sheet-severity-section').classList.toggle('hidden',sheetState.concerns.size===0);}
function toggleSheetConcern(id){if(sheetState.concerns.has(id))sheetState.concerns.delete(id);else sheetState.concerns.add(id);renderSheetTags();}
function setSheetSeverity(n){sheetState.severity=n;updateSeverityUI();}
function updateSeverityUI(){document.querySelectorAll('#sheet-zone .severity-dot').forEach((d,i)=>d.classList.toggle('selected',i+1===sheetState.severity));}
function confirmZone(){
  const concerns=Array.from(sheetState.concerns).map(id=>({id,severity:sheetState.severity}));const memo=document.getElementById('sheet-memo').value.trim();
  const zone={part:sheetState.part,side:sheetState.side,concerns,memo};
  if(sheetState.editIdx>=0)sessionZones[sheetState.editIdx]=zone;else sessionZones.push(zone);
  closeSheet();renderSessionPanel();renderChart();
}
function findConcernLabel(id){for(const cat of Object.values(CONCERNS)){const f=cat.find(t=>t.id===id);if(f)return f.label;}return id;}

// ════════════════════════════════════════
//  ADMIN
// ════════════════════════════════════════
function initAdmin(){
  adminView='front';adminActivePart=PARTS[0];
  Object.keys(IMAGES).forEach(k=>{if(!db.regions[k]){db.regions[k]={};PARTS.forEach(p=>db.regions[k][p]=[]);}});
  document.getElementById('admin-tabs').innerHTML=Object.keys(IMAGES).map(k=>`<button class="segment-item ${k===adminView?'active':''}" data-view="${k}">${VIEW_LABELS[k]||k}</button>`).join('');
  document.querySelectorAll('#admin-tabs .segment-item').forEach(btn=>{btn.onclick=()=>{adminView=btn.dataset.view;document.querySelectorAll('#admin-tabs .segment-item').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById('admin-chart-img').src=IMAGES[adminView];document.getElementById('admin-view-label').textContent=adminView;renderAdminUI();};});
  document.getElementById('admin-chart-img').src=IMAGES[adminView];document.getElementById('admin-chart-img').onload=syncAdminSvg;
  const svg=document.getElementById('admin-chart-svg');svg.onmousedown=adminDrawStart;svg.ontouchstart=adminDrawStart;
  window.addEventListener('mousemove',adminDrawMove);window.addEventListener('touchmove',adminDrawMove,{passive:false});
  window.addEventListener('mouseup',adminDrawEnd);window.addEventListener('touchend',adminDrawEnd);
  renderAdminUI();
}
function syncAdminSvg(){const img=document.getElementById('admin-chart-img'),svg=document.getElementById('admin-chart-svg');if(!img.naturalWidth)return;svg.setAttribute('viewBox',`0 0 ${img.naturalWidth} ${img.naturalHeight}`);svg.style.width=img.clientWidth+'px';svg.style.height=img.clientHeight+'px';renderAdminSVG();}
function renderAdminUI(){document.getElementById('admin-parts').innerHTML=PARTS.map(p=>{const a=adminActivePart===p,cnt=(db.regions[adminView]?.[p]||[]).length;return `<button class="w-full text-left px-3 py-2.5 rounded-lg text-sm transition ${a?'accent-gradient text-white font-medium':'hover:bg-amber-50'}" onclick="adminActivePart='${p}';renderAdminUI();">${p}${cnt?' <span class="opacity-60">('+cnt+')</span>':''}</button>`;}).join('');renderAdminSVG();}
function getAdminPos(e){const svg=document.getElementById('admin-chart-svg'),CTM=svg.getScreenCTM();if(!CTM)return{x:0,y:0};const cx=e.touches?e.touches[0].clientX:e.clientX,cy=e.touches?e.touches[0].clientY:e.clientY;return{x:(cx-CTM.e)/CTM.a,y:(cy-CTM.f)/CTM.d};}
function adminDrawStart(e){if(e.target.classList.contains('dragger'))return;e.preventDefault();if(!db.regions[adminView]){db.regions[adminView]={};PARTS.forEach(p=>db.regions[adminView][p]=[]);}if(!db.regions[adminView][adminActivePart])db.regions[adminView][adminActivePart]=[];const pos=getAdminPos(e);db.regions[adminView][adminActivePart].push({cx:pos.x,cy:pos.y,rx:0,ry:0});adminInteraction={mode:'create',part:adminActivePart,index:db.regions[adminView][adminActivePart].length-1,startX:pos.x,startY:pos.y};}
function adminDrawMove(e){if(!adminInteraction.mode)return;e.preventDefault();const pos=getAdminPos(e),{mode,part,index,startX,startY,initData}=adminInteraction,d=db.regions[adminView]?.[part]?.[index];if(!d)return;if(mode==='create'){d.rx=Math.abs(pos.x-startX)/2;d.ry=Math.abs(pos.y-startY)/2;d.cx=(startX+pos.x)/2;d.cy=(startY+pos.y)/2;}else if(mode==='move'){d.cx=initData.cx+(pos.x-startX);d.cy=initData.cy+(pos.y-startY);}else if(mode==='resize-x'){d.rx=Math.max(1,Math.abs(pos.x-d.cx));}else if(mode==='resize-y'){d.ry=Math.max(1,Math.abs(pos.y-d.cy));}renderAdminSVG();}
function adminDrawEnd(){if(adminInteraction.mode==='create'){const{part,index}=adminInteraction,d=db.regions[adminView]?.[part]?.[index];if(d&&d.rx<2&&d.ry<2)db.regions[adminView][part].splice(index,1);saveDB();renderAdminUI();}if(adminInteraction.mode)saveDB();adminInteraction.mode=null;renderAdminSVG();}
function adminMoveDown(e,part,i){e.stopPropagation();if(e.type==='touchstart')e.preventDefault();const now=Date.now();if(adminLastTap.target===part+'-'+i&&now-adminLastTap.time<350){adminDeleteEllipse(part,i);adminLastTap={time:0,target:null};return;}adminLastTap={time:now,target:part+'-'+i};const pos=getAdminPos(e);adminInteraction={mode:'move',part,index:i,startX:pos.x,startY:pos.y,initData:{...db.regions[adminView][part][i]}};}
function adminResizeX(e,part,i){e.stopPropagation();if(e.type==='touchstart')e.preventDefault();adminInteraction={mode:'resize-x',part,index:i};}
function adminResizeY(e,part,i){e.stopPropagation();if(e.type==='touchstart')e.preventDefault();adminInteraction={mode:'resize-y',part,index:i};}
function adminDeleteEllipse(part,i){db.regions[adminView][part].splice(i,1);adminInteraction.mode=null;saveDB();renderAdminUI();}
function renderAdminSVG(){const rl=document.getElementById('admin-regions'),dl=document.getElementById('admin-draggers');rl.innerHTML='';dl.innerHTML='';const data=db.regions[adminView];if(!data)return;for(const part of PARTS){(data[part]||[]).forEach((e,i)=>{if(e.rx<=0&&e.ry<=0)return;const el=document.createElementNS('http://www.w3.org/2000/svg','ellipse');el.setAttribute('cx',e.cx);el.setAttribute('cy',e.cy);el.setAttribute('rx',e.rx);el.setAttribute('ry',e.ry);el.setAttribute('class','body-part'+(adminActivePart===part?' active-edit':''));rl.appendChild(el);if(adminActivePart===part){const mh=document.createElementNS('http://www.w3.org/2000/svg','circle');mh.setAttribute('cx',e.cx);mh.setAttribute('cy',e.cy);mh.setAttribute('class','dragger');mh.addEventListener('mousedown',ev=>adminMoveDown(ev,part,i));mh.addEventListener('touchstart',ev=>adminMoveDown(ev,part,i),{passive:false});mh.addEventListener('dblclick',()=>adminDeleteEllipse(part,i));dl.appendChild(mh);const rx=document.createElementNS('http://www.w3.org/2000/svg','circle');rx.setAttribute('cx',e.cx+e.rx);rx.setAttribute('cy',e.cy);rx.setAttribute('class','dragger resize-x');rx.addEventListener('mousedown',ev=>adminResizeX(ev,part,i));rx.addEventListener('touchstart',ev=>adminResizeX(ev,part,i),{passive:false});dl.appendChild(rx);const ry=document.createElementNS('http://www.w3.org/2000/svg','circle');ry.setAttribute('cx',e.cx);ry.setAttribute('cy',e.cy+e.ry);ry.setAttribute('class','dragger resize-y');ry.addEventListener('mousedown',ev=>adminResizeY(ev,part,i));ry.addEventListener('touchstart',ev=>adminResizeY(ev,part,i),{passive:false});dl.appendChild(ry);}});}}
function exportRegions(){const j=JSON.stringify(db.regions,null,2);navigator.clipboard.writeText(j).then(()=>alert('복사 완료!')).catch(()=>{console.log(j);alert('콘솔 확인');});}
function importRegions(){const input=prompt('영역 JSON:');if(!input)return;try{db.regions=JSON.parse(input);saveDB();renderAdminUI();alert('완료!');}catch(e){alert('오류: '+e.message);}}

// ════════════════════════════════════════
//  BOTTOM SHEET HELPERS
// ════════════════════════════════════════
function openBottomSheet(id){const oid=id==='sheet-zone'?'sheet-overlay':id==='sheet-customer'?'sheet-customer-overlay':'sheet-session-overlay';document.getElementById(oid).classList.add('open');document.getElementById(id).classList.add('open');}
function closeSheet(){document.getElementById('sheet-overlay').classList.remove('open');document.getElementById('sheet-zone').classList.remove('open');}
function closeCustomerSheet(){document.getElementById('sheet-customer-overlay').classList.remove('open');document.getElementById('sheet-customer').classList.remove('open');}
function openSessionSheet(){openBottomSheet('sheet-session');}
function closeSessionSheet(){document.getElementById('sheet-session-overlay').classList.remove('open');document.getElementById('sheet-session').classList.remove('open');}

// ════════════════════════════════════════
//  INIT
// ════════════════════════════════════════
window.addEventListener('resize',()=>{syncChartSvg();syncAnalysisChart();if(document.getElementById('view-admin').classList.contains('active'))syncAdminSvg();});
window.addEventListener('orientationchange',()=>setTimeout(()=>{syncChartSvg();syncAdminSvg();},200));
// Restore state from sessionStorage on reload
function resetData() {
  document.getElementById('reset-confirm').classList.add('open');
  document.getElementById('reset-confirm-overlay').classList.add('open');
}
function confirmReset() {
  window.removeEventListener('beforeunload', saveState);
  localStorage.removeItem('aesthetic_db');
  sessionStorage.removeItem('ac_state');
  location.reload();
}
function cancelReset() {
  document.getElementById('reset-confirm').classList.remove('open');
  document.getElementById('reset-confirm-overlay').classList.remove('open');
}

function saveState() {
  sessionStorage.setItem('ac_state', JSON.stringify({
    tab: activeMainTab,
    customerId: currentCustomerId,
    analysisMode: analysisMode
  }));
}
function restoreState() {
  try {
    const s = JSON.parse(sessionStorage.getItem('ac_state'));
    if (s) {
      currentCustomerId = s.customerId || null;
      analysisMode = s.analysisMode || 'face';
      switchTab(s.tab || 'clients');
      return;
    }
  } catch(e) {}
  switchTab('clients');
}
// Save state before unload
window.addEventListener('beforeunload', saveState);
restoreState();
