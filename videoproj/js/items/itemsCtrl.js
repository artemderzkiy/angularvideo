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
		$scope.model = {			
			selected: {},
			currentItem: undefined,
			name : ""
		};		
		$scope.checked = false;
		$scope.mayArchive = false;

		//method to get data from firebase and init the pagination
		function videoHttp() {
			VideoFac.getDataByUrl('videos')
			.then(function(response) {	
				$scope.model.videos=response;		
				$scope.totalItems=$scope.model.videos.length;
				var begin = (($scope.currentPage - 1) * $scope.numPerPage)
				var end = begin + $scope.numPerPage;				
				$scope.filteredVideos = $scope.model.videos.slice(begin, end);
			})
			.catch(function(e) {
				console.log(e);
			})	
			return $scope.model.videos
		}
//watcher for pagination
$scope.$watch('currentPage + numPerPage', function() {			
	videoHttp();
});

		//method to redirect to first page after deleting
		$scope.setItemsPerPage = function(num) {
			$scope.itemsPerPage = num;
			$scope.currentPage = 1;
		}

		//method for removing data
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
				$scope.currentPage=1;
			}    
		};	

		// method to check archives to disable/able button
		$scope.checkChecked = function() {
			$scope.mayArchive = $scope.model.videos.some(function(video) {
				return video.checked && !video.archived;
			});
		}

		//choose all items to archive them
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

		//archive item
		$scope.archive = function() {

			$scope.model.videos.forEach(function(video) {
				if (video.checked)
					video.archived = true;
				video.checked=false;
				$http.put("https://epamvideo-17622.firebaseio.com/videos.json",  $scope.model.videos );
			});
			$scope.mayArchive = false;
		}	
		//unarchive item
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
		//grab item for edit into service
		$scope.edit = function (video) {	   
			$scope.model.selected = angular.copy(video);
			$scope.model.currentItem = video;
			editService.add($scope.model.currentItem)
		};
	}
})()