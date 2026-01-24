/* ====== 데이터: 40문항 ======
   - driver: 'strong' | 'perfect' | 'hurry' | 'try' | 'please'
   - type: 'strength' | 'overuse'
   - text: 문장
*/
const CARDS = [
  // 아래는 예시 틀. 너의 확정 40개 문항으로 교체해줘.
  // (이미 app.js에 40개가 들어있으면 그걸 그대로 복붙하면 됨)

  // 1~8 강해져야 해
  { driver:'strong', type:'strength', text:'어려운 상황에서도 감정에 크게 흔들리지 않고 버틴다.' },
  { driver:'strong', type:'strength', text:'위기일수록 침착하게 문제를 정리하고 해결하려 한다.' },
  { driver:'strong', type:'strength', text:'힘들어도 맡은 역할을 끝까지 책임지고 마무리한다.' },
  { driver:'strong', type:'strength', text:'감정에 휘둘리기보다 현실적으로 판단하고 행동한다.' },
  { driver:'strong', type:'overuse',  text:'도움을 요청하기보다 혼자 책임지고 해결하려는 편이다.' },
  { driver:'strong', type:'overuse',  text:'힘들어도 티를 내지 않고 괜찮은 척하며 감정을 숨기는 편이다.' },
  { driver:'strong', type:'overuse',  text:'약해 보일까 봐 고민을 나누는 것이 부담스러울 때가 있다.' },
  { driver:'strong', type:'overuse',  text:'무리하다고 느껴도 멈추지 못해 결국 지치거나 탈이 나는 경우가 있다.' },

  // 9~16 완벽해야 해 (예시. 너가 확정한 문장으로 교체)
  { driver:'perfect', type:'strength', text:'정확하고 빈틈없이 일을 처리한다.' },
  { driver:'perfect', type:'strength', text:'무슨 일이든 대충 넘어가지 않고 확실하게 하려고 한다.' },
  { driver:'perfect', type:'strength', text:'세부적인 사항까지 꼼꼼하게 확인하여 일을 처리한다.' },
  { driver:'perfect', type:'strength', text:'실패에 대비해 제2의 대안을 마련하는 편이다.' },
  { driver:'perfect', type:'overuse',  text:'일이 생각한 대로 완벽하게 진행되지 않으면 마음이 불편하다.' },
  { driver:'perfect', type:'overuse',  text:'자신 또는 타인에게 언제나 높은 기준을 적용한다.' },
  { driver:'perfect', type:'overuse',  text:'초기 계획 단계에서부터 필요 이상으로 많은 시간을 할애하는 경향이 있다.' },
  { driver:'perfect', type:'overuse',  text:'스스로 완벽해야 한다고 생각해 실수를 용납하기 힘들다.' },

  // 17~24 서둘러야 해 (예시. 너가 확정한 문장으로 교체)
  { driver:'hurry', type:'strength', text:'약속된 시간 전에 일을 빠르게 끝내 놓는다.' },
  { driver:'hurry', type:'strength', text:'짧은 시간 내에 많은 일을 빠르게 처리하는 편이다.' },
  { driver:'hurry', type:'strength', text:'무엇이든 빠르게 결정하고 빠르게 행동하는 편이다.' },
  { driver:'hurry', type:'strength', text:'해야 할 일의 우선순위를 빨리 정한 뒤 실행(우선순위)을 정한다.' },
  { driver:'hurry', type:'overuse',  text:'시간 안에 일을 해결하지 못할까 봐 불안해할 때가 있다.' },
  { driver:'hurry', type:'overuse',  text:'과제나 마감 시간이 다가올수록 마음이 조급해진다.' },
  { driver:'hurry', type:'overuse',  text:'시간에 대한 중압감을 많이 느끼는 편이다.' },
  { driver:'hurry', type:'overuse',  text:'일을 빨리 끝내려는 충동 때문에 실수나 수정사항이 자주 발생한다.' },

  // 25~32 열심히 해야 해 (예시. 너가 확정한 문장으로 교체)
  { driver:'try', type:'strength', text:'어떤 일이든 쉽게 포기하지 않고 계속 시도하는 편이다.' },
  { driver:'try', type:'strength', text:'부족한 부분이 보이면 연습하고 보완하려고 한다.' },
  { driver:'try', type:'strength', text:'결과가 바로 나오지 않아도 꾸준히 노력하는 편이다.' },
  { driver:'try', type:'strength', text:'실패해도 다시 시도하며 방법을 찾아가려 한다.' },
  { driver:'try', type:'overuse',  text:'쉬지 않고 무언가를 계속해야 마음이 편하다.' },
  { driver:'try', type:'overuse',  text:'작은 일에도 열심히 하느라 에너지가 빨리 소진될 때가 있다.' },
  { driver:'try', type:'overuse',  text:'결과보다 노력하는 자세가 더 중요하다고 생각하는 편이다.' },
  { driver:'try', type:'overuse',  text:'많은 일을 시도하지만 정작 결과를 맺지 못하는 경우가 있다.' },

  // 33~40 기쁘게 해야 해 (예시. 너가 확정한 문장으로 교체)
  { driver:'please', type:'strength', text:'타인의 의견을 잘 들어주고 동의하며 관계를 부드럽게 만든다.' },
  { driver:'please', type:'strength', text:'깊은 배려심으로 다른 사람들이 무엇을 원하는지 잘 알아차린다.' },
  { driver:'please', type:'strength', text:'타인을 이해하고 공감하는 능력이 뛰어나다.' },
  { driver:'please', type:'strength', text:'타인의 기분을 상하게 하는 말과 행동을 피하려고 조심한다.' },
  { driver:'please', type:'overuse',  text:'내 의견이나 소신을 상대방에게 말하는 것이 힘들다.' },
  { driver:'please', type:'overuse',  text:'다른 사람을 비판하거나 피드백하는 것이 조심스러워 꺼려질 때가 있다.' },
  { driver:'please', type:'overuse',  text:'타인이 나의 개인적인 일에 간섭이 있어도 그냥 내버려 두는 경우가 있다.' },
  { driver:'please', type:'overuse',  text:'갈등이 생길까 봐 불편한 이야기를 피하는 편이다.' },
];

