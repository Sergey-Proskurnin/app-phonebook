import React, { useEffect, useRef } from 'react';
import { textAnimation } from 'helpers/animationText';
import { CSSTransition } from 'react-transition-group';
import s from './Views.module.css';

import sAl from 'helpers/animation/animationLeft.module.css';
import sAr from 'helpers/animation/animationRight.module.css';
import sAb from 'helpers/animation/animationBottom.module.css';

const HomeView = () => {
  let textRef = useRef(null);
  useEffect(() => {
    textAnimation(textRef);
  }, []);

  return (
    <div className={s.HomeContainer}>
      <CSSTransition
        in={true}
        appear={true}
        timeout={250}
        classNames={sAl}
        unmountOnExit
      >
        <h1 className={s.HomeTitle}>Phonebook </h1>
      </CSSTransition>
      <article className={s.HomeArticle}>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={sAr}
          unmountOnExit
        >
          <p className={s.HomeArticleDescription}>
            We used to dream about this stuff. Now we get to build it. It's
            pretty great.
          </p>
        </CSSTransition>
        <CSSTransition
          in={true}
          appear={true}
          timeout={750}
          classNames={sAb}
          unmountOnExit
        >
          <span ref={el => (textRef = el)} className={s.HomeArticleSpan}>
            Steven Paul Jobs, Apple Worldwide Developers Conference (June 2004)
          </span>
        </CSSTransition>
      </article>
    </div>
  );
};

export default HomeView;
