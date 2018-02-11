import React from 'react'
import * as d3 from 'd3'
import { withFauxDOM, animateFauxDOM } from 'react-faux-dom'
import DynamicGraph from '../components/DynamicGraph'

class D3GraphVis extends React.Component {
  componentDidMount() {
    // SETUP CUSTOM FILTERING -------------------------------------------------------------------------
    let minRadius = 7,
      scaleRadiusDownBy = 5
    const setNodeRadiusAndDegree = (node, graph) => {
      if (node.radius !== undefined) return node.radius
      node.degree = graph.links.filter(l => {
        return l.source == node.id || l.target == node.id
      }).length
      node.radius = minRadius + (node.degree / scaleRadiusDownBy)
    }

    let filterParams = {
      sampleParam: true,
    }

    // High-level filters
    const shouldKeepNode = node => (node.index % 2) === 0 // For testing purposes
    const shouldKeepLink = (nodesById, link) => {
      const sourceNode = nodesById[link.sourceId]
      const targetNode = nodesById[link.targetId]
      return shouldKeepNode(sourceNode) && shouldKeepNode(targetNode)
    }

    // Set node color based on type
    const nodeColor = node => {
      switch (getNodeInfo(node).category) {
        case "AssociationType":
          return "darkred"
        case "EntityType":
          return "skyblue"
        case undefined:
          return "#525252"
        default:
          console.error("ERROR: node improperly typed: ", node)
          return "red"
      }
    }

    // Tooltip display
    const tooltipInnerHTML = node => {
      return getNodeInfo(node).title
    }

    // PROJECT SPECIFIC HELPERS
    const getNodeInfo = node => node.type ? node : node.entityType

    // 3. GET DATA, LUANCH VIS -------------------------------------------------------------------------
    const graphDataJSONUrl = "https://raw.githubusercontent.com/davidnmora/open-lattice-edm-vis/master/graph-data.json"
    Promise.all([
      new Promise((res, rej) => d3.json(graphDataJSONUrl, function (error, JSONdata) { if (error) { rej(error) } else { res(JSONdata) } }))
    ])
      .then(([_graph]) => {

        // PROPERLY FORMAT DATA  
        let graph = _graph
        graph.nodesById = {}
        let namespaceHist = {}
        for (const node of graph.nodes) {
          graph.nodesById[node.id] = node
          let namespace = getNodeInfo(node).type.namespace
          if (!namespaceHist[namespace]) namespaceHist[namespace] = 0
          namespaceHist[namespace]++
          setNodeRadiusAndDegree(node, graph)
        }
        console.log(namespaceHist)

        for (const link of graph.links) {
          link.sourceId = link.source
          link.targetId = link.target
        }

        // KEY STEP: PASS CONNECTED COMPONENT TO props
        // connectFauxDOM(node, nameInProps)
        // This will store the node element and make it available via this.props[name]. 
        // It also makes an asynchronous call to drawFauxDOM. The node can be a faux element or a string, 
        // in which case a faux element is instantiated. The node is returned for convenience.
        const faux = this.props.connectFauxDOM('div', 'chart')

        // Launch vis
        let nodes = graph.nodes
        let links = graph.links
        let vis = DynamicGraph(d3.select(faux), { width: 1000 })
          .nodeColor(nodeColor)
          .nodeRadius(node => node.radius)
          .tooltipInnerHTML(tooltipInnerHTML)
          .updateVis(nodes, links)

        // Update vis (filter out half the nodes)
        nodes = graph.nodes.filter(node => shouldKeepNode(node))
        links = graph.links.filter(link => shouldKeepLink(graph.nodesById, link))
        // setTimeout(() => vis.updateVis(nodes, links), 2000)

        // Because d3 manually updates the DOM, transitions don't work.
        // animateFauxDOM(forThisLong) rerenders ReactDOM every 16 ms to allow for d3 transitions
        this.props.animateFauxDOM(10000) // TO DO: test this

      }); // closes Primise.then(...)
  }

  render() {
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