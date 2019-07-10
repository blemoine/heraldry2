import { isThereFur, stringifyBlason } from './blason.helpers';
import { argent, azure, ermine, gules, or, purpure, sable, vair, vert } from '../model/tincture';

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

  it('should write a party field with the colors after', () => {
    expect(stringifyBlason({ field: { kind: 'party', per: { name: 'fess', tinctures: [gules, or] } } })).toBe(
      'Per fess gules and or'
    );
    expect(stringifyBlason({ field: { kind: 'party', per: { name: 'chevron', tinctures: [argent, vert] } } })).toBe(
      'Per chevron argent and vert'
    );
    expect(stringifyBlason({ field: { kind: 'party', per: { name: 'pale', tinctures: [ermine, azure] } } })).toBe(
      'Per pale ermine and azure'
    );
  });

  it('should write a party field with the colors after and the ordinary', () => {
    expect(
      stringifyBlason({
        field: { kind: 'party', per: { name: 'pale', tinctures: [sable, argent] } },
        ordinary: { name: 'pale', tincture: purpure },
      })
    ).toBe('Per pale sable and argent, a pale purpure');
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
