'use strict';

angular.module('twebProject01App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat',
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl'
      });
  });