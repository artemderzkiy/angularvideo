(function() {
	'use strict'
	angular
	.module('main')
	.config(uiRouter);
	uiRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
	function uiRouter($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/auth');
		$stateProvider
		.state('auth',{
			url : '/auth',
			templateUrl:'js/auth/auth.html',
			controller : 'authCtrl'

			
		})
		.state('items',{
			url : '/items',
			templateUrl:'js/items/items.html',
			controller : 'itemsCtrl'	
		})
		.state('add',{
			url : '/add',
			templateUrl:'js/add/add.html',
			controller : 'addCtrl'
		})

		.state('edit',{
			url : '/edit/{id}',
			templateUrl:'js/add/add.html',
			controller : 'addCtrl'
		})
	}
})()