import { createAsyncThunk } from '@reduxjs/toolkit';
import alert from 'helpers/alert';
import { refresh } from 'redux/auth';

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
  fetchChangeContact,
} from 'services/fetchApi';

//--------------------------------createAsyncThunk------------------------
const fetchContacts = createAsyncThunk('contacts/fetchContact', async () => {
  const { data } = await fetchGetContacts();
  return data.data.contacts;
});

// --------------------------------then-cath----------------------------------
const addContact = contact => async (dispatch, getState) => {
  dispatch(addContactRequest());
  try {
    const response = await fetchPostContacts(contact);
    dispatch(addContactSuccess(response.data.data.contact));
  } catch ({ response }) {
    if (response.data.message === 'Unvalid token') {
      await refresh(dispatch, getState);
      const response = await fetchPostContacts(contact);
      dispatch(addContactSuccess(response.data.data.contact));
    } else {
      dispatch(addContactError(response.data.message));
      alert(`Server error addContact: ${response.data.message}`);
    }
  }
};

const changeContact = contact => async (dispatch, getState) => {
  dispatch(changeContactRequest());
  try {
    const response = await fetchChangeContact(contact);
    dispatch(changeContactSuccess(response.data.data.contact));
  } catch ({ response }) {
    if (response.data.message === 'Unvalid token') {
      await refresh(dispatch, getState);
      const response = await fetchChangeContact(contact);
      dispatch(changeContactSuccess(response.data.data.contact));
    } else {
      dispatch(changeContactError(response.data.message));
      alert(`Server error addContact: ${response.data.message}`);
    }
  }
};

const deleteContact = id => async (dispatch, getState) => {
  dispatch(deleteContactRequest());
  try {
    await fetchDeleteContacts(id);
    dispatch(deleteContactSuccess(id));
  } catch ({ response }) {
    if (response.data.message === 'Unvalid token') {
      await refresh(dispatch, getState);
      await fetchDeleteContacts(id);
      dispatch(deleteContactSuccess(id));
    } else {
      dispatch(deleteContactError(response.data.message));
      alert(`Server error addContact: ${response.data.message}`);
    }
  }
};

export { addContact, deleteContact, fetchContacts, changeContact };
