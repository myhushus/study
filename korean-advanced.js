(() => {
  'use strict';
  if (!location.pathname.endsWith('/korean.html') || document.getElementById('advanced-poetry')) return;

  // UI translations are separate from the authored Korean literature content.
  const messages = { ko: {
    title: '5단계 · 기출 대조 실전',
    intro: '5지선다 {total}문항 · 개정 3. 답안을 수정하며 풀고, 전체 제출 후 채점과 해설을 확인하세요.',
    notice: '2025·2026학년도 수능의 독해 구조를 대조한 창작 문항입니다. 동일한 정답률·난도가 검증된 것은 아닙니다. 〈산유화〉는 비교용이며 EBS 수록 여부를 표시한 것이 아닙니다.',
    passage: '작품 펼쳐 보기 · (가) 길 / (나) 산유화',
    gil: '(가) 김소월 〈길〉', sanyuhwa: '(나) 김소월 〈산유화〉',
    unavailable: '위의 작품 본문을 참고하세요.',
    source: '비교 작품: 위키문헌 『진달래꽃』 수록 본문 / 한국저작권위원회 공유마당 작품 정보. 띄어쓰기를 일부 정리했습니다.',
    textSource: '〈산유화〉 원문', rightsSource: '공유마당 작품 정보',
    progress: '{answered}/{total}문항 응답 · 제출 전에는 정답이 표시되지 않습니다.',
    score: '{total}문항 중 {correct}문항 정답 · 문항 번호를 눌러 해설을 확인하세요.',
    navigation: '실전 문항 선택', unanswered: '미응답', answered: '응답 완료', correct: '정답', wrong: '오답',
    questionStatus: '{number}번 · {status}', question: '{number}. {stem}', option: '{number} {text}',
    view: '〈보기〉', reference: '참고 시구', previous: '이전 문항', next: '다음 문항', submit: '{total}문항 제출 · 채점', restart: '실전 다시 풀기',
    resetConfirm: '이번 실전 풀이 기록을 지우고 처음부터 다시 풀까요? 기존 단계와 이전 개정판 기록은 유지됩니다.',
    missing: '{count}문항이 남았습니다. 먼저 {number}번의 답을 선택하세요.',
    correctResult: '정답입니다. 정답 {answer} · 선택 {selected}',
    wrongResult: '오답입니다. 정답 {answer} · 선택 {selected}',
    explanations: '선택지별 판단 근거', storage: '이 브라우저에서 저장할 수 없어 현재 화면에서만 풀이가 유지됩니다.',
    examLink: '실전 심화', benchmark: '기출 대조 기록', benchmarkSource: '{year}학년도 수능 국어 짝수형 {item}번',
    skill: '판단할 것: {text}', transfer: '이번 문항에 적용한 구조: {text}',
    limits: '대조는 풀이 구조에 관한 것입니다. 배점·정답률·변별도를 그대로 옮긴 것이 아닙니다.',
    record: '전체 제작·검토 기록'
  }};
  const locale = 'ko';
  const t = (key, values = {}) => messages[locale][key].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
  const numerals = ['①', '②', '③', '④', '⑤'];
  const contentId = 'gil-exam-20260917-v3';
  const storageKey = 'study-korean-gil-advanced-exam-v3';
  const source2025 = 'https://wdown.ebsi.co.kr/W61001/01exam/20241114/go3/korA_2_mun_O3I3H4PO.pdf';
  const source2026 = 'https://wdown.ebsi.co.kr/W61001/01exam/20251113/go3/korA_2_mun_W767CHHO.pdf';
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

  // Answer and reasons refer to the stem's polarity, not merely to a positive assertion.
  const questions = [
    {
      id: 'v3-common-form',
      stem: '(가), (나)의 공통점으로 가장 적절한 것은?',
      options: [
        '주변 사물의 움직임을 따라 시선을 옮기며 화자가 처한 상황의 변화를 드러낸다.',
        '시간의 흐름을 반복적으로 제시하여 잃어버린 삶의 상태를 되찾으려는 소망을 드러낸다.',
        '유사한 구절을 되풀이하면서 그 일부를 달리하여 대상이나 상황의 특성을 드러낸다.',
        '자연물을 향한 물음을 제시하고 그에 응답하는 방식으로 대상의 내면을 드러낸다.',
        '공간적 거리가 좁혀지는 과정을 통해 화자와 대상의 관계가 달라졌음을 드러낸다.'
      ],
      answer: 2,
      rationale: '형식이 확인되는 것과 그 형식에 붙인 효과가 맞는 것을 따로 판단해야 한다. (가)는 같은 호명 뒤에 기러기와 자신의 처지를 달리 제시하고, (나)는 비슷한 연의 구조에 개화와 낙화를 대응시킨다.',
      reasons: [
        '부적절하다. 움직임이나 시선의 대상은 있지만, (가)의 화자는 끝까지 갈 곳을 찾지 못한다. 사물의 움직임을 따라 화자의 상황이 변화한다는 설명을 두 작품에 공통으로 적용할 수 없다.',
        '부적절하다. (가)의 어제와 오늘, (나)의 계절 표현은 확인된다. 그러나 (나)의 꽃이 피고 지는 현상을 잃어버린 삶을 되찾으려는 화자의 소망으로 해석할 근거는 없다.',
        '적절하다. (가)의 두 ‘여보소’ 연은 앞부분을 반복하되 끝을 물음과 자기 진술로 달리한다. (나)의 처음과 끝은 ‘산에는 꽃’이라는 틀을 유지하되 ‘피네’와 ‘지네’를 달리하여 꽃의 존재 양상을 드러낸다.',
        '부적절하다. (가)에는 기러기에게 던지는 물음이 있지만 그 대상의 응답은 제시되지 않는다. (나)도 자연물과 문답하는 방식으로 전개되지 않는다.',
        '부적절하다. 공중과 지상, ‘저만치’와 같은 공간 표현이 있다는 사실만으로 거리가 좁혀지는 과정을 추론할 수 없다. 두 작품에 그런 접근의 과정이나 그에 따른 관계 변화는 제시되지 않는다.'
      ],
      benchmark: { year: 2025, item: 22, page: 8, url: source2025,
        skill: '공통 표현의 존재와 그 효과가 모든 대상 작품에서 성립하는지 구분하기',
        transfer: '한 작품의 일부 특징만 확인하고 공통점으로 확정하면 오답을 고르게 구성했다. 원 기출은 세 작품, 이번 문항은 두 작품을 비교한다.' }
    },
    {
      id: 'v3-referent',
      stem: '(나)에 대한 이해로 적절하지 않은 것은?',
      options: [
        '‘산에는’이 처음과 끝에 놓임으로써 꽃이 피고 지는 현상을 아우르는 공간이 제시된다.',
        '‘갈 봄 여름없이’는 특정 계절의 꽃을 묘사하기보다 피고 지는 현상의 되풀이에 주목하게 한다.',
        '‘저만치’와 ‘혼자서’는 시선에 포착된 꽃의 위치와 다른 존재들과 구별되는 모습을 드러낸다.',
        '‘꽃이 좋아’에는 ‘사노라네’에 담긴 화자의 뜻이 제시되어, 화자가 산에 머무는 이유가 드러난다.',
        '‘작은 새’의 울음은 그 새가 꽃과 함께 살아가는 산의 풍경을 청각적으로 떠올리게 한다.'
      ],
      answer: 3,
      rationale: '‘꽃이 좋아’라는 까닭을 지닌 존재와 ‘산에서 사노라네’의 주체는 앞에 제시된 작은 새이다. 이를 전하는 화자와 그 진술의 대상인 새를 구별해야 한다.',
      reasons: [
        '적절하다. 첫 연과 마지막 연에 같은 공간이 제시되고 그 안에서 꽃의 개화와 낙화가 대응한다.',
        '적절하다. 특정 한 계절을 고정하여 묘사하는 표현이 아니라, 계절에 매이지 않는 개화와 낙화의 양상을 드러낸다. 이를 하나의 꽃이 모든 계절에 계속 피어 있다는 사실 진술로 읽지는 않는다.',
        '적절하다. ‘저만치’는 거리를 둔 위치를, ‘혼자서’는 개별적으로 피어 있는 모습을 드러낸다. 꽃이 누구에게 버림받았다는 사건이나 새의 소외감까지 확정하지는 않는다.',
        '부적절하다. 새가 꽃을 좋아하여 산에 산다는 서술을 화자가 산에 사는 이유로 바꾸었다. 화자가 그 모습을 전한다는 사실과 화자 자신이 그 행위의 주체라는 해석은 다르다.',
        '적절하다. ‘산에서 우는 작은 새’가 직접적인 근거다. 꽃을 좋아하여 그곳에 산다는 다음 행들과 함께 읽으면 산에서 꽃과 새가 존재하는 풍경이 형성된다.'
      ],
      benchmark: { year: 2025, item: 24, page: 9, url: source2025,
        skill: '말하는 이와 표현이 가리키는 대상, 행위의 주체를 구별하기',
        transfer: '시구 자체는 실제 표현을 사용하되, 그 표현의 주체를 대상에서 화자로 바꾼 선택지를 가려내게 했다.' }
    },
    {
      id: 'v3-utterance-view',
      stem: '〈보기〉를 참고하여 (가)를 감상한 내용으로 적절하지 않은 것은?',
      view: '시의 발화는 말하는 이의 상황뿐 아니라 그 상황을 받아들이는 방식까지 드러낸다. (가)의 화자는 행선지를 스스로 묻다가 누군가에게 해명하듯 말하고, 기러기를 호명하는 형식으로 자신의 처지를 내보인다. 실제 답변이나 대화가 완결되지 않더라도 이러한 발화의 변화는 정착할 자리를 찾지 못하는 이의 내면을 구체화할 수 있다.',
      options: [
        '‘산으로 올라갈까 / 들로 갈까’는 가능한 행선지를 거듭 묻는 발화로서, ‘오라는 곳’이 없는 화자가 갈 곳을 정하지 못한 내면을 보여 주는군.',
        '‘내가 섰소’는 반복되는 호명 뒤에 자신의 위치를 제시한 발화로서, 관심이 화자에게 돌아오면서 기러기와의 대비가 해소된 내면을 보여 주는군.',
        '‘말 마소, 내 집도’는 자신에게도 집이 있음을 밝히는 발화로서, 갈 곳이 없다는 말이 집의 존재 자체를 부정하는 말과는 다름을 드러내는군.',
        '‘공중엔 길 있어서 잘 가는가?’는 대상에게 이동의 조건을 묻는 발화로서, 지상에서 갈 곳을 찾지 못하는 화자가 자신의 처지를 비추어 보는군.',
        '‘내게 바이 갈 길은 하나 없소’는 부정의 의미를 강조하여 마무리하는 발화로서, 여러 길 중에서도 자신의 길을 찾지 못한 막막함을 드러내는군.'
      ],
      answer: 1,
      rationale: '자신의 위치를 말한다는 관찰은 맞다. 그러나 기러기의 이동 뒤에 자신의 정지된 위치를 제시한 것은 대비의 해소가 아니라 대비의 구체화이다. 발화의 형식과 그 효과를 함께 검토해야 한다.',
      reasons: [
        '적절하다. 질문이 연속되다가 ‘오라는 곳이 없어’라는 제약이 제시된다. 여러 행선지를 떠올리는 것과 그중 하나를 실제로 정하는 것은 구별된다.',
        '부적절하다. 호명 뒤에 자기 진술이 놓인다는 형식 설명은 맞지만, 그로 인해 대비가 해소되었다는 효과 설명은 틀리다. 잘 가는 기러기와 길 한복판에 선 자신이 맞세워지고 마지막까지 갈 길의 부재가 지속된다.',
        '적절하다. ‘내 집도’는 고향집이 있다는 해명처럼 읽을 수 있다. 그런데 마지막에도 자신에게 갈 길이 없다고 말하므로, 집의 지리적 존재와 현재 안식할 자리의 확보는 같지 않다.',
        '적절하다. 실제 답변이 제시되지는 않는다. 물음은 길이 보이지 않는 공중에서 이동하는 기러기와 길이 있는 지상에서 방황하는 자신의 차이를 드러내는 데 기여한다.',
        '적절하다. ‘내게’가 화자의 처지로 한정하고 ‘바이’, ‘하나 없소’가 부정을 강화한다. 실제 도로 전체가 없어졌다는 말이 아니라 화자에게 의미 있는 갈 곳이 없다는 진술이다.'
      ],
      benchmark: { year: 2025, item: 25, page: 9, url: source2025,
        skill: '〈보기〉의 발화 관점을 적용하여 표현의 형식과 심리적 효과를 각각 검토하기',
        transfer: '반복과 자기 진술이라는 맞는 관찰에 대비가 해소된다는 틀린 효과를 연결했다. 원 기출의 정서나 선택지 문장은 복제하지 않았다.' }
    },
    {
      id: 'v3-comparative-view',
      stem: '〈보기〉를 참고하여 (가), (나)를 감상한 내용으로 적절하지 않은 것은?',
      view: '(가)는 길이 있는 공간에서 갈 곳을 찾지 못하는 화자를 통해 정착의 어려움을 드러낸다. (나)는 산이라는 한 공간에서 저마다 존재하는 자연물들을 보여 준다. 이때 어떤 존재가 홀로 있다는 사실과 다른 존재를 향해 마음이 기운다는 사실은 함께 나타날 수 있다. 따라서 거리나 고독의 이미지가 누구의 처지를 나타내는지, 그 존재가 다른 대상과 맺는 관계가 어떠한지를 살펴야 한다.',
      options: [
        '‘오라는 곳’이 없는 (가)의 화자와 달리, (나)의 ‘작은 새’는 ‘꽃이 좋아’ 산에 산다는 점에서 자신을 그곳에 머물게 하는 대상을 지닌 존재이겠군.',
        '(가)의 ‘저 기러기’와 (나)의 ‘저만치’의 꽃은 모두 시선의 대상이지만, 앞의 대상은 이동하는 모습으로 화자와 대비되고 뒤의 대상은 홀로 피어 있는 상태로 제시되겠군.',
        '(가)의 ‘열십자 복판’에 여러 방향이 있다고 해서 화자의 막막함이 없어지지는 않으며, (나)의 ‘산’이 공통 공간이라고 해서 꽃의 ‘혼자서’라는 상태가 사라지지는 않겠군.',
        '(가)의 ‘내게’는 화자의 처지에서 길의 의미를 드러내고, (나)의 ‘꽃이 좋아’는 새가 산에 사는 까닭을 드러낸다는 점에서, 공간의 의미를 대상과의 관계에서 읽을 수 있겠군.',
        '(가)의 ‘기러기’가 화자의 처지를 부각하는 대상이듯, (나)의 ‘꽃’도 새가 자신의 소외를 확인하는 대상이므로, 두 작품에서 대상을 바라보는 존재는 관계의 부재를 확인하겠군.'
      ],
      answer: 4,
      rationale: '한 작품에서 성립하는 대비의 관계를 다른 작품에 그대로 옮기면 안 된다. 꽃이 혼자 피어 있다는 것과 새가 자신의 소외를 확인한다는 것은 다르다. 오히려 새는 꽃을 좋아하여 산에 산다고 제시된다.',
      reasons: [
        '적절하다. (가)에서 화자를 부르는 곳은 없지만, (나)에는 새가 머물게 되는 까닭으로 꽃이 제시된다. 같은 머묾의 문제를 두 작품의 관계 차이에 맞춰 읽었다.',
        '적절하다. ‘잘 가는가’와 ‘내가 섰소’는 기러기와 화자의 대비에 근거가 된다. (나)의 꽃은 ‘혼자서 피어 있네’라는 상태로 제시되며 새와 동일한 행동을 하는 것은 아니다.',
        '적절하다. 물리적으로 방향이 많다는 것과 자신에게 갈 곳이 있다는 것은 다르다. 마찬가지로 같은 공간에 꽃과 새가 존재한다는 것만으로 꽃의 개별적인 존재 모습이 없어지지는 않는다.',
        '적절하다. ‘내게’라는 한정과 ‘꽃이 좋아’라는 까닭에 주목했다. 길과 산을 단지 도로나 지형으로만 다루지 않고 각 존재와 대상의 관계에서 이해한 것이다.',
        '부적절하다. (가)의 대비는 성립하지만, (나)에서 꽃의 홀로 있음이 새의 소외 인식으로 이어지지는 않는다. 새가 꽃을 좋아해 산에 산다는 관계를 관계의 부재로 뒤집었다.'
      ],
      benchmark: { year: 2026, item: 23, page: 9, url: source2026,
        skill: '〈보기〉를 바탕으로 서로 다른 작품에서 이미지와 관계가 작동하는 방식을 구별하기',
        transfer: '첫 작품에 맞는 해석을 둘째 작품에도 적용하도록 유도하되, 둘째 작품의 주체와 관계에서 어긋나게 구성했다. 두 작품의 근거를 모두 확인해야 한다.' }
    },
    {
      id: 'v3-relational-evidence',
      stem: 'ⓐ～ⓔ를 중심으로 (가)를 이해한 내용으로 가장 적절한 것은?',
      reference: 'ⓐ 가마귀 가왁가왁 울며 새었소.\nⓑ 오라는 곳이 없어 나는 못 가오.\nⓒ 차 가고 배 가는 곳이라오.\nⓓ 공중엔 길 있어서 잘 가는가?\nⓔ 열십자 복판에 내가 섰소.',
      options: [
        '화자는 ⓒ에서 고향으로 통하는 이동의 조건을 밝히면서도 ⓑ의 처지에서 벗어나지 못하며, ⓔ에서 ⓓ의 대상과 대비되는 자신의 위치를 드러낸다.',
        '화자는 ⓐ의 울음을 ⓑ의 처지에 대한 외부의 응답으로 받아들이고, ⓓ에서도 새의 움직임으로부터 자신을 부르는 뜻을 읽어 낸다.',
        '화자는 ⓑ의 어려움이 ⓒ의 교통 조건으로 해결될 수 있음을 깨닫고, ⓔ에서 그 해결을 실행할 방향을 아직 고르지 못한 상태를 보여 준다.',
        '화자는 ⓓ에서 눈에 보이는 길 없이 이동하는 대상에 주목하고, ⓔ에서는 길이 많이 갈라져 있는 것이 자신을 떠돌게 한 원인이라고 판단한다.',
        '화자는 ⓐ의 새와 ⓓ의 새를 자신의 내면을 대신 말하는 존재로 내세우고, ⓔ에서 그 새들의 말에 동의하여 자신의 처지를 드러낸다.'
      ],
      answer: 0,
      rationale: '교통편이 있다는 사실은 화자의 정착 문제를 해결하지 못한다. 또 현재의 위치를 밝히는 것은 앞으로 갈 곳을 찾았다는 말이 아니다. 각 시구의 의미와 시구 사이에 설정된 관계가 모두 타당한 것은 ①이다.',
      reasons: [
        '적절하다. ⓒ는 앞의 ‘내 집도 / 정주 곽산’을 받아 교통의 가능성을 말한다. 그러나 마지막까지 갈 길을 찾지 못하므로 ⓑ의 어려움은 남는다. ⓓ의 잘 가는 기러기와 ⓔ의 서 있는 화자도 대비된다.',
        '부적절하다. ⓐ는 밤을 지새우는 상황의 새 울음이지 ⓑ에 답하는 말이 아니다. ⓓ도 화자가 기러기에게 하는 물음일 뿐, 기러기가 화자를 부른다고 제시하지 않는다.',
        '부적절하다. 교통편의 존재를 정착의 어려움에 대한 해결책으로 바꾸었다. ⓔ는 어떤 해결책의 실행을 앞둔 위치가 아니라 갈 곳을 찾지 못하는 처지를 구체화하는 위치이다.',
        '부적절하다. ⓓ에 대한 관찰은 타당하지만, ⓔ의 길이 많은 상황을 방황을 일으킨 원인으로 확정할 근거는 없다. 여러 길이 있는데도 갈 곳이 없다는 대조를 길이 많기 때문에 방황한다는 인과로 바꾸었다.',
        '부적절하다. 새의 울음과 이동이 화자의 내면을 부각할 수는 있다. 그러나 두 새가 화자의 내면을 대신 말하고 화자가 그 말에 동의하는 대화는 제시되지 않는다.'
      ],
      benchmark: { year: 2026, item: 25, page: 9, url: source2026,
        skill: '복수의 시구를 연결해 대상의 상태와 화자의 인식을 추론하되 인과·전환을 보태지 않기',
        transfer: '개별 표현에 대한 맞는 설명만으로는 충분하지 않다. 교통과 정착, 물리적 위치와 삶의 방향, 대조와 인과를 구분해야 정답을 고를 수 있게 했다.' }
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
  host.append(heading, el('p', t('intro', { total: questions.length })), el('p', t('notice'), 'adv-muted'));
  const reading = el('details', undefined, 'adv-reading'); reading.append(el('summary', t('passage')));
  const passages = el('div', undefined, 'adv-passages');
  for (const [label, text] of [[t('gil'), document.querySelector('#poem .poem')?.textContent.trim() || t('unavailable')], [t('sanyuhwa'), comparisonPoem]]) {
    const panel = el('section'); panel.append(el('h3', label), el('div', text, 'adv-poem')); passages.append(panel);
  }
  reading.append(passages, el('p', t('source'), 'adv-muted'));
  const links = el('p', undefined, 'adv-links');
  links.append(link(t('textSource'), 'https://ko.wikisource.org/w/index.php?title=진달래꽃_(시집)/산유화&oldid=430577'), link(t('rightsSource'), 'https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?menuNo=200019&wrtSn=9029202'));
  reading.append(links);
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
  function renderBenchmark(q) {
    const b = q.benchmark;
    const details = el('details', undefined, 'adv-benchmark');
    details.append(el('summary', t('benchmark')),
      link(t('benchmarkSource', b), b.url + '#page=' + b.page),
      el('p', t('skill', { text: b.skill })), el('p', t('transfer', { text: b.transfer })), el('p', t('limits'), 'adv-muted'),
      link(t('record'), 'https://github.com/myhushus/study/blob/main/docs/korean-exam-v3-review.md'));
    feedback.append(details);
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
      feedback.append(list); renderBenchmark(q);
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
