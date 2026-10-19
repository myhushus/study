# Original photo batch 7444–7438: implementation review

## Scope

Source: the user's seven original photographs, 1000007444.jpg through 1000007438.jpg in upload order. Generated image variants are not sources: they changed integration variables, operators, bounds and conditions.

13 originals and 78 helpers are implemented: each original has three concept branches and one easier child per branch. All 91 answerable nodes are free-response. Statements and formulas are selectable black text on white HTML; handwriting and numbered answer choices are omitted. Assertions ㄱ,ㄴ,ㄷ remain part of the tangent question and are answered by typing symbols.

Excluded at the user's instruction: photograph 7439 right, problem 15, whose tiny exponent/condition could not be read confidently. The incomplete far-right problem fragments are also excluded. No guessed or pending lesson is published.

Entry: right-hand math category → 새 사진 문제. Section: math-geometry.html#uploads-photos7444. Individual route example: math-upload.html?lesson=photos-7444-a. Stable IDs combine source photo and position, not reused printed problem numbers.

## Independently derived answer keys

| Suffix | Topic | Answer |
| --- | --- | --- |
| 7444-a | Prime/divisibility constrained functions | 270 |
| 7444-b | Card sum conditioned on coin tails | 99 |
| 7443-a | Endpoint limits of integral averages | 225 |
| 7443-b | Exponential/logarithmic intersection distances | 236 |
| 7442-a | Tangents and triangle area | ㄱ,ㄴ |
| 7442-b | Quartic preserving a root-count function | 34 |
| 7441-a | Left derivatives and continuity of a product | 8 |
| 7441-b | Distinct distances between sine roots | 68 |
| 7440-a | Normal sample mean and probability maximum | 841 |
| 7440-b | Two-bag maximum and conditional probability | 70 |
| 7439-a | Products of partial sums | 28 |
| 7438-a | Nondecreasing functions and excluded equality | 151 |
| 7438-b | Noninteger sample-mean contributions | 75 |

Important source checks:

- 7444-a does not require global monotonicity. Prime/divisibility constraints give counts 18,48,84,120 by f(6), total 270, also confirmed by exhaustive enumeration of 5^5 functions.
- 7444-b: 272 outcomes have an odd number of zeros, 24 of these have zero sum, 124 have positive sum. The conditional probability is 31/68.
- 7443-a denominators are x−1 and x−2, outside the integrals, not t−1 and t−2. Endpoint limits give integral 10 and f(2)=−15.
- 7443-b sum is from n=2 through 8; logarithm base 6, argument tx+4t. Minimum max(n^2+2,18) gives 236.
- 7442-a area is 3. Slopes −4,8 have product −32, so the −27 assertion is false.
- 7442-b quartic is (32/27)t^3(t−2)+2. The solution proves its sole root-count exception is t=3/2; an additional rational-grid check agrees.
- 7440-a uses N(10,20^2), sample size 25 and the provided rounded normal table. M=7.92 and f(M)=0.49; no external more-precise quantile is substituted.
- 7440-b event probability is 57/64 and the first-score-three intersection is 13/64, giving 13/57.
- 7439-a asks (p+q)r, not k. p=3,q=81,r=1/3,k=1/729. Exact partial sums satisfy the recurrence and the two given terms.
- 7438-a last condition is f(5)≠2f(1)f(2). Enumeration agrees with 252−56−35−10=151.
- 7438-b expectation sum includes integer k=1 through 16. Variance forces n≤4 and nonzero p forces n=3; the omitted noninteger means contribute p=51/8.

## Preservation and offline integration

The new file appends missing IDs to the existing upload pack without modifying its version, baseline lesson objects or storage keys. The previous upload group retains 34 lessons, the new group contains 13, total 47. The existing 26 legacy math cards remain. Shared math renderer, CSS, old data and original problem files are unchanged.

The unchanged renderer supplies local arithmetic/fraction/square-root grading, initially collapsed hints, solutions after a correct root answer, descent/return, previous/next navigation, per-lesson draft/progress storage, installation guidance and cache-readiness checks. New list links return to the new group. New grouping UI strings use i18n keys.

The new asset is added to pack.assets. Readiness therefore checks its cache entry and all 47 lesson query URLs. Installation and cache readiness are separate checks; no physical-device installation is claimed.

During preparation main advanced from 1c2144c to 3fce2ded with a poetry-library deployment. The final tree is based on 3fce2ded, preserving every concurrent poetry change. The final worker is v58, not the previously staged v57. It adds 14 math URLs to the latest 229 entries, for 243 total. Fetch and activation logic are unchanged. All 229 prior entries were retained and retested after rebasing.

## Validation actually performed

- Node checks: complete new-data and worker syntax, 13 originals, 78 helpers, 91 answer nodes, unique IDs, idempotent append, unchanged pack version and 34 preserved baseline fixture objects.
- Enumeration and symbolic checks: function counts, card conditional counts, two-bag outcomes, nondecreasing tuple counts, weighted mean distribution, derivative/partial-sum identities. No handwritten checkmark was used as an answer key.
- The exact current shared renderer and CSS were reproduced locally and hash-checked against GitHub blobs d9578d2c46f5108bafcc030f9b30c8d0dfc8845e and 344d32df44fb173a491bc0360003194af0874001.
- Isolated Chromium: 91 actual new-node form answers, 39 descent/easier/return paths, 11 parser cases; runtime errors 0.
- Layout: 53 checks, including all 13 new originals at 320,360,768,1280 CSS pixels plus a 360px/200%-text partial-sums lesson. No horizontal document overflow. Screenshots show statement and bottom answer controls without clipping.
- Draft restore/isolation, storage-failure warning, install fallback and simulated beforeinstallprompt passed.
- Mock cache readiness reports pending when the new data asset is missing and ready for a complete 47-lesson fixture. Library grouping keeps old34/new13 with no duplicate cards.
- Mock worker/network/CacheStorage tests passed for all13 new query routes and the new asset. Rebased worker retains all229 baseline entries; new total243.
- Final uploaded data/shell/worker blob SHAs match the locally tested files exactly.

## Limits

HTTP and file navigation in the isolated Chromium environment are blocked by administrator policy. DOM tests used about:blank with actual common JS/CSS/new data, 34 old-lesson fixtures, memory storage and cache/install fixtures. They do not establish live-site browser behavior, actual Android installation, persistent device storage or airplane-mode end-to-end success. Pages deployment is checked separately after the commit.
