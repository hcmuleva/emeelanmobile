'use strict';

/**
 * custom-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::custom-request.custom-request');
