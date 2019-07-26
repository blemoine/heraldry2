import { parseBlason } from './blasonParser';
import { argent, azure, ermine, gules, or, sable, vair, vert } from '../model/tincture';
import { Blason } from '../model/blason';

describe('parseBlason', () => {
  it('should parse a plain blason', () => {
    const result = parseBlason('Gules');

    const expected: Blason = { field: { kind: 'plain', tincture: gules } };
    expect(result).toEqual(expected);
  });
  it('should parse a plain blason ignoring the whitespaces', () => {
    const result = parseBlason(` 
     Argent   
      `);

    const expected: Blason = { field: { kind: 'plain', tincture: argent } };
    expect(result).toEqual(expected);
  });
  it('should parse a fur blason', () => {
    const result = parseBlason('Ermine');

    const expected: Blason = { field: { kind: 'plain', tincture: ermine } };
    expect(result).toEqual(expected);
  });
  it('should parse a party division', () => {
    const result = parseBlason('Per pale vair and azure');

    const expected: Blason = { field: { kind: 'party', per: { name: 'pale', tinctures: [vair, azure] } } };
    expect(result).toEqual(expected);
  });
  it('should parse a party division by bend sinister', () => {
    const result = parseBlason('Per bend sinister ermine and vert');

    const expected: Blason = { field: { kind: 'party', per: { name: 'bendSinister', tinctures: [ermine, vert] } } };
    expect(result).toEqual(expected);
  });
  it('should parse a blason with an ordinary', () => {
    const result = parseBlason('Or, a chief argent');

    const expected: Blason = { field: { kind: 'plain', tincture: or }, ordinary: { name: 'chief', tincture: argent } };
    expect(result).toEqual(expected);
  });

  it('should parse a simple lion correctly', () => {
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

  it('should parse correctly the England Royal Arms', () => {
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

  it('should parse correctly a bendy field', () => {
    const result = parseBlason('Bendy argent and sable');
    const expected: Blason = {
      field: { kind: 'bendy', tinctures: [argent, sable] },
    };

    expect(result).toEqual(expected);
  });

  it('should return error in human readable way', () => {
    const result = parseBlason('Bandy argent and sable');

    expect(result).toEqual({
      error: `
-- PARSING FAILED --------------------------------------------------

> 1 | Bandy argent and sable
    | ^

Expected one of the following: 

Argent, Azure, Barry of, Bendy, Bendy Sinister, Chequy, Ermine, Gules, Murrey, Or, Paly, Per, Purpure, Sable, Sanguine, Tenné, Vair, Vert
`,
    });
  });

  it('should parse the blason of Greece', () => {
    const result = parseBlason('Azure, a cross Argent ');
    const expected: Blason = {
      field: { kind: 'plain', tincture: azure },
      ordinary: { name: 'cross', tincture: argent },
    };

    expect(result).toEqual(expected);
  });

  it('should parse the blason of Battenberg', () => {
    const result = parseBlason('Argent, two pallets Sable ');
    const expected: Blason = {
      field: { kind: 'plain', tincture: argent },
      ordinary: { name: 'pale', tincture: sable, count: 2 },
    };

    expect(result).toEqual(expected);
  });

  it('should parse the arms of Gwent', () => {
    const result = parseBlason('Per pale Azure and Sable, three Fleurs-de-Lis Or');
    const expected: Blason = {
      field: { kind: 'party', per: { name: 'pale', tinctures: [azure, sable] } },
      charge: { name: 'fleurdelys', count: 3, tincture: or },
    };

    expect(result).toEqual(expected);
  });
});
