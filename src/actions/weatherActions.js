export const showWeather = response => ({
  type: 'WEATHER_SHOW_WEATHER',
  response
})

export const loadWeather = () => ({
  type: 'WEATHER_SHOW_LOADING'
})

export const getWeather = () => async dispatch => {
  dispatch(loadWeather())
  const dataTypes = {
    PROPERTY:    0,
    ENTITY:      1,
    ASSOCIATION: 2
  }
  const urls = [
    "https://api.openlattice.com/datastore/edm/property/type",
    "https://api.openlattice.com/datastore/edm/entity/type",
    "https://api.openlattice.com/datastore/edm/association/type"
  ]
  try {
    const edmPromises = urls.map(url => fetch(url).then(response => response.json()));
    Promise.all(edmPromises).then(edmJSONs => {
      console.log(edmJSONs)
      let graphData = {
        nodes: [],
        links: [],
        nodesById: {} // In d3, links contain only sourId <-> targetId, so we need a map of nodeId -> node.
      }
      for (const json of edmJSONs) addJSONToGraph(graphData, json)
      // graphData.nodes now holds a non-redundant list of all nodes, populate nodes with it
      graphData.nodes = Object.values(graphData.nodesById)
      console.log(graphData)

    });
    // dispatch(showWeather(response)) // BE SURE TO RE-ADD
  } catch (e) {
    console.error(e)
    // TO DO: display error
  }
}

const addJSONToGraph = (graphData, entityJSON) => {
  let skippedAssoc = 0
  for (const entity of entityJSON) {
    graphData.nodesById[entity.id || entity.entityType.id] = entity
    // Skip properties, who have no edge info
    if (entity.datatype) continue 
    // Handle Entities
    if (entity.category === "EntityType"){
      for (const propertyId of entity.properties) addLink(entity.id, propertyId, graphData.links)
      continue
    }
    // Handle Associations, which should be rejected when they appear in the Entity data
    if (entity.category === "AssociationType") continue
    if (entity.entityType) {
      for (const propertyId of entity.entityType.properties) addLink(entity.entityType.id, propertyId, graphData.links)
      // Make the Association connect the src and dst
      addLink(entity.src, entity.entityType.id, graphData.links) 
      addLink(entity.entityType.id, entity.dst, graphData.links) 
      continue
    } else {
      console.error("FAULTY DATA ENTRY: not properly formatted to specs.", entity)
    }
  }
}

const addLink = (sourceId, targetId, links) => links.push({ source: sourceId, target: targetId })