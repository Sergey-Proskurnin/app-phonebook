import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Animation = ({ children, style, time, nodeRef }) => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={time}
      classNames={style}
      nodeRef={nodeRef}
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default Animation;

Animation.propTypes = {
  style: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired,
  nodeRef: PropTypes.object.isRequired,
};
