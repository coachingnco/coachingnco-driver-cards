/* Coaching&Co Driver Cards - PWA (single page) */

const STORAGE_KEY = "coachingnco_driver_cards_v2";

/**
 * cards.json이 있으면 그걸 우선 로드하고,
 * 없거나 실패하면 DEFAULT_CARDS로 동작하도록 해둠.
 * (너는 나중에 cards.json만 수정해도 바로 반영 가능)
 */

const DRIVERS = [
  { key: "strong",  label: "강해져야 해",  accent: "#bcd8ff" },
  { key: "perfect", label: "완벽해야 해",  accent: "#ffd1bd" },
  { key: "hurry",   label: "서둘러야 해",  accent: "#bfecc8" },
  { key: "try",     label: "열심히 해야 해", accent: "#ffe1a6" },
  { key: "please",  label: "기쁘게 해야 해", accent: "#d7c4ff" },
];

const TYPE_LABEL = {
  strength: "강점",
  overuse: "과용",
};

const DEFAULT_CARDS = [
  // 1~8 강해져야 해
  { driver: "strong", type: "strength", text: "어려운 상황에서도 감정에 크게 흔들리지 않고 버틴다." },
  { driver: "strong", type: "strength", text: "위기일수록 침착하게 문제를 정리하고 해결하려 한다." },
  { driver: "strong", type: "strength", text: "힘들어도 맡은 역할을 끝까지 책임지고 마무리한다." },
  { driver: "strong", type: "strength", text: "감정에 휘둘리기보다 현실적으로 판단하고 행동한다." },
  { driver: "strong", type: "overuse",  text: "도움을 요청하기보다 혼자 책임지고 해결하려는 편이다." },
  { driver: "strong", type: "overuse",  text: "힘들어도 티를 내지 않고 괜찮은 척하며 감정을 숨기는 편이다." },
  { driver: "strong", type: "overuse",  text: "약해 보일까 봐 고민을 나누는 것이 부담스러울 때가 있다." },
  { driver: "strong", type: "overuse",  text: "무리하다고 느껴도 멈추지 못해 결국 지치거나 탈이 나는 경우가 있다." },

  // 9~16 완벽해야 해
  { driver: "perfect", type: "strength", text: "정확하고 빈틈없이 일을 처리한다." },
  { driver: "perfect", type: "strength", text: "무슨 일이든 대충 넘어가지 않고 확실하게 하려고 한다." },
  { driver: "perfect", type: "strength", text: "세부적인 사항까지 꼼꼼하게 확인하여 일을 처리한다." },
  { driver: "perfect", type: "strength", text: "실패에 대비해 제2의 대안을 마련하는 편이다." },
  { driver: "perfect", type: "overuse",  text: "일이 완벽하게 진행되지 않으면 마음이 불편하다." },
  { driver: "perfect", type: "overuse",  text: "자신 또는 타인에게 언제나 높은 기준을 적용한다." },
  { driver: "perfect", type: "overuse",  text: "초기 계획 단계에서부터 필요 이상으로 많은 시간을 할애하는 경향이 있다." },
  { driver: "perfect", type: "overuse",  text: "스스로 완벽해야 한다고 생각해 실수를 용납하기 힘들다." },

  // 17~24 서둘러야 해
  { driver: "hurry", type: "strength", text: "약속된 시간 전에 일을 미리 끝내 놓는다." },
  { driver: "hurry", type: "strength", text: "짧은 시간 내에 많은 일을 처리하는 편이다." },
  { driver: "hurry", type: "strength", text: "무엇이든 빠르게 결정하고 빠르게 행동하는 편이다." },
  { driver: "hurry", type: "strength", text: "해야 할 일의 방향을 빨리 정하고 우선순위를 빨리 정한다." },
  { driver: "hurry", type: "overuse",  text: "시간 안에 일을 해결하지 못할까 봐 불안해할 때가 있다." },
  { driver: "hurry", type: "overuse",  text: "과제나 마감 시간이 다가올수록 마음이 조급해진다." },
  { driver: "hurry", type: "overuse",  text: "시간에 대한 중압감을 많이 느끼는 편이다." },
  { driver: "hurry", type: "overuse",  text: "일을 빨리 끝내려는 충동 때문에 실수나 수정사항이 자주 발생한다." },

  // 25~32 열심히 해야 해
  { driver: "try", type: "strength", text: "어떤 일이든 쉽게 포기하지 않고 계속 시도하는 편이다." },
  { driver: "try", type: "strength", text: "부족한 부분이 보이면 연습하고 보완하려고 한다." },
  { driver: "try", type: "strength", text: "결과가 바로 나오지 않아도 꾸준히 노력하는 편이다." },
  { driver: "try", type: "strength", text: "실패해도 다시 시도하며 방법을 찾아가려 한다." },
  { driver: "try", type: "overuse",  text: "작은 일에도 열심히 하느라 에너지가 빨리 소진될 때가 있다." },
  { driver: "try", type: "overuse",  text: "무엇이든 열심히 하고 있어야 안심이 된다." },
  { driver: "try", type: "overuse",  text: "결과보다 노력하는 자세가 더 중요하다고 생각하는 편이다." },
  { driver: "try", type: "overuse",  text: "많은 일을 시도하지만 정작 결과를 맺지 못하는 경우가 있다." },

  // 33~40 기쁘게 해야 해
  { driver: "please", type: "strength", text: "타인의 의견을 잘 들어주고 동의하며 관계를 부드럽게 만든다." },
  { driver: "please", type: "strength", text: "깊은 배려심으로 다른 사람들이 무엇을 원하는지 잘 알아차린다." },
  { driver: "please", type: "strength", text: "타인을 이해하고 공감하는 능력이 뛰어나다." },
  { driver: "please", type: "strength", text: "타인의 기분을 상하게 하는 말과 행동을 피하려고 조심한다." },
  { driver: "please", type: "overuse",  text: "내 의견이나 소신을 상대방에게 말하는 것이 힘들다." },
  { driver: "please", type: "overuse",  text: "다른 사람을 비판하거나 피드백하는 것이 조심스러워 꺼려질 때가 있다." },
  { driver: "please", type: "overuse",  text: "개인적인 일에 타인의 간섭이 있어도 그냥 내버려 두는 경우가 있다." },
  { driver: "please", type: "overuse",  text: "갈등이 생길까 봐 불편한 이야기를 피하는 편이다." },
];

