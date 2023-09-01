import { useEffect } from 'react';

import { ContactForm } from './Form/form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector, filterSelector } from 'redux/selectors/selectors';
import { addContact, deleteContact } from 'redux/redusers/contactsSlice';
import { makeFilter } from 'redux/redusers/filterSlice';

export const App = () => {
  const contacts = useSelector(contactsSelector);
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();

  const handleAddContact = contact => {
    const { name } = contact;


    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    };

    dispatch(addContact(contact))
  };

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);
  
  useEffect(() => {
    const localStorageContacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (localStorageContacts) {
      // setContacts(localStorageContacts)
    }
  }, []);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id))
  };


  const handleFilter = e => {
    dispatch(makeFilter(e))
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onFilter={handleFilter} />
      <ContactList
        contacts={contacts}
        onDeleteContact={handleDeleteContact}
        filter={filter}
      />
    </div>
  );
}