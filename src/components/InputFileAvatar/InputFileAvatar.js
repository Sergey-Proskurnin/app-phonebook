import React, { useRef } from 'react';

import s from './InputFileAvatar.module.css';

const InputFileAvatar = ({ fileInputId, setFile, handleDelFile, file }) => {
  const fileInput = useRef(null);

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
    </>
  );
};

export default InputFileAvatar;
