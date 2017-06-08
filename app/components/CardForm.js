import React, {Component, PropTypes} from 'react';
// var Proptypes  = React.PropTypes;

class CardForm extends Component {
  constructor() {
    super();

  }
  
  render() {
    return (
      <div>
        <div id="form-container">
          <form className="card-form" onSubmit={this.props.handleSubmit.bind(this)}> 
          <input type="text" 
            placeholder="Title" 
            className="form-control" 
            value={this.props.draftCard.title}
            onChange={this.props.handleChange.bind(this, 'title')}/>
          <textarea 
            placeholder="Description"  
            className="form-control"
            value={this.props.draftCard.description}
            onChange={this.props.handleChange.bind(this, 'description')}>
          </textarea>
          <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" 
                className="form-control"
                onChange={this.props.handleChange.bind(this, 'status')}
                value={this.props.draftCard.status}>
                <option value="todo">Todo</option>
                <option value="in-progress">In-Progress</option>
                <option value="done">Done</option>
              </select>
          </div>
          <hr />
          <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="color" 
            id="color" 
            value={this.props.draftCard.color}
            className="form-control"
            onChange={this.props.handleChange.bind(this, 'color')}/>
            </div>
          <div>
            <button type="submit" >{this.props.buttonLabel}</button>
          </div>
          </form>
        </div>
      <div className="overlay" onClick={this.props.handleClose.bind(this)}></div>
      </div>
    );
  }
}

CardForm.propTypes = {
  draftCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  buttonLabel: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default CardForm;