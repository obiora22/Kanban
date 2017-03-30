import React, {Component} from 'react';
import CheckList from './CheckList';
import marked from 'marked';
var PropTypes = React.PropTypes;

class Card extends Component {
  constructor() {
    super()
    this.state = {
      showDetails: false,
      value: ''
    }
    this.toggleDetails = this.toggleDetails.bind(this) // get 'this' to reference React instance
  }
  toggleDetails(e) {
    // if (this.state.showDetails) {
    //   this.setState({
    //     showDetails: false
    //   })
    // } else {
    //   this.setState({
    //     showDetails: true
    //   })
    // }
    this.setState({showDetails: !this.state.showDetails})

  }
  handleUserInput(e) {
    e.preventDefault();
    this.props.taskCallbacks.add(this.props.cardId, e.target.taskName.value);
    this.setState({
      value: ''
    })
  }
  render() {
    let cardDetails = (<form>
      {this.props.tasks.map((task, index) => {
        return (
          <fieldset key={index} className="">
            <CheckList key={index}
              cardId={this.props.cardId}
              taskId={task.id} name={task.name}
              done={task.done}
              taskCallbacks={this.props.taskCallbacks}
              taskIndex={this.props.tasks.findIndex((elem) => elem.id === task.id)}
            />
          </fieldset>
        );
      })}
    </form>);
    return (
      <div style={{border: "1px solid purple"}} className="card">
        <h3>{this.props.title}</h3>
        <span dangerouslySetInnerHTML={{__html: marked(this.props.description)}}/>
        <button className="card-detail-reveal-btn" type="button" onClick={this.toggleDetails}>{this.state.showDetails ? "hide" : "show"}</button>
        {this.state.showDetails ? cardDetails : null}
        // task add form
        <form onSubmit={this.handleUserInput.bind(this)}>
          <input type="text" name="taskName" placeholder="Type and hit enter to add a task." />
          <button type="submit">Create Task</button>
        </form>
      </div>
    );
  }
}

Card.propTypes = {
  cardId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  taskCallbacks: PropTypes.object.isRequired
}
export default Card;
