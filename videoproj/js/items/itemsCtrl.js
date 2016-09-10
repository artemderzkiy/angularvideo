(function() {
	'use strict';
	angular
	.module('app')
	.controller('itemsCtrl', itemsCtrl)
	itemsCtrl.$inject=['$rootScope','$scope', 'VideoFac', '$http'];
	function itemsCtrl($rootScope,$scope,VideoFac,$http) {
	
		$scope.model = {		
			selected: {},
			currentItem: undefined,
			name : ""
		},
		$scope.checked = false;
		$scope.mayArchive = false;

		todoHttp();

		function todoHttp() {

			VideoFac.getDataByUrl('videos')
			.then(function(response) {		
				$scope.model.videos=response;
				console.log(response)
			})
			.catch(function(e) {
				console.log(e);
			})	
		}



		$scope.remove = function (video) {
			var ans = confirm("Are you sure?");
			if (ans==true) {
				var comArr = $scope.model.videos;
				for (var i = 0; i < comArr.length; i++) {
					if (comArr[i] === video) {
						var index = i;
						break;
					}
				}   
				$scope.model.videos.splice(index, 1);

				$http.put("https://epamvideo-17622.firebaseio.com/videos.json",  $scope.model.videos );
    //.then(function(response) {
     // response.data=  $scope.model.todos;
        //console.log(response.data)
//});

//$scope.reset()
}    
};	
$scope.checkChecked = function() {
	$scope.mayArchive = $scope.model.videos.some(function(video) {
		return video.checked && !video.archived;
	});
}

$scope.switchAll= function() {

	if (!$scope.checked) {		
		$scope.model.videos.forEach(function(video) {
			video.checked = true;
		});
		$scope.checked = true;
		$scope.mayArchive=true;		
	} else {
		$scope.model.videos.forEach(function(video) {
			video.checked = false;
		});
		$scope.checked = false;
		$scope.mayArchive=false;

	}

	
};
$scope.archive = function() {
	
	$scope.model.videos.forEach(function(video) {
		if (video.checked)
			video.archived = true;
		video.checked=false;
		$http.put("https://epamvideo-17622.firebaseio.com/videos.json",  $scope.model.videos );
	});
	$scope.mayArchive = false;

}	

$scope.unarchive = function(video) {		
	var comArr = $scope.model.videos;
	for (var i = 0; i < comArr.length; i++) {
		if (comArr[i] === video) {
			var index = i;
			break;
		}
	}   
	$scope.model.videos[index].archived=false;
	$scope.model.videos[index].checked=false;
	$http.put("https://epamvideo-17622.firebaseio.com/videos.json",  $scope.model.videos );

}	

$rootScope.edit = function (video) {	   
	$scope.model.selected = angular.copy(video);
	$scope.model.currentItem = video;
	console.log("suka");
	console.log($scope.model.currentItem );
};

}
})()