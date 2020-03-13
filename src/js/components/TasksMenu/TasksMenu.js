import React, { Fragment, useState } from 'react'
import { Group, Text, Rect } from 'react-konva'
import Icon, { ICON_TYPE } from 'Components/Icon/Icon'
import Wrapper from 'Components/Wrapper/Wrapper'
import { setCursor } from 'Utils/dom-helpers'
import { color } from 'Utils/color-helpers'
import Node from 'Components/Node/Node'

const TASKS_MENU_WIDTH = 150
const TASKS_MENU_HEIGHT = 480
const TASKS_MENU_LABEL_OFFSET_X = 50
const TASKS_MENU_LABEL_OFFSET_Y = 20
const TASKS_MENU_LABEL_VALUE = 'TASKS'

const TASKS_GROUP_OFFSET_y = 70
const TASKS_GROUP_OFFSET_X = 50
const ICON_SPACE_BETWEEN = 100

const ICON_LABEL_MARGIN_TOP = 5
const ICON_LABEL_FONT_SIZE = 16
const ICON_LABEL_FONT_FAMILY = 'Calibri'
const ICON_LABEL_ALIGNMENT = 'left'

const TASK_CLICKABLE_AREA_WIDTH = 75
const TASK_CLICKABLE_AREA_HEIGHT = 75

const iconsConfig = [
  {
    type: ICON_TYPE.MANUAL,
    iconOffsetX: 0,
    iconOffsetY: 0,
    labelText: 'Manual',
    labelWidth: 50,
    labelOffsetX: 0,
    labelOffsetY: 50,
  },
  {
    type: ICON_TYPE.NOTIFICATION,
    iconOffsetX: 0,
    iconOffsetY: 0,
    labelText: 'Notification',
    labelWidth: 100,
    labelOffsetX: -15,
    labelOffsetY: 50,
  },
  {
    type: ICON_TYPE.SMS,
    iconOffsetX: 0,
    iconOffsetY: 0,
    labelText: 'SMS',
    labelWidth: 50,
    labelOffsetX: 8,
    labelOffsetY: 50,
  },
  {
    type: ICON_TYPE.API,
    iconOffsetX: 0,
    iconOffsetY: 0,
    labelText: 'API',
    labelWidth: 50,
    labelOffsetX: 10,
    labelOffsetY: 50,
  }
]

const TasksMenu = (props) => {
  const {
    x,
    y,
    ...otherProps
  } = props

  const renderTaskButton = (y, { type, labelText, labelWidth, labelOffsetX, labelOffsetY }) => {
    return (
      <Group y={y}>
        <Icon
          iconType={type}
        />
        <Text
          x={labelOffsetX}
          y={labelOffsetY + ICON_LABEL_MARGIN_TOP}
          text={labelText}
          fontSize={ICON_LABEL_FONT_SIZE}
          fontFamily={ICON_LABEL_FONT_FAMILY}
          fill={color.darkGray}
          width={labelWidth}
          align={ICON_LABEL_ALIGNMENT}
        />

        {/* Clickable area */}
        <Rect
          x={-13}
          width={TASK_CLICKABLE_AREA_WIDTH}
          height={TASK_CLICKABLE_AREA_HEIGHT}
          opacity={0}
        />

        <Node
          y={y}
          nodeLabel={'Node label'}
          iconType={type}
        />
      </Group>
    )
  }

  const renderTaskButtons = () => {
    const icons = []

    iconsConfig.forEach((icon, i) => {
      const taskButtonOffsetY = i * ICON_SPACE_BETWEEN + icon.iconOffsetY

      icons.push(
        <Fragment key={i}>
          {renderTaskButton(taskButtonOffsetY, icon)}
        </Fragment>
      )
    })

    return (
      <Group
        x={TASKS_GROUP_OFFSET_X}
        y={TASKS_GROUP_OFFSET_y}
      >
        {icons}
      </Group>
    )
  }

  return (
    <Group>
      <Wrapper
        x={x}
        y={y}
        width={TASKS_MENU_WIDTH}
        height={TASKS_MENU_HEIGHT}
        label={TASKS_MENU_LABEL_VALUE}
        labelOffsetX={TASKS_MENU_LABEL_OFFSET_X}
        labelOffsetY={TASKS_MENU_LABEL_OFFSET_Y}
      >
        {renderTaskButtons()}
      </Wrapper>
    </Group>
  )
}

export default TasksMenu
