import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as graphvisActions from '../actions/graphvisActions'
import D3GraphVis from '../components/D3GraphVis'

class GraphVis extends React.Component {
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
    return this.props.graphvisState.graphData === undefined
  }

  isLoading() {
    return this.props.graphvisState.loading
  }

  Spinner() {
    return <div className="c-graphvis__spinner"></div>
  }

  Button() {
    if (document.querySelector("svg")) return
    const { loading } = this.props.graphvisState
    return loading ? this.Spinner() : <button onClick={this.handleClick.bind(this)}>Load vis</button>
  }

  Information() {
    if (document.querySelector("svg")) return
    const { graphData } = this.props.graphvisState
    return (
      <div>
        <D3GraphVis graphData={graphData}/>
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
    graphvisState: state.graphvisReducerState
  }),
  // "mapDispatchToProps"
  dispatch => ({
    actions: bindActionCreators(graphvisActions, dispatch)
  })
)(GraphVis)
