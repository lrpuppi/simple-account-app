app.controller('entriesController', function($scope, $filter, $resource){

    var resource = 	$resource('/api/entries/:id', null, {
  						'update': { method:'PUT' }
					});

    $scope.refresh = function(){
		$scope.load();
		$scope.mode = 'LIST';
	}

    $scope.load = function(){
	    resource.query(function(data){
			$scope.entries = data;
	    });
	}

	$scope.save = function(entry){
		var newEntry = new resource({
			payment_date: 		entry.payment_date,
			due_date: 			entry.due_date,
			description: 		entry.description,
			type: 				entry.type,
			value: 				entry.value,
			person_id: 			entry.person_id,
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
		}, function(){
			$scope.refresh();
		});
	}

	$scope.edit = function(id){
		resource.get({id: id}, function(data){
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
		resource.delete({id: id});
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
