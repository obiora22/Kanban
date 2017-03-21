import React from 'react';
import ReactDOM from 'react-dom';

class GroceryList extends React.Component {
  /*
    props are 'owned' by parent-component and
    passed down to child components.
  */
  render() {
    return (
      <div>
        {this.props.children}
        <ul>
          <ListItem quantity={1}>Breads</ListItem>
          <ListItem quantity={2}>Milks</ListItem>
          <ListItem quantity={3}>Butter</ListItem>
        </ul>
      </div>
    );
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <li>{this.props.quantity + " x " + this.props.children}</li>
    );
  }
}
export default GroceryList;
