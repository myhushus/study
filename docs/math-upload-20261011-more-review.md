# October 11 second math upload review

## Scope

Seven user photographs, 1000007425.jpg through 1000007419.jpg, contain 15 complete problems. All 15 are transcribed as selectable black text on white, without handwritten answers or numbered multiple-choice options. Source statements, blank labels and mathematical conditions are retained. No cleaned photograph or regenerated diagram is claimed.

Each original has three concept branches and one easier child per branch: 90 new helpers and 105 new answerable nodes. The existing October 11 pack of 19 originals now contains 34 originals. The 26 legacy right-hand math cards, earlier left-hand math pages, poetry content, existing upload IDs, and the pack version 20261011-v1 are retained. New IDs use the date and photograph position, not the repeated printed question number.

The user explicitly said obscured questions need not be implemented. The two previously pending source questions are excluded from the displayed list; no replacement conditions or retake requests are added.

Entry: math-geometry.html#uploads-20261011. New lessons follow the prior 19. First new lesson: math-upload.html?lesson=20261011-7425-a.

## Independently derived answers

| ID suffix | Photograph / position | Topic | Answer |
| --- | --- | --- | --- |
| 7425-a | 1 left | Positive roots of tangent equations | 9 |
| 7425-b | 1 right, 20 | Exponential/logarithmic curves and secant | 39 |
| 7424-a | 2 left, 28 | Nondecreasing functions with composition condition | 110 |
| 7424-b | 2 right, 30 | Conditional probability of coin toggles | 45 |
| 7423-a | 3 left, 21 | Absolute integral and a monic quartic | 8 |
| 7423-b | 3 right, 22 | Exponential intersections and centroids | 12 |
| 7422-a | 4 left, 15 | Quartic tangent and finite limits | 2 |
| 7422-b | 4 right, 20 | Geometric-series partial sums | 23 |
| 7421-a | 5 upper left, 21 | Piecewise polynomial extremum | 46 |
| 7421-b | 5 upper right, 22 | Exponential/logarithmic parallelogram | 13 |
| 7421-c | 5 lower left, 20 | Intersection of trigonometric solution sets | 14 |
| 7420-a | 6 left, 28 | Indistinguishable colored cards | 342 |
| 7420-b | 6 right, 30 | Conditional probability of recorded digits | 31 |
| 7419-a | 7 left, 12 | Sine rule and circumradius | 6 |
| 7419-b | 7 right, 14 | Sequence driven by running extrema | 18 |

## Mathematical checks

- Tangent roots: b=6, a^2=3; direct symbolic substitution checks both equations and both extra conditions, including the fifth and sixth roots.
- Nondecreasing functions: enumerating all 462 nondecreasing six-tuples gives 110, partitioned by f(2)-f(0) as 20,30,60.
- Coin toggles: exact rational transitions give P(H=1)=117/512, P(H=3)=171/512 and conditional probability 13/32. Face counts 1,1,1,2 are not treated as equally likely choices of one versus two coins.
- Integral: g'(x)=4(x-1)(x+2)^2, g(x)=(x-1)^2(x^2+6x+11), f(-3)=16 and f(-1)=-8. The stationary-point location excludes the other algebraic root 4/3.
- Quartic tangent: f(x)=x^4+x^2-8x+9, not a cubic. With g(x)=-2x+5, f-g=(x-1)^2(x^2+2x+4) and the limit expression cancels to 1/4 for a=2.
- Colored cards: exact enumeration gives 342, split as 182 with both yellow cards between blue cards and 160 with exactly one. The latter is independently counted as twice (56+20+4).
- Recorded digits: enumeration over 12^4 equally likely ordered ball-pair outcomes gives 216 favorable outcomes among 621 conditioned outcomes, hence 8/23 and answer 31.
- Running-extrema sequence: finite sets occur only for k=1,5,9,13,17; cardinalities 7,6,5,4,3 yield k=5,13. Once the range exceeds 17, new maxima grow by 3 indefinitely, excluding all other positive k.
- Symbolic substitution/identity checks also cover centroid conditions, partial sums, the piecewise polynomial, the parallelogram, the trigonometric set and the triangle cosine rule. Handwritten choices are not used as answer keys.

## Application and offline integration

math-upload-more-data.js appends idempotently to the existing pack without altering its version or prior lesson data. It is loaded after math-upload-data.js and before math-upload.js on both the lesson and category pages. The renderer retains per-ID guarded localStorage drafts/progress, typed arithmetic answers, collapsed hints, original-return controls and complete solutions after a correct original answer.

The offline readiness message uses the actual pack count instead of a fixed 19. Required cache checks include the new data script and all 34 lesson query URLs. Service worker v53 adds 16 URLs while retaining all 164 previous precache URLs, for 180 total. Old worker and category reconstructions were checked against their exact original Git blob SHAs before modification. Existing CSS remains byte-identical.

## Validation and limits

- Syntax checks passed for complete JavaScript files.
- Isolated Chromium tests passed all 105 new answer submissions and 45 full branch descent/return round trips; runtime errors: 0.
- Twenty parser tests covered equivalent fractions, radicals, pi, signed values, ordered tuples, rejection of code-like input, division by zero, invalid domains and excessive exponents.
- Draft/solved-state restoration and storage-denial handling were tested with in-memory storage. App-install fallback and a simulated beforeinstallprompt event were exercised.
- Widths 320,360,768,1280 CSS pixels, plus 200% text at width 360, showed no horizontal document overflow. A screenshot of the answer controls at 200% text was visually inspected.
- Mocked service-worker tests passed 15 offline lesson responses and three shared-asset responses and retained every prior precache URL.
- Aggregation with structural fixtures verified 19+15=34, unchanged pack version and no duplicate append. This does not claim a new end-to-end retest of every old lesson.
- File and network navigation in the available Chromium environment are blocked by administrator policy. Browser tests used isolated DOM execution. No actual Android installation, real-device persistent storage, or airplane-mode end-to-end run is claimed.
- GitHub returned blob SHAs matched the exact locally tested new data, renderer, page, category and worker files. Deployment status is checked separately after committing.
