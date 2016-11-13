angular.module('myApp.checkout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/checkout', {
    templateUrl: 'checkout/checkout.html',
    controller: 'Checkout'
  });
}])

.controller('Checkout', ['$scope', 'FlowersEndpoint', '$location', '$anchorScroll', function($scope, FlowersEndpoint, $location, $anchorScroll) {
  $scope.data = {};
  $scope.data.flowers = FlowersEndpoint.collections[0].skus;
  $scope.data.shipping = FlowersEndpoint.collections[0].shipping_options;

  $scope.chosen = false;

  $scope.selectFlower = function(selectedFlower) {
    $scope.data.selectedFlower = selectedFlower;
    $scope.chosen = true;
    $location.hash('pricing');
    $anchorScroll();
    $scope.calculatePrice();
  }

  $scope.calculatePrice = function() {
    if($scope.data.order_date && $scope.chosen && $scope.data.quantity && $scope.data.shipment_price) {
      for (var i = 0; i < $scope.data.selectedFlower.pricings.length; i++) {
        var pricing = $scope.data.selectedFlower.pricings[i];
        if(pricing.quantity === parseInt($scope.data.quantity)) {
          $scope.data.bouquet_price = pricing.amount;
          break;
        }
      }
      $scope.data.total = parseInt($scope.data.bouquet_price) + parseInt($scope.data.quantity) * parseFloat($scope.data.shipment_price);
    }
  }
}]);
