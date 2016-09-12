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
		var flag=false;
		takeEditedModel();
		todoHttp();		

		function takeEditedModel() 
		{

			var id = $stateParams.id;			
			if(id !== undefined) {
				id = parseInt(id);			
				$scope.addOrEditBut = 'Edit';
				$scope.addOrEditH="Edit course"	
				$scope.model.selected=editService.get()[0];
				//console.log(editService.get());
				console.log($scope.model.selected)			
			}
		}

		function todoHttp() {

			VideoFac.getDataByUrl('users')
			.then(function(response) {		
				$scope.model.users=response;
				//console.log(response)
			})
			.catch(function(e) {
				console.log(e);
			})	

			VideoFac.getDataByUrl('videos')
			.then(function(response) {		
				$scope.model.videos=response;
				//console.log(response)
			})
			.catch(function(e) {
				console.log(e);
			})	


		}
		// //$scope.model.selected.duration
		// jQuery(function($){
		// 	$.mask.definitions['~']='[0-6]';
		// 	$.mask.definitions['~']='[0-6]';			
		// 	$("#durationid").mask("99:~9:~9");

		// });		


//method for editing and adding item, works with selected and current item if they were chosen
$scope.save = function () {
	console.log("Saving item");   

	if ($stateParams.id !== undefined)	
	{
		$scope.model.currentItem= editService.get()[0];
		var fl = $scope.checkLink($scope.model.currentItem.link);
		if (!fl)
		{
			$scope.model.currentItem.title = $scope.model.selected.title;
			$scope.model.currentItem.link = $scope.model.selected.link;
			$scope.model.currentItem.nameUser = $scope.model.selected.nameUser;
			$scope.model.currentItem.duration = $scope.model.selected.duration;
			console.log("Editing item"); 
			console.log($scope.model.currentItem);
			$http.put('https://epamvideo-17622.firebaseio.com/videos/'+$scope.model.selected.id+'.json', $scope.model.currentItem );
			setTimeout(function() {
       $state.go('items');// сработает после onclick
    }, 500);
			console.log("otpravleno?")
			editService.clear();
		}
		else {
			alert("video vith such url exists!");
			flag=false;
		}		
	}
	else 
	{
		if ($scope.model.videos.length==null)
		{
			$scope.model.selected.id=0
		}
		else
		{
			$scope.model.selected.id=$scope.model.videos.length+1;
		}
		var fl = $scope.checkLink($scope.model.selected.link);
		console.log(fl)
		if (!fl)
			{	console.log($scope.model.selected.duration)
				$scope.model.videos.push($scope.model.selected);
				console.log("Adding item");  
				timeoutWait($scope.model.videos);
			}
			else {
				alert("video vith such url exists!");
				flag=false;
			}

		}


	};

	function timeoutWait(objects) {
		$http.put("https://epamvideo-17622.firebaseio.com/videos.json", objects );
		setTimeout(function() {
       $state.go('items');// сработает после onclick
    }, 500);
	}


	$scope.clearForm= function () {
		editService.clear();
		console.log('cleared');
	}

	$scope.checkLink = function(videolink) {
		for (var i = 0 ; i<$scope.model.videos.length;i++ )
		{	
			if (videolink===$scope.model.videos[i].link)
			{
				flag=true;				
				break;
			}
			else {
				flag=false;
			}
		}
		console.log(flag)
		return flag
	}


}
})()