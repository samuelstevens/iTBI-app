const isProd = true;

const serverURL = isProd
  ? 'http://18.216.125.191:5000'
  : 'http://localhost:5000';

export { serverURL };
