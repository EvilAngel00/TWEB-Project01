'use strict';

angular.module('twebProject01App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('presentation', {
        url: '/presentation',
        templateUrl: 'app/presentation/presentation.html',
        controller: 'PresentationCtrl'
      });
  });