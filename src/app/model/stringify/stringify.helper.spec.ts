import { argent, azure, ermine, gules, or, purpure, sable, vair, vert } from '../tincture';
import { stringifyBlason } from './stringify.helper';

describe('stringifyBlason', () => {
  it('should write a plain field first', () => {
    expect(stringifyBlason({ kind: 'simple', field: { kind: 'plain', tincture: gules } })).toBe('Gules');
    expect(stringifyBlason({ kind: 'simple', field: { kind: 'plain', tincture: ermine } })).toBe('Ermine');
  });

  it('should write the ordinary after the field', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: vair },
        ordinary: { name: 'bend', tincture: azure, line: 'straight' },
      })
    ).toBe('Vair, a bend azure');
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: sable },
        ordinary: { name: 'fess', tincture: gules, line: 'straight' },
      })
    ).toBe('Sable, a fess gules');
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: or },
        ordinary: { name: 'chief', tincture: argent, line: 'straight' },
      })
    ).toBe('Or, a chief argent');
  });

  it('should write a party field with the colors after', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'party', per: { name: 'fess', tinctures: [gules, or], line: 'straight' } },
      })
    ).toBe('Per fess gules and or');
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'party', per: { name: 'chevron', tinctures: [argent, vert], line: 'straight' } },
      })
    ).toBe('Per chevron argent and vert');
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'party', per: { name: 'pale', tinctures: [ermine, azure], line: 'straight' } },
      })
    ).toBe('Per pale ermine and azure');
  });
  it('should write the party field for a bend sinister', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'party', per: { name: 'bendSinister', tinctures: [gules, or], line: 'straight' } },
      })
    ).toBe('Per bend sinister gules and or');
  });

  it('should write a party field with the colors after and the ordinary', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'party', per: { name: 'pale', tinctures: [sable, argent], line: 'straight' } },
        ordinary: { name: 'pale', tincture: purpure, count: 1, line: 'straight' },
      })
    ).toBe('Per pale sable and argent, a pale purpure');
  });

  it('should write multiple pale as pallets', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: vair },
        ordinary: { name: 'pale', tincture: purpure, count: 2, line: 'straight' },
      })
    ).toBe('Vair, two pallets purpure');
  });

  it('should write a default lion correctly', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: azure },
        charge: {
          name: 'lion',
          tincture: or,
          armedAndLangued: gules,
          attitude: 'rampant',
          tail: null,
          head: null,
          countAndDisposition: { count: 1, disposition: 'default' },
        },
      })
    ).toBe('Azure, a lion rampant or');
  });

  it('should write a lion armed and langued correctly', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: gules },
        charge: {
          name: 'lion',
          tincture: sable,
          armedAndLangued: azure,
          attitude: 'rampant',
          tail: null,
          head: null,
          countAndDisposition: { count: 1, disposition: 'default' },
        },
      })
    ).toBe('Gules, a lion rampant sable armed and langued azure');
  });

  it('should write a lion over an ordinary correctly', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'party', per: { name: 'pale', tinctures: [ermine, azure], line: 'straight' } },
        ordinary: { name: 'chief', tincture: ermine, line: 'straight' },
        charge: {
          name: 'lion',
          tincture: gules,
          armedAndLangued: sable,
          attitude: 'passant',
          tail: 'nowed',
          head: 'guardant',
          countAndDisposition: { count: 1, disposition: 'default' },
        },
      })
    ).toBe(
      'Per pale ermine and azure, a chief ermine, a lion passant guardant tail nowed gules armed and langued sable'
    );
  });

  it('should stringify correctly the England Royal Arms', () => {
    expect(
      stringifyBlason({
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
      })
    ).toBe('Gules, three lions passant guardant in pale or armed and langued azure');
  });

  it('should stringify paly field', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'paly', tinctures: [argent, gules] },
      })
    ).toBe('Paly argent and gules');
  });
  it('should stringify bendy field', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'bendy', tinctures: [ermine, vert], number: 6 },
      })
    ).toBe('Bendy ermine and vert');
  });

  it('should stringify bendy field with a number', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'bendy', tinctures: [ermine, vert], number: 10 },
      })
    ).toBe('Bendy of ten ermine and vert');
  });

  it('should stringify 10 barry field', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'barry', number: 10, tinctures: [vert, purpure], line: 'straight' },
      })
    ).toBe('Barry of ten vert and purpure');
  });

  it('should stringify 6 barry field', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'barry', number: 6, tinctures: [vert, purpure], line: 'straight' },
      })
    ).toBe('Barry vert and purpure');
  });
  it('should stringify 8 barry field', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'barry', number: 8, tinctures: [vert, ermine], line: 'straight' },
      })
    ).toBe('Barry of eight vert and ermine');
  });
  it('should stringify 8 barry field wavy', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'barry', number: 8, tinctures: [vert, ermine], line: 'wavy' },
      })
    ).toBe('Barry of eight wavy vert and ermine');
  });

  it('should stringify an eagle charge', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: or },
        charge: {
          name: 'eagle',
          attitude: 'displayed',
          tincture: sable,
          beakedAndArmed: sable,
          countAndDisposition: { count: 1, disposition: 'default' },
        },
      })
    ).toBe('Or, an eagle displayed sable');
  });

  it('should stringify a straight base', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: or },
        ordinary: {
          name: 'base',
          tincture: sable,
          line: 'straight',
        },
      })
    ).toBe('Or, a base sable');
  });

  it('should stringify a roundel or as bezant', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: purpure },
        charge: {
          name: 'roundel',
          tincture: or,
          countAndDisposition: { count: 3, disposition: 'default' },
          inside: 'nothing',
        },
      })
    ).toBe('Purpure, three bezants');
  });

  it('should stringify a roundel voided as annulet', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: purpure },
        charge: {
          name: 'roundel',
          tincture: or,
          countAndDisposition: { count: 3, disposition: 'default' },
          inside: 'voided',
        },
      })
    ).toBe('Purpure, three annulets or');
  });

  it('should stringify a lozenge voided as mascles', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: purpure },
        charge: {
          name: 'lozenge',
          tincture: or,
          countAndDisposition: { count: 3, disposition: 'default' },
          inside: 'voided',
        },
      })
    ).toBe('Purpure, three mascles or');
  });

  it('should stringify quarterly with repetition', () => {
    expect(
      stringifyBlason({
        kind: 'quarterly',
        blasons: [
          { kind: 'simple', field: { kind: 'plain', tincture: or } },
          { kind: 'simple', field: { kind: 'plain', tincture: azure } },
          { kind: 'simple', field: { kind: 'plain', tincture: azure } },
          { kind: 'simple', field: { kind: 'plain', tincture: or } },
        ],
      })
    ).toEqual('Quarterly, 1st and 4th or; 2nd and 3rd azure');
  });

  it('should render annulets in pale', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: { kind: 'plain', tincture: or },
        charge: {
          name: 'roundel',
          inside: 'voided',
          tincture: gules,
          countAndDisposition: { count: 3, disposition: 'pale' },
        },
      })
    ).toEqual('Or, three annulets in pale gules');
  });

  it('should render tierced per pale', () => {
    expect(
      stringifyBlason({
        kind: 'simple',
        field: {
          kind: 'tierced',
          per: {
            name: 'pale',
            tinctures: [or, azure, ermine],
            line: 'straight',
          },
        },
      })
    ).toEqual('Tierced per pale or, azure and ermine');
  });
});
