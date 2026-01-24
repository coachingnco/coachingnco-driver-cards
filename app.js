(() => {
  const STORAGE_KEY = "ta_driver_pwa_v3"; // 버전 올려서 상태/캐시 꼬임 줄이기

  const drivers = ["강해져야 해","완벽해야 해","서둘러야 해","열심히 해야 해","기쁘게 해야 해"];

  let cards = [];
  let idx = 0;
  let selected = new Set();

  function $(id){ return document.getElementById(id); }

  function showScreen(name){
    ["screenIntro","screenPlay","screenResult"].forEach(s => {
      const el = $(s);
      if(!el) return;
      el.classList.toggle("hidden", s !== name);
    });
  }

  function driverClass(name){
    return ({
      "강해져야 해":"d-strong",
      "완벽해야 해":"d-perfect",
      "서둘러야 해":"d-hurry",
      "열심히 해야 해":"d-try",
      "기쁘게 해야 해":"d-please",
    })[name] || "d-strong";
  }

  function barColor(name){
    return ({
      "강해져야 해":"var(--b-strong)",
      "완벽해야 해":"var(--b-perfect)",
      "서둘러야 해":"var(--b-hurry)",
      "열심히 해야 해":"var(--b-try)",
      "기쁘게 해야 해":"var(--b-please)",
    })[name] || "var(--b-strong)";
  }

  function saveState(){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        idx,
        selected: Array.from(selected),
      }));
    }catch(e){}
  }

  function loadState(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return;
      const s = JSON.parse(raw);
      idx = Number.isInteger(s.idx) ? s.idx : 0;
      selected = new Set(Array.isArray(s.selected) ? s.selected : []);
    }catch(e){}
  }

  async function loadCards(){
    // service worker/브라우저 캐시 회피용: 쿼리 + no-store
    const res = await fetch(`cards.json?v=${Date.now()}`, { cache: "no-store" });
    if(!res.ok) throw new Error("cards.json을 불러오지 못했습니다.");
    const data = await res.json();

    if(!Array.isArray(data)) throw new Error("cards.json 형식이 배열이 아닙니다.");
    // 필수 필드 점검
    for(const c of data){
      if(!c.card_id || !c.driver || !c.type || !c.text){
        throw new Error("cards.json에 card_id/driver/type/text 누락된 항목이 있습니다.");
      }
    }

    cards = data;

    // 40장인지 점검(원하면 경고만)
    if(cards.length !== 40){
      console.warn("cards length =", cards.length, " (40이 아닙니다)");
    }

    if(idx < 0) idx = 0;
    if(idx >= cards.length) idx = cards.length - 1;
  }

  function renderCard(){
    if(!cards.length) return;

    const c = cards[idx];

    // 상단 진행
    const prog = $("progressText");
    if(prog) prog.textContent = `${idx+1}/${cards.length}`;

    // 카드 배경색
    const qCard = $("questionCard");
    if(qCard){
      qCard.classList.remove("d-strong","d-perfect","d-hurry","d-try","d-please");
      qCard.classList.add(driverClass(c.driver));
    }

    // 메타
    const pDriver = $("pillDriver");
    const pType = $("pillType");
    if(pDriver) pDriver.textContent = c.driver;
    if(pType) pType.textContent = c.type === "스트레스" ? "과용" : c.type; // 표기만 과용으로

    // 본문: 굵은 "나는" 제목 제거하고, 문장만 표시
    const qText = $("qText");
    if(qText) qText.textContent = c.text;

    // 버튼 상태
    const btnPrev = $("btnPrev");
    const btnNext = $("btnNext");
    if(btnPrev) btnPrev.disabled = (idx === 0);
    if(btnNext) btnNext.disabled = (idx === cards.length - 1);

    // 결과보기: 마지막 카드에서만 보이기
    const btnResult = $("btnResult");
    if(btnResult){
      btnResult.style.display = (idx === cards.length - 1) ? "block" : "none";
    }

    saveState();
  }

  function goNext(){
    if(idx < cards.length - 1){
      idx += 1;
      renderCard();
    }
  }

  function goPrev(){
    if(idx > 0){
      idx -= 1;
      renderCard();
    }
  }

  function pickYes(){
    const c = cards[idx];
    selected.add(c.card_id);
    saveState();

    // 마지막 카드면 자동으로 결과 화면으로 넘어가게(원치 않으면 주석 처리)
    if(idx === cards.length - 1){
      showResult();
      return;
    }
    goNext();
  }

  function resetAll(){
    idx = 0;
    selected = new Set();
    try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
    showScreen("screenIntro");
  }

  function showResult(){
    showScreen("screenResult");
    renderResults();
  }

  function renderResults(){
    const picked = cards.filter(c => selected.has(c.card_id));

    const perDriver = drivers.map(d => {
      const strength = picked.filter(c => c.driver === d && c.type === "강점").length;
      const stress   = picked.filter(c => c.driver === d && c.type === "스트레스").length;
      return { driver:d, strength, stress };
    });

    const chart = $("chart");
    if(!chart) return;

    chart.innerHTML = perDriver.map(row => {
      const sPct = Math.round((row.strength/4) * 100);
      const tPct = Math.round((row.stress/4) * 100);
      const color = barColor(row.driver);

      return `
        <div class="barRow">
          <div class="barTitle">${row.driver}</div>

          <div class="barLine">
            <div class="barLabel">강점 ${row.strength}/4</div>
            <div class="barTrack">
              <div class="barFill" style="width:${sPct}%; background:${color};"></div>
            </div>
          </div>

          <div class="barLine">
            <div class="barLabel">과용 ${row.stress}/4</div>
            <div class="barTrack">
              <div class="barFill" style="width:${tPct}%; background:${color}; filter:saturate(1.15) brightness(0.92);"></div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  function wireEvents(){
    const btnBegin = $("btnBegin");
    const btnReset = $("btnReset");
    const btnPrev  = $("btnPrev");
    const btnNext  = $("btnNext");
    const btnYes   = $("btnYes");
    const btnResult= $("btnResult");
    const btnBack  = $("btnBack");

    if(btnBegin){
      btnBegin.addEventListener("click", () => {
        showScreen("screenPlay");
        renderCard();
      });
    }

    if(btnReset) btnReset.addEventListener("click", resetAll);
    if(btnPrev)  btnPrev.addEventListener("click", goPrev);
    if(btnNext)  btnNext.addEventListener("click", goNext);
    if(btnYes)   btnYes.addEventListener("click", pickYes);

    if(btnResult){
      btnResult.addEventListener("click", showResult);
    }
    if(btnBack){
      btnBack.addEventListener("click", () => {
        showScreen("screenPlay");
        renderCard();
      });
    }

    // 스와이프(모바일): 좌=다음, 우=이전
    let startX = null;
    document.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive:true });

    document.addEventListener("touchend", (e) => {
      if(startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      startX = null;

      if(Math.abs(dx) < 40) return;

      // intro/result 화면에서는 스와이프 무시
      const playVisible = !$("screenPlay").classList.contains("hidden");
      if(!playVisible) return;

      if(dx < 0) goNext();
      else goPrev();
    }, { passive:true });
  }

  function registerSW(){
    if(!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  async function init(){
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
  }

  init();
})();
