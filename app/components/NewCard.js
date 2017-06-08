import React, {Component, PropTypes} from 'react';
import CardForm from './CardForm';

class NewCard extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    
    this.setState({
      id: Date.now(),
      title: '',
      description: '',
      status: 'todo',
      color: '#c9c9c9',
      tasks: []
    });
    
  }

  handleChange(field, e) {
    this.setState({[field]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.cardCallbacks.addCard(this.state); // unwritten 
    this.props.history.push('/');
  }

  handleClose() {
    this.props.history.push('/');
  }

  render() {
    return (
      <CardForm 
        buttonLabel="Create Card"
        draftCard={this.state}
        handleClose={this.handleClose.bind(this)}
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
      />
    );
  }
}

NewCard.propTypes = {
  cardCallbacks: PropTypes.object.isRequired
}
export default NewCard;