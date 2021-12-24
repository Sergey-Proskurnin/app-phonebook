import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OnLoader from 'components/OnLoader';
import ContactForm from 'components/ContactForm';
import Container from 'components/Container';
import ContactContainer from 'components/ContactContainer';
import { fetchContacts } from 'redux/contacts/contacts-operations';
import { getLoading } from 'redux/contacts/contacts-selectors';
import { getStatusLogout } from 'redux/auth/auth-selector';
import sAr from 'helpers/animation/animationRight.module.css';
import sAl from 'helpers/animation/animationLeft.module.css';
import Animation from 'helpers/animation/Animation';

import s from './Views.module.css';
import contextProps from 'context/context';
import useWindowDimensions from 'hooks/useWindowDimensions';
import ButtonShowContactForm from 'components/ButtonShowContactForm';

const ContactsView = () => {
  const viewPort = useWindowDimensions();
  const [showModal, setStateShowModal] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [contactsListRender, setContactsListRender] = useState(true);

  const toggleModal = useCallback(() => {
    setStateShowModal(prevShowModal => !prevShowModal);
  }, []);

  const isLoadingContacts = useSelector(getLoading);
  const isLogout = useSelector(getStatusLogout);

  const dispatch = useDispatch();

  useEffect(() => {
    isLogout && dispatch(fetchContacts(favorite));
  }, [dispatch, isLogout, favorite]);

  return (
    <>
      {viewPort.width >= 768 && (
        <div className={s.ContactsContainer}>
          <Container title="Add contact">
            <Animation style={sAl} time={250}>
              <ContactForm />
            </Animation>
          </Container>

          <contextProps.Provider
            value={{ toggleModal, showModal, favorite, setFavorite }}
          >
            <Container title="Contacts">
              {isLoadingContacts ? (
                <OnLoader />
              ) : (
                <Animation style={sAr} time={250}>
                  <ContactContainer />
                </Animation>
              )}
            </Container>
          </contextProps.Provider>
        </div>
      )}
      {viewPort.width < 768 && (
        <>
          <ButtonShowContactForm
            contactsListRender={contactsListRender}
            setContactsListRender={setContactsListRender}
          />
          {contactsListRender ? (
            <contextProps.Provider
              value={{ toggleModal, showModal, favorite, setFavorite }}
            >
              <Container title="Contacts">
                {isLoadingContacts ? (
                  <OnLoader />
                ) : (
                  <Animation style={sAr} time={250}>
                    <ContactContainer />
                  </Animation>
                )}
              </Container>
            </contextProps.Provider>
          ) : (
            <div className={s.ContactsContainer}>
              <Container title="Add contact">
                <Animation style={sAl} time={250}>
                  <ContactForm />
                </Animation>
              </Container>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default ContactsView;
