'use strict';

angular.module('twebProject01App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chat-test', {
        url: '/chat-test',
        templateUrl: 'app/chat-test/chat-test.html',
        controller: 'ChatTestCtrl'
      });
  });