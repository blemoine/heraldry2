import * as P from 'parsimmon';
import { Blason, QuarterlyBlason, SimpleBlason } from '../model/blason';
import { parties, Party } from '../model/party';
import { Ordinary, OrdinaryCross } from '../model/ordinary';
import { stringifyParty } from '../from-blason/blason.helpers';
import { Charge, Cross } from '../model/charge';
import { BarryField, BendyField, BendySinisterField, Field, PartyField, PlainField } from '../model/field';
import { buildAltParser, constStr, lineParser } from './parser.helper';
import { tinctureParserFromCapitalizedName, tinctureParserFromName } from './tinctureParser';
import { ordinaryParser } from './ordinaryParser';
import { chargeParser, crossParser } from './chargeParser';
import { stringifyNumber } from '../model/countAndDisposition';

type Language = {
  Party: (r: AppliedLanguage) => P.Parser<Party>;
  Field: (r: AppliedLanguage) => P.Parser<Field>;
  Blason: (r: AppliedLanguage) => P.Parser<Blason>;
  SimpleBlason: (r: AppliedLanguage) => P.Parser<SimpleBlason>;
};
type AppliedLanguage = { [K in keyof Language]: ReturnType<Language[K]> };

const partyUnit: P.Parser<Party['name']> = buildAltParser(parties, stringifyParty);

const language: Language = {
  Party(): P.Parser<Party> {
    return P.seq(
      P.alt(constStr('per', 'Party per'), constStr('per'))
        .desc('Per')
        .skip(P.whitespace)
        .then(partyUnit)
        .skip(P.whitespace),
      lineParser.skip(P.whitespace).fallback('straight' as const),

      P.seq(
        tinctureParserFromName,
        P.regex(/and/i)
          .trim(P.whitespace)
          .then(tinctureParserFromName)
      )
    ).map(([name, line, tinctures]): Party => ({ name, tinctures, line }));
  },

  Field(r: AppliedLanguage): P.Parser<Field> {
    const barryParser: P.Parser<BarryField> = P.seq(
      constStr('Barry of')
        .skip(P.whitespace)
        .then(buildAltParser([6, 8, 10] as const, stringifyNumber)),
      P.whitespace.then(tinctureParserFromName).skip(P.whitespace),
      P.regex(/and/i)
        .skip(P.whitespace)
        .then(tinctureParserFromName)
    ).map(
      ([number, tincture1, tincture2]): BarryField => ({ kind: 'barry', number, tinctures: [tincture1, tincture2] })
    );

    const bendyParser: P.Parser<BendyField> = P.seq(
      P.alt(
        constStr('Bendy of')
          .desc('Bendy')
          .skip(P.whitespace)
          .then(buildAltParser([6, 8, 10] as const, stringifyNumber)),
        constStr('Bendy').result(6 as const)
      ),
      P.whitespace.then(tinctureParserFromName).skip(P.whitespace),
      P.regex(/and/i)
        .skip(P.whitespace)
        .then(tinctureParserFromName)
    ).map(
      ([number, tincture1, tincture2]): BendyField => ({ kind: 'bendy', number, tinctures: [tincture1, tincture2] })
    );

    const bendySinisterParser: P.Parser<BendySinisterField> = P.seq(
      P.alt(
        constStr('Bendy Sinister of')
          .desc('Bendy Sinister')
          .skip(P.whitespace)
          .then(buildAltParser([6, 8, 10] as const, stringifyNumber)),
        constStr('Bendy Sinister').result(6 as const)
      ),
      P.whitespace.then(tinctureParserFromName).skip(P.whitespace),
      P.regex(/and/i)
        .skip(P.whitespace)
        .then(tinctureParserFromName)
    ).map(
      ([number, tincture1, tincture2]): BendySinisterField => ({
        kind: 'bendySinister',
        number,
        tinctures: [tincture1, tincture2],
      })
    );

    const palyBendyParser: P.Parser<Exclude<Field, PlainField>> = P.seq(
      P.alt(
        constStr('paly-pily', 'Paly pily'),
        constStr('barry-pily', 'Barry pily'),
        constStr('paly'),

        P.alt(constStr('chequy'), constStr('chequy', 'Checky')).desc('Chequy'),
        constStr('lozengy'),
        constStr('chevronny')
      ),
      P.whitespace.then(tinctureParserFromName).skip(P.whitespace),
      P.regex(/and/i)
        .skip(P.whitespace)
        .then(tinctureParserFromName)
    ).map(
      ([kind, tincture1, tincture2]): Exclude<Field, PlainField | PartyField | BarryField> => ({
        kind,
        tinctures: [tincture1, tincture2],
      })
    );
    return P.alt(
      tinctureParserFromCapitalizedName.map((tincture) => ({
        kind: 'plain',
        tincture,
      })),
      r.Party.map((party) => ({ kind: 'party', per: party })),
      bendySinisterParser,
      bendyParser,
      barryParser,
      palyBendyParser
    );
  },

  SimpleBlason(r: AppliedLanguage): P.Parser<SimpleBlason> {
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
      r.Field,
      P.string(',')
        .trim(P.optWhitespace)
        .chain((_) =>
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
    const firstParser = P.alt(P.regexp(/1st:?/i), P.regexp(/first:?/i))
      .result(1 as const)
      .desc('first');
    const secondParser = P.alt(P.regexp(/2nd:?/i), P.regexp(/second:?/i))
      .result(2 as const)
      .desc('second');
    const thirdParser = P.alt(P.regexp(/3rd:?/i), P.regexp(/third:?/i))
      .result(3 as const)
      .desc('third');
    const fourthParser = P.alt(P.regexp(/4th:?/i), P.regexp(/fourth:?/i))
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
