'use strict';

angular.module('twebProject01App')
    .controller('PresentationCtrl', function ($scope, $http, $window, Auth) {
        $scope.allClassrooms = [];

        // Get list of all classrooms. All active ones are filtered
        // in the jade file using the Angular.js filter directive.
        $http.get('/api/classrooms').success(function (allClassrooms) {
            $scope.allClassrooms = allClassrooms;
        });



        // Classrooms are defined by their mongo id and 
        // accessible by such in the url.
        $scope.enterClassroom = function (classroom) {
            $scope.currentUser = [];
            $http.get('/api/users/' + Auth.getCurrentUser()._id).success(function (user) {
                $scope.currentUser = user;
                console.log($scope.currentUser);
                console.log("Attended: " + $scope.currentUser.attendedLectures);
                $scope.currentUser.attendedLectures.push(classroom);
                console.log($scope.currentUser.attendedLectures);

                $http.put('/api/users/' + $scope.currentUser._id, {
                    attendedLectures: $scope.currentUser.attendedLectures
                });
                console.log($scope.currentUser);
                //$window.location = "/pdfStudent?id=" + classroom._id
            });
        };
    });