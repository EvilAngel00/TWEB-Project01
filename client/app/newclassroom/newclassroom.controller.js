'use strict';

angular.module('twebProject01App')
    .controller('NewclassroomCtrl', function ($scope, $http, Auth, $window) {

        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.allClassrooms = [];
        $scope.currentClassroom;

        $http.get('/api/classrooms').success(function (allClassrooms) {
            $scope.allClassrooms = allClassrooms;
            $scope.currentClassroom = allClassrooms;

        });

        $scope.addClassroom = function () {

            if (this.classroomName === '') {
                return;
            }

            $http.post('/api/classrooms', {
                name: this.classroomName,
                creator: Auth.getCurrentUser().name,
                pdf: "/assets/slides/" + this.slidesPath,
                isActive: true
            }).success(function (classroom) {
                $window.location = "/pdf?id=" + classroom._id
                console.log(classroom);
            });



        };
    });