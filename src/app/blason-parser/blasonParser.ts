import * as P from 'parsimmon';
import { Blason, QuarterlyBlason, SimpleBlason } from '../model/blason';
import { Ordinary, OrdinaryCross } from '../model/ordinary';
import { Charge, Cross } from '../model/charge';
import { ordinaryParser } from './ordinaryParser';
import { chargeParser, crossParser } from './chargeParser';
import { fieldParser } from './fieldParser';

type Language = {
  Blason: (r: AppliedLanguage) => P.Parser<Blason>;
  SimpleBlason: (r: AppliedLanguage) => P.Parser<SimpleBlason>;
};
type AppliedLanguage = { [K in keyof Language]: ReturnType<Language[K]> };

const language: Language = {
  SimpleBlason(): P.Parser<SimpleBlason> {
    // a cross depending on different thing, can be either and ordinary or chager
    const crossParserToObj: P.Parser<{ charge: Cross } | { ordinary: OrdinaryCross }> = crossParser().map(
      (crossPartial) => {
        if ('limbs' in crossPartial) {
          return { charge: crossPartial };
        } else {
          return { ordinary: crossPartial };
        }
      }
    );
    const ordinaryToObj = ordinaryParser().map((ordinary) => ({ ordinary }));
    const chargeToObj = chargeParser().map((charge) => ({ charge }));

    return P.seq(
      fieldParser(),
      P.string(',')
        .trim(P.optWhitespace)
        .chain(() =>
          P.sepBy(
            P.alt(crossParserToObj, ordinaryToObj, chargeToObj).fallback({}),
            P.string(',').trim(P.optWhitespace)
          ).map(
            (
              arr: Array<
                { charge: Cross } | { ordinary: OrdinaryCross } | { ordinary?: Ordinary } | { charge?: Charge }
              >
            ) => arr.reduce((acc, obj): { ordinary?: Ordinary; charge?: Charge } => ({ ...acc, ...obj }), {})
          )
        )
        .fallback({})
    )
      .map(([field, rest]) => ({ kind: 'simple' as const, field, ...rest }))
      .trim(P.optWhitespace);
  },

  Blason(r: AppliedLanguage): P.Parser<Blason> {
    const firstParser = P.alt(P.regexp(/1st:?/i), P.regexp(/1:?/i), P.regexp(/first:?/i))
      .result(1 as const)
      .desc('first');
    const secondParser = P.alt(P.regexp(/2nd:?/i), P.regexp(/2:?/i), P.regexp(/second:?/i))
      .result(2 as const)
      .desc('second');
    const thirdParser = P.alt(P.regexp(/3rd:?/i), P.regexp(/3:?/i), P.regexp(/third:?/i))
      .result(3 as const)
      .desc('third');
    const fourthParser = P.alt(P.regexp(/4th:?/i), P.regexp(/4:?/i), P.regexp(/fourth:?/i))
      .result(4 as const)
      .desc('fourth');

    const ordinalParser: P.Parser<1 | 2 | 3 | 4> = P.alt(firstParser, secondParser, thirdParser, fourthParser);
    const ordinalCombinationParser: P.Parser<Array<1 | 2 | 3 | 4>> = P.sepBy(
      ordinalParser,
      P.string('and').wrap(P.whitespace, P.whitespace)
    );

    const quarterParser: P.Parser<[Array<1 | 2 | 3 | 4>, SimpleBlason]> = P.seq(
      ordinalCombinationParser.skip(P.optWhitespace),
      r.SimpleBlason
    );
    const quarterlyParser: P.Parser<QuarterlyBlason> = P.sepBy(
      quarterParser,
      P.string(';').wrap(P.optWhitespace, P.optWhitespace)
    ).chain((positionsAndBlasons) => {
      const [blason1, blason2, blason3, blason4] = positionsAndBlasons.reduce<Array<SimpleBlason | null>>(
        (acc, [positions, blason]) => {
          positions.forEach((i) => (acc[i - 1] = blason));
          return acc;
        },
        [null, null, null, null]
      );

      if (!blason1) {
        return P.fail('Cannot find first blason');
      } else if (!blason2) {
        return P.fail('Cannot find second blason');
      } else if (!blason3) {
        return P.fail('Cannot find third blason');
      } else if (!blason4) {
        return P.fail('Cannot find fourth blason');
      } else {
        return P.of({ kind: 'quarterly', blasons: [blason1, blason2, blason3, blason4] });
      }
    });
    return P.alt(
      P.regexp(/quarterly,/i)
        .desc('Quarterly')
        .then(P.whitespace)
        .then(quarterlyParser),
      r.SimpleBlason
    );
  },
};

const lexer = P.createLanguage(language);

export function parseBlason(program: string): Blason | { error: string } {
  const result = lexer.Blason.parse(program);
  if (result.status) {
    return result.value;
  } else {
    return { error: P.formatError(program, result) };
  }
}
