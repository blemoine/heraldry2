import fc, { Arbitrary } from 'fast-check';
import { metalAndColours, MetalsAndColours, or, Tincture, tinctures } from '../tincture';
import { Field, fieldKinds, PartyField, TiercedField } from '../field';
import { PallParty, parties, Party } from '../party';
import { ChapePloye, chapePloyeTincturesKind, ChaussePloye, ordinaries, Ordinary } from '../ordinary';
import {
  Charge,
  charges,
  Cross,
  crossLimbs,
  Eagle,
  eagleAttitudes,
  Escutcheon,
  FleurDeLys,
  Lion,
  lionAttitudes,
  lionHeads,
  lionTails,
  Lozenge,
  lozengeInsides,
  Mullet,
  mulletInsides,
  mulletPoints,
  Roundel,
  roundelInsides,
} from '../charge';
import { cannotHappen } from '../../../utils/cannot-happen';
import { availableDivisions, Blason, QuarterlyBlason, SimpleBlason } from '../blason';
import { Line, lines } from '../line';
import { availableDispositions, CountAndDisposition, supportedNumbers } from '../countAndDisposition';
import { Tierced, tierceds } from '../tierced';

const metalAndColoursArb: Arbitrary<MetalsAndColours> = fc.constantFrom(...metalAndColours);
export const tinctureArb: Arbitrary<Tincture> = fc.constantFrom(...tinctures).chain(
  (t): Arbitrary<Tincture> => {
    if (t.name === 'ermined') {
      return fc.record({
        name: fc.constant(t.name),
        field: metalAndColoursArb,
        spot: metalAndColoursArb,
      });
    } else {
      return fc.constant(t);
    }
  }
);
export const lineArb: Arbitrary<Line> = fc.constantFrom(...lines);

const partyArb: Arbitrary<Party> = fc.constantFrom<Party['name']>(...parties).chain<Party>((name) => {
  if (name === 'pall') {
    return fc.record<PallParty>({
      name: fc.constant(name),
      tinctures: fc.tuple(tinctureArb, tinctureArb, tinctureArb),
      line: lineArb,
    });
  } else {
    return fc.record({
      name: fc.constant(name),
      tinctures: fc.tuple(tinctureArb, tinctureArb),
      line: lineArb,
    });
  }
});

const tiercedArb: Arbitrary<Tierced> = fc.constantFrom<Tierced['name']>(...tierceds).chain<Tierced>((name) => {
  return fc.record({
    name: fc.constant(name),
    tinctures: fc.tuple(tinctureArb, tinctureArb, tinctureArb),
    line: lineArb,
  });
});

export const fieldArb: Arbitrary<Field> = fc.constantFrom(...fieldKinds).chain(
  (kind): Arbitrary<Field> => {
    if (kind === 'plain') {
      return tinctureArb.map((tincture) => ({ kind, tincture }));
    } else if (kind === 'barry' || kind === 'bendy' || kind === 'bendySinister') {
      return fc
        .tuple(fc.constantFrom(...([6, 8, 10] as const)), lineArb, tinctureArb, tinctureArb)
        .map(([number, line, ...tinctures]) => ({ kind, line, number, tinctures }));
    } else if (kind === 'gironny') {
      return fc
        .tuple(fc.constantFrom(...([8, 12] as const)), tinctureArb, tinctureArb)
        .map(([number, ...tinctures]) => ({ kind, number, tinctures }));
    } else if (kind === 'party') {
      return partyArb.map((party): PartyField => ({ kind, per: party }));
    } else if (kind === 'tierced') {
      return tiercedArb.map((tierced): TiercedField => ({ kind, per: tierced }));
    } else {
      return fc.tuple(tinctureArb, tinctureArb).map((tinctures) => ({ kind, tinctures }));
    }
  }
);

export const ordinaryArb: Arbitrary<Ordinary> = fc
  .record({
    name: fc.constantFrom(...ordinaries),
    tincture: tinctureArb,
    line: lineArb,
    fimbriated: fc.oneof(metalAndColoursArb, fc.constant(null)),
  })
  .chain(
    (obj): Arbitrary<Ordinary> => {
      if (obj.name === 'pale' || obj.name === 'chevron' || obj.name === 'chevronel') {
        const countableOrdinary = {
          name: obj.name,
          tincture: obj.tincture,
          line: obj.line,
          fimbriated: obj.fimbriated,
        } as const;
        return fc.constantFrom(1 as const, 2 as const).map((count) => ({ ...countableOrdinary, count }));
      } else if (obj.name === 'chape-ploye' || obj.name === 'chausse-ploye') {
        const name = obj.name;

        return fc.constantFrom(...chapePloyeTincturesKind).chain((kind) => {
          if (kind === 'party') {
            return tinctureArb.map((tincture2): ChapePloye | ChaussePloye => {
              return {
                name,
                tinctures: { kind: 'party', per: 'pale', tinctures: [obj.tincture, tincture2] },
                line: obj.line,
                fimbriated: obj.fimbriated,
              };
            });
          } else if (kind === 'simple') {
            return fc.constant({
              name,
              tinctures: { kind: 'simple', tincture: obj.tincture },
              line: obj.line,
              fimbriated: obj.fimbriated,
            });
          } else {
            return cannotHappen(kind);
          }
        });
      } else {
        const name = obj.name;
        return fc.constant({ name, tincture: obj.tincture, line: obj.line, fimbriated: obj.fimbriated });
      }
    }
  );

