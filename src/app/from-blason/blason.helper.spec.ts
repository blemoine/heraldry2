import { isThereFur } from './blason.helpers';
import { argent, azure, ermine, gules, vair } from '../model/tincture';

describe('isThereFur', () => {
  it('should return true if the field is vair and the fur search is vair', () => {
    expect(isThereFur({ kind: 'simple', field: { kind: 'plain', tincture: vair } }, 'vair')).toBe(true);
  });
  it('should return false if the field is ermine and the fur search is vair', () => {
    expect(isThereFur({ kind: 'simple', field: { kind: 'plain', tincture: ermine } }, 'vair')).toBe(false);
  });
  it('should return true if the field is ermine, and the ordinary is vair and the fur search is vair', () => {
    expect(
      isThereFur(
        {
          kind: 'simple',
          field: { kind: 'plain', tincture: ermine },
          ordinary: { name: 'bend', tincture: vair, line: 'straight' },
        },
        'vair'
      )
    ).toBe(true);
  });
  it('should return false if the field is ermine, and the ordinary is ermine and the fur search is vair', () => {
    expect(
      isThereFur(
        {
          kind: 'simple',
          field: { kind: 'plain', tincture: ermine },
          ordinary: { name: 'bend', tincture: ermine, line: 'straight' },
        },
        'vair'
      )
    ).toBe(false);
  });
  it('should return false if nothing is a fur', () => {
    expect(
      isThereFur(
        {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          ordinary: { name: 'bend', tincture: argent, line: 'straight' },
        },
        'vair'
      )
    ).toBe(false);
    expect(
      isThereFur(
        {
          kind: 'simple',
          field: { kind: 'plain', tincture: azure },
          ordinary: { name: 'bend', tincture: argent, line: 'straight' },
        },
        'ermine'
      )
    ).toBe(false);
  });

  it('should return true if the charge  armed is ermine', () => {
    expect(
      isThereFur(
        {
          kind: 'simple',
          field: { kind: 'plain', tincture: gules },
          ordinary: { name: 'bend', tincture: azure, line: 'straight' },
          charge: {
            name: 'lion',
            head: null,
            armedAndLangued: ermine,
            tincture: azure,
            attitude: 'rampant',
            tail: null,
            countAndDisposition: { count: 1, disposition: 'default' },
          },
        },
        'ermine'
      )
    ).toBe(true);
  });

  it('should return true if the charge  is vair', () => {
    expect(
      isThereFur(
        {
          kind: 'simple',
          field: { kind: 'plain', tincture: gules },
          ordinary: { name: 'bend', tincture: azure, line: 'straight' },
          charge: {
            name: 'lion',
            head: null,
            armedAndLangued: azure,
            tincture: vair,
            attitude: 'rampant',
            tail: null,
            countAndDisposition: { count: 1, disposition: 'default' },
          },
        },
        'vair'
      )
    ).toBe(true);
  });

  it('should return true if the field  is bendy vair', () => {
    expect(isThereFur({ kind: 'simple', field: { kind: 'bendy', tinctures: [gules, vair], number: 6 } }, 'vair')).toBe(
      true
    );
  });
});
