import React from 'react'
import pt from 'prop-types'
import { Line, Group } from 'react-konva'
import { color } from 'Utils/color-helpers'
import { formatPairsOfCoords, getArrowPointsCoordinates } from 'Utils/number-helpers'

const Link = (props) => {
  const {
    isTemporal,
    points
  } = props

  if (points.length < 4) {
    return null
  }

  const coords = formatPairsOfCoords(points)

  const pointA = coords[coords.length - 2]
  const pointB = coords[coords.length - 1]

  const arrowCoords = getArrowPointsCoordinates(pointA, pointB, 7, 6)
  const [arrowPointAbove, arrowPointBelow] = arrowCoords

  const drawLine = (pointA, pointB) => (
    <Line
      points={[...pointA, ...pointB]}
      stroke={isTemporal ? color.black : color.alto}
      strokeWidth={1}
      dash={isTemporal ? [8, 5] : []}
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

Link.propTypes = {
  points: pt.arrayOf(pt.number),
  isTemporal: pt.bool
}

Link.defaultProps = {
  points: [],
  isTemporal: false
}
