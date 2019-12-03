import { SimpleBlason } from '../../model/blason';
import { SimpleBlasonShape } from './blasonDisplay.helper';
import { cannotHappen } from '../../../utils/cannot-happen';

export function getChargeDimension(
  blason: SimpleBlason,
  shape: SimpleBlasonShape
): { verticalScale: number; horizontalScale: number; horizontalOffset: number; verticalOffset: number } {
  const ordinary = blason.ordinary;
  const charge = blason.charge;

  const ordinaryName = ordinary ? ordinary.name : null;
  const ordinaryLine = ordinary ? ordinary.line : null;
  const chargeCount = charge ? charge.countAndDisposition.count : 0;
  const chargeDisposition = charge ? charge.countAndDisposition.disposition : null;
  const bordureOrOrle = ordinaryName === 'bordure' || ordinaryName === 'orle';
  if (shape === 'default') {
    const chargeHorizontalOffset =
      (bordureOrOrle ? (ordinaryLine === 'straight' ? 0.085 : ordinaryLine === 'dancetty' ? 0.22 : 0.15) : 0.015) +
      (chargeDisposition === 'fess'
        ? 0.012
        : chargeDisposition === 'bend' || chargeDisposition === 'bendSinister'
        ? 0.13
        : 0);

    const defaultChargeHeightOffset =
      chargeDisposition === 'pale'
        ? 0.035
        : chargeDisposition === 'bend' || chargeDisposition === 'bendSinister'
        ? 0.09
        : chargeCount === 7 || chargeCount === 13
        ? 0.08
        : chargeCount === 8
        ? 0.06
        : chargeCount === 12
        ? 0.05
        : 0.04;
    0;

    let chargeVerticalOffset = 0.01;
    let chargeHeightOffset: number;
    if (ordinaryName === 'chief') {
      if (ordinaryLine === 'straight') {
        if (chargeDisposition === 'bend' || chargeDisposition === 'bendSinister') {
          chargeHeightOffset = 0.15;
        } else {
          chargeHeightOffset = 0.1;
        }
      } else if (ordinaryLine === 'dancetty') {
        if (chargeDisposition === 'bend' || chargeDisposition === 'bendSinister') {
          chargeHeightOffset = 0.23;
          chargeVerticalOffset = 0.15;
        } else {
          chargeHeightOffset = 0.17;
          chargeVerticalOffset = 0.15;
        }
      } else {
        if (chargeDisposition === 'bend' || chargeDisposition === 'bendSinister') {
          chargeHeightOffset = 0.2;
          chargeVerticalOffset = 0.08;
        } else {
          chargeHeightOffset = 0.16;
          chargeVerticalOffset = 0.08;
        }
      }
    } else if (ordinaryName === 'base') {
      if (ordinaryLine === 'straight') {
        chargeHeightOffset = 0.13;
      } else {
        chargeHeightOffset = 0.16;
      }
    } else if (bordureOrOrle) {
      if (ordinaryLine === 'straight') {
        chargeHeightOffset = 0.14;
        chargeVerticalOffset = 0.02;
      } else if (ordinaryLine === 'wavy') {
        chargeHeightOffset = 0.14;
        chargeVerticalOffset = 0.05;
      } else if (ordinaryLine === 'urdy') {
        chargeHeightOffset = 0.16;
        chargeVerticalOffset = 0.07;
      } else if (ordinaryLine === 'dancetty') {
        chargeHeightOffset = 0.18;
        chargeVerticalOffset = 0.135;
      } else {
        chargeHeightOffset = 0.17;
        chargeVerticalOffset = 0.07;
      }
    } else {
      chargeHeightOffset = defaultChargeHeightOffset;
    }

    return {
      verticalScale: 1 - 2 * chargeHeightOffset,
      horizontalScale: 1 - 2 * chargeHorizontalOffset,
      horizontalOffset:
        chargeHorizontalOffset +
        (ordinaryName === null
          ? chargeDisposition === 'bend'
            ? -0.07
            : chargeDisposition === 'bendSinister'
            ? +0.07
            : 0
          : 0),
      verticalOffset: chargeVerticalOffset,
    };
  } else if (shape === 'square') {
    if (bordureOrOrle) {
      if (ordinaryLine === 'dancetty') {
        return {
          horizontalScale: 0.51,
          verticalScale: 0.7,
          horizontalOffset: 0.25,
          verticalOffset: 0.135,
        };
      }
    }

    let chargeHorizontalOffset = bordureOrOrle
      ? 0.18
      : chargeDisposition === 'bend' || chargeDisposition === 'bendSinister'
      ? 0.05
      : 0;

    const defaultChargeHeightOffset =
      chargeDisposition === 'bend' || chargeDisposition === 'bendSinister' ? 0.05 : 0.01;

    let chargeVerticalOffset = 0.01;
    let chargeHeightOffset: number;
    if (ordinaryName === 'chief') {
      chargeHeightOffset = 0.12;
      if (ordinaryLine === 'dancetty') {
        chargeVerticalOffset = 0.14;
      } else if (ordinaryLine !== 'straight') {
        chargeVerticalOffset = 0.08;
      }
    } else if (ordinaryName === 'base') {
      if (ordinaryLine === 'straight') {
        chargeHeightOffset = 0.14;
      } else {
        chargeVerticalOffset = 0.03;
        chargeHeightOffset = 0.16;
      }
    } else if (bordureOrOrle) {
      if (ordinaryLine === 'straight') {
        chargeHeightOffset = 0.07;
      } else if (ordinaryLine === 'dancetty') {
        chargeVerticalOffset = 0.09;
        chargeHeightOffset = 0.15;
      } else {
        chargeVerticalOffset = 0.03;
        chargeHeightOffset = 0.15;
      }
    } else {
      chargeHeightOffset = defaultChargeHeightOffset;
    }

    const chargeDimension = {
      horizontalScale: 1 - 2 * chargeHorizontalOffset,
      verticalScale: 1 - 2 * chargeHeightOffset,
    };
    if (chargeDisposition === 'pale') {
      chargeVerticalOffset += 0.03;
      chargeDimension.verticalScale = chargeDimension.verticalScale * 0.9;
    } else if (chargeDisposition === 'fess') {
      chargeHorizontalOffset += 0.03;
      chargeDimension.horizontalScale = chargeDimension.horizontalScale * 0.9;
    } else {
      chargeVerticalOffset += 0.01;
    }

    if (bordureOrOrle && ordinaryLine !== 'straight') {
      chargeVerticalOffset += 0.035;
    }
    if (bordureOrOrle && ordinaryLine === 'dancetty') {
      chargeHorizontalOffset += 0.03;
      chargeDimension.horizontalScale = chargeDimension.horizontalScale * 0.9;
    }

    const result = {
      ...chargeDimension,
      horizontalOffset: chargeHorizontalOffset,
      verticalOffset: chargeVerticalOffset,
    };

    return result;
  } else if (shape === 'rightCut' || shape === 'leftCut') {
    if (chargeDisposition === 'default' || chargeDisposition === 'bend' || chargeDisposition === 'bendSinister') {
      if (bordureOrOrle) {
        if (ordinaryLine === 'straight') {
          if (chargeCount > 1) {
            return {
              verticalScale: 0.3,
              horizontalScale: 0.5,
              verticalOffset: 0.1,
              horizontalOffset: shape === 'leftCut' ? 0.2 : 0.2,
            };
          } else {
            return {
              verticalScale: 0.6,
              horizontalScale: 0.6,
              verticalOffset: 0.05,
              horizontalOffset: shape === 'leftCut' ? 0.23 : 0.15,
            };
          }
        } else if (ordinaryLine === 'wavy') {
          if (chargeCount > 1) {
            return {
              verticalScale: 0.5,
              horizontalScale: 0.5,
              verticalOffset: 0.05,
              horizontalOffset: shape === 'leftCut' ? 0.27 : 0.23,
            };
          } else {
            return {
              verticalScale: 0.6,
              horizontalScale: 0.59,
              verticalOffset: 0.05,
              horizontalOffset: shape === 'leftCut' ? 0.23 : 0.15,
            };
          }
        } else if (ordinaryLine === 'urdy') {
          if (chargeCount > 1) {
            return {
              verticalScale: 0.5,
              horizontalScale: 0.5,
              verticalOffset: 0.07,
              horizontalOffset: shape === 'leftCut' ? 0.33 : 0.17,
            };
          } else {
            return {
              verticalScale: 0.48,
              horizontalScale: 0.48,
              verticalOffset: 0.08,
              horizontalOffset: shape === 'leftCut' ? 0.27 : 0.2,
            };
          }
        } else if (ordinaryLine === 'dancetty') {
          if (chargeCount > 1) {
            return {
              verticalScale: 0.5,
              horizontalScale: 0.33,
              verticalOffset: 0.1,
              horizontalOffset: shape === 'leftCut' ? 0.36 : 0.24,
            };
          } else {
            return {
              verticalScale: 0.43,
              horizontalScale: 0.43,
              verticalOffset: 0.12,
              horizontalOffset: shape === 'leftCut' ? 0.31 : 0.25,
            };
          }
        } else if (ordinaryLine === 'invected') {
          if (chargeCount > 1) {
            return {
              verticalScale: 0.45,
              horizontalScale: 0.45,
              verticalOffset: 0.11,
              horizontalOffset: shape === 'leftCut' ? 0.33 : 0.22,
            };
          } else {
            return {
              verticalScale: 0.57,
              horizontalScale: 0.5,
              verticalOffset: 0.05,
              horizontalOffset: shape === 'leftCut' ? 0.25 : 0.2,
            };
          }
        } else if (ordinaryLine === 'potenty') {
          if (chargeCount > 1) {
            return {
              verticalScale: 0.45,
              horizontalScale: 0.45,
              verticalOffset: 0.07,
              horizontalOffset: shape === 'leftCut' ? 0.29 : 0.15,
            };
          } else {
            return {
              verticalScale: 0.57,
              horizontalScale: 0.54,
              verticalOffset: 0.07,
              horizontalOffset: shape === 'leftCut' ? 0.27 : 0.17,
            };
          }
        } else {
          if (chargeCount > 1) {
            return {
              verticalScale: 0.4,
              horizontalScale: 0.5,
              verticalOffset: 0.07,
              horizontalOffset: shape === 'leftCut' ? 0.28 : 0.2,
            };
          } else {
            return {
              verticalScale: 0.57,
              horizontalScale: 0.54,
              verticalOffset: 0.07,
              horizontalOffset: shape === 'leftCut' ? 0.27 : 0.17,
            };
          }
        }
      } else if (ordinaryName === 'chief') {
        if (ordinaryLine === 'dancetty') {
          if (chargeCount > 1) {
            return {
              verticalScale: 0.5,
              horizontalScale: 0.37,
              verticalOffset: 0.17,
              horizontalOffset: shape === 'leftCut' ? 0.53 : 0.1,
            };
          } else {
            return {
              verticalScale: 0.5,
              horizontalScale: 0.5,
              verticalOffset: 0.17,
              horizontalOffset: shape === 'leftCut' ? 0.3 : 0.03,
            };
          }
        } else {
          if (chargeCount > 1) {
            return {
              verticalScale: 0.45,
              horizontalScale: 0.45,
              verticalOffset: 0.1,
              horizontalOffset: shape === 'leftCut' ? 0.41 : 0.13,
            };
          } else {
            return {
              verticalScale: 0.55,
              horizontalScale: 0.6,
              verticalOffset: 0.08,
              horizontalOffset: shape === 'leftCut' ? 0.3 : 0.05,
            };
          }
        }
      } else {
        if (chargeCount > 1) {
          return {
            verticalScale: 0.4,
            horizontalScale: 0.6,
            verticalOffset: 0.05,
            horizontalOffset: shape === 'leftCut' ? 0.26 : 0.14,
          };
        } else {
          return {
            verticalScale: 0.59,
            horizontalScale: 0.59,
            verticalOffset: 0.05,
            horizontalOffset: shape === 'leftCut' ? 0.27 : 0.13,
          };
        }
      }
    } else if (chargeDisposition === 'fess') {
      if (bordureOrOrle) {
        if (ordinaryLine === 'straight') {
          return {
            verticalScale: 1,
            horizontalScale: 0.62,
            verticalOffset: -0.15,
            horizontalOffset: shape === 'leftCut' ? 0.23 : 0.15,
          };
        } else if (ordinaryLine === 'dancetty') {
          return {
            verticalScale: 1,
            horizontalScale: 0.56,
            verticalOffset: -0.18,
            horizontalOffset: shape === 'leftCut' ? 0.25 : 0.21,
          };
        } else {
          return {
            verticalScale: 1,
            horizontalScale: 0.57,
            verticalOffset: -0.18,
            horizontalOffset: shape === 'leftCut' ? 0.25 : 0.15,
          };
        }
      } else if (ordinaryName === 'chief') {
        return {
          verticalScale: 0.85,
          horizontalScale: 0.8,
          verticalOffset: -0.04,
          horizontalOffset: shape === 'leftCut' ? 0.2 : 0,
        };
      } else {
        return {
          verticalScale: 1,
          horizontalScale: 0.8,
          verticalOffset: -0.15,
          horizontalOffset: shape === 'leftCut' ? 0.2 : 0,
        };
      }
    } else if (chargeDisposition === 'pale') {
      if (ordinaryName === 'chief') {
        if (ordinaryLine === 'dancetty') {
          return {
            verticalScale: 0.47,
            horizontalScale: 0.8,
            verticalOffset: 0.18,
            horizontalOffset: shape === 'leftCut' ? 0.2 : 0,
          };
        }
      }
    }

    const chargeWidthOffset = 0.17;
    const defaultChargeHeightOffset = 0.09;
    let chargeVerticalOffset: number = 0;

    let chargeHeightOffset: number;
    if (ordinaryName === 'chief') {
      if (ordinaryLine === 'straight') {
        chargeHeightOffset = 0.12;
      } else {
        chargeHeightOffset = 0.13;
        chargeVerticalOffset = 0.04;
      }
    } else if (ordinaryName === 'base') {
      if (ordinaryLine === 'straight') {
        chargeHeightOffset = 0.13;
      } else {
        chargeHeightOffset = 0.16;
      }
    } else if (bordureOrOrle) {
      if (ordinaryLine === 'straight') {
        chargeHeightOffset = 0.12;
      } else {
        chargeHeightOffset = 0.14;
      }
    } else {
      chargeHeightOffset = defaultChargeHeightOffset;
    }

    const horizontalFactor = 0.76;
    const chargeDimension = {
      horizontalScale: (1 - 2 * chargeWidthOffset) * horizontalFactor,
      verticalScale: 1 - 2 * chargeHeightOffset,
    };

    if (chargeDisposition === 'pale') {
      chargeVerticalOffset = 0.035;
      chargeDimension.verticalScale = chargeDimension.verticalScale * 0.85;
    } else {
      chargeVerticalOffset += 0;
    }

    if (ordinaryName === 'chief' && ordinaryLine !== 'straight') {
      chargeVerticalOffset += 0.045;
      chargeDimension.verticalScale = chargeDimension.verticalScale * 0.9;
      if (ordinaryLine === 'dancetty') {
        chargeVerticalOffset += 0.04;
      }
    }

    if (bordureOrOrle && ordinaryLine !== 'straight') {
      chargeVerticalOffset += 0.05;
      chargeDimension.verticalScale = chargeDimension.verticalScale * 0.88;
      chargeDimension.horizontalScale = chargeDimension.horizontalScale * 0.95;
    }
    if (bordureOrOrle && ordinaryLine === 'straight') {
      chargeDimension.horizontalScale = chargeDimension.horizontalScale * 0.95;
    }

    return {
      ...chargeDimension,
      horizontalOffset:
        chargeWidthOffset +
        (bordureOrOrle && shape === 'rightCut' ? 0.22 : 0) +
        (bordureOrOrle && shape === 'leftCut' ? -0.12 : 0) +
        (!bordureOrOrle && shape === 'rightCut' ? 0.09 : 0) +
        (!bordureOrOrle && shape === 'leftCut' ? -0.09 : 0) +
        (shape === 'leftCut' ? 1.13 - horizontalFactor : 0) +
        (shape === 'rightCut' ? -(1.03 - horizontalFactor) : 0),
      verticalOffset: chargeVerticalOffset,
    };
  } else {
    return cannotHappen(shape);
  }
}
