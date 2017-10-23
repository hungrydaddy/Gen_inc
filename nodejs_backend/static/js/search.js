// define search method
QueryFunction = function(text){
  // get results. If results are postcode convert them to suburb
  results = text ? search_list.filter(function (key){
    return (key.value.indexOf(angular.lowercase(text)) === 0)
  }) : [];
  // return unique result
  return results ? results.filter((result,index,self)=> self.findIndex(r => r.display === result.display) === index) : [];
}
angular.module('SunnyDayApp').controller("SearchController",
function($scope, $http, UniversalDataService) {
  // Scope binding
  $scope.search_ctrl =
    {
      isDisabled : false,
      selectedItem: '',
      searchText : '',
      querySearch : QueryFunction
    }
  $scope.search_box_visable = true;
  // registing suburb selected event
  $scope.suburb_selected = function(){
    if(!$scope.search_ctrl.selectedItem) return
    // obtain result
    UniversalDataService.search_result = weather_station[$scope.search_ctrl.selectedItem.display.toLowerCase().replace(" ",'-')]
    $scope.$emit('to_days_selection')
  }
})
