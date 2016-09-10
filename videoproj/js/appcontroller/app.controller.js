(function() {
	'use strict'
	angular
	.module('app')
	.controller('videoCtrl', videoCtrl ) ;
	videoCtrl.$inject = ['$scope','$state', 'loginFac']
	function videoCtrl($scope,$state, loginFac) {
		console.log('im in main controller')
		

		

		$scope.logOutCtrl = function() {
			console.log("gde logout??")
			loginFac.logOut();
			$state.go('auth');
			console.log("OPPA TUTOCHKI VON S SAITIKA ")
		}

		$scope.loginFlagCh=function() {
			if (loginFac.isAuthed())
			{
				return true
			}
else 
	return false
		} 

		
	}
})()