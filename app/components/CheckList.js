import React from 'react';
var PropTypes = React.PropTypes;
function CheckList(props) {
  return (
      <label className="form-check-label">
        <input className="form-check-input" type="checkbox" name='done' value="done" defaultChecked={props.done}/>
        {props.name}
        <a href="#" className="checkList-task-remove" />
      </label>
  );
}

CheckList.propTypes = {
  name: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired
}
export default CheckList;
