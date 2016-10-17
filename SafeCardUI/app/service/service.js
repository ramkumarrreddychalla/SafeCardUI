'use strict';

angular.module('myApp').factory('ProfileService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = 'http://localhost:9090/ProfileService/profile/';

    var factory = {
        fetchAllProfiles: fetchAllProfiles,
        createProfile: createProfile,
        updateProfile:updateProfile,
    };

    return factory;

    function fetchAllProfiles() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Profiles');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function createProfile(profile) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, profile)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating Profile');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }


    function updateProfile(profile, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, profile)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating Profile');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

}]);
