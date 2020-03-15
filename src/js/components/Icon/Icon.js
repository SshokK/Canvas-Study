import React, { useEffect, useRef } from 'react'
import pt from 'prop-types'
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
    offsetX,
    offsetY,
    iconType,
    verticalAlign,
    horizontalAlign,
    onMouseEnter,
    onMouseLeave
  } = props

  useEffect(() => setInitialPosition(), [])

  const setInitialPosition = () => {
    if (iconRef.current) {
      const { width: parentWidth, height: parentHeight } = iconRef.current.parent.getClientRect()
      const [x, y] = getIconCoords(parentWidth, parentHeight)
      iconRef.current.to({
        x: x + offsetX,
        y: y + offsetY
      })
    }
  }

  const getIconCoords = (parentWidth, parentHeight) => {
    const { width, height } = iconRef.current.getClientRect()

    let x = 0;
    let y = 0;

    if (horizontalAlign === 'center') {
      x = (parentWidth / 2) - (width / 2)
    }

    if (horizontalAlign === 'right') {
      x = parentWidth - width
    }

    if (verticalAlign === 'middle') {
      y = (parentHeight / 2) - (height / 2)
    }

    if (verticalAlign === 'bottom') {
      y = parentHeight - height
    }

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

Icon.propTypes = {
  offsetX: pt.number,
  offsetY: pt.number,
  iconType: pt.oneOf([...Object.values(ICON_TYPE)]),
  horizontalAlign: pt.oneOf(['left', 'center', 'right']),
  verticalAlign: pt.oneOf(['top', 'middle', 'bottom']),
  onMouseEnter: pt.func,
  onMouseLeave: pt.func
}

Icon.defaultProps = {
  offsetX: 0,
  offsetY: 0,
  iconType: "",
  horizontalAlign: 'left',
  verticalAlign: "top",
  onMouseEnter: () => {},
  onMouseLeave: () => {}
}
