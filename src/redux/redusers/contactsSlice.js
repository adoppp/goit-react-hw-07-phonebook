import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact } from '../operations/contactsThunk'

const CONTACTS_INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
    name: "contacts",

    initialState: CONTACTS_INITIAL_STATE,

    reducers: {
      // addContact(state, action) {
      //   state.items.push(action.payload)
      // },
      deleteContact(state, action) {
        // state.filter(contact => contact.id !== action.payload)
        const contactIndex = state.items.findIndex(contact => contact.id === action.payload);
        state.items.splice(contactIndex, 1)
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = [...state.items, action.payload];
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    },
})

// export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;