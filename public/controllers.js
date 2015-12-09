/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    // INITIALIZATION AND NAVBAR LOGIC
  }])

  //POSTS
  .controller('PostsIndexCtrl', ['Post', '$scope', '$location', '$http', function (Post, $scope, $location, $http) {
    // GET POSTS
    $scope.posts = Post.query();

    // CREATE A POST    
    $scope.createPost = function() {
      // if(!$scope.title || $scope.title === '') { return; }
      var post = new Post($scope.post)
      post.$save(function(data) {
        console.log(data)
        $scope.posts.unshift(data)
        $scope.post = {};
      })
    };

    //ADD UPDATE ROUTE HERE TO EDIT POST AD CHANGE THE RATING???
    $scope.incrementUpvotes = function(post) {
         post.upvotes ++;
         Post.update({ id: post._id }, post, function(data) {
          console.log(data)
         })
       }; 

    // DELETE A POST
    $scope.deletePost = function(post, index) {
      Post.remove({ id: post._id }, function(data) {
        $scope.posts.splice(index, 1);
      })
    };

  }])

  .controller('MusicSearch', function($http, $window, $scope) {
    $scope.searchMusic = function() {
      var term = { term: $scope.term };
      $http.post($window.location.origin + '/api/music/search', term)
        .success(function(response) {
          $scope.tracks = response['tracks']['items']
        })
        .error(function(response) {
          console.log(response)
        })
    }
  })
  ;
