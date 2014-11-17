'use strict';

angular.module('twebProject01App')
    .controller('PresentationCtrl', function ($scope, $http, socket, $window) {
        $scope.allClassrooms = [];

        $http.get('/api/classrooms').success(function (allClassrooms) {
            $scope.allClassrooms = allClassrooms;
            socket.syncUpdates('message', $scope.allClassrooms);
        });

        $scope.addClassroom = function () {
            if ($scope.newClassroom === '') {
                return;
            }
            $http.post('/api/classrooms/', {
                content: $scope.newClassroom,
                user: Auth.getCurrentUser().name
            });
            $scope.newClassroom = '';
        };

        $scope.enterClassroom = function (classroom) {

            $window.location = "/pdfStudent?id=" + classroom._id
            console.log(classroom);

        };

        $scope.deleteClassroom = function (classroom) {
            $http.delete('/api/classrooms/' + message._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('classroom');
        });
    });