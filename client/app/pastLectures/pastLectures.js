'use strict';

angular.module('twebProject01App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pastLectures', {
        url: '/pastLectures',
        templateUrl: 'app/pastLectures/pastLectures.html',
        controller: 'PastlecturesCtrl'
      });
  });