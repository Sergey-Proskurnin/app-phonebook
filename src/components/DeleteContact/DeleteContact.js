import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import contextProps from 'context/context';
import { deleteContact, getChangeContact } from 'redux/contacts';

import s from './DeleteContact.module.css';

const DeleteContact = () => {
  const { toggleModal } = useContext(contextProps);
  const { id, name, number } = useSelector(state => getChangeContact(state));
  const dispatch = useDispatch();
  const onDeleteContact = id => {
    dispatch(deleteContact(id));
    return toggleModal();
  };

  return (
    <form
      className={s.cardOverley}
      onSubmit={e => {
        e.preventDefault();
        onDeleteContact(id);
      }}
    >
      <h2 className={s.title}>
        {' '}
        Are you sure that you want to delete the contact{' '}
      </h2>
      <span className={s.contact}>
        {`${name}`}: {`${number}`}
      </span>
      <button className={s.buttonYes} type="submit">
        Yes
      </button>
      <button className={s.buttonNo} type="button" onClick={toggleModal}>
        No
      </button>
    </form>
  );
};
export default DeleteContact;
