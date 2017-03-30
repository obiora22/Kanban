import React, {Component} from 'react';
import contacts from '../data/contacts.js';

let PropTypes = React.PropTypes;

class ContactItem extends Component {
  render() {
    return (
      <li>{this.props.contact.name}</li>
    );
  }
}
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
}
class ContactList extends Component {
  render() {
    return (
      <ul>
        {this.props.contacts.filter((contact, index) => {
          return contact.name.indexOf(this.props.filterText) !== -1
        }).map((contact, index) => {
          return <ContactItem key={index} contact={contact} />
        })

        }
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filterText: PropTypes.string.isRequired
}
class SearchBar extends Component {
  handleChange(e) {
    /*
      Event handlers that require parameters need a wrapper function
      A pair of parentheses tells the engine to call the handler on page-load
      instead of when the event fires.
    */
    this.props.onUserInput(e.target.value);
  }
  render() {
    return (
      <input type="search" value={this.props.filterText} onChange={this.handleChange.bind(this)}/>
    );
  }
}
SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired
}
class ContactsApp extends Component {
  constructor() {
    super();
    this.state = {
      filterText: ''
    }
  }
  handleUserInput(searchTerm) {
    this.setState({filterText: searchTerm})
  }
  render() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <ContactList filterText={this.state.filterText} contacts={this.props.contacts}/>
      </div>
    );


  }
}
ContactsApp.propTypes = {
  contacts: PropTypes.array.isRequired
}
class ContainerApp extends Component {
  constructor() {
    super();
    this.state = {
      contactsData: []
    }
  }
  componentDidMount() {
    fetch('dist/contacts.json')
    .then((response)=> {
      return response.json()
    })
    .then((response) => {
      console.log(response);
      this.setState({
        contactsData: response
      })
    })
    .catch((error) => {
      console.log("Error getting and parsing data", error)
    })
  }
  render() {
    return this.state.contactsData ? (<ContactsApp contacts={this.state.contactsData}/>) : (<h1>Not Ready</h1>)
  }
}
export default ContainerApp;
