'use strict';

angular.module('twebProject01App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('newclassroom', {
        url: '/newclassroom',
        templateUrl: 'app/newclassroom/newclassroom.html',
        controller: 'NewclassroomCtrl'
      });
  });