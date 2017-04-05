import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';

// spec
// dragSource methods: 'beginDrag'(required), 'endDrag', 'canDrag', 'isDragging'.
var spec = {
  beginDrag(props, monitor, component) {
    return {name: props.name} // describes data being dragged
  },
  endDrag(props, monitor, component) {
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();
    const didDrop = monitor.didDrop();
    if (didDrop) {
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}.`)
    }
  }
}

var collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    
  }
}

class Snack extends Component {
  render() {
    const {name, isDragging, didDrop, connectDragSource} = this.props;
    const opacity = isDragging ? 0.3 : 1;
    
    var style = {
      opacity: opacity,
      cursor: 'pointer',
      visibility: visibility
    }
    return (
      connectDragSource(
        <p style={style}>
          {this.props.name}
        </p>
      )
    );
  }
}
Snack.propTypes = {
  name: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}
export default DragSource('snack', spec, collect)(Snack);