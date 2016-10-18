// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
'use strict';
angular.module('myApp', [
    'ngCordova',
    'ionic',
    'myApp.controllers',
    'myApp.services',
    'myApp.directive',
    'myApp.config'])
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})
.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$httpProvider) {

    $httpProvider.defaults.withCredentials=true;
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  //总模块
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract:true,
    templateUrl: "templates/tab.html"
    //controller:'appCtrl'
  })

  // Each tab has its own nav history stack:
  //首页模块
  .state('tab.homepage', {
    url: '/homepage',
    views:{
        'homepage-tab':{
            templateUrl: "templates/tab-homepage.html",
            controller:'homepageCtrl'

        }

    }

  })
      //商家模块
  .state('tab.business', {
      url: '/business',
      views:{
          'business-tab':{
              templateUrl: "templates/tab-business.html",
              controller:'all_businessCtrl'
          }

      }

  })
      //我的模块
  .state('tab.mine', {
      url: '/mine',
      views:{
          'mine-tab':{
              templateUrl: "templates/tab-mine.html",
              controller:'mineCtrl'
          }

      }

  })

 .state('tab.more', {
        url: '/more',
        views:{
            'more-tab':{
                templateUrl: "templates/tab-more.html",
                controller:'moreCtrl'
            }

        }

    })
    //注册
  .state('register', {
      url: '/register',
      templateUrl: "templates/register.html",
      controller:'mineCtrl'
  })
    //文章的详细页面
  .state('travel_detail', {
      url: '/travel_detail/:id',
      templateUrl: "templates/travel_detail.html",
      controller:'artical_detailCtrl'
  })
  .state('travel_list', {
      url: '/travel_list/:channelId',
      templateUrl: "templates/travel_list.html",
      controller:'businessCtrl'
  })
  .state('to_evaluate_list', {
      url: '/to_evaluate_list',
      templateUrl: "templates/to_evaluate_list.html",
      controller:'evaluateCtrl'
  })
  .state('evaluate_detail', {
      url: '/evaluate_detail/:articleId',
      templateUrl: "templates/evaluate_detail.html",
      controller:'evaluateCtrl'
  })
  .state('modify_password', {
      url: '/modify_password',
      templateUrl: "templates/modify_password.html",
      controller:'mineCtrl'
  })
  .state('modify_nickname', {
      url: '/modify_nickname',
      templateUrl: "templates/modify_nickname.html",
      controller:'mineCtrl'
  })
  .state('commit_order', {
      url: '/commit_order/:title&:price&:articleId&:itemId',
      templateUrl: "templates/commit_order.html",
      controller:'orderCtrl'
})
  .state('deal_order', {
      url: '/deal_order/:articleId&:articleItemId&:count',
      templateUrl: "templates/deal_order.html",
      controller:'payCtrl'
  })
  .state('list_evaluate', {
      url: '/list_evaluate/:id',
      templateUrl: "templates/list_evaluate.html",
      controller:'evaluateCtrl'
  })
  .state('business_map', {
      url: '/business_map',
      templateUrl: "templates/business_map.html",
      controller:'mapCtrl'
  })
  .state('findByName', {
    url: '/findByName',
    templateUrl: "templates/findByName.html",
    controller:'homepageCtrl'
})
  ;



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/homepage');

});

angular.module('myApp.controllers', ['myApp.services','myApp.directive']);

angular.module('myApp.services', ['ngResource','ngCookies', 'myApp.config']);

angular.module('myApp.filters', ['myApp.services']);













