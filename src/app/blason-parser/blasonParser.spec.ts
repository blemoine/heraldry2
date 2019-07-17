import { parse } from './blasonParser';
import { argent, azure, ermine, gules, or, sable, vair, vert } from '../model/tincture';
import { Blason } from '../model/blason';

describe('parse', () => {
  it('should parse a plain blason', () => {
    const result = parse('Gules');

    const expected: Blason = { field: { kind: 'plain', tincture: gules } };
    expect(result).toEqual(expected);
  });
  it('should parse a fur blason', () => {
    const result = parse('Ermine');

    const expected: Blason = { field: { kind: 'plain', tincture: ermine } };
    expect(result).toEqual(expected);
  });
  it('should parse a party division', () => {
    const result = parse('Per pale vair and azure');

    const expected: Blason = { field: { kind: 'party', per: { name: 'pale', tinctures: [vair, azure] } } };
    expect(result).toEqual(expected);
  });
  it('should parse a party division by bend sinister', () => {
    const result = parse('Per bend sinister ermine and vert');

    const expected: Blason = { field: { kind: 'party', per: { name: 'bendSinister', tinctures: [ermine, vert] } } };
    expect(result).toEqual(expected);
  });
  it('should parse a blason with an ordinary', () => {
    const result = parse('Or, a chief argent');

    const expected: Blason = { field: { kind: 'plain', tincture: or }, ordinary: { name: 'chief', tincture: argent } };
    expect(result).toEqual(expected);
  });

  it('should parse a simple lion correctly', () => {
    const result = parse('Gules, a lion rampant sable armed and langued azure');
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

  it('should parse correctly the England Royal Arms', () => {
    const result = parse('Gules, three lions passant guardant in pale or armed and langued azure');
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
});
