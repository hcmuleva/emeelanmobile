'use strict';

/**
 * connectionrequest router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::connectionrequest.connectionrequest', {
    routes: [
    {
      method: 'PUT',
      path: '/connectionrequests/update-custom',
      handler: 'connectionrequest.updateCustom',
      config: {
        auth: false, // or true if authentication required
      },
    },
    // You can also include core routes if needed
]
  });