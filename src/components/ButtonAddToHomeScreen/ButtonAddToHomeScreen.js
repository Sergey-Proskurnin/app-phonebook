import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import s from './ButtonAddToHomeScreen.module.css';
import icon from 'images/icon-app-phonebook.png';
import ButtonCloseModal from 'components/ButtonCloseModal';

const useStyles = makeStyles(theme => ({
  customBtn: {
    backgroundColor: '#e84a5f',
    paddingRight: '30px',
    fontSize: '18px',
  },
}));

const ButtonAddToHomeScreen = () => {
  const classes = useStyles();

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        className={classes.customBtn}
        style={{ position: 'absolute', bottom: '1%' }}
      >
        <img className={s.icon} src={icon} alt="Icon"></img>
        Add to home screen
        <ButtonCloseModal
          style={{ position: 'absolute', top: '0%', right: '2%' }}
        />
      </Button>
    </>
  );
};

export default ButtonAddToHomeScreen;
