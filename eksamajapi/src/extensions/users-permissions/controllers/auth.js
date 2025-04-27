'use strict';

const utils = require('@strapi/utils');
const { sanitize } = utils;

const Ably = require('ably');
const ably = new Ably.Rest.Promise(process.env.ABLY_API_KEY);
// function calculateAge(dob) {  
//   if (!dob) return null
//   const today = new Date();
//   const birthDate = new Date(dob);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDifference = today.getMonth() - birthDate.getMonth();

//   // Adjust age if the birth date hasn't occurred yet this year
//   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//   }
//   return age;
// }
module.exports = {
  
  async register(ctx) {
    const pluginStore = await strapi.store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
    });

    const settings = await pluginStore.get({ key: 'advanced' });

    if (settings.allow_register === false) {
      return ctx.badRequest(null, [{ messages: [{ id: 'Register is disabled' }] }]);
    }

    const params = {
      ...ctx.request.body,
      provider: 'local',
      confirmed: false, // Optionally keep unconfirmed until approved
      status: 'PENDING', // Custom field in user content type
    };

    // Register user
    const user = await strapi
      .plugin('users-permissions')
      .service('user')
      .add(params);

    // 🔔 Notify Admin/Superadmin Users
    const adminUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: {
        role: {
          name: {
            $in: ['ADMIN', 'SUPERADMIN'],
          },
        },
      },
    });

    for (const admin of adminUsers) {
      const channelName = `user-approval:${admin.id}`;
      await ably.channels.get(channelName).publish('new-user-registration', {
        message: `New user ${user.username} has registered and needs approval.`,
        userId: user.id,
      });
    }

    return sanitize.contentAPI.output(user, strapi.getModel('plugin::users-permissions.user'));
  },
  async customnregister(ctx) {
    const pluginStore = await strapi.store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
    });

    const settings = await pluginStore.get({ key: 'advanced' });

    if (settings.allow_register === false) {
      return ctx.badRequest(null, [{ messages: [{ id: 'Register is disabled' }] }]);
    }

    const params = {
      ...ctx.request.body,
      provider: 'local',

      
      confirmed: false, // Optionally keep unconfirmed until approved
      status: 'PENDING', // Custom field in user content type
    };

    // Register user
    const user = await strapi
      .plugin('users-permissions')
      .service('user')
      .add(params);

    // 🔔 Notify Admin/Superadmin Users
    const adminUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: {
        role: {
          name: {
            $in: ['ADMIN', 'SUPERADMIN'],
          },
        },
      },
    });

    for (const admin of adminUsers) {
      const channelName = `user-approval:${admin.id}`;
      await ably.channels.get(channelName).publish('new-user-registration', {
        message: `New user ${user.username} has registered and needs approval.`,
        userId: user.id,
      });
    }

    return sanitize.contentAPI.output(user, strapi.getModel('plugin::users-permissions.user'));
  },
  async customLogin(ctx) {
    const { identifier, password } = ctx.request.body;
    if (!identifier || !password) {
      return ctx.badRequest('Missing identifier or password');
    }

    const { user } = await strapi.plugins['users-permissions'].services.user.fetchAuthenticatedUser(identifier, password);

    if (!user) {
      throw new ApplicationError('Invalid credentials');
    }

    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
      id: user.id,
    });

    // Fetch full user with populated data
    const fullUser = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      user.id,
      {
        populate: ['role', 'profile', 'address', 'any_other_relation'],
      }
    );
    const modifiedUser = {id: fullUser.id,
      FirstName: fullUser.FirstName,
      DOB: fullUser.DOB,
      age: calculateAge(fullUser.DOB),
      FatherName: fullUser.FatherName,
      LastName: fullUser.LastName,
      Pictures: images,
      marital: fullUser.marital,
      Gotra: fullUser.Gotra,
      Profession: fullUser.Profession,
      Sex: fullUser.Sex,
      Income: fullUser.Income,
      postalcode: fullUser.postalcode,
      CreatedFor: fullUser.CreatedFor,
      manglik: fullUser.manglik,
      FamilyType: fullUser.FamilyType,
      accepted: fullUser.accepted,
      rejected: fullUser.rejected,
      acceptedbyme: fullUser.acceptedbyme,
      rejectedbyme: fullUser.rejectedbyme,
      settingjson: fullUser.settingjson,
      professionjson: fullUser.professionjson,
      likesto: fullUser.likesto,
      Address: fullUser.Address,
      State: fullUser.State,
      Country: fullUser.Country,
      HighestDegree: fullUser.HighestDegree,
      username: user.username,
      email: fullUser.email,
      confirmed: fullUser.confirmed,
      blocked: fullUser.blocked,
      createdAt: fullUser.createdAt,
      updatedAt: fullUser.updatedAt,
      role: fullUser.role}

    ctx.send({
      jwt,
      user: {id: fullUser.id,
        FirstName: fullUser.FirstName,
        DOB: fullUser.DOB,
        age: calculateAge(fullUser.DOB),
        FatherName: fullUser.FatherName,
        LastName: fullUser.LastName,
        Pictures: images,
        marital: fullUser.marital,
        Gotra: fullUser.Gotra,
        Profession: fullUser.Profession,
        Sex: fullUser.Sex,
        Income: fullUser.Income,
        postalcode: fullUser.postalcode,
        CreatedFor: fullUser.CreatedFor,
        manglik: fullUser.manglik,
        FamilyType: fullUser.FamilyType,
        accepted: fullUser.accepted,
        rejected: fullUser.rejected,
        acceptedbyme: fullUser.acceptedbyme,
        rejectedbyme: fullUser.rejectedbyme,
        settingjson: fullUser.settingjson,
        professionjson: fullUser.professionjson,
        likesto: fullUser.likesto,
        Address: fullUser.Address,
        State: fullUser.State,
        Country: fullUser.Country,
        HighestDegree: fullUser.HighestDegree,
        username: user.username,
        email: fullUser.email,
        confirmed: fullUser.confirmed,
        blocked: fullUser.blocked,
        createdAt: fullUser.createdAt,
        updatedAt: fullUser.updatedAt,
        role: fullUser.role},
    });
  },
};
