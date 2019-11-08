import { areTinctureEquals, counterErmine, ermine, erminois, gules, isErmine, or, pean, Tincture } from '../tincture';
import { stringifyNumber, SupportedNumber } from '../countAndDisposition';
import { Ordinary } from '../ordinary';
import { cannotHappen } from '../../../utils/cannot-happen';
import { Party } from '../party';
import { Field } from '../field';
import { capitalizeFirstLetter } from '../../../utils/strings';
import { Charge } from '../charge';
import { Blason, SimpleBlason } from '../blason';
import { isNotNull } from '../../../utils/isNotNull';
import { isEqual } from 'lodash';
import { Line } from '../line';

export function stringifyLine(line: Line): string {
  if (line === 'embattled-counter-embattled') {
    return 'embattled counter-embattled';
  } else {
    return line;
  }
}

export function stringifyTinctureWithAlternative(tincture: Tincture): Array<string> {
  if (isErmine(tincture)) {
    if (areTinctureEquals(tincture, ermine)) {
      return ['ermine'];
    } else if (areTinctureEquals(tincture, counterErmine)) {
      return ['counter ermine', 'counter-ermine'];
    } else if (areTinctureEquals(tincture, pean)) {
      return ['pean'];
    } else if (areTinctureEquals(tincture, erminois)) {
      return ['erminois'];
    } else {
      return [`${tincture.field.name} ermined ${tincture.spot.name}`];
    }
  } else if (tincture.name === 'counter-vair') {
    return ['counter vair', tincture.name];
  } else if (tincture.name === 'vair-en-pale') {
    return ['vair en pale', tincture.name];
  } else if (tincture.name === 'vair-en-point') {
    return ['vair en point', tincture.name];
  } else if (tincture.name === 'counter-potent') {
    return ['counter potent', tincture.name];
  } else if (tincture.name === 'potent-en-pale') {
    return ['potent en pale', tincture.name];
  } else if (tincture.name === 'potent-en-point') {
    return ['potent en point', tincture.name];
  } else if (tincture.name === 'tenne') {
    return ['tenné', 'tenne'];
  } else {
    return [tincture.name];
  }
}

export function stringifyTincture(tincture: Tincture): string {
  return stringifyTinctureWithAlternative(tincture)[0];
}

function stringifyOrdinal(i: number) {
  if (i === 1) {
    return '1st';
  } else if (i === 2) {
    return '2nd';
  } else if (i === 3) {
    return '3rd';
  } else if (i === 4) {
    return '4th';
  } else {
    throw new Error(`Number ${i} ordinal stringification is unsupported yet`);
  }
}

function pluralize(str: string, count: SupportedNumber): string {
  if (count === 1) {
    return str;
  } else {
    if (str === 'fleur de lys') {
      return 'fleurs de lys';
    } else if (str === 'cross') {
      return 'crosses';
    } else {
      return str + 's';
    }
  }
}

export function stringifyOrdinaryName(name: Ordinary['name']): string {
  if (name === 'bendSinister') {
    return 'bend sinister';
  } else if (name === 'chape-ploye') {
    return 'chapé ployé';
  } else if (name === 'pall-inverted') {
    return 'pall inverted';
  } else if (name === 'chausse') {
    return 'chaussé';
  } else if (name === 'chausse-ploye') {
    return 'chaussé ployé';
  } else {
    return name;
  }
}

