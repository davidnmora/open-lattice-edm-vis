import React from 'react'
import * as d3 from 'd3'
import DynamicGraph from '../components/DynamicGraph'

class D3GraphVis extends React.Component {
  componentDidMount() {
    // CUSTOM FILTERING AND DATA PROCESSING FUNCTIONS -------------------------------------------------------------------------
    const setNodeRadiusAndDegree = (node, graph) => {
      const minRadius = 7,
        scaleRadiusDownBy = 5
      if (node.radius !== undefined) return node.radius
      node.degree = graph.links.filter(l => {
        return l.source == node.id || l.target == node.id
      }).length
      node.radius = minRadius + (node.degree / scaleRadiusDownBy)
    }

    // High-level filters
    const shouldKeepNode = node => (node.index % 2) === 0 // For testing purposes
    const shouldKeepLink = (nodesById, link) => {
      const sourceNode = nodesById[link.sourceId]
      const targetNode = nodesById[link.targetId]
      return shouldKeepNode(sourceNode) && shouldKeepNode(targetNode)
    }

    // Set node color based on type
    const nodeColorKey = {
      association: "darkred",
      entity: "skyblue",
      property: "#525252" // grey
    }
    
    const nodeColor = node => {
      switch (getNodeInfo(node).category) {
        case "AssociationType":
          return nodeColorKey.association
        case "EntityType":
          return nodeColorKey.entity
        case undefined: // Property doesn't have a category entry
          return nodeColorKey.property
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
    // PROPERLY FORMAT DATA  
    let graph = this.props.graphData
    graph.nodesById = {}
    let namespaceHist = {} // TO DO: display namespace histograph, dynamically highlighting nodes on hover
    for (const node of graph.nodes) {
      graph.nodesById[node.id] = node
      let namespace = getNodeInfo(node).type.namespace
      if (!namespaceHist[namespace]) namespaceHist[namespace] = 0
      namespaceHist[namespace]++
      setNodeRadiusAndDegree(node, graph)
    }

    for (const link of graph.links) {
      link.sourceId = link.source
      link.targetId = link.target
    }

    // Launch vis
    let nodes = graph.nodes
    let links = graph.links
    let vis = DynamicGraph(d3.select("body" /*TO DO: actually integrate with React */), { width: window.innerWidth, height: 700 })
      .nodeColor(nodeColor)
      .tooltipInnerHTML(tooltipInnerHTML)
      .updateVis(nodes, links)

    // Test updating vis (filter out half the nodes)
    // nodes = graph.nodes.filter(node => shouldKeepNode(node))
    // links = graph.links.filter(link => shouldKeepLink(graph.nodesById, link))
    // setTimeout(() => vis.updateVis(nodes, links), 2000)
  }

  render() {
    return (
      <div>
        <div id="vis-key">
          <p>Nodes are sized by degree, and colored by EDM DataType:</p>
          <h3 id="key-property"    className="key-entry">Property</h3>
          <h3 id="key-entity"      className="key-entry">Entity</h3>
          <h3 id="key-association" className="key-entry">Association</h3>
        </div>
        <div className='renderedD3'></div>
      </div>
    )
  }
}

export default D3GraphVis