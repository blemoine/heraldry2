import fc, { Arbitrary } from 'fast-check';
import { Tincture, tinctures } from '../tincture';
import { BarryField, BendyField, Field, PalyField, PartyField, PlainField } from '../field';
import { parties, Party } from '../party';
import { ordinaries, Ordinary } from '../ordinary';
import { Charge, charges, CountAndDisposition, Lion, lionAttitudes, lionHeads, lionTails } from '../charge';
import { cannotHappen } from '../../../utils/cannot-happen';
import { Blason } from '../blason';

const tinctureArb: Arbitrary<Tincture> = fc.constantFrom(...tinctures);
const plainFieldArb: Arbitrary<PlainField> = tinctureArb.map((tincture) => ({ kind: 'plain', tincture }));

const partyArb: Arbitrary<Party> = fc.record({
  name: fc.constantFrom(...parties),
  tinctures: fc.tuple(tinctureArb, tinctureArb),
});
const palyFieldArb: Arbitrary<PalyField> = fc
  .tuple(tinctureArb, tinctureArb)
  .map((tinctures) => ({ kind: 'paly', tinctures }));
const bendyFieldArb: Arbitrary<BendyField> = fc
  .tuple(tinctureArb, tinctureArb)
  .map((tinctures) => ({ kind: 'bendy', tinctures }));
const partyFieldArb: Arbitrary<PartyField> = partyArb.map((party): PartyField => ({ kind: 'party', per: party }));
const barryFieldArb: Arbitrary<BarryField> = fc
  .tuple(fc.constantFrom(6 as const, 8 as const, 10 as const), tinctureArb, tinctureArb)
  .map(([number, ...tinctures]) => ({ kind: 'barry', number, tinctures }));
const fieldArb: Arbitrary<Field> = fc.oneof<Field>(
  plainFieldArb,
  partyFieldArb,
  palyFieldArb,
  bendyFieldArb,
  barryFieldArb
);
const ordinaryArb: Arbitrary<Ordinary> = fc.record({ name: fc.constantFrom(...ordinaries), tincture: tinctureArb });

const chargeArb: Arbitrary<Charge> = fc.constantFrom(...charges).chain((chargeName) => {
  if (chargeName === 'lion') {
    return fc
      .tuple(
        fc.constantFrom(...lionAttitudes),
        fc.option(fc.constantFrom(...lionHeads)),
        fc.option(fc.constantFrom(...lionTails)),
        tinctureArb,
        tinctureArb,
        fc.constantFrom<CountAndDisposition>(
          { count: 1 },
          { count: 2, disposition: 'pale' },
          { count: 3, disposition: 'pale' }
        )
      )
      .map(
        ([attitude, head, tail, tincture, armedAndLangued, countAndDisposition]): Lion => {
          return {
            name: 'lion',
            attitude,
            head,
            tail,
            tincture,
            armedAndLangued,
            countAndDisposition,
          };
        }
      );
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