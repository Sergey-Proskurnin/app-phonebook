import React from 'react';
import PropTypes from 'prop-types';

import s from './Container.module.css';
import sAt from 'helpers/animation/animationTitle.module.css';
import Animation from 'helpers/animation/Animation';

const Container = ({ children, title, titles }) => {
  const nodeRef = React.useRef(null);
  return (
    <div className={titles ? s.container1 : s.container2}>
      <Animation style={sAt} time={500} nodeRef={nodeRef}>
        <center>
          <h1 ref={nodeRef} className={titles ? s.title1 : s.title2}>
            {title}
          </h1>
        </center>
      </Animation>
      {children}
    </div>
  );
};

export default Container;

Container.propTypes = {
  title: PropTypes.string.isRequired,
};
