import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const nodeRef1 = useRef(null);
  const nodeRef2 = useRef(null);
  const viewPort = useWindowDimensions();
  const [showModal, setStateShowModal] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [contactsListRender, setContactsListRender] = useState(true);
  const [showContact, setshowContact] = useState(false);

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
          <Container title={t('contactsView.title1')} titles={'titles'}>
            <Animation style={sAl} time={250} nodeRef={nodeRef1}>
              <ContactForm nodeRef={nodeRef1} />
            </Animation>
          </Container>

          <contextProps.Provider
            value={{
              toggleModal,
              showModal,
              favorite,
              setFavorite,
              showContact,
              setshowContact,
            }}
          >
            <Container title={t('contactsView.title2')}>
              {isLoadingContacts ? (
                <OnLoader />
              ) : (
                <Animation style={sAr} time={250} nodeRef={nodeRef2}>
                  <ContactContainer nodeRef={nodeRef2} />
                </Animation>
              )}
            </Container>
          </contextProps.Provider>
        </div>
      )}
      {viewPort.width < 768 && (
        <div className={s.ContactsContainer}>
          <ButtonShowContactForm
            contactsListRender={contactsListRender}
            setContactsListRender={setContactsListRender}
          />
          {contactsListRender ? (
            <contextProps.Provider
              value={{
                toggleModal,
                showModal,
                favorite,
                setFavorite,
                showContact,
                setshowContact,
              }}
            >
              <Container title={t('contactsView.title2')}>
                {isLoadingContacts ? (
                  <OnLoader />
                ) : (
                  <Animation style={sAr} time={250} nodeRef={nodeRef2}>
                    <ContactContainer nodeRef={nodeRef2} />
                  </Animation>
                )}
              </Container>
            </contextProps.Provider>
          ) : (
            <div className={s.ContactsContainer}>
              <Container title={t('contactsView.title1')} titles={'titles'}>
                <Animation style={sAl} time={250} nodeRef={nodeRef1}>
                  <ContactForm nodeRef={nodeRef1} />
                </Animation>
              </Container>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default ContactsView;
