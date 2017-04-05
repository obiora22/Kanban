import React, {Component, Proptypes} from 'react';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SnackCart from './SnackCart';
import Snack from './Snack';

class SnackShopContainer extends Component {
  render() {
    return (
      <div>
        <Snack name='Chips'/>
        <Snack name='Cupcake'/>
        <Snack name='Donut'/>
        <Snack name='Doritos'/>
        <Snack name='Popcorn'/>
        <SnackCart/>
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(SnackShopContainer);
