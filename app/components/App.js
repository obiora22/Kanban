import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import KanbanBoard from './KanbanBoard';

let cardsList = [
{
id: 1,
title: "Read the Book",
description: "I should read the **whole** book",
status: "in-progress",
tasks: []
},
{
id: 2,
title: "Write some code",
description: "Code along with the samples in the book",
status: "todo",
tasks: [
{
id: 1,
name: "ContactList Example",
done: true
},
{
id: 2,
name: "Kanban Example",
done: false
},
{
id: 3,
name: "My own experiments",
done: false
}
]
},
];
class App extends Component {
  render() {
    console.log(cardsList);
    return (
      <div style={{border: "1px solid green", padding: "10px"}}>
      <KanbanBoard cards={cardsList}/>
      </div>
    );
  }
}

export default App;
