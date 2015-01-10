'use strict';

angular.module('twebProject01App')
    .controller('PastlecturesCtrl', function ($scope, $http, $window, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.getToken = Auth.getToken;

        $scope.allClassrooms = [];

        // Get list of all classrooms. All active ones are filtered
        // in the jade file using the Angular.js filter directive.
        $http.get('/api/classrooms').success(function (allClassrooms) {
            $scope.allClassrooms = allClassrooms;
        });

        // Classrooms are defined by their mongo id and 
        // accessible by such in the url.
        $scope.enterClassroom = function (classroom) {
            $window.location = "/pdfStudent?id=" + classroom._id
        };

        // (De)activate classroom through checkbox
        $scope.select = function (file) {
            $scope.selected = [];
            $http.get('/api/classrooms/' + file.classroom._id).success(function (classroom) {
                $scope.selected = classroom;
                $scope.isActive = !$scope.selected.isActive;

                console.log($scope.selected);

                $http.put('/api/classrooms/' + $scope.selected._id, {
                    isActive: $scope.isActive
                });
            });

        }
    });