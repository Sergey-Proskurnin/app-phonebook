import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import ContactFormChange from 'components/ContactFormChange';
import DeleteContact from 'components/DeleteContact';
import { getChangeContact } from 'redux/contacts';
import Animation from 'helpers/animation/Animation';
import sAl from 'helpers/animation/animationLeft.module.css';

const ChangeDeleteContatForms = () => {
  const nodeRef = useRef(null);
  const { change } = useSelector(state => getChangeContact(state));

  return (
    <Animation style={sAl} time={250} nodeRef={nodeRef}>
      {change ? (
        <ContactFormChange nodeRef={nodeRef} />
      ) : (
        <DeleteContact nodeRef={nodeRef} />
      )}
    </Animation>
  );
};

export default ChangeDeleteContatForms;
