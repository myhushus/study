(() => {
  'use strict';
  if (!location.pathname.endsWith('/korean.html') || document.getElementById('advanced-poetry')) return;

  // Interface copy and lesson content are separate; add locales without changing the renderer.
  const messages = { ko: {
    title: '5단계 · 실전 심화',
    intro: '5지선다 5문항입니다. 답을 고친 뒤 전체 제출할 수 있으며, 정답과 해설은 제출 후 공개됩니다.',
    notice: 'Study 자체 제작 문항 · 공식 기출이나 출제 예측이 아닙니다. 〈산유화〉는 비교 독해용으로 추가한 작품이며, EBS 연계 목록을 표시한 것이 아닙니다.',
    passage: '작품 펼쳐 보기 · (가) 길 / (나) 산유화',
    gil: '(가) 김소월 〈길〉', sanyuhwa: '(나) 김소월 〈산유화〉',
    unavailable: '위의 작품 본문을 참고하세요.',
    source: '원문 대조: 위키문헌 『진달래꽃』 / 이용 상태 확인: 한국저작권위원회 공유마당. 띄어쓰기를 일부 정리했습니다.',
    textSource: '〈산유화〉 원문', rightsSource: '공유마당 작품 정보',
    progress: '{answered}/{total}문항 응답 · 제출 전에는 정답이 표시되지 않습니다.',
    score: '{total}문항 중 {correct}문항 정답 · 문항 번호를 눌러 해설을 확인하세요.',
    navigation: '실전 문항 선택', unanswered: '미응답', answered: '응답 완료', correct: '정답', wrong: '오답',
    questionStatus: '{number}번 · {status}', question: '{number}. {stem}', option: '{number} {text}',
    view: '〈보기〉', previous: '이전 문항', next: '다음 문항', submit: '5문항 제출 · 채점', restart: '실전 다시 풀기',
    resetConfirm: '현재 실전 풀이 기록을 지우고 처음부터 다시 풀까요? 기존 1~4단계 기록은 유지됩니다.',
    missing: '{count}문항이 남았습니다. 먼저 {number}번의 답을 선택하세요.',
    correctResult: '정답입니다. 정답 {answer} · 선택 {selected}',
    wrongResult: '오답입니다. 정답 {answer} · 선택 {selected}',
    explanations: '선택지별 판단 근거', storage: '이 브라우저에서 저장할 수 없어 현재 화면에서만 풀이가 유지됩니다.',
    examLink: '실전 심화', sourceNote: '비교 작품 출처'
  }};
  const locale = 'ko';
  const t = (key, values = {}) => messages[locale][key].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
  const numerals = ['①', '②', '③', '④', '⑤'];
  const contentId = 'gil-exam-20260917-v2';
  const storageKey = 'study-korean-gil-advanced-exam-v2'; // Do not overwrite the easier set or stages 1–4.
  const comparisonPoem = `산에는 꽃 피네
꽃이 피네
갈 봄 여름없이
꽃이 피네

산에
산에
피는 꽃은
저만치 혼자서 피어 있네

산에서 우는 작은 새요
꽃이 좋아
산에서
사노라네

산에는 꽃 지네
꽃이 지네
갈 봄 여름없이
꽃이 지네`;

  // Each item has one defensible answer; reasons are aligned with the five options.
  const questions = [
    {
      id: 'gil-discourse',
      stem: '(가)의 시상 전개와 화자의 발화에 대한 설명으로 가장 적절한 것은?',
      options: [
        '‘어디로 갈까’에서 드러난 망설임은 ‘나는 못 가오’에서 이동의 포기로 바뀌고, ‘내 집도’에서는 현재의 거처를 확인하는 안도감으로 이어진다.',
        '‘산’과 ‘들’이 이동의 대안으로 제시되지만 ‘오라는 곳’의 부재가 이를 가로막으며, ‘차 가고 배 가는 곳’이라는 진술은 이동의 가능성과 정착의 어려움을 어긋나게 한다.',
        '‘또’는 이전에도 목적지를 선택했음을 전제하고, ‘열십자 복판’은 그 선택들을 되돌아보며 어느 경로가 잘못되었는지를 평가하는 지점으로 제시된다.',
        '‘내 집도’라는 진술에서 화자는 자신의 처지를 해명하고, 기러기에게 건네는 물음에서는 귀향할 수 없는 까닭을 공중과 지상의 교통 여건 차이로 좁혀 간다.',
        '‘못 가오’가 타인과 관계를 맺기 어려운 처지를 나타낸다면, ‘내게 바이 갈 길은 하나 없소’는 그 관계를 원하지 않게 된 화자의 태도 변화를 나타낸다.'
      ],
      answer: 1,
      rationale: '‘차 가고 배 가는 곳’이 있다는 사실과 자신에게 갈 곳이 없다는 말은 서로 다른 차원의 진술이다. 이동할 경로가 있다고 해서 자신을 받아 줄 삶의 자리가 생기는 것은 아니다.',
      reasons: [
        '‘내 집도’는 고향의 존재를 말하지만 현재 거기에 정착했다는 말은 아니다. 끝까지 ‘갈 길은 하나 없소’라고 하므로 안도감으로 전환되었다고 볼 근거가 없다.',
        '산과 들이라는 공간적 대안 뒤에 ‘오라는 곳이 없어’라는 관계적 조건이 제시된다. 고향으로 통하는 교통편을 언급하면서도 갈 곳이 없다는 처지는 남는다는 점을 정확히 연결했다.',
        '‘또’는 떠도는 생활의 반복을 시사한다. 이전에 목적지를 선택했고 그 선택이 잘못되었다고 평가한다는 구체적인 사건까지 전제하지는 않는다.',
        '자신에게도 집이 있다는 해명의 성격은 읽을 수 있다. 그러나 기러기와의 대비는 교통 여건을 분석하는 것이 아니라 길을 찾지 못하는 자신의 처지를 드러내는 것이다.',
        '‘못 가오’와 ‘갈 길은 하나 없소’는 모두 갈 곳을 찾지 못한 처지에 연결된다. 마지막 말을 관계를 거부하려는 자발적 의지로 바꿔 읽으면 안 된다.'
      ]
    },
    {
      id: 'gil-space-view',
      stem: '〈보기〉를 바탕으로 (가)를 감상한 내용으로 적절하지 않은 것은?',
      view: '시의 공간은 물리적 이동의 조건이면서 주체가 자신과 세계의 관계를 인식하는 장이 될 수 있다. 따라서 같은 장소에 실제 경로가 많다는 사실과 그 경로가 특정한 주체에게 삶의 방향으로 받아들여진다는 사실은 구별해야 한다. 이 관점에서 공간의 모양뿐 아니라 공간을 한정하는 말과 화자가 거기에 부여하는 의미를 함께 읽을 필요가 있다.',
      options: [
        '‘나그네 집’에서 밤을 보냈다는 것은 물리적으로 머문 사실을 나타내지만, 이후의 방황을 고려하면 그것이 지속적인 삶의 자리를 확보했다는 뜻은 아니겠군.',
        '‘차 가고 배 가는 곳’과 ‘갈 길은 하나 없소’를 함께 읽으면, 지리적으로 닿을 수 있다는 사실만으로 고향이 현재의 안식처가 되는 것은 아니겠군.',
        '‘열십자 복판’은 방향들이 교차하는 공간이지만, 거기에 선 주체의 말과 결합하면 방향의 많음이 목적지의 확보로 이어지지 않는 장면이 되겠군.',
        '‘내게’는 길의 의미를 화자의 처지로 한정하지만, 뒤의 ‘하나 없소’는 그 한정을 거두어 길의 부재를 누구에게나 적용되는 공간의 성질로 넓히겠군.',
        '‘공중엔 길 있어서 잘 가는가’는 눈에 보이는 길이 없어도 이동하는 기러기를 통해, 지상에 길이 있다는 사실을 곧바로 삶의 방향과 동일시하기 어렵게 하겠군.'
      ],
      answer: 3,
      rationale: '‘하나 없소’가 강하게 부정하는 것은 앞서 ‘내게’로 한정된 갈 길이다. 부정의 강도가 세졌다고 해서 진술의 범위가 모든 사람에게 확대되는 것은 아니다.',
      reasons: [
        '머물렀다는 사실과 정착했다는 해석을 구분했다. 다음 날에도 어디로 갈지 묻는다는 점이 근거가 된다.',
        '교통의 가능성과 삶의 안식처로서의 의미를 분리한 해석으로, 보기의 관점에 부합한다.',
        '‘복판’의 물리적 중심성이 화자에게 삶의 중심이나 확정된 목적지를 보장하지 않는다는 점을 읽어 냈다.',
        '‘내게’라는 한정은 마지막 진술에서도 유효하다. ‘바이’와 ‘하나 없소’는 부정을 강화할 뿐, 화자의 처지를 모든 존재의 객관적 조건으로 일반화하지 않는다.',
        '공중의 기러기와 지상의 화자를 함께 읽어 실제 길의 유무와 의미 있는 방향의 유무가 일치하지 않음을 설명했다.'
      ]
    },
    {
      id: 'gil-repetition',
      stem: '다음 [A]와 [B]의 관계 및 표현 효과에 대한 설명으로 가장 적절한 것은?',
      view: '[A]\n여보소, 공중에\n저 기러기\n공중엔 길 있어서 잘 가는가?\n\n[B]\n여보소, 공중에\n저 기러기\n열십자 복판에 내가 섰소.',
      options: [
        '[A]에서 이동의 조건을 묻고 [B]에서 위치를 밝힘으로써, 화자는 기러기와 공유할 출발점을 정한 뒤 질문에 대한 답을 기다리고 있다.',
        '[A]의 의문형이 이동 경로에 대한 불확실성을 드러낸다면, [B]의 진술형은 정확한 위치의 확인을 통해 그 불확실성이 해소되는 과정을 드러낸다.',
        '[A]와 [B]의 앞 두 행이 반복되어 두 존재의 유사성이 강조되고, 서로 다른 마지막 행은 기러기와 화자가 같은 종류의 방황을 겪는다는 점을 구체화한다.',
        '[A]와 [B]는 같은 대상에게 말을 건네지만, [B]에서 ‘내가’를 내세움으로써 기러기의 이동을 화자 자신의 이동 경험으로 전환하여 제시한다.',
        '[A]와 [B]의 앞 두 행은 동일한 호명의 틀을 유지하고, 마지막 행의 변화는 기러기의 이동을 묻는 발화를 길 한복판에 선 자신의 처지를 드러내는 발화와 맞세운다.'
      ],
      answer: 4,
      rationale: '반복되는 부분과 바뀌는 부분을 구분해야 한다. 앞 두 행의 호명은 같지만 마지막 행의 주체·서술 내용은 기러기의 이동에서 화자의 정지된 위치로 달라지며 대비를 만든다.',
      reasons: [
        '‘공중’과 ‘열십자 복판’은 두 존재가 함께 출발할 장소가 아니다. 질문이 실제 동행을 준비하는 발화라는 근거도 없다.',
        '서 있는 위치를 아는 것과 앞으로 갈 곳을 아는 것은 다르다. 이어지는 마지막 연의 ‘갈 길은 하나 없소’가 불확실성의 해소를 부정한다.',
        '같은 형식의 반복이 곧 처지의 동일함을 뜻하지는 않는다. 기러기는 ‘잘 가는’ 존재로 물어지고 화자는 길 한복판에 서 있다는 점에서 대비된다.',
        '‘내가 섰소’는 화자의 위치를 말하지만, 기러기의 이동을 자신이 경험한 일로 서술한 것은 아니다. ‘내가’의 등장만으로 대상의 행동이 화자의 행동으로 바뀌지 않는다.',
        '호명의 반복이라는 공통 형식과 마지막 행의 변화라는 차이를 함께 설명했다. 발화 주체인 화자가 바뀌는 것이 아니라 발화가 초점을 맞추는 대상과 처지가 달라진다.'
      ]
    },
    {
      id: 'gil-sanyuhwa-structure',
      stem: '(가)와 (나)의 반복과 시상 전개를 비교한 설명으로 가장 적절한 것은?',
      options: [
        '(가)는 ‘어제’에서 ‘오늘’로 시간이 이어져도 방향을 정하지 못한 처지가 반복되고, (나)는 ‘피네’와 ‘지네’를 유사한 구조에 배치하여 생성과 소멸을 대응시킨다.',
        '(가)의 ‘또’와 (나)의 ‘갈 봄 여름없이’는 각각 시간의 되풀이를 나타내므로, 두 시는 출발한 장소로 되돌아오는 공간 이동을 기본 구조로 삼는다.',
        '(가)는 같은 호명 뒤에 다른 진술을 두고 (나)는 같은 공간 뒤에 다른 현상을 두므로, 두 시의 반복은 모두 화자가 자신의 태도를 수정해 가는 과정을 나타낸다.',
        '(가)의 ‘갈래갈래’와 (나)의 ‘산에 / 산에’는 공간을 거듭 제시하므로, 두 시는 관찰 범위를 차례로 넓혀 마지막에 세계 전체에 대한 판단에 도달한다.',
        '(가)의 ‘어제’와 (나)의 ‘꽃 피네’는 회상의 출발점이고, (가)의 ‘오늘’과 (나)의 ‘꽃 지네’는 그 회상을 마치는 시점이므로 두 시는 과거와 현재의 교차로 전개된다.'
      ],
      answer: 0,
      rationale: '반복이라는 공통점만 확인하지 말고 무엇이 반복되고 무엇이 달라지는지 읽어야 한다. (가)는 시간의 흐름 속에서도 지속되는 방황을, (나)는 대응하는 구성 속 꽃의 개화와 낙화를 보여 준다.',
      reasons: [
        '‘또’와 ‘어디로 갈까’는 이어지는 방황에, 첫 연과 마지막 연의 ‘피네/지네’는 유사한 구조 속 변화에 각각 근거한다. 어느 쪽에도 없는 사건이나 태도 변화를 보태지 않았다.',
        '시간의 반복을 공간적인 귀환과 혼동했다. (가)가 고향으로 돌아갔다는 사건도, (나)가 특정한 출발 장소로 이동해 돌아온다는 사건도 제시되지 않는다.',
        '반복 속 내용의 변화는 확인되지만 이를 화자의 태도 수정이라고 단정할 수는 없다. 특히 (나)의 개화와 낙화는 대상의 변화이지 화자의 반성이나 입장 수정이 아니다.',
        '공간 표현의 반복을 관찰 범위의 점진적 확대로 바꾸어 읽었다. (가)의 마지막은 오히려 ‘내게’라는 한정을 지니며, (나)도 서로 다른 공간을 차례로 확장하지 않는다.',
        '(가)에 과거와 현재를 가리키는 말이 있는 것은 맞지만 (나)의 개화가 회상이라는 근거는 없다. 생성과 소멸의 대응을 과거 회상과 현재 복귀로 치환했다.'
      ]
    },
    {
      id: 'gil-sanyuhwa-view',
      stem: '〈보기〉에 따라 (가)와 (나)를 감상한 내용으로 적절하지 않은 것은?',
      view: '자연물과 인간의 관계를 읽을 때에는 같은 공간에 있다는 사실, 상대에게 마음을 기울이는 일, 서로 응답하는 관계가 이루어졌다는 사실을 구별할 필요가 있다. 이 문항에서는 (나)의 ‘저만치’를 대상과의 거리로, ‘혼자서’를 개별적으로 존재하는 양상으로 읽는다. 이러한 관점에서 대상에 대한 지향이 나타나더라도 그것이 곧 상호적인 관계의 완성을 뜻하는 것은 아니다.',
      options: [
        '(가)의 ‘여보소’는 기러기를 향한 발화를 마련하지만 응답이 제시되지 않으므로, 호명 자체를 고독이 해소되었다는 근거로 삼기는 어렵겠군.',
        '(가)의 ‘오라는 곳’이 없다는 말은 화자가 자신을 받아 줄 관계의 부재를 느낀다는 해석을 뒷받침하지만, 실제로 누가 그를 거절했는지까지 특정해 주지는 않겠군.',
        '(나)의 ‘꽃이 좋아’는 꽃을 향한 새의 지향을 나타내며, ‘산에서 사노라네’는 그 지향에 대한 꽃의 응답이 같은 공간에서의 거주로 실현되었음을 보여 주겠군.',
        '(나)의 ‘꽃이 좋아’와 ‘혼자서’를 함께 보면, 대상을 향하는 마음이 존재한다는 사실과 대상이 개별적으로 존재한다는 진술이 함께 놓일 수 있겠군.',
        '(가)의 ‘저 기러기’와 (나)의 ‘저만치’는 대상을 바라보는 거리를 의식하게 하지만, 그 거리만으로 각각의 자연물이 화자를 의도적으로 배척한다고 단정할 수는 없겠군.'
      ],
      answer: 2,
      rationale: '‘꽃이 좋아’와 ‘산에서 사노라네’는 새의 지향과 거주를 말한다. 꽃이 새에게 응답했다는 진술은 없다. 한쪽의 마음과 같은 공간에 있음만으로 상호적인 관계의 성립을 추론한 것이 오류다.',
      reasons: [
        '말을 건다는 사실과 상대가 응답했다는 사실을 구분했다. (가)에는 기러기의 답변이나 그 답변을 통한 문제 해결이 제시되지 않는다.',
        '화자가 체감하는 관계의 부재는 읽을 수 있지만 특정 인물의 거절 사건이나 구체적 귀향 불가 사유까지 주어지지는 않는다. 텍스트에 허용된 추론의 범위를 지켰다.',
        '새가 꽃을 좋아해 산에서 산다는 진술을 꽃의 응답으로 바꾸었다. ‘산에서 사노라네’의 대상은 새이며, 꽃의 호응을 보여 주는 근거가 아니다.',
        '보기에서 지정한 독해 관점에 따르면 지향과 개별적 존재는 양립 가능하다. 하나가 있다고 다른 하나가 해소되었다고 보지 않았다는 점에서 적절하다.',
        '거리의 표현을 자연물의 의도나 거부 행위로 바꿔 읽지 않았다. 두 표현 모두 대상의 의도적 배척을 확정하는 진술은 아니다.'
      ]
    }
  ];

  const style = document.createElement('style');
  style.textContent = `
    #advanced-poetry{margin:18px 0 0;padding:22px;border:1px solid var(--line,#e5e7eb);border-radius:20px;background:var(--card,#fff);color:var(--text,#111827);scroll-margin-top:16px;overflow-wrap:anywhere}
    #advanced-poetry h2{margin:0 0 10px;font-size:22px}#advanced-poetry h3{line-height:1.7;font-size:18px}#advanced-poetry h4{margin:14px 0 8px}
    #advanced-poetry p{line-height:1.8}#advanced-poetry button,#advanced-poetry input{font:inherit}#advanced-poetry [hidden]{display:none!important}
    #advanced-poetry .adv-muted{font-size:13px;color:var(--muted,#6b7280)}#advanced-poetry .adv-reading{border:1px solid var(--line,#e5e7eb);border-radius:12px;padding:14px;margin:16px 0}
    #advanced-poetry summary{cursor:pointer;font-weight:700}#advanced-poetry .adv-passages{display:grid;grid-template-columns:1fr 1fr;gap:24px}
    #advanced-poetry .adv-poem{white-space:pre-wrap;font-size:16px;line-height:1.9}#advanced-poetry .adv-view{white-space:pre-wrap;line-height:1.9;background:#f8fafc;border:1px solid #cbd5e1;padding:16px;border-radius:8px;margin:12px 0 18px}
    #advanced-poetry .adv-nav,#advanced-poetry .adv-actions{display:flex;flex-wrap:wrap;gap:9px;margin:14px 0}
    #advanced-poetry button{cursor:pointer;min-height:44px;border:1px solid #cbd5e1;border-radius:9px;padding:9px 14px;background:#fff;color:#111827}
    #advanced-poetry .adv-primary,#advanced-poetry button[aria-current=step]{background:var(--blue,#2563eb);color:#fff;border-color:var(--blue,#2563eb)}
    #advanced-poetry button:disabled{opacity:.5;cursor:default}#advanced-poetry button:focus-visible,#advanced-poetry summary:focus-visible{outline:3px solid #2563eb;outline-offset:3px}
    #advanced-poetry .adv-options{display:grid;gap:10px}#advanced-poetry .adv-option{display:flex;gap:10px;align-items:flex-start;border:1px solid #cbd5e1;border-radius:10px;padding:14px;line-height:1.8;cursor:pointer}
    #advanced-poetry .adv-option input{margin:7px 0 0;flex-shrink:0;width:18px;height:18px}#advanced-poetry .adv-option.selected{border-color:#2563eb;background:#eff6ff}
    #advanced-poetry .adv-option:focus-within{outline:2px solid #2563eb;outline-offset:2px}#advanced-poetry .adv-option.correct{border-color:#15803d;background:#f0fdf4}#advanced-poetry .adv-option.wrong{border-color:#b91c1c;background:#fef2f2}
    #advanced-poetry .adv-feedback{margin-top:18px;padding:16px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc}#advanced-poetry .adv-reasons{list-style:none;padding:0;margin:0}#advanced-poetry .adv-reasons li{line-height:1.85;margin:12px 0}
    #advanced-poetry .adv-notice{color:#92400e}#advanced-poetry .adv-links a{color:#1d4ed8;text-decoration:underline;margin-right:16px}
    @media(max-width:600px){#advanced-poetry{padding:16px}#advanced-poetry .adv-passages{grid-template-columns:1fr}#advanced-poetry .adv-option{padding:12px}}
  `;
  document.head.appendChild(style);
  const host = document.createElement('section');
  host.id = 'advanced-poetry';
  host.setAttribute('aria-labelledby', 'adv-title');
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const heading = el('h2', t('title'));
  heading.id = 'adv-title';
  host.append(heading, el('p', t('intro')), el('p', t('notice'), 'adv-muted'));
  const reading = el('details', undefined, 'adv-reading');
  reading.append(el('summary', t('passage')));
  const passages = el('div', undefined, 'adv-passages');
  for (const [label, text] of [[t('gil'), document.querySelector('#poem .poem')?.textContent.trim() || t('unavailable')], [t('sanyuhwa'), comparisonPoem]]) {
    const panel = el('section');
    panel.append(el('h3', label), el('div', text, 'adv-poem'));
    passages.append(panel);
  }
  reading.append(passages, el('p', t('source'), 'adv-muted'));
  const links = el('p', undefined, 'adv-links');
  for (const [label, href] of [
    [t('textSource'), 'https://ko.wikisource.org/w/index.php?title=진달래꽃_(시집)/산유화&oldid=430577'],
    [t('rightsSource'), 'https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?menuNo=200019&wrtSn=9029202']
  ]) {
    const link = el('a', label);
    link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer'; links.append(link);
  }
  reading.append(links);
  const progress = el('p', undefined, 'adv-muted');
  progress.setAttribute('role', 'status');
  const nav = el('nav', undefined, 'adv-nav');
  nav.setAttribute('aria-label', t('navigation'));
  const question = el('h3'); question.id = 'adv-question'; question.tabIndex = -1;
  const view = el('div', undefined, 'adv-view');
  const options = el('div', undefined, 'adv-options');
  options.setAttribute('role', 'group'); options.setAttribute('aria-labelledby', question.id);
  const feedback = el('section', undefined, 'adv-feedback');
  feedback.setAttribute('aria-live', 'polite');
  const actions = el('div', undefined, 'adv-actions');
  const notice = el('p', undefined, 'adv-notice'); notice.setAttribute('role', 'alert');
  const storageNotice = el('p', t('storage'), 'adv-muted'); storageNotice.hidden = true;
  host.append(reading, progress, nav, question, view, options, feedback, actions, notice, storageNotice);
  const layout = document.querySelector('.layout');
  if (layout) layout.after(host); else (document.querySelector('main') || document.body).append(host);
  const topLinks = document.querySelector('.toplinks');
  if (topLinks && !topLinks.querySelector('a[href="#advanced-poetry"]')) {
    const link = el('a', t('examLink')); link.href = '#advanced-poetry'; topLinks.append(link);
  }

  let storageAvailable = true;
  const freshState = () => ({ contentId, index: 0, answers: questions.map(() => null), submitted: false });
  let state = load();
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (!saved || saved.contentId !== contentId || !Array.isArray(saved.answers)) return freshState();
      const answers = questions.map((q, i) => Number.isInteger(saved.answers[i]) && saved.answers[i] >= 0 && saved.answers[i] < q.options.length ? saved.answers[i] : null);
      return { contentId, index: Number.isInteger(saved.index) ? Math.max(0, Math.min(saved.index, questions.length - 1)) : 0,
        answers, submitted: saved.submitted === true && answers.every(value => value !== null) };
    } catch { storageAvailable = false; return freshState(); }
  }
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); storageAvailable = true; }
    catch { storageAvailable = false; }
    storageNotice.hidden = storageAvailable;
  }
  function button(text, callback, className) {
    const node = el('button', text, className); node.type = 'button'; node.addEventListener('click', callback); return node;
  }
  function renderStatus() {
    const correct = questions.filter((q, i) => state.answers[i] === q.answer).length;
    progress.textContent = state.submitted ? t('score', { total: questions.length, correct }) : t('progress', { answered: state.answers.filter(value => value !== null).length, total: questions.length });
    nav.replaceChildren();
    questions.forEach((q, i) => {
      const status = state.submitted ? t(state.answers[i] === q.answer ? 'correct' : 'wrong') : t(state.answers[i] === null ? 'unanswered' : 'answered');
      const node = button(String(i + 1), () => go(i));
      node.setAttribute('aria-label', t('questionStatus', { number: i + 1, status }));
      if (i === state.index) node.setAttribute('aria-current', 'step');
      nav.append(node);
    });
  }
  function select(value) {
    if (state.submitted) return;
    state.answers[state.index] = value; save(); notice.textContent = '';
    options.querySelectorAll('.adv-option').forEach((node, i) => node.classList.toggle('selected', i === value));
    renderStatus();
  }
  function render() {
    renderStatus(); storageNotice.hidden = storageAvailable;
    const q = questions[state.index];
    question.textContent = t('question', { number: state.index + 1, stem: q.stem });
    view.hidden = !q.view; view.textContent = q.view ? t('view') + '\n' + q.view : '';
    options.replaceChildren();
    q.options.forEach((text, i) => {
      const label = el('label', undefined, 'adv-option');
      const input = document.createElement('input'); input.type = 'radio'; input.name = 'adv-answer'; input.value = String(i);
      input.checked = state.answers[state.index] === i; input.disabled = state.submitted;
      input.addEventListener('change', () => select(i));
      label.classList.toggle('selected', input.checked);
      if (state.submitted) {
        label.classList.toggle('correct', i === q.answer);
        label.classList.toggle('wrong', input.checked && i !== q.answer);
      }
      label.append(input, el('span', t('option', { number: numerals[i], text }))); options.append(label);
    });
    feedback.replaceChildren(); feedback.hidden = !state.submitted;
    if (state.submitted) {
      const selected = state.answers[state.index];
      feedback.append(el('h4', t(selected === q.answer ? 'correctResult' : 'wrongResult', { answer: numerals[q.answer], selected: numerals[selected] })), el('p', q.rationale), el('h4', t('explanations')));
      const list = el('ol', undefined, 'adv-reasons');
      q.reasons.forEach((reason, i) => list.append(el('li', t('option', { number: numerals[i], text: reason }))));
      feedback.append(list);
    }
    actions.replaceChildren();
    const previous = button(t('previous'), () => go(state.index - 1)); previous.disabled = state.index === 0; actions.append(previous);
    const next = button(t('next'), () => go(state.index + 1)); next.disabled = state.index === questions.length - 1; actions.append(next);
    if (!state.submitted) actions.append(button(t('submit'), submit, 'adv-primary'));
    else actions.append(button(t('restart'), () => {
      if (window.confirm(t('resetConfirm'))) { state = freshState(); save(); notice.textContent = ''; render(); question.focus(); }
    }));
  }
  function go(index) {
    if (!Number.isInteger(index) || index < 0 || index >= questions.length) return;
    state.index = index; save(); notice.textContent = ''; render(); question.focus();
  }
  function submit() {
    if (state.submitted) return;
    const firstMissing = state.answers.findIndex(value => value === null);
    if (firstMissing !== -1) {
      go(firstMissing);
      notice.textContent = t('missing', { count: state.answers.filter(value => value === null).length, number: firstMissing + 1 });
      return;
    }
    state.submitted = true; state.index = 0; save(); notice.textContent = ''; render(); question.focus();
  }
  render();
  if (location.hash === '#advanced-poetry') host.scrollIntoView({ block: 'start' });
})();
