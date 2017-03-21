import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './List';
class KanbanBoard extends Component {
  render() {
    console.log('KBoard',this.props);
    return (
      <div className="row" id="kanbanboard" style={{border: "1px solid red"}}>
        <div className="col-md-4">
        <h1>TODO</h1>
          <List id="todo" title="todo" cards={
            this.props.cards.filter((card) => {
              return card.status === 'todo';
            })
          }/>
        </div>
        <div className="col-md-4">
        <h1>In Progress</h1>
          <List id="in-progress" title="in-progress" cards={
            this.props.cards.filter((card) => {
              return card.status === 'in-progress';
            })
          }/>
        </div>
        <div className="col-md-4">
        <h1>Done</h1>
          <List id="done" title="Done" cards={
            this.props.cards.filter((card) => {
              return card.status === 'done';
            })
          }/>
        </div>
      </div>
    );
  }
}

KanbanBoard.propTypes = {
  cards: React.PropTypes.array.isRequired
}
export default KanbanBoard;
