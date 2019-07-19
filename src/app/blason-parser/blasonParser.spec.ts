import { parseBlason } from './blasonParser';
import { argent, azure, ermine, gules, or, sable, vair, vert } from '../model/tincture';
import { Blason } from '../model/blason';

describe('parseBlason', () => {
  it('should parseBlason a plain blason', () => {
    const result = parseBlason('Gules');

    const expected: Blason = { field: { kind: 'plain', tincture: gules } };
    expect(result).toEqual(expected);
  });
  it('should parseBlason a fur blason', () => {
    const result = parseBlason('Ermine');

    const expected: Blason = { field: { kind: 'plain', tincture: ermine } };
    expect(result).toEqual(expected);
  });
  it('should parseBlason a party division', () => {
    const result = parseBlason('Per pale vair and azure');

    const expected: Blason = { field: { kind: 'party', per: { name: 'pale', tinctures: [vair, azure] } } };
    expect(result).toEqual(expected);
  });
  it('should parseBlason a party division by bend sinister', () => {
    const result = parseBlason('Per bend sinister ermine and vert');

    const expected: Blason = { field: { kind: 'party', per: { name: 'bendSinister', tinctures: [ermine, vert] } } };
    expect(result).toEqual(expected);
  });
  it('should parseBlason a blason with an ordinary', () => {
    const result = parseBlason('Or, a chief argent');

    const expected: Blason = { field: { kind: 'plain', tincture: or }, ordinary: { name: 'chief', tincture: argent } };
    expect(result).toEqual(expected);
  });

  it('should parseBlason a simple lion correctly', () => {
    const result = parseBlason('Gules, a lion rampant sable armed and langued azure');
    const expected: Blason = {
      field: { kind: 'plain', tincture: gules },
      charge: {
        name: 'lion',
        countAndDisposition: { count: 1 },
        attitude: 'rampant',
        head: null,
        tail: null,
        tincture: sable,
        armedAndLangued: azure,
      },
    };

    expect(result).toEqual(expected);
  });

  it('should parseBlason correctly the England Royal Arms', () => {
    const result = parseBlason('Gules, three lions passant guardant in pale or armed and langued azure');
    const expected: Blason = {
      field: { kind: 'plain', tincture: gules },
      charge: {
        name: 'lion',
        tincture: or,
        armedAndLangued: azure,
        attitude: 'passant',
        tail: null,
        head: 'guardant',
        countAndDisposition: { count: 3, disposition: 'pale' },
      },
    };

    expect(result).toEqual(expected);
  });

  it('should parseBlason correctly a bendy field', () => {
    const result = parseBlason('Bendy argent and sable');
    const expected: Blason = {
      field: { kind: 'bendy', tinctures: [argent, sable] },
    };

    expect(result).toEqual(expected);
  });
});
