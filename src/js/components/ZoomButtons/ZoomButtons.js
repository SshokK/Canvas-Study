import React from 'react'
import { Group } from 'react-konva'
import Wrapper from 'Components/Wrapper/Wrapper'
import { setCursor } from 'Utils/dom-helpers'

const ZOOM_BUTTON_WIDTH = 50
const ZOOM_BUTTON_HEIGHT = 50
const SPACE_BETWEEN_BUTTONS = 30
const ZOOM_INCREMENT = 0.5

const ZOOM_BUTTON_LABEL_OFFSET_X = 15
const ZOOM_BUTTON_LABEL_OFFSET_Y = 8
const ZOOM_BUTTON_LABEL_FONTSIZE = 40

const ZoomButtons = (props) => {
  const {
    x,
    y,
    zoomLevel,
    onClick,
    ...otherProps
  } = props

  const handleMouseEnter = () => {
    setCursor('pointer')
  }

  const handleMouseLeave = () => {
    setCursor('default')
  }

  const handleClick = (shouldIncrease) => {
    const newZoom = shouldIncrease ? zoomLevel + ZOOM_INCREMENT : zoomLevel - ZOOM_INCREMENT
    onClick(newZoom)
  }

  return (
    <Group
      x={x}
      y={y}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Wrapper
        width={ZOOM_BUTTON_WIDTH}
        height={ZOOM_BUTTON_HEIGHT}
        labelOffsetX={ZOOM_BUTTON_LABEL_OFFSET_X}
        labelOffsetY={ZOOM_BUTTON_LABEL_OFFSET_Y}
        labelFontSize={ZOOM_BUTTON_LABEL_FONTSIZE}
        label={'+'}
        onClick={() => handleClick(true)}
      />
      <Wrapper
        y={ZOOM_BUTTON_HEIGHT + SPACE_BETWEEN_BUTTONS}
        width={ZOOM_BUTTON_WIDTH}
        height={ZOOM_BUTTON_HEIGHT}
        labelOffsetX={ZOOM_BUTTON_LABEL_OFFSET_X}
        labelOffsetY={-ZOOM_BUTTON_LABEL_OFFSET_Y}
        labelFontSize={ZOOM_BUTTON_LABEL_FONTSIZE}
        label={'_'}
        onClick={() => handleClick(false)}
      />
    </Group>
  )
}

export default ZoomButtons
