import fc, { Arbitrary } from 'fast-check';
import { Tincture, tinctures } from '../tincture';
import { Field, fieldKinds, PartyField } from '../field';
import { parties, Party } from '../party';
import { ordinaries, Ordinary } from '../ordinary';
import {
  Charge,
  charges,
  Cross,
  crossLimbs,
  Eagle,
  eagleAttitudes,
  FleurDeLys,
  Lion,
  lionAttitudes,
  lionHeads,
  lionTails,
  Lozenge,
  lozengeInsides,
  Roundel,
  roundelInsides,
} from '../charge';
import { cannotHappen } from '../../../utils/cannot-happen';
import { Blason, QuarterlyBlason, SimpleBlason } from '../blason';
import { Line, lines } from '../line';
import { availableDispositions, CountAndDisposition, supportedNumbers } from '../countAndDisposition';

const tinctureArb: Arbitrary<Tincture> = fc.constantFrom(...tinctures);
const lineArb: Arbitrary<Line> = fc.constantFrom(...lines);
const partyArb: Arbitrary<Party> = fc.record({
  name: fc.constantFrom(...parties),
  tinctures: fc.tuple(tinctureArb, tinctureArb),
  line: lineArb,
});

export const fieldArb: Arbitrary<Field> = fc.constantFrom(...fieldKinds).chain(
  (kind): Arbitrary<Field> => {
    if (kind === 'plain') {
      return tinctureArb.map((tincture) => ({ kind, tincture }));
    } else if (kind === 'barry' || kind === 'bendy' || kind === 'bendySinister') {
      return fc
        .tuple(fc.constantFrom(...([6, 8, 10] as const)), tinctureArb, tinctureArb)
        .map(([number, ...tinctures]) => ({ kind, number, tinctures }));
    } else if (kind === 'party') {
      return partyArb.map((party): PartyField => ({ kind, per: party }));
    } else {
      return fc.tuple(tinctureArb, tinctureArb).map((tinctures) => ({ kind, tinctures }));
    }
  }
);

export const ordinaryArb: Arbitrary<Ordinary> = fc
  .record({ name: fc.constantFrom(...ordinaries), tincture: tinctureArb, line: lineArb })
  .chain(
    (obj): Arbitrary<Ordinary> => {
      if (obj.name === 'pale' || obj.name === 'chevron' || obj.name === 'chevronel') {
        const countableOrdinary = {
          name: obj.name,
          tincture: obj.tincture,
          line: obj.line,
        } as const;
        return fc.constantFrom(1 as const, 2 as const).map((count) => ({ ...countableOrdinary, count }));
      } else {
        const name = obj.name;
        return fc.constant({ name, tincture: obj.tincture, line: obj.line });
      }
    }
  );

export const chargeArb: Arbitrary<Charge> = fc.constantFrom(...charges).chain((chargeName) => {
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
  } else {
    return cannotHappen(chargeName);
  }
});

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

export const blasonArb: Arbitrary<Blason> = fc.oneof<Blason>(simpleBlasonArb, quarterlyBlasonArb);
