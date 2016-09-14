(function() {
	'use strict'
	angular
	.module('app')
	.controller('videoCtrl', videoCtrl ) ;
	videoCtrl.$inject = ['$scope','$state', 'loginFac']
	function videoCtrl($scope,$state, loginFac) {
		//method to logout and send user to auth
		$scope.logOutCtrl = function() {
			loginFac.logOut();
			$state.go('auth');			
		}
		// login flag to check whether user is authed or not
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