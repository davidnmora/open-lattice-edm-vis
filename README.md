# OpenLattice EDM Graph Vis

This project was bootstrapped with Create React App and Redux, Sass Structure.

Find the starter template I used here: 
[Create React Redux App](https://github.com/yingray/create-react-redux-app)

## Work still to be done on the project
Very much a work in progress, several major to-dos remain:
* Integrate d3 with React. I haven't had time yet to separate d3 out to just do math, and React to take of all DOM changes. As such, you'll see that the d3 vis is just appended onto the body, outside of the React app (and as a result persists across About and Vis tabs).
* For this project, I create a D3 module I'm calling DynamicGraph which exposes a high level API for a force layout which transitions smoothly between graph updates and changes, and which allows you to select nodes. As there wasn't time to add interactive filters, this module remains largely un-exersized. To see it in action, try uncommenting lines 81-84 in D3GraphVis.js. [Find the DynamicGraph D3 module here](https://github.com/davidnmora/dynamic-graph)

## Dependencies

* React
  * react
  * react-dom

* Create React App
  * react-scripts

* Redux
  * redux
  * react-redux
  * react-router
  * react-router-redux
  * redux-thunk

* Sass
  * node-sass-chokidar

* Fetch
  * babel-polyfill

* Other
  * d3

