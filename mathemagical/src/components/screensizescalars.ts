interface ScreenSizeVariables {
  scalarForScreenOver1400px: number;
  scalarForScreen800to1400px: number;
  scalarForScreenLessThan800px: number;
  thetaInc: number;
}

export const screenSizeVariables: ScreenSizeVariables = {
  scalarForScreenOver1400px: 0.2,
  scalarForScreen800to1400px: 0.5,
  scalarForScreenLessThan800px: 0.8,
  thetaInc: 0.001,
};

export function getAdjustedCanvasWidth (canvasWidth: number) {
    let adjustedWidth: number
    if (canvasWidth >= 1400 ) {
      adjustedWidth = 0.35 * (canvasWidth -200)
    }
    else if (canvasWidth>=800) {
      adjustedWidth = 0.65* (canvasWidth)
      }
      else {
        adjustedWidth = 0.5* (canvasWidth)
      }
      return adjustedWidth
}

export function getAdjustedXYScalar (canvasWidth: number) {
  let adjustedXYScalar: number
  if (canvasWidth >= 1400 ) {
    adjustedXYScalar = canvasWidth/18
  }
  else if (canvasWidth>=800) {
    adjustedXYScalar = canvasWidth/13
    }
    else {
      adjustedXYScalar = canvasWidth/15
    }

  return adjustedXYScalar

}
