const utils = require('@strapi/utils');
const { sanitize } = utils;
const { ApplicationError } = utils.errors;
const { getService } = require('@strapi/plugin-users-permissions/server/utils');

module.exports = {
  async customLogin(ctx) {
    const { identifier, password } = ctx.request.body;

    if (!identifier || !password) {
      return ctx.badRequest('Missing identifier or password');
    }

    // ✅ Find user by email or username
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: {
        $or: [
          { email: identifier },
          { username: identifier },
        ],
      },
       populate: ['photos', 'pictures']
    });
    if (!user) {
      throw new ApplicationError('Invalid credentials');
    }

    // ✅ Validate password
    const validPassword = await getService('user').validatePassword(password, user.password);

    if (!validPassword) {
      throw new ApplicationError('Invalid credentials');
    }

    const jwt = getService('jwt').issue({ id: user.id });
    const images = {};
    if (user.photos && user.photos.length > 0) {
      images['photos'] = { ...user.photos };
    }
    if (user.profilePicture) {
      images['profilePicture'] = user.profilePicture;
    }
    if (user.Pictures) {
      if (typeof user.Pictures === 'string') {
        try {
          user.Pictures = JSON.parse(user.Pictures.replace(/'/g, '"'));
          images['pictures'] = user.Pictures;
        } catch (error) {
          console.error("Failed to parse Pictures field for profile ID:", user.id, error);
        }
      }
    }
    const fullUser = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      user.id,
      {
        populate: ['role', 'profile', 'address'],
      }
    );

    const sanitizedUser = await sanitize.contentAPI.output(fullUser, strapi.getModel('plugin::users-permissions.user'));
    
    ctx.send({
      jwt,
      user: {
        ...sanitizedUser,
        images, // <-- manually include it here
       
      },
    });
  },
};
