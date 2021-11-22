import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import alert from 'helpers/alert';
import {
  // addContact,
  addAvatarContact,
  getAllContacts,
} from 'redux/contacts';

import s from './ContactForm.module.css';

const ContactForm = () => {
  const fileInput = useRef(null);

  const initialState = {
    name: '',
    number: '',
    email: '',
  };
  const nameInputId = uuidv4();
  const numberInputId = uuidv4();
  const emailInputId = uuidv4();
  const fileInputId = uuidv4();

  const [state, setState] = useState(initialState);
  const [file, setFile] = useState(null);

  const contacts = useSelector(state => getAllContacts(state));

  const dispatch = useDispatch();

  const handleChangeAvatar = e => {
    if (
      (e.target.files[0].type.includes('image/png') ||
        e.target.files[0].type.includes('image/jpeg')) &&
      e.target.files[0].size <= 2000000
    ) {
      setFile(e.target.files[0]);
    } else {
      alert('The file format can be .png or .jpg and must not exceed 2 MB');
    }
  };
  // const onSubmit = (name, number, email) =>
  //   dispatch(addContact(name, number, email));
  const onSubmit = () => {
    const formData = new FormData();
    formData.set('name', state.name);
    formData.set('email', state.email);
    formData.set('number', state.number);
    formData.append('avatar', file);
    dispatch(addAvatarContact(formData));
  };

  const handleDelFile = () => {
    document.getElementById(`${fileInputId}`).value = '';
    setFile(null);
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickInputFile = e => {
    e.preventDefault();
    fileInput.current.click();
  };
  const reset = () => {
    setState(prev => ({
      ...prev,
      name: '',
      number: '',
      email: '',
    }));
    handleDelFile();
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

    onSubmit();
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
        <label className={s}>
          <span className={s.span}>Select avatar</span>
          <input
            type="file"
            name="avatar"
            className={s}
            id={fileInputId}
            ref={fileInput}
            onChange={handleChangeAvatar}
            accept="image/png, image/jpeg"
            style={{ display: 'none' }}
          />
          <button className={s.uploadBtn} onClick={onClickInputFile}>
            {file ? file.name : 'Choose File'}
          </button>
          <button type="button" className={s.deleteBtn} onClick={handleDelFile}>
            &#10006;
          </button>
        </label>
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
