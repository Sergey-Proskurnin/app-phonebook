import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import alert from 'helpers/alert';
import { addContact, getAllContacts } from 'redux/contacts';

import s from './ContactForm.module.css';

const ContactForm = () => {
  const initialState = {
    name: '',
    number: '',
    email: '',
  };
  const nameInputId = uuidv4();
  const numberInputId = uuidv4();
  const emailInputId = uuidv4();

  const [state, setState] = useState(initialState);

  const contacts = useSelector(state => getAllContacts(state));

  const dispatch = useDispatch();
  const onSubmit = (name, number, email) =>
    dispatch(addContact(name, number, email));

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setState(prev => ({
      ...prev,
      name: '',
      number: '',
      email: '',
    }));
  };

  const addNoRepeatContact = (state, contacts) => {
    const { name, number, email } = state;
    if (
      contacts.some(
        contacts => contacts.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.some(contacts => contacts.number === number)) {
      alert(`${number} is already in contacts`);
      return;
    }
    if (contacts.some(contacts => contacts.email === email)) {
      alert(`${number} is already in contacts`);
      return;
    }

    onSubmit(state);
    reset();
  };

  const handleSubmit = e => {
    e.preventDefault();
    addNoRepeatContact(state, contacts);
  };
  const { name, number, email } = state;

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor={nameInputId} className="lable">
          <span className={s.span}>Name</span>
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
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
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
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
            value={email}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            id={emailInputId}
          />
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;
