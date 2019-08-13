import { Field } from '../model/field';
import { cannotHappen } from '../../utils/cannot-happen';
import { Tincture, tinctures } from '../model/tincture';
import { Line, lines } from '../model/line';
import { parties, Party } from '../model/party';
import { flatMap, map, raise, Result, zip, zip3 } from '../../utils/result';
import { ordinaries, Ordinary } from '../model/ordinary';

export function encodeField(field: Field): Uint8Array {
  const result = new Uint8Array(5);
  if (field.kind === 'plain') {
    result[0] = 1;
    result[1] = encodeTincture(field.tincture);
  } else if (field.kind === 'party') {
    result[0] = 2;
    result[1] = encodeTincture(field.per.tinctures[0]);
    result[2] = encodeTincture(field.per.tinctures[1]);
    result[3] = encodeLine(field.per.line);
    result[4] = encodePartyName(field.per.name);
  } else if (field.kind === 'bendy') {
    result[0] = 3;
    result[1] = encodeTincture(field.tinctures[0]);
    result[2] = encodeTincture(field.tinctures[1]);
  } else if (field.kind === 'bendySinister') {
    result[0] = 4;
    result[1] = encodeTincture(field.tinctures[0]);
    result[2] = encodeTincture(field.tinctures[1]);
  } else if (field.kind === 'paly') {
    result[0] = 5;
    result[1] = encodeTincture(field.tinctures[0]);
    result[2] = encodeTincture(field.tinctures[1]);
  } else if (field.kind === 'chequy') {
    result[0] = 6;
    result[1] = encodeTincture(field.tinctures[0]);
    result[2] = encodeTincture(field.tinctures[1]);
  } else if (field.kind === 'barry') {
    result[0] = 7;
    result[1] = encodeTincture(field.tinctures[0]);
    result[2] = encodeTincture(field.tinctures[1]);
    result[3] = field.number;
  } else {
    return cannotHappen(field);
  }

  return result;
}

export function decodeField(arr: Uint8Array): Result<Field> {
  if (arr[0] === 1) {
    return map(decodeTincture(arr[1]), (tincture) => ({ kind: 'plain', tincture }));
  } else if (arr[0] === 2) {
    const maybeTinctures = zip(decodeTincture(arr[1]), decodeTincture(arr[2]));
    const maybeLine = decodeLine(arr[3]);
    const maybeName = decodePartyName(arr[4]);

    return map(zip3(maybeTinctures, maybeLine, maybeName), ([tinctures, line, name]) => ({
      kind: 'party',
      per: {
        line,
        tinctures,
        name,
      },
    }));
  } else if (arr[0] === 3) {
    const maybeTinctures = zip(decodeTincture(arr[1]), decodeTincture(arr[2]));
    return map(maybeTinctures, (tinctures) => ({ kind: 'bendy', tinctures }));
  } else if (arr[0] === 4) {
    const maybeTinctures = zip(decodeTincture(arr[1]), decodeTincture(arr[2]));
    return map(maybeTinctures, (tinctures) => ({ kind: 'bendySinister', tinctures }));
  } else if (arr[0] === 5) {
    const maybeTinctures = zip(decodeTincture(arr[1]), decodeTincture(arr[2]));
    return map(maybeTinctures, (tinctures) => ({ kind: 'paly', tinctures }));
  } else if (arr[0] === 6) {
    const maybeTinctures = zip(decodeTincture(arr[1]), decodeTincture(arr[2]));
    return map(maybeTinctures, (tinctures) => ({ kind: 'chequy', tinctures }));
  } else if (arr[0] === 7) {
    const maybeTinctures = zip(decodeTincture(arr[1]), decodeTincture(arr[2]));
    const maybeNumber: Result<6 | 8 | 10> = decodeNumber([6, 8, 10], arr[3]);
    return map(zip(maybeTinctures, maybeNumber), ([tinctures, number]) => ({ kind: 'barry', tinctures, number }));
  } else {
    return raise(`Cannot decode field type with ${arr[0]}`);
  }
}

export function encodeOrdinary(ordinary: Ordinary | null): Uint8Array {
  const result = new Uint8Array(4);
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

function decodeNumber<A extends number>(validNum: Array<A>, i: number): Result<A> {
  if (validNum.indexOf(i as A) >= 0) {
    return i as A;
  } else {
    return raise(`Cannot decode ${i} as a valid number ${validNum}`);
  }
}

function encodeOrdinaryName(name: Ordinary['name']): number {
  return ordinaries.indexOf(name) + 1;
}
function decodeOrdinaryName(i: number): Result<Ordinary['name']> {
  return ordinaries[i - 1] || raise(`Cannot decode ordinary name ${i}`);
}

function encodeLine(line: Line): number {
  return lines.indexOf(line) + 1;
}
function decodeLine(i: number): Result<Line> {
  return lines[i - 1] || raise(`Cannot decode line ${i}`);
}

function encodeTincture(tincture: Tincture): number {
  return tinctures.findIndex((t) => t.name === tincture.name) + 1;
}
function decodeTincture(i: number): Result<Tincture> {
  return tinctures[i - 1] || raise(`Cannot decode tincture ${i}`);
}

function encodePartyName(p: Party['name']): number {
  return parties.indexOf(p) + 1;
}
function decodePartyName(i: number): Result<Party['name']> {
  return parties[i - 1] || raise(`Cannot decode party name ${i}`);
}
