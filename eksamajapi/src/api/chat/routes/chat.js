'use strict';

/**
 * chat router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::chat.chat', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
    create: {
      auth: false,
    },
    update: {
      auth: false,
    },
    delete: {
      auth: false,
    },
  },

  // Custom routes (optional)
  routes: [
    {
      method: 'POST',
      path: '/chats/send',
      handler: 'chat.sendMessage',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/chats/history',
      handler: 'chat.getMessagesBetweenUsers',
      config: {
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/chats/:id',
      handler: 'chat.update',
      config: {
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/chats/:id',
      handler: 'chat.delete',
      config: {
        auth: false,
      },
    },
  ],
});
