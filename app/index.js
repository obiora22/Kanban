import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import ContactApp from './components/ContactApp';
import KanbanBoard from './components/KanbanBoard';

import GroceryList from './components/Example';
import App from './components/App'; // main app
import AnimatedShoppingList from './components/AnimatedShoppingList';
import SnackShopContainer from './components/SnackShopApp/SnackShopContainer';
//ReactDOM.render(<AnimatedShoppingList />, document.getElementById('root'));
// ReactDOM.render(<SnackShopContainer />, document.getElementById('root'));
ReactDOM.render(<App/>, document.getElementById('root'));