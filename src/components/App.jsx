import { useEffect } from 'react';

import { ContactForm } from './Form/form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector, errorSelector, filterSelector, isLoadingSelector } from 'redux/selectors/selectors';
import { makeFilter } from 'redux/redusers/filterSlice';
import { fetchContacts, addContact } from 'redux/operations/contactsThunk';
import { Loader } from './Loader/Loader';
import { Error } from './Error/Error';

export const App = () => {
  const contacts = useSelector(contactsSelector);
  const filter = useSelector(filterSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts())
  }, []);

  const handleAddContact = contact => {
    const { name } = contact;


    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    };

    dispatch(addContact(contact))
  };

  // const handleDeleteContact = id => {
  //   console.log(id)
  // };


  const handleFilter = e => {
    if (!e) return;
    dispatch(makeFilter(e))
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onFilter={handleFilter} />
      {isLoading ? 
      <Loader /> : 
      <ContactList
        contacts={contacts}
        //onDeleteContact={handleDeleteContact}
        filter={filter}
      />
      }
      {error && (<Error errorText={`Something went wrong... ${error}. Please try again.`} />)}
    </div>
  );
}