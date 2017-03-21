import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import GroceryList from './components/Example';
import App from './components/App';
// function component() {
//   var element = document.createElement('div');

//   element.textContent = "Hello React world!!!!@@";
//   console.log(element);
//   return element;
// }
// document.body.appendChild(component());
var elem = (<GroceryList>
              <h3>My Grocery List</h3>
            </GroceryList>);
ReactDOM.render(<App />, document.getElementById('root'));
