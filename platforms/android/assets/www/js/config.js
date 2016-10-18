"use strict";
 angular.module('myApp.config', [])
.constant("$ionicLoadingConfig", {
  "template": "请求中..."
})

.constant('ENV', {
  "version": "1.0",
  "name": "develope",
  "debug": false,
  //"api": "http://localhost:8080/boat"
   "api": "http://192.168.1.100:8080/boat"
 });
