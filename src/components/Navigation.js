import React from 'react'
import { Link } from 'react-router'

const Navigation = ({ className, buttonClassName }) =>
  <nav className={className}>
    <Link className={buttonClassName} to="/">
      Home
    </Link>
    <Link className={buttonClassName} to="graphvis">
      Graph Vis
    </Link>
  </nav>

Navigation.defaultProps = {
  className: '',
  buttonClassName: 'c-button'
}

export default Navigation