const STORAGE_KEY = 'driver_card_v2';

const DRIVER_META = {
  strong:  { name:'강해져야 해',  accent:'#9ed0ff', weak:'#dff0ff', card:'#e9f5ff' },
  perfect: { name:'완벽해야 해',  accent:'#ffd27d', weak:'#fff0d0', card:'#fff6e4' },
  hurry:   { name:'서둘러야 해',  accent:'#b7f3b7', weak:'#e6ffe6', card:'#efffef' },
  try:     { name:'열심히 해야 해',accent:'#ffc0da', weak:'#ffe6f1', card:'#fff0f7' },
  please:  { name:'기쁘게 해야 해',accent:'#cbbcff', weak:'#efeaff', card:'#f4f1ff' },
};

const TYPE_NAME = {
  strength: '강점',
  overuse: '과용'
};

function $(id){ return document.getElementById(id); }

let idx = 0;
let selected = new Set(); // 선택된 카드 index

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
  }catch(e){}
}

function showScreen(name){
  const screens = ['screenIntro','screenPlay','screenComplete','screenResult'];
  screens.forEach(s => $(s).classList.remove('active'));
  $(name).classList.add('active');
  window.scrollTo(0,0);
}

function clampIdx(){
  if(idx < 0) idx = 0;
  if(idx > CARDS.length) idx = CARDS.length;
}

function setAccent(driverKey){
  const meta = DRIVER_META[driverKey] || DRIVER_META.strong;
  document.documentElement.style.setProperty('--accent', meta.accent);
  document.documentElement.style.setProperty('--accent-weak', meta.weak);
  document.documentElement.style.setProperty('--accent-card', meta.card);
}

function renderCard(){
  clampIdx();

  // 완료 상태(40장 끝)면 완료 화면으로
  if(idx >= CARDS.length){
    showScreen('screenComplete');
    return;
  }

  const c = CARDS[idx];
  setAccent(c.driver);

  $('progress').textContent = `${idx+1}/${CARDS.length}`;
  $('chipDriver').textContent = DRIVER_META[c.driver].name;
  $('chipType').textContent = TYPE_NAME[c.type] || c.type;

  $('statement').textContent = c.text;

  // 이전 버튼 비활성 느낌(0에서)
  $('btnPrev').disabled = (idx === 0);
  $('btnPrev').style.opacity = (idx === 0) ? .55 : 1;

  saveState();
}

function goPrev(){
  if(idx > 0){
    idx -= 1;
    renderCard();
  }
}

function goNext(){
  idx += 1;
  renderCard();
}

function markYes(){
  selected.add(idx);
  saveState();
  goNext();
}

function resetAll(){
  idx = 0;
  selected = new Set();
  localStorage.removeItem(STORAGE_KEY);
  showScreen('screenIntro');
}

function score(){
  // driver별 strength/overuse count
  const base = {
    strong:{strength:0, overuse:0},
    perfect:{strength:0, overuse:0},
    hurry:{strength:0, overuse:0},
    try:{strength:0, overuse:0},
    please:{strength:0, overuse:0},
  };
  selected.forEach(i=>{
    const c = CARDS[i];
    if(!c) return;
    base[c.driver][c.type] += 1;
  });
  return base;
}

function level(n){
  if(n >= 3) return 'high';
  if(n <= 1) return 'low';
  return 'mid';
}

