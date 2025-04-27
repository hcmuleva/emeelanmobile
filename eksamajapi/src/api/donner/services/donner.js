'use strict';

/**
 * donner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::donner.donner');
