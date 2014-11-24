'use strict';

angular.module('twebProject01App')
    .controller('NewclassroomCtrl', function ($scope, $http, Auth, $window) {

        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.allClassrooms = [];
        $scope.allFiles = [];

        $scope.selected = {};

        // Temporary workaround to choose between available PDF files.
        $http.get('/assets/slides/pdfFiles.json').then(function (allFiles) {
            $scope.allFiles = allFiles.data;
        });

        $http.get('/api/classrooms').success(function (allClassrooms) {
            $scope.allClassrooms = allClassrooms;
        });

        $scope.addClassroom = function () {

            // If the user has not selected all fields, prompt and redirect.
            if (this.classroomName === undefined || $scope.selected === {}) {
                alert("Classroom name empty or PDF not selected !");
                window.location.href = "/newclassroom";
                return;
            }

            // Add classroom to DB with given inputs.
            $http.post('/api/classrooms', {
                name: this.classroomName,
                creator: Auth.getCurrentUser().name,
                creatorId: Auth.getCurrentUser()._id,
                pdf: $scope.selected.path,
                isActive: true
            }).success(function (classroom) {
                $window.location = "/pdf?id=" + classroom._id;
                console.log(classroom);
            });



        };

        // When the user goes to the log in screen, add the origin to
        // redirect accordingly.
        $scope.login = function () {
            $window.location = "/login?from=newclassroom";
        };

        $scope.select = function (file) {
            $scope.selected = file;
            console.log($scope.selected.path);
        }
    });