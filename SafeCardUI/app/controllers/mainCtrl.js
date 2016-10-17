app.controller('mainCtrl',
  function($scope, $http, $httpParamSerializer, $cookies) {

    $scope.data = {
        grant_type:"password",
        username: "bar",
        password: "barsecret",
        redirect_uri:"http://localhost:8000",
        client_id: "clientIdPassword"
    };
    $scope.encoded = btoa("foo:foosecret");

    $scope.login = function() {
      alert("hello"+$scope.encoded);
      console.log('came here');
        var req = {
            method: 'POST',
            url: "http://localhost:9000/hascode/oauth/token?grant_type=password&redirect_uri=http://localhost:8000&username="+  $scope.data.username +"&password="+  $scope.data.password,
            headers: {
                'Authorization': "Basic "+$scope.encoded,
                'Content-type': "application/x-www-form-urlencoded"
            }
          //  data: $httpParamSerializer($scope.data)
        }
        console.log(req);
        $http(req).then(function(data){
            $http.defaults.headers.common.Authorization =
              'Bearer ' + data.data.access_token;
            $cookies.put("access_token", data.data.access_token);
            window.location.href="index";
        });
   }

   var isLoginPage = window.location.href.indexOf("login") != -1;
    if(isLoginPage){
        if($cookies.get("access_token")){
            window.location.href = "index";
        }
    } else{
        if($cookies.get("access_token")){
            $http.defaults.headers.common.Authorization =
              'Bearer ' + $cookies.get("access_token");
        } else{
            window.location.href = "login";
        }
    }
});