/* 사람별 상세 해석(2줄) */
const INTERP = {
  strong:{
    A:{ s:'위기에서도 중심을 잡고 책임 있게 마무리하는 힘이 잘 작동합니다.', t:'중요한 순간에 이 강점을 쓰되, 회복 시간을 미리 일정에 넣어두면 더 오래 갑니다.' },
    B:{ s:'버티는 힘은 큰데, 혼자 감당하며 소진될 가능성이 큽니다.', t:'도움 요청을 “약함”이 아니라 “지속가능한 성과 관리”로 정하고, 한 가지라도 공유해보세요.' },
    C:{ s:'성과보다 버티기에 에너지가 쓰이면서 지치기 쉬운 상태입니다.', t:'지금은 더 버티기보다 멈춤 신호를 먼저 인식하고, 부담을 나누는 루트를 만들어야 합니다.' },
    D:{ s:'이 드라이버의 영향은 크지 않은 편입니다.', t:'필요한 순간에만 “침착하게 정리하기”를 선택해도 충분합니다.' },
    M:{ s:'상황에 따라 강하게 버티기도, 내려놓기도 하는 편입니다.', t:'버티는 신호와 멈추는 신호를 구분하는 기준 한 가지를 정해두면 흔들림이 줄어요.' },
  },
  perfect:{
    A:{ s:'정확성과 꼼꼼함이 실수 예방과 품질에 좋은 방향으로 쓰이고 있습니다.', t:'완성 기준을 “최소 기준”과 “추가 기준” 두 줄로 나누면 속도도 함께 잡힙니다.' },
    B:{ s:'품질은 높지만 기준이 과해져 시간·관계·체력이 소모될 수 있습니다.', t:'완벽 기준을 10에서 8로 낮추는 대신, 확인 지점만 1개 남겨보세요.' },
    C:{ s:'만족을 못 느끼며 계속 수정하거나 불안이 커질 가능성이 있습니다.', t:'검토 시간을 제한하고, “이 정도면 제출” 기준 문장을 미리 정해두는 게 필요합니다.' },
    D:{ s:'완벽 기준이 강하게 작동하지 않는 편입니다.', t:'중요한 과업에서만 체크리스트 3개로 품질을 보완하면 충분합니다.' },
    M:{ s:'품질을 챙기되, 상황에 따라 타협도 가능한 편입니다.', t:'중요한 건 품질, 덜 중요한 건 속도로 구분하는 기준을 만들어보세요.' },
  },
  hurry:{
    A:{ s:'속도와 추진력이 잘 작동해 실행과 결정을 빠르게 가져갑니다.', t:'빠른 실행 뒤에 10초 점검만 붙이면 실수 없이 더 강해집니다.' },
    B:{ s:'추진은 빠르지만 조급함이 실수·충돌·피로로 이어질 수 있습니다.', t:'결정 전에 “우선순위 1개만 확인”을 습관으로 넣어 속도와 정확성을 같이 잡으세요.' },
    C:{ s:'조급함은 큰데 결과가 따라오지 않아 스트레스가 커질 수 있습니다.', t:'속도를 올리기보다 작업 크기를 줄이고, 한 번에 하나만 끝내는 구조로 바꿔야 합니다.' },
    D:{ s:'속도 압박의 영향이 크지 않은 편입니다.', t:'마감이 있는 과업에서만 속도를 쓰고, 평소에는 안정적으로 가도 됩니다.' },
    M:{ s:'빠르게 움직일 때도 있고, 신중할 때도 있습니다.', t:'급할 때는 실행, 중요한 결정은 1분 멈춤 규칙을 넣어보세요.' },
  },
  try:{
    A:{ s:'꾸준함과 반복 시도가 성장과 성과로 잘 연결되고 있습니다.', t:'노력의 방향을 확인하는 점검을 주 1회만 해도 효율이 크게 올라갑니다.' },
    B:{ s:'노력은 많은데 쉬지 못하거나 에너지가 빨리 소진될 수 있습니다.', t:'노력 기준을 “시간”이 아니라 “완료 기준”으로 바꾸고, 휴식도 계획에 포함하세요.' },
    C:{ s:'애쓰는 마음이 크지만 결과가 쌓이지 않아 무력감이 생길 수 있습니다.', t:'목표를 더 작게 쪼개서 완료 경험을 먼저 쌓아야 합니다.' },
    D:{ s:'이 드라이버가 강하게 작동하지 않는 편입니다.', t:'꼭 필요한 상황에서만 꾸준함을 꺼내 쓰면 됩니다.' },
    M:{ s:'노력도 하고 쉬기도 하는 균형형에 가깝습니다.', t:'노력 신호와 휴식 신호를 구분하는 개인 규칙을 하나 정해보세요.' },
  },
  please:{
    A:{ s:'배려와 공감이 관계를 부드럽게 만들고 협업에 도움이 됩니다.', t:'상대를 살피는 만큼, 내 기준도 한 문장으로 말하는 연습을 같이 해보세요.' },
    B:{ s:'관계를 지키려다 내 의견을 누르거나 갈등을 피하면서 스트레스가 커질 수 있습니다.', t:'거절 대신 “대안 제시” 한 문장으로 경계를 세우는 방식이 효과적입니다.' },
    C:{ s:'관계 부담이 큰데 표현이 막혀 답답함이 쌓일 가능성이 있습니다.', t:'불편함을 바로 해결하려 하지 말고, 사실 1개와 요청 1개만 말해도 충분합니다.' },
    D:{ s:'이 드라이버의 영향은 크지 않은 편입니다.', t:'필요한 순간에만 공감 스킬을 꺼내 쓰면 됩니다.' },
    M:{ s:'상대를 배려하지만 필요할 땐 선도 그을 수 있는 편입니다.', t:'불편한 상황에서는 “내 의견 한 문장”을 먼저 말하고 공감으로 이어가면 안정적입니다.' },
  },
};

