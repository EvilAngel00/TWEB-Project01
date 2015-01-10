'use strict';
angular.module('twebProject01App')
    .controller('NewclassroomCtrl', function ($scope, $http, Auth, $window) {

        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.allClassrooms = [];

        $http.get('/api/classrooms').success(function (allClassrooms) {
            $scope.allClassrooms = allClassrooms;
        });

        function strEndsWith(str, suffix) {
            return str.match(suffix + "$") == suffix;
        }

        $scope.addClassroom = function () {

            // If the user has not selected all fields, prompt and redirect.
            if (this.classroomName === undefined || this.classroomPDF === undefined) {
                alert("Classroom name or pdf url empty !");
                window.location.href = "/newclassroom";
                return;
            }

            /*if (strEndsWith(this.classroomPDF, ".pdf")) {
                alert("URL doesn't end with '.pdf' !");
                window.location.href = "/newclassroom";
                return;
            }*/

            // Add classroom to DB with given inputs.
            $http.post('/api/classrooms', {
                name: this.classroomName,
                creator: Auth.getCurrentUser().name,
                creatorId: Auth.getCurrentUser()._id,
                pdf: this.classroomPDF,
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

        // Retrieve currently selected file in table.
        $scope.select = function (file) {
            $scope.selected = file;
            console.log($scope.selected.path);
        }
    });