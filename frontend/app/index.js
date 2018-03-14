var app = angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap'])

.config(function($stateProvider) {
  $stateProvider.state('pages', {
    views: {
      'header': {
        templateUrl:'views/partials/header.html',
        controller:'HeaderController'
      },
      'content': {
        template:'<div ui-view></div>'
      },
      'footer': {
        templateUrl:'views/partials/footer.html'
      }
    }
  })
  .state('pages.home', {
    templateUrl:'views/home.html'
  })
  .state('pages.about', {
    templateUrl:'views/about.html'
  })
  .state('pages.persons', {
    templateUrl:'views/persons.html',
    controller: 'personsController'
  })
  .state('pages.entries', {
    templateUrl:'views/entries.html',
    controller: 'entriesController'
  })
})
.run(function($state) {
  $state.go('pages.home');
})


//angular.bootstrap(document.getElementById('app'), ['app']);
