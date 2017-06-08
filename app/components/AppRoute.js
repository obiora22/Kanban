import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import KanbanBoardContainer from '../containers/KanbanBoardContainer';
import NewCard from './NewCard';
import EditCard from './EditCard';
class AppRoute extends Component {
  render() {
    return (
      <BrowserRouter> 
        <div>
          <Header />
          <Route path="/" component={KanbanBoardContainer} />
          
        
        </div>
      </BrowserRouter>
    );
  }
}
export default AppRoute;