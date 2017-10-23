var EmailReqApiURL = "http://localhost:12000/emailapi/ReqApiURL"
//var EmailReqApiURL = "http://icyns.vicp.io/emailapi/ReqApiURL"

angular.module('SunnyDayApp').controller("SubCtrl", function($scope, $http) {
  //initialise variable
  $scope.user = {email: ''};
  $scope.SubSelect = {email: true,
                      device : false};
  //setup scope function
  $scope.SubSelectStageClear = function(){
    $scope.stage_input=false;
    $scope.stage_request_sent=false;
    $scope.stage_request_complete_failure=false;
    $scope.stage_request_complete_success=false;
  }
  //swithing Email Selection Stage to input, and clear the
  $scope.SubSelectStageInput = function(){
    $scope.SubSelectStageClear()
    $scope.SubselectClearWarning()
    $scope.stage_input=true;
  }
  //swithing Email Selection Stage to input
  $scope.SubSelectStageSent = function(){
    $scope.SubSelectStageClear()
    $scope.stage_request_sent=true;
  }
  $scope.SubSelectStagefailure = function(){
    $scope.SubSelectStageClear()
    $scope.stage_request_complete_failure=true;
  }
  $scope.SubSelectStageSuccess = function(){
    $scope.SubSelectStageClear()
    $scope.stage_request_complete_success=true;
  }
  $scope.SubSelectInputClear = function(){
    $scope.user = {email: ''};
    $scope.SubSelect = {email: true,
                        device : false};
  }
  $scope.SubselectClearWarning = function(){
    $scope.showSelErr = false;
    $scope.showEmalErr = false;
  }
  //button click events
  $scope.ReturnToMain =function(){
    $scope.SubSelectInputClear()
    $scope.SubSelectStageInput()
    $scope.$emit('returnToMain')
    //jump back to selection page
  }
  $scope.subRety = function(){
    $scope.SubselectClearWarning()
    $scope.SubSelectStageInput()

  }
  //subscribe function
  $scope.subscribe = function(){
    // pop out worning if email is invalid
    $scope.showEmalErr = true;
    // pop out worning if non option is selected
    if(!$scope.SubSelect.email && !$scope.SubSelect.device){
      $scope.showSelErr = true;
      return;
    }else{
      $scope.showSelErr = false;
    }
    // simple email validation
    if($scope.SubForm.emailinput.$invalid){
      return;
    }
    // if everything looks ok, change stage to sending request
    $scope.SubSelectStageSent()

    //send server request
    var postdata = JSON.stringify({
      emailaddress: $scope.user.email,
      enableEmail: $scope.SubSelect.email,
      enableDevice: $scope.SubSelect.device,
      timeframe: [{ date: "28-05-2018",
                    range: "12:00-15:00"}]
    })

    $http.post(EmailReqApiURL, postdata)
     .then(
         function (response){
           // success callback
           // change stage to success
           console.log(response.data.s_success)
           if(response.data.s_success){
             $scope.SubSelectStageSuccess()
             console.log(response.data.code)
           }else{
             $scope.SubSelectStagefailure()
             console.log(response.data.code)
           }
         },
         function (response){
           // failure call back
           // change stage to fail
           console.log(response.data.s_success)
           $scope.SubSelectStagefailure()
           console.log(response.data.code)
         }
     );
  }

  //initialise Screen
  $scope.SubSelectStageInput()
  $scope.SubselectClearWarning()

  })
//
