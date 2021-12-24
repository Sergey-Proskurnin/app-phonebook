import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import {
  getAllContacts,
  getChangeContact,
  changeContact,
  contactChange,
} from 'redux/contacts';
import InputsContact from 'components/InputsContact';
import s from './ContactFormChange.module.css';
import contextProps from 'context/context';
import alert from 'helpers/alert';

const ContactFormChange = ({ nodeRef }) => {
  const { toggleModal } = useContext(contextProps);
  const { name, number, email, id } = useSelector(state =>
    getChangeContact(state),
  );

  const fileInputId = uuidv4();

  const contacts = useSelector(state => getAllContacts(state));

  const [newName, setNewName] = useState(name);
  const [newNumber, setNewNumber] = useState(number);
  const [newEmail, setNewEmail] = useState(email);
  const [newFile, setNewFile] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setNewName(value);
        break;
      case 'number':
        setNewNumber(value);
        break;
      case 'email':
        setNewEmail(value);
        break;
      default:
        return;
    }
  };

  const dispatch = useDispatch();

  const handleDelFile = () => {
    document.getElementById(`${fileInputId}`).value = '';
    setNewFile(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      newName === name &&
      newNumber === number &&
      newEmail === email &&
      newFile === null
    ) {
      alert(`You haven't made a change!`);
      return;
    }
    if (
      contacts
        .filter(contact => contact.id !== id)
        .some(contact => contact.name.toLowerCase() === newName.toLowerCase())
    ) {
      alert(`${newName} is already in contacts`);
      return;
    }
    if (
      contacts
        .filter(contact => contact.id !== id)
        .some(contact => contact.number === newNumber)
    ) {
      alert(`${newNumber} is already in contacts`);
      return;
    }
    if (
      contacts
        .filter(contact => contact.id !== id)
        .some(contact => contact.email === newEmail)
    ) {
      alert(`${newEmail} is already in contacts`);
      return;
    }

    const formData = new FormData();
    formData.set('name', newName);
    formData.set('email', newEmail);
    formData.set('number', newNumber);
    formData.append('avatar', newFile);

    const contact = { id, formData };

    dispatch(changeContact(contact));
    dispatch(contactChange({}));
    toggleModal();
  };
  const onUnchanged = () => {
    dispatch(contactChange({}));
    return toggleModal();
  };
  return (
    <form ref={nodeRef} className={s.cardOverley} onSubmit={handleSubmit}>
      <InputsContact
        fileInputId={fileInputId}
        setFile={setNewFile}
        file={newFile}
        name={newName}
        email={newEmail}
        number={newNumber}
        handleDelFile={handleDelFile}
        handleChange={handleChange}
      />

      <div className={s.buttonsGrup}>
        <button className={s.buttonChange} type="submit">
          Change
        </button>
        <button
          className={s.buttonUnchanged}
          type="button"
          onClick={onUnchanged}
        >
          Unchanged
        </button>
      </div>
    </form>
  );
};

export default ContactFormChange;

ContactFormChange.propTypes = {
  nodeRef: PropTypes.object.isRequired,
};
