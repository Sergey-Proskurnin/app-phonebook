import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { textAnimation } from 'helpers/animationText';
import s from './Views.module.css';
import Animation from 'helpers/animation/Animation';
import sAb from 'helpers/animation/animationBottom.module.css';
import { getСurrentLocalization } from 'redux/auth';

const OfflineView = () => {
  let textRef = useRef(null);
  const nodeRef3 = useRef(null);

  useEffect(() => {
    textAnimation(textRef);
  }, []);

  const currentLocalization = useSelector(getСurrentLocalization);

  let text;

  switch (currentLocalization) {
    case 'en':
      text = 'There is no internet,           please wait...';
      break;
    case 'ru':
      text = 'Интернета нет,          подождите...';
      break;
    case 'ua':
      text = 'Hемає Інтернету,      зачекайте...';
      break;
    default:
      text = 'There is no internet,           please wait...';
      break;
  }
  console.log(currentLocalization);

  return (
    <div className={s.HomeContainer}>
      <article className={s.HomeArticle}>
        <Animation style={sAb} time={750} nodeRef={nodeRef3}>
          <div ref={nodeRef3}>
            <span ref={el => (textRef = el)} className={s.HomeArticleSpan}>
              {text}
            </span>
          </div>
        </Animation>
      </article>
    </div>
  );
};

export default OfflineView;
