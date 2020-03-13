import React, { useState } from 'react'
import { Layer, Stage } from 'react-konva'
import Link from 'Components/Link/Link'
import DebugGrid from 'Components/DebugGrid/DebugGrid'
import TasksMenu from 'Components/TasksMenu/TasksMenu'
import ZoomButtons from 'Components/ZoomButtons/ZoomButtons'
import styles from './App.scss'

const TASKS_MENU_COORDS = [30, 150]
const ZOOM_BUTTONS_COORDS = [30, 800]
const SPACE_BETWEEN_GRID_LINES = 50

const App = () => {
  const [nodes, changeNodes] = useState([])
  const [nodesLinks, changeNodesLinks] = useState([])
  const [zoomLevel, changeZoomLevel] = useState(1)

  const stageWidth = window.innerWidth
  const stageHeight = window.innerHeight

  const renderDebugGrid = () => {
    return (
      <DebugGrid
        width={stageWidth}
        height={stageHeight}
        spaceBetweenLines={SPACE_BETWEEN_GRID_LINES}
      />
    )
  }

  const renderNodes = () => {
    return (
      nodes.map((Element, i) => (
        <Element
          key={i}
          handleNodeSelection={(node) => changeNodes([...nodes, node])}
          handleLinkSelection={(link) => changeNodesLinks([...nodesLinks, link])}
        />
      ))
    )
  }

  const renderNodesLinks = () => {
    return (
      nodesLinks.map((Link, i) => <Link key={i}/>)
    )
  }

  const renderMenus = () => {
    return (
      <>
        <TasksMenu
          x={TASKS_MENU_COORDS[0]}
          y={TASKS_MENU_COORDS[1]}
        />
        <ZoomButtons
          x={ZOOM_BUTTONS_COORDS[0]}
          y={ZOOM_BUTTONS_COORDS[1]}
          zoomLevel={zoomLevel}
          onClick={(zoomLevel) => changeZoomLevel(zoomLevel)}
        />
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.stage_wrapper}>
        <Stage
          width={stageWidth}
          height={stageHeight}
        >
          <Layer>
            {renderDebugGrid()}
          </Layer>
          <Layer scaleX={zoomLevel} scaleY={zoomLevel}>
            {renderNodes()}
            {renderNodesLinks()}
          </Layer>
          <Layer>
            {renderMenus()}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default App
