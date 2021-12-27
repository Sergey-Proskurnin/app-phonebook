import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Modal from 'components/Modal';
import ChangeDeleteContactForm from 'components/ChangeDeleteContatForms';
import ContactInfo from 'components/ContactInfo';
import contextProps from 'context/context';
import { contactChange } from 'redux/contacts';

import s from './ContactContainer.module.css';

const ContactContainer = ({ nodeRef }) => {
  const dispatch = useDispatch();
  const { showModal, showContact, setshowContact } = useContext(contextProps);

  const onCloseModal = () => {
    dispatch(contactChange({}));
    setshowContact(false);
  };

  return (
    <div ref={nodeRef} className={s.contactContainer}>
      <Filter />
      <div className={s.contactList}>
        <ContactList />
      </div>
      {showModal && (
        <Modal
          onCloseModal={onCloseModal}
          children={
            showContact ? (
              <ContactInfo onCloseModal={onCloseModal} />
            ) : (
              <ChangeDeleteContactForm />
            )
          }
        />
      )}
    </div>
  );
};

export default ContactContainer;

ContactContainer.propTypes = {
  nodeRef: PropTypes.object.isRequired,
};
