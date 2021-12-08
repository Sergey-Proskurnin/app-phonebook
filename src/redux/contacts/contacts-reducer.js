import { combineReducers } from 'redux';

import { createReducer } from '@reduxjs/toolkit';
import contactsTest from 'data/contactsTest.json';

import {
  changeFilter,
  contactChange,
  changeContactRequest,
  changeContactSuccess,
  changeContactError,
  changeFavoriteContactRequest,
  changeFavoriteContactSuccess,
  changeFavoriteContactError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from './contacts-actions';
import {
  editUserInfoRequest,
  editUserInfoSuccess,
  editUserInfoError,
  registerRequest,
  registerSuccess,
  registerError,
  repeatEmailVerifyRequest,
  repeatEmailVerifySuccess,
  repeatEmailVerifyOk,
  repeatEmailVerifyError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
} from 'redux/auth/auth-actions';

import { fetchContacts } from './contacts-operations';

const env = process.env.NODE_ENV;
let contactUser;
switch (env) {
  case 'development':
    contactUser = contactsTest;
    break;
  case 'production':
    contactUser = [];
    break;
  default:
    contactUser = [];
    break;
}

const items = createReducer(contactUser, {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContactSuccess]: (state, action) => [action.payload, ...state],
  [deleteContactSuccess]: (state, action) =>
    state.filter(({ id }) => id !== action.payload),
  [changeContactSuccess]: (state, action) => [
    ...state.filter(({ id }) => id !== action.payload.id),
    action.payload,
  ],
  [changeFavoriteContactSuccess]: (state, action) => [
    ...state.filter(({ id }) => id !== action.payload.id),
    action.payload,
  ],
  [logoutSuccess]: () => contactUser,
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
  [changeFavoriteContactRequest]: () => true,
  [changeFavoriteContactSuccess]: () => false,
  [changeFavoriteContactError]: () => false,
  [editUserInfoRequest]: () => true,
  [editUserInfoSuccess]: () => false,
  [editUserInfoError]: () => false,
  [registerRequest]: () => true,
  [registerSuccess]: () => false,
  [registerError]: () => false,
  [logoutRequest]: () => true,
  [logoutSuccess]: () => false,
  [logoutError]: () => false,
  [loginRequest]: () => true,
  [loginSuccess]: () => false,
  [loginError]: () => false,
  [repeatEmailVerifyRequest]: () => true,
  [repeatEmailVerifySuccess]: () => false,
  [repeatEmailVerifyOk]: () => false,
  [repeatEmailVerifyError]: () => false,
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

export default combineReducers({
  items,
  filter,
  loading,
  change,
});
