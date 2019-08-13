import { Field } from '../model/field';
import { cannotHappen } from '../../utils/cannot-happen';
import { Tincture, tinctures } from '../model/tincture';
import { Line, lines } from '../model/line';
import { parties, Party } from '../model/party';
import { map, raise, Result, zip, zip3 } from '../../utils/result';

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
    const rawNumber = arr[3];
    const maybeNumber: Result<6 | 8 | 10> =
      rawNumber === 6 || rawNumber === 8 || rawNumber === 10
        ? rawNumber
        : raise(`Cannot decode barry number ${rawNumber}`);
    return map(zip(maybeTinctures, maybeNumber), ([tinctures, number]) => ({ kind: 'barry', tinctures, number }));
  } else {
    return raise(`Cannot decode field type with ${arr[0]}`);
  }
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
