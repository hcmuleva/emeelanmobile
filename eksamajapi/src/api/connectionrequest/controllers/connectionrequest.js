'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { sendNotification } = require('../../../utils/ably'); // Adjust if path differs

module.exports = createCoreController('api::connectionrequest.connectionrequest', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);
    const parsedResponse = JSON.parse(JSON.stringify(response));
   
    const request = response.data?.attributes;
    const receiverId = response.data?.attributes?.receiver?.data?.id;
  
    if (receiverId) {
      await sendNotification(`user:${receiverId}`, 'connection-request', {
        message: `You have a new connection request from ${request.status}.`,
        status: request.status,
        from: response.data?.relationships?.sender?.data?.id,
        requestId: response.data.id,
      });
      console.log('Notification sent to:', receiverId);
    }

    return response;
  },
  async update(ctx) {
    console.log("Custom update controller is called")

    ctx.query = {
      ...ctx.query,
      populate: ['receiver', 'sender'],
    };
  
    // Call the original update
    const response = await super.update(ctx);
  
//    console.log("response for update", response)
    const updated = response.data?.attributes;
    //const receiverId = response.data?.relationships?.receiver?.data?.id;
    const receiverId = response?.data?.attributes?.receiver?.data?.id || 
                   response?.data?.relationships?.receiver?.data?.id;

    const senderId = response?.data?.attributes?.sender?.data?.id || 
                 response?.data?.relationships?.sender?.data?.id;
    const status = response?.data?.attributes?.status
    const requestId = response?.data?.id;
    console.log("Sender ", senderId)
    switch(status){
      case "PENDING":
        await sendNotification(`user:${receiverId}`, 'connection-request', {
          message: `Please take action ${status} by ${senderId}`,
          status,
          requestId
        });
        break;
        case "ACCEPTED":
          await sendNotification(`user:${senderId}`, 'connection-request', {
            message: `Congretulation, your request has been ${status} by ${receiverId}`,
            status,
            requestId
          });
          break;
      case "ENGGAGED":
        //Here two notification will go one to sender and one with whom
        await sendNotification(`user:${senderId}`, 'connection-request', {
          message: `Congretulation, your Engaggement ${senderId} with ${receiverId}`,
          status,
          requestId
        });
        
        await sendNotification(`user:${receiverId}`, 'connection-request', {
          message: `Congretulation, your Engaggement ${receiverId} with ${senderId}`,
          status,
          requestId
        });
        break;
       case "REJECTED":
       case "BLOCKED":
       case "SUSPEND":
            await sendNotification(`user:${senderId}`, 'connection-request', {
              message: `Sorry your reques has been ${status} by ${receiverId}`,
              status,
              requestId
            });
    }
    return response;
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
            
            $or: [
              { 
                sender: { 
                  orgsku: currentUser.orgsku 
                } 
              },
              { 
                receiver: { 
                  orgsku: currentUser.orgsku 
                } 
              }
            ]
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
    async updateCustom(ctx) {
    console.log("sssCustom update controller is called updateCustom");

    try {
      console.log("Request body: ", ctx.request);
      const { body } = ctx.request;
      console.log("Request body: ", body);

      const receiverId = body?.data?.receiver;
      const senderId = body?.data?.sender;
      const status = body?.data?.status;
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
        },
      });

      return updatedEntry;

    } catch (err) {
      console.error('Error in custom update:', err);
      ctx.throw(500, err);
    }
  },

}));
