'use strict';

angular.module('twebProject01App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pdf', {
        url: '/pdf',
        templateUrl: 'app/pdf/pdf.html',
        controller: 'PdfCtrl'
      });
  });