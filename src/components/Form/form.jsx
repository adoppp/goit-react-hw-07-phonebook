import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const ContactForm = ({onAddContact}) => {
  // state = {
  //   name: '',
  //   number: '',
  // };

  const [contact, setContact] = useState({name: '', number: '',})

  const handleSubmit = e => {
    e.preventDefault();

    const id = nanoid(5);
    const name = contact.name;
    const number = contact.number;

    onAddContact({ 
      id,
      name,
      number
       });

    // this.setState({
    //   name: '',
    //   number: '',
    // });
    setContact({name: '', number: '',})
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setContact((contact) => {
      return {...contact, [name]: value}
    });
  };


    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={contact.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={contact.number}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
}