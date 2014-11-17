'use strict';

angular.module('twebProject01App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pdfStudent', {
        url: '/pdfStudent',
        templateUrl: 'app/pdfStudent/pdfStudent.html',
        controller: 'PdfStudentCtrl'
      });
  });