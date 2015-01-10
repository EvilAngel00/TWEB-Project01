'use strict';

angular.module('twebProject01App')
    .controller('ChatCtrl', function ($scope, $http, socket, Auth, $location) {
        $scope.allMessages = [];
        $scope.classroomId = $location.search().id;

        $http.get('/api/messages/' + $scope.classroomId).success(function (allMessages) {
            $scope.allMessages = allMessages;
            socket.syncUpdates('message', $scope.allMessages);
        });

        // Adds a message with current room id for filtering.
        $scope.addMessage = function () {
            if (this.newMessage === '') {
                return;
            }
            $http.post('/api/messages', {
                content: this.newMessage,
                user: Auth.getCurrentUser().name,
                classroomId: $scope.classroomId
            });
            this.newMessage = '';
        };

        $scope.deleteMessage = function (message) {
            $http.delete('/api/messages/' + message._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('message');
        });

        // Keeps the chat scrolled to bottom.
        $scope.scroll = function () {
            var box = document.getElementById('chatDiv');
            box.scrollTop = box.scrollHeight;
        };
    });