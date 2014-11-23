'use strict';

angular.module('twebProject01App')
    .controller('NewclassroomCtrl', function ($scope, $http, Auth, $window) {

        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.allClassrooms = [];
        $scope.allFiles = [];

        $scope.selected = {};

        $http.get('/assets/slides/pdfFiles.json').then(function (allFiles) {
            $scope.allFiles = allFiles.data;
        });

        $http.get('/api/classrooms').success(function (allClassrooms) {
            $scope.allClassrooms = allClassrooms;
        });

        $scope.addClassroom = function () {

            console.log($scope.selected);

            if (this.classroomName === undefined || $scope.selected === {}) {
                alert("I am an alert box!");
                window.location.href = "/newclassroom";
                return;
            }

            $http.post('/api/classrooms', {
                name: this.classroomName,
                creator: Auth.getCurrentUser().name,
                pdf: $scope.selected.path,
                isActive: true
            }).success(function (classroom) {
                $window.location = "/pdf?id=" + classroom._id
                console.log(classroom);
            });



        };

        $scope.login = function () {
            $window.location = "/login?from=newclassroom";
        };

        $scope.select = function (file) {
            $scope.selected = file;
            console.log($scope.selected.path);
        }
    });