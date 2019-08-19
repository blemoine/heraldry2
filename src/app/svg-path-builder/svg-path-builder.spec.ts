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
    const result = SvgPathBuilder.start([10, 10]).quadraticeBezier([20, 30], [5, 7]);

    expect(result.toPathAttribute()).toEqual('M 10 10 Q 5 7 20 30');
  });

  it('should support positive relative horizontal move', () => {
    const result = SvgPathBuilder.start([10, 5]).relativeHorizontalMove(15);

    expect(result.toPathAttribute()).toEqual('M 10 5 H25');
  });
  it('should support negative relative horizontal move', () => {
    const result = SvgPathBuilder.start([10, 5]).relativeHorizontalMove(-15);

    expect(result.toPathAttribute()).toEqual('M 10 5 H-5');
  });
  it('should support positive relative vertical move', () => {
    const result = SvgPathBuilder.start([5, 10]).relativeVerticalMove(15);

    expect(result.toPathAttribute()).toEqual('M 5 10 V25');
  });
  it('should support negative relative vertical move', () => {
    const result = SvgPathBuilder.start([5, 10]).relativeVerticalMove(-15);

    expect(result.toPathAttribute()).toEqual('M 5 10 V-5');
  });

  it('should be insensible to rounding error', () => {
    const result = SvgPathBuilder.start([0.1, 0.1]).relativeVerticalMove(0.2).relativeHorizontalMove(0.2);

    expect(result.toPathAttribute()).toEqual('M 0.1 0.1 V0.3 H0.3');
  });
});
