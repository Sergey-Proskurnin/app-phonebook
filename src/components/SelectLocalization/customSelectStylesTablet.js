const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted #3f51b5',
    color: state.isSelected ? '#e84a5f' : '#2138b6',
    padding: 20,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    '&:hover': {
      color: state.isSelected ? '#2138b6' : '#e84a5f',
    },
  }),
  input: provided => ({
    ...provided,
    cursor: 'pointer',
    color: '#3f51b5',
    backgroundColor: 'transparent',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: '#3f51b5',
    '&:hover': {
      color: '#e84a5f',
    },
  }),
  container: provided => ({
    ...provided,
    fontSize: '15px',
    marginLeft: '20px',
  }),
  control: provided => ({
    ...provided,
    minHeight: '36px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderColor: '#3f51b5',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#e84a5f',
    },
    '&:focus': {
      borderColor: '#e84a5f',
    },
  }),
  placeholder: provided => ({
    ...provided,
    color: '#3f51b5',
  }),
  menu: provided => ({
    ...provided,
    fontSize: '15px',
    color: '#3f51b5',
    backgroundColor: 'transparent',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    backgroundColor: '#3f51b5',
  }),
  indicatorsContainer: provided => ({
    ...provided,
    color: '#3f51b5',
    '&:hover': {
      color: '#e84a5f',
    },
  }),
  singleValue: provided => ({
    ...provided,
    color: '#3f51b5',
    '&:hover': {
      color: '#e84a5f',
    },
  }),
};

export default customStyles;
