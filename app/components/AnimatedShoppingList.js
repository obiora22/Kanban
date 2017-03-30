import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class AnimatedShoppingList extends Component {
  constructor() {
    super();
    this.state = {
      items: [
       {id: 1, name: 'Milk'},
       {id: 2, name: 'Cereal'},
       {id: 3, name: 'Butter'}
      ]
    }

  }
  handleChange(e) {
    if (e.key === 'Enter') {
      let newItem = {id: Date.now(), name: e.target.value};
      let newItems = this.state.items.concat(newItem);
      e.target.value = '';
      this.setState({items: newItems})
    }
  }
  handleRemove(i) {
    let newItems = this.state.items
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }
  render() {
    var shoppingItems = this.state.items.map((item, index) => {
      return (
        <p key={item.id} onClick={this.handleRemove.bind(this, index)} className="item">
          {item.name}
        </p>
      )
    })
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName='item'
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {shoppingItems}
        </ReactCSSTransitionGroup>
        <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)}/>
      </div>
    );
  }
}

export default AnimatedShoppingList;
