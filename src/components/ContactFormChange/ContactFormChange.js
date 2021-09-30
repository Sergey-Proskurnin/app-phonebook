import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllContacts,
  getChangeContact,
  changeContact,
  contactChange,
} from 'redux/contacts';

import s from './ContactFormChange.module.css';

import contextProps from 'context/context';
import alert from 'helpers/alert';

const ContactFormChange = () => {
  const toggleModal = useContext(contextProps);
  const { name, number, email, id } = useSelector(state =>
    getChangeContact(state),
  );
  const contacts = useSelector(state => getAllContacts(state));

  const [newName, setStateNewName] = useState(name);
  const [newNumber, setStateNewNumber] = useState(number);
  const [newEmail, setStateNewEmail] = useState(email);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setStateNewName(value);
        break;
      case 'number':
        setStateNewNumber(value);
        break;
      case 'email':
        setStateNewEmail(value);
        break;
      default:
        return;
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (newName === name && newNumber === number && newEmail === email) {
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

    const contact = { id, name: newName, number: newNumber, email: newEmail };

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
      <label htmlFor="1" className="lable">
        <span className={s.span}>Name</span>
        <input
          className={s.input}
          type="text"
          name="name"
          value={newName}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          id="1"
        />
      </label>

      <label htmlFor="2" className="lable">
        <span className={s.span}>Number</span>
        <input
          className={s.input}
          type="tel"
          name="number"
          value={newNumber}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          id="2"
        />
      </label>

      <label htmlFor="3" className="lable">
        <span className={s.span}>Email</span>
        <input
          className={s.input}
          type="text"
          name="email"
          value={newEmail}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+((['@.-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          id="3"
        />
      </label>

      <button className={s.buttonChange} type="submit">
        Change
      </button>
      <button className={s.buttonUnchanged} type="button" onClick={onUnchanged}>
        Unchanged
      </button>
    </form>
  );
};

export default ContactFormChange;
