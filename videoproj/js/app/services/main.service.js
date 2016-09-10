(function() {
	'use strict';

	angular
	.module('main')
	.service('FirebaseReq', FirebaseReq);
	FirebaseReq.$inject = ['$http'];
	function FirebaseReq($http) {

		this.getData=getData;

		function getData(url) {
			return $http.get(url)
			.then(function resolve(response) {
				
				return response.data
			})
			.catch(function reject(error) {
				console.log(error);
			})
		}
	}
})()