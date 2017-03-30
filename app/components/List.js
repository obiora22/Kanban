import React, {Component} from 'react';
import Card from './Card';
var PropTypes = React.PropTypes;
class List extends Component {
  render() {
    console.log('List',this.props);
    return (
      <div className="list" style={{border: "1px solid yellow", padding: "10px"}}>
        {
          this.props.cards.map((card, index) => {
              return (
                <Card key={index}
                      cardId={card.id}
                      title={card.title}
                      description={card.description}
                      tasks={card.tasks}
                      taskCallbacks={this.props.taskCallbacks}
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
  taskCallbacks: PropTypes.object.isRequired
}

export default List;
