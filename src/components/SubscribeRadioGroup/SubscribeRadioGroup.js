import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    // MuiFormLabel-root
    marginBottom: '10px',
    marginTop: '10px',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  body: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '3px',
    color: '#fff',
  },
  icon: {
    marginRight: '10px',
    borderRadius: '50%',
    width: 26,
    height: 26,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#3f51b5',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 26,
      height: 26,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#3f51b5',
    },
  },
});

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

const SubsribeRadioGroup = ({ setValue }) => {
  const classes = useStyles();

  const handChange = e => {
    setValue(e.target.value);
    console.log(e.target.value);
  };
  return (
    <FormControl
      style={{ margin: '14%', marginBottom: '7%' }}
      component="fieldset"
    >
      <FormLabel
        style={{
          color: '#e84a5f',
          fontSize: '38px',
          marginBottom: '30px',
          fontWeight: 'bold',
          letterSpacing: '1px',
        }}
        component="legend"
      >
        Change subscribe
      </FormLabel>
      <RadioGroup
        onChange={handChange}
        defaultValue="starter"
        aria-label="Change subscribe"
        name="customized-radios"
      >
        <FormControlLabel
          label={
            <Typography variant="body2" className={classes.body}>
              Starter
            </Typography>
          }
          value="starter"
          control={<StyledRadio />}
        />
        <FormControlLabel
          label={
            <Typography variant="body2" className={classes.body}>
              Pro
            </Typography>
          }
          value="pro"
          control={<StyledRadio />}
        />
        <FormControlLabel
          label={
            <Typography variant="body2" className={classes.body}>
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

export default SubsribeRadioGroup;
