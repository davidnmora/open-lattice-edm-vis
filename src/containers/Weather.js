import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as weatherActions from '../actions/weatherActions'
import D3GraphVis from '../components/D3GraphVis'

class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.hasLoaded = this.hasLoaded.bind(this)
    this.isLoading = this.isLoading.bind(this)
    this.Spinner = this.Spinner.bind(this)
    this.Button = this.Button.bind(this)
    this.Information = this.Information.bind(this)
  }

  handleClick() {
    this.props.actions.getWeather()
  }

  hasLoaded() {
    return this.props.weatherState.graphData === undefined
  }

  isLoading() {
    return this.props.weatherState.loading
  }

  Spinner() {
    return <div className="c-weather__spinner"></div>
  }

  Button() {
    const { loading } = this.props.weatherState
    return loading ? this.Spinner() : <button onClick={this.handleClick.bind(this)}>Load vis</button>
  }

  Information() {
    const { graphData } = this.props.weatherState
    return (
      <div>
        <p>Working: { graphData.yo } </p>
        <D3GraphVis />
      </div>
    )
  }

  render() {
    return <div>
      {this.hasLoaded() ? this.Button() : this.Information() }
    </div>
  }
}

export default connect(
  // "mapStateToProps" (mapSTOREtoProps)
  state => ({
    weatherState: state.weatherReducerState
  }),
  // "mapDispatchToProps"
  dispatch => ({
    actions: bindActionCreators(weatherActions, dispatch)
  })
)(Weather)
