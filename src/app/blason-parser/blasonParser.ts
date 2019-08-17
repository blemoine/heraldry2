import * as P from 'parsimmon';
import { Blason } from '../model/blason';
import { parties, Party } from '../model/party';
import { Ordinary, OrdinaryCross } from '../model/ordinary';
import { stringifyParty } from '../from-blason/blason.helpers';
import { Charge, Cross } from '../model/charge';
import { BarryField, Field, PartyField, PlainField } from '../model/field';
import { buildAltParser, constStr, lineParser } from './parser.helper';
import { tinctureParserFromCapitalizedName, tinctureParserFromName } from './tinctureParser';
import { ordinaryParser } from './ordinaryParser';
import { chargeParser, crossParser } from './chargeParser';
import { stringifyNumber } from '../model/countAndDisposition';

type Language = {
  Party: (r: AppliedLanguage) => P.Parser<Party>;
  Field: (r: AppliedLanguage) => P.Parser<Field>;
  Blason: (r: AppliedLanguage) => P.Parser<Blason>;
};
type AppliedLanguage = { [K in keyof Language]: ReturnType<Language[K]> };

const partyUnit: P.Parser<Party['name']> = buildAltParser(parties, stringifyParty);

const language: Language = {
  Party(): P.Parser<Party> {
    return P.seq(
      P.alt(constStr('per', 'Party per'),constStr('per')).desc('Per')
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
    const palyBendyParser: P.Parser<Exclude<Field, PlainField>> = P.seq(
      P.alt(
        constStr('bendySinister', 'Bendy Sinister'),
        constStr('paly-pily', 'Paly pily'),
        constStr('barry-pily', 'Barry pily'),
        constStr('paly'),
        constStr('bendy'),
        P.alt(constStr('chequy'), constStr('chequy', 'Checky')).desc('Chequy'),
        constStr('lozengy')
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
      palyBendyParser,
      barryParser
    );
  },

  Blason(r: AppliedLanguage): P.Parser<Blason> {
    // a cross depending on different thing, can be either and ordinary or chager
    const crossParserToObj: P.Parser<{ charge: Cross } | { ordinary: OrdinaryCross }> = crossParser().map((crossPartial) => {
      if ('limbs' in crossPartial) {
        return { charge: crossPartial };
      } else {
        return { ordinary: crossPartial };
      }
    });
    const ordinaryToObj = ordinaryParser().map((ordinary) => ({ ordinary }));
    const chargeToObj = chargeParser().map((charge) => ({ charge }));

    return P.seq(
      r.Field,
      P.string(',')
        .trim(P.optWhitespace)
        .chain((_) =>
          P.sepBy(P.alt(crossParserToObj, ordinaryToObj, chargeToObj).fallback({}), P.string(',').trim(P.optWhitespace)).map(
            (arr: Array<{ charge: Cross } | { ordinary: OrdinaryCross } | { ordinary?: Ordinary } | { charge?: Charge }>) =>
              arr.reduce((acc, obj): { ordinary?: Ordinary; charge?: Charge } => ({ ...acc, ...obj }), {})
          )
        )
        .fallback({})
    )
      .map(([field, rest]) => ({ field, ...rest }))
      .trim(P.optWhitespace);
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
