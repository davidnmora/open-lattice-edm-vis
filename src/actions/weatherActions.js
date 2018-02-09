export const showWeather = response => ({
  type: 'WEATHER_SHOW_WEATHER',
  response
})

export const loadWeather = () => ({
  type: 'WEATHER_SHOW_LOADING'
})

export const getWeather = () => async dispatch => {
  dispatch(loadWeather())
  const url = "https://api.openlattice.com/datastore/edm/property/type"
  try {
    const response = await fetch(url)
    const json     = await response.json()
    console.log(json)
    // dispatch(showWeather(response))
  } catch(e) {
    console.error(e)
  }
}
