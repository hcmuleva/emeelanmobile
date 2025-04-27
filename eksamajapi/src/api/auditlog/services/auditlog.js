'use strict';

/**
 * auditlog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::auditlog.auditlog');
