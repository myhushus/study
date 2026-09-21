(() => {
  'use strict';
  if (!location.pathname.endsWith('/korean.html') || document.getElementById('advanced-poetry')) return;

  // UI translations are separate from the authored Korean literature content.
  const messages = { ko: {
    title: '5단계 · 기출 대조 실전',
    passage: '작품 펼쳐 보기 · (가) 길 / (나) 꽃',
    gil: '(가) 김소월 〈길〉', flower: '(나) 이육사 〈꽃〉',
    unavailable: '위의 작품 본문을 참고하세요.',
    source: '비교 작품은 2027 EBS 수능특강 문학 현대시 04 수록 이육사 〈꽃〉입니다. 본문은 기존 〈꽃〉 학습 페이지의 저작권 만료 원작 전사를 그대로 사용합니다. 교재와 표기가 다를 수 있습니다.',
    textSource: '〈꽃〉 본문과 출처', ebsSource: 'EBSi 수록 확인',
    progress: '{answered}/{total}문항 응답',
    score: '{total}문항 중 {correct}문항 정답',
    navigation: '실전 문항 선택', unanswered: '미응답', answered: '응답 완료', correct: '정답', wrong: '오답',
    questionStatus: '{number}번 · {status}', question: '{number}. {stem}', option: '{number} {text}',
    view: '〈보기〉', reference: '참고 시구', previous: '이전 문항', next: '다음 문항', submit: '{total}문항 제출 · 채점', restart: '실전 다시 풀기',
    resetConfirm: '이번 실전 풀이 기록을 지우고 처음부터 다시 풀까요? 기존 단계와 이전 개정판 기록은 유지됩니다.',
    missing: '{count}문항이 남았습니다. 먼저 {number}번의 답을 선택하세요.',
    correctResult: '정답입니다. 정답 {answer} · 선택 {selected}',
    wrongResult: '오답입니다. 정답 {answer} · 선택 {selected}',
    explanations: '선택지별 판단 근거', storage: '이 브라우저에서 저장할 수 없어 현재 화면에서만 풀이가 유지됩니다.',
    examLink: '실전 심화', sourceLabel: '출처'
  }};
  const locale = 'ko';
  const t = (key, values = {}) => messages[locale][key].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
  const numerals = ['①', '②', '③', '④', '⑤'];
  const contentId = 'gil-exam-20260921-ebs-v4';
  const storageKey = 'study-korean-gil-advanced-exam-v4';
  const source2025 = 'https://wdown.ebsi.co.kr/W61001/01exam/20241114/go3/korA_2_mun_O3I3H4PO.pdf';
  const source2026 = 'https://wdown.ebsi.co.kr/W61001/01exam/20251113/go3/korA_2_mun_W767CHHO.pdf';
  const comparisonPoem = "동방은 하늘도 다 끝나고\n비 한 방울 내리잖는 그 땅에도\n오히려 꽃은 빨갛게 피지 않는가\n내 목숨을 꾸며 쉬임 없는 날이여\n\n북쪽 「툰드라」에도 찬 새벽은\n눈 속 깊이 꽃 맹아리가 옴작거려\n제비 떼 까맣게 날아오길 기다리나니\n마침내 저버리지 못할 약속이여!\n\n한바다 복판 용솟음치는 곳\n바람결 따라 타오르는 꽃성에는\n나비처럼 취하는 회상의 무리들아\n오늘 내 여기서 너를 불러 보노라";

  // Answer and reasons refer to the stem's polarity, not merely to a positive assertion.
  const questions = [
  {
    "id": "v4-space-relation",
    "stem": "(가) 〈길〉과 (나) 〈꽃〉의 공간과 대상에 대한 설명으로 가장 적절한 것은?",
    "options": [
      "(가)는 여러 갈래 길에서 점차 하나의 길을 발견하고, (나)는 메마른 땅에서 점차 눈 덮인 땅으로 옮겨 가며 대상의 쇠퇴를 확인한다.",
      "(가)는 공중으로 시선을 옮겨 자기의 이동 가능성을 확인하고, (나)는 바다로 시선을 옮겨 과거에 머물던 공간으로 귀환한다.",
      "(가)는 여러 길이 있어도 자기의 갈 길을 찾지 못하고, (나)는 생명이 자라기 어려운 공간에서도 개화와 꽃망울의 움직임을 제시한다.",
      "(가)는 고향을 떠올리며 현재 위치의 제약을 벗어나고, (나)는 제비 떼를 불러 현재의 추위를 끝내는 계기를 마련한다.",
      "(가)는 길을 나누는 지형을 방황의 직접적 원인으로 제시하고, (나)는 공간마다 다른 기후를 생명력의 지속 여부를 결정하는 기준으로 제시한다."
    ],
    "answer": 2,
    "rationale": "(가)는 실제 길의 존재와 화자에게 의미 있는 갈 길을 구별합니다. (나)는 가혹한 공간에서도 꽃이 피거나 꽃망울이 움직이는 모습을 보여 줍니다. 공간의 물리적 조건과 그 안에서 드러나는 존재의 양상을 각각 연결해야 합니다.",
    "reasons": [
      "(가)의 결말은 자기의 갈 길이 없다는 진술입니다. (나)의 눈 속 움직임을 생명력의 쇠퇴로 읽을 근거도 없습니다.",
      "공중의 기러기를 바라보는 것은 화자가 날거나 이동할 수 있게 되었다는 증거가 아닙니다. (나)의 바다 역시 과거 거주지로 확인되지 않습니다.",
      "적절합니다. (가)의 “길이라도”와 “내게”, (나)의 “오히려”와 “눈 속 깊이”를 연결하면 환경과 존재의 상태 사이의 차이가 드러납니다.",
      "고향을 언급한 뒤에도 (가)의 방황은 이어집니다. (나)는 제비 떼를 기다린다고 할 뿐 그 부름으로 추위가 끝난 사건을 제시하지 않습니다.",
      "(가)의 제약은 지형 자체의 차단보다 “오라는 곳”과 자기의 길이 없다는 처지에 있습니다. (나)는 불리한 기후가 생명의 지속을 결정적으로 막지 못하는 장면을 제시합니다."
    ],
    "benchmark": {
      "year": 2025,
      "item": 22,
      "page": 8,
      "url": "https://wdown.ebsi.co.kr/W61001/01exam/20241114/go3/korA_2_mun_O3I3H4PO.pdf",
      "skill": "서로 다른 작품의 주체·대상 관계를 각각 확인한 뒤 한 설명 안에 정확히 결합한다.",
      "transfer": "길의 많음/갈 곳의 부재와 극한의 환경/생명 활동을 비교하되 실제 이동이나 쇠퇴의 사건을 만들지 않는다."
    }
  },
  {
    "id": "v4-flower-subject",
    "stem": "(나)에 대한 이해로 적절하지 않은 것은?",
    "options": [
      "“피지 않는가”는 “오히려”와 연결되어, 비가 없는 땅에서도 꽃이 핀다는 뜻을 강조한다.",
      "“꽃 맹아리”가 눈 속에서 움직인다는 말은 아직 펼쳐지지 않은 생명의 움직임을 드러낸다.",
      "“저버리지 못할 약속”이라는 말은 기다림을 포기하기 어려운 것으로 의미화하되, 제비 떼의 도착을 완료된 사건으로 제시하지 않는다.",
      "“제비 떼”는 “기다리나니”의 주체로서, 꽃 맹아리가 눈 속에서 모습을 드러내기를 기다리는 존재로 제시된다.",
      "“내 여기서”는 마지막 부름의 발화 위치를 드러내며, 앞서 나열된 모든 공간을 화자가 직접 거쳐 왔음을 증명하지는 않는다."
    ],
    "answer": 3,
    "rationale": "“눈 속 깊이 꽃 맹아리가 옴작거려 / 제비 떼 까맣게 날아오길 기다리나니”에서 기다리는 주체는 꽃 맹아리입니다. 제비 떼는 그 기다림의 내용에 놓인 존재이지 기다리는 주체가 아닙니다.",
    "reasons": [
      "부정 의문형만 떼어 꽃이 피지 않는다고 읽으면 “오히려”의 작용을 놓칩니다. 개화를 강조하는 문맥입니다.",
      "꽃망울이 눈 속에서도 옴작거린다는 것은 작은 움직임의 지속입니다. 눈이 모두 녹은 뒤에 생명이 시작됐다는 말은 아닙니다.",
      "“기다리나니”와 “저버리지 못할”을 연결한 해석입니다. 버릴 수 없다는 강조와 약속의 성취 완료는 구별됩니다.",
      "부적절합니다. 기다림의 주체와 기다리는 대상을 뒤바꾸었습니다. 꽃망울의 움직임과 기다림을 전하는 화자 역시 제비 떼와 구별해야 합니다.",
      "“여기서”는 부름의 기준점입니다. 여러 공간을 제시했다는 사실만으로 실제 여행의 경로나 완료된 이동을 덧붙일 수 없습니다."
    ],
    "benchmark": {
      "year": 2025,
      "item": 24,
      "page": 9,
      "url": "https://wdown.ebsi.co.kr/W61001/01exam/20241114/go3/korA_2_mun_O3I3H4PO.pdf",
      "skill": "서술하는 화자와 시구 안의 행위 주체·대상을 구별한다.",
      "transfer": "기다리는 꽃망울과 도착을 기다리는 제비 떼의 관계를 문장 연결로 판별한다."
    }
  },
  {
    "id": "v4-question-effects",
    "stem": "〈보기〉를 참고하여 (가), (나)의 의문형 표현을 이해한 내용으로 적절하지 않은 것은?",
    "options": [
      "(가)의 “어디로 갈까”는 “또”와 함께 반복되는 행선지 고민을 드러내며, 그 물음만으로 새로운 목적지가 정해졌다고 볼 수 없겠군.",
      "(가)의 “공중엔 길 있어서 잘 가는가?”는 기러기의 이동과 자기 처지를 견주게 하며, 실제 답변 없이도 화자의 막막함을 드러내겠군.",
      "(나)의 “피지 않는가”는 꽃의 개화 여부를 묻는 형식을 취하지만, “오히려”와 함께 불리한 환경에서도 드러나는 생명력을 강조하겠군.",
      "(가)는 이동하는 대상을 향해 묻고 (나)는 꽃의 개화를 의문형으로 말하므로, 같은 의문형이라도 그 표현을 화자의 태도에 연결하는 방식은 다르겠군.",
      "(가)는 기러기를 향한 물음에 뒤이어 “내가 섰소”라고 답하므로, 자기가 설 자리를 찾은 사실로 앞의 막막함을 해소하는군."
    ],
    "answer": 4,
    "rationale": "“내가 섰소”는 물리적 위치의 진술이지 삶의 방향이나 정착지가 확보되었다는 답변이 아닙니다. 결말의 “내게 바이 갈 길은 하나 없소”까지 읽으면 기러기와의 대비가 지속됨을 알 수 있습니다.",
    "reasons": [
      "“또”와 의문형은 행선지 고민의 반복을 드러냅니다. 질문 자체를 목적지의 결정으로 바꾸지 않았습니다.",
      "기러기의 대답은 제시되지 않습니다. 질문 뒤의 자기 위치 진술은 이동하는 대상과 선 자신을 견주게 합니다.",
      "가혹한 땅을 말한 뒤 개화를 강조합니다. 의문형의 문법과 화자가 실제로 강조하는 내용을 분리해 확인한 설명입니다.",
      "(가)의 물음은 자기 처지를 대비시키고 (나)의 물음은 생명력의 긍정에 기여합니다. 형태가 같다는 이유만으로 같은 불확실성이나 같은 확신이라고 읽지 않습니다.",
      "부적절합니다. “열십자 복판”에 서 있다는 위치를 마음 둘 자리를 찾았다는 결과로 바꾸었습니다. 물리적 위치와 정착의 의미는 같지 않습니다."
    ],
    "benchmark": {
      "year": 2025,
      "item": 25,
      "page": 9,
      "url": "https://wdown.ebsi.co.kr/W61001/01exam/20241114/go3/korA_2_mun_O3I3H4PO.pdf",
      "skill": "발화 형식을 확인한 뒤 그 형식에 붙인 심리적 효과도 타당한지 따로 검토한다.",
      "transfer": "자기 진술이라는 맞는 관찰에 정착과 막막함의 해소라는 틀린 효과를 붙인 선택지를 판별한다."
    },
    "view": "의문형 문장은 정보가 없어 답을 구할 때만 쓰이지 않는다. 어떤 대상에게 묻는 말이 자기 처지를 비추기도 하고, 부정 의문형이 특정 사실을 강조하기도 한다. 따라서 물음의 뜻은 문장 끝의 형태만이 아니라 앞뒤 진술 및 화자가 대상을 바라보는 태도에 따라 판단해야 한다."
  },
  {
    "id": "v4-condition-and-response",
    "stem": "〈보기〉를 참고하여 (가), (나)를 감상한 내용으로 적절하지 않은 것은?",
    "options": [
      "(가)의 “오라는 곳”이 없다는 말과 “갈 길”이 없다는 말은 실제 통로의 부재만으로 환원하기 어려운, 화자의 삶의 제약을 드러내겠군.",
      "(나)의 메마른 땅에서 이미 핀 꽃을 고려하면 “기다리나니”는 다른 공간에서도 기다리는 변화가 실현되었음을 확인하는 말이므로, 기다림과 현실의 어긋남은 해소되겠군.",
      "(가)의 “갈래갈래”와 “하나 없소”를 연결하면, 객관적인 선택지의 많음과 화자에게 의미 있는 방향의 확보가 서로 다름을 알 수 있겠군.",
      "(나)의 “저버리지 못할”은 어려운 조건에 대한 인식을 없애지 않은 채 기대를 붙드는 태도로 읽을 수 있으며, 기대의 유지가 곧 그 성취를 뜻하지는 않겠군.",
      "(가)의 결말은 자기에게 갈 길이 없다는 데 이르지만, (나)의 결말은 대상을 부르는 데 이르므로, 제약을 인식한 존재의 대응까지 같다고 할 수는 없겠군."
    ],
    "answer": 1,
    "rationale": "첫 공간의 개화는 다른 공간에서 제비 떼를 기다리는 장면을 이미 끝난 기다림으로 바꾸지 않습니다. 한 장면에서 확인된 사실을 다른 장면의 완료된 결과로 옮기는 것이 오류입니다.",
    "reasons": [
      "본문은 고향에 차와 배가 가고 여러 길이 있음을 인정합니다. 따라서 자기의 갈 곳이 없다는 처지를 통로 단절만으로 좁히지 않는 감상입니다.",
      "부적절합니다. 공간이 다른 두 장면을 같은 사건의 결과로 합쳤습니다. 꽃이 핀다는 진술과 꽃망울이 제비 떼를 기다린다는 진술은 각 공간에서 따로 읽어야 합니다.",
      "길의 수와 그 길을 자기 삶의 방향으로 받아들이는 일은 구별됩니다. “내게”가 판단의 주체와 처지를 한정합니다.",
      "버릴 수 없다는 것은 지속하려는 마음의 강도입니다. 기다림을 끝내는 외적 사건의 발생을 보장하는 말이 아닙니다.",
      "두 결말의 발화는 각각 부재의 자기 진술과 대상을 향한 부름입니다. 제약의 존재가 태도의 완전한 동일성을 보장하지 않는다는 보기의 관점에 맞습니다."
    ],
    "benchmark": {
      "year": 2026,
      "item": 23,
      "page": 9,
      "url": "https://wdown.ebsi.co.kr/W61001/01exam/20251113/go3/korA_2_mun_W767CHHO.pdf",
      "skill": "보기의 구별 기준을 작품별 맥락에 적용해 같은 이미지나 사실에서 같은 결과를 성급히 끌어내지 않는다.",
      "transfer": "서로 다른 공간의 개화와 기다림을 구별하고, 앞 장면의 개화를 뒤 장면의 기다림 완료로 전이한 오류를 판별한다."
    },
    "view": "삶의 제약을 읽을 때는 외부 조건과 그 조건에 대응하는 태도를 구별해야 한다. 또한 한 장면에서 일어난 사실이 다른 장면에서도 같은 결과가 이루어졌다는 증거가 되지는 않는다. 제약의 인식, 기대의 유지, 기대한 일의 성취를 따로 살피면 서로 다른 대응이 드러난다."
  },
  {
    "id": "v4-reading-claims",
    "stem": "두 작품의 시구를 연결한 해석으로 가장 적절한 것은?",
    "options": [
      "(가)의 “내 집도”는 자기 집의 존재를 밝히지만 “갈 길”의 부재를 취소하지 않고, (나)의 “약속”은 지향을 붙드는 말이지만 “기다리나니”의 미완료 상태를 취소하지 않는다.",
      "(가)의 “차 가고 배 가는 곳”은 집을 떠난 원인을 설명하고, (나)의 “찬 새벽”은 생명력을 상실한 원인을 설명하므로, 모두 현재 제약의 발생 과정을 재구성한다.",
      "(가)의 “열십자 복판”은 길을 고르는 타인의 입장을, (나)의 “회상의 무리들”은 과거를 해설하는 타인의 발화를 제시하여 화자의 판단을 보완한다.",
      "(가)의 “오늘”은 어제와 다른 귀환의 시작을, (나)의 “오늘”은 제비 떼와의 만남 이후의 회상을 나타내어 두 작품 모두 성취의 시점을 확정한다.",
      "(가)의 “저 기러기”와 (나)의 “나비처럼”은 화자가 되고 싶은 존재를 같은 방식으로 제시하여, 화자가 각 대상의 행동을 직접 따라 하는 결말로 이어진다."
    ],
    "answer": 0,
    "rationale": "집의 존재와 자기의 갈 곳, 약속을 버리지 않는 마음과 기다림의 성취는 서로 다릅니다. 각 시구를 단독으로 확대하지 않고 뒤의 진술까지 함께 읽은 설명이 정답입니다.",
    "reasons": [
      "적절합니다. (가)는 집과 길이 있어도 막막함을 말하며, (나)는 약속을 강조해도 기다리는 장면을 이미 끝났다고 하지 않습니다. 사실·태도와 해결의 결과를 나누었습니다.",
      "(가)는 집을 떠나게 된 구체적 사건을 설명하지 않습니다. (나)의 꽃망울은 찬 곳에서도 움직이므로 생명력 상실의 원인을 서술하는 장면이 아닙니다.",
      "(가)는 “내가” 선 위치를 말합니다. (나)의 무리는 부름의 대상이지 직접 자신의 과거를 해설하는 별도 화자가 아닙니다.",
      "(가)의 오늘은 행선지 고민이 이어지는 때입니다. (나)의 오늘도 제비 떼의 도착 이후로 확정되지 않습니다. 시간어가 있다는 것만으로 성취의 시간을 만들 수 없습니다.",
      "(가)의 새는 자기 처지를 견주는 대상이고 (나)의 “나비처럼”은 회상의 무리에 붙은 비유입니다. 두 표현을 모두 화자가 되고 싶은 동물로 읽거나 모방 행동의 완료로 바꿀 수 없습니다."
    ],
    "benchmark": {
      "year": 2026,
      "item": 25,
      "page": 9,
      "url": "https://wdown.ebsi.co.kr/W61001/01exam/20251113/go3/korA_2_mun_W767CHHO.pdf",
      "skill": "개별 시구에 대한 이해를 다른 시구와의 관계에 맞게 연결한다.",
      "transfer": "집/정착, 약속/성취, 비유대상/화자, 시간표현/완료시점을 구분한다."
    }
  }
];

  const style = document.createElement('style');
  style.textContent = `
    #advanced-poetry{margin:18px 0 0;padding:22px;border:1px solid var(--line,#e5e7eb);border-radius:20px;background:var(--card,#fff);color:var(--text,#111827);scroll-margin-top:16px;overflow-wrap:anywhere}
    #advanced-poetry h2{margin:0 0 10px;font-size:22px}#advanced-poetry h3{line-height:1.7;font-size:18px}#advanced-poetry h4{margin:14px 0 8px}
    #advanced-poetry p{line-height:1.8}#advanced-poetry button,#advanced-poetry input{font:inherit}#advanced-poetry [hidden]{display:none!important}
    #advanced-poetry .adv-muted{font-size:13px;color:var(--muted,#6b7280)}#advanced-poetry .adv-reading,#advanced-poetry .adv-benchmark{border:1px solid var(--line,#e5e7eb);border-radius:12px;padding:14px;margin:16px 0}
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
    #advanced-poetry .adv-notice{color:#92400e}#advanced-poetry a{color:#1d4ed8;text-decoration:underline}#advanced-poetry .adv-links a{margin-right:16px}
    @media(max-width:600px){#advanced-poetry{padding:16px}#advanced-poetry .adv-passages{grid-template-columns:1fr}#advanced-poetry .adv-option{padding:12px}}
  `;
  document.head.appendChild(style);
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const link = (label, href) => {
    const node = el('a', label);
    node.href = href; node.target = '_blank'; node.rel = 'noopener noreferrer';
    return node;
  };
  const host = el('section'); host.id = 'advanced-poetry'; host.setAttribute('aria-labelledby', 'adv-title');
  const heading = el('h2', t('title')); heading.id = 'adv-title';
  host.append(heading);
  const reading = el('details', undefined, 'adv-reading'); reading.append(el('summary', t('passage')));
  const passages = el('div', undefined, 'adv-passages');
  for (const [label, text] of [[t('gil'), document.querySelector('#poem .poem')?.textContent.trim() || t('unavailable')], [t('flower'), comparisonPoem]]) {
    const panel = el('section'); panel.append(el('h3', label), el('div', text, 'adv-poem')); passages.append(panel);
  }
  reading.append(passages);
  const sources = el('details'); sources.append(el('summary', t('sourceLabel')), el('p', t('source'), 'adv-muted'));
  const links = el('p', undefined, 'adv-links');
  links.append(link(t('textSource'), 'korean-flower.html'), link(t('ebsSource'), 'https://www.ebsi.co.kr/ebs/lms/player/retrieveLmsPlayerHtml5.ebs?lecGbn=V500&lessonId=LS100030078574&sbjtId=S20250000855&sbjtapplyId='));
  sources.append(links); reading.append(sources);
  const progress = el('p', undefined, 'adv-muted'); progress.setAttribute('role', 'status');
  const nav = el('nav', undefined, 'adv-nav'); nav.setAttribute('aria-label', t('navigation'));
  const question = el('h3'); question.id = 'adv-question'; question.tabIndex = -1;
  const view = el('div', undefined, 'adv-view');
  const options = el('div', undefined, 'adv-options'); options.setAttribute('role', 'group'); options.setAttribute('aria-labelledby', question.id);
  const feedback = el('section', undefined, 'adv-feedback'); feedback.setAttribute('aria-live', 'polite');
  const actions = el('div', undefined, 'adv-actions');
  const notice = el('p', undefined, 'adv-notice'); notice.setAttribute('role', 'alert');
  const storageNotice = el('p', t('storage'), 'adv-muted'); storageNotice.hidden = true;
  host.append(reading, progress, nav, question, view, options, feedback, actions, notice, storageNotice);
  const layout = document.querySelector('.layout');
  if (layout) layout.after(host); else (document.querySelector('main') || document.body).append(host);
  const topLinks = document.querySelector('.toplinks');
  if (topLinks && !topLinks.querySelector('a[href="#advanced-poetry"]')) {
    const shortcut = el('a', t('examLink')); shortcut.href = '#advanced-poetry'; topLinks.append(shortcut);
  }

  let storageAvailable = true;
  const freshState = () => ({ contentId, index: 0, answers: questions.map(() => null), submitted: false });
  let state = load();
  function load() {
    let raw;
    try { raw = localStorage.getItem(storageKey); }
    catch { storageAvailable = false; return freshState(); }
    try {
      const saved = JSON.parse(raw || 'null');
      if (!saved || saved.contentId !== contentId || !Array.isArray(saved.answers)) return freshState();
      const answers = questions.map((q, i) => Number.isInteger(saved.answers[i]) && saved.answers[i] >= 0 && saved.answers[i] < q.options.length ? saved.answers[i] : null);
      return { contentId, index: Number.isInteger(saved.index) ? Math.max(0, Math.min(saved.index, questions.length - 1)) : 0,
        answers, submitted: saved.submitted === true && answers.every(value => value !== null) };
    } catch { return freshState(); }
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
      const node = button(String(i + 1), () => go(i)); node.setAttribute('aria-label', t('questionStatus', { number: i + 1, status }));
      if (i === state.index) node.setAttribute('aria-current', 'step');
      nav.append(node);
    });
  }
  function select(value) {
    if (state.submitted || !Number.isInteger(value) || value < 0 || value >= questions[state.index].options.length) return;
    state.answers[state.index] = value; save(); notice.textContent = '';
    options.querySelectorAll('.adv-option').forEach((node, i) => node.classList.toggle('selected', i === value)); renderStatus();
  }
  function render() {
    renderStatus(); storageNotice.hidden = storageAvailable;
    const q = questions[state.index]; question.textContent = t('question', { number: state.index + 1, stem: q.stem });
    view.hidden = !q.view && !q.reference; view.textContent = q.view ? t('view') + '\n' + q.view : q.reference ? t('reference') + '\n' + q.reference : '';
    options.replaceChildren();
    q.options.forEach((text, i) => {
      const label = el('label', undefined, 'adv-option');
      const input = document.createElement('input'); input.type = 'radio'; input.name = 'adv-answer'; input.value = String(i);
      input.checked = state.answers[state.index] === i; input.disabled = state.submitted; input.addEventListener('change', () => select(i));
      label.classList.toggle('selected', input.checked);
      if (state.submitted) { label.classList.toggle('correct', i === q.answer); label.classList.toggle('wrong', input.checked && i !== q.answer); }
      label.append(input, el('span', t('option', { number: numerals[i], text }))); options.append(label);
    });
    feedback.replaceChildren(); feedback.hidden = !state.submitted;
    if (state.submitted) {
      const selected = state.answers[state.index];
      feedback.append(el('h4', t(selected === q.answer ? 'correctResult' : 'wrongResult', { answer: numerals[q.answer], selected: numerals[selected] })), el('p', q.rationale), el('h4', t('explanations')));
      const list = el('ol', undefined, 'adv-reasons'); q.reasons.forEach((reason, i) => list.append(el('li', t('option', { number: numerals[i], text: reason }))));
      feedback.append(list);
    }
    actions.replaceChildren();
    const previous = button(t('previous'), () => go(state.index - 1)); previous.disabled = state.index === 0; actions.append(previous);
    const next = button(t('next'), () => go(state.index + 1)); next.disabled = state.index === questions.length - 1; actions.append(next);
    if (!state.submitted) actions.append(button(t('submit', { total: questions.length }), submit, 'adv-primary'));
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
      go(firstMissing); notice.textContent = t('missing', { count: state.answers.filter(value => value === null).length, number: firstMissing + 1 }); return;
    }
    state.submitted = true; state.index = 0; save(); notice.textContent = ''; render(); question.focus();
  }
  render();
  if (location.hash === '#advanced-poetry') host.scrollIntoView({ block: 'start' });
})();
