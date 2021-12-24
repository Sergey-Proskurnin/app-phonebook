import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Animation = ({ isOpen = true, children, style, time, nodeRef }) => {
  return (
    <CSSTransition
      in={isOpen}
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
  isOpen: PropTypes.bool,
};
