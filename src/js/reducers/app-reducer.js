import {
  ADD_STAGE_ELEMENT,
  REMOVE_STAGE_ELEMENT
} from 'Actions/app-actions'

const initialState = {
  stage: {
    elements: []
  }
}

const appReducer = (state = initialState, { type, data } = {}) => {
  switch (type) {
    case ADD_STAGE_ELEMENT: {
      return {
        ...state,
        stage: {
          ...state.stage,
          elements: [...state.stage.elements, data]
        }
      }
    }

    case REMOVE_STAGE_ELEMENT: {

    }

    default: {
      return state
    }
  }
}

export default appReducer
