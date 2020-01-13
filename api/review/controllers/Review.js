"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.review.search(ctx.query);
    } else {
      entities = await strapi.services.review.find(ctx.query);
    }

    return entities.map(entity => {
      const review = sanitizeEntity(entity, { model: strapi.models.review });

      const len = review.text.length;
      review.text = review.text.slice(0, 500);
      if (len > 500) {
        review.text += "...";
      }

      return review;
    });
  }
};
