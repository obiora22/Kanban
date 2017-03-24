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
          <input className="form-check-input" type="checkbox" name='done' defaultChecked={this.props.done} /> 
          {this.props.name}
          <a href="#" className="checkList-task-remove" />
        </label>
    );
  }
}

CheckList.propTypes = {
  name: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired
}
export default CheckList;
