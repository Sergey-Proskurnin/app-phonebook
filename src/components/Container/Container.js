import React from 'react';
import PropTypes from 'prop-types';

import s from './Container.module.css';
import sAt from 'helpers/animation/animationTitle.module.css';
import Animation from 'helpers/animation/Animation';

const Container = ({ children, title }) => {
  const nodeRef = React.useRef(null);
  return (
    <div className={s.container}>
      <Animation style={sAt} time={500} nodeRef={nodeRef}>
        <h1 ref={nodeRef} className={s.title}>
          {title}
        </h1>
      </Animation>
      {children}
    </div>
  );
};

export default Container;

Container.propTypes = {
  title: PropTypes.string.isRequired,
};
