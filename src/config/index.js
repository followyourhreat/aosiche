import apiUrl from '../../apiConfig';

let baseUrl = '';
let env = process.env.NODE_ENV;

switch (env) {
  case 'development':
    // baseUrl = '/aosiche/';
     baseUrl = "http://testfiles.ourslinks.com/aosiche"
    break;
  case 'production':
    baseUrl = apiUrl.httpUrl;
    break;
}

export {
  baseUrl
};
