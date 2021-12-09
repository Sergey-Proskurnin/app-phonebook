import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import ContactMailIcon from '@material-ui/icons/ContactMail';
import { getVisibleContacts } from 'redux/contacts';
import contextProps from 'context/context';
import { contactChange, changeFavoriteContact } from 'redux/contacts';

import s from './ElementContactList.module.css';

const FavoriteCheckbox = withStyles({
  root: {
    color: '#3f51b5',
    '&$checked': {
      color: '#e84a5f',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const ElementContactList = () => {
  const toggleModal = useContext(contextProps);
  const contacts = useSelector(state => getVisibleContacts(state));

  const dispatch = useDispatch();

  const onChangeContact = contact => {
    dispatch(contactChange(contact));
    return toggleModal();
  };

  const handleChange = contact => {
    const newFavorite = !contact.favorite;
    dispatch(changeFavoriteContact(contact.id, newFavorite));
  };

  return contacts.map(
    ({ name, number, email, id, avatarContactURL, favorite }) => {
      return (
        <li className={s.item} key={id}>
          <div className={s.avatarContainer}>
            {avatarContactURL ? (
              <img
                src={avatarContactURL}
                alt="Avatar"
                className={s.contactAvatar}
              />
            ) : (
              <p className={s.contactAvatar}>
                {name.slice(0, 1).toUpperCase()}
              </p>
            )}

            <a className={s.link} href={`mailto:${email}`}>
              <span className={s.span}>
                <ContactMailIcon color="primary" fontSize="large" />
              </span>
            </a>
            <span className={s.span}>
              <FormControlLabel
                style={{ marginRight: '-11px' }}
                control={
                  <FavoriteCheckbox
                    icon={<FavoriteBorder />}
                    checked={favorite}
                    onChange={() => handleChange({ id, favorite })}
                    checkedIcon={<Favorite />}
                    name={`checked${id}`}
                    size="small"
                  />
                }
              />
            </span>
          </div>
          <a className={s.link} href={`tel:${number}`}>
            <span className={s.spanLink}>
              {name}: {number}
            </span>
          </a>
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
