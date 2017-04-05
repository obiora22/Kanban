import React, {Component, PropTypes} from 'react';
import {DropTarget} from 'react-dnd';

// spec 
// dropTarget methods(all optional): 'drop', 'hover', 'canDrop'.
var spec = {
  drop() {
    return {name: 'Shopping cart'};
  }
}

// collect 

var collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}
class SnackCart extends Component {
  render() {
   
    const {isOver, canDrop} = this.props;
    const isActive = isOver && canDrop;
    var backgroundColor = 'red';

    if (isActive) {
      backgroundColor = 'orange';
    } else  if (canDrop) {
      backgroundColor = 'blue';
    }

    const style = {
      backgroundColor: backgroundColor,
      border: '1px solid red'
    }
    return this.props.connectDropTarget(
      <div className="shopping-cart" style={style}>
        { isActive ? 'Yes, finally, Snacks!' : 'Drag snacks over here to order!'}
      </div>
    );
  }
}

SnackCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}
export default DropTarget('snack', spec, collect)(SnackCart);