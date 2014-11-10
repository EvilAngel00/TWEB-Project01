'use strict';

angular.module('twebProject01App')
  .controller('ChatTestCtrl', function ($scope, $http, socket, Auth) {
    $scope.allMessages = [];
	
	$http.get('/api/messages').success(function(allMessages) {
      $scope.allMessages = allMessages;
      socket.syncUpdates('message', $scope.allMessages);
    });

    $scope.addMessage = function() {
      if(this.newMessage === '') {
        return;
      }
      $http.post('/api/messages', { content: this.newMessage, user: Auth.getCurrentUser().name });
      this.newMessage = '';
    };

    $scope.deleteMessage = function(message) {
      $http.delete('/api/messages/' + message._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('message');
    });
  });
