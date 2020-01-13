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
      entities = await strapi.services.song.search(ctx.query);
    } else {
      entities = await strapi.services.song.find(ctx.query);
    }

    return entities.map(entity => {
      const song = sanitizeEntity(entity, { model: strapi.models.song });

      if (song.review && song.review.text) {
        delete song.review.text;
      }

      return song;
    });
  }
};
