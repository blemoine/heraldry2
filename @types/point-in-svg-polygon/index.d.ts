declare module 'point-in-svg-polygon' {
  type Segment = { coords: Array<[number, number]> };
  function segments(path: string): Array<Segment>;

  function isInside(point: [number, number], segments?: Array<Segment>): boolean;
}
