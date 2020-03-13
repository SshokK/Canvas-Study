import React, { useEffect, useState, useRef } from 'react'
import { Path, Group } from 'react-konva'
import ManualIconSvg from 'Icons/manual.svg';
import ApiIconSvg from 'Icons/api.svg';
import SmsIconSvg from 'Icons/mail.svg';
import NotificationIconSvg from 'Icons/date-range.svg'
import { getPathsFromSvgString } from 'Utils/string-helpers'
import { color } from 'Utils/color-helpers'

export const ICON_TYPE = {
  MANUAL: ManualIconSvg,
  NOTIFICATION: NotificationIconSvg,
  SMS: SmsIconSvg,
  API: ApiIconSvg
}

const Icon = (props) => {
  const iconRef = useRef(null)
  const {
    iconType,
    verticalAlign,
    horizontalAlign,
    onMouseEnter,
    onMouseLeave
  } = props

  useEffect(() => setInitialPosition(), [])

  const setInitialPosition = () => {
    const { width: parentWidth, height: parentHeight } = iconRef.current.parent.getClientRect()
    const [x, y] = getIconCoords(parentWidth, parentHeight)
    iconRef.current.to({
      x,
      y
    })
  }

  const getIconCoords = (parentWidth, parentHeight) => {
    const { width, height } = iconRef.current.getClientRect()

    console.log(width)

    let x = 0;
    let y = 0;

    if (horizontalAlign === 'center') {
      x = (parentWidth / 2) - (width / 2)
    }

    if (horizontalAlign === 'right') {
      x = parentWidth - width
    }

    if (verticalAlign === 'center') {
      y = (parentHeight / 2) - (height / 2)
    }

    if (horizontalAlign === 'bottom') {
      y = parentHeight - height
    }

    console.log(x, y)

    console.log(parentWidth, parentHeight, width, height)

    return [x, y]
  }

  const paths = getPathsFromSvgString(iconType)

  if (!paths.length) {
    return null
  }

  let path;

  if (iconType === ICON_TYPE.NOTIFICATION || iconType === ICON_TYPE.SMS) {
    path = paths[0]
  } else {
    path = paths[1]
  }

  return (
    <Group
      ref={iconRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Path
        fill={color.alto}
        data={path}
        scaleX={2}
        scaleY={2}
      />
    </Group>
  )
}

export default Icon
