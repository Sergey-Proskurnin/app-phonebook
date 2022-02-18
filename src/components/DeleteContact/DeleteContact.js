import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import contextProps from 'context/context';
import { deleteContact, getChangeContact } from 'redux/contacts';

import s from './DeleteContact.module.css';

const DeleteContact = ({ nodeRef }) => {
  const { t } = useTranslation();
  const { toggleModal } = useContext(contextProps);
  const { id, name, number } = useSelector(state => getChangeContact(state));
  const dispatch = useDispatch();
  const onDeleteContact = id => {
    dispatch(deleteContact(id));
    return toggleModal();
  };

  return (
    <form
      ref={nodeRef}
      className={s.cardOverley}
      onSubmit={e => {
        e.preventDefault();
        onDeleteContact(id);
      }}
    >
      <h2 className={s.title}> {t('deleteContact.title')} </h2>
      <span className={s.contact}>
        {`${name}`}: {`${number}`}
      </span>
      <div className={s.buttonGroup}>
        <button className={s.buttonYes} type="submit">
          {t('deleteContact.btnYes')}
        </button>
        <button className={s.buttonNo} type="button" onClick={toggleModal}>
          {t('deleteContact.btnNo')}
        </button>
      </div>
    </form>
  );
};
export default DeleteContact;

DeleteContact.propTypes = {
  nodeRef: PropTypes.object.isRequired,
};
