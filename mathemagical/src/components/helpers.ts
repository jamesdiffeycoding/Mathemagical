interface global {
  thetaInc: number;
  lineThickness: number;
}

export const global: global = {
  thetaInc: 0.001,
  lineThickness: 1,
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


export function tweakParameterByPointTwo (value: number, direction: string){
  if (direction == "increase") {
    value += 0.2;
    if (value >= 2) {
      value = 2;
    }
  }
  if (direction == "decrease") {
    value -= 0.2;
    if (value <= -2) {
      value = -2;
    }
  }
  return value;

}