function stringifyOrdinary(ordinary: Ordinary): string {
  if (ordinary.name === 'pale' || ordinary.name === 'chevron' || ordinary.name === 'chevronel') {
    let result = ordinary.count === 1 ? 'a' : stringifyNumber(ordinary.count);
    if (ordinary.count === 1) {
      result += ' ' + stringifyOrdinaryName(ordinary.name) + ' ';
    } else {
      if (ordinary.name === 'pale') {
        result += ' pallets ';
      } else if (ordinary.name === 'chevron') {
        result += ' chevrons ';
      } else if (ordinary.name === 'chevronel') {
        result += ' chevronels ';
      } else {
        return cannotHappen(ordinary);
      }
    }
    if (ordinary.line !== 'straight') {
      result += stringifyLine(ordinary.line) + ' ';
    }
    result += stringifyTincture(ordinary.tincture);
    if (ordinary.fimbriated) {
      result += ' fimbriated ' + stringifyTincture(ordinary.fimbriated);
    }
    return result;
  } else if (ordinary.name === 'chape-ploye' || ordinary.name === 'chausse-ploye') {
    let result = stringifyOrdinaryName(ordinary.name) + ' ';
    if (ordinary.line !== 'straight') {
      result += stringifyLine(ordinary.line) + ' ';
    }
    if (ordinary.tinctures.kind === 'party') {
      result += ' per pale ';
      result += stringifyTincture(ordinary.tinctures.tinctures[0]);
      result += ' and ';
      result += stringifyTincture(ordinary.tinctures.tinctures[1]);
    } else if (ordinary.tinctures.kind === 'simple') {
      result += stringifyTincture(ordinary.tinctures.tincture);
    } else {
      return cannotHappen(ordinary.tinctures);
    }
    if (ordinary.fimbriated) {
      result += ' fimbriated ' + stringifyTincture(ordinary.fimbriated);
    }
    return result;
  } else if (ordinary.name === 'chausse') {
    let result = stringifyOrdinaryName(ordinary.name) + ' ';
    if (ordinary.line !== 'straight') {
      result += stringifyLine(ordinary.line) + ' ';
    }
    result += stringifyTincture(ordinary.tincture);
    if (ordinary.fimbriated) {
      result += ' fimbriated ' + stringifyTincture(ordinary.fimbriated);
    }
    return result;
  } else {
    const article = ordinary.name === 'orle' ? 'an ' : ordinary.name === 'flaunches' ? '' : 'a ';
    let result = article + stringifyOrdinaryName(ordinary.name) + ' ';
    if (ordinary.line !== 'straight') {
      result += stringifyLine(ordinary.line) + ' ';
    }
    result += stringifyTincture(ordinary.tincture);
    if (ordinary.fimbriated) {
      result += ' fimbriated ' + stringifyTincture(ordinary.fimbriated);
    }
    return result;
  }
}

export function stringifyParty(partyName: Party['name']): string {
  if (partyName === 'bendSinister') {
    return 'bend sinister';
  } else if (partyName === 'chevron-reversed') {
    return 'chevron reversed';
  } else if (partyName === 'pile-arched') {
    return 'pile arched';
  } else if (partyName === 'pile-reversed') {
    return 'pile reversed';
  } else if (partyName === 'pile-reversed-arched') {
    return 'pile reversed arched';
  } else if (partyName === 'pile-bendwise') {
    return 'pile bendwise';
  } else if (partyName === 'pile-bendwise-sinister') {
    return 'pile bendwise sinister';
  } else if (
    partyName === 'bend' ||
    partyName === 'fess' ||
    partyName === 'pale' ||
    partyName === 'chevron' ||
    partyName === 'cross' ||
    partyName === 'saltire' ||
    partyName === 'pall' ||
    partyName === 'pile'
  ) {
    return partyName;
  } else {
    return cannotHappen(partyName);
  }
}

export function stringifyFieldKind(field: Field['kind']): string {
  if (field === 'plain') {
    return 'plain';
  } else if (field === 'bendy') {
    return 'bendy';
  } else if (field === 'bendySinister') {
    return 'bendy sinister';
  } else if (field === 'paly') {
    return 'paly';
  } else if (field === 'barry') {
    return 'barry';
  } else if (field === 'party') {
    return 'party per';
  } else if (field === 'tierced') {
    return 'tierced per';
  } else if (field === 'chequy') {
    return 'chequy';
  } else if (field === 'lozengy') {
    return 'lozengy';
  } else if (field === 'paly-pily') {
    return 'paly pily';
  } else if (field === 'barry-pily') {
    return 'barry pily';
  } else if (field === 'bendy-pily') {
    return 'bendy pily';
  } else if (field === 'bendy-pily-sinister') {
    return 'bendy pily sinister';
  } else if (field === 'chevronny') {
    return 'chevronny';
  } else if (field === 'chevronny-reversed') {
    return 'chevronny reversed';
  } else if (field === 'gironny') {
    return 'gironny';
  } else if (field === 'quarterly-of-nine') {
    return 'quarterly of nine';
  } else if (field === 'lozengy-bendwise') {
    return 'lozengy bendwise';
  } else if (field === 'embrassee-a-dexter') {
    return 'embrassee a dexter';
  } else if (field === 'embrassee-a-sinister') {
    return 'embrassee a sinister';
  } else if (field === 'lozenge-throughout') {
    return 'lozenge throughout';
  } else if (field === 'lozenge-throughout-arched') {
    return 'lozenge throughout arched';
  } else if (field === 'barry-and-per-pale') {
    return 'barry and per pale';
  } else if (field === 'bendy-and-per-bend-sinister') {
    return 'bendy and per bend sinister';
  } else if (field === 'bendy-sinister-and-per-bend') {
    return 'bendy sinister and per bend';
  } else if (field === 'bendy-and-per-pale') {
    return 'bendy and per pale';
  } else if (field === 'barry-and-per-chevron-throughout') {
    return 'barry and per chevron throughout';
  } else {
    return cannotHappen(field);
  }
}

