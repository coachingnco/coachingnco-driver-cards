const STORAGE_KEY = "coachingnco_driver_cards_v3";

const DRIVERS = [
  { key: "strong",  label: "강해져야 해",  accent: "#79b6ff" },
  { key: "perfect", label: "완벽해야 해",  accent: "#ff8f6d" },
  { key: "hurry",   label: "서둘러야 해",  accent: "#57c07a" },
  { key: "try",     label: "열심히 해야 해", accent: "#f5b52a" },
  { key: "please",  label: "기쁘게 해야 해", accent: "#9a7bff" },
];

const TYPE_LABEL = { strength: "강점", overuse: "과용" };

const CARDS = [
  // 강해져야 해 1~8
  { driver: "strong", type: "strength", text: "어려운 상황에서도 감정에 크게 흔들리지 않고 버틴다." },
  { driver: "strong", type: "strength", text: "위기일수록 침착하게 문제를 정리하고 해결하려 한다." },
  { driver: "strong", type: "strength", text: "힘들어도 맡은 역할을 끝까지 책임지고 마무리한다." },
  { driver: "strong", type: "strength", text: "감정에 휘둘리기보다 현실적으로 판단하고 행동한다." },
  { driver: "strong", type: "overuse",  text: "도움을 요청하기보다 혼자 책임지고 해결하려는 편이다." },
  { driver: "strong", type: "overuse",  text: "힘들어도 티를 내지 않고 괜찮은 척하며 감정을 숨기는 편이다." },
  { driver: "strong", type: "overuse",  text: "약해 보일까 봐 고민을 나누는 것이 부담스러울 때가 있다." },
  { driver: "strong", type: "overuse",  text: "무리하다고 느껴도 멈추지 못해 결국 지치거나 탈이 나는 경우가 있다." },

  // 완벽해야 해 9~16
  { driver: "perfect", type: "strength", text: "정확하고 빈틈없이 일을 처리한다." },
  { driver: "perfect", type: "strength", text: "무슨 일이든 대충 넘어가지 않고 확실하게 하려고 한다." },
  { driver: "perfect", type: "strength", text: "세부적인 사항까지 꼼꼼하게 확인하여 일을 처리한다." },
  { driver: "perfect", type: "strength", text: "실패에 대비해 제2의 대안을 마련하는 편이다." },
  { driver: "perfect", type: "overuse",  text: "일이 완벽하게 진행되지 않으면 마음이 불편하다." },
  { driver: "perfect", type: "overuse",  text: "자신 또는 타인에게 언제나 높은 기준을 적용한다." },
  { driver: "perfect", type: "overuse",  text: "초기 계획 단계에서부터 필요 이상으로 많은 시간을 할애하는 경향이 있다." },
  { driver: "perfect", type: "overuse",  text: "스스로 완벽해야 한다고 생각해 실수를 용납하기 힘들다." },

  // 서둘러야 해 17~24
  { driver: "hurry", type: "strength", text: "약속된 시간 전에 일을 미리 끝내 놓는다." },
  { driver: "hurry", type: "strength", text: "짧은 시간 내에 많은 일을 처리하는 편이다." },
  { driver: "hurry", type: "strength", text: "무엇이든 빠르게 결정하고 빠르게 행동하는 편이다." },
  { driver: "hurry", type: "strength", text: "해야 할 일의 방향을 빨리 정하고 우선순위를 빨리 정한다." },
  { driver: "hurry", type: "overuse",  text: "시간 안에 일을 해결하지 못할까 봐 불안해할 때가 있다." },
  { driver: "hurry", type: "overuse",  text: "과제나 마감 시간이 다가올수록 마음이 조급해진다." },
  { driver: "hurry", type: "overuse",  text: "시간에 대한 중압감을 많이 느끼는 편이다." },
  { driver: "hurry", type: "overuse",  text: "일을 빨리 끝내려는 충동 때문에 실수나 수정사항이 자주 발생한다." },

  // 열심히 해야 해 25~32
  { driver: "try", type: "strength", text: "어떤 일이든 쉽게 포기하지 않고 계속 시도하는 편이다." },
  { driver: "try", type: "strength", text: "부족한 부분이 보이면 연습하고 보완하려고 한다." },
  { driver: "try", type: "strength", text: "결과가 바로 나오지 않아도 꾸준히 노력하는 편이다." },
  { driver: "try", type: "strength", text: "실패해도 다시 시도하며 방법을 찾아가려 한다." },
  { driver: "try", type: "overuse",  text: "작은 일에도 열심히 하느라 에너지가 빨리 소진될 때가 있다." },
  { driver: "try", type: "overuse",  text: "무엇이든 열심히 하고 있어야 안심이 된다." },
  { driver: "try", type: "overuse",  text: "결과보다 노력하는 자세가 더 중요하다고 생각하는 편이다." },
  { driver: "try", type: "overuse",  text: "많은 일을 시도하지만 정작 결과를 맺지 못하는 경우가 있다." },

  // 기쁘게 해야 해 33~40
  { driver: "please", type: "strength", text: "타인의 의견을 잘 들어주고 동의하며 관계를 부드럽게 만든다." },
  { driver: "please", type: "strength", text: "깊은 배려심으로 다른 사람들이 무엇을 원하는지 잘 알아차린다." },
  { driver: "please", type: "strength", text: "타인을 이해하고 공감하는 능력이 뛰어나다." },
  { driver: "please", type: "strength", text: "타인의 기분을 상하게 하는 말과 행동을 피하려고 조심한다." },
  { driver: "please", type: "overuse",  text: "내 의견이나 소신을 상대방에게 말하는 것이 힘들다." },
  { driver: "please", type: "overuse",  text: "다른 사람을 비판하거나 피드백하는 것이 조심스러워 꺼려질 때가 있다." },
  { driver: "please", type: "overuse",  text: "개인적인 일에 타인의 간섭이 있어도 그냥 내버려 두는 경우가 있다." },
  { driver: "please", type: "overuse",  text: "갈등이 생길까 봐 불편한 이야기를 피하는 편이다." },
];

