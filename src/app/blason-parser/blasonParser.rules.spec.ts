import fc, { Arbitrary } from 'fast-check';
import { Blason, Field, PartyField, PlainField } from '../model/blason';
import { Tincture, tinctures } from '../model/tincture';
import { parties, Party } from '../model/party';
import { ordinaries, Ordinary } from '../model/ordinary';
import { Charge, charges, CountAndDisposition, Lion, lionAttitudes, lionHeads, lionTails } from '../model/charge';
import { cannotHappen } from '../../utils/cannot-happen';
import { stringifyBlason } from '../from-blason/blason.helpers';
import { parseBlason } from './blasonParser';

const tinctureArb: Arbitrary<Tincture> = fc.constantFrom(...tinctures);
const plainFieldArb: Arbitrary<PlainField> = tinctureArb.map((tincture) => ({ kind: 'plain', tincture }));
const partiesArb: Arbitrary<Party['name']> = fc.constantFrom(...parties);
const partyFieldArb: Arbitrary<PartyField> = fc.tuple(partiesArb, tinctureArb, tinctureArb).map(
  ([name, tincture1, tincture2]): PartyField => {
    const party: Party = {
      name,
      tinctures: [tincture1, tincture2],
    };
    return {
      kind: 'party',
      per: party,
    };
  }
);
const fieldArb: Arbitrary<Field> = fc.oneof<Field>(plainFieldArb, partyFieldArb);
const ordinaryArb: Arbitrary<Ordinary> = fc
  .tuple(fc.constantFrom(...ordinaries), tinctureArb)
  .map(([name, tincture]) => ({ name, tincture }));

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

const blasonArb: Arbitrary<Blason> = fc.tuple(fieldArb, ordinaryArb, chargeArb).map(
  ([field, ordinary, charge]): Blason => {
    return {
      field,
      ...(charge ? { charge } : {}),
      ...(ordinary ? { ordinary } : {}),
    };
  }
);

describe('parseBlason and stringify', () => {
  it('should be invert of each other', () => {
    fc.assert(
      fc.property(blasonArb, (blason) => {
        expect(parseBlason(stringifyBlason(blason))).toEqual(blason);
      })
    );
  });
});
