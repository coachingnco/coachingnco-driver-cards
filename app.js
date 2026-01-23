const STORAGE_KEY = "ta_driver_pwa_v2";

let cards = [];
let idx = 0;
let selected = new Set(); // card_id 저장

const DRIVERS = ["강해져야 해","완벽해야 해","서둘러야 해","노력해야 해","기쁘게 해야 해"];
const TYPES = ["강점","스트레스"];

// 드라이버별 배경색(카드 배경)
const DRIVER_BG = {
  "강해져야 해": "#e9f2ff",
  "완벽해야 해": "#fff3e6",
  "서둘러야 해": "#eefbf0",
  "노력해야 해": "#f3edff",
  "기쁘게 해야 해": "#fff0f4"
};

function $(id){ return document.getElementById(id); }

function showScreen(screenId){
  ["screenIntro","screenPlay","screenResult"].forEach(id=>{
    const el = $(id);
    if(!el) return;
    el.classList.toggle("hidden", id !== screenId);
  });
}

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

function clampIndex(){
  if(idx < 0) idx = 0;
  if(idx >= cards.length) idx = cards.length - 1;
}

function updateProgress(){
  $("progressText").textContent = `${idx+1}/${cards.length}`;
}

function renderCard(){
  if(!cards.length) return;

  clampIndex();
  const c = cards[idx];

  // chips
  $("chipDriver").textContent = c.driver || "드라이버";
  $("chipType").textContent = c.type || "구분";

  // 문장(굵은 '나는' 같은 제목 없음 — 카드 텍스트만)
  $("cardText").textContent = c.text || "";

  // 배경색
  const bg = DRIVER_BG[c.driver] || "#f3f7ff";
  $("cardInner").style.background = bg;

  // 결과보기 버튼: 마지막 카드에서만 표시
  const isLast = idx === cards.length - 1;
  $("btnFinish").classList.toggle("hidden", !isLast);

  updateProgress();
  saveState();
}

async function loadCards(){
  // 1) cards.json이 있으면 그것 사용
  //    기대 필드 예: { card_id, driver, type, text }
  try{
    const res = await fetch("cards.json", { cache: "no-store" });
    if(res.ok){
      const data = await res.json();
      if(Array.isArray(data) && data.length){
        cards = data.map((x,i)=>({
          card_id: x.card_id ?? `c_${i+1}`,
          driver: x.driver ?? "",
          type: x.type ?? "",
          text: x.text ?? ""
        }));
      }
    }
  }catch(e){}

  // 2) cards.json이 없거나 비었으면 임시 40장 자동 생성(테스트용)
  if(!cards.length){
    const tmp = [];
    let n = 1;
    for(const d of DRIVERS){
      // 강점 4, 스트레스 4 = 총 8
      for(let i=1;i<=4;i++){
        tmp.push({
          card_id:`auto_${n++}`,
          driver:d,
          type:"강점",
          text:`(${d}·강점 ${i}) 여기에 강점 문장을 넣으세요.`
        });
      }
      for(let i=1;i<=4;i++){
        tmp.push({
          card_id:`auto_${n++}`,
          driver:d,
          type:"스트레스",
          text:`(${d}·스트레스 ${i}) 여기에 스트레스 문장을 넣으세요.`
        });
      }
    }
    cards = tmp; // 40장
  }

  // 혹시 40장이 아니면 진행은 가능하지만 표기는 길이대로
  if(idx >= cards.length) idx = 0;
}

function resetAll(){
  idx = 0;
  selected = new Set();
  localStorage.removeItem(STORAGE_KEY);
  showScreen("screenIntro");
}

function addSelected(){
  const c = cards[idx];
  if(!c) return;
  selected.add(c.card_id);
  saveState();
}

function computeResult(){
  const byDriver = {};
  for(const d of DRIVERS) byDriver[d] = 0;

  // 선택된 카드만 집계
  const picked = new Set(selected);
  for(const c of cards){
    if(picked.has(c.card_id)){
      if(!byDriver[c.driver]) byDriver[c.driver] = 0;
      byDriver[c.driver] += 1;
    }
  }

  // 내림차순 정렬
  const list = Object.entries(byDriver).sort((a,b)=>b[1]-a[1]);
  return list;
}

function renderResults(){
  const list = computeResult();
  const ul = $("resultList");
  ul.innerHTML = "";

  for(const [name, score] of list){
    const li = document.createElement("li");
    li.className = "resultItem";
    li.innerHTML = `
      <div class="resultName">${name}</div>
      <div class="resultScore">${score}</div>
    `;
    ul.appendChild(li);
  }
}

function wireEvents(){
  // 시작
  const begin = $("btnBegin");
  if(begin){
    begin.addEventListener("click", () => {
      showScreen("screenPlay");
      renderCard();
    });
  }

  // 이전/다음
  $("btnPrev").addEventListener("click", () => {
    idx -= 1;
    renderCard();
  });

  $("btnNext").addEventListener("click", () => {
    idx += 1;
    if(idx >= cards.length) idx = cards.length - 1;
    renderCard();
  });

  // 해당됨
  $("btnYes").addEventListener("click", () => {
    addSelected();
    idx += 1;
    if(idx >= cards.length) idx = cards.length - 1;
    renderCard();
  });

  // 결과보기(마지막에서만 보임)
  $("btnFinish").addEventListener("click", () => {
    showScreen("screenResult");
    renderResults();
  });

  // 초기화
  $("btnReset").addEventListener("click", resetAll);
  $("btnRestart").addEventListener("click", resetAll);

  // 결과 → 다시 보기
  $("btnBack").addEventListener("click", () => {
    showScreen("screenPlay");
    renderCard();
  });

  // 스와이프(모바일)
  let startX = null;
  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive:true });

  document.addEventListener("touchend", (e) => {
    if(startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    startX = null;

    if(Math.abs(dx) < 45) return;

    if(dx > 0){
      idx -= 1;
    }else{
      idx += 1;
      if(idx >= cards.length) idx = cards.length - 1;
    }
    renderCard();
  }, { passive:true });
}

function registerSW(){
  // 기존 sw.js 있으면 유지 (없어도 에러 나면 무시)
  try{
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("sw.js").catch(()=>{});
    }
  }catch(e){}
}

(async function init(){
  try{
    loadState();
    await loadCards();
    wireEvents();
    registerSW();
    showScreen("screenIntro");
  }catch(err){
    alert("초기화 오류: " + err.message);
  }
})();
