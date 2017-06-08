import React, {Component} from 'react';
import KanbanBoard from '../components/KanbanBoard';
import NewCard from '../components/NewCard';
import EditCard from '../components/EditCard';
import {Route} from 'react-router-dom';
import update from 'immutability-helper';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {throttle} from '../utils/throttle';
const API_URL = 'http://Kanbanapi.pro-react.com';
const API_HEADERS = {
  'content-type' : 'application/json',
  Authorization: 'nas22@gmail.com',
  'Access-Control-Allow-Origin' : '*'
}

class KanbanBoardContainer extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    }
    // call when arguments change
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    //call at max every 500ms or (when arguments change)
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
  }
  persistCardDrag(cardId, prevStatus) {
    var cardIndex = this.state.cards.findIndex((card) => {
      return cardId === card.id;
    });
    var currentCard = this.state.cards[cardIndex];
    fetch(`${API_URL}/cards/${cardId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({status: currentCard.status, row_order_position: cardIndex})
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error('Oops! Something went wrong.');
        }
      }).catch((error) => {
        console.error('Request error:', error);
        this.setState(
          // Update state with previous card status
          update(this.state, {
            cards: {
              [cardIndex]: {
                status: {$set,prevStatus}
              }
            }
          })
        )
      })
  }
  // called when card hovers over list 
  updateCardStatus(cardId, listType) {
    var cardIndex = this.state.cards.findIndex((card) => {
      return card.id === cardId;
    });
    // find current card
    var card = this.state.cards[cardIndex];
    if (card.status !== listType ) {
      var updatedCardList = update(this.state.cards, {
        [cardIndex]: {
          status: {$set: listType} // update new list card is being dragged into
        }
      });
      this.setState({
        cards: updatedCardList
      })
    }
  }
  updateCardPosition(cardId, afterId) {
    //proceed if hovering over a different card 
    if (cardId !== afterId) {
      var cardIndex = this.state.cards.findIndex((card) => {
        return card.id === cardId;
      });
      var afterIndex = this.state.cards.findIndex((card) => {
        return card.id === afterId;
      });
      var currentCard = this.state.cards[cardIndex];
      // remove currentCard and reinsert it into new index 
      var newCards = update(this.state.cards, 
        {$splice: [[cardIndex, 1], [afterIndex, 0, currentCard]]}
      );
      this.setState({
        cards: newCards
      })
    }
  }

  addCard(card) {
    // Keep a reference to original state incase of 
    // need to reverse optimistic changes made to UI
    var prevState = this.state;
    
    /*
      Making an optimistic change: I'm modifying the UI
      by pushing new card inot the `this.state.cards` on the 
      assumption that API call will be successful, and a new 
      card will be added to the data base.
    */
    var nextState = update(this.state.cards, {$push: [card]});

    this.setState({cards: nextState})

    //make API call to add new card to collection
    fetch(`${API_URL}/cards`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong with server reuest!');
      }
    })
    .then((responseData) => {
      // `this.states.cards` holds a reference to card
      card.id = responseData.id;
      this.setState({cards: nextState});
    })
    .catch((error) => {
      console.error(error);
      this.setState(prevState);
    }) 

  }
  
  updateCard(currentCard) {
    var prevState = this.state;

    var currentCardIndex = this.state.cards.findIndex((card) => {
      return card.id === currentCard.id
    });

    var nextState = update(this.state.cards, {
      [currentCardIndex]: {$set: currentCard}
    });

    this.setState(nextState);

    fetch(`${API_URL}/cards/${currentCard.id}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify(currentCard)
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response);
        throw new Error('Something went wrong with server request!');
      }
    })
    .then((responseData) => {
      currentCard.id = responseData.id;
      this.setState({cards: nextState})
    })
    .catch((error) => {
      console.error(error);
      this.setState(prevState);
    })
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
      <div>
      <KanbanBoard
        cards={this.state.cards}
        taskCallbacks={{
          add: this.addTask.bind(this),
          delete: this.deleteTask.bind(this),
          toggle: this.toggleTask.bind(this)
        }}
        cardCallbacks={{
          updateCardStatus: this.updateCardStatus,
          updateCardPosition: this.updateCardPosition,
          persistCardDrag: this.persistCardDrag.bind(this)
        }}
      />
      {/*React Router v4 allows nesting Route components*/}
       <Route exact path="/new" render={(props) => {
         return <NewCard 
         history={props.history}
            cardCallbacks={{
              addCard: this.addCard.bind(this),
              updateCard: this.updateCard.bind(this),
              updateCardStatus: this.updateCardStatus,
              updateCardPosition: this.updateCardPosition,
              persistCardDrag: this.persistCardDrag.bind(this)
          }}
          />
       }} />
        <Route path="/edit/:card_id" render={(props) => {
          console.log(props)
          return <EditCard 
            match={props.match}
            history={props.history}
            cards={this.state.cards}
            cardCallbacks={{
              addCard: this.addCard.bind(this),
              updateCard: this.updateCard.bind(this),
              updateCardStatus: this.updateCardStatus,
              updateCardPosition: this.updateCardPosition,
              persistCardDrag: this.persistCardDrag.bind(this)
          }}
          />
        }} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(KanbanBoardContainer);
