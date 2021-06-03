const config = {
  backend: {
    url: process.env.REACT_APP_BACKEND_API,
  },
  backendSQL: {
    url: process.env.REACT_APP_BACKEND_SQL_API,
  },
  // backendLala: {
  //   url: process.env.REACT_APP_BACKEND_LALA_API,
  // },
  purinaCategory: process.env.REACT_APP_PURINA_CATEGORY,
};

module.exports = config;
