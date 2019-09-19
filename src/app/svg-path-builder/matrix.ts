export type Matrix2 = readonly [[number, number], [number, number]];
export type Matrix3 = readonly [[number, number, number], [number, number, number], [number, number, number]];
export type Vec3 = readonly [number, number, number];

export function identity3(): Matrix3 {
  return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

export function translation3(x: number, y: number): Matrix3 {
  return [[1, 0, x], [0, 1, y], [0, 0, 1]];
}

export function scale3(x: number, y: number): Matrix3 {
  return [[x, 0, 0], [0, y, 0], [0, 0, 1]];
}

export function mulVec(m1: Matrix3, [x, y, z]: Vec3): Vec3 {
  return [
    m1[0][0] * x + m1[0][1] * y + m1[0][2] * z,
    m1[1][0] * x + m1[1][1] * y + m1[1][2] * z,
    m1[2][0] * x + m1[2][1] * y + m1[2][2] * z,
  ];
}

export function mul(m1: Matrix3, m2: Matrix3): Matrix3 {
  return [
    [
      m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0],
      m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1] + m1[0][2] * m2[2][1],
      m1[0][0] * m2[0][2] + m1[0][1] * m2[1][2] + m1[0][2] * m2[2][2],
    ],
    [
      m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0] + m1[1][2] * m2[2][0],
      m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1] + m1[1][2] * m2[2][1],
      m1[1][0] * m2[0][2] + m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2],
    ],
    [
      m1[2][0] * m2[0][0] + m1[2][1] * m2[1][0] + m1[2][2] * m2[2][0],
      m1[2][0] * m2[0][1] + m1[2][1] * m2[1][1] + m1[2][2] * m2[2][1],
      m1[2][0] * m2[0][2] + m1[2][1] * m2[1][2] + m1[2][2] * m2[2][2],
    ],
  ];
}
