import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import OnLoader from 'components/OnLoader';
import ContactForm from 'components/ContactForm';
import Container from 'components/Container';
import ContactContainer from 'components/ContactContainer';
import { fetchContacts } from 'redux/contacts/contacts-operations';
import { getLoading } from 'redux/contacts/contacts-selectors';
import { getStatusLogout } from 'redux/auth/auth-selector';

import s from './Views.module.css';
import sAl from 'helpers/animation/animationLeft.module.css';
import sAr from 'helpers/animation/animationRight.module.css';
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
            <CSSTransition
              in={true}
              appear={true}
              timeout={250}
              classNames={sAl}
              unmountOnExit
            >
              <ContactForm />
            </CSSTransition>
          </Container>

          <contextProps.Provider
            value={{ toggleModal, showModal, favorite, setFavorite }}
          >
            <Container title="Contacts">
              {isLoadingContacts ? (
                <OnLoader />
              ) : (
                <CSSTransition
                  in={true}
                  appear={true}
                  timeout={500}
                  classNames={sAr}
                  unmountOnExit
                >
                  <ContactContainer />
                </CSSTransition>
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
                  <CSSTransition
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames={sAr}
                    unmountOnExit
                  >
                    <ContactContainer />
                  </CSSTransition>
                )}
              </Container>
            </contextProps.Provider>
          ) : (
            <div className={s.ContactsContainer}>
              <Container title="Add contact">
                <CSSTransition
                  in={true}
                  appear={true}
                  timeout={250}
                  classNames={sAl}
                  unmountOnExit
                >
                  <ContactForm />
                </CSSTransition>
              </Container>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default ContactsView;
