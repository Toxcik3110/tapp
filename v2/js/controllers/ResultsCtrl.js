app.controller('ResultsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

    // var timer = new Date();
    // timer.setHours(0);
    // timer.setMinutes(0);
    // timer.setSeconds(0);
    // timer.setMilliseconds(0);
    $scope.timer = 0;
    $scope.totalTime = 0;
    $scope.firstStart = true;
    $scope.pauseTime = 0;


    $scope.runTimer = function() {
        if($scope.pauseObject) {
            clearInterval($scope.pauseObject)
        }
        // if($scope.firstStart) {
        //     $scope.startTime = new Date();
        //     firstStart = false;
        // }
        var newTime = new Date();
        $scope.timerObject = setInterval(function() {
            $scope.timer = new Date() - newTime + $scope.totalTime + $scope.pauseTime;
            $scope.$apply();
        }, 1);
        //else if (!bool) {
            //clearInterval($scope.timerObject);
        //}
    }

    $scope.stopTimer = function() {
        if($scope.timerObject) {
            clearInterval($scope.timerObject);
            $scope.totalTime = $scope.timer;
            var newTime = new Date();
            $scope.pauseObject = setInterval(function() {
                $scope.pauseTime = new Date() - newTime;
                $scope.$apply();
            }, 1)
        }
        console.log("stop tick");
    }

}]);
