import React, { useState } from 'react';

function Phonebook({ onAddContact }) {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContact(formData);
    setFormData({
      name: '',
      number: '',
    });
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input
          value={formData.name}
          onChange={onInputChange}
          type="text"
          name="name"
          required
        />
        <p>Number</p>
        <input
          onChange={onInputChange}
          value={formData.number}
          type="tel"
          name="number"
          required
        />
        <button type="submit">Add contact</button>
      </form>
    </>
  );
}

export default Phonebook;
