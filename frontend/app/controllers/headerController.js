app.controller('HeaderController', function($scope){

    //Navbar highlight selected item
    $scope.onClick = function($event) {
        var items = document.getElementsByTagName("a");
        for(item of items){
            var link = item.href;
            if(link == $event.target){
                item.parentElement.className="active";
            } else{
                item.parentElement.className="";
            }
        }
    }

    $scope.$on('$stateChangeSuccess', function () {
        //console.log("state changed!!!");
    });

})