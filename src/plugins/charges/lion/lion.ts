import * as P from 'parsimmon';
import { Animal } from '../animal/animal';
import { Tincture, areTinctureEquals, or, gules } from '~/app/model/tincture';
import { CountAndDisposition, stringifyNumber } from '~/app/model/countAndDisposition';
import { stringifyTincture } from '~/app/model/stringify/stringify.helper';
import { countAndDispositionParser, countParser } from '~/app/blason-parser/chargeParser';
import { tinctureParserFromName } from '~/app/blason-parser/tinctureParser';
import { buildAltParser } from '~/app/blason-parser/parser.helper';
import { identity } from '~/utils/identity';
import { Display } from './Display';
import { Form } from './Form';

export const lionAttitudes = [
  'couchant',
  'dormant',
  'passant',
  'rampant',
  'salient',
  'sejant',
  'sejant-erect',
  'statant',
] as const;
export const lionHeads = ['guardant', 'regardant'] as const;
export const lionTails = ['coward', 'crossed', 'forked', 'nowed'] as const;

export type LionAttitude = typeof lionAttitudes[number];
export type LionHead = typeof lionHeads[number];
export type LionTail = typeof lionTails[number];

export class Lion extends Animal {
  static secondaryTinctureLabel = 'Tincture of the claws and tongue';

  static parser = (): P.Parser<Lion> => {
    return countParser.trim(P.optWhitespace).chain<Lion>((count) => {
      const attitudeParser: P.Parser<LionAttitude> = buildAltParser(lionAttitudes, identity);
      const headParser: P.Parser<LionHead> = P.alt(
        P.regex(/gardant/i).result('guardant'),
        buildAltParser(lionHeads, identity)
      );
      const tailParser: P.Parser<LionTail> = buildAltParser(lionTails, identity);

      const lionNameParser = count === 1 ? P.regex(/lion/i) : P.regex(/lions/i);

      return lionNameParser
        .then(
          P.seq(
            P.whitespace.then(attitudeParser).fallback('rampant' as const),
            P.whitespace.then(headParser).fallback(null),
            P.whitespace.then(P.regex(/tail/i)).then(P.whitespace).then(tailParser).fallback(null),
            countAndDispositionParser(count),
            P.whitespace.then(tinctureParserFromName),
            P.whitespace
              .then(P.regex(/armed and langued/i))
              .then(P.whitespace)
              .then(tinctureParserFromName)
              .fallback(gules)
          )
        )
        .map(
          ([attitude, head, tail, countAndDisposition, tincture, armedAndLangued]): Lion =>
            new Lion({
              attitude,
              tincture,
              armedAndLangued,
              tail,
              head,
              countAndDisposition,
            })
        );
    });
  };
  static category = 'animals';
  static display = Display;
  static form = Form;

  public attitude!: LionAttitude;
  public head: LionHead | null;
  public tail: LionTail | null;

  constructor({
    attitude = 'rampant',
    head = null,
    tail = null,
    tincture = or,
    armedAndLangued = gules,
    countAndDisposition = { count: 1, disposition: 'default' },
  }: {
    attitude: LionAttitude;
    head: LionHead | null;
    tail: LionTail | null;
    tincture: Tincture;
    armedAndLangued: Tincture;
    countAndDisposition: CountAndDisposition;
  }) {
    super({ attitude, tincture, secondaryTincture: armedAndLangued, countAndDisposition });
    this.head = head;
    this.tail = tail;
  }

  public stringifyCountAndName(): string {
    const count = this.countAndDisposition.count;
    let result = (count === 1 ? 'a lion' : stringifyNumber(count) + ' lions') + ' ' + this.attitude;
    if (this.head !== null) {
      result += ' ' + this.head;
    }
    if (this.tail !== null) {
      result += ' tail ' + this.tail;
    }
    return result;
  }

  public stringify(): string {
    let result = super.stringify();
    if (!areTinctureEquals(this.secondaryTincture, gules)) {
      result += ' armed and langued ' + stringifyTincture(this.secondaryTincture);
    }
    return result;
  }
}
