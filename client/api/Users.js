import { buildRequest } from './ApiBuilder'

module.exports = {
  getList: function(params) {
    return buildRequest('post', '/api/v1/users/list', params);
  },

  getUser: function(prmUserId) {
    return buildRequest('get', `/api/v1/users/${prmUserId}`, {});
  },

  updateUser: function(params) {
    return buildRequest('put', `/api/v1/users/${params.user.id}`, params);
  },

  createUser: function(params) {
    return buildRequest('post', '/api/v1/users', params);
  },

  deleteUser: function(prmUserId) {
    return buildRequest('del', `/api/v1/users/${prmUserId}`, {});
  },
  deleteUserList: function(params) {
    return buildRequest('post', '/api/v1/users/bulk-delete', params);
  },
  getUserSessionList: function(params) {
    return buildRequest('post', '/api/v1/users-sessions/list', params);
  },
  deleteUserSessionSingle: function(prmUserSessionId) {
    return buildRequest('put', `/api/v1/users-sessions/${prmUserSessionId}`, {});
  },
  resetUserAvatar: function(params) {
    return buildRequest('put', `/api/v1/users/${params.user_id}/avatar/reset`, {});
  },
  uploadAndChangeAvatar: function(params) {
    return buildRequest('put', `/api/v1/users/${params.user_id}/avatar`, params);
  },


  getUserRoleList: function(params) {
    return buildRequest('post', '/api/v1/users-roles/list', params);
  },

  getUserStatusList: function(params) {
    return buildRequest('post', '/api/v1/users-status/list', params);
  },
}
