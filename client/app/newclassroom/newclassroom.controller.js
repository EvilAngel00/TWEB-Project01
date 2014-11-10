'use strict';

angular.module('twebProject01App')
    .controller('NewclassroomCtrl', function ($scope, Auth) {

        $scope.isLoggedIn = Auth.isLoggedIn;
    });