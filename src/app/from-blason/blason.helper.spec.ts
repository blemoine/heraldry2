import { isThereFur, stringifyBlason } from './blason.helpers';
import { argent, azure, ermine, gules, or, sable, vair } from '../model/tincture';

describe('stringifyBlason', () => {
  it('should write a plain field first', () => {
    expect(stringifyBlason({ field: { kind: 'plain', tincture: gules } })).toBe('Gules');
    expect(stringifyBlason({ field: { kind: 'plain', tincture: ermine } })).toBe('Ermine');
  });

  it('should write the ordinary after the field', () => {
    expect(
      stringifyBlason({ field: { kind: 'plain', tincture: vair }, ordinary: { name: 'bend', tincture: azure } })
    ).toBe('Vair, a bend azure');
    expect(
      stringifyBlason({ field: { kind: 'plain', tincture: sable }, ordinary: { name: 'fess', tincture: gules } })
    ).toBe('Sable, a fess gules');
    expect(
      stringifyBlason({ field: { kind: 'plain', tincture: or }, ordinary: { name: 'chief', tincture: argent } })
    ).toBe('Or, a chief argent');
  });
});

describe('isThereFur', () => {
  it('should return true if the field is vair and the fur search is vair', () => {
    expect(isThereFur({ field: { kind: 'plain', tincture: vair } }, 'vair')).toBe(true);
  });
  it('should return false if the field is ermine and the fur search is vair', () => {
    expect(isThereFur({ field: { kind: 'plain', tincture: ermine } }, 'vair')).toBe(false);
  });
  it('should return true if the field is ermine, and the ordinary is vair and the fur search is vair', () => {
    expect(
      isThereFur({ field: { kind: 'plain', tincture: ermine }, ordinary: { name: 'bend', tincture: vair } }, 'vair')
    ).toBe(true);
  });
  it('should return false if the field is ermine, and the ordinary is ermine and the fur search is vair', () => {
    expect(
      isThereFur({ field: { kind: 'plain', tincture: ermine }, ordinary: { name: 'bend', tincture: ermine } }, 'vair')
    ).toBe(false);
  });
  it('should return false if nothing is a fur', () => {
    expect(
      isThereFur({ field: { kind: 'plain', tincture: azure }, ordinary: { name: 'bend', tincture: argent } }, 'vair')
    ).toBe(false);
    expect(
      isThereFur({ field: { kind: 'plain', tincture: azure }, ordinary: { name: 'bend', tincture: argent } }, 'ermine')
    ).toBe(false);
  });
});
