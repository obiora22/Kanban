import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Header extends Component {
  render() {
    const navElements = ['home', 'new', 'edit']
    return (
      <nav className="navbar navbar-default">
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/new"><span className="glyphicon glyphicon-plus-sign"></span></Link></li>
          
        </ul>
      </nav>
    );
  }
}

export default Header;