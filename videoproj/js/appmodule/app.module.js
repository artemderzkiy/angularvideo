
(function() {
	'use strict'
	
	angular
	.module('app',['main','ui.mask'])
	.run(LoginCheck)
	LoginCheck.$inject=['$rootScope','$state','loginFac']
	

	function LoginCheck($rootScope,$state,loginFac) {
		$rootScope.$on('$stateChangeStart', goToLogin);

		function goToLogin (event,ToState,toParams,fromState) {			
			//console.log(ToState.needAuth);
			//console.log(!loginFac.isAuthed);
			var goToLoginFlag=ToState.needAuth && !loginFac.isAuthed();
			
			if (goToLoginFlag)
			{				
				$state.go('auth');
				event.preventDefault();
			}

		} 

	}
})();