'use strict';



app.controller('ProfileController', ['$scope', 'ProfileService', function($scope, ProfileService) {

//    $scope.profile={id: 1,
  //  	    profilename: "Sam",
    //	    address: "NY",
    	//    email: "sam@abc.com",
    	  //  host: "10.10.10.10",
    	    //status: "OK"};

    $scope.profiles=[];

    this.submit = submit;
    this.edit = edit;
    this.remove = remove;
    this.reset = reset;

    fetchAllProfile();

    //onCategoryChange();

		function fetchAllProfile(){
        ProfileService.fetchAllProfiles()
            .then(
            function(profobj) {
                $scope.profile = profobj[0];
								console.log(profobj);
								//console.log(profobj.address);
            },
            function(errResponse){
                console.error('Error while fetching Profiles');
            }
        );
    }

    function onCategoryChange(item) {
        //$scope.itemList.push(item.name);
        alert("Selected Value: ");
    }

    function fetchAllProfiles(){
        ProfileService.fetchAllProfiles()
            .then(
            function(d) {
                $scope.profiles = d;
								console.log(d);
            },
            function(errResponse){
                console.error('Error while fetching Profiles');
            }
        );
    }

    function createProfile(profile){
        ProfileService.createProfile(profile)
            .then(
            fetchAllProfiles,
            function(errResponse){
                console.error('Error while creating Profile');
            }
        );
    }

    function updateProfile(profile, id){
        ProfileService.updateProfile(profile, id)
            .then(
            fetchAllProfiles,
            function(errResponse){
                console.error('Error while updating Profile');
            }
        );
    }

    function deleteProfile(id){
        ProfileService.deleteProfile(id)
            .then(
            fetchAllProfiles,
            function(errResponse){
                console.error('Error while deleting Profile');
            }
        );
    }

    function submit() {
        if(this.profile.id===null){
            console.log('Saving New Profile', this.profile);
            createProfile(this.profile);
        }else{
            updateProfile(this.profile, this.profile.id);
            console.log('Profile updated with id ', this.profile.id);
        }
        reset();
    }

    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < this.profiles.length; i++){
            if(this.profiles[i].id === id) {
                this.profile = angular.copy(this.profiles[i]);
                break;
            }
        }
    }

    function remove(id){
        console.log('id to be deleted', id);
        if(this.profile.id === id) {//clean form if the profile to be deleted is shown there.
            reset();
        }
        deleteProfile(id);
    }


    function reset(){
        this.profile={id:null,profilename:'',address:'',email:''};
        $scope.myForm.$setPristine(); //reset Form
    }


}]);
