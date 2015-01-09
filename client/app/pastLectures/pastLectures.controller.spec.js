'use strict';

describe('Controller: PastlecturesCtrl', function () {

  // load the controller's module
  beforeEach(module('twebProject01App'));

  var PastlecturesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PastlecturesCtrl = $controller('PastlecturesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
