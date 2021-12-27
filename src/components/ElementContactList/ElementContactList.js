import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

import { getVisibleContacts } from 'redux/contacts';
import contextProps from 'context/context';
import { contactChange, changeFavoriteContact } from 'redux/contacts';
import FavoriteCheckBox from 'components/FavoriteCheckbox';

import s from './ElementContactList.module.css';

const ElementContactList = () => {
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
                <img src={avatarContactURL} alt="Avatar" />
              ) : (
                <p>{name.slice(0, 1).toUpperCase()}</p>
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
          <div className={s.contactMailPhoneContainer}>
            <a className={s.link} href={`mailto:${email}`}>
              <span className={s.span}>
                <ContactMailIcon color="primary" fontSize="large" />
              </span>
            </a>
            <a className={s.link} href={`tel:${number}`}>
              <span className={s.span}>
                <ContactPhoneIcon color="primary" fontSize="large" />
              </span>
            </a>
          </div>
          <div>
            <button
              type="button"
              className={s.btnListChan}
              onClick={() =>
                onChangeContact({ email, name, number, id, change: true })
              }
            >
              Сhange
            </button>
            <button
              type="button"
              className={s.btnListDel}
              onClick={() =>
                onChangeContact({ email, name, number, id, change: false })
              }
            >
              Delete
            </button>
          </div>
        </li>
      );
    },
  );
};

export default ElementContactList;
