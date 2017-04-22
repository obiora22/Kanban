import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './List';

var PropTypes = React.PropTypes;

class KanbanBoard extends Component {
  render() {
    return (
      <div className="row" id="kanbanboard" style={{border: "1px solid red"}}>
        <div className="col-md-4">
        <h1>TODO</h1>
          <List id="todo" title="todo" cards={
            this.props.cards.filter((card) => {
              return card.status === 'todo';
            })
          }
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          />
        </div>
        <div className="col-md-4">
        <h1>In Progress</h1>
          <List id="in-progress" title="in-progress" cards={
            this.props.cards.filter((card) => {
              return card.status === 'in-progress';
            })
          }
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          />
        </div>
        <div className="col-md-4">
        <h1>Done</h1>
          <List id="done" title="done" cards={
            this.props.cards.filter((card) => {
              return card.status === 'done';
            })
          }
          taskCallbacks={this.props.taskCallbacks}
          cardCallbacks={this.props.cardCallbacks}
          />
        </div>
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.array.isRequired,
  taskCallbacks: PropTypes.object.isRequired,
  cardCallbacks: PropTypes.object.isRequired
}
export default KanbanBoard;
