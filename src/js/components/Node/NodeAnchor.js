import React, { useRef } from 'react'
import Konva from 'konva'
import { Circle, Rect, Group } from 'react-konva'
import { setCursor } from 'Utils/dom-helpers'
import EventsListPopup from 'Components/Node/EventsListPopup'
import { color } from 'Utils/color-helpers'

const NODE_ANCHOR_CLICK_AREA_WIDTH = 20
const NODE_ANCHOR_CLICK_AREA_HEIGHT = 20
const NODE_ANCHOR_MOUSE_ENTER_ANIMATION = {
  duration: 0.1,
  stroke: color.darkGray,
  fill: color.alto
}
const NODE_ANCHOR_MOUSE_LEAVE_ANIMATION = {
  duration: 0.1,
}

const NodeAnchor = (props) => {
  const anchorRef = useRef(null)
  const {
    x,
    y,
    color,
    borderColor
  } = props

  const handleMouseEnter = () => {
    setCursor('pointer')
    anchorRef.current.to({
      ...NODE_ANCHOR_MOUSE_ENTER_ANIMATION
    });
  }

  const handleMouseLeave = () => {
    setCursor('default')
    anchorRef.current.to({
      ...NODE_ANCHOR_MOUSE_LEAVE_ANIMATION,
      stroke: borderColor,
      fill: color
    });
  }

  return (
    <Group>
      {/* Popup that appears after click */}
      <EventsListPopup
        x={x}
        y={y}
        isVisible={false}
      />

      <Circle
        x={x}
        y={y}
        ref={anchorRef}
        fill={color}
        strokeWidth={1}
        stroke={borderColor}
        easing={Konva.Easings.ElasticEaseInOut}
        {...props}
      />

      {/*Anchor click area */}
      <Rect
        x={x - (NODE_ANCHOR_CLICK_AREA_WIDTH / 2)}
        y={y - (NODE_ANCHOR_CLICK_AREA_HEIGHT / 2)}
        width={NODE_ANCHOR_CLICK_AREA_WIDTH}
        height={NODE_ANCHOR_CLICK_AREA_HEIGHT}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        cancelBubble
        opacity={0}
      />
    </Group>
  )
}

export default NodeAnchor
