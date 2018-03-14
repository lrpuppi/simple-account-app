app.controller('personsController', function($scope, $resource){

	var resource = 	$resource('/api/persons/:id', null, {
  						'update': { method:'PUT' }
					});

    $scope.refresh = function(){
		$scope.load();
		$scope.mode = 'LIST';
	}

    $scope.load = function(){
	    resource.query(function(data){
	    	$scope.persons = data;
	    });
	}

	$scope.save = function(person){
		var newPessoa = new resource({name: person.name});
		newPessoa.$save();
		$scope.refresh();
	}

	$scope.update = function(person){
		person.$update({id:person.id}, function(){
			$scope.refresh();
		});
	}

	$scope.edit = function(id){
		resource.get({id: id}, function(data){
			$scope.person = data;
			$scope.mode = 'EDIT';
		});
	}

	$scope.add = function(){
		$scope.person = {};
		$scope.mode = 'ADD';
	}

	$scope.delete = function(id){
		resource.delete({id: id});
		$scope.load();
	}


    //Init
    $scope.person = {};
    $scope.mode = 'LIST';
	$scope.refresh();

});
