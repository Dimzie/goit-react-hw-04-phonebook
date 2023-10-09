import Phonebook from 'components/Phonebook/Phonebook';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import React, { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const onAddContact = data => {
    if (contacts.find(contact => contact.number === data.number)) {
      alert(`Номер "${data.number}" уже есть в книге контактов!`);
    } else {
      const addContact = { ...data, id: nanoid(7) };
      setContacts([...contacts, addContact]);
    }
  };

  const onDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = () => {
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerFilter)
    );
  };

  const visibleContacts = filteredContacts();

  return (
    <>
      <Phonebook onAddContact={onAddContact} contacts={contacts} />
      {contacts.length === 0 ? (
        <p>Your contact book is empty!</p>
      ) : (
        <>
          <h2>Search for contact:</h2>
          <input
            onChange={e => setFilter(e.target.value)}
            type="text"
            value={filter}
            name="filter"
          />
          <ContactsList
            visibleContacts={visibleContacts}
            onDeleteContact={onDeleteContact}
          />
        </>
      )}
    </>
  );
}

export default App;
