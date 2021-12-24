import React, { useEffect, useRef } from 'react';

import { textAnimation } from 'helpers/animationText';
import s from './Views.module.css';
import Animation from 'helpers/animation/Animation';
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
      <Animation style={sAl} time={250}>
        <h1 className={s.HomeTitle}>Phonebook </h1>
      </Animation>
      <article className={s.HomeArticle}>
        <Animation style={sAr} time={500}>
          <p className={s.HomeArticleDescription}>
            We used to dream about this stuff. Now we get to build it. It's
            pretty great.
          </p>
        </Animation>
        <Animation style={sAb} time={750}>
          <span ref={el => (textRef = el)} className={s.HomeArticleSpan}>
            Steven Paul Jobs, Apple Worldwide Developers Conference (June 2004)
          </span>
        </Animation>
      </article>
    </div>
  );
};

export default HomeView;
