(function() {
	'use strict';
	angular
	.module('app')
	.controller('itemsCtrl', itemsCtrl)
	itemsCtrl.$inject=['$rootScope','$scope', 'VideoFac','editService', '$http','$state'];
	function itemsCtrl($rootScope,$scope,VideoFac,editService,$http,$state) {	

		$scope.filteredVideos = [];
		$scope.currentPage = 1;
		$scope.numPerPage = 3;
		$scope.maxSize = 5;
		//$scope.totalItems=10

		$scope.model = {			
			selected: {},
			currentItem: undefined,
			name : ""
		};		
		$scope.checked = false;
		$scope.mayArchive = false;

		//videoHttp();

		function videoHttp() {
			VideoFac.getDataByUrl('videos')
			.then(function(response) {	
				// debugger;
				$scope.model.videos=response;	
				//var len=parseInt($scope.model.videos.length	, 10) 		
				$scope.totalItems=$scope.model.videos.length;
				console.log($scope.totalItems);
				var begin = (($scope.currentPage - 1) * $scope.numPerPage)
				var end = begin + $scope.numPerPage;				
				$scope.filteredVideos = $scope.model.videos.slice(begin, end);
				console.log($scope.filteredVideos)								
			})
			.catch(function(e) {
				console.log(e);
			})	
			return $scope.model.videos
		}

		$scope.$watch('currentPage + numPerPage', function() {			
			videoHttp();
		});
		
		$scope.setItemsPerPage = function(num) {
			$scope.itemsPerPage = num;
  $scope.currentPage = 1; //reset to first paghe
}

//   $scope.makeTodos = function() {
//     $scope.todos = [];
//     for (var i=1;i<=100;i++) {
//       $scope.todos.push({ text:'todo '+i, done:false});
//     }
//   };
//   $scope.makeTodos(); 

// $scope.$watch('currentPage + numPerPage', function() {
//     var begin = (($scope.currentPage - 1) * $scope.numPerPage)
//     , end = begin + $scope.numPerPage;

//     $scope.filteredVideos = $scope.todos.slice(begin, end);
//   });


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
		$state.go('items');
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


	console.log($scope.filteredVideos)

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

$scope.edit = function (video) {	   
	$scope.model.selected = angular.copy(video);
	$scope.model.currentItem = video;
	editService.add($scope.model.currentItem)
};

}
})()