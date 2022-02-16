import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getVisibleContacts } from 'redux/contacts';
import contextProps from 'context/context';
import { contactChange, changeFavoriteContact } from 'redux/contacts';
import FavoriteCheckBox from 'components/FavoriteCheckbox';

import s from './ElementContactList.module.css';

const ElementContactList = () => {
  const { t } = useTranslation();
  const { toggleModal, setshowContact } = useContext(contextProps);
  const contacts = useSelector(state => getVisibleContacts(state));

  const dispatch = useDispatch();

  const onChangeContact = contact => {
    dispatch(contactChange(contact));
    return toggleModal();
  };

  const handleChange = ({ id, favorite }) => {
    const newFavorite = !favorite;
    dispatch(changeFavoriteContact(id, newFavorite));
  };

  const onContactInfo = contact => {
    dispatch(contactChange(contact));
    setshowContact(true);
    return toggleModal();
  };

  return contacts.map(
    ({ name, number, email, id, avatarContactURL, favorite }) => {
      return (
        <li className={s.item} key={id}>
          <div className={s.avatarContainer}>
            <span className={s.span}>
              <FavoriteCheckBox
                favorite={favorite}
                id={id}
                handleChange={() => handleChange({ id, favorite })}
                size="small"
              />
            </span>
            <div
              className={s.contactAvatar}
              onClick={() =>
                onContactInfo({
                  name,
                  number,
                  email,
                  avatarContactURL,
                  id,
                  favorite,
                })
              }
            >
              {avatarContactURL ? (
                <img
                  className={s.defaultСontactAvatar}
                  src={avatarContactURL}
                  alt="Avatar"
                />
              ) : (
                <p className={s.defaultСontactAvatar}>
                  {name.slice(0, 1).toUpperCase()}
                </p>
              )}
            </div>
          </div>
          <div
            className={s.nameContact}
            onClick={() =>
              onContactInfo({
                name,
                number,
                email,
                avatarContactURL,
                id,
                favorite,
              })
            }
          >
            <span className={s.spanLink}>{name}</span>
          </div>
          <div>
            <button
              type="button"
              className={s.btnListChan}
              onClick={() =>
                onChangeContact({ email, name, number, id, change: true })
              }
            >
              {t('contactsView.contactsBlock.contactButtonChange')}
            </button>
            <button
              type="button"
              className={s.btnListDel}
              onClick={() =>
                onChangeContact({ email, name, number, id, change: false })
              }
            >
              {t('contactsView.contactsBlock.contactButtonDelete')}
            </button>
          </div>
        </li>
      );
    },
  );
};

export default ElementContactList;
