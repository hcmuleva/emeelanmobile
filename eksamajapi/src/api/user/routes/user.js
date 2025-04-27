module.exports = {
    routes: [
      {
        method: "POST",
        path: "/reset-password",
        handler: "user.resetPassword",
        config: {
          policies: [],
          auth: false, // Set to true if you want to require authentication
        },
      },
      {
        method: 'GET',
        path: '/users',
        handler: 'user.find',
        config: {
          policies: [],
          auth: false, // Set to true if you want to require authentication
        },
      },

      
      {
        method: 'GET',
        path: '/customme',
        handler: 'user.customme',
        config: {
          policies: [],
          auth: false, // Set to true if you want to require authentication
        },
      },
      {
        method: 'GET',
        path: '/custom-singleuser/:id',
        handler: 'user.customsingleuser',
        config: {
          policies: [],
          middlewares: [],
        },
       },
      {
        method: 'GET',
        path: '/custom-admins',
        handler: 'user.getAdminUsers',
        config: {
          policies: [],
          auth: false, // Set to true if you want to require authentication
        },
      },
      {
        method: 'GET',
        path:'/myrequests-status',
        handler: 'user.myprofilestatus',
        config: {
          policies: [],
          auth: false, // Set to true if you want to require authentication
        },
      },
      {
        method: "PUT",
        path: "/customupdateuser/:id",
        handler: "user.customupdateuser",
        config: {
          policies: [],
          auth: false, // Set to true if you want to require authentication
        },
      },

      {
        method: "POST",
        path: "/customregister",
        handler: "user.customRegister",
        config: {
          policies: [],
          auth: false,
          middlewares: [],
        },
      },
    ],
  };
  