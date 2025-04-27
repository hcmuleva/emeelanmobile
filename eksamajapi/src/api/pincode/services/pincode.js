'use strict';

/**
 * pincode service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pincode.pincode');
