'use strict';

angular.module('myApp.base', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/leddit', {
    templateUrl: 'view1/view1.html',
    controller: 'BasicUse'
  });
}])

.controller('BasicUse', ["$scope", "$http", function($scope, $http) {
  $scope.commentForm = {
    q: "Ghazi",
    subreddit: "KotakuInAction",
    author: "puffsmackdown1",
    link_id: "",
    before: 1,
    beforeType: "d",
    after: 4,
    afterType: "w"
  };

  $scope.commentResults = [];

  $scope.submitCommentForm = function() {
    var submission = {};

    if($scope.commentForm.q) {
      submission["q"] = $scope.commentForm.q;
    }
    if($scope.commentForm.subreddit) {
      submission["subreddit"] = $scope.commentForm.subreddit;
    }
    if($scope.commentForm.author) {
      submission["author"] = $scope.commentForm.author;
    }
    if($scope.commentForm.link_id) {
      submission["link_id"] = $scope.commentForm.link_id;
    }
    if($scope.commentForm.before) {
      submission["before"] = $scope.commentForm.before + $scope.commentForm.beforeType;
    }
    if($scope.commentForm.after) {
      submission["after"] = $scope.commentForm.after + $scope.commentForm.afterType;
    }

    $http({
      method: 'GET',
      url: 'https://api.pushshift.io/reddit/search/comment',
      params: submission
    })
      .then(function(response) {
      console.log("response", response.data);

        $scope.commentResults = response.data;
    });
  }
}]);