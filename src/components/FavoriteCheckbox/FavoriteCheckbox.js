import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { v4 as uuidv4 } from 'uuid';

const FavoriteCheckBox = ({ id = uuidv4(), favorite, handleChange, size }) => {
  const FavoriteCheckbox = withStyles({
    root: {
      color: '#3f51b5',
      '&$checked': {
        color: '#e84a5f',
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

  return (
    <>
      <FormControlLabel
        style={{ marginRight: '-11px' }}
        control={
          <FavoriteCheckbox
            icon={<FavoriteBorder fontSize={size} />}
            checked={favorite}
            onChange={handleChange}
            checkedIcon={<Favorite fontSize={size} />}
            name={`checked${id}`}
          />
        }
      />
    </>
  );
};

export default FavoriteCheckBox;
