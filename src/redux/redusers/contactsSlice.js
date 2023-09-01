import { createSlice } from "@reduxjs/toolkit";

const CONTACTS_INITIAL_STATE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const contactsSlice = createSlice({
    name: "contacts",

    initialState: CONTACTS_INITIAL_STATE,

    reducers: {
      addContact(state, action) {
        state.push(action.payload)
      },
      deleteContact(state, action) {
        // state.filter(contact => contact.id !== action.payload)
        const contactIndex = state.findIndex(contact => contact.id === action.payload);
        state.splice(contactIndex, 1)
      },
    }
})

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReduser = contactsSlice.reducer;