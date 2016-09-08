(function() {
	'use strict'
	angular
	.module('app')
	.controller('videoCtrl', videoCtrl ) ;
	videoCtrl.$inject = ['$http','$scope', 'VideoFac']
	function videoCtrl($http, $scope, VideoFac) {
		$scope.model = {};
		todoHttp();
		function todoHttp() {

			VideoFac.getDataByUrl('videos')
			.then(function(response) {		
				$scope.model.videos=response;
				console.log(response)
			})
			.catch(function(e) {
				console.log(e);
			})	
		}
	}
})()