import fc, { Arbitrary } from 'fast-check';
import { metalAndColours, MetalsAndColours, or, Tincture, tinctures } from '../tincture';
import { Field, fieldKinds, PartyField, TiercedField } from '../field';
import { PallParty, parties, Party } from '../party';
import { ChapePloye, chapePloyeTincturesKind, ChaussePloye, ordinaries, Ordinary } from '../ordinary';
import { Charge } from '../charge';
import { ChargeName, chargeNames, getChargeClassByName } from '../charge-all';
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
    } else if (kind === 'gironny' || kind === 'gironny-arrondi') {
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

function createChargeArb(tinctureArb: Arbitrary<Tincture>): Arbitrary<Charge> {
  return fc.constantFrom(...chargeNames).chain((chargeName: ChargeName) => {
    const countAndDistionArb: Arbitrary<CountAndDisposition> = fc
      .tuple(fc.constantFrom(...supportedNumbers), fc.constantFrom(...availableDispositions))
      .map(([count, disposition]) => ({ count, disposition: count === 1 ? 'default' : disposition }));
    const chargeClass = getChargeClassByName(chargeName);
    return fc.record<Charge>(
      new chargeClass({
        tincture: tinctureArb,
        countAndDisposition: countAndDistionArb,
      })
    );
  });
}

export const chargeArb: Arbitrary<Charge> = createChargeArb(tinctureArb);
export const simplifiedChargeArb: Arbitrary<Charge> = createChargeArb(fc.constant(or));

export const ordinaryArb: Arbitrary<Ordinary> = fc
  .record({
    name: fc.constantFrom(...ordinaries),
    tincture: tinctureArb,
    line: lineArb,
    fimbriated: fc.oneof(metalAndColoursArb, fc.constant(null)),
  })
  .chain(
    (obj): Arbitrary<Ordinary> => {
      if (obj.name === 'pale' || obj.name === 'fess' || obj.name === 'chevron' || obj.name === 'chevronel') {
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
      } else if (obj.name === 'chief') {
        const name = obj.name;
        return chargeArb.map((charge) => ({
          name,
          tincture: obj.tincture,
          line: obj.line,
          fimbriated: obj.fimbriated,
          charge,
        }));
      } else {
        const name = obj.name;
        return fc.constant({ name, tincture: obj.tincture, line: obj.line, fimbriated: obj.fimbriated });
      }
    }
  );

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
