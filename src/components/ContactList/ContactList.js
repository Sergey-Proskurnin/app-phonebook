import React from 'react';

import ElementContactList from 'components/ElementContactList';
import s from './ContactList.module.css';

const ContactList = ({ toggleModal }) => {
  return (
    <ul className={s.list}>
      <ElementContactList toggleModal={toggleModal} />
    </ul>
  );
};

export default ContactList;
