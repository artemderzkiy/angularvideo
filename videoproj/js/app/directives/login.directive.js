(function() {
	'use strict';
	angular
	.module('app')
	.directive("loginDir",loginDir)

	function loginDir() {
		return {
			
			restrict: "E",	
			
			templateUrl: 'js/app/directives/login.template.html'
			
		}
	}
})();