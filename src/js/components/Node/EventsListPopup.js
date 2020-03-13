import React, { useRef } from 'react'
import Konva from 'konva'
import { Rect } from 'react-konva'
import { color } from 'Utils/color-helpers'

const POPUP_WIDTH = 150
const POPUP_HEIGHT = 150
const POPUP_CORNER_RADIUS = 10
const POPUP_OFFSET_X = 5
const POPUP_OFFSET_Y = 5

const P0PUP_SHADOW_BLUR = 10
const P0PUP_SHADOW_OPACITY = 0.6
const POPUP_ANIMATION_DURATION = 0.4

const EventsListPopup = (props) => {
  const eventsPopupRef = useRef(null)
  const {
    x,
    y,
    isVisible
  } = props

  const getEventsPopupOffsetX = () => {
    return x + POPUP_OFFSET_X
  }

  const getEventsPopupOffsetY = () => {
    return y - POPUP_OFFSET_Y - POPUP_HEIGHT
  }


  return (
    <Rect
      ref={eventsPopupRef}
      x={getEventsPopupOffsetX()}
      y={getEventsPopupOffsetY()}
      width={POPUP_WIDTH}
      height={POPUP_HEIGHT}
      visible={isVisible}
      duration={POPUP_ANIMATION_DURATION}
      fill={color.white}
      easing={Konva.Easings.ElasticEaseInOut}
      cornerRadius={POPUP_CORNER_RADIUS}
      shadowColor={color.black}
      shadowBlur={P0PUP_SHADOW_BLUR}
      shadowOpacity={P0PUP_SHADOW_OPACITY}
    />
  )
}

export default EventsListPopup
