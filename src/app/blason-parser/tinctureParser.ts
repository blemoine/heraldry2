import * as P from 'parsimmon';
import { Tincture, tinctures } from '../model/tincture';
import { buildAltParser } from './parser.helper';
import { capitalizeFirstLetter } from '../../utils/strings';
import { stringifyTinctureWithAlternative } from '../model/stringify/stringify.helper';

const tinctureParser = (stringifier: (a: Tincture) => Array<string>) => buildAltParser(tinctures, stringifier);
export const tinctureParserFromName: P.Parser<Tincture> = tinctureParser((x) => stringifyTinctureWithAlternative(x));
export const tinctureParserFromCapitalizedName: P.Parser<Tincture> = tinctureParser((x) =>
  stringifyTinctureWithAlternative(x).map((x) => capitalizeFirstLetter(x))
);
