(function() {
	'use strict';
	angular
	.module('main')
	.factory('loginFac', loginFac)
	function loginFac() {
		var vm ={
			login:'hello',
			password:'world',
			authed : false
		}	
		vm.methods ={
			logIn :logIn,
			logOut : logOut,
			isAuthed : isAuthed
		}
		function logIn(login,password) {
			if (login==vm.login && password==vm.password)
			{
				vm.authed=true;
			}
			else 
			{
				alert("login=hello password=world")
				vm.authed=false;
			}
		}		
		function logOut() {
			vm.authed=false;			
		}

		function isAuthed() {
			return vm.authed;
		}
		return vm.methods;
	}
})()