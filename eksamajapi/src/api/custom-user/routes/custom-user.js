module.exports = {
  routes: [
    {
      method:'GET',
      path:'custom-center-user',
      handler:'custom-user.centeruserAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
     {
      method: 'GET',
      path: '/custom-user',
      handler: 'custom-user.userAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'GET',
      path: '/custom-like-request-connection-check',
      handler: 'custom-user.likeRequestConnectionAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'PUT',
      path: '/custom-update-likes/:id/userid/:userid',
      handler: 'custom-user.updateLikesAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'GET',
      path: '/gender-count',
      handler: 'custom-user.genderAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'DELETE',
      path: '/custom-like-delete/:id/userid/:userid',
      handler: 'custom-user.deleteLikeAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'GET',
      path: '/custom-requests',
      handler: 'custom-user.requestsAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'PUT',
      path: '/custom-update-requests/:id/userid/:userid',
      handler: 'custom-user.updateRequestsAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'DELETE',
      path: '/custom-remove-request/:id/userid/:userid',
      handler: 'custom-user.removeRequestAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'PUT',
      path: '/custom-update-connections/:id/userid/:userid',
      handler: 'custom-user.updateConnectionsAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'GET',
      path: '/custom-connections',
      handler: 'custom-user.connectionsAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'GET',
      path: '/custom-likes-count',
      handler: 'custom-user.likesCountAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'DELETE',
      path: '/custom-remove-connection/:id/userid/:userid',
      handler: 'custom-user.removeConnectionAction',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
//id = which has to be deleted
//userid = from which has to be deleted
