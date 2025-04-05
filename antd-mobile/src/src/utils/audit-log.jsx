export const auditLogProvider = {
  get: async (params) => {
    const { resource, meta, action, author, metaData } = params;
  },
  create: async (params) => {
    const { resource, meta, action, author } = params;
    return Promise;
  },
  update: async (params) => {
    const { id, name, ...rest } = params;
    await fetch(`https://example.com/api/audit-logs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(params),
    });

    return { success: true };
  },
};
