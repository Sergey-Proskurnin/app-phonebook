import { createAction } from '@reduxjs/toolkit';

// const fetchContactRequest = createAction('contacts/fetchContactRequest');
// const fetchContactSuccess = createAction('contacts/fetchContactSuccess');
// const fetchContactError = createAction('contacts/fetchContactError');

const addContactRequest = createAction('contacts/addContactRequest');
const addContactSuccess = createAction('contacts/addContactSuccess');
const addContactError = createAction('contacts/addContactError');

const deleteContactRequest = createAction('contacts/deleteContactRequest');
const deleteContactSuccess = createAction('contacts/deleteContactSuccess');
const deleteContactError = createAction('contacts/deleteContactError');

const changeContactRequest = createAction('contacts/changeContactRequest');
const changeContactSuccess = createAction('contacts/changeContactSuccess');
const changeContactError = createAction('contacts/changeContactError');

const changeFilter = createAction('contacts/changeFilter');

const contactChange = createAction('contacts/changeContact');

export {
  changeFilter,
  contactChange,
  addContactRequest,
  addContactSuccess,
  addContactError,
  changeContactRequest,
  changeContactSuccess,
  changeContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
};
