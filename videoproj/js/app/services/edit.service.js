(function() {
    'use strict'
    angular
    .module('main')
    .service('editService', editService)
    function editService() {
      var myData = [];

      this.add = function(video){
        myData.push(video);
    };

    this.get = function(){
        return myData;
    };

    this.clear = function(){
        myData.length = 0;
    }
}
})()