let cards = [];
let idx = 0; // 현재 카드 index
let selected = new Set(); // “해당됨” 누른 카드 index 저장

function $(id){ return document.getElementById(id); }

function showScreen(id){
  const screens = ["screenIntro","screenPlay","screenDone","screenResult"];
  screens.forEach(s => $(s).classList.remove("active"));
  $(id).classList.add("active");
  // 모바일에서 “아래로 같이 보이는 느낌” 방지: 화면 전환 시 항상 맨 위로
  window.scrollTo({ top: 0, behavior: "instant" });
}

function saveState(){
  const payload = {
    idx,
    selected: Array.from(selected),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;
  try{
    const s = JSON.parse(raw);
    idx = Number.isInteger(s.idx) ? s.idx : 0;
    selected = new Set(Array.isArray(s.selected) ? s.selected : []);
  }catch{
    // ignore
  }
}

function resetAll(){
  idx = 0;
  selected = new Set();
  localStorage.removeItem(STORAGE_KEY);
  renderCard();
  showScreen("screenIntro");
}

async function loadCards(){
  try{
    const res = await fetch("cards.json", { cache: "no-store" });
    if(!res.ok) throw new Error("no cards.json");
    const data = await res.json();
    // 기대 형식: [{ driver:"strong", type:"strength", text:"..." }, ...]
    if(!Array.isArray(data) || data.length < 40) throw new Error("invalid cards.json");
    cards = data;
  }catch{
    cards = DEFAULT_CARDS;
  }
}

function driverMeta(key){
  return DRIVERS.find(d => d.key === key) || DRIVERS[0];
}

function clampIndex(){
  if(idx < 0) idx = 0;
  if(idx > cards.length - 1) idx = cards.length - 1;
}

function setAccentOnCard(driverKey){
  const meta = driverMeta(driverKey);
  const el = $("card");
  el.dataset.driver = meta.key;
  el.style.setProperty("--accent", meta.accent);
}

function renderCard(){
  clampIndex();
  const c = cards[idx];
  const meta = driverMeta(c.driver);

  $("progress").textContent = `${idx + 1}/${cards.length}`;
  $("chipDriver").textContent = meta.label;
  $("chipType").textContent = TYPE_LABEL[c.type] || "강점";
  $("qtext").textContent = c.text;

  setAccentOnCard(c.driver);

  // 버튼 상태
  $("btnPrev").disabled = (idx === 0);
  $("btnPrev").style.opacity = (idx === 0) ? 0.45 : 1;

  // 마지막 카드에서는 Next/Yes 누르면 Done 화면으로 이동하도록 처리
}

function gotoDone(){
  saveState();
  showScreen("screenDone");
}

function nextCard(){
  if(idx >= cards.length - 1){
    gotoDone();
    return;
  }
  idx += 1;
  saveState();
  renderCard();
}

function prevCard(){
  idx -= 1;
  if(idx < 0) idx = 0;
  saveState();
  renderCard();
}

function markSelected(){
  selected.add(idx);
  saveState();
  nextCard();
}

function computeResults(){
  // 결과: driver별 strength/overuse 각각 0~4
  const result = {};
  DRIVERS.forEach(d => {
    result[d.key] = { strength: 0, overuse: 0 };
  });

  selected.forEach(i => {
    const c = cards[i];
    if(!c) return;
    if(!result[c.driver]) result[c.driver] = { strength: 0, overuse: 0 };
    if(c.type === "strength") result[c.driver].strength += 1;
    if(c.type === "overuse") result[c.driver].overuse += 1;
  });

  return result;
}

function renderResults(){
  const r = computeResults();
  const wrap = $("resultWrap");
  wrap.innerHTML = "";

  DRIVERS.forEach(d => {
    const s = r[d.key]?.strength ?? 0;
    const o = r[d.key]?.overuse ?? 0;

    const block = document.createElement("div");
    block.className = "block";

    const h2 = document.createElement("div");
    h2.className = "h2";
    h2.textContent = d.label;

    const row1 = document.createElement("div");
    row1.className = "row";
    row1.innerHTML = `<div class="label">강점</div><div class="score">${s}/4</div>`;

    const bar1 = document.createElement("div");
    bar1.className = "bar";
    const fill1 = document.createElement("div");
    fill1.className = "fill";
    fill1.style.setProperty("--accent", d.accent);
    fill1.style.background = d.accent;
    fill1.style.width = `${(s/4)*100}%`;
    bar1.appendChild(fill1);

    const row2 = document.createElement("div");
    row2.className = "row";
    row2.innerHTML = `<div class="label">과용</div><div class="score">${o}/4</div>`;

    const bar2 = document.createElement("div");
    bar2.className = "bar";
    const fill2 = document.createElement("div");
    fill2.className = "fill";
    fill2.style.background = d.accent;
    fill2.style.width = `${(o/4)*100}%`;
    bar2.appendChild(fill2);

    block.appendChild(h2);
    block.appendChild(row1);
    block.appendChild(bar1);
    block.appendChild(row2);
    block.appendChild(bar2);

    wrap.appendChild(block);
  });
}

function wireEvents(){
  $("btnBegin").addEventListener("click", () => {
    // 시작 -> 카드 화면으로 “전환”
    showScreen("screenPlay");
    renderCard();
  });

  $("btnPrev").addEventListener("click", () => prevCard());
  $("btnNext").addEventListener("click", () => nextCard());
  $("btnYes").addEventListener("click", () => markSelected());

  $("btnReset").addEventListener("click", () => resetAll());
  $("btnReset2").addEventListener("click", () => resetAll());

  $("btnGoResult").addEventListener("click", () => {
    renderResults();
    showScreen("screenResult");
  });

  $("btnBack").addEventListener("click", () => {
    // 결과 -> 다시 카드로
    showScreen("screenPlay");
    renderCard();
  });

  // 스와이프(선택사항): 좌/우로 넘기기
  let startX = null;
  document.addEventListener("touchstart", (e) => {
    if(!$("screenPlay").classList.contains("active")) return;
    startX = e.touches[0].clientX;
  }, { passive:true });

  document.addEventListener("touchend", (e) => {
    if(!$("screenPlay").classList.contains("active")) return;
    if(startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    startX = null;
    if(Math.abs(dx) < 50) return;
    if(dx > 0) prevCard();
    else nextCard();
  }, { passive:true });
}

function registerSW(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

(async function init(){
  await loadCards();
  loadState();
  wireEvents();
  registerSW();

  // 첫 화면은 무조건 Intro
  showScreen("screenIntro");

  // idx가 이미 마지막을 넘어간 상태로 저장됐을 수 있으니 보정
  if(idx < 0) idx = 0;
  if(idx > cards.length - 1) idx = cards.length - 1;
})();
