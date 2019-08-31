import { SvgPathBuilder } from './svg-path-builder';

describe('SvgPathBuilder', () => {
  it('should take a starting  point as constructor', () => {
    const result = SvgPathBuilder.start([10, 20]);

    expect(result.toPathAttribute()).toEqual('M 10 20');
  });

  it('should move to a given point', () => {
    const result = SvgPathBuilder.start([10, 20]).goTo([30, 30]);

    expect(result.toPathAttribute()).toEqual('M 10 20 L 30 30');
  });

  it('should close the path', () => {
    const result = SvgPathBuilder.start([10, 20])
      .goTo([30, 30])
      .close();

    expect(result.toPathAttribute()).toEqual('M 10 20 L 30 30 Z');
  });

  it('should draw an arc', () => {
    const result = SvgPathBuilder.start([10, 20]).arcTo([30, 40], { radius: [3, 4] });

    expect(result.toPathAttribute()).toEqual('M 10 20 A3 4 0 0 0 30 40');
  });

  it('should draw an arc configured with an x Axis Rotation', () => {
    const result = SvgPathBuilder.start([10, 20]).arcTo([30, 40], { radius: [3, 4], xAxisRotation: 90 });

    expect(result.toPathAttribute()).toEqual('M 10 20 A3 4 90 0 0 30 40');
  });

  it('should draw an arc configured to display large arc', () => {
    const result = SvgPathBuilder.start([10, 20]).arcTo([30, 40], { radius: [3, 4], largeArc: 1 });

    expect(result.toPathAttribute()).toEqual('M 10 20 A3 4 0 1 0 30 40');
  });
  it('should draw an arc configured to display sweep', () => {
    const result = SvgPathBuilder.start([10, 20]).arcTo([30, 40], { radius: [3, 4], sweep: 1 });

    expect(result.toPathAttribute()).toEqual('M 10 20 A3 4 0 0 1 30 40');
  });

  it('should draw an arc with a simplified radius', () => {
    const result = SvgPathBuilder.start([10, 20]).arcTo([30, 40], { radius: 5 });

    expect(result.toPathAttribute()).toEqual('M 10 20 A5 5 0 0 0 30 40');
  });

  it('should optimize vertical path', () => {
    const result = SvgPathBuilder.start([10, 20]).goTo([10, 50]);

    expect(result.toPathAttribute()).toEqual('M 10 20 V50');
  });

  it('should optimize horizontal path', () => {
    const result = SvgPathBuilder.start([10, 20]).goTo([60, 20]);

    expect(result.toPathAttribute()).toEqual('M 10 20 H60');
  });

  it('should optimize horizontal path after vertical path', () => {
    const result = SvgPathBuilder.start([10, 20])
      .goTo([60, 20])
      .goTo([60, 80]);

    expect(result.toPathAttribute()).toEqual('M 10 20 H60 V80');
  });

  it('should draw line engrailed horizontally', () => {
    const result = SvgPathBuilder.start([10, 10]).goTo([70, 10], { line: 'with-arc', radius: 20, sweep: true });

    expect(result.toPathAttribute()).toEqual(
      'M 10 10 A20 60 -180 0 1 30 10 A20 60 -180 0 1 50 10 A20 60 -180 0 1 70 10'
    );
  });

  it('should draw line engrailed vertically', () => {
    const result = SvgPathBuilder.start([10, 10]).goTo([10, 70], { line: 'with-arc', radius: 20, sweep: true });

    expect(result.toPathAttribute()).toEqual('M 10 10 A20 60 -90 0 1 10 30 A20 60 -90 0 1 10 50 A20 60 -90 0 1 10 70');
  });

  it('should draw line engrailed diagonally', () => {
    const result = SvgPathBuilder.start([10, 10]).goTo([70, 70], { line: 'with-arc', radius: 20, sweep: true });

    expect(result.toPathAttribute()).toEqual(
      'M 10 10 A21.213203435596427 63.63961030678928 -135 0 1 25 25 A21.213203435596427 63.63961030678928 -135 0 1 40 40 A21.213203435596427 63.63961030678928 -135 0 1 55 55 A21.213203435596427 63.63961030678928 -135 0 1 70 70'
    );
  });

  it('should do multiple moveTo', () => {
    const result = SvgPathBuilder.start([10, 10])
      .goTo([10, 70])
      .moveTo([5, 5]);

    expect(result.toPathAttribute()).toEqual('M 10 10 V70 M 5 5');
  });

  it('should support quadratic bezier', () => {
    const result = SvgPathBuilder.start([10, 10]).quadraticBezier([20, 30], [5, 7]);

    expect(result.toPathAttribute()).toEqual('M 10 10 Q 5 7 20 30');
  });

  it('should support positive relative horizontal move', () => {
    const result = SvgPathBuilder.start([10, 5]).horizontalMove(15);

    expect(result.toPathAttribute()).toEqual('M 10 5 H25');
  });
  it('should support negative relative horizontal move', () => {
    const result = SvgPathBuilder.start([10, 5]).horizontalMove(-15);

    expect(result.toPathAttribute()).toEqual('M 10 5 H-5');
  });
  it('should support positive relative vertical move', () => {
    const result = SvgPathBuilder.start([5, 10]).verticalMove(15);

    expect(result.toPathAttribute()).toEqual('M 5 10 V25');
  });
  it('should support negative relative vertical move', () => {
    const result = SvgPathBuilder.start([5, 10]).verticalMove(-15);

    expect(result.toPathAttribute()).toEqual('M 5 10 V-5');
  });

  it('should be insensible to rounding error', () => {
    const result = SvgPathBuilder.start([0.1, 0.1])
      .verticalMove(0.2)
      .horizontalMove(0.2);

    expect(result.toPathAttribute()).toEqual('M 0.1 0.1 V0.3 H0.3');
  });

  it('should support cubic bezier', () => {
    const result = SvgPathBuilder.start([0.1, 0.1]).cubicBezier([5, 6], [[1, 2], [3, 4]]);

    expect(result.toPathAttribute()).toEqual('M 0.1 0.1 C 1 2 3 4 5 6');
  });

  it('should support rotation of line from center 0,0 ', () => {
    const result = SvgPathBuilder.start([0, 0])
      .goTo([4, -20])
      .goTo([8, 0])
      .rotate([0, 0], 90);

    expect(result.toPathAttribute()).toEqual('M 0 0 L 20 4 L 0 8');
  });

  it('should support rotation of arc from a given center 0,0 ', () => {
    const result = SvgPathBuilder.start([4, 12])
      .arcTo([8, 12], { radius: 9 })
      .rotate([6, 12], 90);

    expect(result.toPathAttribute()).toEqual('M 6 10 A9 9 0 0 0 6 14');
  });

  it('should support rotation of horizontal and vertical move ', () => {
    const result = SvgPathBuilder.start([0, 0])
      .horizontalMove(3)
      .verticalMove(4)
      .rotate([0, 0], 45);

    expect(result.toPathAttribute()).toEqual('M 0 0 L 2.12132 2.12132 L -0.70711 4.94975');
  });

  it('should support translation of line ', () => {
    const result = SvgPathBuilder.start([0, 0])
      .goTo([4, -20])
      .translate([5, 10]);

    expect(result.toPathAttribute()).toEqual('M 5 10 L 9 -10');
  });

  it('should support translation of arc ', () => {
    const result = SvgPathBuilder.start([4, 12])
      .arcTo([8, 12], { radius: 9 })
      .translate([6, 12]);

    expect(result.toPathAttribute()).toEqual('M 10 24 A9 9 0 0 0 14 24');
  });

  it('should support translation of bezier curves ', () => {
    const result = SvgPathBuilder.start([4, 12])
      .cubicBezier([1, 2], [[6, 7], [8, 9]])
      .quadraticBezier([10, 11], [12, 13])
      .translate([6, 12]);

    expect(result.toPathAttribute()).toEqual('M 10 24 C 12 19 14 21 7 14 Q 18 25 16 23');
  });

  it('should support translation of horizontal and vertical move ', () => {
    const result = SvgPathBuilder.start([0, 0])
      .horizontalMove(3)
      .verticalMove(4)
      .translate([5, 6]);

    expect(result.toPathAttribute()).toEqual('M 5 6 H8 V10');
  });

  it('should support concatenation of path', () => {
    const p1 = SvgPathBuilder.start([0, 0])
      .horizontalMove(12)
      .goTo([23, 34]);
    const p2 = SvgPathBuilder.start([23, 34]).goTo([7, 8]);
    const result = p1.concat(p2);

    expect((result as SvgPathBuilder).toPathAttribute()).toEqual('M 0 0 H12 L 23 34 L 7 8');
  });

  it('should optimize the goto', () => {
    const result = SvgPathBuilder.start([12, 24])
      .goTo([65, 78])
      .goTo([12, 24]);

    expect((result as SvgPathBuilder).toPathAttribute()).toEqual('M 12 24 L 65 78 Z');
  });
});
