import { createAsyncThunk } from '@reduxjs/toolkit';
import alert from 'helpers/alert';

import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  changeContactRequest,
  changeContactSuccess,
  changeContactError,
} from './contacts-actions';

import {
  fetchGetContacts,
  fetchPostContacts,
  fetchDeleteContacts,
  fetchChangeContacts,
} from 'services/fetchApi';

//--------------------------------createAsyncThunk------------------------
const fetchContacts = createAsyncThunk('contacts/fetchContact', async () => {
  const { data } = await fetchGetContacts();
  return data.data.contacts;
});

// --------------------------------then-cath----------------------------------
const addContact = contact => dispatch => {
  dispatch(addContactRequest());
  fetchPostContacts(contact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch(error => {
      dispatch(addContactError(error.message));
      alert(`Error server: ${error.message}`);
    });
};

const changeContact = contact => dispatch => {
  dispatch(changeContactRequest());
  fetchChangeContacts(contact)
    .then(({ data }) => dispatch(changeContactSuccess(data)))
    .catch(error => {
      dispatch(changeContactError(error.message));
      alert(`Error server: ${error.message}`);
    });
};

const deleteContact = id => dispatch => {
  dispatch(deleteContactRequest());
  fetchDeleteContacts(id)
    .then(() => dispatch(deleteContactSuccess(id)))
    .catch(error => {
      dispatch(deleteContactError(error.message));
      alert(`Error server: ${error.message}`);
    });
};

export { addContact, deleteContact, fetchContacts, changeContact };
