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
      alert(`${email} is already in contacts`);
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
            value={number}
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
            value={email}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' @ .-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Email can consist of letters of numbers and a mandatory symbol '@'. For example user@example.com etc."
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
