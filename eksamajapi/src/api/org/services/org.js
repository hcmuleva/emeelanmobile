'use strict';

/**
 * org service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::org.org');
