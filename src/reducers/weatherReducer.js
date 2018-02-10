const initialState = {
  loading: false,
  graphData: undefined
}

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WEATHER_SHOW_LOADING':
      return Object.assign({}, state, {
        loading: true
      })

    case 'WEATHER_SHOW_WEATHER':
      return Object.assign({}, state, {
        loading: false,
        graphData: action.graphData
      })

    default:
      return Object.assign({}, state, initialState)
  }
}

export default weatherReducer
