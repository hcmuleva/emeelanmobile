module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/custom-login',
      handler: 'auth.customLogin',
      config: {
        auth: false,
      },
    },
  ],
};
