import React from 'react';
import Contact from 'components/Contact/Contact';

function ContactsList({ visibleContacts, onDeleteContact }) {
  return (
    <div>
      <h2>Your contacts:</h2>
      <ul>
        {visibleContacts.map(contact => (
          <Contact
            key={contact.id}
            onDeleteContact={onDeleteContact}
            name={contact.name}
            number={contact.number}
            id={contact.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default ContactsList;
