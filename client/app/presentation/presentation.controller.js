'use strict';

angular.module('twebProject01App')
    .controller('PresentationCtrl', function ($scope, $http, $window, Auth) {

        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.allClassrooms = [];

        // Get list of all classrooms. All active ones are filtered
        // in the jade file using the Angular.js filter directive.
        $http.get('/api/classrooms').success(function (allClassrooms) {
            $scope.allClassrooms = allClassrooms;
        });

        Array.prototype.contains = function (userId, classroomId) {
            var i = this.length;
            while (i--) {
                if (this[i].userId === userId && this[i].classroomId === classroomId) {
                    return true;
                }
            }
            return false;
        }

        // Classrooms are defined by their mongo id and 
        // accessible by such in the url.
        $scope.enterClassroom = function (classroom) {
            $http.get('/api/users/' + Auth.getCurrentUser()._id).success(function (user) {
                $scope.alreadyAttendedLecture;
                console.log(user);

                $http.get('/api/attendedLectures').success(function (allAttendedLectures) {
                    if (!allAttendedLectures.contains(user._id, classroom._id)) {
                        $http.post('/api/attendedLectures', {
                            userId: user._id,
                            classroomId: classroom._id
                        });
                    }
                });

            });
        };
    });