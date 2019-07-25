import * as P from 'parsimmon';
import { Blason } from '../model/blason';
import { Tincture } from '../model/tincture';
import { parties, Party } from '../model/party';
import { Ordinary } from '../model/ordinary';
import { stringifyNumber, stringifyParty } from '../from-blason/blason.helpers';
import { Charge } from '../model/charge';
import { BarryField, BendyField, BendySinisterField, ChequyField, Field, PalyField } from '../model/field';
import { buildAltParser, constStr } from './parser.helper';
import { tinctureParserFromCapitalizedName, tinctureParserFromName } from './tinctureParser';
import { ordinaryParser } from './ordinaryParser';
import { chargeParser } from './chargeParser';

type Language = {
  Tincture: (r: AppliedLanguage) => P.Parser<Tincture>;
  Party: (r: AppliedLanguage) => P.Parser<Party>;
  Field: (r: AppliedLanguage) => P.Parser<Field>;
  Ordinary: (r: AppliedLanguage) => P.Parser<Ordinary>;
  Blason: (r: AppliedLanguage) => P.Parser<Blason>;
  Charge: (r: AppliedLanguage) => P.Parser<Charge>;
};
type AppliedLanguage = { [K in keyof Language]: ReturnType<Language[K]> };

const partyUnit: P.Parser<Party['name']> = buildAltParser(parties, stringifyParty);

const language: Language = {
  Tincture(_r: AppliedLanguage): P.Parser<Tincture> {
    return tinctureParserFromName;
  },

  Party(r: AppliedLanguage): P.Parser<Party> {
    return constStr('per')
      .skip(P.whitespace)
      .then(partyUnit)
      .skip(P.whitespace)
      .chain((name) => {
        return P.seq(
          r.Tincture,
          P.regex(/and/i)
            .trim(P.whitespace)
            .then(r.Tincture)
        ).map((tinctures): Party => ({ name, tinctures }));
      });
  },

  Ordinary(): P.Parser<Ordinary> {
    return ordinaryParser();
  },

  Field(r: AppliedLanguage): P.Parser<Field> {
    const barryParser: P.Parser<BarryField> = P.seq(
      constStr('Barry of')
        .skip(P.whitespace)
        .then(buildAltParser([6, 8, 10] as const, stringifyNumber)),
      P.whitespace.then(r.Tincture).skip(P.whitespace),
      P.regex(/and/i)
        .skip(P.whitespace)
        .then(r.Tincture)
    ).map(
      ([number, tincture1, tincture2]): BarryField => ({ kind: 'barry', number, tinctures: [tincture1, tincture2] })
    );
    const palyBendyParser: P.Parser<PalyField | BendyField | BendySinisterField | ChequyField> = P.seq(
      P.alt(constStr('bendySinister', 'Bendy Sinister'), constStr('paly'), constStr('bendy'), constStr('chequy')),
      P.whitespace.then(r.Tincture).skip(P.whitespace),
      P.regex(/and/i)
        .skip(P.whitespace)
        .then(r.Tincture)
    ).map(([kind, tincture1, tincture2]): PalyField | BendyField | BendySinisterField | ChequyField => ({
      kind,
      tinctures: [tincture1, tincture2],
    }));
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

  Charge(): P.Parser<Charge> {
    return chargeParser();
  },

  Blason(r: AppliedLanguage): P.Parser<Blason> {
    return P.seq(
      r.Field,
      P.string(',')
        .trim(P.optWhitespace)
        .chain((_) =>
          P.seq(
            r.Ordinary.map((ordinary) => ({ ordinary }))
              .skip(
                P.string(',')
                  .trim(P.optWhitespace)
                  .or(P.string(''))
              )
              .fallback({}),
            r.Charge.map((charge) => ({ charge })).fallback({})
          ).map(([ordinary, charge]) => ({ ...ordinary, ...charge }))
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
