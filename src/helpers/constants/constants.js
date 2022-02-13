const DEV_URL = 'http://localhost:5737/api/v1';
const PROD_URL = 'https://server-contacts-rest-api.herokuapp.com/api/v1';
const env = process.env.NODE_ENV;
let BASE_URL;
switch (env) {
  case 'development':
    BASE_URL = DEV_URL;
    break;
  case 'production':
    BASE_URL = PROD_URL;
    break;
  default:
    BASE_URL = DEV_URL;
    break;
}

const options = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
  { value: 'ua', label: 'UA' },
];

export { BASE_URL, options };
