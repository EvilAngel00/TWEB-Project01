'use strict';

describe('Controller: ChatTestCtrl', function () {

  // load the controller's module
  beforeEach(module('twebProject01App'));
  beforeEach(module('socketMock'));

  var ChatTestCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
	$httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/messages')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
	  
    scope = $rootScope.$new();
    ChatTestCtrl = $controller('ChatTestCtrl', {
      $scope: scope
    });
  }));

  it('attach a list of messages to the scope', function () {
	$httpBackend.flush();
	expect(scope.allMessages.length).toBe(4);
  });
});
