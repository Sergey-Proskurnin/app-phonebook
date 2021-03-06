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
  changeFavoriteContactRequest,
  changeFavoriteContactSuccess,
  changeFavoriteContactError,
} from './contacts-actions';

import {
  fetchGetContacts,
  fetchPostContacts,
  fetchDeleteContacts,
  fetchChangeContact,
  fetchFavoriteChangeContact,
} from 'services/fetchApi';

//--------------------------------createAsyncThunk------------------------
const fetchContacts = createAsyncThunk(
  'contacts/fetchContact',
  async (favorite, { dispatch, getState }) => {
    try {
      const { data } = await fetchGetContacts(favorite);
      return data.data.contacts;
    } catch ({ response }) {
      if (response.data.message === 'Unvalid token') {
        await refresh(dispatch, getState);
        const { data } = await fetchGetContacts();
        return data.data.contacts;
      }
      dispatch(fetchContacts.rejected(response.data.message));
      alert(`Server error addContact: ${response.data.message}`);
    }
  },
);

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
      alert(`Server error change contact: ${response.data.message}`);
    }
  }
};

const changeFavoriteContact = (id, favorite) => async (dispatch, getState) => {
  dispatch(changeFavoriteContactRequest());
  try {
    const response = await fetchFavoriteChangeContact(id, favorite);
    dispatch(changeFavoriteContactSuccess(response.data.data.contact));
  } catch ({ response }) {
    if (response.data.message === 'Unvalid token') {
      await refresh(dispatch, getState);
      const response = await fetchFavoriteChangeContact(id, favorite);
      dispatch(changeFavoriteContactSuccess(response.data.data.contact));
    } else {
      dispatch(changeFavoriteContactError(response.data.message));
      alert(`Server error change favorite contact: ${response.data.message}`);
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
      alert(`Server error delete contact: ${response.data.message}`);
    }
  }
};

export {
  addContact,
  deleteContact,
  fetchContacts,
  changeContact,
  changeFavoriteContact,
};
