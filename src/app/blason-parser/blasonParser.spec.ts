import { parseBlason } from './blasonParser';
import {
  argent,
  azure,
  counterErmine,
  counterVair,
  ermine,
  gules,
  or,
  potent,
  sable,
  vair,
  vairEnPale,
  vairEnPoint,
  vert,
} from '../model/tincture';
import { Blason, QuarterlyBlason, SimpleBlason } from '../model/blason';

describe('parseBlason', () => {
  it('should parse a plain blason', () => {
    const result = parseBlason('Gules');

    const expected: Blason = { kind: 'simple', field: { kind: 'plain', tincture: gules } };
    expect(result).toEqual(expected);
  });
  it('should parse a plain blason ignoring the whitespaces', () => {
    const result = parseBlason(` 
     Argent   
      `);

    const expected: Blason = { kind: 'simple', field: { kind: 'plain', tincture: argent } };
    expect(result).toEqual(expected);
  });
  it('should parse a fur blason', () => {
    const result = parseBlason('Ermine');

    const expected: Blason = { kind: 'simple', field: { kind: 'plain', tincture: ermine } };
    expect(result).toEqual(expected);
  });
  it('should parse a party division', () => {
    const result = parseBlason('Per pale vair and azure');

    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'party', per: { name: 'pale', tinctures: [vair, azure], line: 'straight' } },
    };
    expect(result).toEqual(expected);
  });
  it('should parse a party division by bend sinister', () => {
    const result = parseBlason('Per bend sinister ermine and vert');

    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'party', per: { name: 'bendSinister', tinctures: [ermine, vert], line: 'straight' } },
    };
    expect(result).toEqual(expected);
  });
  it('should parse a blason with an ordinary', () => {
    const result = parseBlason('Or, a chief argent');

    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: or },
      ordinary: { name: 'chief', tincture: argent, line: 'straight' },
    };
    expect(result).toEqual(expected);
  });

  it('should parse a simple lion correctly', () => {
    const result = parseBlason('Gules, a lion rampant sable armed and langued azure');
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: gules },
      charge: {
        name: 'lion',
        countAndDisposition: { count: 1, disposition: 'default' },
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
      kind: 'simple',
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
    const expected: Blason = { kind: 'simple', field: { kind: 'bendy', tinctures: [argent, sable], number: 6 } };

    expect(result).toEqual(expected);
  });

  it('should parse correctly a barry field', () => {
    const result = parseBlason('Barry argent and sable');
    const expected: Blason = { kind: 'simple', field: { kind: 'barry', tinctures: [argent, sable], number: 6 } };

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

Argent, Azure, Barry, Barry pily, Bendy, Bendy Sinister, Bendy pily, Bendy pily sinister, Chequy, Chevronny, Counter ermine, Counter potent, Counter vair, Ermine, Erminois, Gironny, Gules, Lozengy, Murrey, Or, Paly, Paly pily, Pean, Per, Potent, Potent en pale, Potent en point, Purpure, Quarterly, Quarterly of nine, Sable, Sanguine, Tenné, Vair, Vair en pale, Vair en point, Vert
`,
    });
  });

  it('should parse the blason of Greece', () => {
    const result = parseBlason('Azure, a cross Argent ');
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: azure },
      ordinary: { name: 'cross', tincture: argent, line: 'straight' },
    };

    expect(result).toEqual(expected);
  });

  it('should parse the blason of Battenberg', () => {
    const result = parseBlason('Argent, two pallets Sable ');
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: argent },
      ordinary: { name: 'pale', tincture: sable, count: 2, line: 'straight' },
    };

    expect(result).toEqual(expected);
  });

  it('should parse the arms of Gwent', () => {
    const result = parseBlason('Per pale Azure and Sable, three Fleurs-de-Lis Or');
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'party', per: { name: 'pale', tinctures: [azure, sable], line: 'straight' } },
      charge: { name: 'fleurdelys', countAndDisposition: { count: 3, disposition: 'default' }, tincture: or },
    };

    expect(result).toEqual(expected);
  });

  it('should parse the arms of Dinefwr modified', () => {
    const result = parseBlason('Gules, a Lion rampant Or, a bordure engrailed azure');

    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: gules },
      charge: {
        name: 'lion',
        attitude: 'rampant',
        tincture: or,
        head: null,
        tail: null,
        armedAndLangued: gules,
        countAndDisposition: { count: 1, disposition: 'default' },
      },
      ordinary: {
        line: 'engrailed',
        name: 'bordure',
        tincture: azure,
      },
    };

    expect(result).toEqual(expected);
  });

  it('should accept a lion without explicit attitude', () => {
    const result = parseBlason('Or, a lion Gules armed and langued Azure');
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: or },
      charge: {
        name: 'lion',
        attitude: 'rampant',
        tincture: gules,
        head: null,
        tail: null,
        armedAndLangued: azure,
        countAndDisposition: { count: 1, disposition: 'default' },
      },
    };
    expect(result).toEqual(expected);
  });

  it('should parse a chief engrailed', () => {
    const result = parseBlason('Azure, a chief engrailed or');
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: azure },
      ordinary: { name: 'chief', line: 'engrailed', tincture: or },
    };
    expect(result).toEqual(expected);
  });

  it('should parse a base invected', () => {
    const result = parseBlason('Azure, a base invected ermine');
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: azure },
      ordinary: { name: 'base', line: 'invected', tincture: ermine },
    };
    expect(result).toEqual(expected);
  });

  it('should parse a base straight', () => {
    const result = parseBlason('Or, a base vair');
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: or },
      ordinary: { name: 'base', line: 'straight', tincture: vair },
    };
    expect(result).toEqual(expected);
  });

  it('should parse a bend sinister engrailed', () => {
    const result = parseBlason('Or, a bend sinister engrailed gules');
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: or },
      ordinary: { name: 'bendSinister', line: 'engrailed', tincture: gules },
    };
    expect(result).toEqual(expected);
  });

  it('should parse 18 roundels', () => {
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: argent },
      charge: {
        name: 'roundel',
        tincture: argent,
        countAndDisposition: { count: 18, disposition: 'default' },
        inside: 'nothing',
      },
    };
    expect(parseBlason('Argent, eighteen roundels argent')).toEqual(expected);
  });

  it('should parse 17 annulets', () => {
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: azure },
      charge: {
        name: 'roundel',
        tincture: sable,
        countAndDisposition: { count: 17, disposition: 'default' },
        inside: 'voided',
      },
    };
    expect(parseBlason('Azure, seventeen annulets sable')).toEqual(expected);
  });

  it('should parse fleurs de lys in pale', () => {
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: azure },
      charge: { name: 'fleurdelys', tincture: or, countAndDisposition: { count: 12, disposition: 'pale' } },
    };
    expect(parseBlason('Azure, twelve fleur de lys in pale or')).toEqual(expected);
  });

  it('should parse Paly argent and gules, a chief engrailed sable, four lozenges in fess azure', () => {
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'paly', tinctures: [argent, gules] },
      ordinary: { name: 'chief', line: 'engrailed', tincture: sable },
      charge: {
        name: 'lozenge',
        tincture: azure,
        countAndDisposition: { count: 4, disposition: 'fess' },
        inside: 'nothing',
      },
    };
    expect(parseBlason('Paly argent and gules, a chief engrailed sable, four lozenges in fess azure')).toEqual(
      expected
    );
  });

  it('should parse  Potent,  a chief gules', () => {
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: potent },
      ordinary: { name: 'chief', line: 'straight', tincture: gules },
    };
    expect(parseBlason('Potent,  a chief gules')).toEqual(expected);
  });

  it('should parse  Paly pily', () => {
    const expected: Blason = { kind: 'simple', field: { kind: 'paly-pily', tinctures: [gules, azure] } };
    expect(parseBlason('Paly pily gules and azure')).toEqual(expected);
  });

  it('should parse Bendy pily', () => {
    const expected: Blason = { kind: 'simple', field: { kind: 'bendy-pily', tinctures: [gules, azure] } };
    expect(parseBlason('Bendy pily gules and azure')).toEqual(expected);
  });

  it('should parse Bendy pily sinister', () => {
    const expected: Blason = { kind: 'simple', field: { kind: 'bendy-pily-sinister', tinctures: [or, azure] } };
    expect(parseBlason('Bendy pily sinister or and azure')).toEqual(expected);
  });

  it('should parse  Counter ermine and vair en point', () => {
    const expected: Blason = { kind: 'simple', field: { kind: 'chequy', tinctures: [counterErmine, vairEnPoint] } };
    expect(parseBlason('Chequy counter ermine and vair en point')).toEqual(expected);
  });

  it('should parse gironny', () => {
    const expected: Blason = { kind: 'simple', field: { kind: 'gironny', tinctures: [or, gules], number: 8 } };
    expect(parseBlason('Gironny or and gules')).toEqual(expected);
  });
  it('should parse gironny of 12', () => {
    const expected: Blason = { kind: 'simple', field: { kind: 'gironny', tinctures: [or, gules], number: 12 } };
    expect(parseBlason('Gironny of twelve or and gules')).toEqual(expected);
  });

  it('should parse  Cross charge', () => {
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: gules },
      charge: {
        name: 'cross',
        limbs: 'hummetty',
        tincture: or,
        countAndDisposition: { count: 3, disposition: 'pale' },
      },
    };
    expect(parseBlason('Gules, three crosses hummetty in pale or ')).toEqual(expected);
  });

  it('should parse cross potent', () => {
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: gules },
      charge: {
        name: 'cross',
        limbs: 'potent',
        tincture: argent,
        countAndDisposition: { count: 1, disposition: 'default' },
      },
    };
    expect(parseBlason('Gules, a cross potent argent')).toEqual(expected);
  });

  it('should support checky', () => {
    const expected: Blason = { kind: 'simple', field: { kind: 'chequy', tinctures: [counterVair, vairEnPale] } };
    expect(parseBlason('Checky counter vair and vair en pale')).toEqual(expected);
  });
  it('should support party per', () => {
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'party', per: { name: 'bend', tinctures: [gules, vert], line: 'straight' } },
    };
    expect(parseBlason('Party per bend gules and vert')).toEqual(expected);
  });
  it('should support gardant', () => {
    const expected: Blason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: gules },
      charge: {
        name: 'lion',
        attitude: 'passant',
        tincture: or,
        head: 'guardant',
        tail: null,
        armedAndLangued: gules,
        countAndDisposition: { count: 1, disposition: 'default' },
      },
    };
    expect(parseBlason('Gules, a lion passant gardant or')).toEqual(expected);
  });

  it('should support quartering', () => {
    const expected: QuarterlyBlason = {
      kind: 'quarterly',
      blasons: [
        { kind: 'simple', field: { kind: 'plain', tincture: gules } },
        { kind: 'simple', field: { kind: 'plain', tincture: azure } },
        { kind: 'simple', field: { kind: 'plain', tincture: vert } },
        { kind: 'simple', field: { kind: 'plain', tincture: ermine } },
      ],
    };

    expect(parseBlason('Quarterly, 1st: gules; 2nd: azure; 3rd: vert; 4th: ermine')).toEqual(expected);
  });

  it('should support without :', () => {
    const expected: QuarterlyBlason = {
      kind: 'quarterly',
      blasons: [
        { kind: 'simple', field: { kind: 'plain', tincture: gules } },
        { kind: 'simple', field: { kind: 'plain', tincture: azure } },
        { kind: 'simple', field: { kind: 'plain', tincture: vert } },
        { kind: 'simple', field: { kind: 'plain', tincture: ermine } },
      ],
    };

    expect(parseBlason('Quarterly, 1st: gules; 2nd azure; third vert; fourth: ermine')).toEqual(expected);
  });

  it('should support without numeral in quaterly', () => {
    const expected: QuarterlyBlason = {
      kind: 'quarterly',
      blasons: [
        { kind: 'simple', field: { kind: 'plain', tincture: gules } },
        { kind: 'simple', field: { kind: 'plain', tincture: azure } },
        { kind: 'simple', field: { kind: 'plain', tincture: vert } },
        { kind: 'simple', field: { kind: 'plain', tincture: ermine } },
      ],
    };

    expect(parseBlason('Quarterly, 1: gules; 2 azure; 3 vert; 4: ermine')).toEqual(expected);
  });

  it('should parse a bendy of ten field', () => {
    const expected: SimpleBlason = { kind: 'simple', field: { kind: 'bendy', number: 10, tinctures: [or, gules] } };

    expect(parseBlason('Bendy of ten or and gules')).toEqual(expected);
  });
  it('should parse a bendy sinister of ten field', () => {
    const expected: SimpleBlason = {
      kind: 'simple',
      field: { kind: 'bendySinister', number: 10, tinctures: [or, gules] },
    };

    expect(parseBlason('Bendy sinister of ten or and gules')).toEqual(expected);
  });

  it('should support the arms of Correze', () => {
    const expected: QuarterlyBlason = {
      kind: 'quarterly',
      blasons: [
        {
          kind: 'simple',
          field: { kind: 'plain', tincture: or },
          charge: {
            name: 'lion',
            attitude: 'passant',
            tincture: gules,
            armedAndLangued: gules,
            countAndDisposition: { count: 2, disposition: 'default' },
            head: null,
            tail: null,
          },
        },
        { kind: 'simple', field: { kind: 'chequy', tinctures: [or, gules] } },
        { kind: 'simple', field: { kind: 'bendy', number: 10, tinctures: [or, gules] } },
        {
          kind: 'simple',
          field: { kind: 'plain', tincture: or },
          charge: {
            name: 'lion',
            attitude: 'rampant',
            tincture: azure,
            armedAndLangued: gules,
            countAndDisposition: { count: 3, disposition: 'default' },
            head: null,
            tail: null,
          },
        },
      ],
    };

    expect(
      parseBlason(
        'Quarterly, first or, two lions passant gules; second chequy or and gules; third bendy of ten or and gules; fourth or, three lions azure armed and langued gules'
      )
    ).toEqual(expected);
  });

  it('should support quarterly with referencing multiple numbers at the same time', () => {
    const expected: QuarterlyBlason = {
      kind: 'quarterly',
      blasons: [
        { kind: 'simple', field: { kind: 'plain', tincture: or } },
        { kind: 'simple', field: { kind: 'plain', tincture: azure } },
        { kind: 'simple', field: { kind: 'plain', tincture: azure } },
        { kind: 'simple', field: { kind: 'plain', tincture: or } },
      ],
    };

    expect(parseBlason('Quarterly, first and fourth or; second and third: azure')).toEqual(expected);
  });

  it('should return an error if quarterly is missing a quarter', () => {
    const error = parseBlason('Quarterly, first and fourth or; second: azure');
    if ('error' in error) {
      expect(error.error).toMatch('Cannot find third blason');
    } else {
      fail(`${error} should be a failure`);
    }
  });

  it('should parse a simple mullet', () => {
    const expected: SimpleBlason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: or },
      charge: {
        name: 'mullet',
        points: 5,
        countAndDisposition: { count: 1, disposition: 'default' },
        tincture: argent,
        inside: 'nothing',
      },
    };

    expect(parseBlason('Or, a mullet argent ')).toEqual(expected);
  });

  it('should parse a mullet with points', () => {
    const expected: SimpleBlason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: or },
      charge: {
        name: 'mullet',
        points: 8,
        countAndDisposition: { count: 2, disposition: 'pale' },
        tincture: gules,
        inside: 'nothing',
      },
    };

    expect(parseBlason('Or, two mullets of eight points in pale gules ')).toEqual(expected);
  });
  it('should parse a mullet pierced', () => {
    const expected: SimpleBlason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: or },
      charge: {
        name: 'mullet',
        points: 5,
        countAndDisposition: { count: 1, disposition: 'default' },
        tincture: gules,
        inside: 'pierced',
      },
    };

    expect(parseBlason('Or, a mullet pierced gules ')).toEqual(expected);
  });
  it('should parse a mullet pierced with points', () => {
    const expected: SimpleBlason = {
      kind: 'simple',
      field: { kind: 'plain', tincture: or },
      charge: {
        name: 'mullet',
        points: 6,
        countAndDisposition: { count: 3, disposition: 'default' },
        tincture: gules,
        inside: 'pierced',
      },
    };

    expect(parseBlason('Or, three mullets of six points pierced gules ')).toEqual(expected);
  });

  it('should parse wavy line', () => {
    const expected: SimpleBlason = {
      kind: 'simple',
      field: { kind: 'party', per: { name: 'bendSinister', line: 'wavy', tinctures: [azure, or] } },
      ordinary: {
        name: 'chief',
        line: 'wavy',
        tincture: argent,
      },
    };

    expect(parseBlason('Per bend sinister wavy azure and or, a chief wavy argent')).toEqual(expected);
  });

  it('should parse embattled line', () => {
    const expected: SimpleBlason = {
      kind: 'simple',
      field: { kind: 'party', per: { name: 'bend', line: 'embattled', tinctures: [azure, or] } },
    };

    expect(parseBlason('Party per bend embattled azure and or')).toEqual(expected);
  });

  it('should parse party per pall', () => {
    const expected: SimpleBlason = {
      kind: 'simple',
      field: { kind: 'party', per: { name: 'pall', line: 'straight', tinctures: [azure, or, ermine] } },
    };

    expect(parseBlason('Party per pall azure, or and ermine')).toEqual(expected);
  });

  it('should parse a quarterly of nine', () => {
    const expected: SimpleBlason = {
      kind: 'simple',
      field: { kind: 'quarterly-of-nine', tinctures: [azure, or] },
    };

    expect(parseBlason('Quarterly of nine azure and or')).toEqual(expected);
  });
});
