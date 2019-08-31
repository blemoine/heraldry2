import { Field, fieldKinds } from '../model/field';
import { cannotHappen } from '../../utils/cannot-happen';
import { Tincture, tinctures } from '../model/tincture';
import { Line, lines } from '../model/line';
import { parties, Party } from '../model/party';
import { flatMap, isError, map, raise, Result, zip, zip3, zip4 } from '../../utils/result';
import { ordinaries, Ordinary } from '../model/ordinary';
import {
  Charge,
  charges,
  crossLimbs,
  eagleAttitudes,
  lionAttitudes,
  lionHeads,
  lionTails,
  lozengeInsides,
  roundelInsides,
} from '../model/charge';
import { availableDispositions, CountAndDisposition, supportedNumbers } from '../model/countAndDisposition';
import { Blason, QuarterlyBlason, SimpleBlason } from '../model/blason';

const FIELD_SIZE = 5;
const ORDINARY_SIZE = 4;
const CHARGE_SIZE = 8;
const BLASON_SIZE = FIELD_SIZE + ORDINARY_SIZE + CHARGE_SIZE;

export function encodeBlason(blason: Blason): Uint8Array {
  const result = new Uint8Array(1 + 4 * BLASON_SIZE);
  if (blason.kind === 'simple') {
    result[0] = 1;
    result.set(encodeSimpleBlason(blason), 1);
  } else if (blason.kind === 'quarterly') {
    result[0] = 2;
    result.set(encodeSimpleBlason(blason.blasons[0]), 1);
    result.set(encodeSimpleBlason(blason.blasons[1]), 1 + BLASON_SIZE);
    result.set(encodeSimpleBlason(blason.blasons[2]), 1 + 2 * BLASON_SIZE);
    result.set(encodeSimpleBlason(blason.blasons[3]), 1 + 3 * BLASON_SIZE);
  } else {
    cannotHappen(blason);
  }

  return result;
}

function encodeSimpleBlason(blason: SimpleBlason): Uint8Array {
  const fieldArr = encodeField(blason.field);
  const ordinaryArr = encodeOrdinary(blason.ordinary || null);
  const chargeArr = encodeCharge(blason.charge || null);

  const result = new Uint8Array(BLASON_SIZE);
  result.set(fieldArr);
  result.set(ordinaryArr, FIELD_SIZE);
  result.set(chargeArr, FIELD_SIZE + ORDINARY_SIZE);
  return result;
}

export function decodeBlason(arr: Uint8Array): Result<Blason> {
  if (arr[0] === 1) {
    return decodeSimpleBlason(arr.slice(1, BLASON_SIZE + 1));
  } else if (arr[0] === 2) {
    const maybeBlason1 = decodeSimpleBlason(arr.slice(1, BLASON_SIZE + 1));
    const maybeBlason2 = decodeSimpleBlason(arr.slice(BLASON_SIZE + 1, 2 * BLASON_SIZE + 1));
    const maybeBlason3 = decodeSimpleBlason(arr.slice(2 * BLASON_SIZE + 1, 3 * BLASON_SIZE + 1));
    const maybeBlason4 = decodeSimpleBlason(arr.slice(3 * BLASON_SIZE + 1, 4 * BLASON_SIZE + 1));

    return map(
      zip4(maybeBlason1, maybeBlason2, maybeBlason3, maybeBlason4),
      (blasons): QuarterlyBlason => ({
        kind: 'quarterly',
        blasons,
      })
    );
  } else {
    return raise(`Unexpected blason kind discriminant ${arr[0]}`);
  }
}
export function decodeSimpleBlason(arr: Uint8Array): Result<SimpleBlason> {
  const maybeField = decodeField(arr.slice(0, FIELD_SIZE));
  const maybeOrdinary = decodeOrdinary(arr.slice(FIELD_SIZE, FIELD_SIZE + ORDINARY_SIZE));
  const maybeCharge = decodeCharge(arr.slice(FIELD_SIZE + ORDINARY_SIZE));

  return map(zip3(maybeField, maybeOrdinary, maybeCharge), ([field, ordinary, charge]) => ({
    kind: 'simple',
    field,
    ...(ordinary ? { ordinary } : {}),
    ...(charge ? { charge } : {}),
  }));
}

