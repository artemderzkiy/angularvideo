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
			localStorage.removeItem("loginedSession");
			$state.go('auth');			
		}
		// login flag to check whether user is authed or not
		$scope.loginFlagCh=function() {
			var checkLocal =!!localStorage.getItem("loginedSession")
			if (loginFac.isAuthed() || checkLocal)
			{
				return true
			}
			else 
				return false
		}		
	}
})()