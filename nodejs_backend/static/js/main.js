// regex that detects weather is browsing with mongodbSimpleApiURL
// retrived from http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser, answered by Michael Zaporozhets Jul 8 '12 at 8:24, edited by Tiesselune Aug 26 '16 at 9:26
mobileCheck = function(){
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
if(mobileCheck()){
  // banner size while on mobilee
  var activeBannerSize = 8;
  var retractBannerSize = 5;
}else{
  var activeBannerSize = 5;
  var retractBannerSize = 3;
}

angular.module('SunnyDayApp', ['ngMaterial', 'ngMessages',"ngRoute"])
// setup a custum service
.service('UniversalDataService',function(){
  // Data service for search box
  this.search_result = "";
})

.config(function($routeProvider){
  $routeProvider
  .when("/",{
    templateUrl : "/pages/search.html"
  })
  .when("/search",{
    templateUrl : "/pages/search.html"
  })
  .when("/days_sel",{
    templateUrl : "/pages/days_sel.html"
  })
  .when("/period_sel",{
    templateUrl : "/pages/period_sel.html"
  })
  .when("/notification_setting",{
    templateUrl : "/pages/notification_setting.html"
  })
  .when("/subscribe",{
    templateUrl : "/pages/subscribe.html"
  })
})
// setup controller for main
// Each banner/page activation/redirection can be achieved via event emitting
// register down in the bottom
.controller('main_controller',function($scope, $http, $location) {
  // initialise variables.
  //display variable binding
  $scope.height_display = {value : 0}
  $scope.top_display = {value : 0}

  //banner variable binding
  $scope.header_height_main = {value : retractBannerSize};
  $scope.header_height_days_sel = {value : retractBannerSize};
  $scope.header_height_period_sel = {value : retractBannerSize};
  $scope.header_height_notification_setting = {value : retractBannerSize};
  $scope.header_height_subscribe = {value : retractBannerSize};

  $scope.header_top_main = {value : 0};
  $scope.header_top_days_sel = {value : 0};
  $scope.header_top_period_sel = {value : 0};
  $scope.header_top_notification_setting = {value : 0};
  $scope.header_top_subscribe = {value : 0};

// initialise control array. The order will affects banner order in page
  $scope.bannder_ctrl_array = []
  $scope.bannder_ctrl_array.push({height:$scope.header_height_main,top:$scope.header_top_main, page:'/search'})
  $scope.bannder_ctrl_array.push({height:$scope.header_height_days_sel,top:$scope.header_top_days_sel, page:'/days_sel'})
  $scope.bannder_ctrl_array.push({height:$scope.header_height_period_sel,top:$scope.header_top_period_sel, page:'/period_sel'})
  $scope.bannder_ctrl_array.push({height:$scope.header_height_notification_setting,top:$scope.header_top_notification_setting, page:'/notification_setting'})
  $scope.bannder_ctrl_array.push({height:$scope.header_height_subscribe,top:$scope.header_top_subscribe, page:'/subscribe'})

// function to extends/retract banner
  BannderExtend = function(banner_height){
    banner_height.value=activeBannerSize
  }

  BannderRetract = function(banner_height){
    banner_height.value=retractBannerSize
  }

  // set active banner by index
  activeBannerByIndex = function(index){
    //validation check
    if(index>=$scope.bannder_ctrl_array.length) {
      return
    }
    //retract and set position of all top banner
    for(i = 0; i< index; i++){
        BannderRetract($scope.bannder_ctrl_array[i].height)
        // currently it will teleport the location. idealy, we wants some animation. Doable via ngStyle
        $scope.bannder_ctrl_array[i].top.value = i*retractBannerSize
    }
    // extends and position active banner
    BannderExtend($scope.bannder_ctrl_array[index].height)
    $scope.bannder_ctrl_array[index].top.value=index*retractBannerSize
    // recaliberate the location of the page display section
    refreshActivePageLocation(index)
    // retract and set position to all bottom banner
    for(i = index+1; i< $scope.bannder_ctrl_array.length; i++){
      BannderRetract($scope.bannder_ctrl_array[i].height)
      $scope.bannder_ctrl_array[i].top.value = 100-(($scope.bannder_ctrl_array.length-i))*retractBannerSize
    }
  }
  // calculate the relative page location
  refreshActivePageLocation = function(index){
    //calculate page display section height (%)
    $scope.height_display.value = 100-(($scope.bannder_ctrl_array.length-1)*retractBannerSize + activeBannerSize)
    // calcualte page display section top location (%)
    $scope.top_display.value = index*retractBannerSize + activeBannerSize
    // display current selected page
    $location.path($scope.bannder_ctrl_array[index].page)

  }
  // set active banner by searching header height object
  setActiveByHeightObject = function(object){
      activeBannerByIndex($scope.bannder_ctrl_array.findIndex(x => x.height == object))
  }
  //different function, set active page. Triggered by clicking banner. Not that useful currently
  $scope.SetActiveToSearch = function(){
    //switch to search page
    setActiveByHeightObject($scope.header_height_main)
  }
  $scope.SetActiveToDaySelect = function(location){
    // switch focus to days select
    setActiveByHeightObject($scope.header_height_days_sel)
  }
  $scope.SetActiveToPeriodSelect = function(){
    setActiveByHeightObject($scope.header_height_period_sel)
  }
  $scope.SetActiveToNotificationSettings = function(){
    setActiveByHeightObject($scope.header_height_notification_setting)
  }
  $scope.SetActiveToSubscribe = function(){
    setActiveByHeightObject($scope.header_height_subscribe)
  }


  // register events
  $scope.$on('to_days_selection', function() {
    $scope.SetActiveToDaySelect()
  });
  $scope.$on('returnToMain', function() {
    $scope.SetActiveToSearch()
  });
  // trigger event to remove a scroll div that is the
  // result of an angular material bug
  // Issue: https://github.com/angular/material/issues/10127
  // and: https://github.com/angular/material/issues/9318
  $scope.$on("remove_scoll_mask",function(){
    elements = document.getElementsByClassName('md-scroll-mask')
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0])
    }
  })

  $scope.SetActiveToSearch()
  // $scope.expression = function(){
  //   $scope.main_header_height = '10';
  //   console.log('triggered');
  // }
})