function stringifyField(field: Field, shouldCapitalize: boolean): string {
  if (field.kind === 'party') {
    const perName = stringifyParty(field.per.name);
    const stringifiedTinctures = field.per.tinctures.map((t) => stringifyTincture(t));

    const tinctures =
      stringifiedTinctures.slice(0, stringifiedTinctures.length - 1).join(', ') +
      ' and ' +
      stringifiedTinctures[stringifiedTinctures.length - 1];
    let result = 'Per ' + perName + ' ';
    if (field.per.line !== 'straight') {
      result += stringifyLine(field.per.line) + ' ';
    }
    result += tinctures;
    return result;
  } else if (field.kind === 'tierced') {
    const perName = stringifyParty(field.per.name);
    const stringifiedTinctures = field.per.tinctures.map((t) => stringifyTincture(t));

    const tinctures =
      stringifiedTinctures.slice(0, stringifiedTinctures.length - 1).join(', ') +
      ' and ' +
      stringifiedTinctures[stringifiedTinctures.length - 1];
    let result = 'Tierced per ' + perName + ' ';
    if (field.per.line !== 'straight') {
      result += stringifyLine(field.per.line) + ' ';
    }
    result += tinctures;
    return result;
  } else {
    const rawFieldStr = stringifyFieldKind(field.kind);
    const fieldStr = shouldCapitalize ? capitalizeFirstLetter(rawFieldStr) : rawFieldStr;
    if (field.kind === 'plain') {
      const tincturesStr = stringifyTincture(field.tincture);
      return shouldCapitalize ? capitalizeFirstLetter(tincturesStr) : tincturesStr;
    } else if (
      field.kind === 'paly' ||
      field.kind === 'lozengy' ||
      field.kind === 'paly-pily' ||
      field.kind === 'barry-pily' ||
      field.kind === 'bendy-pily' ||
      field.kind === 'bendy-pily-sinister' ||
      field.kind === 'chequy' ||
      field.kind === 'chevronny' ||
      field.kind === 'chevronny-reversed' ||
      field.kind === 'quarterly-of-nine' ||
      field.kind === 'lozengy-bendwise' ||
      field.kind === 'embrassee-a-dexter' ||
      field.kind === 'embrassee-a-sinister' ||
      field.kind === 'lozenge-throughout' ||
      field.kind === 'lozenge-throughout-arched' ||
      field.kind === 'barry-and-per-pale' ||
      field.kind === 'bendy-and-per-bend-sinister' ||
      field.kind === 'bendy-sinister-and-per-bend' ||
      field.kind === 'bendy-and-per-pale' ||
      field.kind === 'barry-and-per-chevron-throughout'
    ) {
      return fieldStr + ` ${stringifyTincture(field.tinctures[0])} and ${stringifyTincture(field.tinctures[1])}`;
    } else if (field.kind === 'barry' || field.kind === 'bendy' || field.kind === 'bendySinister') {
      return (
        fieldStr +
        (field.number !== 6 ? ` of ${stringifyNumber(field.number)}` : '') +
        ('line' in field && field.line !== 'straight' ? ' ' + stringifyLine(field.line) : '') +
        ` ${stringifyTincture(field.tinctures[0])} and ${stringifyTincture(field.tinctures[1])}`
      );
    } else if (field.kind === 'gironny') {
      return (
        fieldStr +
        (field.number !== 8 ? ` of ${stringifyNumber(field.number)}` : '') +
        ` ${stringifyTincture(field.tinctures[0])} and ${stringifyTincture(field.tinctures[1])}`
      );
    } else {
      return cannotHappen(field);
    }
  }
}

