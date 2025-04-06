import http from '../utils/http';
import { buildPopulateQuery, parseSortParam } from '../utils/helpers';

// Default population fields for user queries
const defaultPopulate = ['photos', 'profilePicture', 'Height', 'likesto', 'role'];

/**
 * User Service - Handles all user-related API calls
 */
export const userService = {
    /**
     * Get the authenticated user's profile with all relations
     */
    getMe: () => http.get('/users/me', {
        params: { populate: buildPopulateQuery(defaultPopulate) }
    }),

    /**
     * Get custom formatted user profile
     */
    getCustomMe: () => http.get('/customme'),

    /**
     * Get paginated list of users
     * @param {Object} params - Pagination and filtering params
     * @param {number} params._start - Start index (default: 0)
     * @param {number} params._limit - Number of items per page (default: 10)
     * @param {string} params._sort - Sort field and direction (format: "field:asc|desc")
     */
    getPaginatedUsers: ({
        _start = 0,
        _limit = 10,
        _sort = 'id:asc',
        ...params
    } = {}) => http.get('/users', {
        params: {
            _start,
            _limit,
            ...parseSortParam(_sort),
            ...buildPopulateQuery(defaultPopulate),
            ...params
        }
    }),

    /**
     * Search users with text query
     * @param {string} query - Search term
     * @param {Object} params - Additional params
     */
    searchUsers: (query, params = {}) => http.get('/users', {
        params: {
            _q: query,
            _sort: 'username:asc',
            ...buildPopulateQuery(defaultPopulate),
            ...params
        }
    }),

    /**
     * Get users with advanced filters
     * @param {Object} filters - Filter conditions
     * @param {Object} params - Pagination/sorting params
     */
    getFilteredUsers: (filters = {}, params = {}) => http.get('/users', {
        params: {
            filters: JSON.stringify(filters),
            ...buildPopulateQuery(defaultPopulate),
            ...params
        }
    }),

    /**
     * Get user by ID
     * @param {number|string} userId 
     * @param {string[]} extraPopulate - Additional relations to populate
     */
    getUserById: (userId, extraPopulate = []) => http.get(`/users/${userId}`, {
        params: {
            populate: buildPopulateQuery([...defaultPopulate, ...extraPopulate])
        }
    }),

    /**
     * Update user profile
     * @param {number|string} userId 
     * @param {Object} data - Updated user data
     */
    updateUser: (userId, data) => http.put(`/users/${userId}`, data),

    /**
     * Get users by IDs
     * @param {Array<number|string>} userIds 
     * @param {Object} params - Additional params
     */
    getUsersByIds: (userIds, params = {}) => http.get('/users', {
        params: {
            'filters[id][$in]': userIds,
            ...buildPopulateQuery(defaultPopulate),
            ...params
        }
    }),

    /**
     * Get users count with optional filters
     * @param {Object} filters - Filter conditions
     */
    getUsersCount: (filters = {}) => http.get('/users/count', {
        params: { filters: JSON.stringify(filters) }
    }),



    connectionRequest: (data) => {
        return http.post('/connectionrequests', {
          data: { ...data }
        })
        .then(response => {
          // Successful response handling
          return {
            success: true,
            data: response.data,
            status: response.status
          };
        })
        .catch(error => {
          // Error handling
          return {
            success: false,
            error: error.response?.data || error.message,
            status: error.response?.status
          };
        });
      }

};
// export type UserService = typeof userService;