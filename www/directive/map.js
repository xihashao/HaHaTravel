angular.module('myApp.directive', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        //前台传过来的维度，经度
        var mapOptions = {
          center: new google.maps.LatLng($attr.latitude,$attr.longitude),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        //创建以前台传进来的经纬度为中心的map
        var map = new google.maps.Map($element[0], mapOptions);
        console.log("$element[0]",$element[0]);
        console.log("$attr:",$attr.value);
        //创建位置图标
        var latlng = new google.maps.LatLng($attr.latitude, $attr.longitude);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: 'Hello World!'
        });

        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
