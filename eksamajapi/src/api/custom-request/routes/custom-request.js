'use strict';

/**
 * custom-request router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::custom-request.custom-request');