function createChargeArb(tinctureArb: Arbitrary<Tincture>): Arbitrary<Charge> {
  return fc.constantFrom(...charges).chain((chargeName: Charge['name']) => {
    const countAndDistionArb: Arbitrary<CountAndDisposition> = fc
      .tuple(fc.constantFrom(...supportedNumbers), fc.constantFrom(...availableDispositions))
      .map(([count, disposition]) => ({ count, disposition: count === 1 ? 'default' : disposition }));
    if (chargeName === 'lion') {
      return fc
        .tuple(
          fc.constantFrom(...lionAttitudes),
          fc.option(fc.constantFrom(...lionHeads)),
          fc.option(fc.constantFrom(...lionTails)),
          tinctureArb,
          tinctureArb,
          countAndDistionArb
        )
        .map(
          ([attitude, head, tail, tincture, armedAndLangued, countAndDisposition]): Lion => {
            return {
              name: chargeName,
              attitude,
              head,
              tail,
              tincture,
              armedAndLangued,
              countAndDisposition,
            };
          }
        )
        .map((i): Charge => i);
    } else if (chargeName === 'eagle') {
      return fc
        .tuple(fc.constantFrom(...eagleAttitudes), tinctureArb, tinctureArb, countAndDistionArb)
        .map(
          ([attitude, tincture, beakedAndArmed, countAndDisposition]): Eagle => {
            return {
              name: chargeName,
              attitude,
              tincture,
              beakedAndArmed,
              countAndDisposition,
            };
          }
        )
        .map((i): Charge => i);
    } else if (chargeName === 'fleurdelys') {
      return fc.record<FleurDeLys>({
        name: fc.constant(chargeName),
        tincture: tinctureArb,
        countAndDisposition: countAndDistionArb,
      });
    } else if (chargeName === 'escutcheon') {
      return fc.record<Escutcheon>({
        name: fc.constant(chargeName),
        tincture: tinctureArb,
        countAndDisposition: countAndDistionArb,
      });
    } else if (chargeName === 'lozenge') {
      return fc.record<Lozenge>({
        name: fc.constant(chargeName),
        tincture: tinctureArb,
        countAndDisposition: countAndDistionArb,
        inside: fc.constantFrom(...lozengeInsides),
      });
    } else if (chargeName === 'roundel') {
      return fc.record<Roundel>({
        name: fc.constant(chargeName),
        tincture: tinctureArb,
        countAndDisposition: countAndDistionArb,
        inside: fc.constantFrom(...roundelInsides),
      });
    } else if (chargeName === 'cross') {
      return fc.record<Cross>({
        name: fc.constant(chargeName),
        tincture: tinctureArb,
        countAndDisposition: countAndDistionArb,
        limbs: fc.constantFrom(...crossLimbs),
      });
    } else if (chargeName === 'mullet') {
      return fc.record<Mullet>({
        name: fc.constant(chargeName),
        tincture: tinctureArb,
        countAndDisposition: countAndDistionArb,
        inside: fc.constantFrom(...mulletInsides),
        points: fc.constantFrom(...mulletPoints),
      });
    } else {
      return cannotHappen(chargeName);
    }
  });
}

export const simplifiedChargeArb: Arbitrary<Charge> = createChargeArb(fc.constant(or));
export const chargeArb: Arbitrary<Charge> = createChargeArb(tinctureArb);

const simpleBlasonArb: Arbitrary<SimpleBlason> = fc.tuple(fieldArb, ordinaryArb, chargeArb).map(
  ([field, ordinary, charge]): SimpleBlason => {
    return {
      kind: 'simple',
      field,
      ...(charge ? { charge } : {}),
      ...(ordinary ? { ordinary } : {}),
    };
  }
);

const quarterlyBlasonArb: Arbitrary<QuarterlyBlason> = fc
  .tuple(simpleBlasonArb, simpleBlasonArb, simpleBlasonArb, simpleBlasonArb)
  .map((blasons) => {
    return {
      kind: 'quarterly',
      blasons,
    };
  });

const divisionArb: Arbitrary<Blason['kind']> = fc.constantFrom(...availableDivisions);
export const blasonArb: Arbitrary<Blason> = divisionArb.chain(
  (kind): Arbitrary<Blason> => {
    if (kind === 'simple') {
      return simpleBlasonArb;
    } else if (kind === 'quarterly') {
      return quarterlyBlasonArb;
    } else {
      return cannotHappen(kind);
    }
  }
);
