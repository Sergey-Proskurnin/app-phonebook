import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { textAnimation } from 'helpers/animationText';
import s from './Views.module.css';
import Animation from 'helpers/animation/Animation';
import sAl from 'helpers/animation/animationLeft.module.css';
import sAr from 'helpers/animation/animationRight.module.css';
import sAb from 'helpers/animation/animationBottom.module.css';

const HomeView = () => {
  const { t } = useTranslation();
  let textRef = useRef(null);
  const nodeRef1 = useRef(null);
  const nodeRef2 = useRef(null);
  const nodeRef3 = useRef(null);

  useEffect(() => {
    textAnimation(textRef);
  }, []);

  return (
    <div className={s.HomeContainer}>
      <Animation style={sAl} time={250} nodeRef={nodeRef1}>
        <h1 ref={nodeRef1} className={s.HomeTitle}>
          {t('title')}
        </h1>
      </Animation>
      <article className={s.HomeArticle}>
        <Animation style={sAr} time={500} nodeRef={nodeRef2}>
          <p ref={nodeRef2} className={s.HomeArticleDescription}>
            {t('description.part1')}
          </p>
        </Animation>
        <Animation style={sAb} time={750} nodeRef={nodeRef3}>
          <div ref={nodeRef3}>
            <span ref={el => (textRef = el)} className={s.HomeArticleSpan}>
              {t('description.part2')}
            </span>
          </div>
        </Animation>
      </article>
    </div>
  );
};

export default HomeView;
