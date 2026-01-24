const STORAGE_KEY = "driver_cards_v2";

const DRIVER_META = {
  strong:  { name: "강해져야 해", color: "#d9ecff" },
  perfect: { name: "완벽해야 해", color: "#ffe6ea" },
  hurry:   { name: "서둘러야 해", color: "#e7ffe9" },
  try:     { name: "열심히 해야 해", color: "#fff3d6" },
  please:  { name: "기쁘게 해야 해", color: "#efe3ff" },
};

const TYPE_META = {
  strength: { name: "강점" },
  overuse:  { name: "과용" },
};

let cards = [];
let idx = 0;
let selected = new Set(); // 해당됨 card_id 저장

const $ = (id) => document.getElementById(id);

function showScreen(screenId){
  ["screenIntro","screenPlay","screenDone","screenResult"].forEach(id=>{
    const el = $(id);
    if(!el) return;
    el.classList.toggle("active", id === screenId);
  });
  window.scrollTo(0,0); // “아래로 붙는 현상” 방지(항상 화면 위로)
}

async function loadCards(){
  // 문장은 cards.json에 둠 (문장만 수정해도 app.js 안 깨짐)
  const res = await fetch("cards.json?v=2", { cache: "no-store" });
  if(!res.ok) throw new Error("cards.json을 불러오지 못했습니다.");
  const data = await res.json();
  // 정규화
  cards = data.map((c, i)=>({
    card_id: c.card_id || `C${i+1}`,
    driver: c.driver,
    type: c.type,
    text: c.text,
  }));
  if(cards.length !== 40) {
    // 40개가 아니면 바로 알려주기
    console.warn("cards length:", cards.length);
  }
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    idx,
    selected: Array.from(selected),
  }));
}

function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;
  try{
    const s = JSON.parse(raw);
    idx = Number.isInteger(s.idx) ? s.idx : 0;
    selected = new Set(Array.isArray(s.selected) ? s.selected : []);
  }catch{}
}

function resetAll(){
  idx = 0;
  selected = new Set();
  localStorage.removeItem(STORAGE_KEY);
  renderCard();
  showScreen("screenIntro");
}

function renderCard(){
  if(!cards.length) return;

  // 범위 보정
  if(idx < 0) idx = 0;
  if(idx > cards.length-1) idx = cards.length-1;

  const c = cards[idx];
  const dm = DRIVER_META[c.driver] || { name: c.driver, color: "#e9e9e9" };
  const tm = TYPE_META[c.type] || { name: c.type };

  $("progressText").textContent = `${idx+1}/${cards.length}`;
  $("badgeDriver").textContent = dm.name;
  $("badgeType").textContent = tm.name;
  $("cardText").textContent = c.text;

  // 카드 배경색(너무 연하면 조금 더 진하게)
  $("cardBox").style.background = dm.color;

  saveState();
}

function isLastCard(){
  return idx === cards.length - 1;
}

function goPrev(){
  idx -= 1;
  renderCard();
}
function goNext(){
  if(isLastCard()){
    // 마지막 카드에서 “다음” 누르면 완료 화면으로
    showScreen("screenDone");
    return;
  }
  idx += 1;
  renderCard();
}

function markYes(){
  const c = cards[idx];
  selected.add(c.card_id);
  saveState();
  // 마지막 카드에서 “해당됨” 누르면 완료 화면으로
  if(isLastCard()){
    showScreen("screenDone");
    return;
  }
  idx += 1;
  renderCard();
}

function countResults(){
  const counts = {};
  Object.keys(DRIVER_META).forEach(k=>{
    counts[k] = { strength: 0, overuse: 0 };
  });

  // 해당됨만 카운트
  for(const c of cards){
    if(!selected.has(c.card_id)) continue;
    if(!counts[c.driver]) counts[c.driver] = { strength:0, overuse:0 };
    counts[c.driver][c.type] += 1;
  }
  return counts;
}

