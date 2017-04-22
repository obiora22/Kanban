import React, {Component, Proptypes} from 'react';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import SnackCart from './SnackCart';
import Snack from './Snack';

var snacks = ['Chips','Cupcake', 'Donut', 'Doritos', 'Popcorn']
class SnackShopContainer extends Component {
  constructor() {
    super();
    this.state = {
      snacks: snacks
    }
  }
  
  
  render() {
    return (
      <div>
        {snacks.map((snack, index) => {
          return <Snack key={index} name={snack}/>;
        })}
        <SnackCart />
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(SnackShopContainer);
