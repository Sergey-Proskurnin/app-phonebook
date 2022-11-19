import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import s from './ButtonAddToHomeScreen.module.css';
import icon from 'images/icon-app-phonebook.png';
import ButtonCloseModal from 'components/ButtonCloseModal';
import useAddToHomeScreenPrompt from 'hooks/useAddToHomeScreenPrompt';

const useStyles = makeStyles(theme => ({
  customBtn: {
    backgroundColor: '#e84a5f',
    paddingRight: '30px',
    fontSize: '18px',
  },
}));

const ButtonAddToHomeScreen = () => {
  const classes = useStyles();
  const [prompt, promptToInstall] = useAddToHomeScreenPrompt();
  const [isVisible, setVisibleState] = useState(false);

  const hide = () => {
    setVisibleState(true);
    console.log(isVisible);
  };

  useEffect(() => {
    if (prompt) {
      setVisibleState(true);
    }
  }, [prompt]);

  return (
    <>
      {!isVisible && (
        <div style={{ position: 'absolute', bottom: '1%' }}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.customBtn}
            onClick={promptToInstall}
          >
            <img className={s.icon} src={icon} alt="Icon"></img>
            Add to home screen
          </Button>
          <ButtonCloseModal
            style={{
              position: 'absolute',
              top: '2%',
              right: '2%',
              color: '#3f51b5',
            }}
            closeModal={hide}
          />
        </div>
      )}
    </>
  );
};

export default ButtonAddToHomeScreen;
