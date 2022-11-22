import { check } from '../../utils';

describe('TRIGONOMETRIC FUNCTIONS implicit arguments', () => {
  test(`\\cos x + 1`, () =>
    expect(check('\\cos x + 1')).toMatchInlineSnapshot(`
      latex     = ["Add", ["Cos", "x"], 1]
      ["Add", ["Cos", "x"], 1]
    `));
  test(`\\cos x - \\sin x`, () =>
    expect(check('\\cos x - \\sin x')).toMatchInlineSnapshot(`
      latex     = ["Subtract", ["Cos", "x"], ["Sin", "x"]]
      ["Subtract", ["Cos", "x"], ["Sin", "x"]]
    `));
  test(`\\cos \\frac{x}{2}^2`, () =>
    expect(check('\\cos \\frac{x}{2}^2')).toMatchInlineSnapshot(`
      latex     = ["Cos", ["Power", ["Divide", "x", 2], 2]]
      box       = ["Cos", ["Multiply", ["Square", ["Rational", 1, 2]], ["Square", "x"]]]
      canonical = ["Cos", ["Multiply", ["Rational", 1, 4], ["Square", "x"]]]
      simplify  = [
        "Sin",
        [
          "Add",
          ["Multiply", ["Rational", 1, 2], "Pi"],
          ["Multiply", ["Rational", 1, 4], ["Square", "x"]]
        ]
      ]
      evaluate  = ["Cos", ["Multiply", ["Rational", 1, 4], ["Square", "x"]]]
      N-auto    = ["Cos", ["Multiply", 0.25, ["Square", "x"]]]
    `));
});

describe('TRIGONOMETRIC FUNCTIONS inverse, prime', () => {
  test(`\\sin^{-1}'(x)`, () =>
    expect(check("\\sin^{-1}'(x)")).toMatchInlineSnapshot(`
      latex     = [["Derivative", 1, "Arcsin"], "x"]
      [["Derivative", 1, "Arcsin"], "x"]
    `));
  test(`\\sin^{-1}''(x)`, () =>
    expect(check("\\sin^{-1}''(x)")).toMatchInlineSnapshot(`
      latex     = [["Derivative", 2, "Arcsin"], "x"]
      [["Derivative", 2, "Arcsin"], "x"]
    `));
  // test(`\\cos^{-1\\doubleprime}(x)`, () =>
  //   expect(check('\\cos^{-1\\doubleprime}(x)')).toMatchInlineSnapshot(`
  //     latex     = [["Derivative", 2, "Cos"], "x"]
  //     box       = [["Derivative", 2, "Cos"], "x"]
  //     simplify  = ["Derivative", 2, "Cos"]
  //   `));
  test(`\\cos^{-1}\\doubleprime(x)`, () =>
    expect(check('\\cos^{-1}\\doubleprime(x)')).toMatchInlineSnapshot(`
      latex     = [["Derivative", 2, "Arccos"], "x"]
      [["Derivative", 2, "Arccos"], "x"]
    `));
});

describe('TRIGONOMETRIC FUNCTIONS', () => {
  test(`\\cos(k\\pi)`, () =>
    expect(check('\\cos(k\\pi)')).toMatchInlineSnapshot(`
      latex     = ["Cos", ["Multiply", "k", "Pi"]]
      box       = ["Cos", ["Multiply", "Pi", "k"]]
      N-auto    = [
        "Cos",
        [
          "Multiply",
          "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117068",
          "k"
        ]
      ]
      N-mach    = ["Cos", ["Multiply", 3.141592653589793, "k"]]
    `));
  test(`\\cos(\\frac{\\pi}{5})`, () =>
    expect(check('\\cos(\\frac{\\pi}{5})')).toMatchInlineSnapshot(`
      latex     = ["Cos", ["Divide", "Pi", 5]]
      box       = ["Cos", ["Multiply", ["Rational", 1, 5], "Pi"]]
      simplify  = ["Multiply", ["Rational", 1, 4], ["Add", 1, ["Sqrt", 5]]]
      N-auto    = 0.8090169943749474241022934171828190588601545899028814310677243113526302314094512248536036020946955687
      N-mach    = 0.8090169943749475
    `));
});

describe('TRIGONOMETRIC DEGREES', () => {
  test('\\cos(30\\deg)', () =>
    expect(check('\\cos(30\\deg)')).toMatchInlineSnapshot(`
      latex     = ["Cos", ["Degrees", 30]]
      box       = ["Cos", ["Multiply", ["Rational", 1, 6], "Pi"]]
      simplify  = ["Multiply", ["Rational", 1, 2], ["Sqrt", 3]]
      N-auto    = 0.8660254037844386467637231707529361834714026269051903140279034897259665084544000185405730933786242878
      N-mach    = 0.8660254037844387
    `));

  test('\\cos(30\\degree)', () =>
    expect(check('\\cos(30\\degree)')).toMatchInlineSnapshot(`
      latex     = ["Cos", ["Degrees", 30]]
      box       = ["Cos", ["Multiply", ["Rational", 1, 6], "Pi"]]
      simplify  = ["Multiply", ["Rational", 1, 2], ["Sqrt", 3]]
      N-auto    = 0.8660254037844386467637231707529361834714026269051903140279034897259665084544000185405730933786242878
      N-mach    = 0.8660254037844387
    `));

  test('\\cos(30^\\circ)', () =>
    expect(check('\\cos(30^\\circ)')).toMatchInlineSnapshot(`
      latex     = ["Cos", ["Degrees", 30]]
      box       = ["Cos", ["Multiply", ["Rational", 1, 6], "Pi"]]
      simplify  = ["Multiply", ["Rational", 1, 2], ["Sqrt", 3]]
      N-auto    = 0.8660254037844386467637231707529361834714026269051903140279034897259665084544000185405730933786242878
      N-mach    = 0.8660254037844387
    `));

  test('\\cos(\\ang{30})', () =>
    expect(check('\\cos(\\ang{30})')).toMatchInlineSnapshot(`
      latex     = ["Cos", ["Degrees", 30]]
      box       = ["Cos", ["Multiply", ["Rational", 1, 6], "Pi"]]
      simplify  = ["Multiply", ["Rational", 1, 2], ["Sqrt", 3]]
      N-auto    = 0.8660254037844386467637231707529361834714026269051903140279034897259665084544000185405730933786242878
      N-mach    = 0.8660254037844387
    `));
});
