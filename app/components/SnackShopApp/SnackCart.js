import React, {Component, PropTypes} from 'react';
import {DropTarget} from 'react-dnd';
import update from 'immutability-helper';
import Snack from './Snack';
var snacks = ['Beef pattie']
// spec 
// dropTarget methods(all optional): 'drop', 'hover', 'canDrop'.
var spec = {
  drop(props, monitor, component) {
    console.log(monitor.getItem());
    component.updateSnacks(monitor.getItem().name);
    return {name: 'Shopping cart'};
  },
  hover(props, monitor, component) {
    
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
  constructor() {
    super();
    this.updateSnacks = this.updateSnacks.bind(this);
    this.state = {
      snacks: snacks
    };
  }
  updateSnacks(newSnack) {
    
    var newSnacks = update(this.state.snacks, {
      $push: [newSnack]
    });
    console.log(newSnacks);
    this.setState({
      snacks: newSnacks
    });
    console.log(this.state.snacks);
  }
  render() {
   
    const {isOver, canDrop} = this.props;
    const isActive = isOver && canDrop;
    var backgroundColor = 'red';

    if (isActive) {
      backgroundColor = 'orange';
    } 

    const style = {
      backgroundColor: backgroundColor,
      border: '1px solid red'
    }
    return this.props.connectDropTarget(
      <div className="shopping-cart" style={style}>
        { isActive ? 'Yes, finally, Snacks!' : 'Drag snacks over here to order!'}
        {this.state.snacks.map((snackName, index) => {
          return <Snack key={index} name={snackName}/>
        })}
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