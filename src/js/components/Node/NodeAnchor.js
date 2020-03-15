import React, { useRef, useEffect } from 'react'
import Konva from 'konva'
import { Circle, Rect, Group } from 'react-konva'
import { setCursor } from 'Utils/dom-helpers'
import EventsListPopup from 'Components/Node/EventsListPopup'
import { color } from 'Utils/color-helpers'

const CLICK_AREA_WIDTH = 20
const CLICK_AREA_HEIGHT = 20
const MOUSE_ENTER_ANIMATION = {
  duration: 0.1,
  stroke: color.darkGray,
  fill: color.alto
}
const MOUSE_LEAVE_ANIMATION = {
  duration: 0.1,
}
const FADE_IN_ANIMATION = {
  duration: 0.1,
  opacity: 1
}
const FADE_OUT_ANIMATION = {
  duration: 0.2,
  opacity: 0
}

const NodeAnchor = (props) => {
  const anchorRef = useRef(null)

  const {
    x,
    y,
    width,
    height,
    color,
    isVisible,
    borderColor,
    onClick
  } = props

  const handleMouseEnter = () => {
    setCursor('pointer')
    anchorRef.current.to({
      ...MOUSE_ENTER_ANIMATION
    });
  }

  const handleMouseLeave = () => {
    setCursor('default')
    anchorRef.current.to({
      ...MOUSE_LEAVE_ANIMATION,
      stroke: borderColor,
      fill: color
    });
  }

  const handleMouseClick = (e) => {
    const { x, y } = anchorRef.current.getClientRect()
    onClick([x, y])
  }

  return (
    <>
      {/* Popup that appears after click */}
      <EventsListPopup
        x={x}
        y={y}
        isVisible={false}
      />

      <Circle
        ref={anchorRef}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        strokeWidth={1}
        opacity={1}
        stroke={borderColor}
        easing={Konva.Easings.ElasticEaseInOut}
      />

      {/*Anchor click area */}
      <Rect
        x={x - (CLICK_AREA_WIDTH / 2)}
        y={y - (CLICK_AREA_HEIGHT / 2)}
        width={CLICK_AREA_WIDTH}
        height={CLICK_AREA_HEIGHT}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
        opacity={0}
      />
    </>
  )
}

export default NodeAnchor
