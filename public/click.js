angular.module('buttons',[])
  .controller('buttonCtrl',ButtonCtrl)
  .factory('buttonApi',buttonApi)
  .constant('apiUrl','http://localhost:1337'); // CHANGED for the lab 2017!

  function ButtonCtrl($scope,buttonApi){
     $scope.buttons=[]; //Initially all was still
     $scope.cart=[];
     $scope.errorMessage='';
     $scope.isLoading=isLoading;
     $scope.refreshButtons=refreshButtons;
     $scope.buttonClick=buttonClick;
     $scope.itemClick=itemClick;
     $scope.total;
     $scope.getTotal=getTotal;
     $scope.getStart=getStart;
     $scope.getEnd=getEnd;

     var loading = false;

     function isLoading(){
      return loading;
     }

    function refreshButtons(){
      loading=true;
      $scope.errorMessage='';
      buttonApi.getButtons()
        .success(function(data){
           $scope.buttons=data;
           loading=false;
        })
        .error(function () {
            $scope.errorMessage="Unable to load Buttons:  Database request failed";
            loading=false;
        });
   }

   function refreshCart(){
     console.log("refreshing cart")
     loading=true;
     $scope.errorMessage='';
     buttonApi.getCart()
       .success(function(data){
         console.log(data);
          $scope.cart=data;
          $scope.start=data[0].time;
          $scope.end=data[data.length - 1].time;
          loading=false;
       })
       .error(function () {
           $scope.errorMessage="Unable to load Cart:  Database request failed";
           loading=false;
       });
  }
    function buttonClick($event){
       $scope.errorMessage='';
       buttonApi.clickButton($event.target.id)
          .success(function(){})
          .error(function(){$scope.errorMessage="Unable click";});
      refreshCart();
      getTotal();
    }

    function itemClick($event){
      console.log($event.target.id);
       $scope.errorMessage='';
       buttonApi.clickItem($event.target.id)
          .success(function(){})
          .error(function(){$scope.errorMessage="Unable click";});
      refreshCart();
      getTotal();
    }

    function getStart() {
      startTime = cart[0].time;
      // startTime = Date.now()
    }

    function getEnd() {
      endTime = cart[cart.length - 1].time;
    }

    function getTotal(){
      console.log("In getTotal()");
      buttonApi.getTotal()
        .success(function(data){
          console.log("total = " + data);
           $scope.total=data;
           loading=false;
        })
        .error(function () {
            $scope.errorMessage="Unable to get total:  Database request failed";
            loading=false;
        });
    }

    refreshButtons();  //make sure the buttons are loaded
    refreshCart();
    getTotal();
  }


  function buttonApi($http,apiUrl){
    return{
      getButtons: function(){
        var url = apiUrl + '/buttons';
        return $http.get(url);
      },
      clickButton: function(id){
        var url = apiUrl+'/click?id='+id;
  //      console.log("Attempting with "uttons+url);
        return $http.get(url); // Easy enough to do this way
      },

      clickItem: function(id){
        var url = apiUrl+'/delete?id='+id;
        return $http.get(url);
      },
      getCart: function(){
        var url = apiUrl + '/cart';
        return $http.get(url);
      },
      getTotal: function(){
        var url = apiUrl + "/total";
        return $http.get(url);
      }
   };
  }


