import React, { Component } from 'react';

export default class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  };

  // Observe input changes
  onInputChange = event => {
    // console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // submiting form
  handleSubmit = e => {
    e.preventDefault();
    const newContact = { name: this.state.name, number: this.state.number };
    this.props.onAddContact(newContact);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Name</p>
          <input
            value={this.state.name}
            onChange={this.onInputChange}
            type="text"
            name="name"
            required
          />
          <p>Number</p>
          <input
            onChange={this.onInputChange}
            value={this.state.number}
            type="tel"
            name="number"
            required
          />
          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}
