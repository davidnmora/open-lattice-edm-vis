import React from 'react'
import Navigation from './Navigation'

const Header = props =>
  <div className="c-header">
    <img src="https://openlattice.com/edm/static/assets/images/logo_and_name.4a631861.png" className="c-header__logo" alt="create-react-redux-app-logo" />
    <h2>Entity Data Model (EDM)</h2>
    <Navigation />
  </div>

export default Header
