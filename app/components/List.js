import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import Card from './Card';

var PropTypes = React.PropTypes;
var listSpec = {
  hover(props, monitor, component) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateCardStatus(draggedId, props.title);
  }
}
var listCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}
class List extends Component {
  render() {
    console.log('List',this.props);
    return this.props.connectDropTarget(
      <div className="list" style={{border: "1px solid yellow", padding: "10px"}}>
        {
          this.props.cards.map((card, index) => {
              return (
                <Card key={index}
                      cardColor={card.color}
                      cardId={card.id}
                      title={card.title}
                      description={card.description}
                      status={card.status}
                      tasks={card.tasks}
                      taskCallbacks={this.props.taskCallbacks}
                      cardCallbacks={this.props.cardCallbacks}
                />
              );
          })
        }
      </div>
    );
  }
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  taskCallbacks: PropTypes.object.isRequired,
  cardCallbacks: PropTypes.object.isRequired
}

export default DropTarget('card', listSpec, listCollect)(List);
