
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
			var checkLocal =!!localStorage.getItem("loginedSession") ;
			console.log(checkLocal)
			var goToLoginFlag=ToState.needAuth && !loginFac.isAuthed() && !checkLocal; //!localStorage.getItem("loginedSession") ;			
			if (goToLoginFlag)
			{				
				$state.go('auth');
				event.preventDefault();
			}
		} 
	}
})();