let idx = 0;
let selected = new Set();

function $(id){ return document.getElementById(id); }

function showScreen(id){
  ["screenIntro","screenPlay","screenDone","screenResult"].forEach(s => $(s).classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
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
  showScreen("screenIntro");
}

function driverMeta(key){
  return DRIVERS.find(d => d.key === key) || DRIVERS[0];
}

function renderCard(){
  if(idx < 0) idx = 0;
  if(idx > CARDS.length - 1) idx = CARDS.length - 1;

  const c = CARDS[idx];
  const meta = driverMeta(c.driver);

  $("progress").textContent = `${idx + 1}/${CARDS.length}`;
  $("chipDriver").textContent = meta.label;
  $("chipType").textContent = TYPE_LABEL[c.type] || "강점";
  $("qtext").textContent = c.text;

  const cardEl = $("card");
  cardEl.dataset.driver = meta.key;
  cardEl.style.setProperty("--accent", meta.accent);

  $("btnPrev").disabled = (idx === 0);
  $("btnPrev").style.opacity = (idx === 0) ? 0.45 : 1;
}

function gotoDone(){
  saveState();
  showScreen("screenDone");
}

function nextCard(){
  if(idx >= CARDS.length - 1){ gotoDone(); return; }
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
  const result = {};
  DRIVERS.forEach(d => result[d.key] = { strength:0, overuse:0, total:0 });

  selected.forEach(i => {
    const c = CARDS[i];
    if(!c) return;
    result[c.driver].total += 1;
    if(c.type === "strength") result[c.driver].strength += 1;
    if(c.type === "overuse")  result[c.driver].overuse  += 1;
  });
  return result;
}

function interpretLine(strength, overuse){
  // 강점 0~4 / 과용 0~4
  if(strength <= 1 && overuse <= 1) return "선택이 적어, 현재는 이 드라이브가 강하게 드러나지 않는 편입니다.";
  if(strength >= 3 && overuse <= 1) return "강점으로 잘 쓰이고 있는 상태입니다. 상황에 따라 유지하면 좋습니다.";
  if(strength >= 2 && overuse >= 2) return "강점은 있으나 과용 신호도 함께 보입니다. 장점이 부담으로 바뀌는 순간을 점검해보면 좋습니다.";
  if(strength <= 1 && overuse >= 3) return "과용 신호가 두드러집니다. 스트레스 상황에서 이 드라이브가 더 강해질 수 있습니다.";
  if(overuse >= 2) return "과용 쪽 선택이 있어, 부담 신호를 함께 체크해보면 좋습니다.";
  return "강점/과용이 함께 보입니다. 상황에 따라 조절 포인트를 찾으면 좋습니다.";
}

function renderResults(){
  const r = computeResults();

  $("guideBox").textContent =
    "해석 방법: 선택이 많을수록 해당 드라이브가 잘 드러납니다. 강점 선택이 많으면 도움이 되는 방향으로 쓰는 중이고, 과용 선택이 많으면 스트레스 상황에서 부담으로 바뀔 가능성이 있습니다. 막대는 4점 만점입니다.";

  const wrap = $("resultWrap");
  wrap.innerHTML = "";

  DRIVERS.forEach(d => {
    const s = r[d.key].strength;
    const o = r[d.key].overuse;
    const t = r[d.key].total;

    const block = document.createElement("div");
    block.className = "block";
    block.style.setProperty("--accent", d.accent);

    block.innerHTML = `
      <div class="h2">${d.label}</div>

      <div class="row labels">
        <div>선택 개수</div>
        <div>${t}/8</div>
      </div>

      <div class="row labels" style="margin-top:10px;">
        <div>강점</div>
        <div>${s}/4</div>
      </div>
      <div class="bar"><div class="fill" style="width:${(s/4)*100}%; background:${d.accent};"></div></div>

      <div class="row labels">
        <div>과용</div>
        <div>${o}/4</div>
      </div>
      <div class="bar"><div class="fill" style="width:${(o/4)*100}%; background:${d.accent};"></div></div>

      <div class="metaLine">${interpretLine(s, o)}</div>
    `;

    wrap.appendChild(block);
  });
}

function wireEvents(){
  const btn = $("btnBegin");
  const go = () => { showScreen("screenPlay"); renderCard(); };

  btn.addEventListener("click", go);
  btn.addEventListener("touchend", (e) => { e.preventDefault(); go(); }, { passive:false });

  $("btnPrev").addEventListener("click", prevCard);
  $("btnNext").addEventListener("click", nextCard);
  $("btnYes").addEventListener("click", markSelected);

  $("btnReset").addEventListener("click", resetAll);
  $("btnReset2").addEventListener("click", resetAll);

  $("btnGoResult").addEventListener("click", () => {
    renderResults();
    showScreen("screenResult");
  });

  $("btnBack").addEventListener("click", () => {
    showScreen("screenPlay");
    renderCard();
  });
}

(function init(){
  loadState();
  wireEvents();
  showScreen("screenIntro");
})();
