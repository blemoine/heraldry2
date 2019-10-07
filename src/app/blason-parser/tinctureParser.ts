import * as P from 'parsimmon';
import { Tincture, tinctures } from '../model/tincture';
import { buildAltParser } from './parser.helper';
import { capitalizeFirstLetter } from '../../utils/strings';
import { stringifyTincture } from '../model/stringify/stringify.helper';

const tinctureParser = (stringifier: (a: Tincture) => string) => buildAltParser(tinctures, stringifier);
export const tinctureParserFromName: P.Parser<Tincture> = tinctureParser((x) => stringifyTincture(x));
export const tinctureParserFromCapitalizedName: P.Parser<Tincture> = tinctureParser((x) =>
  capitalizeFirstLetter(stringifyTincture(x))
);
