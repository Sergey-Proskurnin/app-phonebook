import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import alert from 'helpers/alert';
import { addContact, getAllContacts } from 'redux/contacts';
import InputsContact from 'components/InputsContact';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const initialState = {
    name: '',
    number: '',
    email: '',
    file: null,
  };

  const fileInputId = uuidv4();

  const [state, setState] = useState(initialState);

  const setFile = value => {
    setState(prev => ({
      ...prev,
      file: value,
    }));
  };
  const contacts = useSelector(state => getAllContacts(state));

  const dispatch = useDispatch();

  const onSubmit = () => {
    const formData = new FormData();
    formData.set('name', state.name);
    formData.set('email', state.email);
    formData.set('number', state.number);
    formData.append('avatar', state.file);
    dispatch(addContact(formData));
  };

  const handleDelFile = () => {
    document.getElementById(`${fileInputId}`).value = '';
    setState(prev => ({
      ...prev,
      file: null,
    }));
  };

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
      ...initialState,
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
  const { name, number, email, file } = state;

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <InputsContact
          fileInputId={fileInputId}
          setFile={setFile}
          file={file}
          name={name}
          email={email}
          number={number}
          handleDelFile={handleDelFile}
          handleChange={handleChange}
        />
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;