function stringifyCharge(charge: Charge): string {
  const count = charge.countAndDisposition.count;
  const counterStr = count === 1 ? (charge.name === 'eagle' ? 'an' : 'a') : stringifyNumber(count);
  if (charge.name === 'eagle') {
    let result = counterStr;
    result += ' ' + pluralize('eagle', count);

    result += ' ' + charge.attitude;

    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition;
    }

    result += ' ' + stringifyTincture(charge.tincture);

    if (!areTinctureEquals(charge.beakedAndArmed, charge.tincture)) {
      result += ' beaked and armed ' + stringifyTincture(charge.beakedAndArmed);
    }
    return result;
  } else if (charge.name === 'fleurdelys') {
    let result = counterStr;
    result += charge.countAndDisposition.count === 1 ? ' fleur de lys ' : ' fleurs de lys ';

    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition + ' ';
    }
    result += stringifyTincture(charge.tincture);

    return result;
  } else if (charge.name === 'escutcheon') {
    let result = counterStr + ' ' + pluralize('escutcheon', count) + ' ';
    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition + ' ';
    }
    result += stringifyTincture(charge.tincture);

    return result;
  } else if (charge.name === 'lion') {
    let result = counterStr;
    result += ' ' + pluralize('lion', count);

    result += ' ' + charge.attitude;

    if (charge.head !== null) {
      result += ' ' + charge.head;
    }
    if (charge.tail !== null) {
      result += ' tail ' + charge.tail;
    }
    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition;
    }

    result += ' ' + stringifyTincture(charge.tincture);
    if (!areTinctureEquals(charge.armedAndLangued, gules)) {
      result += ' armed and langued ' + stringifyTincture(charge.armedAndLangued);
    }

    return result;
  } else if (charge.name === 'roundel') {
    let result = counterStr;
    if (charge.inside === 'voided') {
      result += ' ' + pluralize('annulet', count);
      if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
        result += ' in ' + charge.countAndDisposition.disposition;
      }
      result += ' ' + stringifyTincture(charge.tincture);
    } else if (charge.inside === 'nothing') {
      if (areTinctureEquals(charge.tincture, or)) {
        result += ' ' + pluralize('bezant', count);
        if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
          result += ' in ' + charge.countAndDisposition.disposition + ' ';
        }
      } else {
        result += ' ' + pluralize('roundel', count);
        if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
          result += ' in ' + charge.countAndDisposition.disposition;
        }
        result += ' ' + stringifyTincture(charge.tincture);
      }
    } else {
      return cannotHappen(charge.inside);
    }

    return result;
  } else if (charge.name === 'lozenge') {
    let result = counterStr;
    if (charge.inside === 'voided') {
      result += ' ' + pluralize('mascle', count) + ' ';
    } else if (charge.inside === 'pierced') {
      result += ' ' + pluralize('rustre', count) + ' ';
    } else if (charge.inside === 'nothing') {
      result += ' ' + pluralize('lozenge', count) + ' ';
    } else {
      return cannotHappen(charge.inside);
    }
    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition + ' ';
    }
    result += stringifyTincture(charge.tincture);

    return result;
  } else if (charge.name === 'cross') {
    let result = counterStr;
    result += ' ' + pluralize('cross', count) + ' ';
    result += charge.limbs + ' ';

    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition + ' ';
    }

    result += stringifyTincture(charge.tincture);

    return result;
  } else if (charge.name === 'mullet') {
    let result = counterStr;
    result += ' ' + pluralize('mullet', count);
    if (charge.points !== 5) {
      result += ' of ' + stringifyNumber(charge.points) + ' points';
    }
    if (charge.inside === 'pierced') {
      result += ' pierced';
    }

    if (charge.countAndDisposition.count !== 1 && charge.countAndDisposition.disposition !== 'default') {
      result += ' in ' + charge.countAndDisposition.disposition;
    }

    result += ' ' + stringifyTincture(charge.tincture);

    return result;
  } else {
    return cannotHappen(charge);
  }
}

function stringifyBlasonWithCapitalization(blason: Blason, shouldCapitalize: boolean): string {
  if (blason.kind === 'simple') {
    const field = stringifyField(blason.field, shouldCapitalize);

    const addendum = [
      blason.ordinary ? stringifyOrdinary(blason.ordinary) : null,
      blason.charge ? stringifyCharge(blason.charge) : null,
    ].filter(isNotNull);

    if (addendum.length > 0) {
      return field + ', ' + addendum.join(', ');
    } else {
      return field;
    }
  } else if (blason.kind === 'quarterly') {
    const groupedBlason = blason.blasons.reduce<Array<{ blason: SimpleBlason; quarter: Array<number> }>>(
      (acc, blason, i) => {
        const idx = acc.findIndex((b) => isEqual(b.blason, blason));
        if (idx < 0) {
          acc.push({ blason, quarter: [i] });
        } else {
          acc[idx].quarter.push(i);
        }

        return acc;
      },
      []
    );

    return (
      'Quarterly, ' +
      groupedBlason
        .map(({ blason, quarter }) => {
          return (
            quarter.map((i) => stringifyOrdinal(i + 1)).join(' and ') +
            ' ' +
            stringifyBlasonWithCapitalization(blason, false)
          );
        })
        .join('; ')
    );
  } else {
    return cannotHappen(blason);
  }
}

export function stringifyBlason(blason: Blason): string {
  return stringifyBlasonWithCapitalization(blason, true);
}
