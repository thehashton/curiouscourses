'use strict';

/**
 * lesson service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lesson.lesson');
