import React, { useState, useEffect } from 'react'
import { Layer, Stage } from 'react-konva'
import Link from 'Components/Link/Link'
import DebugGrid from 'Components/DebugGrid/DebugGrid'
import TasksMenu from 'Components/TasksMenu/TasksMenu'
import ZoomButtons from 'Components/ZoomButtons/ZoomButtons'
import Node from 'Components/Node/Node'
import styles from './App.scss'

const TASKS_MENU_COORDS = [30, 150]
const ZOOM_BUTTONS_COORDS = [30, 800]
const SPACE_BETWEEN_GRID_LINES = 50
const ESC_KEY_CODE = 27

const App = () => {
  const [nodes, changeNodes] = useState([])
  const [nodesLinks, changeNodesLinks] = useState([])
  const [clickedAnchorCoords, changeClickedAnchorCoords] = useState([])
  const [zoomLevel, changeZoomLevel] = useState(1)
  const [mousePosition, changeMousePosition] = useState([])

  const stageWidth = window.innerWidth
  const stageHeight = window.innerHeight

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => document.addEventListener("keydown", handleKeyPress)
  }, [])

  const handleKeyPress = (e) => {
    // Unselect clicked anchor
    if (e.keyCode === ESC_KEY_CODE) {
      changeClickedAnchorCoords([])
    }
  }

  const handleAnchorClick = (anchorCoords) => {
    if (clickedAnchorCoords.length) {

      // Unselect if the same anchor was clicked
      if (anchorCoords[0] === clickedAnchorCoords[0] && anchorCoords[1] === clickedAnchorCoords[1]) {
        changeClickedAnchorCoords([])
      }

      changeNodesLinks([...nodesLinks, <Link points={[...clickedAnchorCoords, ...anchorCoords]}/>])
      changeClickedAnchorCoords([])
    } else {
      changeClickedAnchorCoords(anchorCoords)
    }
  }

  const handleMouseMove = (e) => changeMousePosition([e.evt.clientX, e.evt.clientY])

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
      nodes.map((nodeType, i) => (
        <Node
          onAnchorClick={handleAnchorClick}
          nodeLabel={'Node label'}
          iconType={nodeType}
        />
      ))
    )
  }

  const renderNodesLinks = () => {
    return (
      nodesLinks.map((Link, i) => Link)
    )
  }

  const renderMenus = () => {
    return (
      <>
        <TasksMenu
          onTaskTypeClick={(node) => changeNodes([...nodes, node])}
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

  const renderTemporalLink = () => {
    if (mousePosition.length && clickedAnchorCoords.length) {
      return (
        <Link
          isTemporal
          points={[...clickedAnchorCoords, ...mousePosition]}
        />
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.stage_wrapper}>
        <Stage
          width={stageWidth}
          height={stageHeight}
          onMouseMove={handleMouseMove}
        >
          <Layer>
            {renderDebugGrid()}
          </Layer>
          <Layer scaleX={zoomLevel} scaleY={zoomLevel}>
            {renderNodesLinks()}
            {renderNodes()}
            {renderTemporalLink()}
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
