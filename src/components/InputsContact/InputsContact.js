import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import s from './InputsContact.module.css';

const InputsContact = ({
  fileInputId,
  setFile,
  handleDelFile,
  file,
  name,
  number,
  email,
  handleChange,
}) => {
  const fileInput = useRef(null);

  const nameInputId = uuidv4();
  const numberInputId = uuidv4();
  const emailInputId = uuidv4();

  const onClickInputFile = e => {
    e.preventDefault();
    fileInput.current.click();
  };

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

  return (
    <>
      <span className={s.span}>Select avatar</span>
      <label className={s}>
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
          pattern="^[a-zA-Zа-яА-Я0-9_]+(([' @ .-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Email can consist of letters of numbers and a mandatory symbol '@'. For example user@example.com etc."
          required
          id={emailInputId}
        />
      </label>
    </>
  );
};

export default InputsContact;

InputsContact.propTypes = {
  fileInputId: PropTypes.string.isRequired,
  setFile: PropTypes.func.isRequired,
  handleDelFile: PropTypes.func.isRequired,
  file: PropTypes.object,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
