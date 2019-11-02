import * as P from 'parsimmon';
import { metalAndColours, MetalsAndColours, Tincture, tinctures } from '../model/tincture';
import { buildAltParser } from './parser.helper';
import { capitalizeFirstLetter } from '../../utils/strings';
import { stringifyTinctureWithAlternative } from '../model/stringify/stringify.helper';

const metalOrColourParser = (stringifier: (a: MetalsAndColours) => Array<string>) =>
  buildAltParser(metalAndColours, stringifier);
export const metalOrColourParserFromName: P.Parser<MetalsAndColours> = metalOrColourParser((x) =>
  stringifyTinctureWithAlternative(x)
);

const tinctureParser = (stringifier: (a: Tincture) => Array<string>) =>
  P.alt(
    metalOrColourParser(stringifier)
      .skip(P.whitespace)
      .skip(P.string('ermined'))
      .skip(P.whitespace)
      .chain((field) => metalOrColourParser(stringifier).map((spot) => ({ name: 'ermined', field, spot }))),
    buildAltParser(tinctures, stringifier)
  );
export const tinctureParserFromName: P.Parser<Tincture> = tinctureParser((x) => stringifyTinctureWithAlternative(x));
export const tinctureParserFromCapitalizedName: P.Parser<Tincture> = tinctureParser((x) =>
  stringifyTinctureWithAlternative(x).map((x) => capitalizeFirstLetter(x))
);
