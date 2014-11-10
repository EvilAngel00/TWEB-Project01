'use strict';

describe('Controller: NewclassroomCtrl', function () {

  // load the controller's module
  beforeEach(module('twebProject01App'));

  var NewclassroomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewclassroomCtrl = $controller('NewclassroomCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
