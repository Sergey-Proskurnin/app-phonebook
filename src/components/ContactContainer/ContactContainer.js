import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Modal from 'components/Modal';
import contextProps from 'context/context';

import s from './ContactContainer.module.css';

const ContactContainer = ({ nodeRef }) => {
  const { showModal } = useContext(contextProps);

  return (
    <div ref={nodeRef} className={s.contactContainer}>
      <Filter />
      <div className={s.contactList}>
        <ContactList />
      </div>
      {showModal && <Modal />}
    </div>
  );
};

export default ContactContainer;

ContactContainer.propTypes = {
  nodeRef: PropTypes.object.isRequired,
};
