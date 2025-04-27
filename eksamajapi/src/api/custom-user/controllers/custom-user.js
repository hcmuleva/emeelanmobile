"use strict";

/**
 * A set of functions called "actions" for `custom-meelan`
 */

module.exports = {
  centeruserAction: async (ctx) => {
    try {
      const { page = 1, pageSize = 10 } = ctx.query.pagination || {};
      const start = (page - 1) * pageSize;
      const {
        id,
        state,
        district,
        Gotra,
        DOB,
        city,
        MobileNumber,
        dob_gte,
        dob_lte,
        profession,
        education,
        WorkingCity,
        merital_status,
        gotra_not_in,
        checked,
      } = ctx.query.filters || {};
      const userId = ctx.state.user?.id; // Get authenticated user's ID from the JWT token
      if (!userId) {
        return ctx.badRequest("User ID not found in token");
      }
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId
      );
  
      const sex = entity.Sex;
      const isCenterOrAdmin = entity.emeelanrole === "CENTER" || entity.emeelanrole === "ADMIN";
  
      // Building filters more concisely
      const filters = {
        ...(checked && { profile_checked: { $eq: checked } }),
        ...(state && { State: { $contains: state } }),
        ...(gotra_not_in && { Gotra: { $not: { $contains: gotra_not_in } } }),
        ...(education && { HighestDegree: { $eq: education } }),
        ...(merital_status && { MeritalStatus: { $eq: merital_status } }),
        ...(profession && { Profession: { $contains: profession } }),
        ...(dob_gte && { DOB: { $gte: dob_gte } }),
        ...(dob_lte && { DOB: { $lte: dob_lte } }),
        ...(!isCenterOrAdmin && sex && { Sex: { $not: sex } }),
      };
  
      // Added Pictures to fields array and populate
      const entities = await strapi.entityService.findMany("plugin::users-permissions.user", {
        //filters: isCenterOrAdmin ? {} : filters,
        populate: ["likesby", "profilePicture", "connections", "user_setting"],
        // fields: [
        //   "id", 
        //   "FirstName", 
        //   "LastName", 
        //   "State", 
        //   "mobile", 
        //   "DOB", 
        //   "Sex",
        //   "userstatus",//Added for admin/superad
        //   "Pictures"  // Added Pictures field
        // ],
        pagination: { start, limit: pageSize },
      });
  
      const finalList = entities.map(entity => {
        const { 
          id: entityId, 
          FirstName, 
          LastName, 
          State, 
          district,
          city,
          Gotra,
          DOB,
          WorkingCity,
          mobile, 
          likesby, 
          MobileNumber,
          connections, 
          sex,
          user_setting,
          Pictures,        // Added Pictures
          profilePicture   // Added profilePicture
        } = entity;
        let displayNameVisible = true;
        let photosVisible = true;
        let dateOfBirthVisible = true;
  
        if (user_setting) {
          const isConnected = connections.some(conn => conn.id === parseInt(id));
          
          if (user_setting.displayName === "isVisibleToOnlyConnections" && !isConnected) {
            displayNameVisible = false;
          }
          if (user_setting.photos === "isVisibleToOnlyConnections" && !isConnected) {
            photosVisible = false;
          }
          if (user_setting.dateOfBirth === "isVisibleToOnlyConnections" && !isConnected) {
            dateOfBirthVisible = false;
          }
        }
  
        // Process photos based on visibility settings
        let processedPhotos = null;
        if (photosVisible) {
          if (Pictures) {
            processedPhotos = Pictures;
          } else if (profilePicture) {
            processedPhotos = profilePicture.url;
          }
        }

        return {
          ...entity,
          FirstName: displayNameVisible ? FirstName : `GJ${entityId}`,
          LastName: displayNameVisible ? LastName : "",
          Pictures: processedPhotos,    // Include processed photos
          profilePicture: photosVisible ? profilePicture : null,  // Include profile picture based on visibility
          liked: likesby?.some(like => like.id === parseInt(id)) || false,
          displayNameVisible,
          photosVisible,
          dateOfBirthVisible,
        };
      });
  

      ctx.body = {
        message: "Paginated User Data",
        data: finalList,
        meta: {
          pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            pageCount: Math.ceil(finalList.length / pageSize),
            total: finalList.length,
          },
        },
      };
    } catch (error) {
      console.log("error", error);
    }
  },




  userAction: async (ctx) => {
    try {
      const { page = 1, pageSize = 10 } = ctx.query.pagination || {};
      const start = (page - 1) * pageSize;
      const {
        id,
        state,
        dob_gte,
        dob_lte,
        profession,
        education,
        merital_status,
        gotra_not_in,
        checked,
      } = ctx.query.filters || {};
      const userId = ctx.state.user?.id; // Get authenticated user's ID from the JWT token
      if (!userId) {
        return ctx.badRequest("User ID not found in token");
      }
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId
      );
  
      const sex = entity.Sex;
      const isCenterOrAdmin = entity.emeelanrole === "CENTER" || entity.emeelanrole === "ADMIN";
      // Building filters more concisely
      const filters = {
        $and: [
          {
            $or: [
              { marital: { $null: true } },
              { marital: { $eq: '' } },
              { marital: { $notContains: 'Admin' } }
            ]
          },
          {
            $or: [
              { MeritalStatus: { $null: true } },
              { MeritalStatus: { $notContains: 'Admin' } }
            ]
          },
          ...(!isCenterOrAdmin && sex ? [{ Sex: { $ne: sex } }] : [])
        ]
      };
      // Added Pictures to fields array and populate
      const entities = await strapi.entityService.findMany("plugin::users-permissions.user", {
        filters:  filters,
        pagination: { start, limit: pageSize },
      });
      const finalList = entities.map(entity => {
        const { 
          id: entityId, 
          FirstName, 
          LastName, 
          State, 
          mobile, 
          likesby, 
          connections, 

          sex,
          user_setting,
          Pictures,        // Added Pictures
          profilePicture   // Added profilePicture
        } = entity;
        let displayNameVisible = true;
        let photosVisible = true;
        let dateOfBirthVisible = true;
        if (user_setting) {
          const isConnected = connections.some(conn => conn.id === parseInt(id));
          
          if (user_setting.displayName === "isVisibleToOnlyConnections" && !isConnected) {
            displayNameVisible = false;
          }
          if (user_setting.photos === "isVisibleToOnlyConnections" && !isConnected) {
            photosVisible = false;
          }
          if (user_setting.dateOfBirth === "isVisibleToOnlyConnections" && !isConnected) {
            dateOfBirthVisible = false;
          }
        }
  
        // Process photos based on visibility settings
        let processedPhotos = null;
        if (photosVisible) {
          if (Pictures) {
            processedPhotos = Pictures;
          } else if (profilePicture) {
            processedPhotos = profilePicture.url;
          }
        }

        return {
          ...entity,
          FirstName: displayNameVisible ? FirstName : `GJ${entityId}`,
          LastName: displayNameVisible ? LastName : "",
          Pictures: processedPhotos,    // Include processed photos
          profilePicture: photosVisible ? profilePicture : null,  // Include profile picture based on visibility
          liked: likesby?.some(like => like.id === parseInt(id)) || false,
          displayNameVisible,
          photosVisible,
          dateOfBirthVisible,
        };
      });
  
      ctx.body = {
        message: "Paginated User Data",
        data: finalList,
        meta: {
          pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            pageCount: Math.ceil(finalList.length / pageSize),
            total: finalList.length,
          },
        },
      };
    } catch (error) {
      console.log("error", error);
    }
  },
  genderAction: async (ctx) => {
    const male = await strapi.entityService.count(
      "plugin::users-permissions.user",
      {
        filters: {
          Sex: { $eq: "Male" },
        },
      }
    );
    const female = await strapi.entityService.count(
      "plugin::users-permissions.user",
      {
        filters: {
          Sex: { $eq: "Female" },
        },
      }
    );
    ctx.body = {
      message: "Gender Counts ",
      data: {
        Male: male,
        Female: female,
      },
    };
  },
  likeRequestConnectionAction: async (ctx) => {
    try {
      const { id, userid } = ctx.query;
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["likesby", "requestsby", "photos", "profilePicture", "connections"],
        }
      );
      let isConnection = false;
      entity?.connections?.forEach((connection) => {
        if (connection.id === parseInt(userid)){
          isConnection = true;
        }
      })
      let liked = false;
      entity?.likesby?.forEach((like) => {
        if (like?.id === parseInt(userid)) {
          liked = true;
        }
      });
      let requested = false;
      entity?.requestsby?.forEach((request) => {
        if (request?.id === parseInt(userid)) {
          requested = true;
        }
      });
      delete entity.likesby;
      delete entity.requestsby;
      const ent = { ...entity, liked: liked, requested: requested, isConnection: isConnection };
      ctx.body = {
        message: "Data with like & request",
        data: ent,
      };
    } catch (error) {
      console.log("error", error);
    }
  },
  likesCountAction: async (ctx) => {
    try {
      const { id } = ctx.query;
      const { page = 1, pageSize = 10 } = ctx.query.pagination || {};
      const start = (page - 1) * pageSize;
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["likesby"],
        }
      );
      const finalList = entity.likesby;
      const total = finalList.length;
      const final = finalList.slice(
        (page - 1) * pageSize,
        (page - 1) * pageSize + pageSize
      );
      ctx.body = {
        message: "Paginated Likes Data",
        data: final,
        meta: {
          pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            pageCount: Math.ceil(total / pageSize),
            total: total,
          },
        },
      };
    } catch (error) {
      console.log("error", error);
    }
  },
  deleteLikeAction: async (ctx) => {
    try {
      const { id, userid } = ctx.params;
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["likesby"],
        }
      );
      const updatedids = entity.likesby.map(
        (like) => like.id !== parseInt(userid)
      );
      await strapi.db.query("plugin::users-permissions.user").update({
        where: { id: id }, // The ID of the user you want to update
        data: {
          likesby: updatedids.map((like) => like.id), // Directly update the relation field with the new array of IDs
        },
      });
      ctx.body = {
        data: "SUCCESSFULLY DELETED",
      };
    } catch (error) {
      console.log(error);
    }
  },
  updateLikesAction: async (ctx) => {
    try {
      const { id, userid } = ctx.params;
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["likesby"],
        }
      );
      let liked = false;
      const updatedIds = entity?.likesby?.map((like) => {
        if (like?.id === parseInt(userid)) {
          liked = true;
        }
        return like?.id;
      });
      if (!liked) {
        updatedIds.push(parseInt(userid));
      }
      await strapi.entityService.update("plugin::users-permissions.user", id, {
        data: {
          likesby: updatedIds,
        },
      });
      ctx.body = {
        message: "Likes updated successfully",
      };
    } catch (error) {
      console.log("error", error);
    }
  },
  requestsAction: async (ctx) => {
    try {
      const { page = 1, pageSize = 10 } = ctx.query.pagination || {};
      const start = (page - 1) * pageSize;
      const { id } = ctx.query;
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["requestsby"],
        }
      );
      const finalList = entity.requestsby;
      const total = finalList.length;
      const final = finalList.slice(
        (page - 1) * pageSize,
        (page - 1) * pageSize + pageSize
      );
      ctx.body = {
        message: "Paginated Request Data",
        data: final,
        meta: {
          pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            pageCount: Math.ceil(total / pageSize),
            total: total,
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
  },
  updateRequestsAction1: async (ctx) => {
    try {
      const { id, userid } = ctx.params;
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["requestsby"],
        }
      );
      const finalList = entity.requestsby;
      const total = finalList.length;
      const final = finalList.slice(
        (page - 1) * pageSize,
        (page - 1) * pageSize + pageSize
      );
      ctx.body = {
        message: "Requests Updated Successfully",
      };
    } catch (error) {
      console.log(error);
    }
  },
  updateRequestsAction: async (ctx) => {
    try {
      const { id, userid } = ctx.params;
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["requestsby"],
        }
      );
      let request = false;
      const updatedIds = entity.requestsby.map((request) => {
        if (request.id === parseInt(userid)) {
          request = true;
        }
        return request.id;
      });
      if (!request) {
        updatedIds.push(parseInt(userid));
      }
      await strapi.entityService.update("plugin::users-permissions.user", id, {
        data: {
          requestsby: updatedIds,
        },
      });
      ctx.body = {
        message: "Requests Updated Successfully",
      };
    } catch (error) {
      console.log(error);
    }
  },
  removeRequestAction: async (ctx) => {
    try {
      const { id, userid } = ctx.params;
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userid,
        {
          populate: ["requestsby"],
        }
      );
      const updatedIds = [];
      entity?.requestsby?.forEach((request) => {
        if (request.id !== parseInt(id)) {
          updatedIds.push(request.id);
        }
      });
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        userid,
        {
          data: {
            requestsby: updatedIds,
          },
        }
      );
      ctx.body = {
        message: "Request deleted successfully!",
      };
    } catch (error) {
      console.log(error);
    }
  },
  connectionsAction: async (ctx) => {
    try {
      const { page = 1, pageSize = 10 } = ctx.query.pagination || {};
      const start = (page - 1) * pageSize;
      const { id } = ctx.query;
      const entity = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["connections"],
        }
      );
      const finalList = entity.connections;
      const total = finalList.length;
      const final = finalList.slice(
        (page - 1) * pageSize,
        (page - 1) * pageSize + pageSize
      );
      ctx.body = {
        message: "Paginated Connections Data",
        data: final,
        meta: {
          pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            pageCount: Math.ceil(total / pageSize),
            total: total,
          },
        },
      };
    } catch (error) {
      console.log(error);
    }
  },
  removeConnectionAction: async (ctx) => {
    try {
      const { id, userid } = ctx.params;
      const entityId = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["connections"],
        }
      );
      let updatedIds = entityId?.connections?.filter(
        (connection) => connection.id !== parseInt(userid)
      );
      await strapi.entityService.update("plugin::users-permissions.user", id, {
        data: {
          connections: updatedIds,
        },
      });
      const entityUserId = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userid,
        {
          populate: ["connections"],
        }
      );
      updatedIds = entityUserId?.connections?.filter(
        (connection) => connection.id !== parseInt(id)
      );
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        userid,
        {
          data: {
            connections: updatedIds,
          },
        }
      );
      ctx.body = {
        message: "Connection Removed Successfully",
      };
    } catch (error) {
      console.log(error);
    }
  },
  updateConnectionsAction: async (ctx) => {
    try {
      const { id, userid } = ctx.params;
      const entityId = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userid,
        {
          populate: ["connections"],
        }
      );
      let updatedIds = [];
      let flag = false;
      entityId?.connections?.forEach((connection) => {
        updatedIds.push(connection.id);
        if (connection.id === parseInt(id)) {
          flag = true;
        }
      });
      if (!flag) {
        updatedIds.push(parseInt(id));
      }
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        userid,
        {
          data: {
            connections: updatedIds,
          },
        }
      );
      updatedIds = [];
      const entityUserId = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        id,
        {
          populate: ["connections"],
        }
      );
      flag = false;
      entityUserId?.connections?.forEach((connection) => {
        updatedIds.push(connection.id);
        if (connection.id === parseInt(userid)) {
          flag = true;
        }
      });
      if (!flag) {
        updatedIds.push(parseInt(userid));
      }
      await strapi.entityService.update("plugin::users-permissions.user", id, {
        data: {
          connections: updatedIds,
        },
      });
      ctx.body = {
        message: "Connection created successfully!",
      };
    } catch (error) {
      console.log(error);
    }
  },
};
