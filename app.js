alert("app.js 로딩됨")
  ;const STORAGE_KEY = "ta_driver_pwa_v3"; // 버전 올려서 캐시/저장 꼬임 방지

let cards = [];
let idx = 0;
let selected = new Set();

const DRIVERS = ["강해져야 해", "완벽해야 해", "서둘러야 해", "열심히 해야 해", "기쁘게 해야 해"];

const DRIVER_TINT = {
  "강해져야 해": "#4AA3FF",
  "완벽해야 해": "#8A60FF",
  "서둘러야 해": "#FF6B6B",
  "열심히 해야 해": "#2ED3A0",
  "기쁘게 해야 해": "#FFB84D"
};

function $(id){ return document.getElementById(id); }

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    idx,
    selected: Array.from(selected)
  }));
}

function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;
  try{
    const s = JSON.parse(raw);
    idx = Number.isInteger(s.idx) ? s.idx : 0;
    selected = new Set(Array.isArray(s.selected) ? s.selected : []);
  }catch(e){}
}

async function loadCards(){
  const res = await fetch("cards.json", { cache: "no-store" });
  if(!res.ok) throw new Error("cards.json 불러오기 실패");
  cards = await res.json();
  if(!Array.isArray(cards) || cards.length !== 40) {
    throw new Error(`cards.json 카드 수 확인 필요: 현재 ${Array.isArray(cards)?cards.length:0}개`);
  }
}

function showScreen(name){
  ["screenIntro","screenPlay","screenResult"].forEach(id => $(id).classList.add("hidden"));
  $(name).classList.remove("hidden");
}

function clampIndex(){
  if(idx < 0) idx = 0;
  if(idx > cards.length - 1) idx = cards.length - 1;
}

function setTint(driver){
  const tint = DRIVER_TINT[driver] || "#ddd";
  $("cardBox").style.setProperty("--tint", tint);
}

function renderCard(){
  clampIndex();
  const c = cards[idx];

  $("progressText").textContent = `${idx+1}/${cards.length}`;

  $("mDriver").textContent = c.driver;
  $("mType").textContent = c.type;

  $("cTitle").textContent = "나는";
  $("cDetail").textContent = c.text;

  // hint는 나중에 쓰고 싶으면 cards.json에 "hint" 추가하면 자동 표시됨
  if(c.hint){
    $("cHint").textContent = c.hint;
    $("cHint").classList.remove("hidden");
  }else{
    $("cHint").classList.add("hidden");
  }

  setTint(c.driver);
  saveState();
}

function renderResults(){
  // 요약
  const total = selected.size;
  const strength = cards.filter(c => selected.has(c.card_id) && c.type==="강점").length;
  const stress = cards.filter(c => selected.has(c.card_id) && c.type==="스트레스").length;

  $("summary").textContent =
`선택 카드 수: ${total}개
강점: ${strength}개 / 스트레스: ${stress}개`;

  // 드라이버별 카운트
  const byDriver = {};
  DRIVERS.forEach(d => byDriver[d] = 0);

  cards.forEach(c=>{
    if(selected.has(c.card_id)) byDriver[c.driver] = (byDriver[c.driver] || 0) + 1;
  });

  $("driverCounts").innerHTML = DRIVERS.map(d=>{
    return `<li><span>${d}</span><span>${byDriver[d] || 0}개</span></li>`;
  }).join("");

  // 강점/스트레스 비율
  $("typeCounts").innerHTML =
    `<li><span>강점</span><span>${strength}개</span></li>` +
    `<li><span>스트레스</span><span>${stress}개</span></li>`;
}

function resetAll(){
  idx = 0;
  selected = new Set();
  localStorage.removeItem(STORAGE_KEY);
  showScreen("screenIntro");
}

function wireEvents(){
  // ✅ 시작 버튼
  const begin = $("btnBegin");
  if(!begin) throw new Error("btnBegin 버튼을 찾을 수 없음 (index.html id 확인)");
  begin.addEventListener("click", () => {
    showScreen("screenPlay");
    renderCard();
  });

  $("btnPrev").addEventListener("click", () => { idx -= 1; renderCard(); });
  $("btnNext").addEventListener("click", () => { idx += 1; renderCard(); });

  $("btnYes").addEventListener("click", () => {
    const c = cards[idx];
    selected.add(c.card_id);
    idx += 1;
    if(idx > cards.length - 1) idx = cards.length - 1;
    renderCard();
  });

  $("btnFinish").addEventListener("click", () => {
    showScreen("screenResult");
    renderResults();
  });

  $("btnBack").addEventListener("click", () => {
    showScreen("screenPlay");
    renderCard();
  });

  $("btnReset").addEventListener("click", () => {
    if(confirm("선택을 초기화할까요?")){
      idx = 0;
      selected = new Set();
      saveState();
      showScreen("screenIntro");
    }
  });

  // 스와이프(모바일)
  let startX = null;
  document.addEventListener("touchstart", (e)=>{
    if(!e.touches || !e.touches[0]) return;
    startX = e.touches[0].clientX;
  }, { passive:true });

  document.addEventListener("touchend", (e)=>{
    if(startX === null) return;
    const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
    const dx = endX - startX;
    startX = null;

    if(Math.abs(dx) < 40) return;
    // 오른쪽 스와이프 = 이전, 왼쪽 스와이프 = 다음
    if(dx > 0) idx -= 1;
    else idx += 1;
    renderCard();
  }, { passive:true });
}

function registerSW(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").catch(()=>{});
  }
}

(async function init(){
  try{
    loadState();
    await loadCards();
    wireEvents();
    registerSW();
    showScreen("screenIntro");
  }catch(err){
    alert(`초기화 오류: ${err.message}`);
    console.error(err);
  }
})();

