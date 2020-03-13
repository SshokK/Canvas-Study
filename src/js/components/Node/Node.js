import React, {  useRef } from 'react'
import Konva from 'konva'
import { Rect, Group, Text } from 'react-konva'
import NodeAnchor from 'Components/Node/NodeAnchor'
import { color } from 'Utils/color-helpers'
import { setCursor } from 'Utils/dom-helpers'
import Icon from 'Components/Icon/Icon'

const NODE_MOUSE_DOWN_ANIMATION = {
  duration: 0.1,
  scaleX: 1.1,
  scaleY: 1.1,
}

const NODE_MOUSE_UP_ANIMATION = {
  duration: 0.2,
  scaleX: 1,
  scaleY: 1,
}
const NODE_CAPTION_OFFSET = 20
const NODE_CORNER_RADIUS = 5
const NODE_ANCHOR_WIDTH = 10
const NODE_ANCHOR_HEIGHT = 10
const NODE_WIDTH = 100
const NODE_HEIGHT = 100
const NODE_BOTTOM_LINE_HEIGHT = 15
const NODE_LABEL_FONT_FAMILY = 'Calibri'
const NODE_LABEL_FONT_SIZE = 16

const Node = (props) => {
  const groupRef = useRef(null)
  const rectRef = useRef(null)
  const rectBottomLineRef = useRef(null)
  const {
    x,
    y,
    iconType,
    nodeLabel
  } = props

  const handleMouseEnter = () => {
    setCursor('grab')
  }

  const handleMouseLeave = () => {
    setCursor('default')
  }

  const handleMouseDown = (e) => {
    setCursor('grabbing')
    groupRef.current.to({
      ...NODE_MOUSE_DOWN_ANIMATION
    });
  }

  const handleMouseUp = (e) => {
    setCursor('grab')
    groupRef.current.to({
      ...NODE_MOUSE_UP_ANIMATION
    });
  }

  const getCoordsToCenterIcon = (iconWidth, iconHeight) => {
    const axisXCenter = NODE_WIDTH / 2
    const axisYCenter = NODE_HEIGHT / 2

    const iconX = axisXCenter - iconWidth / 2
    const iconY = axisYCenter - iconHeight / 2

    return [iconX, iconY]
  }


  return (
    <Group
      x={x}
      y={y}
      ref={groupRef}
      draggable
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Node body */}

      <Rect
        ref={rectRef}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        fill={color.white}
        easing={Konva.Easings.ElasticEaseInOut}
        strokeWidth={1}
        stroke={color.darkGray}
        cornerRadius={NODE_CORNER_RADIUS}
      />

      <Icon
        horizontalAlign={'center'}
        verticalAlign={'center'}
        iconType={iconType}
      />

      {/* Bottom gray line */}
      <Rect
        ref={rectBottomLineRef}
        y={NODE_HEIGHT - NODE_BOTTOM_LINE_HEIGHT}
        width={NODE_WIDTH}
        height={NODE_BOTTOM_LINE_HEIGHT}
        fill={color.darkGray}
        easing={Konva.Easings.ElasticEaseInOut}
        strokeWidth={1}
        stroke={color.darkGray}
        cornerRadius={[0, 0, NODE_CORNER_RADIUS, NODE_CORNER_RADIUS]}
      />

      {/* 4 node anchors (circles) */}
      {getNodeAnchors()}

      {/* Node label */}
      <Text
        y={NODE_HEIGHT + NODE_CAPTION_OFFSET}
        text={nodeLabel}
        fontSize={NODE_LABEL_FONT_SIZE}
        fontFamily={NODE_LABEL_FONT_FAMILY}
        fill={color.black}
        width={NODE_WIDTH}
        align='left'
      />
    </Group>
  )
}

const getNodeAnchors = () => {
  const anchors = []

  for (let currentNodeSide = 1; currentNodeSide < 5; currentNodeSide++) {
    let offsetX = 0
    let offsetY = 0

    if (currentNodeSide === 1) {
      offsetX = getXCenterOfNode()
      offsetY = 0
    }

    if (currentNodeSide === 2) {
      offsetX = getXCenterOfNode()
      offsetY = NODE_HEIGHT
    }

    if (currentNodeSide === 3) {
      offsetX = NODE_WIDTH
      offsetY = getYCenterOfNode()
    }

    if (currentNodeSide === 4) {
      offsetX = 0
      offsetY = getYCenterOfNode()
    }

    anchors.push(
      <NodeAnchor
        key={currentNodeSide}
        x={offsetX}
        y={offsetY}
        width={NODE_ANCHOR_WIDTH}
        height={NODE_ANCHOR_HEIGHT}
        color={color.white}
        borderColor={color.darkGray}
        onClick
      />
    )
  }

  return anchors
}

const getXCenterOfNode = () => NODE_WIDTH / 2;

const getYCenterOfNode = () => NODE_HEIGHT / 2;

export default Node