export function encodeField(field: Field): Uint8Array {
  const result = new Uint8Array(FIELD_SIZE);
  result[0] = encodeFromList(fieldKinds, field.kind);
  if (field.kind === 'plain') {
    result[1] = encodeTincture(field.tincture);
  } else if (field.kind === 'barry' || field.kind === 'bendy' || field.kind === 'bendySinister') {
    result[1] = encodeTincture(field.tinctures[0]);
    result[2] = encodeTincture(field.tinctures[1]);
    result[3] = field.number;
  } else if (field.kind === 'party') {
    result[1] = encodeTincture(field.per.tinctures[0]);
    result[2] = encodeTincture(field.per.tinctures[1]);
    result[3] = encodeLine(field.per.line);
    result[4] = encodePartyName(field.per.name);
  } else {
    result[1] = encodeTincture(field.tinctures[0]);
    result[2] = encodeTincture(field.tinctures[1]);
  }

  return result;
}

export function decodeField(arr: Uint8Array): Result<Field> {
  const kind = decodeFromList(fieldKinds, arr[0]);
  if (kind === 'plain') {
    return map(decodeTincture(arr[1]), (tincture) => ({ kind, tincture }));
  } else if (kind === 'party') {
    const maybeTinctures = zip(decodeTincture(arr[1]), decodeTincture(arr[2]));
    const maybeLine = decodeLine(arr[3]);
    const maybeName = decodePartyName(arr[4]);

    return map(zip3(maybeTinctures, maybeLine, maybeName), ([tinctures, line, name]) => ({
      kind,
      per: {
        line,
        tinctures,
        name,
      },
    }));
  } else if (kind === 'barry' || kind === 'bendy' || kind === 'bendySinister') {
    const maybeTinctures = zip(decodeTincture(arr[1]), decodeTincture(arr[2]));
    const maybeNumber: Result<6 | 8 | 10> = decodeNumber([6, 8, 10], arr[3]);
    return map(zip(maybeTinctures, maybeNumber), ([tinctures, number]) => ({ kind, tinctures, number }));
  } else if (!isError(kind)) {
    const maybeTinctures = zip(decodeTincture(arr[1]), decodeTincture(arr[2]));
    return map(maybeTinctures, (tinctures) => ({ kind, tinctures }));
  } else {
    return kind;
  }
}

export function encodeOrdinary(ordinary: Ordinary | null): Uint8Array {
  const result = new Uint8Array(ORDINARY_SIZE);
  if (!ordinary) {
    return result;
  }
  result[0] = encodeOrdinaryName(ordinary.name);
  result[1] = encodeLine(ordinary.line);
  result[2] = encodeTincture(ordinary.tincture);
  if (ordinary.name === 'pale' || ordinary.name === 'chevron' || ordinary.name === 'chevronel') {
    result[3] = ordinary.count;
  }
  return result;
}

export function decodeOrdinary(arr: Uint8Array): Result<Ordinary | null> {
  if (arr[0] === 0) {
    return null;
  }
  const maybeName = decodeOrdinaryName(arr[0]);
  const maybeLine = decodeLine(arr[1]);
  const maybeTincture = decodeTincture(arr[2]);

  return flatMap(
    zip3(maybeName, maybeLine, maybeTincture),
    ([name, line, tincture]): Result<Ordinary> => {
      if (name === 'pale') {
        const maybeCount: Result<1 | 2> = decodeNumber([1, 2], arr[3]);
        return map(maybeCount, (count) => ({ name, line, tincture, count }));
      } else if (name === 'chevron' || name === 'chevronel') {
        const maybeCount: Result<1 | 2 | 3> = decodeNumber([1, 2, 3], arr[3]);
        return map(maybeCount, (count) => ({ name, line, tincture, count }));
      } else {
        return { name, line, tincture };
      }
    }
  );
}

export function encodeCharge(charge: Charge | null): Uint8Array {
  const result = new Uint8Array(CHARGE_SIZE);
  if (!charge) {
    return result;
  }
  result[0] = encodeChargeName(charge.name);
  result[1] = encodeTincture(charge.tincture);
  const [count, disposition] = encodeCountAndDisposition(charge.countAndDisposition);
  result[2] = count;
  result[3] = disposition;
  if (charge.name === 'lion') {
    result[4] = encodeFromList(lionAttitudes, charge.attitude);
    result[5] = encodeFromList([...lionHeads, null], charge.head);
    result[6] = encodeFromList([...lionTails, null], charge.tail);
    result[7] = encodeTincture(charge.armedAndLangued);
  } else if (charge.name === 'eagle') {
    result[4] = encodeFromList(eagleAttitudes, charge.attitude);
    result[5] = encodeTincture(charge.beakedAndArmed);
  } else if (charge.name === 'lozenge') {
    result[4] = encodeFromList(lozengeInsides, charge.inside);
  } else if (charge.name === 'roundel') {
    result[4] = encodeFromList(roundelInsides, charge.inside);
  } else if (charge.name === 'fleurdelys') {
    // nothing to do for now
  } else if (charge.name === 'cross') {
    // nothing to do for now
    result[4] = encodeFromList(crossLimbs, charge.limbs);
  } else {
    return cannotHappen(charge);
  }
  return result;
}

