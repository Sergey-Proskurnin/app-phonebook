import { createAsyncThunk } from '@reduxjs/toolkit';
import alert from 'helpers/alert';

import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  addAvatarContactRequest,
  addAvatarContactSuccess,
  addAvatarContactError,
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
  fetchPostAvatarContact,
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
    .then(({ data }) => dispatch(addAvatarContactSuccess(data.data.contacts)))
    .catch(error => {
      dispatch(addContactError(error.message));
      alert(`Error server: ${error.message}`);
    });
};
const addAvatarContact = contact => dispatch => {
  dispatch(addAvatarContactRequest());
  fetchPostAvatarContact(contact)
    .then(({ data }) => dispatch(addContactSuccess(data.data.contact)))
    .catch(error => {
      dispatch(addAvatarContactError(error.message));
      alert(`Error server: ${error.message}`);
    });
};

const changeContact = contact => dispatch => {
  dispatch(changeContactRequest());
  fetchChangeContacts(contact)
    .then(({ data }) => dispatch(changeContactSuccess(data.data.contacts)))
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

export {
  addContact,
  addAvatarContact,
  deleteContact,
  fetchContacts,
  changeContact,
};
