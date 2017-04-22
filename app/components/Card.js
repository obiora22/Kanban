import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './CheckList';
import {DragSource, DropTarget} from 'react-dnd';
import marked from 'marked';

var PropTypes = React.PropTypes;

var DropTargetCardSpec = {
  hover(props, monitor, component) {
    var draggedCardId = monitor.getItem().id;
    props.cardCallbacks.updateCardPosition(draggedCardId, props.cardId);
  }
}
var dropTargetCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}
var cardSpec = {
  beginDrag(props, monitor, component) {
    return {
      id: props.cardId,
      status: props.status
    };
  },
  endDrag(props, monitor, component) {
    cardCallbacks.persistCardDrag(props.id, props.status);
  }
}

var cardCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    canDrop: monitor.canDrag()
  }
}

class Card extends Component {
  constructor() {
    super()
    this.state = {
      showDetails: false,
      value: ''
    }
    this.toggleDetails = this.toggleDetails.bind(this) // get 'this' to reference React instance
  }
 
  toggleDetails(e) {
    // if (this.state.showDetails) {
    //   this.setState({
    //     showDetails: false
    //   })
    // } else {
    //   this.setState({
    //     showDetails: true
    //   })
    // }
    this.setState({showDetails: !this.state.showDetails})

  }
  handleUserInput(e) {
    e.preventDefault();
    this.props.taskCallbacks.add(this.props.cardId, e.target.taskName.value);
    this.setState({
      value: ''
    })
  }
  render() {
    let cardDetails = (<form>
      {this.props.tasks.map((task, index) => {
        return (
          <fieldset key={index} className="">
            <CheckList key={index}
              cardId={this.props.cardId}
              taskId={task.id} name={task.name}
              done={task.done}
              taskCallbacks={this.props.taskCallbacks}
              taskIndex={this.props.tasks.findIndex((elem) => elem.id === task.id)}
            />
          </fieldset>
        );
      })}
    </form>);
    
    return this.props.connectDropTarget(this.props.connectDragSource(
      <div style={{border: "1px solid purple"}} className="card">
        <h3>{this.props.title}</h3>
        <span dangerouslySetInnerHTML={{__html: marked(this.props.description)}}/>
        <button className="card-detail-reveal-btn" type="button" onClick={this.toggleDetails}>{this.state.showDetails ? "hide" : "show"}</button>
        <ReactCSSTransitionGroup
            transitionName='toggle'
            transitionLeaveTimeout={300}
            transitionEnterTimeout={500}
        >
             {this.state.showDetails ? cardDetails : null}
        </ReactCSSTransitionGroup>
        
        
        <form onSubmit={this.handleUserInput.bind(this)}>
          <input type="text" name="taskName" placeholder="Type and hit enter to add a task." />
          <button type="submit">Create Task</button>
        </form>
      </div>
    ));
  }
}

Card.propTypes = {
  cardId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  taskCallbacks: PropTypes.object.isRequired,
  cardCallbacks: PropTypes.object.isRequired
}
var dragSourceHigherOrderCard = DragSource('card', cardSpec, cardCollect)(Card); // partially applied function
var dropTargetHigherOrderCard = DropTarget('card', DropTargetCardSpec, dropTargetCollect)(dragSourceHigherOrderCard);
export default dropTargetHigherOrderCard;
