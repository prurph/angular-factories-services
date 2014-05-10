/* jshint camelcase: false */

'use strict';

var app = angular.module('dribbbleScorer', []);

app.controller('DribbbleController', function($scope, DribbblePlayer) {
  $scope.newPlayer = null;
  $scope.players = [];

  $scope.addPlayer = function(player) {
    $scope.players.push(new DribbblePlayer(player));
  };

  $scope.removePlayer = function(player) {
    $scope.players.splice($scope.players.indexOf(player), 1);
  };

});

app.factory('DribbblePlayer', function($http) {
  var DribblePlayer = function(player) {
    this.initialize = function() {
      var url = 'http://api.dribbble.com/players/' + player + '?callback=JSON_CALLBACK';
      var playerData = $http.jsonp(url);
      var self = this; // this is constructed DribbblePlayer instance

      // when $http promise resolves, extend this with reponse properties
      playerData.then(function(response) {
        angular.extend(self, response.data);
      });
    };

    this.likeScore = function() {
      return this.likes_received_count - this.likes_count;
    };

    this.commentScore = function() {
      return this.comments_received_count - this.comments_count;
    };

    this.initialize();
  };

  return (DribblePlayer);
});
