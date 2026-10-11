# October 11 math upload review

## Scope and content

- Source: 10 user-uploaded photographs, 1000007435.jpg through 1000007426.jpg, in upload order.
- 21 visible problem locations: 19 complete free-response lessons and 2 deferred because conditions are obscured.
- Every completed lesson has 3 concept branches and 1 easier child per branch: 114 helpers, 133 answerable questions including originals.
- The source problem wording and formulas are transcribed as responsive, selectable black text on white HTML. No regenerated source photographs or cleaned PNG uploads are claimed. Handwritten work and multiple-choice answer rows are not reproduced.
- The statements labeled ㄱ, ㄴ, ㄷ in the continuous-function problem are retained as assertions; the answer is typed rather than selected from numbered options.
- Stable IDs combine date, photograph basename and position, so repeated question numbers cannot overwrite each other or old progress.
- Entry: right-hand math category, math-geometry.html#uploads-20261011. Individual route: math-upload.html?lesson=<id>.
- Existing 26 right-category cards, legacy math renderer, 34 poetry lessons, and their storage keys are unchanged. No unrelated answer keys were edited.

## Source map and independently derived answers

| ID suffix | Photograph / position | Subject | Answer |
| --- | --- | --- | --- |
| 7435-a | 1 left | Midpoints and parity subsequences | 146 |
| 7435-b | 1 right, 30 | Six face-up cards, die toggles | 59 |
| 7434-a | 2 left, 21 | Cubic sign set and second-largest distinct root | 14 |
| 7434-b | 2 right, 22 | Exponential secants | 17 |
| 7433-b | 3 right, 15 | Continuous integral-branch matching | 1/3 |
| 7432-a | 4 upper left, 21 | Derivative away from zero and level sets | 23 |
| 7432-b | 4 upper right, 22 | Exponential/logarithmic intersection sets | 432 |
| 7432-c | 4 lower left, 28 | Die walk conditional on two returns | 14/27 |
| 7431-a | 5 left, 13 | Positive part, continuity and integrals | ㄱ |
| 7430-a | 6 left | Conditional ball sampling | 13/28 |
| 7430-b | 6 right, 29 | Normal-distribution symmetry | 56 |
| 7429-a | 7 left, 20 | Absolute exponential level counts | 7 |
| 7429-b | 7 right, 21 | Strict positivity of all short integrals | 41 |
| 7428-a | 8 left, 15 | Quartic and differentiable absolute value | -5 |
| 7428-b | 8 right, 12 | Parabola tangent and point-line distance | 2sqrt(5)/5 |
| 7427-a | 9 left, 29 | Sample mean support and variance | 19 |
| 7427-b | 9 right, 30 | Digit constraints | 143 |
| 7426-a | 10 left, 21 | One-sided sign limit | 15 |
| 7426-b | 10 right, 22 | Residue-dependent increasing sequence | 169 |

The full stable ID prefixes every suffix above with 20261011-.

## Important reading and reasoning checks

1. Cards initially show their numbers. Even-numbered cards must each be toggled an ODD number of times. Exhaustive enumeration: 4320/46656 = 5/54; p+q = 59.
2. Photo 2 left asks p+q, not p^2+q^2. The isolated a=-6 case is valid because two roots coincide at 2. Extrema sum is 26-12sqrt(2), answer 14.
3. The die-walk restriction applies to throws 2 through 6, not throw 1. Exhaustive conditional enumeration: 168/324 = 14/27. Return times are necessarily 3 and 6.
4. Ball sampling: P(odd sum)=112/225; the joint event is 52/225, conditional probability 13/28.
5. Digit constraints were enumerated over all 9^4 ordered outcomes: 143.
6. Residue sequence dynamic programming confirms m ranges from 73 to 96.
7. Polynomial identities, integral-branch matching and the quadratic short-integral condition were checked symbolically. Handwritten checkmarks were not treated as answer keys.

## Application behavior

- Free-response grading has a bounded arithmetic parser, with fractions, square roots, pi, parentheses and ordered comma-separated values. It never evaluates JavaScript input.
- Hints are initially collapsed. Full solutions appear after a correct original answer. The original-return control is hidden on the original.
- Drafts and progress use guarded localStorage per stable lesson ID. Reset affects only that lesson. Unavailable storage produces a visible warning rather than a crash.
- The new lesson page always displays an install button. Native prompting is used only when beforeinstallprompt has been received; unavailable installation shows guidance, not a fabricated success result.
- An offline-check control requires an active service-worker controller and actual CacheStorage matches for all 19 new lesson URLs and their shared resources before reporting ready.
- Service-worker version v52 adds 23 URLs (19 lesson query URLs and 4 shared resources), preserving all 141 old precache entries. Existing worker fetch/activation behavior is otherwise unchanged.

## Validation performed and limits

- JavaScript syntax checked for complete files.
- Isolated Chromium DOM tests exercised all 133 answers, 57 descent/return flows, 13 parser cases, invalid lesson IDs, per-lesson draft restoration using in-memory storage, and install-event/fallback behavior.
- Runtime JavaScript errors: 0 in those tests.
- Layout widths tested: 320, 360, 768 and 1280 CSS pixels; 360px also with 200% text. No horizontal document overflow. Bottom-of-page screenshot confirmed the answer button and controls were not clipped.
- Service-worker unit tests used mocked network and CacheStorage: 19 offline lesson responses and 3 offline asset responses passed; all 141 prior precache URLs retained.
- Network navigation in the available Chromium environment is blocked by administrator policy. No local-network or live-site browser navigation was claimed to pass. No real Android installation, device storage persistence, or airplane-mode end-to-end test was performed.
- GitHub upload is verified by comparing returned blob SHAs to the exact locally tested files. Pages deployment status is checked separately after the commit.

## Deferred, not invented

- Photograph 3 left: parallelogram and internally tangent circle; the beginning of the angle-ratio condition is physically covered.
- Photograph 5 right, problem 15: cubic/limit conditions and part of the prompt are obscured by the fold and blur.

These two locations are listed as pending in the category, not published as solvable lessons. Clear unobscured retakes are required.
