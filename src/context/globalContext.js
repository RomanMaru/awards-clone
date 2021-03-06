import React, { createContext, useReducer, useContext } from 'react'

const defaulState = {
  currentTheme: 'light',
  cursorType: false,
  cursorStyles: []
}
const GlobalStateContext = createContext(defaulState)
const GlobalDispatchContext = createContext(defaulState)

const globalReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME": {
      return {
        ...state,
        currentTheme: action.theme,
      }
    }
    case "CURSOR_TYPE": {
      return {
        ...state,
        cursorType: action.cursorType,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    currentTheme: window.localStorage.getItem('theme') == null ? 'dark' : window.localStorage.getItem('theme'),
    cursorType: false,
    cursorStyles: ['pointer', 'hovered', 'locked']
  })

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  )
}

export const useGlobalStateContext = () => useContext(GlobalStateContext)

export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)