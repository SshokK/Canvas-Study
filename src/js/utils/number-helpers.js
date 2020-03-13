export const getVectorLength = ([pointAx, pointAy], [pointBx, pointBy]) => {
  return Math.sqrt(
    Math.pow(pointBx - pointAx, 2) + Math.pow(pointBy - pointAy, 2)
  )
}
export const isEven = (num) => num % 2 === 0

export const formatPairsOfCoords = (allCoords = []) => {
  const paires = []

  if (isEven(allCoords.length)) {
    for (let i = 0; i < allCoords.length; i += 2) {
      paires.push([allCoords[i], allCoords[i + 1]])
    }
  } else if (allCoords.length > 0) {
    for (let i = 0; i < allCoords.length - 1; i += 2) {
      paires.push([allCoords[i], allCoords[i + 1]])
    }
  }

  return paires
}

export const getLineTiltAngle = (pointA, pointB) => {
  const pointC = [pointA[0], pointB[1]]

  const AB = getVectorLength(pointA, pointB)
  const AC = getVectorLength(pointA, pointC)
  const CB = getVectorLength(pointC, pointB)

  const tanA = CB / AC

  return radiansToDegrees(Math.atan(tanA))
}

export const radiansToDegrees = (radians) => {
  return radians * (180/Math.PI);
}

export const normalizeVector = (pointA, pointB) => {
  const vectorLength = getVectorLength(pointA, pointB)
  return [pointA / vectorLength, pointB / vectorLength]
}

export const multiplyVectors = ([vectorAx, vectorAy], [vectorBx, vectorBy]) => {
  return vectorAx[0] * vectorBx[0] + vectorAy * vectorBy
}

export const getArrowPointsCoordinates = (pointA, pointB, distanceFromPointB, lengthBetweenArrowPoints) => {
  // Slope is dx/dy
  let dx = pointB[0] - pointA[0]
  let dy = pointB[1] - pointA[1]
  let lineLength = getVectorLength(pointA, pointB)

  //       U
  //      /|
  //    /  |< lengthBetweenArrowPoints
  //  /    |
  // A-----C---------------B
  //  \    |      ^
  //    \  |     lineLength
  //      \|
  //       D

  // Point on a line at specified distance (C)
  const pointOnLineX = pointB[0] - distanceFromPointB * dx / lineLength
  const pointOnLineY = pointB[1] - distanceFromPointB * dy / lineLength

  // Point that lies below line (D)
  const pointBelowLineX = pointOnLineX - ((lengthBetweenArrowPoints * -dy) / lineLength)
  const pointBelowLineY = pointOnLineY - ((lengthBetweenArrowPoints * dx) / lineLength)

  // Point that lies above line (U)
  const pointAboveLineX = pointOnLineX + ((lengthBetweenArrowPoints * -dy) / lineLength)
  const pointAboveLineY = pointOnLineY + ((lengthBetweenArrowPoints * dx) / lineLength)

  let pointBelowLine = [pointBelowLineX, pointBelowLineY]
  let pointAboveLine = [pointAboveLineX, pointAboveLineY]

  return [pointBelowLine, pointAboveLine]
}
