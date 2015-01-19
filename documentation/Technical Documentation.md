# Technical Documentation

This document aims to present to a developer what tools and frameworks were used in order to deliver the project as it is. 

Firstly, we will go through the process in which we created the skeleton of the project using a generator. We will explain how the generator works and what it brings *out-of-the-box*.

Secondly, we will talk about the frameworks and technologies used in order to develop our functionalities.

## Technologies used to build the project aka Scaffolding
Fréd
### Yeoman
Fréd
### Angular-Fullstack
Fréd
### Grunt
Fréd
### Bower
Fréd
### Conclusion
Fréd & Rui
## Technologies used in the project

In this chapter, we will present all the technologies that are used around the project. That means, what we had to learn in order to use and deploy efficiently our project.

### Javascript

### [AngularJS](https://angularjs.org/)

AngularJS is a framework for Javascript adding a whole dynamic environment to HTML page declaration.

#### Model-View-Controller (MVC)

AngularJS is based on the MVC design pattern. The pattern allows to separate concerns in the logic of the application.

The different components are managed by the controller, which associates a scope and different sub-scopes which are executions contexts for expressions.

#### Scope

The Angular scope works for 2-way data binding. Any expression declared in the controller is accessible by the view using the double brackets notation `{{}}`. The way works with the Angular directives declared in the view. We will take the example with an ng-model directive attached to a text box:

	<div ng-controller="MyController">
	  Your name:
	    <input type="text" ng-model="username">
	    <button ng-click='sayHello()'>greet</button>
	  <hr>
	  {{greeting}}
	</div>

As we can see, the input form is attached to "username" which content will be added to the scope. In the controller we have the following code:

	angular.module('scopeExample', [])
	.controller('MyController', ['$scope', function($scope) {
	  $scope.username = '';
	
	  $scope.sayHello = function() {
	    $scope.greeting = 'Hello ' + $scope.username + '!';
	  };
	}]);

When we click the "greet" button, the function `sayHello()` will be called and the `$scope.greeting` field will be updated in the controller, thus updating the `{{greeting}}` field in the DOM.

Result:

![](img/angular_scope_example.png)

#### Dependency injection

Angular services are accessible through dependency injection in the controller. There are several ways to declare a dependency in an Angular controller but throughout the project we mostly used implicit annotation:

	someModule.controller('MyController', function($scope, myDependency) {
	  // ...
	});

Several services are provided by Angular, such as `$http` that handles common operations in web apps, but the user can specify his own services using a **service factory function**.

By using an implicit annotation, the injector will look for a service with a matching name:

![](img/angular_dependency_injection.png)


### Node.js
Rui
### Socket.io
Rui
### Persistence (MongoDB)
Rui
### Amazon S3
Rui
### Heroku
Rui
### Github
Rui
## Sequence diagram
Fréd & Rui
What happens when you click on "Next" in a slide ?







