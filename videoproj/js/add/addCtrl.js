(function() {
	'use strict';	
	angular
	.module('app')
	.controller('addCtrl', addCtrl)
	addCtrl.$inject=['$rootScope','$scope','$stateParams','VideoFac','editService' ,'$http','$state'];
	function addCtrl($rootScope,$scope,$stateParams,VideoFac,editService,$http,$state) {		
		$scope.model = {
			selected: {},
			currentItem: null
		}
		$scope.addOrEditBut = 'Add';
		$scope.addOrEditH = 'Add New Course';
		$scope.maskOptions = {
			maskDefinitions: 
			{ 'M':/[0-9]/,'H':/[0-5]/ } 
		}
		var flag=false;
		takeEditedModel();
		todoHttp();	

		//initial model and check either it Add or Edit 
		function takeEditedModel() 
		{
			var id = $stateParams.id;			
			if(id !== undefined) {
				id = parseInt(id);			
				$scope.addOrEditBut = 'Edit';
				$scope.addOrEditH="Edit course"	
				$scope.model.selected=editService.get()[0];						
			}
		}

		//grab data from Firebase videos and users
		function todoHttp() {
			VideoFac.getDataByUrl('users')
			.then(function(response) {		
				$scope.model.users=response;
			})
			.catch(function(e) {
				console.log(e);
			})	
			VideoFac.getDataByUrl('videos')
			.then(function(response) {		
				$scope.model.videos=response;
			})
			.catch(function(e) {
				console.log(e);
			})	
		}
		////old masked iput		
		// jQuery(function($){
		// 	$.mask.definitions['~']='[0-6]';
		// 	$.mask.definitions['~']='[0-6]';			
		// 	$("#durationid").mask("99:~9:~9");
		// });	

//method for editing and adding item, works with selected and current item if they were chosen
$scope.save = function () {
	if ($stateParams.id !== undefined)	
	{
		$scope.model.currentItem= editService.get()[0];
		var fl = $scope.checkLink($scope.model.currentItem.link);
		if ($scope.model.selected.link==$scope.model.currentItem.link)
			fl=false;
		if (!fl)
		{
			$scope.model.currentItem.title = $scope.model.selected.title;
			$scope.model.currentItem.link = $scope.model.selected.link;
			$scope.model.currentItem.nameUser = $scope.model.selected.nameUser;
			$scope.model.currentItem.duration = $scope.model.selected.duration;
			for (var i=0; i<$scope.model.videos.length; i++)
			{
				if ($scope.model.videos[i].id==$scope.model.currentItem.id)
				{
					$scope.model.videos[i]=$scope.model.currentItem;
				}
			}			
			sendVideos();
			editService.clear();
		}
		else {
			alert("video vith such url exists!");
			flag=false;
		}		
	}
	else 
	{		
		$scope.model.selected.id='id' + (new Date()).getTime();		
		var fl = $scope.checkLink($scope.model.selected.link);
		if (!fl)
		{	
			$scope.model.videos.push($scope.model.selected);				
			sendVideos()
		}
		else {
			alert("video vith such url exists!");
			flag=false;
		}
	}
};
//method for sendind data TO firebase in promise and go to items 
function sendVideos() {
	$http.put("https://epamvideo-17622.firebaseio.com/videos.json", $scope.model.videos )
	.then(function resolve() {
		$state.go('items');			
	})
	.catch(function reject(error) {
		console.log(error);
	})		
}

	//methods that clears form and clears current edited item
	$scope.clearForm= function () {
		editService.clear();
	}

	//method for checking if such link exists or not
	$scope.checkLink = function(videolink) {
		for (var i = 0 ; i<$scope.model.videos.length;i++ )
		{	
			if (videolink===$scope.model.videos[i].link )
			{
				flag=true;				
				break;
			}
			else {
				flag=false;
			}
		}
		return flag
	}
}
})()