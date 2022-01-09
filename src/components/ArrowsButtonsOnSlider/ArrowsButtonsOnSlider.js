import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import s from './ArrowsButtonsOnSlider.module.css';

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    '&:focus': { backgroundColor: 'transparent' },
  },
}));

const ArrowsButtonsOnSlider = ({
  idContact,
  getContactOnTheLeft,
  contacts,
  getContactOnTheRight,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={s.buttonsArrow}>
        <div>
          {idContact !== 0 && (
            <IconButton
              className={classes.customHoverFocus}
              onClick={getContactOnTheLeft}
              color="primary"
              aria-label="upload picture back contact information"
              component="div"
            >
              <ArrowBackIosIcon style={{ fontSize: 65, paddingLeft: '15px' }} />
            </IconButton>
          )}
        </div>
        <div>
          {idContact !== contacts.length - 1 && (
            <IconButton
              className={classes.customHoverFocus}
              onClick={getContactOnTheRight}
              color="primary"
              aria-label="upload picture forward contact information"
              component="div"
            >
              <ArrowForwardIosIcon
                className={classes.customHoverFocus}
                style={{ fontSize: 65, paddingLeft: '15px' }}
              />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
};

export default ArrowsButtonsOnSlider;
ArrowsButtonsOnSlider.propTypes = {
  idContact: PropTypes.number.isRequired,
  getContactOnTheLeft: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  getContactOnTheRight: PropTypes.func.isRequired,
};
