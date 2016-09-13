(function() {
	'use strict';
	angular
	.module('app')
	.controller('itemsCtrl', itemsCtrl)
	itemsCtrl.$inject=['$rootScope','$scope', 'VideoFac','editService', '$http'];
	function itemsCtrl($rootScope,$scope,VideoFac,editService,$http) {	

		$scope.filteredTodos = [],
		$scope.currentPage = 1,
		$scope.numPerPage = 2,
		$scope.maxSize = 5,
		$scope.totalItems = 0;

		$scope.model = {			
			selected: {},
			currentItem: undefined,
			name : ""
		};		
		$scope.checked = false;
		$scope.mayArchive = false;

		videoHttp();

		function videoHttp() {
			VideoFac.getDataByUrl('videos')
			.then(function(response) {	
				$scope.model.videos=response;	
				$scope.totalItems=response.length;								
			})
			.catch(function(e) {
				console.log(e);
			})	
			return $scope.model.videos
		}

		$scope.$watch('currentPage + numPerPage', function() {			
			var begin = (($scope.currentPage - 1) * $scope.numPerPage)
			var end = begin + $scope.numPerPage;
			setTimeout(function() {
     $scope.filteredVideos = $scope.model.videos.slice(begin, end);
    }, 200);
			//$scope.filteredVideos = $scope.model.videos.slice(begin, end);
			console.log($scope.filteredVideos)
		});



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