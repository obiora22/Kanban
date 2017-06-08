import React, {Component, PropTypes} from 'react';
import CardForm from './CardForm';

class EditCard extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    var currentCard = this.props.cards.find((card) => {     
      return card.id.toString() === this.props.match.params.card_id;
    })
  
    this.setState(currentCard);
  }
  handleClose() {
    this.props.history.push('/');
  }

  handleChange(field, e) {
    this.setState({[field]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.cardCallbacks.updateCard(this.state) // unwritten 
  }

  render() {
    return (
      <CardForm
        buttonLabel="Update card"
        draftCard={this.state}
        handleClose={this.handleClose.bind(this)}
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
      />

    );
  }
}

EditCard.propTypes = {
  cards: PropTypes.array.isRequired,
  cardCallbacks: PropTypes.object.isRequired
}
export default EditCard;