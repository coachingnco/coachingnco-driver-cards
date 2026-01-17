const STORAGE_KEY = "ta_driver_pwa_v1";

let cards = [];
let idx = 0;
let selected = new Set(); // card_id 저장

const drivers = ["강해져야 해","완벽해야 해","서둘러야 해","노력해야 해","기쁘게 해야 해"];
const types = ["강점","단점"];

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
  try {
    const s = JSON.parse(raw);
    idx = Number.isInteger(s.idx) ? s.idx : 0;
    selected = new Set(Array.isArray(s.selected) ? s.selected : []);
  } catch {}
}
function resetState(){
  idx = 0;
  selected = new Set();
  saveState();
}

function showScreen(name){
  $("screenIntro").classList.add("hidden");
  $("screenPlay").classList.add("hidden");
  $("screenResult").classList.add("hidden");
  $(name).classList.remove("hidden");
}

function clampIndex(){
  if(idx < 0) idx = 0;
  if(idx >= cards.length) idx = Math.max(0, cards.length - 1);
}

function renderCard(){
  clampIndex();
  const c = cards[idx];
  $("progressText").textContent = `${idx+1}/${cards.length}`;

  $("mDriver").textContent = c.driver || "";
  $("mType").textContent = c.type || "";
  $("mTag").textContent = c.tag || "태그 없음";

  $("cTitle").textContent = c.title || "";
  $("cDetail").textContent = c.detail || "";

  saveState();
}

function computeResults(){
  const driverCounts = Object.fromEntries(drivers.map(d => [d, 0]));
  const typeCounts = Object.fromEntries(types.map(t => [t, 0]));
  const driverTypeCounts = Object.fromEntries(
    drivers.map(d => [d, { "강점":0, "단점":0 }])
  );

  const selectedCards = cards.filter(c => selected.has(c.card_id));

  for(const c of selectedCards){
    if(driverCounts[c.driver] !== undefined) driverCounts[c.driver] += 1;
    if(typeCounts[c.type] !== undefined) typeCounts[c.type] += 1;

    if(driverTypeCounts[c.driver]){
      if(driverTypeCounts[c.driver][c.type] !== undefined){
        driverTypeCounts[c.driver][c.type] += 1;
      }
    }
  }

  const sorted = Object.entries(driverCounts).sort((a,b) => b[1]-a[1]);
  const top1 = sorted[0];
  const top2 = sorted[1];

  return { driverCounts, typeCounts, driverTypeCounts, top1, top2, total: selectedCards.length };
}

function renderResults(){
  const r = computeResults();

  const top1Text = r.top1 ? `${r.top1[0]} (${r.top1[1]}장)` : "없음";
  const top2Text = r.top2 ? `${r.top2[0]} (${r.top2[1]}장)` : "없음";

  const s = [];
  s.push(`선택한 카드: ${r.total}장`);
  s.push(`가장 많이 선택한 드라이버: ${top1Text}`);
  s.push(`다음으로 많이 선택한 드라이버: ${top2Text}`);

  const strength = r.typeCounts["강점"] || 0;
  const risk = r.typeCounts["단점"] || 0;

  if(strength > risk) s.push("강점 카드가 더 많다. 지금은 드라이버가 장점으로 잘 쓰이고 있을 가능성이 크다.");
  else if(risk > strength) s.push("단점 카드가 더 많다. 드라이버가 과하게 작동하는 구간이 있을 수 있다.");
  else s.push("강점과 단점이 비슷하다. 상황을 구분해서 쓰는 연습이 효과적일 수 있다.");

  $("summary").textContent = s.join("\n");

  const ul1 = $("driverCounts"); ul1.innerHTML = "";
  for(const [k,v] of Object.entries(r.driverCounts)){
    const li = document.createElement("li");
    li.innerHTML = `<span>${k}</span><span>${v}</span>`;
    ul1.appendChild(li);
  }

  const ul2 = $("typeCounts"); ul2.innerHTML = "";
  for(const [k,v] of Object.entries(r.typeCounts)){
    const li = document.createElement("li");
    li.innerHTML = `<span>${k}</span><span>${v}</span>`;
    ul2.appendChild(li);
  }

  const ul3 = $("driverTypeCounts"); ul3.innerHTML = "";
  for(const d of drivers){
    const sCnt = r.driverTypeCounts[d]["강점"];
    const rCnt = r.driverTypeCounts[d]["단점"];
    const li = document.createElement("li");
    li.innerHTML = `<span>${d}</span><span>강점 ${sCnt} / 단점 ${rCnt}</span>`;
    ul3.appendChild(li);
  }
}

async function loadCards(){
  const res = await fetch("cards.json", { cache: "no-store" });
  if(!res.ok) throw new Error("cards.json 로드 실패");
  const data = await res.json();

  if(!Array.isArray(data)) throw new Error("cards.json 형식 오류");
  cards = data.filter(x => x && x.card_id && x.driver && x.type && x.title);
  if(cards.length === 0) throw new Error("유효 카드가 없음");
}

function wireEvents(){
  $("btnBegin").addEventListener("click", () => {
    showScreen("screenPlay");
    renderCard();
  });

  $("btnPrev").addEventListener("click", () => {
    idx -= 1; renderCard();
  });
  $("btnNext").addEventListener("click", () => {
    idx += 1; renderCard();
  });

  $("btnYes").addEventListener("click", () => {
    const c = cards[idx];
    selected.add(c.card_id);
    saveState();
    idx += 1;
    if(idx >= cards.length) idx = cards.length - 1;
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
    resetState();
    renderCard();
  });

  let startX = null;
  document.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, {passive:true});
  document.addEventListener("touchend", (e) => {
    if(startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    startX = null;
    if(Math.abs(dx) < 40) return;
    if(dx > 0) { idx -= 1; renderCard(); }
    else { idx += 1; renderCard(); }
  }, {passive:true});
}

function registerSW(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js");
  }
}

(async function init(){
  try{
    loadState();
    await loadCards();
    wireEvents();
    registerSW();
    showScreen("screenIntro");
  } catch(err){
    alert(`초기화 오류: ${err.message}`);
  }
})();
