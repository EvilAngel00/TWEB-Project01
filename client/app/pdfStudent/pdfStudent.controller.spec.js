'use strict';

describe('Controller: PdfStudentCtrl', function () {

  // load the controller's module
  beforeEach(module('twebProject01App'));

  var PdfStudentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PdfStudentCtrl = $controller('PdfStudentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
