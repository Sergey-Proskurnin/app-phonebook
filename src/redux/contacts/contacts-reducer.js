import { combineReducers } from 'redux';

import { createReducer } from '@reduxjs/toolkit';
import contactsTest from 'data/contactsTest.json';
import alert from 'helpers/alert';
import {
  changeFilter,
  contactChange,
  changeContactRequest,
  changeContactSuccess,
  changeContactError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from './contacts-actions';

import { fetchContacts } from './contacts-operations';

const items = createReducer(contactsTest, {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContactSuccess]: (state, action) => [action.payload, ...state],
  [deleteContactSuccess]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),
  [changeContactSuccess]: (state, action) => [
    ...state.filter(({ id }) => id !== action.payload.id),
    action.payload,
  ],
});

const loading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
  [changeContactRequest]: () => true,
  [changeContactSuccess]: () => false,
  [changeContactError]: () => false,
});

const filter = createReducer('', {
  [changeFilter]: (_, action) => action.payload,
});

const change = createReducer(
  {},
  {
    [contactChange]: (_, action) => action.payload,
  },
);

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [fetchContacts.rejected]: (_, { payload }) => {
    alert(`Error server`);
    return payload;
  },
  [addContactError]: setError,
  [deleteContactError]: setError,
  [changeContactError]: setError,
});

export default combineReducers({
  items,
  filter,
  loading,
  change,
  error,
});