function pickCase(strCnt, overCnt){
  const sL = level(strCnt);
  const oL = level(overCnt);
  if(sL==='high' && oL==='low') return 'A';
  if(sL==='high' && oL==='high') return 'B';
  if(sL==='low'  && oL==='high') return 'C';
  if(sL==='low'  && oL==='low') return 'D';
  return 'M';
}

function renderResults(){
  const sc = score();
  const order = ['strong','perfect','hurry','try','please'];
  const root = $('resultList');
  root.innerHTML = '';

  order.forEach(k=>{
    const meta = DRIVER_META[k];
    // 각 카드 렌더 시 해당 드라이버 accent 적용(바 색상 맞추기)
    const accent = meta.accent;

    const sCnt = sc[k].strength;
    const oCnt = sc[k].overuse;

    const sPct = Math.round((sCnt/4)*100);
    const oPct = Math.round((oCnt/4)*100);

    const cKey = pickCase(sCnt, oCnt);
    const msg = INTERP[k][cKey];

    const el = document.createElement('div');
    el.className = 'resultCard';
    el.innerHTML = `
      <div class="rHead">
        <h3 class="rName">${meta.name}</h3>
      </div>

      <div class="barRow">
        <div class="barLabel"><span>강점</span><span>${sCnt}/4</span></div>
        <div class="track"><div class="fill" style="width:${sPct}%; background:${accent};"></div></div>
      </div>

      <div class="barRow">
        <div class="barLabel"><span>과용</span><span>${oCnt}/4</span></div>
        <div class="track"><div class="fill overuse" style="width:${oPct}%;"></div></div>
      </div>

      <div class="interp">
        <div class="k">${msg.s}</div>
        <div>${msg.t}</div>
      </div>
    `;
    root.appendChild(el);
  });
}

function wire(){
  // Intro
  $('btnStart').addEventListener('click', ()=>{
    showScreen('screenPlay');
    renderCard();
  });

  // Play
  $('btnPrev').addEventListener('click', goPrev);
  $('btnNext').addEventListener('click', goNext);
  $('btnYes').addEventListener('click', markYes);

  $('btnReset').addEventListener('click', ()=>{
    if(confirm('초기화할까요?')){
      resetAll();
    }
  });

  // Complete
  $('btnToResult').addEventListener('click', ()=>{
    showScreen('screenResult');
    renderResults();
  });

  // Result
  $('btnBackToCards').addEventListener('click', ()=>{
    // 결과에서 다시 카드로(마지막 카드 위치로 돌아감)
    showScreen('screenPlay');
    idx = Math.min(idx, CARDS.length-1);
    renderCard();
  });

  $('btnReset2').addEventListener('click', ()=>{
    if(confirm('초기화할까요?')){
      resetAll();
    }
  });

  // 모바일 스와이프(옵션)
  let startX = null;
  document.addEventListener('touchstart', (e)=>{
    if(!document.getElementById('screenPlay').classList.contains('active')) return;
    startX = e.touches[0].clientX;
  }, {passive:true});

  document.addEventListener('touchend', (e)=>{
    if(!document.getElementById('screenPlay').classList.contains('active')) return;
    if(startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    startX = null;
    if(Math.abs(dx) < 50) return;
    if(dx > 0) goPrev();
    else goNext();
  }, {passive:true});

  // SW
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
}

(function init(){
  loadState();

  // 저장 상태가 “끝까지(40장 후)”라면 완료/결과로 자연스럽게
  if(idx >= CARDS.length){
    showScreen('screenComplete');
  }else if(selected.size > 0 || idx > 0){
    // 진행 중이면 플레이 화면으로 복귀
    showScreen('screenPlay');
    renderCard();
  }else{
    showScreen('screenIntro');
  }

  wire();
})();
