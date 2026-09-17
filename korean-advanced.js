(() => {
  if (!/\/korean\.html$/.test(location.pathname) && location.pathname !== '/korean.html') return;
  if (document.getElementById('advanced-poetry')) return;

  const i18n = {
    title: '5단계 · 심화 문제',
    intro: '작품의 대비·상징·공간·질문형 표현을 연결해 해석하는 문제입니다.',
    progress: '심화',
    next: '다음 문제',
    restart: '심화 다시 풀기',
    correct: '맞았습니다.',
    wrong: '다시 생각해 보세요.'
  };

  const questions = [
    {
      q: '이 시의 ‘길’에 대한 설명으로 가장 적절한 것은?',
      c: [
        '화자가 고향으로 돌아가기 위해 반드시 지나야 하는 실제 경로이다.',
        '화자가 선택할 수 있는 여러 미래의 가능성을 긍정적으로 상징한다.',
        '현실적으로는 길이 많지만 화자에게 의미 있는 삶의 방향은 존재하지 않는 상황을 드러낸다.',
        '화자가 자연 속에서 새로운 삶의 목표를 발견하는 계기가 된다.',
        '고향과 객지를 연결하는 교통수단만을 의미한다.'
      ],
      a: 2,
      e: '“갈래갈래 갈린 길”과 “내게 바이 갈 길은 하나 없소”가 핵심입니다. 실제 길은 많지만 화자가 갈 수 있는 곳, 즉 자신이 속할 곳과 삶의 방향이 없다는 역설적 상황이 드러납니다.'
    },
    {
      q: '화자가 ‘기러기’를 바라보는 이유를 가장 적절하게 설명한 것은?',
      c: [
        '기러기처럼 고향을 완전히 떠나고 싶기 때문이다.',
        '기러기가 자신과 달리 갈 길을 알고 있는 존재처럼 보이기 때문이다.',
        '기러기가 화자에게 고향으로 돌아오라는 신호를 보내기 때문이다.',
        '기러기를 통해 자연의 아름다움을 찬양하기 위해서이다.',
        '기러기의 자유로운 비행을 비판하기 위해서이다.'
      ],
      a: 1,
      e: '기러기는 방향을 알고 이동하는 존재처럼 보이지만 화자는 길 한복판에 있으면서도 갈 곳이 없습니다. 두 존재의 대비가 화자의 방황을 강조합니다.'
    },
    {
      q: '“열십자 복판에 내가 섰소.”의 의미로 가장 적절한 것은?',
      c: [
        '화자가 여러 선택지 가운데 자유롭게 자신의 미래를 결정할 수 있음을 나타낸다.',
        '화자가 교통의 중심지에 있어 이동하기 편리함을 나타낸다.',
        '화자가 다양한 가능성 앞에 있지만 어느 것도 자신의 길로 선택하지 못하는 상태를 나타낸다.',
        '화자가 고향으로 돌아가기 위한 정확한 길을 발견했음을 나타낸다.',
        '화자가 타인의 도움을 기다리고 있음을 나타낸다.'
      ],
      a: 2,
      e: '‘열십자’는 여러 방향으로 길이 갈라지는 곳입니다. 선택지가 많음에도 어느 것도 자신의 길이 되지 못한다는 역설이 화자의 막막함을 심화합니다.'
    },
    {
      q: '〈보기〉 시에서 공간은 화자의 심리 상태를 구체화하는 장치로 사용되기도 한다. 이때 외부 공간의 모습과 화자의 내면이 반드시 동일한 성격을 가지는 것은 아니다. 이를 바탕으로 감상한 내용으로 적절하지 않은 것은?',
      c: [
        '여러 갈래로 나뉜 길은 화자가 처한 현실적 상황을 보여 준다.',
        '외부에는 많은 길이 존재하지만 화자의 내면에서는 선택 가능한 길이 사라져 있다.',
        '공간의 풍부한 선택 가능성과 화자의 무력감이 대비된다.',
        '길의 분기는 화자가 새로운 삶을 적극적으로 개척하려는 의지를 강조한다.',
        '외부 공간과 화자의 내면 사이의 불일치가 화자의 고독을 심화한다.'
      ],
      a: 3,
      e: '화자는 새로운 길을 적극적으로 개척하려는 의지를 보이지 않습니다. 오히려 갈 곳도 자신을 부르는 곳도 없는 무력감과 소외감이 중심입니다.'
    },
    {
      q: '이 작품에서 반복되는 질문형 표현이 갖는 효과로 가장 적절한 것은?',
      c: [
        '독자에게 실제 지리 정보를 묻고 있다.',
        '화자가 자신의 상황에 대한 명확한 해답을 이미 알고 있음을 나타낸다.',
        '답을 얻지 못하는 질문을 반복함으로써 화자의 막막함과 방황을 강조한다.',
        '작품의 분위기를 밝고 경쾌하게 전환한다.',
        '타인과 적극적으로 소통하려는 화자의 의지만을 보여 준다.'
      ],
      a: 2,
      e: '“어디로 갈까”, “공중엔 길 있어서 잘 가는가?” 같은 질문에는 실질적인 답이 제시되지 않습니다. 이러한 무응답의 질문이 화자의 막막함을 강화합니다.'
    }
  ];

  const style = document.createElement('style');
  style.textContent = `
    #advanced-poetry{max-width:920px;margin:18px auto 0;background:var(--card,#fff);border:1px solid var(--line,#e5e7eb);border-radius:20px;padding:22px;box-shadow:0 8px 24px rgba(17,24,39,.04)}
    #advanced-poetry h2{font-size:20px;margin:0 0 8px}.advanced-intro{color:var(--muted,#6b7280);font-size:14px;line-height:1.6;margin-bottom:16px}
    .advanced-progress{font-size:12px;color:var(--blue,#2563eb);font-weight:800;margin-bottom:10px}.advanced-q{font-size:18px;font-weight:800;line-height:1.55;margin-bottom:12px}
    .advanced-choices{display:grid;gap:9px}.advanced-choice{width:100%;text-align:left;border:1px solid #d1d5db;background:#fff;border-radius:13px;padding:12px 13px;cursor:pointer;line-height:1.5;font:inherit}
    .advanced-choice:hover{border-color:#93c5fd;background:#f8fbff}.advanced-choice.correct{border-color:#86efac;background:#f0fdf4;color:#166534}.advanced-choice.wrong{border-color:#fecaca;background:#fef2f2;color:#991b1b}
    .advanced-feedback{display:none;margin-top:13px;padding:12px 13px;border-radius:13px;line-height:1.6}.advanced-feedback.show{display:block}.advanced-feedback.good{background:#f0fdf4;border:1px solid #bbf7d0;color:#166534}.advanced-feedback.bad{background:#fef2f2;border:1px solid #fecaca;color:#991b1b}
    .advanced-actions{margin-top:13px}.advanced-btn{border:0;border-radius:12px;padding:11px 14px;font-weight:800;cursor:pointer;background:var(--blue,#2563eb);color:#fff;font:inherit}
    @media(max-width:760px){#advanced-poetry{margin:18px 12px 0;padding:16px}}
  `;
  document.head.appendChild(style);

  const host = document.createElement('section');
  host.id = 'advanced-poetry';
  host.innerHTML = `
    <h2>${i18n.title}</h2>
    <div class="advanced-intro">${i18n.intro}</div>
    <div class="advanced-progress" id="advancedProgress"></div>
    <div class="advanced-q" id="advancedQuestion"></div>
    <div class="advanced-choices" id="advancedChoices"></div>
    <div class="advanced-feedback" id="advancedFeedback"></div>
    <div class="advanced-actions" id="advancedActions"></div>
  `;

  const layout = document.querySelector('.layout');
  (layout?.parentNode || document.querySelector('main') || document.body).insertBefore(host, layout?.nextSibling || null);

  const key = 'study-korean-gil-advanced';
  let state = load();
  function load(){
    try { return JSON.parse(localStorage.getItem(key) || 'null') || { index: 0, completed: false }; }
    catch { return { index: 0, completed: false }; }
  }
  function save(){ localStorage.setItem(key, JSON.stringify(state)); }
  const $ = id => document.getElementById(id);

  function render(){
    const index = Math.min(state.index, questions.length - 1);
    const q = questions[index];
    $('advancedProgress').textContent = `${i18n.progress} ${index + 1} / ${questions.length}${state.completed ? ' · 완료' : ''}`;
    $('advancedQuestion').textContent = `${index + 1}. ${q.q}`;
    $('advancedChoices').innerHTML = q.c.map((choice, i) => `<button class="advanced-choice" type="button" data-i="${i}">${i + 1}. ${choice}</button>`).join('');
    $('advancedFeedback').className = 'advanced-feedback';
    $('advancedFeedback').textContent = '';
    $('advancedActions').innerHTML = '';
    document.querySelectorAll('.advanced-choice').forEach(button => button.addEventListener('click', () => answer(Number(button.dataset.i))));
  }

  function answer(selected){
    const q = questions[state.index];
    document.querySelectorAll('.advanced-choice').forEach((button, i) => {
      button.disabled = true;
      if (i === q.a) button.classList.add('correct');
      else if (i === selected) button.classList.add('wrong');
    });
    const ok = selected === q.a;
    const feedback = $('advancedFeedback');
    feedback.className = `advanced-feedback show ${ok ? 'good' : 'bad'}`;
    feedback.textContent = `${ok ? i18n.correct : i18n.wrong} ${q.e}`;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'advanced-btn';
    button.textContent = state.index < questions.length - 1 ? i18n.next : i18n.restart;
    button.addEventListener('click', advance);
    $('advancedActions').appendChild(button);
  }

  function advance(){
    if (state.index < questions.length - 1) {
      state.index += 1;
    } else {
      state = { index: 0, completed: true };
    }
    save();
    render();
    host.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render();
})();