export function decodeCharge(arr: Uint8Array): Result<Charge | null> {
  if (arr[0] === 0) {
    return null;
  }
  const maybeName = decodeChargeName(arr[0]);
  const maybeTincture = decodeTincture(arr[1]);
  const maybeCountAndDisposition = decodeCountAndDisposition(arr[2], arr[3]);

  return flatMap(
    zip3(maybeName, maybeTincture, maybeCountAndDisposition),
    ([name, tincture, countAndDisposition]): Result<Charge> => {
      if (name === 'lion') {
        const maybeAttitude = decodeFromList(lionAttitudes, arr[4]);
        const maybeHead = decodeFromList([...lionHeads, null], arr[5]);
        const maybeTail = decodeFromList([...lionTails, null], arr[6]);
        const maybeArmedAndLangued = decodeTincture(arr[7]);

        return map(
          zip4(maybeAttitude, maybeHead, maybeTail, maybeArmedAndLangued),
          ([attitude, head, tail, armedAndLangued]) => ({
            name,
            tincture,
            countAndDisposition,
            attitude,
            head,
            tail,
            armedAndLangued,
          })
        );
      } else if (name === 'eagle') {
        const maybeAttitude = decodeFromList(eagleAttitudes, arr[4]);
        const maybeBeakedAndArmed = decodeTincture(arr[5]);
        return map(zip(maybeAttitude, maybeBeakedAndArmed), ([attitude, beakedAndArmed]) => ({
          name,
          tincture,
          countAndDisposition,
          attitude,
          beakedAndArmed,
        }));
      } else if (name === 'lozenge') {
        const maybeInside = decodeFromList(lozengeInsides, arr[4]);
        return map(maybeInside, (inside) => ({ name, tincture, countAndDisposition, inside }));
      } else if (name === 'roundel') {
        const maybeInside = decodeFromList(roundelInsides, arr[4]);
        return map(maybeInside, (inside) => ({ name, tincture, countAndDisposition, inside }));
      } else if (name === 'fleurdelys') {
        return { name, tincture, countAndDisposition };
      } else if (name === 'cross') {
        const maybeLimbs = decodeFromList(crossLimbs, arr[4]);
        return map(maybeLimbs, (limbs) => ({ name, tincture, countAndDisposition, limbs }));
      } else {
        return cannotHappen(name);
      }
    }
  );
}

function decodeNumber<A extends number>(validNum: ReadonlyArray<A>, i: number): Result<A> {
  if (validNum.indexOf(i as A) >= 0) {
    return i as A;
  } else {
    return raise(`Cannot decode ${i} as a valid number ${validNum}`);
  }
}

function encodeOrdinaryName(name: Ordinary['name']): number {
  return encodeFromList(ordinaries, name);
}
function decodeOrdinaryName(i: number): Result<Ordinary['name']> {
  return decodeFromList(ordinaries, i);
}

function encodeChargeName(name: Charge['name']): number {
  return encodeFromList(charges, name);
}
function decodeChargeName(i: number): Result<Charge['name']> {
  return decodeFromList(charges, i);
}

function encodeCountAndDisposition(countAndDisposition: CountAndDisposition): [number, number] {
  return [countAndDisposition.count, encodeFromList(availableDispositions, countAndDisposition.disposition)];
}

function decodeCountAndDisposition(i: number, j: number): Result<CountAndDisposition> {
  const maybeCount = decodeNumber(supportedNumbers, i);
  const maybeDisposition = decodeFromList(availableDispositions, j);

  return map(zip(maybeCount, maybeDisposition), ([count, disposition]) => ({ count, disposition }));
}

function encodeLine(line: Line): number {
  return encodeFromList(lines, line);
}
function decodeLine(i: number): Result<Line> {
  return decodeFromList(lines, i);
}

function encodeTincture(tincture: Tincture): number {
  return tinctures.findIndex((t) => t.name === tincture.name) + 1;
}
function decodeTincture(i: number): Result<Tincture> {
  return tinctures[i - 1] || raise(`Cannot decode tincture ${i}`);
}

function encodePartyName(p: Party['name']): number {
  return encodeFromList(parties, p);
}
function decodePartyName(i: number): Result<Party['name']> {
  return decodeFromList(parties, i);
}

function encodeFromList<A>(list: ReadonlyArray<A>, a: A): number {
  return list.indexOf(a) + 1;
}

function decodeFromList<A>(list: ReadonlyArray<A>, i: number): Result<A> {
  const result = list[i - 1];
  if (result === undefined) {
    return raise(`Cannot decode index ${i} for list ${list}`);
  }
  return result;
}
