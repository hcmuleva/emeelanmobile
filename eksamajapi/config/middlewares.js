module.exports = ({ env }) => [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'yourBucketName.s3.yourRegion.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'yourBucketName.s3.yourRegion.amazonaws.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      origin: '*',
      headers: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    },
  },
  'strapi::logger',
  {
    name: 'strapi::query',
    config: {
      // Add pagination configuration
      pagination: {
        withCount: true, // Include total count in response
        defaultLimit: 10, // Default page size
        maxLimit: 100, // Maximum items per page
      },
    },
  },
  'strapi::body',
    'strapi::favicon',
  'strapi::public',
];