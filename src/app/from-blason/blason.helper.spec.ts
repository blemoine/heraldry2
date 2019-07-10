import { stringifyBlason } from './blason.helpers';
import { argent, azure, ermine, gules, or, sable, vair } from '../model/tincture';

describe('stringifyBlason', () => {
  it('should write a plain field first', () => {
    expect(stringifyBlason({ field: gules })).toBe('Gules');
    expect(stringifyBlason({ field: ermine })).toBe('Ermine');
  });

  it('should write the ordinary after the field', () => {
    expect(stringifyBlason({ field: vair, ordinary: {name:'bend', tincture:azure} })).toBe('Vair, a bend azure');
    expect(stringifyBlason({ field: sable, ordinary: {name:'fess', tincture:gules} })).toBe('Sable, a fess gules');
    expect(stringifyBlason({ field: or, ordinary: {name:'chief', tincture:argent} })).toBe('Or, a chief argent');
  })
});
