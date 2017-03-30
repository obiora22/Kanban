import React, {Component} from 'react';
import KanbanBoard from '../components/KanbanBoard';
import update from 'immutability-helper';

const API_URL = 'http://Kanbanapi.pro-react.com';
const API_HEADERS = {
  'content-type' : 'application/json',
  Authorization: 'nas22@gmail.com'
}

class KanbanBoardContainer extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    }
  }
  addTask(cardId, taskName) {
    var cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
    var newTask = {id: Date.now(), name: taskName, done: false}
    // Allow for optimistic rollback if network request fails
    var prevState = this.state;
    var nextState = update(this.state.cards,{
        [cardIndex]: {
          tasks: {$push: [newTask]}
        }
      }
    );
    this.setState({cards: nextState});

    fetch(`${API_URL}/cards/${cardId}/tasks/`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => response.json())
    .then((responseData) => {
      newTask.id = responseData.id;
      this.setState({cards: nextState});
    }).catch((error) =>{
      // revert to previous state
      this.setState(prevState);
      console.error('Network request failed.', error);
    });
  }
  deleteTask(cardId, taskId, taskIndex) {
    var cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

    // create a mutated copy of the original
    var nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$splice: [[taskIndex, 1]]}
      }
    });

    this.setState({cards: nextState});

    // make api call to remove task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    }).catch((error) => {
      console.error('Network request failed.', error);
    });

  }
  toggleTask(cardId, taskId, taskIndex) {
    var cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
    var newDoneValue;
    var nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {$apply: (done) => {
                newDoneValue = !done;
                return newDoneValue;
              }
            }
          }
        }
      }
    })
    this.setState({
      cards: nextState
    })

    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done: newDoneValue})
    }).catch((error) => {
      console.error('Network request failed.', error);
    });
  }
  componentDidMount() {
    fetch(API_URL + '/cards', {headers: API_HEADERS})
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseData) => {
      this.setState({
        cards: responseData
      })
    }).catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }
  render() {
    return (
      <KanbanBoard
        cards={this.state.cards}
        taskCallbacks={{
          add: this.addTask.bind(this),
          delete: this.deleteTask.bind(this),
          toggle: this.toggleTask.bind(this)
        }}
      />
    );
  }
}

export default KanbanBoardContainer;
