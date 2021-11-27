import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { editUserInfo, getUserName } from 'redux/auth';

import useOnClickOutside from 'hooks/useOnClickOutside';
import Alert from 'helpers/alert';
import s from './UserModal.module.css';

const modalRoot = document.querySelector('#modal-root');

const UserModal = ({ closeAvatarModal }) => {
  const dispatch = useDispatch();
  const userName = useSelector(state => getUserName(state));
  const [file, setFile] = useState(null);
  const [userNewName, setUserNewName] = useState(userName);
  const [dragged, setDragged] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, closeAvatarModal);
  useEffect(() => {
    window.document.body.style.overflowY = 'hidden';
    return () => {
      window.document.body.style.overflowY = 'visible';
    };
  });
  const handleDropAvatar = e => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (
      (files[0].type.includes('image/png') ||
        files[0].type.includes('image/jpeg')) &&
      files[0].size <= 2000000
    ) {
      setFile(files[0]);
    } else {
      Alert('The file format can be .png or .jpg and must not exceed 2 MB');
    }
  };
  const handleDragOver = e => {
    e.preventDefault();
    setDragged(true);
  };
  const handleDelFile = () => {
    setFile(null);
  };

  const handleChangeAvatar = e => {
    if (
      (e.target.files[0].type.includes('image/png') ||
        e.target.files[0].type.includes('image/jpeg')) &&
      e.target.files[0].size <= 2000000
    ) {
      setFile(e.target.files[0]);
    } else {
      Alert('The file format can be .png or .jpg and must not exceed 2 MB');
    }
  };
  const onHandleChangeName = e => {
    setUserNewName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', userNewName);
    formData.append('avatar', file);
    dispatch(editUserInfo(formData));
    setFile(null);
    closeAvatarModal();
  };

  return createPortal(
    <div className={s.avatarModallWrapper}>
      <form className={s.changeAvatarForm} onSubmit={handleSubmit} ref={ref}>
        <span className={s.closeIcon} onClick={closeAvatarModal}>
          &#10006;
        </span>
        <p className={s.modalAvatarTitle}>Edit profile</p>
        <div
          className={s.dropZone}
          onDrop={handleDropAvatar}
          onDragOver={handleDragOver}
        >
          Drag and drop your avatar here
          {file ? (
            <>
              <p className={s.fileName}>{file.name}</p>
              <button
                type="button"
                className={s.buttonDelFile}
                onClick={handleDelFile}
              >
                &#10006;
              </button>
            </>
          ) : (
            <p className={dragged ? `${s.arrowDownRed}` : `${s.arrowDown}`}>
              &#11147;
            </p>
          )}
        </div>
        <span> or </span>
        <label className={s.avatarInputFileLabel}>
          Select a file avatar
          <input
            type="file"
            name="avatar"
            className={s.inputFileAvatar}
            onChange={handleChangeAvatar}
            accept="image/png, image/jpeg"
          />
        </label>
        <label className={s.nameLabel}>
          &#128396; Name:{' '}
          <input
            type="text"
            className={s.nameInput}
            placeholder={userNewName}
            value={userNewName}
            name="name"
            onChange={onHandleChangeName}
            pattern="^[A-Za-zА-Яа-яЁёЄєЇї' '\-()0-9]{3,30}$"
            title="The name can only be from three to 30 letters, apostrophe, dash and spaces. For example Adrian, Jac Mercer, d'Artagnan, Александр Репета etc."
            required
          />
        </label>
        <div className={s.buttonContainer}>
          <button type="submit" className={s.buttonOk}>
            ОК
          </button>
          <button
            type="button"
            className={s.buttonCancel}
            onClick={closeAvatarModal}
          >
            BACK
          </button>
        </div>
      </form>
    </div>,
    modalRoot,
  );
};

export default UserModal;
