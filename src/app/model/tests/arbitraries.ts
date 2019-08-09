import fc, { Arbitrary } from 'fast-check';
import { Tincture, tinctures } from '../tincture';
import {
  BarryField,
  BendyField,
  BendySinisterField,
  ChequyField,
  Field,
  PalyField,
  PartyField,
  PlainField,
} from '../field';
import { parties, Party } from '../party';
import { ordinaries, Ordinary } from '../ordinary';
import {
  Charge,
  charges,
  Eagle,
  eagleAttitudes, FleurDeLys,
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
import { Blason } from '../blason';
import { Line, lines } from '../line';
import { CountAndDisposition, supportedNumbers } from '../countAndDisposition';

const tinctureArb: Arbitrary<Tincture> = fc.constantFrom(...tinctures);
const plainFieldArb: Arbitrary<PlainField> = tinctureArb.map((tincture) => ({ kind: 'plain', tincture }));
const lineArb: Arbitrary<Line> = fc.constantFrom(...lines);
const partyArb: Arbitrary<Party> = fc.record({
  name: fc.constantFrom(...parties),
  tinctures: fc.tuple(tinctureArb, tinctureArb),
  line: lineArb,
});
const palyFieldArb: Arbitrary<PalyField> = fc
  .tuple(tinctureArb, tinctureArb)
  .map((tinctures) => ({ kind: 'paly', tinctures }));
const bendyFieldArb: Arbitrary<BendyField> = fc
  .tuple(tinctureArb, tinctureArb)
  .map((tinctures) => ({ kind: 'bendy', tinctures }));
const bendySinisterFieldArb: Arbitrary<BendySinisterField> = fc
  .tuple(tinctureArb, tinctureArb)
  .map((tinctures) => ({ kind: 'bendySinister', tinctures }));
const partyFieldArb: Arbitrary<PartyField> = partyArb.map((party): PartyField => ({ kind: 'party', per: party }));
const barryFieldArb: Arbitrary<BarryField> = fc
  .tuple(fc.constantFrom(6 as const, 8 as const, 10 as const), tinctureArb, tinctureArb)
  .map(([number, ...tinctures]) => ({ kind: 'barry', number, tinctures }));
const chequyFieldArb: Arbitrary<ChequyField> = fc
  .tuple(tinctureArb, tinctureArb)
  .map((tinctures) => ({ kind: 'chequy', tinctures }));

const fieldArb: Arbitrary<Field> = fc.oneof<Field>(
  plainFieldArb,
  partyFieldArb,
  palyFieldArb,
  bendyFieldArb,
  bendySinisterFieldArb,
  barryFieldArb,
  chequyFieldArb
);

const ordinaryArb: Arbitrary<Ordinary> = fc
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

const chargeArb: Arbitrary<Charge> = fc.constantFrom(...charges).chain((chargeName) => {
  const countAndDistionArb: Arbitrary<CountAndDisposition> = fc
    .tuple(fc.constantFrom(...supportedNumbers), fc.constantFrom('pale' as const, 'default' as const))
    .map(([count, disposition]) => (count === 1 ? { count } : { count, disposition }));
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
      count: fc.constantFrom(...supportedNumbers),
      inside: fc.constantFrom(...lozengeInsides),
    });
  } else if (chargeName === 'roundel') {
    return fc.record<Roundel>({
      name: fc.constant(chargeName),
      tincture: tinctureArb,
      count: fc.constantFrom(...supportedNumbers),
      inside: fc.constantFrom(...roundelInsides),
    });
  } else {
    return cannotHappen(chargeName);
  }
});

export const blasonArb: Arbitrary<Blason> = fc.tuple(fieldArb, ordinaryArb, chargeArb).map(
  ([field, ordinary, charge]): Blason => {
    return {
      field,
      ...(charge ? { charge } : {}),
      ...(ordinary ? { ordinary } : {}),
    };
  }
);
