var app = angular.module('pomodoro', []);

app.controller('appCtrl', function($scope, $interval) {
  
  $scope.defaultSession = 25;
  $scope.defaultBreak = 5;
  //setting up the timer
  $scope.session = {
    totalSeconds: $scope.defaultSession*60,
    get secondsInMinute() {
      if (this.totalSeconds % 60 === 0) {
        return '00';
      } else if (this.totalSeconds % 60 < 10) {
        return '0' + this.totalSeconds % 60;
      } else {
        return this.totalSeconds % 60;
      }
    },
    get minutes() {
      return Math.floor(this.totalSeconds / 60);
    },
  };
  
  //manipulating the timer
  $scope.setMinutes = function(minutes) {
    $scope.session.totalSeconds = minutes * 60;
  };
  $scope.addMinute = function() {
    $scope.session.totalSeconds += 60;
  };
  $scope.removeMinute = function() {
    $scope.session.totalSeconds -= 60;
  };

  //switch between break and session
  $scope.isBreak = false; //default to session
  $scope.sessionStatus = 'Session';
  $scope.break = function(){
    if ($scope.isBreak) {
        $scope.sessionStatus = "Session";
        $scope.reset();
      } else {
        $scope.sessionStatus = "Break";
        $scope.takeBreak();
      }
  };
  $scope.takeBreak = function() {
    $scope.isBreak = true;
    $scope.setMinutes($scope.defaultBreak);
  };
  $scope.reset = function() {
    $scope.isBreak = false;
    $scope.setMinutes($scope.defaultSession);
  };
  
  //starting and and stopping the timer
  $scope.isRunning = false;
  $scope.toggleTimer = function() {
    if(!$scope.isRunning){
    $scope.isRunning = true;
    countdown = $interval(function() {
      $scope.passSecond()
    }, 1000);
  } else {
    $scope.isRunning = false;
    $interval.cancel(countdown);
  }
  };

  //pass a second and check if there is still time on clock
  $scope.alert = function() {
    var audio = new Audio("http://bruitages.free.fr/horloges/sonnette_reveil.wav").play();
  };
  $scope.passSecond = function() {
    $scope.session.totalSeconds -= 1;
    if ($scope.session.totalSeconds <= 0) {
      $scope.alert();
      $scope.break();
    }
  }

});