import React, {  useRef, useState } from 'react'
import Konva from 'konva'
import { Rect, Group, Text, Circle } from 'react-konva'
import NodeAnchor from 'Components/Node/NodeAnchor'
import { color } from 'Utils/color-helpers'
import { setCursor } from 'Utils/dom-helpers'
import Icon from 'Components/Icon/Icon'
import Link from 'Components/Link/Link'

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
const NODE_BOTTOM_LINE_HEIGHT = 10
const NODE_LABEL_FONT_FAMILY = 'Calibri'
const NODE_LABEL_FONT_SIZE = 16

const Node = (props) => {
  const groupRef = useRef(null)
  const rectRef = useRef(null)
  const rectBottomLineRef = useRef(null)
  const [areAnchorsVisible, makeAnchorsVisible] = useState(false)

  const {
    x,
    y,
    iconType,
    onAnchorClick,
    nodeLabel
  } = props

  const handleMouseEnter = () => {
    setCursor('grab')
    makeAnchorsVisible(true)
  }

  const handleMouseLeave = () => {
    setCursor('default')
    makeAnchorsVisible(false)
  }

  const handleMouseDown = (e) => {
    setCursor('grabbing')
    /* groupRef.current.to({
      ...NODE_MOUSE_DOWN_ANIMATION
    }); */
  }

  const handleMouseUp = (e) => {
    setCursor('grab')
    /* groupRef.current.to({
      ...NODE_MOUSE_UP_ANIMATION
    }); */
  }

  const handleAnchorClick = (anchorCoords) => {
    console.log('clicked')
    onAnchorClick(anchorCoords)
  }

  const renderAnchor = (key, offsetX, offsetY) => {
    return (
      <NodeAnchor
        key={key}
        x={offsetX}
        y={offsetY}
        width={NODE_ANCHOR_WIDTH}
        height={NODE_ANCHOR_HEIGHT}
        color={color.white}
        borderColor={color.darkGray}
        onClick={handleAnchorClick}
      />
    )
  }

  const renderAnchors = () => {
    if (areAnchorsVisible) {
      return (
        <>
          {renderAnchor('top', getXCenterOfNode(), 0)}
          {renderAnchor('bottom', getXCenterOfNode(), NODE_HEIGHT - 5)}
          {renderAnchor('right', NODE_WIDTH, getYCenterOfNode())}
          {renderAnchor('left', 0, getYCenterOfNode())}
        </>
      )
    }
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
      <Group>
        <Rect
          ref={rectRef}
          width={NODE_WIDTH}
          height={NODE_HEIGHT - NODE_BOTTOM_LINE_HEIGHT}
          fill={color.white}
          easing={Konva.Easings.ElasticEaseInOut}
          strokeWidth={1}
          stroke={color.darkGray}
          cornerRadius={[NODE_CORNER_RADIUS, NODE_CORNER_RADIUS, 0, 0]}
        />

        <Icon
          iconType={iconType}
          verticalAlign={'middle'}
          horizontalAlign={'center'}
        />
      </Group>


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
      {renderAnchors()}

      {/* Node label */}
      <Text
        y={NODE_HEIGHT + NODE_CAPTION_OFFSET}
        text={nodeLabel}
        fontSize={NODE_LABEL_FONT_SIZE}
        fontFamily={NODE_LABEL_FONT_FAMILY}
        fill={color.black}
        width={NODE_WIDTH}
        align='center'
      />
    </Group>
  )
}

const getXCenterOfNode = () => NODE_WIDTH / 2;

const getYCenterOfNode = () => NODE_HEIGHT / 2;

export default Node
