import Phonebook from 'components/Phonebook/Phonebook';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // adding new contact
  onAddContact = data => {
    if (this.state.contacts.find(contact => contact.number === data.number)) {
      alert(`Номер "${data.number}" уже есть в книге контактов!`);
    } else {
      const addContact = { ...data, id: nanoid(7) };
      this.setState({
        contacts: [...this.state.contacts, addContact],
      });
    }
  };

  // set contact in local storage
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  // set local storage data in state "contacts"
  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts);
    if(parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
  }

  // deleting existing contact
  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  // filter contacts in searching
  filteredContacts = () => {
    const lowerFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerFilter)
    );
  };

  onInputChange = event => {
    // console.log(event.target.value);
    this.setState({
      filter: event.target.value,
    });
  };

  render() {
    const visibleContacts = this.filteredContacts();
    return (
      <>
        <Phonebook
          onAddContact={this.onAddContact}
          contacts={this.state.contacts}
        />
        {this.state.contacts.length === 0 ? (
          <p>Your contact book is empty!</p>
        ) : (
          <>
            <h2>Search for contact:</h2>
            <input
              onChange={this.onInputChange}
              type="text"
              value={this.state.filter}
              name="filter"
            />
            <ContactsList
              visibleContacts={visibleContacts}
              onDeleteContact={this.onDeleteContact}
            />
          </>
        )}
      </>
    );
  }
}
