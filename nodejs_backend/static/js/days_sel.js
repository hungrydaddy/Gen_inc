
angular.module('SunnyDayApp').controller("days_sel_controller", function($scope, $http, UniversalDataService) {
  // trigger event to remove a scroll div that is the
  // result of an angular material bug
  // Issue: https://github.com/angular/material/issues/10127
  // and: https://github.com/angular/material/issues/9318
  $scope.$emit("remove_scoll_mask")

  //registing events that trggers days data retrival
  search_result = UniversalDataService.search_result
  console.log(search_result)
})
