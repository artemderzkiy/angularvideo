(function() {
	'use strict'
	angular
	.module('app')
	.controller('authCtrl', authCtrl)
	authCtrl.$inject=['$scope','$state']
	function authCtrl($scope,$state) {
		var login='hello';
		var password='world';

		$scope.authcheck=function() {


			if (login==$scope.login && password==$scope.password)
			{
				$state.go('items');
				$scope.login='';
				$scope.password='';

			}
			else {
				$scope.login='';
				$scope.password='';
			}
		}
	}
})()