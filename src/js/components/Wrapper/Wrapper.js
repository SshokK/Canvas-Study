import React, { useRef } from 'react'
import { Group, Rect, Text } from 'react-konva'
import { color } from 'Utils/color-helpers'
import Konva from 'konva'

const WRAPPER_CORNER_RADIUS = 10

const WRAPPER_SHADOW_OPACITY = 0.2
const WRAPPER_SHADOW_BLUR = 10

const WRAPPER_LABEL_FONT_SIZE = 18
const WRAPPER_LABEL_FONT_STYLE = 'bold'
const WRAPPER_LABEL_FONT_FAMILY = 'Calibri'
const WRAPPER_LABEL_ALIGN = 'left'

const WRAPPER_MOUSE_OVER_ANIMATION_DURATION = 0.1

const WRAPPER_MOUSE_ENTER_ANIMATION = {
  duration: WRAPPER_MOUSE_OVER_ANIMATION_DURATION,
  fill: color.dirtyWhite
}

const WRAPPER_MOUSE_LEAVE_ANIMATION = {
  duration: WRAPPER_MOUSE_OVER_ANIMATION_DURATION,
  fill: color.white
}

const Wrapper = (props) => {
  const wrapperRef = useRef(null);
  const {
    x,
    y,
    width,
    height,
    label,
    labelWidth,
    labelHeight,
    labelOffsetX,
    labelOffsetY,
    labelFontSize,
    onClick,
    children,
  } = props


  const isClickable = !!onClick

  const handleMouseEnter = () => {
    wrapperRef.current.to({
      ...WRAPPER_MOUSE_ENTER_ANIMATION
    })
  }

  const handleMouseLeave = () => {
    wrapperRef.current.to({
      ...WRAPPER_MOUSE_LEAVE_ANIMATION
    })
  }

  return (
    <Group
      x={x}
      y={y}
      onMouseEnter={isClickable && handleMouseEnter}
      onMouseLeave={isClickable && handleMouseLeave}
      onClick={onClick}
    >
      <Rect
        ref={wrapperRef}
        shadowColor={color.black}
        shadowOpacity={WRAPPER_SHADOW_OPACITY}
        shadowBlur={WRAPPER_SHADOW_BLUR}
        width={width}
        height={height}
        fill={color.white}
        easing={Konva.Easings.ElasticEaseInOut}
        cornerRadius={WRAPPER_CORNER_RADIUS}
      />
      {label && <Text
        x={labelOffsetX}
        y={labelOffsetY}
        width={labelWidth}
        height={labelHeight}
        text={label}
        fontSize={labelFontSize || WRAPPER_LABEL_FONT_SIZE}
        fontStyle={WRAPPER_LABEL_FONT_STYLE}
        fontFamily={WRAPPER_LABEL_FONT_FAMILY}
        fill={color.black}
        align={WRAPPER_LABEL_ALIGN}
      />}
      {children}
    </Group>
  )
}

export default Wrapper
