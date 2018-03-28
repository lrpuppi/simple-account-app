app.controller('entriesController', function($scope, $filter, $resource){

    var resourceEntries = 	$resource('/api/entries/:id', null, {
  						'update': { method:'PUT' }
					});
	var resourcePersons =	$resource('/api/persons');
	
	$scope.persons = [];

    $scope.refresh = function(){
		$scope.load();
		$scope.mode = 'LIST';
	}

    $scope.load = function(){
	    resourceEntries.query(function(data){
			$scope.entries = data;
		});

		resourcePersons.query(function(data){
			$scope.persons = data;
		});
	}

	$scope.save = function(entry){
		var newEntry = new resourceEntries({
			payment_date: 		entry.payment_date,
			due_date: 			entry.due_date,
			description: 		entry.description,
			type: 				entry.type,
			value: 				entry.value,
			person_id: 			entry.person_id
		});
		newEntry.$save();
		$scope.refresh();
	}

	$scope.update = function(entry){
		entry.$update({
			id:					entry.id,
			payment_date: 		entry.payment_date,
			due_date: 			entry.due_date,
			description: 		entry.description,
			type: 				entry.type,
			value: 				entry.value,
			person_id: 			entry.person_id
		 },
		 function(){
			$scope.refresh();
		});
	}

	$scope.edit = function(id){
		resourceEntries.get({id: id}, function(data){
			$scope.entry = data;
			$scope.entry.payment_date = new Date(data.payment_date);
			$scope.entry.due_date = new Date(data.due_date);

			$scope.mode = 'EDIT';
		});
	}

	$scope.add = function(){
		$scope.entry = {};
		$scope.mode = 'ADD';
	}

	$scope.delete = function(id){
		resourceEntries.delete({id: id});
		$scope.load();
	}


	//Init
	$scope.entry = {};
    $scope.mode = 'LIST';
	$scope.refresh();

	//Calendar
	$scope.inlineOptions = {
		showWeeks: true
	 };
	
	$scope.formats = ['dd/MM/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	$scope.altInputFormats = ['M!/d!/yyyy'];
	
	$scope.popup1 = {
		opened: false
	};
	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};
	
	$scope.popup2 = {
		opened: false
	};
	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};
	
});
