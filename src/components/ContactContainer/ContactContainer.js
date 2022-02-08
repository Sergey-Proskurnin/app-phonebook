import React, { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Modal from 'components/Modal';
import ChangeDeleteContactForm from 'components/ChangeDeleteContatForms';
import ContactInfo from 'components/ContactInfo';
import contextProps from 'context/context';
import { contactChange } from 'redux/contacts';
import Animation from 'helpers/animation/Animation';

import s from './ContactContainer.module.css';
import sAr from 'helpers/animation/animationRight.module.css';

const ContactContainer = ({ nodeRef }) => {
  const nodeRef1 = useRef(null);

  const dispatch = useDispatch();
  const { showModal, showContact, setshowContact } = useContext(contextProps);

  const onCloseModal = () => {
    dispatch(contactChange({}));
    setshowContact(false);
  };

  return (
    <div ref={nodeRef} className={s.contactContainer}>
      <Animation style={sAr} time={500} nodeRef={nodeRef1}>
        <Filter nodeRef={nodeRef1} />
      </Animation>
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
