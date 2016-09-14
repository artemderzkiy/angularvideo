(function() {
	'use strict';
	angular
	.module('main')
	.factory('VideoFac',VideoFac)
	VideoFac.$inject=['$q','FirebaseReq','VIDEOURL','USERURL'];
	function VideoFac($q,FirebaseReq,VIDEOURL,USERURL) {
		var vm ={};
		vm.propers ={
			videos : {},
			users : {}
		};
		vm.methods ={
			getDataByUrl: getDataByUrl
		};
		function getDataByUrl(name) {
			var url='';
			switch(name) {
				case 'videos' :
				url=VIDEOURL;
				break;
				case 'users' : 
				url=USERURL;
				break;
				default : 
				var deferred = $q.defer();
				deferred.reject('you gave me bad url =(((');
				return
				deferred.promise;
			}
			return FirebaseReq.getData(url)
			.then(function(response) {
				switch(name){
					case 'videos' :
					vm.propers.videos=response;					
					break;
					case 'users' :
					vm.propers.users=response;					
					break;
				}
				return response;
			})
			.catch(function(e) {
				console.log(e);
			})
		}
		return vm.methods
	}
})();