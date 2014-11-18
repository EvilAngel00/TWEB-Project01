'use strict';

describe('Controller: PdfStudentCtrl', function () {

  // load the controller's module
  beforeEach(module('twebProject01App'));
  beforeEach(module('socketMock'));

  var PdfStudentCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
	$httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/pageNumbers')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
	  
    scope = $rootScope.$new();
    PdfStudentCtrl = $controller('PdfStudentCtrl', {
      $scope: scope
    });
  }));

  it('attach a number to the scope', function () {
    $httpBackend.flush();
  });
});
