export const showWeather = graphData => ({
  type: 'WEATHER_SHOW_WEATHER',
  graphData
})

export const loadWeather = () => ({
  type: 'WEATHER_SHOW_LOADING'
})

export const getWeather = () => dispatch => {
  dispatch(loadWeather())
  const urls = [
    "https://api.openlattice.com/datastore/edm/property/type",
    "https://api.openlattice.com/datastore/edm/entity/type",
    "https://api.openlattice.com/datastore/edm/association/type"
  ]
  try {
    // const edmPromises = urls.map(url => fetch(url).then(response => response.json()));
    // Promise.all(edmPromises).then(edmJsons => {
    //   console.log(edmJsons)
    //   let graphData = {
    //     nodes: [],
    //     links: [],
    //     nodesById: {} // In d3, links contain only sourId <-> targetId, so we need a map of nodeId -> node for meta info
    //   }
    //   for (const json of edmJsons) addJSONToGraph(graphData, json)
    //   // graphData.nodes now holds a non-redundant list of all nodes, populate nodes with it
    //   graphData.nodes = Object.values(graphData.nodesById)
    //   // ERROR PREVENTION: in the event an id is listed as a property/src/dst, but doesn't exist, purge it (there seems to be 4 such ids)
    //   graphData.links = graphData.links.filter(link => (link.source in graphData.nodesById) && (link.target in graphData.nodesById))
    //   console.log(graphData)
    //   // console.log(JSON.stringify(graphData))
      const graphData = { yo: "yo" } // TEMP
      dispatch(showWeather(graphData)) 
    // });
    
  } catch (e) {
    console.error(e)
    // TO DO: display error
  }
}

const addJSONToGraph = (graphData, entityJSON) => {
  for (const entity of entityJSON) {
    if (entity.entityType) entity.id = entity.entityType.id // d3 needs every object to have an un-nested id property
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
      console.error("FAULTY DATA ENTRY: not properly formatted to specs: ", entity)
    }
  }
}

const addLink = (sourceId, targetId, links) => {
  // Formatting: some Associations have src/dst: [id]
  if (sourceId instanceof Array) sourceId = sourceId[0]
  if (targetId instanceof Array) targetId = targetId[0]
  // TO DO: do some entities have MULTIPE src/dst?
  links.push({ source: sourceId, target: targetId })
}