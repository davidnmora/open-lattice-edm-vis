import React from 'react'
import * as d3 from 'd3'
import {withFauxDOM} from 'react-faux-dom'

class D3GraphVis extends React.Component {
  componentDidMount () {
    
    // BORING SETUP
    let data = [{ "letter": "A", "frequency": 0.08167 }, { "letter": "B", "frequency": 0.01492 }, { "letter": "C", "frequency": 0.02782 }, { "letter": "D", "frequency": 0.04253 }, { "letter": "E", "frequency": 0.12702 }, { "letter": "F", "frequency": 0.02288 }, { "letter": "G", "frequency": 0.02015 }, { "letter": "H", "frequency": 0.06094 }, { "letter": "I", "frequency": 0.06966 }, { "letter": "J", "frequency": 0.00153 }, { "letter": "K", "frequency": 0.00772 }, { "letter": "L", "frequency": 0.04025 }, { "letter": "M", "frequency": 0.02406 }, { "letter": "N", "frequency": 0.06749 }, { "letter": "O", "frequency": 0.07507 }, { "letter": "P", "frequency": 0.01929 }, { "letter": "Q", "frequency": 0.00095 }, { "letter": "R", "frequency": 0.05987 }, { "letter": "S", "frequency": 0.06327 }, { "letter": "T", "frequency": 0.09056 }, { "letter": "U", "frequency": 0.02758 }, { "letter": "V", "frequency": 0.00978 }, { "letter": "W", "frequency": 0.0236 }, { "letter": "X", "frequency": 0.0015 }, { "letter": "Y", "frequency": 0.01974 }, { "letter": "Z", "frequency": 0.00074 }]
    let margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;
    let x = d3.scaleBand()
      .rangeRound([0, width])
    let y = d3.scaleLinear()
      .range([height, 0])

    let xAxis = d3.axisBottom()
      .scale(x)
    let yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10, "%");

    // KEY STEP: PASS CONNECTED COMPONENT TO props
    // connectFauxDOM(node, nameInProps)
    // This will store the node element and make it available via this.props[name]. 
    // It also makes an asynchronous call to drawFauxDOM. The node can be a faux element or a string, 
    // in which case a faux element is instantiated. The node is returned for convenience.
    const faux = this.props.connectFauxDOM('div', 'chart')
    let svg = d3.select(faux).append("svg") 
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    x.domain(data.map((d) => d.letter));
    y.domain([0, d3.max(data, (d) => d.frequency)]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.letter))
      .attr("width", 20)
      .attr("y", (d) => y(d.frequency))
      .attr("height", (d) => { return height - y(d.frequency) });

    this.props.animateFauxDOM(8000) // WHAT DOES THIS DO?! (nothing)
  }

  render () {
    return (
      <div>
        <div className='renderedD3'>
          {this.props.chart}
        </div>
      </div>
    )
  }
}

D3GraphVis.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(D3GraphVis)