"use strict";
const { sendNotification } = require('../../../utils/ably'); // Adjust if path differs
function calculateAge(dob) {  
  if (!dob) return null
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birth date hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}
function getcustomizedObject(user){
  const images = user.Pictures ? (Array.isArray(user.Pictures) ? user.Pictures : JSON.parse(user.Pictures.replace(/'/g, '"'))) : [];

  return {
            id: user.id,
            FirstName: user.FirstName,
            DOB: user.DOB,
            age: calculateAge(user.DOB),
            FatherName: user.FatherName,
            LastName: user.LastName,
            Pictures: images,
            marital: user.marital,
            Gotra: user.Gotra,
            Profession: user.Profession,
            Sex: user.Sex,
            Income: user.Income,
            postalcode: user.postalcode,
            CreatedFor: user.CreatedFor,
            manglik: user.manglik,
            FamilyType: user.FamilyType,
            accepted: user.accepted,
            rejected: user.rejected,
            acceptedbyme: user.acceptedbyme,
            rejectedbyme: user.rejectedbyme,
            settingjson: user.settingjson,
            professionjson: user.professionjson,
            Address: user.Address,
            State: user.State,
            userstatus:user.userstatus,
            Country: user.Country,
            HighestDegree: user.HighestDegree,
            username: user.username,
            email: user.email,
            confirmed: user.confirmed,
            blocked: user.blocked,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role,
            orgsku: user.orgsku,
  }
}const getOrderBy = (_sort) => {
  if (!_sort) return { id: 'asc' };
  
  // Handle age sorting (special case)
  if (_sort.startsWith('age:')) {
    return _sort === 'age:ASC' ? { DOB: 'desc' } : { DOB: 'asc' };
  }
  
  // Validate sort field exists
  const validSortFields = ['id', 'createdAt', 'updatedAt', 'FirstName', 'DOB'];
  const [field, direction] = _sort.split(':');
  
  if (!validSortFields.includes(field)) {
    console.warn(`Invalid sort field: ${field}`);
    return { id: 'asc' };
  }
  
  return { 
    [field]: direction?.toLowerCase() === 'desc' ? 'desc' : 'asc' 
  };
};
const getUserIdFromCtx=(ctx) =>{
  const jwt = require('jsonwebtoken');
  const token = ctx.request.header.authorization?.split(' ')[1];
  if (!token) return ctx.unauthorized('No authorization token provided');
  
  const decoded = jwt.decode(token);
  const userId = decoded.id;
  return userId
}
async function createAuditLog(payload) {
  try {
    const auditLogEntry = await strapi.entityService.create('api::auditlog.auditlog', {
      data: {
        ...payload,
        timestamp: new Date(), // Add timestamp if not in payload
      },
    });
    return auditLogEntry;
  } catch (error) {
    strapi.log.error('Audit log creation failed:', error);
    throw error;
  }
}
module.exports = {
  
  async find(ctx) {
    const result = getUserIdFromCtx(ctx);
    let userId ;
    if (typeof result === 'string' || result instanceof Error) {
      // Handle error case
      return result; // or throw error, or send response
    } else {
      // Proceed with userId (number/string)
       userId = result;
      
    }
    // Get current user data
    const userdata = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { id: userId },
      populate: ['photos', 'pictures']
    });
    
    if (!userdata) return ctx.notFound('User not found');
    
    const oppositeSex = userdata.Sex === 'Male' ? 'Female' : 'Male';
    const { 
      _start = 0, 
      _limit = 10, 
      _sort = 'id:DESC', 
      _q,
      filters // New: Client-provided filters
    } = ctx.query;
    
  
    // Convert to numbers and validate
    const start = Math.max(0, Number(_start));
    const limit = Math.min(50, Math.max(1, Number(_limit)));
    const isAdminOrCenter = userdata.emeelanrole === "ADMIN" || userdata.emeelanrole === "CENTER";
  
    // // Base filters
    // const where = {
    //   userstatus: "APPROVED",
    //   orgsku: userdata.orgsku,
    //   sex: oppositeSex,
    //   id: { $ne: userId }
    // };
  
    let where = {
      id: { $ne: userId }, // Exclude self
    };
    
    switch (userdata.emeelanrole) {
      case "SUPERADMIN":
        // No filters at all
        break;
    
      case "CENTER":
        // Only orgsku restriction
        where.orgsku = userdata.orgsku;
        break;
    
      case "ADMIN":
        // Sex: both (i.e., no filter), userstatus: PENDING, and orgsku
        where.userstatus = "PENDING";
        where.orgsku = userdata.orgsku;
        break;
    
      case "MEELAN":
        // Opposite sex, userstatus: APPROVED, and orgsku
        where.sex = oppositeSex;
        where.userstatus = "APPROVED";
        where.orgsku = userdata.orgsku;
        where.marital = { $not: { $contains: "Admin" } };
        break;
    
      default:
        // Optionally, handle unknown roles
        console.warn("Unknown role:", userdata.emeelanrole);
        break;
    }
    // Add admin filter if needed
   
    if (filters) {
      try {
        const clientFilters = filters; // it's already an object
        
        // Handle AND conditions (all must match)
        if (clientFilters.AND) {
          where.$and = clientFilters.AND.map(filter => {
            return this.buildFilterCondition(filter);
          });
        }
        
        // Handle OR conditions (any can match)
        if (clientFilters.OR) {
          where.$or = clientFilters.OR.map(filter => {
            return this.buildFilterCondition(filter);
          });
        }
        
        // Handle simple key-value filters
        Object.keys(clientFilters).forEach(key => {
          if (key !== 'AND' && key !== 'OR') {
            where[key] = this.buildFilterCondition(clientFilters[key]);
          }
        });
        
      } catch (e) {
        console.error('Error parsing filters:', e);
      }
    }
  
    // Add text search if exists
    if (_q) {
      where.$or = [
        { username: { $containsi: _q } },
        { email: { $containsi: _q } },
        { FirstName: { $containsi: _q } },
        { LastName: { $containsi: _q } }
      ];
    }
  
    // Get users with pagination
    const users = await strapi.db.query('plugin::users-permissions.user').findMany({
      where,
      orderBy: getOrderBy(_sort),
      //orderBy: _sort === 'age:ASC' ? { DOB: 'desc' } : { id: 'asc' }, // Handle age sorting
      offset: start,
      limit: limit,
      populate: ['role', 'photos', 'profilePicture',  'Height']
    });
    const requests = await strapi.db.query('api::connectionrequest.connectionrequest').findMany({
      where: {
        sender: userId,
      },
      populate: ['receiver'],
    });
    const requestMap = {};

    requests.forEach(req => {
      requestMap[req.receiver] = req.status;
    });
    // Get total count
    const total = await strapi.db.query('plugin::users-permissions.user').count({ where });
  
    // Sanitize and format response
    const sanitizedUsers = users.map(user => ({
      id: user.id,
      FirstName: user.FirstName,
      LastName: user.LastName === user.FirstName ? '' : user.LastName,
      DOB: user.DOB,
      age: calculateAge(user?.DOB),
      FatherName: user.FatherName,
      Pictures: user.Pictures,
      marital: user.marital,
      Gotra: user.Gotra,
      Profession: user.Profession,
      Sex: user.Sex,
      City:user.City,
      Income: user.Income,
      userstatus:user.userstatus,
      postalcode: user.postalcode,
      CreatedFor: user.CreatedFor,
      manglik: user.manglik,
      FamilyType: user.FamilyType,
      accepted: user.accepted,
      rejected: user.rejected,
      acceptedbyme: user.acceptedbyme,
      rejectedbyme: user.rejectedbyme,
      settingjson: user.settingjson,
      professionjson: user.professionjson,
      isdivyang:user.isdivyang,
      Height:user.Height,
      manglik:user.manglik,
      Address: user.Address,
      State: user.State,
      Country: user.Country,
      HighestDegree: user.HighestDegree,
      username: user.username,
      email: user.email,
      confirmed: user.confirmed,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // ... (keep all other fields)
      images: {
        photos: user.photos || [],
        profilePicture: user.profilePicture || null,
        pictures: typeof user.Pictures === 'string' 
          ? JSON.parse(user.Pictures.replace(/'/g, '"')) 
          : user.Pictures || []
      }
    }));
  
    return {
      data: sanitizedUsers,
      pagination: {
        start,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
        page: Math.floor(start / limit) + 1
      }
    };
  },
  
  // Helper method to build filter conditions
  buildFilterCondition(filter) {
    if (typeof filter === 'object') {
      // Handle range filters (e.g., age)
      if (filter.$gte !== undefined || filter.$lte !== undefined) {
        const condition = {};
        if (filter.$gte !== undefined) condition.$gte = filter.$gte;
        if (filter.$lte !== undefined) condition.$lte = filter.$lte;
        return condition;
      }
      // Handle exact match
      return filter;
    }
    // Handle simple equality
    return { $eq: filter };
  },
  
  async resetPassword(ctx) {
    try {
      const { userId, newPassword } = ctx.request.body;

      const user = await strapi.query("plugin::users-permissions.user").findOne({
        where: { id: userId },
      });

      if (!user) {
        return ctx.notFound("User not found");
      }

      // Use Strapi's built-in password hashing
      await strapi.plugin("users-permissions").service("user").edit(userId, {
        password: newPassword,
      });

      return ctx.send({ message: "Password updated successfully" });
    } catch (error) {
      return ctx.badRequest("An error occurred", { error });
    }
  },
  async customme(ctx) {
    try {
        const jwt = require('jsonwebtoken');

        // ✅ Check if authorization header is present
        const authHeader = ctx.request.header.authorization;
        if (!authHeader) {
            return ctx.throw(401, "Authorization header missing");
        }

        // ✅ Extract and decode the JWT token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return ctx.throw(401, "Token not provided");
        }

        const decoded = jwt.decode(token);
        if (!decoded || !decoded.id) {
            return ctx.throw(401, "Invalid token");
        }

        const userId = parseInt(decoded.id, 10); // ✅ Ensure userId is an integer

        // ✅ Validate userId before querying the database
        if (isNaN(userId)) {
            return ctx.throw(400, "Invalid user ID");
        }

        // ✅ Fetch user with selected fields
        const user = await strapi.entityService.findOne(
            "plugin::users-permissions.user",
            userId,
            {
                populate: ["role", "photos", "profilePicture"], // ✅ Populate necessary fields
            }
        );

        if (!user) {
            return ctx.throw(404, "User not found");
        }

        
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
        // ✅ Convert Pictures field safely
       

        // ✅ Return only the selected fields
        return ctx.send({
            id: user.id,
            FirstName: user.FirstName,
            DOB: user.DOB,
            age: calculateAge(user.DOB),
            FatherName: user.FatherName,
            LastName: user.LastName,
            Pictures: images,
            marital: user.marital,
            Gotra: user.Gotra,
            Profession: user.Profession,
            Sex: user.Sex,
            Income: user.Income,
            userstatus:user.userstatus,
            postalcode: user.postalcode,
            CreatedFor: user.CreatedFor,
            manglik: user.manglik,
            FamilyType: user.FamilyType,
            accepted: user.accepted,
            rejected: user.rejected,
            acceptedbyme: user.acceptedbyme,
            rejectedbyme: user.rejectedbyme,
            settingjson: user.settingjson,
            professionjson: user.professionjson,
            emeelanrole:user.emeelanrole,
            Address: user.Address,
            State: user.State,
            Country: user.Country,
            HighestDegree: user.HighestDegree,
            username: user.username,
            email: user.email,
            confirmed: user.confirmed,
            blocked: user.blocked,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            orgsku: user.orgsku,
            role: user.role,
        });
    } catch (error) {
        console.error("Error in customMe:", error);
        return ctx.throw(500, "Internal Server Error");
    }
},
async customsingleuser(ctx) {
  try {
      const jwt = require('jsonwebtoken');
      const authHeader = ctx.request.header.authorization;
      if (!authHeader) {
          return ctx.throw(401, "Authorization header missing");
      }

      // ✅ Extract and decode the JWT token
      const token = authHeader.split(' ')[1];
      if (!token) {
          return ctx.throw(401, "Token not provided");
      }

      const decoded = jwt.decode(token);
      if (!decoded || !decoded.id) {
          return ctx.throw(401, "Invalid token");
      }

      const selfUserId = parseInt(decoded.id, 10); // ✅ Ensure userId is an integer

      const { id } = ctx.params;
      const userId = parseInt(id, 10); // ✅ Ensure userId is an integer
      // ✅ Validate userId before querying the database
      if (isNaN(userId)) {
          return ctx.throw(400, "Invalid user ID");
      }

      const whereCondition = {
        $or: [
          { sender: userId, receiver: selfUserId },
          { sender: selfUserId, receiver: userId },
        ],
      };
      // ✅ Validate userId before querying the database
      if (isNaN(userId)) {
          return ctx.throw(400, "Invalid user ID");
      }

      const connectionRequests = await strapi.db
        .query("api::connectionrequest.connectionrequest")
        .findMany({
          where: whereCondition,
          populate: {
            sender: {
              populate: ['photos', 'profilePicture'],
            },
            receiver: {
              populate: ['photos', 'profilePicture'],
            },
          },
        });
      
      // ✅ Fetch user with selected fields
      const user = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          userId,
          {
              populate: ["role", "Pictures","photos", "profilePicture"], // ✅ Populate necessary fields
          }
      );
      if (!user) {
          return ctx.throw(404, "User not found");
      }
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
      // ✅ Convert Pictures field safely

      // ✅ Return only the selected fields
      return ctx.send({
          id: user.id,
          FirstName: user.FirstName,
          DOB: user.DOB,
          age: calculateAge(user.DOB),
          FatherName: user.FatherName,
          LastName: user.LastName,
          Pictures: images,
          marital: user.marital,
          Gotra: user.Gotra,
          userstatus:user.userstatus,
          Profession: user.Profession,
          Sex: user.Sex,
          Income: user.Income,
          postalcode: user.postalcode,
          CreatedFor: user.CreatedFor,
          manglik: user.manglik,
          FamilyType: user.FamilyType,
          accepted: user.accepted,
          rejected: user.rejected,
          acceptedbyme: user.acceptedbyme,
          rejectedbyme: user.rejectedbyme,
          settingjson: user.settingjson,
          professionjson: user.professionjson,
          emeelanrole:user.emeelanrole,
          connectionRequests:connectionRequests,
          Address: user.Address,
          State: user.State,
          Country: user.Country,
          City:user.City,
          HighestDegree: user.HighestDegree,
          username: user.username,
          email: user.email,
          confirmed: user.confirmed,
          blocked: user.blocked,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
          isdivyang:user.isdivyang,
          Height:user.Height,
          manglik:user.manglik,
          mybasicdata:user.mybasicdata,
          orgsku: user.orgsku,
      });
  } catch (error) {
      console.error("Error in Custom Single User:", error);
      return ctx.throw(500, "Internal Server Error");
  }
},
async getAdminUsers(ctx) {
  const jwt = require('jsonwebtoken');
    const token = ctx.request.header.authorization?.split(' ')[1];
    if (!token) return ctx.unauthorized('No authorization token provided');
    
    const decoded = jwt.decode(token);
    const userId = decoded.id;
    
    // Get current user data
    const userdata = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { id: userId },
      populate: ['photos', 'pictures']
    });
    
    if (!userdata) return ctx.notFound('User not found');
    
    const { 
      _start = 0, 
      _limit = 10, 
      _sort = 'id:DESC', 
      _q,
      filters // New: Client-provided filters
    } = ctx.query;

  
    // Convert to numbers and validate
    const start = Math.max(0, Number(_start));
    const limit = Math.min(50, Math.max(1, Number(_limit)));
    const isAdminOrCenter = userdata.emeelanrole === "ADMIN" || userdata.emeelanrole === "CENTER";
  
    // Base filters
    const where = {
      userstatus: "APPROVED",
      id: { $ne: userId },
      FirstName: { $notNull: true },
    };
  
    // Add admin filter if needed
    if (!isAdminOrCenter) {
      where.marital = { $contains: "Admin" };
    }
  
    // Parse client filters if provided
    if (filters) {
      try {
        const clientFilters = filters; // it's already an object
        
        // Handle AND conditions (all must match)
        if (clientFilters.AND) {
          where.$and = clientFilters.AND.map(filter => {
            return this.buildFilterCondition(filter);
          });
        }
        
        // Handle OR conditions (any can match)
        if (clientFilters.OR) {
          where.$or = clientFilters.OR.map(filter => {
            return this.buildFilterCondition(filter);
          });
        }
        
        // Handle simple key-value filters
        Object.keys(clientFilters).forEach(key => {
          if (key !== 'AND' && key !== 'OR') {
            where[key] = this.buildFilterCondition(clientFilters[key]);
          }
        });
        
      } catch (e) {
        console.error('Error parsing filters:', e);
      }
    }
  
    // Add text search if exists
    if (_q) {
      where.$or = [
        { username: { $contains: _q } },
        { email: { $contains: _q } },
        { FirstName: { $contains: _q } },
        { LastName: { $contains: _q } }
      ];
    }
  
    // Get users with pagination
    const users = await strapi.db.query('plugin::users-permissions.user').findMany({
      where,
      orderBy: getOrderBy(_sort),
      //orderBy: _sort === 'age:ASC' ? { DOB: 'desc' } : { id: 'asc' }, // Handle age sorting
      offset: start,
      limit: limit,
      populate: ['role', 'photos', 'profilePicture',  'Height']
    });
    const requests = await strapi.db.query('api::connectionrequest.connectionrequest').findMany({
      where: {
        sender: userId,
      },
      populate: ['receiver'],
    });
    const requestMap = {};

    requests.forEach(req => {
      requestMap[req.receiver] = req.status;
    });
    // Get total count
    const total = await strapi.db.query('plugin::users-permissions.user').count({ where });
  
    // Sanitize and format response
    const sanitizedUsers = users.map(user => ({
      
      id: user.id,
     // connectionStatus: requestMap[user.id] || null, // will be 'PENDING', 'APPROVED', or null

      FirstName: user.FirstName,
      LastName: user.LastName === user.FirstName ? '' : user.LastName,
      DOB: user.DOB,
      age: calculateAge(user?.DOB),
      FatherName: user.FatherName,
      Pictures: user.Pictures,
      marital: user.marital,
      Gotra: user.Gotra,
      Profession: user.Profession,
      Sex: user.Sex,
      userstatus:user.userstatus,
      Income: user.Income,
      postalcode: user.postalcode,
      CreatedFor: user.CreatedFor,
      manglik: user.manglik,
      FamilyType: user.FamilyType,
      MobileNumber: user.MobileNumber,
      accepted: user.accepted,
      rejected: user.rejected,
      acceptedbyme: user.acceptedbyme,
      rejectedbyme: user.rejectedbyme,
      settingjson: user.settingjson,
      professionjson: user.professionjson,
     
      Address: user.Address,
      State: user.State,
      Country: user.Country,
      HighestDegree: user.HighestDegree,
      username: user.username,
      email: user.email,
      confirmed: user.confirmed,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // ... (keep all other fields)
      images: {
        photos: user.photos || [],
        profilePicture: user.profilePicture || null,
        pictures: typeof user.Pictures === 'string' 
          ? JSON.parse(user.Pictures.replace(/'/g, '"')) 
          : user.Pictures || []
      }
    }));
    
    return {
      data: sanitizedUsers,
      pagination: {
        start,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
        page: Math.floor(start / limit) + 1
      }
    };
 
},
async myprofilestatus(ctx) {
  try {

    const { id, status } = ctx.query;
    console.log("myprofilestatus connectionRequests ")
    const userId = parseInt(id, 10);
    const statusFilter = status?.toUpperCase(); // normalize status input
    console.log("statusFilter connectionRequests ",statusFilter)

    if (isNaN(userId)) {
      return ctx.throw(400, "Invalid user ID");
    }

    // Build dynamic where condition
    const whereCondition = {
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
    };

    // Optional status filtering
    if (["PENDING", "APPROVED","ACCEPTED", "REJECTED","BLOCKED","SUSPEND"].includes(statusFilter)) {
      whereCondition.status = statusFilter;
    }

    const connectionRequests = await strapi.db.query("api::connectionrequest.connectionrequest").findMany({
      where: whereCondition,
      populate: {
        sender: {
          populate: ['photos', 'profilePicture'],
        },
        receiver: {
          populate: ['photos', 'profilePicture'],
        },
      },
    });
     connectionRequests.map((request) => {
      if (request.sender) {
        request.sender = getcustomizedObject(request.sender);
      }
      if (request.receiver) {
        request.receiver = getcustomizedObject(request.receiver);
      }
      console.log("request",request)
      })

    return ctx.send({
      data: connectionRequests,
    });
  } catch (error) {
    console.error("Error in myprofilestatus:", error);
    return ctx.throw(500, "Internal Server Error");
  }
},



async customupdateuser(ctx) {
  const { id } = ctx.params;
  let userId =null;
  let result =getUserIdFromCtx(ctx)
  if (typeof result === 'string' || result instanceof Error) {
    return result; // or throw error, or send response
  } else {
     userId = result;
  }

  const { userstatus,emeelanrole } = ctx.request.body.data;
  let data ={}
  let auditlogpayload ={changedby:userId, userid:id}
  let channelName=""
  let message ={}
  if(userstatus){
    auditlogpayload['userstatus']=userstatus
    data['userstatus']=userstatus
    channelName=`userstatus:${id}`
    message={
      message: `Your status changed to ${userstatus}.`,
      userstatus: userstatus
    }
  } else if (emeelanrole){
    auditlogpayload['emeelanrole']=emeelanrole
    data['emeelanrole'] = emeelanrole
     channelName=`userrole:${id}`
     message ={
      message: `Your role changed to ${emeelanrole}.`,
      emeelanrole: emeelanrole
    }
  }
  console.log("Auditlog payload",auditlogpayload)
  const auditlogdata = await createAuditLog(auditlogpayload);
  console.log("Auditlog auditlogdata",auditlogdata)
  console.log("auditLog",auditlogdata)
  const updated = await strapi.entityService.update(
    'plugin::users-permissions.user',
    id,
    {
      data: {
        ...data
      },
    }
  );

  await sendNotification(channelName, 'connection-request', message);
  console.log('Notification sent to:', id);

  ctx.send({
    message: message,
    data: updated,
  });
},

async customRegister(ctx) {
  const { username, email, password, orgid,referralId } = ctx.request.body;
  console.log("referralId",referralId, "OrgID",orgid,)
  // Your registration logic here
  // For example, create a new user:
  try {
    const newUser={orgid,referralId}
    // const newUser = await strapi.plugins['users-permissions'].services.user.add({
    //   username,
    //   email,
    //   password,
    //   confirmed: true,
    // });
    ctx.send({ user: newUser });
  } catch (err) {
    ctx.throw(400, err);
  }
},


};
