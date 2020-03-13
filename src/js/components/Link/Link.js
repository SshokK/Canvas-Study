import React from 'react'
import { Line, Group } from 'react-konva'
import { color } from 'Utils/color-helpers'
import { formatPairsOfCoords, getArrowPointsCoordinates } from 'Utils/number-helpers'

const Link = (props) => {
  const {
    points
  } = props

  const coords = formatPairsOfCoords(points)

  const pointA = coords[coords.length - 2]
  const pointB = coords[coords.length - 1]

  const arrowCoords = getArrowPointsCoordinates(pointA, pointB, 7, 6)
  const [arrowPointAbove, arrowPointBelow] = arrowCoords

  const drawLine = (pointA, pointB) => (
    <Line
      points={[...pointA, ...pointB]}
      stroke={color.black}
      strokeWidth={1}
      dash={[8, 5]}
    />
  )

  return (
    <Group>
      {drawLine(pointA, pointB)}
      {drawLine(pointB, arrowPointBelow)}
      {drawLine(pointB, arrowPointAbove)}
    </Group>
  )
}

export default Link
