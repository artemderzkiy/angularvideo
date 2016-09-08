(function() {
	'use strict';
	angular
	.module('app')
	.controller('addCtrl', addCtrl)
	addCtrl.$inject=['$scope', 'VideoFac', '$http'];
	function addCtrl($scope,VideoFac,$http) {
		
		$scope.model = {		
			selected: {},
			currentItem: undefined,
			title : ""

		}
		todoHttp();
		function todoHttp() {

			VideoFac.getDataByUrl('users')
			.then(function(response) {		
				$scope.model.users=response;
				console.log(response)
			})
			.catch(function(e) {
				console.log(e);
			})	

			VideoFac.getDataByUrl('videos')
			.then(function(response) {		
				$scope.model.videos=response;
				console.log(response)
			})
			.catch(function(e) {
				console.log(e);
			})	


		}



		//method to add item , to choose selected item
		$scope.add = function () {
			$scope.model.selected = {};


		}
//method for editing and adding item, works with selected and current item if they were chosen
$scope.save = function () {
	console.log("Saving item");    


	if($scope.model.currentItem != undefined)
	{
		console.log("editing item");    
		$scope.model.currentItem.title = $scope.model.selected.title;
		$scope.model.currentItem.link = $scope.model.selected.link;
		$scope.model.currentItem.nameUser = $scope.model.selected.nameUser;
		$scope.model.currentItem.duration = $scope.model.selected.duration;		
		$http.put("https://epamvideo-17622.firebaseio.com/videos.json",  $scope.model.videos );
		//$scope.reset();


	}
	else
	{
		if ($scope.model.videos.length==null)
		{
			$scope.model.selected.id=0
		}
		else{
			$scope.model.selected.id=$scope.model.videos.length;
		}
		$scope.model.videos.push($scope.model.selected);
		console.log("Adding item");  
		console.log($scope.model.videos.length);  
		$http.put("https://epamvideo-17622.firebaseio.com/videos.json",  $scope.model.videos );
		//$scope.reset();
	}
	//$scope.showme=false;
	//$scope.end=false;
};	

}
})()