function renderResults(){
  const counts = countResults();
  const area = $("resultArea");
  area.innerHTML = "";

  Object.keys(DRIVER_META).forEach(driverKey=>{
    const meta = DRIVER_META[driverKey];
    const s = counts[driverKey]?.strength ?? 0;
    const o = counts[driverKey]?.overuse ?? 0;

    // 4개 만점 기준(강점 4 / 과용 4)
    const sPct = Math.round((s/4)*100);
    const oPct = Math.round((o/4)*100);

    const block = document.createElement("div");
    block.className = "driverBlock";

    const name = document.createElement("div");
    name.className = "driverName";
    name.textContent = meta.name;
    block.appendChild(name);

    // 강점 bar
    const label1 = document.createElement("div");
    label1.className = "barLabel";
    label1.innerHTML = `<span>강점</span><span>${s}/4</span>`;
    block.appendChild(label1);

    const track1 = document.createElement("div");
    track1.className = "barTrack";
    const fill1 = document.createElement("div");
    fill1.className = "barFill";
    fill1.style.background = meta.color;
    fill1.style.width = `${sPct}%`;
    track1.appendChild(fill1);
    block.appendChild(track1);

    // 과용 bar (같은 계열로 조금 진하게)
    const label2 = document.createElement("div");
    label2.className = "barLabel";
    label2.innerHTML = `<span>과용</span><span>${o}/4</span>`;
    block.appendChild(label2);

    const track2 = document.createElement("div");
    track2.className = "barTrack";
    const fill2 = document.createElement("div");
    fill2.className = "barFill";
    fill2.style.background = shade(meta.color, -18);
    fill2.style.width = `${oPct}%`;
    track2.appendChild(fill2);
    block.appendChild(track2);

    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent =
      (s+o === 0)
        ? "해당됨을 누른 문항이 아직 없습니다."
        : "강점이 높으면 좋은 방향으로 쓰고 있는 편, 과용이 높으면 스트레스로 작동할 가능성이 큽니다.";
    block.appendChild(hint);

    area.appendChild(block);
  });
}

function shade(hex, amt){
  // 아주 간단한 색 진하게/연하게(대충 써도 충분)
  // 입력이 rgb/기타면 그냥 원색 반환
  if(!hex || !hex.startsWith("#")) return hex;
  const c = hex.replace("#","");
  if(c.length !== 6) return hex;
  const num = parseInt(c, 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00FF) + amt;
  let b = (num & 0x0000FF) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return "#" + ((r<<16) | (g<<8) | b).toString(16).padStart(6,"0");
}

function wireEvents(){
  $("btnBegin").addEventListener("click", ()=>{
    showScreen("screenPlay");
    renderCard();
  });

  $("btnPrev").addEventListener("click", goPrev);
  $("btnNext").addEventListener("click", goNext);
  $("btnYes").addEventListener("click", markYes);

  $("btnReset").addEventListener("click", ()=>{
    if(confirm("진단을 초기화할까요?")){
      resetAll();
    }
  });

  $("btnShowResult").addEventListener("click", ()=>{
    renderResults();
    showScreen("screenResult");
  });

  $("btnBackHome").addEventListener("click", ()=>{
    showScreen("screenIntro");
    window.scrollTo(0,0);
  });

  // 스와이프(좌/우로 다음/이전)
  let startX = null;
  document.addEventListener("touchstart", (e)=>{
    if(!$("screenPlay").classList.contains("active")) return;
    startX = e.touches[0].clientX;
  }, { passive:true });

  document.addEventListener("touchend", (e)=>{
    if(!$("screenPlay").classList.contains("active")) return;
    if(startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    startX = null;
    if(Math.abs(dx) < 40) return;
    if(dx > 0) goPrev();
    else goNext();
  }, { passive:true });
}

(async function init(){
  try{
    loadState();
    await loadCards();
    wireEvents();
    showScreen("screenIntro");
  }catch(err){
    alert(`초기화 오류: ${err.message}`);
    console.error(err);
  }
})();
