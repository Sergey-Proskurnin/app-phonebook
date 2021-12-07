import axios from 'axios';

const env = process.env.NODE_ENV;
switch (env) {
  case 'development':
    axios.defaults.baseURL = 'http://localhost:5737/api/v1';
    break;
  case 'production':
    axios.defaults.baseURL =
      'https://server-contacts-rest-api.herokuapp.com/api/v1';
    break;
  default:
    axios.defaults.baseURL = 'http://localhost:5737/api/v1';
    break;
}
// axios.defaults.baseURL =
//   'https://server-contacts-rest-api.herokuapp.com/api/v1';
// axios.defaults.baseURL = 'http://localhost:5737/api/v1/';

//--------------------------------auth-operations-------------------------------
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const fetchSignUp = credentials => axios.post('/users/signup', credentials);

const fetchLogin = credentials => axios.post('/users/login', credentials);

const fetchLogout = () => axios.post('/users/logout');

const fetchCurrent = () => axios.get('/users/current');

const fetchEditUserInfo = formData => axios.patch('/users/avatars', formData);

const fetchRefreshToken = () => axios.get('/users/refresh');

const fetchRepeatVerify = email => axios.post('/users/verify', email);

//---------------------------contacts-operation----------------------------------

const fetchGetContacts = () => axios.get('/contacts');

const fetchPostContacts = contact => axios.post('/contacts', contact);

const fetchDeleteContacts = id => axios.delete(`/contacts/${id}`);

const fetchFavoriteChangeContact = (id, favorite) =>
  axios.patch(`/contacts/${id}/favorite`, { favorite });

// const fetchChangeContacts = ({ id, name, number, email }) =>
//   axios.put(`/contacts/${id}`, { name, number, email });

const fetchChangeContact = ({ id, formData }) =>
  axios.put(`/contacts/${id}`, formData);

export {
  token,
  fetchSignUp,
  fetchLogin,
  fetchLogout,
  fetchCurrent,
  fetchGetContacts,
  fetchPostContacts,
  fetchDeleteContacts,
  fetchChangeContact,
  fetchFavoriteChangeContact,
  fetchEditUserInfo,
  fetchRefreshToken,
  fetchRepeatVerify,
};
