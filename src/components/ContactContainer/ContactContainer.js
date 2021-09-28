import React, { useState, useCallback } from 'react';

import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Modal from 'components/Modal';
import contextProps from 'context/context';

import s from './ContactContainer.module.css';

const ContactContainer = () => {
  const [showModal, setStateShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setStateShowModal(prevShowModal => !prevShowModal);
  }, []);

  return (
    <contextProps.Provider value={toggleModal}>
      <div className={s.contactContainer}>
        <Filter />
        <div className={s.contactList}>
          <ContactList />
        </div>
        {showModal && <Modal />}
      </div>
    </contextProps.Provider>
  );
};

export default ContactContainer;
