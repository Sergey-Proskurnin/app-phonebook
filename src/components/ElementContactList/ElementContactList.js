import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { getVisibleContacts } from 'redux/contacts';
import contextProps from 'context/context';
import { contactChange } from 'redux/contacts';

import s from './ElementContactList.module.css';

const ElementContactList = () => {
  const toggleModal = useContext(contextProps);
  const contacts = useSelector(state => getVisibleContacts(state));

  const dispatch = useDispatch();

  const onChangeContact = contact => {
    dispatch(contactChange(contact));
    return toggleModal();
  };

  return contacts.map(({ name, number, id }) => {
    return (
      <li className={s.item} key={id}>
        <a className={s.link} href={`tel:${number}`}>
          <span className={s.span}>
            <ContactPhoneIcon color="primary" fontSize="large" />
          </span>
          <span className={s.spanLink}>
            {name}: {number}
          </span>
        </a>
        <div>
          <button
            type="button"
            className={s.btnListChan}
            onClick={() => onChangeContact({ name, number, id, change: true })}
          >
            Сhange
          </button>
          <button
            type="button"
            className={s.btnListDel}
            onClick={() => onChangeContact({ name, number, id, change: false })}
          >
            Delete
          </button>
        </div>
      </li>
    );
  });
};

export default ElementContactList;
