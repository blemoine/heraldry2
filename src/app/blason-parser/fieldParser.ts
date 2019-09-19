import * as P from 'parsimmon';
import { BarryField, BendyField, BendySinisterField, Field, PartyField, PlainField } from '../model/field';
import { buildAltParser, constStr, lineParser } from './parser.helper';
import { stringifyNumber } from '../model/countAndDisposition';
import { tinctureParserFromCapitalizedName, tinctureParserFromName } from './tinctureParser';
import { parties, Party } from '../model/party';
import { stringifyParty } from '../from-blason/blason.helpers';

const partyUnit: P.Parser<Party['name']> = buildAltParser(parties, stringifyParty);

function partyParser(): P.Parser<Party> {
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
}

export function fieldParser(): P.Parser<Field> {
  const numberedFieldParserGenerator = <A extends string>(baseName: string, value: A) => {
    return P.alt(
      constStr(baseName + ' of')
        .skip(P.whitespace)
        .then(buildAltParser([6, 8, 10] as const, stringifyNumber)),
      constStr(baseName).result(6 as const)
    )
      .desc(baseName)
      .map((i) => [value, i] as const);
  };

  const numberedFieldParser: P.Parser<BarryField | BendyField | BendySinisterField> = P.seq(
    P.alt(
      numberedFieldParserGenerator('Bendy Sinister', 'bendySinister'),
      numberedFieldParserGenerator('Bendy', 'bendy'),
      numberedFieldParserGenerator('Barry', 'barry')
    ),

    P.whitespace.then(tinctureParserFromName).skip(P.whitespace),
    P.regex(/and/i)
      .skip(P.whitespace)
      .then(tinctureParserFromName)
  ).map(([[kind, number], tincture1, tincture2]): BarryField | BendyField | BendySinisterField => ({
    kind,
    number,
    tinctures: [tincture1, tincture2],
  }));

  const palyBendyParser: P.Parser<Exclude<Field, PlainField>> = P.seq(
    P.alt(
      constStr('paly-pily', 'Paly pily'),
      constStr('barry-pily', 'Barry pily'),
      constStr('bendy-pily', 'Bendy pily'),
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
    partyParser().map((party) => ({ kind: 'party', per: party })),
    numberedFieldParser,
    palyBendyParser
  );
}
