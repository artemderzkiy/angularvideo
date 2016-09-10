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
			console.log(login);
			console.log(password);
			$scope.loginInp='';
			$scope.passwordInp='';
			if (loginFac.isAuthed())
			{
				$scope.$emit('login');
				$state.go('items');
			}
		}

	}
})()