import React from 'react';
var PropTypes = React.PropTypes;
class CheckList extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
        <label className="form-check-label">
          <input className="form-check-input" type="checkbox" name='done' checked={this.props.done}
            onChange={this.props.taskCallbacks.toggle.bind(null, this.props.cardId, this.props.taskId, this.props.taskIndex  )}
          />
          {this.props.name}
          <a href="#" className="checkList-task-remove"
            onClick={this.props.taskCallbacks.delete.bind(null,this.props.cardId, this.props.taskId, this.props.taskIndex )}

         />
        </label>
    );
  }
}

CheckList.propTypes = {
  cardId: PropTypes.number.isRequired,
  taskId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  taskIndex: PropTypes.number.isRequired,
  taskCallbacks: PropTypes.object.isRequired
}
export default CheckList;
