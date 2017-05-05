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

		return {

			getSession: function () {
				// Session.get({ id: 0 }, function (session) {
				// 	console.log(session);
				// });
			},

			clearSession: function () {
				_d.UserID = null;
				_d.SessionKey = null;
			},

			useSession: function (uid, key) {
				_d.UserID = uid;
				_d.SessionKey = key;
			},

			// Login
			login: rest(POST, '/login'), // backendService.login(attrs)
			logout: rest(POST, '/logout'),

			// Sessions
			getSessionById: rest(GET, '/sessions/:ID'),

			// ListItem
			getListItemById: [GET, '/listitems/:ID'],
			deleteListItemById: [DELETE, '/listitems/:ID'],
			getDetailsByListItemId: [GET, '/listitems/:ID/details'],
			postListItem: [POST, '/listitems'],

			// List
			getRootLists: rest(GET, '/lists'),
			getListById: [GET, '/lists/:ID'],
			deleteListById: [DELETE, '/lists/:ID'],
			getListItemsByListId: function (attrs) { return rest(GET, '/lists/:ID/items')(attrs); },
			getListsByParentId: function (attrs) { return rest(GET, '/lists/:ID/lists')(attrs); },
			postList: [POST, '/lists'],

			// Users
			getUserById: [GET, '/users/:ID'],
	    updateUserById: [PATCH, '/users/:ID'],
	    changeUserPasswordById: [POST, '/users/:ID/change-password'],
	    changeUserEmailById: [POST, '/users/:ID/change-email'],
			verifyUserById: [POST, '/users/:ID/verify-email'],

			// Check-in
			postCheckIn: [POST, '/check-in'],

			// Email
			postFeedback: [POST, '/email'],

			// Register
			postRegistration: [POST, '/register'],

			// Timezones
			getTimezones: [GET, '/timezones'],

		};

		function rest (method, uri) {
			return function (attrs) {
				return new Promise((resolve, reject) => {
console.log(uri);
					if (uri.match(/\:ID/)) {
						uri = uri.replace(/\:ID/, attrs.ID);
					}
					console.log(uri);

					let d = attrs && JSON.stringify(attrs) || undefined;
					let opts = {
						method: method,
						url: 'http://localhost:8888' + uri,
						headers: {
							'Content-Type': 'application/json',
						},
					};

					setSessionIdHeaders(opts);

					attrs = attrs || {};

					if (undefined !== d) {
						opts.data = d;
					}

					$http(opts).then(function (res) {
						resolve(res);
						console.log(res);
					}, function (err) {
						reject(err);
						console.log(err);
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
