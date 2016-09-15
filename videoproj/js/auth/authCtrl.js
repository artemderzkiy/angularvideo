(function() {
	'use strict'
	angular
	.module('app')
	.controller('authCtrl', authCtrl)
	authCtrl.$inject=['$scope','$state','loginFac']
	function authCtrl($scope,$state,loginFac) {		
		$scope.logInCtrl = function() {
			var login = $scope.loginInp;
			var password = $scope.passwordInp;			
			loginFac.logIn(login,password);
			$scope.loginInp='';
			$scope.passwordInp='';
			var checkLocal =!!localStorage.getItem("loginedSession") ;

			
			if (loginFac.isAuthed() || checkLocal)
			{
				$scope.$emit('login');
				$state.go('items');
			}
		}
	}
})()


angular.fromJson(localStorage.getItem("loginedSession"));