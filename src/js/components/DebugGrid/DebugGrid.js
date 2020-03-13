import React from 'react'
import { Line, Group } from 'react-konva'
import { color } from 'Utils/color-helpers'

const DebugGrid = (props) => {
  const renderGrid = () => {
    const { width, height, spaceBetweenLines } = props
    const grid = []

    for (let i = spaceBetweenLines; i < width; i += spaceBetweenLines) {
      grid.push(
        <Line
          key={`x${i}`}
          points={[i, 0, i, height]}
          stroke={color.alto}
          strokeWidth={1}
        />
      )
    }

    for (let i = spaceBetweenLines; i < height; i += spaceBetweenLines) {
      grid.push(
        <Line
          key={`y${i}`}
          points={[0, i, width, i]}
          stroke={color.alto}
          strokeWidth={1}
        />
      )
    }

    return grid
  }

  return (
    <Group>
      {renderGrid()}
    </Group>
  )

}

export default DebugGrid
