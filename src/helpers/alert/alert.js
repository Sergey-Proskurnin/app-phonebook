import { alert } from '@pnotify/core';
import PropTypes from 'prop-types';

const onAlert = message =>
  alert({
    title: 'Oh No!',
    text: `${message}`,
    delay: 5000,
  });
export default onAlert;

alert.propTypes = {
  message: PropTypes.string,
};
