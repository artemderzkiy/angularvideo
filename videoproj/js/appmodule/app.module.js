
(function() {
	'use strict'	
	angular
	.module('app',['main','ui.mask','ui.bootstrap'])
	.run(LoginCheck)
	LoginCheck.$inject=['$rootScope','$state','loginFac']
	function LoginCheck($rootScope,$state,loginFac) {
		//if it needs user to auth to get to page and he is not authed redirects to auth
		$rootScope.$on('$stateChangeStart', goToLogin);
		function goToLogin (event,ToState,toParams,fromState) {	
			var goToLoginFlag=ToState.needAuth && !loginFac.isAuthed();			
			if (goToLoginFlag)
			{				
				$state.go('auth');
				event.preventDefault();
			}
		} 
	}
})();