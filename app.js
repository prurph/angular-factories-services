var app = angular.module('dribbleScorer', []);

app.controller('DribbleController', function($scope) {
  $scope.newPlayer = null;
  $scope.players = ['Tom', 'Dick', 'Harry'];

  $scope.addPlayer = function(player) {
    $scope.players.push(player);
  };
});
