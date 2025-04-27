'use strict';

/**
 * custom-request controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::custom-request.custom-request', ({ strapi }) => ({

    async update(ctx) {
        console.log("sssCustom update controller is called updateCustom");
  
        try {
          console.log("Request body: ", ctx.request);
          const { body } = ctx.request;
          console.log("Request body: ", body);
    
          const receiverId = body?.data?.receiver;
          const senderId = body?.data?.sender;
          const status = body?.data?.status;
          const message = body?.data?.message;
          console.log("Receiver ID: ", receiverId, "Sender ID: ", senderId, "Status: ", status); 
          if (!receiverId || !senderId || !status) {
            return ctx.badRequest('Missing sender, receiver, or status in request body.');
          }
    
          // Find the existing connection request where sender/receiver match either way
          const existingConnection = await strapi.entityService.findMany('api::connectionrequest.connectionrequest', {
            filters: {
              $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
              ],
            },
            limit: 1, // we expect at most one match
          });
          console.log("Existing connection request: ", existingConnection);
          if (!existingConnection || existingConnection.length === 0) {
            return ctx.notFound('Connection request not found.');
          }
    
          const connectionRequestId = existingConnection[0].id;
          console.log("Connection request ID: ", connectionRequestId);
          // Update the found connection request with the new status
          const updatedEntry = await strapi.entityService.update('api::connectionrequest.connectionrequest', connectionRequestId, {
            data: {
              status: status,
              message: message,
            },
          });
    
          return updatedEntry;
    
        } catch (err) {
          console.error('Error in custom update:', err);
          ctx.throw(500, err);
        }
    },
    async find(ctx) {
        const jwt = require('jsonwebtoken');
        const token = ctx.request.header.authorization?.split(' ')[1];
        if (!token) return ctx.unauthorized('No authorization token provided');
        
        const decoded = jwt.decode(token);
        const userId = decoded.id;
        console.log("User ID: ", userId);
        try {
          // 1. First get current user's orgsku
          const currentUser = await strapi.entityService.findOne(
            'plugin::users-permissions.user',
            userId,
            { fields: ['orgsku'] }
          );
          console.log("Current user: ", currentUser);
          if (!currentUser?.orgsku) {
            return ctx.badRequest('User organization not found');
          }
        
          // 2. Fetch filtered connection requests
          const { page = 1, pageSize = 10 } = ctx.query;
          console.log("Page: ", page, "Page Size: ", pageSize);
          const response = await strapi.entityService.findPage('api::connectionrequest.connectionrequest', {
            page,
            pageSize,
            sort: { updatedAt: 'desc' },
            filters: {
              
              status:"ENGGAGED",
            },
            populate: {
              sender: {
                populate: '*'
              },
              receiver: {
                populate: '*'
              }
            }
          });
        
          return response;
        } catch (error) {
          ctx.throw(500, 'Error fetching connection requests');
        }
  
  
  
      },
    
    
  
  }));
  