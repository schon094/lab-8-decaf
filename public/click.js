angular.module('buttons', [])
  .controller('buttonCtrl', ButtonCtrl)
  .factory('buttonApi', buttonApi)
  .constant('apiUrl', 'http://localhost:1337'); // CHANGED for the lab 2017!

function ButtonCtrl($scope, buttonApi) {
  $scope.buttons = []; //Initially all was still
  $scope.cart = [];
  $scope.users = [];
  $scope.receipt = [];

  $scope.names = ["Isaac", "Abe", "Fransisco", "John"];
  $scope.setUser = setUser;
  $scope.currentUser = "";
  $scope.getUser = getUser;

  $scope.errorMessage = '';
  $scope.isLoading = isLoading;
  $scope.refreshButtons = refreshButtons;
  $scope.buttonClick = buttonClick;
  $scope.userClick = userClick;
  $scope.itemClick = itemClick;
  $scope.total;
  $scope.getTotal = getTotal;
  $scope.anyoneWorking = anyoneWorking;
  $scope.clockedIn = clockedIn;

  var loading = false;
  var anyoneWorking = false;

  function clockedIn() {
    $scope.anyoneWorking = true;
    anyoneWorking = true;
  }

  function isLoading() {
    return loading;
  }

  function setUser($user) {
    currentUser = $user;
    console.log(currentUser);
  }

  function getUser() {
    return currentUser;
  }

  function refreshUsers() {
    loading = true;
    $scope.errorMessage = '';
    buttonApi.getUser()
      .success(function(data) {
        $scope.users = data;
        loading = false;
      })
      .error(function() {
        $scope.errorMessage = "Unable to load Buttons:  Database request failed";
        loading = false;
      });
  }

  function refreshButtons() {
    loading = true;
    $scope.errorMessage = '';
    buttonApi.getButtons()
      .success(function(data) {
        $scope.buttons = data;
        loading = false;
      })
      .error(function() {
        $scope.errorMessage = "Unable to load Buttons:  Database request failed";
        loading = false;
      });
  }

  function refreshCart() {
    loading = true;
    $scope.errorMessage = '';
    buttonApi.getCart()
      .success(function(data) {
        console.log(data);
        $scope.cart = data;
        loading = false;
      })
      .error(function() {
        $scope.errorMessage = "Unable to load Cart:  Database request failed";
        loading = false;
      });;
  }

  function refreshReceipt() {
    loading = true;
    $scope.errorMessage = '';
    buttonApi.getReceipt()
      .success(function(data) {
        console.log(data);
        $scope.receipt = data;
        loading = false;
      })
      .error(function() {
        $scope.errorMessage = "Unable to load Receipt:  Database request failed";
        loading = false;
      });;
  }


  function buttonClick($event) {
    $scope.errorMessage = '';
    buttonApi.clickButton($event.target.id)
      .success(function() {})
      .error(function() {
        $scope.errorMessage = "Unable click";
      });
    refreshCart();
    refreshReceipt();
    getTotal();
  };

  function userClick($event) {
    console.log("click user");
    $scope.errorMessage = '';
    buttonApi.clickUser($event.target.id)
      .success(function() {})
      .error(function() {
        $scope.errorMessage = "Unable click";
      });
    refreshCart();
    refreshReceipt();
    getTotal();
  }

  function itemClick($event) {
    console.log($event.target.id);
    $scope.errorMessage = '';
    buttonApi.clickItem($event.target.id)
      .success(function() {})
      .error(function() {
        $scope.errorMessage = "Unable click";
      });
    refreshCart();
    refreshReceipt();
    getTotal();
  }

  function getTotal() {
    buttonApi.getTotal()
      .success(function(data) {
        $scope.total = data;
        loading = false;
      })
      .error(function() {
        $scope.errorMessage = "Unable to get total:  Database request failed";
        loading = false;
      });
  }

  refreshButtons(); //make sure the buttons are loaded

  getTotal();
  refreshUsers();
  refreshCart();
  refreshReceipt();

}



function buttonApi($http, apiUrl) {
  return {
    getButtons: function() {
      var url = apiUrl + '/buttons';
      return $http.get(url);
    },
    clickButton: function(id) {
      var url = apiUrl + '/click?id=' + id;
      //      console.log("Attempting with "uttons+url);
      return $http.get(url); // Easy enough to do this way
    },

    clickItem: function(id) {
      var url = apiUrl + '/delete?id=' + id;
      return $http.get(url);
    },
    clickUser: function(id) {
      console.log("here: " + currentUser);
      var url = apiUrl + '/user?id=' + id + '&name=' + currentUser;
      return $http.get(url);
    },
    getCart: function() {
      var url = apiUrl + '/cart';
      return $http.get(url);
    },
    getReceipt: function() {
      var url = apiUrl + '/receipt';
      return $http.get(url);
    },
    getTotal: function() {
      var url = apiUrl + "/total";
      return $http.get(url);
    },
    getUser: function() {
      var url = apiUrl + "/users";
      return $http.get(url);
    }
  };
}