import React, {Component} from 'react';
import CheckList from './CheckList';
var PropTypes = React.PropTypes;

class Card extends Component {
  constructor() {
    super()
    this.state = {
      showDetails: false
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
  render() {
    let cardDetails = (<form>
      {this.props.tasks.map((task, index) => {
        return (
          <fieldset key={index} className="">
            <CheckList key={index} cardId={this.props.cardId} taskId={task.id} name={task.name} done={task.done}/>
          </fieldset>
        );
      })}
    </form>);
    return (
      <div style={{border: "1px solid purple"}} className="card">
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <button className="card-detail-reveal-btn" type="button" onClick={this.toggleDetails}>{this.state.showDetails ? "hide" : "show"}</button>
        {this.state.showDetails ? cardDetails : null}
      </div>
    );
  }
}

Card.propTypes = {
  cardId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired
}
export default Card;
