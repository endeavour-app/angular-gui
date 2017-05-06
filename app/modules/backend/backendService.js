(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:homeService
   * @description
   * # homeService
   * Service of the app
   */

  angular.module('backend')
    .factory('backendService', backendService);

  backendService.$inject = ['$http', '$resource'];

  function backendService ($http, $resource) {

    // const Session = $resource('/sessions/:sessionId', { sessionId: '@id' });
    // const SingleList = $resource('/lists/:listId', { listId: '@id' });
    // const ListItem = $resource('/listitems/:listitemId', { listitemId: '@id' });
    // const ListItemDetails = $resource('/listitems/:listitemId/details', { listitemId: '@id' });

    const GET = 'GET';
    const PUT = 'PUT';
    const POST = 'POST';
    const PATCH = 'PATCH';
    const DELETE = 'DELETE';

    var _d = {
      UserID: null,
      SessionKey: null,
    };

    class BackendService {

      constructor () {

      }

      isSessionSet () {
        return hasSessionData();
      }

      getSession () {
        // Session.get({ id: 0 }, function (session) {
        //   console.log(session);
        // });
      }

      /**
       * backendService.clearSession()
       *
       * Clears the session UserID and SessionKey; Effectively forgets the
       * current session.
       */
      clearSession () {
        _d.UserID = null;
        _d.SessionKey = null;
      }

      /**
       * backendService.useSession(UserID, SessionKey)
       *
       * Sets the session UserID and SessionKey
       *
       * @param {String|Number} UserID The Session owner's User ID
       * @param {String} SessionKey The Session Key
       */
      useSession (UserID, SessionKey) {
        _d.UserID = UserID;
        _d.SessionKey = SessionKey;
      }

      /**
       * backendService.login(attrs)
       *
       * Attempt to authenticate via backend using credentials provided in
       * `attrs` argument.
       *
       * ```javascript
       * # Example login
       * let credentials = {
       *   EmailAddress: 'tester@localhost',
       *   Password: 'mypassword1'
       * };
       *
       * backendService
       *   .login(credentials)
       *   .then(function (res) => {
       *     let session = res.data;
       *   })
       *   .catch(function (err) => {
       *
       *   });
       * ```
       *
       * @param {Object} attrs Authentication credentials
       * @return {Promise}
       */
      login (attrs) {
        return new Promise((resolve, reject) => {
          rest(POST, '/login')(attrs)
            .then((res) => {
              this.useSession(res.data.UserID, res.data.Key);
              resolve(res);
            })
            .catch(reject);
        });
      }

      logout (attrs) {
        return rest(POST, '/logout')(attrs);
      }

      /**
       * backendService.getSessionById(id)
       *
       */
      getSessionById (attrs) {
        return rest(GET, '/sessions/:ID')(attrs);
      }

      /**
       * backendService.getListItemById(id)
       *
       * Fetch a single ListItem identified by the ID property in `attrs`, from
       * the backend.
       *
       * ```javascript
       * # Example
       * backendService
       *   .getListItemById({ ID: 137 })
       *   .then(function (res) => {
       *     let listItem = res.data;
       *   })
       *   .catch(function (err) => {
       *
       *   });
       * ```
       *
       * @param {*} id The ID of the ListItem to fetch
       * @return {Promise}
       */
      getListItemById (id) {
        return rest(GET, '/listitems/:ID')({ ID: id });
      }

      deleteListItemById (attrs) {
        return rest(DELETE, '/listitems/:ID')(attrs);
      }

      getDetailsByListItemId (attrs) {
        return rest(GET, '/listitems/:ID/details')(attrs);
      }

      postListItem (attrs) {
        return rest(POST, '/listitems')(attrs);
      }

      getRootLists (attrs) {
        return rest(GET, '/lists')(attrs);
      }

      getListById (attrs) {
        return rest(GET, '/lists/:ID')(attrs);
      }

      deleteListById (attrs) {
        return rest(DELETE, '/lists/:ID')(attrs);
      }

      getListItemsByListId (attrs) {
        return rest(GET, '/lists/:ID/items')(attrs);
      }

      getListsByParentId (attrs) {
        return rest(GET, '/lists/:ID/lists')(attrs);
      }

      postList (attrs) {
        return rest(POST, '/lists')(attrs);
      }

      // Users
      getUserById (attrs) {
        return rest(GET, '/users/:ID')(attrs);
      }

      updateUserById (attrs) {
        return rest(PATCH, '/users/:ID')(attrs);
      }

      changeUserPasswordById (attrs) {
        return rest(POST, '/users/:ID/change-password')(attrs);
      }

      changeUserEmailById (attrs) {
        return rest(POST, '/users/:ID/change-email')(attrs);
      }

      verifyUserById (attrs) {
        return rest(POST, '/users/:ID/verify-email')(attrs);
      }

      // Check-in
      postCheckIn (attrs) {
        return rest(POST, '/check-in')(attrs);
      }

      // Email
      postFeedback (attrs) {
        return rest(POST, '/email')(attrs);
      }

      // Register
      postRegistration (attrs) {
        return rest(POST, '/register')(attrs);
      }

      // Timezones
      getTimezones (attrs) {
        return rest(GET, '/timezones')(attrs);
      }
    }

    return new BackendService();

    function rest (method, uri) {
      return function (attrs) {
        return new Promise((resolve, reject) => {

          if (uri.match(/\:ID/)) {
            uri = uri.replace(/\:ID/, attrs.ID);
          }

          let d = attrs && JSON.stringify(attrs) || undefined;
          let opts = {
            method: method,
            url: 'http://localhost:8888' + uri,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          };

          setSessionIdHeaders(opts);

          attrs = attrs || {};

          if (undefined !== d) {
            opts.data = d;
          }

          $http(opts).then(function (res) {
            resolve(res);
          }, function (err) {
            reject(err);
          });

        });
      };
    }

    function hasSessionData () {

      if (null === _d.UserID) {
        return false;
      }

      if (null === _d.SessionKey) {
        return false;
      }

      return true;

    }

    function setSessionIdHeaders (opts) {

      if (!hasSessionData()) {
        return;
      }

      opts.headers['Endeavour-Auth-User-ID'] = _d.UserID;
      opts.headers['Endeavour-Session-Key'] = _d.SessionKey;

    }

  }

})();
