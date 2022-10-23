import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import useStyles from './useStyles';
import { getUserSubscription } from 'redux/auth';

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={
        <span
          className={clsx(classes.icon, classes.checkedIcon, classes.body)}
        />
      }
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const SubscriptionRadioGroup = ({ setValue, value }) => {
  const subscription = useSelector(state => getUserSubscription(state));
  const classes = useStyles();

  const handChange = e => {
    setValue(e.target.value);
  };
  return (
    <FormControl
      style={{ margin: '14%', marginBottom: '7%' }}
      component="fieldset"
    >
      <FormLabel
        style={{
          color: '#e84a5f',
          fontSize: '33px',
          marginBottom: '30px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          textAlign: 'center',
        }}
        component="legend"
      >
        Change subscription
      </FormLabel>
      <RadioGroup
        onChange={handChange}
        defaultValue={subscription}
        aria-label="Change subscribe"
        name="customized-radios"
      >
        <FormControlLabel
          label={
            <Typography
              variant="body2"
              className={value === 'starter' ? classes.body1 : classes.body}
            >
              Starter
            </Typography>
          }
          value="starter"
          control={<StyledRadio />}
        />
        <FormControlLabel
          label={
            <Typography
              variant="body2"
              className={value === 'pro' ? classes.body1 : classes.body}
            >
              Pro
            </Typography>
          }
          value="pro"
          control={<StyledRadio />}
        />
        <FormControlLabel
          label={
            <Typography
              variant="body2"
              className={value === 'business' ? classes.body1 : classes.body}
            >
              Business
            </Typography>
          }
          value="business"
          control={<StyledRadio />}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SubscriptionRadioGroup;

SubscriptionRadioGroup.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
