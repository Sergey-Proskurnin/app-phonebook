import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import alert from 'helpers/alert';
import { getUserSubscription } from 'redux/auth';
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
  const { t } = useTranslation();
  const fileInput = useRef(null);
  const subscription = useSelector(state => getUserSubscription(state));

  const nameInputId = uuidv4();
  const numberInputId = uuidv4();
  const emailInputId = uuidv4();

  const onClickInputFile = e => {
    e.preventDefault();
    fileInput.current.click();
  };

  const handleChangeAvatar = e => {
    if (subscription === 'business') {
      if (
        (e.target.files[0].type.includes('image/png') ||
          e.target.files[0].type.includes('image/jpeg')) &&
        e.target.files[0].size <= 2000000
      ) {
        setFile(e.target.files[0]);
      } else {
        alert('The file format can be .png or .jpg and must not exceed 2 MB');
      }
    } else {
      alert('To change your avatar, subscribe to the "Business" package!');
    }
  };

  return (
    <div className={s.lable}>
      <span className={s.span}>
        {t('contactsView.contactForm.inputsContact.spanAvatar')}
      </span>
      <label>
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
          {file
            ? file.name
            : t('contactsView.contactForm.inputsContact.buttonAvatar')}
        </button>
        <button type="button" className={s.deleteBtn} onClick={handleDelFile}>
          &#10006;
        </button>
      </label>
      <label htmlFor={nameInputId} className="lable">
        <span className={s.span}>
          {t('contactsView.contactForm.inputsContact.spanName')}
        </span>
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[A-Za-zА-Яа-яЁёЄєЇї' '\-()0-9]{3,30}$"
          title={t('contactsView.contactForm.inputsContact.titleName')}
          required
          id={nameInputId}
        />
      </label>

      <label htmlFor={numberInputId} className="lable">
        <span className={s.span}>
          {t('contactsView.contactForm.inputsContact.spanNumber')}
        </span>
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title={t('contactsView.contactForm.inputsContact.titleNumber')}
          required
          id={numberInputId}
        />
      </label>

      <label htmlFor={emailInputId} className="lable">
        <span className={s.span}>
          {t('contactsView.contactForm.inputsContact.spanEmail')}
        </span>
        <input
          className={s.input}
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я0-9_]+(([' @ .-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title={t('contactsView.contactForm.inputsContact.titleEmail')}
          required
          id={emailInputId}
        />
      </label>
    </div>
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
