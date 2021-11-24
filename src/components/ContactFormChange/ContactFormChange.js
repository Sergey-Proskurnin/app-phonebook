import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  getAllContacts,
  getChangeContact,
  changeContact,
  contactChange,
  // changeAvatarContact,
} from 'redux/contacts';
import InputFileAvatar from 'components/InputFileAvatar';

import s from './ContactFormChange.module.css';

import contextProps from 'context/context';
import alert from 'helpers/alert';

const ContactFormChange = () => {
  const toggleModal = useContext(contextProps);
  const { name, number, email, id } = useSelector(state =>
    getChangeContact(state),
  );

  const nameInputId = uuidv4();
  const numberInputId = uuidv4();
  const emailInputId = uuidv4();
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
    <form className={s.cardOverley} onSubmit={handleSubmit}>
      <InputFileAvatar
        fileInputId={fileInputId}
        setFile={setNewFile}
        file={newFile}
        handleDelFile={handleDelFile}
      />
      <label htmlFor={nameInputId} className="lable">
        <span className={s.span}>Name</span>
        <input
          className={s.input}
          type="text"
          name="name"
          value={newName}
          onChange={handleChange}
          pattern="^[A-Za-zА-Яа-яЁёЄєЇї' '\-()0-9]{3,30}$"
          title="The name can only be from three to 30 letters, apostrophe, dash and spaces. For example Adrian, Jac Mercer, d'Artagnan, Александр Репета etc."
          required
          id={nameInputId}
        />
      </label>

      <label htmlFor={numberInputId} className="lable">
        <span className={s.span}>Number</span>
        <input
          className={s.input}
          type="tel"
          name="number"
          value={newNumber}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={numberInputId}
        />
      </label>

      <label htmlFor={emailInputId} className="lable">
        <span className={s.span}>Email</span>
        <input
          className={s.input}
          type="text"
          name="email"
          value={newEmail}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я0-9]+(([' @ .-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Email can consist of letters of numbers and a mandatory symbol '@'. For example user@example.com etc."
          required
          id={emailInputId}
        />
      </label>
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
