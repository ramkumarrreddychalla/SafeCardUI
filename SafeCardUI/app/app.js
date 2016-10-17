'use strict';

var app = angular.module('myApp',['ngCookies']);

app.run(function ($http) {
  // Sends this header with any AJAX request
//  $http.defaults.headers.common.Authorization = 'Basic Zm9vOmZvb3NlY3JldA==' ;
//  $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  // Send this header only in post requests. Specifies you are sending a JSON object

});
